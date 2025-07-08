
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, ShoppingCart, AlertTriangle, TrendingUp, ArrowUp, ArrowDown } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { CardSkeleton } from "@/components/ui/skeleton";

export const StatsCards = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      // Products count
      const { count: productsCount } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true });

      // Low stock count
      const { count: lowStockCount } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true })
        .lt('stock_quantity', 10);

      // Sales today
      const today = new Date().toISOString().split('T')[0];
      const { count: salesToday } = await supabase
        .from('sales')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', `${today}T00:00:00.000Z`);

      // Total revenue this month
      const firstDayOfMonth = new Date();
      firstDayOfMonth.setDate(1);
      const { data: monthlyRevenue } = await supabase
        .from('sales')
        .select('final_amount')
        .eq('status', 'completed')
        .gte('created_at', firstDayOfMonth.toISOString());

      const totalRevenue = monthlyRevenue?.reduce((sum, sale) => sum + (sale.final_amount || 0), 0) || 0;

      // Previous month for comparison
      const firstDayOfPrevMonth = new Date();
      firstDayOfPrevMonth.setMonth(firstDayOfPrevMonth.getMonth() - 1);
      firstDayOfPrevMonth.setDate(1);
      const lastDayOfPrevMonth = new Date();
      lastDayOfPrevMonth.setDate(0);
      
      const { data: prevMonthRevenue } = await supabase
        .from('sales')
        .select('final_amount')
        .eq('status', 'completed')
        .gte('created_at', firstDayOfPrevMonth.toISOString())
        .lte('created_at', lastDayOfPrevMonth.toISOString());

      const prevTotalRevenue = prevMonthRevenue?.reduce((sum, sale) => sum + (sale.final_amount || 0), 0) || 0;
      const revenueGrowth = prevTotalRevenue > 0 ? ((totalRevenue - prevTotalRevenue) / prevTotalRevenue) * 100 : 0;

      return {
        productsCount: productsCount || 0,
        lowStockCount: lowStockCount || 0,
        salesToday: salesToday || 0,
        totalRevenue,
        revenueGrowth
      };
    },
  });

  const cards = [
    {
      title: "Total de Produtos",
      value: stats?.productsCount || 0,
      icon: Package,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      gradientClass: "gradient-info",
      change: null,
    },
    {
      title: "Vendas Hoje",
      value: stats?.salesToday || 0,
      icon: ShoppingCart,
      color: "text-green-600",
      bgColor: "bg-green-50",
      gradientClass: "gradient-success",
      change: null,
    },
    {
      title: "Estoque Baixo",
      value: stats?.lowStockCount || 0,
      icon: AlertTriangle,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      gradientClass: "gradient-warning",
      change: null,
    },
    {
      title: "Receita do Mês",
      value: `R$ ${(stats?.totalRevenue || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      gradientClass: "gradient-primary",
      change: stats?.revenueGrowth || 0,
    },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => {
        const Icon = card.icon;
        const isPositiveChange = card.change !== null && card.change > 0;
        const isNegativeChange = card.change !== null && card.change < 0;
        
        return (
          <Card key={index} className="card-enhanced group relative overflow-hidden">
            {/* Gradient Background */}
            <div className={`absolute inset-0 ${card.gradientClass} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
            
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-200">
                {card.title}
              </CardTitle>
              <div className={`p-3 rounded-xl ${card.bgColor} group-hover:scale-110 transition-transform duration-200`}>
                <Icon className={`h-5 w-5 ${card.color}`} />
              </div>
            </CardHeader>
            
            <CardContent className="space-y-2">
              <div className={`text-3xl font-bold ${card.color} group-hover:scale-105 transition-transform duration-200`}>
                {card.value}
              </div>
              
              {card.change !== null && (
                <div className="flex items-center space-x-1 text-sm">
                  {isPositiveChange && (
                    <>
                      <ArrowUp className="h-4 w-4 text-success" />
                      <span className="text-success font-medium">
                        +{card.change.toFixed(1)}%
                      </span>
                    </>
                  )}
                  {isNegativeChange && (
                    <>
                      <ArrowDown className="h-4 w-4 text-destructive" />
                      <span className="text-destructive font-medium">
                        {card.change.toFixed(1)}%
                      </span>
                    </>
                  )}
                  {!isPositiveChange && !isNegativeChange && (
                    <span className="text-muted-foreground">
                      Sem mudança
                    </span>
                  )}
                  <span className="text-muted-foreground">vs mês anterior</span>
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
