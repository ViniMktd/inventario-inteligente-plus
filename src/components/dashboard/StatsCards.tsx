
import { TrendingUp, TrendingDown, Package, ShoppingCart, DollarSign, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const stats = [
  {
    title: "Vendas Hoje",
    value: "R$ 2.847,90",
    change: "+12,5%",
    trend: "up",
    icon: DollarSign,
    color: "text-green-600"
  },
  {
    title: "Produtos Vendidos",
    value: "143",
    change: "+8,2%", 
    trend: "up",
    icon: ShoppingCart,
    color: "text-blue-600"
  },
  {
    title: "Estoque Total",
    value: "1.247",
    change: "-2,1%",
    trend: "down", 
    icon: Package,
    color: "text-purple-600"
  },
  {
    title: "Alertas de Estoque",
    value: "23",
    change: "+5",
    trend: "warning",
    icon: AlertTriangle,
    color: "text-orange-600"
  }
];

export const StatsCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        const TrendIcon = stat.trend === "up" ? TrendingUp : TrendingDown;
        
        return (
          <Card key={index} className="relative overflow-hidden">
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
              <div className="flex items-center space-x-1">
                {stat.trend !== "warning" && (
                  <TrendIcon className={`w-3 h-3 ${
                    stat.trend === "up" ? "text-green-500" : "text-red-500"
                  }`} />
                )}
                <span className={`text-xs ${
                  stat.trend === "up" ? "text-green-600" : 
                  stat.trend === "down" ? "text-red-600" : "text-orange-600"
                }`}>
                  {stat.change}
                </span>
                <span className="text-xs text-gray-500">vs ontem</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
