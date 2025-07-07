
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
    if (!OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY não configurado');
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { message, context } = await req.json();
    
    // Buscar contexto do usuário
    const authHeader = req.headers.get('Authorization');
    const token = authHeader?.replace('Bearer ', '');
    
    let userContext = '';
    if (token) {
      const { data: { user } } = await supabase.auth.getUser(token);
      if (user) {
        // Buscar dados relevantes do usuário
        const [products, sales, lowStock] = await Promise.all([
          supabase.from('products').select('count').single(),
          supabase.from('sales').select('count').single(),
          supabase.from('products').select('name, stock_quantity, min_stock').lt('stock_quantity', 'min_stock').limit(5)
        ]);

        userContext = `
Contexto do usuário:
- Total de produtos: ${products.count || 0}
- Total de vendas: ${sales.count || 0}
- Produtos com estoque baixo: ${lowStock.data?.map(p => `${p.name} (${p.stock_quantity})`).join(', ') || 'Nenhum'}
        `;
      }
    }

    const systemPrompt = `
Você é o assistente de IA do StockPro, um sistema de gestão de estoque e vendas.
Seu objetivo é ajudar os usuários a gerenciar seu negócio de forma mais eficiente.

${userContext}

Você pode ajudar com:
- Análise de estoque e vendas
- Sugestões de reposição
- Identificação de produtos em falta
- Relatórios e insights
- Dicas de gestão de estoque
- Previsões de demanda

Seja sempre útil, preciso e focado em soluções práticas para o negócio.
Responda em português brasileiro.
`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    // Log da conversa para analytics
    await supabase.from('ai_conversations').insert({
      user_id: context?.user_id,
      message: message,
      response: aiResponse,
      created_at: new Date().toISOString()
    });

    return new Response(JSON.stringify({ response: aiResponse }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Erro no assistente IA:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
