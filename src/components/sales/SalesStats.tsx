
import { DollarSign, ShoppingCart, CreditCard, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useSales } from "@/hooks/useSales";

export const SalesStats = () => {
  const { salesStats, isLoadingStats } = useSales();

  if (isLoadingStats) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-5 w-5 rounded" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-20 mb-2" />
              <Skeleton className="h-3 w-16" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!salesStats) return null;

  const stats = [
    {
      title: "Vendas Hoje",
      value: `R$ ${salesStats.todayTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
      change: `${salesStats.salesGrowth >= 0 ? '+' : ''}${salesStats.salesGrowth.toFixed(1)}%`,
      icon: DollarSign,
      color: salesStats.salesGrowth >= 0 ? "text-success" : "text-destructive"
    },
    {
      title: "Transações",
      value: salesStats.todayCount.toString(),
      change: `${salesStats.transactionGrowth >= 0 ? '+' : ''}${salesStats.transactionGrowth.toFixed(0)} vendas`,
      icon: ShoppingCart,
      color: salesStats.transactionGrowth >= 0 ? "text-success" : "text-destructive"
    },
    {
      title: "Ticket Médio",
      value: `R$ ${salesStats.avgTicket.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
      change: "por transação",
      icon: CreditCard,
      color: "text-primary"
    },
    {
      title: "Meta do Mês",
      value: `${salesStats.monthProgress.toFixed(0)}%`,
      change: `R$ ${salesStats.monthGoal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
      icon: TrendingUp,
      color: salesStats.monthProgress >= 50 ? "text-success" : "text-warning"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        
        return (
          <Card key={index} className="modern-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <Icon className={`w-5 h-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground mb-1">
                {stat.value}
              </div>
              <div className={`text-xs ${stat.color}`}>
                {stat.change}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
