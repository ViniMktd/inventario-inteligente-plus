
import { Package, TrendingDown, AlertTriangle, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useProducts } from "@/hooks/useProducts";

export const ProductStats = () => {
  const { products, isLoading } = useProducts();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2 mb-1"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  // Calcular estatísticas
  const totalProducts = products.length;
  const activeProducts = products.filter(p => p.status === 'active').length;
  const lowStockProducts = products.filter(p => p.stock_quantity <= p.min_stock).length;
  
  // Produtos vencendo nos próximos 30 dias
  const now = new Date();
  const thirtyDaysFromNow = new Date(now.getTime() + (30 * 24 * 60 * 60 * 1000));
  const expiringProducts = products.filter(p => {
    if (!p.expiry_date) return false;
    const expiryDate = new Date(p.expiry_date);
    return expiryDate <= thirtyDaysFromNow && expiryDate >= now;
  }).length;

  const stats = [
    {
      title: "Total de Produtos",
      value: totalProducts.toString(),
      change: `${activeProducts} ativos`,
      icon: Package,
      color: "text-blue-600"
    },
    {
      title: "Estoque Baixo",
      value: lowStockProducts.toString(),
      change: lowStockProducts > 0 ? "Requer atenção" : "Tudo OK",
      icon: TrendingDown,
      color: lowStockProducts > 0 ? "text-orange-600" : "text-green-600"
    },
    {
      title: "Vencimento Próximo",
      value: expiringProducts.toString(),
      change: "Próximos 30 dias",
      icon: AlertTriangle,
      color: expiringProducts > 0 ? "text-red-600" : "text-green-600"
    },
    {
      title: "Produtos Ativos",
      value: activeProducts.toString(),
      change: totalProducts > 0 ? `${((activeProducts / totalProducts) * 100).toFixed(1)}% do total` : "0% do total",
      icon: CheckCircle,
      color: "text-green-600"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        
        return (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <Icon className={`w-5 h-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-gray-500">
                {stat.change}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
