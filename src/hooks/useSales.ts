import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { Tables, TablesInsert, TablesUpdate } from "@/integrations/supabase/types";

type Sale = Tables<'sales'>;
type SaleInsert = TablesInsert<'sales'>;
type SaleItem = Tables<'sale_items'>;
type SaleItemInsert = TablesInsert<'sale_items'>;

export interface CreateSaleData {
  customer_name?: string;
  customer_document?: string;
  payment_method: 'dinheiro' | 'cartao_debito' | 'cartao_credito' | 'pix' | 'outros';
  discount_amount?: number;
  notes?: string;
  items: Array<{
    product_id: string;
    quantity: number;
    unit_price: number;
    total_price: number;
  }>;
}

export const useSales = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Buscar vendas com itens
  const {
    data: sales = [],
    isLoading: isLoadingSales,
    error: salesError
  } = useQuery({
    queryKey: ['sales'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('sales')
        .select(`
          *,
          sale_items(
            *,
            products(name, ean)
          )
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  // Buscar estatísticas de vendas
  const {
    data: salesStats,
    isLoading: isLoadingStats
  } = useQuery({
    queryKey: ['sales-stats'],
    queryFn: async () => {
      const today = new Date().toISOString().split('T')[0];
      
      // Vendas de hoje
      const { data: todaySales, error: todayError } = await supabase
        .from('sales')
        .select('final_amount')
        .gte('created_at', `${today}T00:00:00`)
        .eq('status', 'completed');
      
      if (todayError) throw todayError;

      // Vendas da semana passada para comparação
      const lastWeek = new Date();
      lastWeek.setDate(lastWeek.getDate() - 7);
      const lastWeekStr = lastWeek.toISOString().split('T')[0];
      
      const { data: lastWeekSales, error: lastWeekError } = await supabase
        .from('sales')
        .select('final_amount')
        .gte('created_at', `${lastWeekStr}T00:00:00`)
        .lt('created_at', `${today}T00:00:00`)
        .eq('status', 'completed');
      
      if (lastWeekError) throw lastWeekError;

      // Calcular estatísticas
      const todayTotal = todaySales.reduce((sum, sale) => sum + sale.final_amount, 0);
      const todayCount = todaySales.length;
      const lastWeekTotal = lastWeekSales.reduce((sum, sale) => sum + sale.final_amount, 0);
      const lastWeekCount = lastWeekSales.length;
      
      const avgTicket = todayCount > 0 ? todayTotal / todayCount : 0;
      const salesGrowth = lastWeekTotal > 0 ? ((todayTotal - lastWeekTotal) / lastWeekTotal) * 100 : 0;
      const transactionGrowth = lastWeekCount > 0 ? ((todayCount - lastWeekCount) / lastWeekCount) * 100 : 0;

      return {
        todayTotal,
        todayCount,
        avgTicket,
        salesGrowth,
        transactionGrowth,
        monthGoal: 50000, // Meta fictícia de R$ 50.000
        monthProgress: (todayTotal / 50000) * 100
      };
    },
  });

  // Criar venda
  const createSale = useMutation({
    mutationFn: async (saleData: CreateSaleData) => {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) throw new Error('Usuário não autenticado');

      // Calcular totais
      const totalAmount = saleData.items.reduce((sum, item) => sum + item.total_price, 0);
      const finalAmount = totalAmount - (saleData.discount_amount || 0);

      // Gerar número da venda
      const { data: saleNumber, error: numberError } = await supabase.rpc('generate_sale_number');
      if (numberError) throw numberError;

      // Criar venda
      const saleInsert: SaleInsert = {
        sale_number: saleNumber,
        customer_name: saleData.customer_name,
        customer_document: saleData.customer_document,
        total_amount: totalAmount,
        discount_amount: saleData.discount_amount || 0,
        final_amount: finalAmount,
        payment_method: saleData.payment_method,
        status: 'completed',
        completed_at: new Date().toISOString(),
        created_by: user.id,
        notes: saleData.notes
      };

      const { data: sale, error: saleError } = await supabase
        .from('sales')
        .insert(saleInsert)
        .select()
        .single();

      if (saleError) throw saleError;

      // Criar itens da venda e atualizar estoque
      for (const item of saleData.items) {
        // Inserir item da venda
        const saleItemInsert: SaleItemInsert = {
          sale_id: sale.id,
          product_id: item.product_id,
          quantity: item.quantity,
          unit_price: item.unit_price,
          total_price: item.total_price
        };

        const { error: itemError } = await supabase
          .from('sale_items')
          .insert(saleItemInsert);

        if (itemError) throw itemError;

        // Atualizar estoque do produto
        const { data: product, error: productError } = await supabase
          .from('products')
          .select('stock_quantity')
          .eq('id', item.product_id)
          .single();

        if (productError) throw productError;

        const newStock = Math.max(0, (product.stock_quantity || 0) - item.quantity);
        
        const { error: updateError } = await supabase
          .from('products')
          .update({ stock_quantity: newStock })
          .eq('id', item.product_id);

        if (updateError) throw updateError;

        // Registrar movimento de estoque
        const { error: movementError } = await supabase
          .from('stock_movements')
          .insert({
            product_id: item.product_id,
            type: 'venda',
            quantity: -item.quantity,
            unit_cost: item.unit_price,
            reference_document: sale.sale_number,
            notes: `Venda ${sale.sale_number}`,
            created_by: user.id
          });

        if (movementError) throw movementError;
      }

      return sale;
    },
    onSuccess: (sale) => {
      queryClient.invalidateQueries({ queryKey: ['sales'] });
      queryClient.invalidateQueries({ queryKey: ['sales-stats'] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['stock-movements'] });
      
      toast({
        title: "Venda realizada!",
        description: `Venda ${sale.sale_number} foi registrada com sucesso.`,
      });
    },
    onError: (error: any) => {
      console.error('Erro ao criar venda:', error);
      toast({
        title: "Erro ao criar venda",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Cancelar venda
  const cancelSale = useMutation({
    mutationFn: async (saleId: string) => {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) throw new Error('Usuário não autenticado');

      // Buscar venda com itens
      const { data: sale, error: saleError } = await supabase
        .from('sales')
        .select(`
          *,
          sale_items(*)
        `)
        .eq('id', saleId)
        .single();

      if (saleError) throw saleError;

      if (sale.status === 'cancelled') {
        throw new Error('Venda já foi cancelada');
      }

      // Reverter estoque
      for (const item of sale.sale_items) {
        const { data: product, error: productError } = await supabase
          .from('products')
          .select('stock_quantity')
          .eq('id', item.product_id)
          .single();

        if (productError) throw productError;

        const newStock = (product.stock_quantity || 0) + item.quantity;
        
        const { error: updateError } = await supabase
          .from('products')
          .update({ stock_quantity: newStock })
          .eq('id', item.product_id);

        if (updateError) throw updateError;

        // Registrar movimento de estoque
        const { error: movementError } = await supabase
          .from('stock_movements')
          .insert({
            product_id: item.product_id,
            type: 'devolucao',
            quantity: item.quantity,
            unit_cost: item.unit_price,
            reference_document: sale.sale_number,
            notes: `Cancelamento da venda ${sale.sale_number}`,
            created_by: user.id
          });

        if (movementError) throw movementError;
      }

      // Atualizar status da venda
      const { data, error } = await supabase
        .from('sales')
        .update({ status: 'cancelled' })
        .eq('id', saleId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (sale) => {
      queryClient.invalidateQueries({ queryKey: ['sales'] });
      queryClient.invalidateQueries({ queryKey: ['sales-stats'] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['stock-movements'] });
      
      toast({
        title: "Venda cancelada!",
        description: `Venda ${sale.sale_number} foi cancelada e o estoque foi restaurado.`,
      });
    },
    onError: (error: any) => {
      console.error('Erro ao cancelar venda:', error);
      toast({
        title: "Erro ao cancelar venda",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return {
    sales,
    salesStats,
    isLoadingSales,
    isLoadingStats,
    salesError,
    createSale: createSale.mutate,
    cancelSale: cancelSale.mutate,
    isCreatingSale: createSale.isPending,
    isCancellingSale: cancelSale.isPending,
  };
};