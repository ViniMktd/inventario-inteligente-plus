
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Package, ShoppingCart, AlertTriangle, BarChart3 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const AnalyticsCards = () => {
  const { data: analytics, isLoading } = useQuery({
    queryKey: ['advanced-analytics'],
    queryFn: async () => {
      const now = new Date();
      const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      
      // Vendas deste mês vs mês anterior
      const [currentMonthSales, lastMonthSales] = await Promise.all([
        supabase
          .from('sales')
          .select('final_amount')
          .eq('status', 'completed')
          .gte('created_at', thisMonth.toISOString()),
        supabase
          .from('sales')
          .select('final_amount')
          .eq('status', 'completed')
          .gte('created_at', lastMonth.toISOString())
          .lt('created_at', thisMonth.toISOString())
      ]);

      const currentTotal = currentMonthSales.data?.reduce((sum, sale) => sum + (sale.final_amount || 0), 0) || 0;
      const lastTotal = lastMonthSales.data?.reduce((sum, sale) => sum + (sale.final_amount || 0), 0) || 0;
      const salesGrowth = lastTotal > 0 ? ((currentTotal - lastTotal) / lastTotal) * 100 : 0;

      // Produtos mais vendidos
      const { data: topProducts } = await supabase
        .from('sale_items')
        .select(`
          product_id,
          quantity,
          products(name)
        `)
        .order('quantity', { ascending: false })
        .limit(5);

      // Giro de estoque
      const { data: stockTurnover } = await supabase
        .from('products')
        .select('stock_quantity, sale_price')
        .gt('stock_quantity', 0);

      const avgStockValue = stockTurnover?.reduce((sum, product) => 
        sum + (product.stock_quantity * product.sale_price), 0) || 0;

      // Produtos críticos
      const { count: criticalStock } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true })
        .lt('stock_quantity', 5);

      return {
        salesGrowth,
        currentRevenue: currentTotal,
        topProducts: topProducts || [],
        avgStockValue,
        criticalStock: criticalStock || 0
      };
    },
  });

  const cards = [
    {
      title: "Crescimento de Vendas",
      value: `${analytics?.salesGrowth?.toFixed(1) || 0}%`,
      icon: analytics?.salesGrowth >= 0 ? TrendingUp : TrendingDown,
      color: analytics?.salesGrowth >= 0 ? "text-green-600" : "text-red-600",
      bgColor: analytics?.salesGrowth >= 0 ? "bg-green-50" : "bg-red-50",
      description: "vs mês anterior"
    },
    {
      title: "Receita do Mês",
      value: `R$ ${(analytics?.currentRevenue || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
      icon: ShoppingCart,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      description: "Vendas concluídas"
    },
    {
      title: "Valor em Estoque",
      value: `R$ ${(analytics?.avgStockValue || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
      icon: Package,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      description: "Valor total do inventário"
    },
    {
      title: "Estoque Crítico",
      value: analytics?.criticalStock || 0,
      icon: AlertTriangle,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      description: "Produtos com menos de 5 unidades"
    }
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="h-4 bg-gray-200 rounded w-24"></div>
              <div className="h-6 w-6 bg-gray-200 rounded"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-gray-200 rounded w-16 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-20"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {card.title}
              </CardTitle>
              <div className={`p-2 rounded-full ${card.bgColor}`}>
                <Icon className={`h-4 w-4 ${card.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${card.color} mb-1`}>
                {card.value}
              </div>
              <p className="text-xs text-gray-500">{card.description}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
