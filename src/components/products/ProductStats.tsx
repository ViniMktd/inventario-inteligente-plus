
import { Package, TrendingDown, AlertTriangle, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const stats = [
  {
    title: "Total de Produtos",
    value: "1.247",
    change: "+23 novos",
    icon: Package,
    color: "text-blue-600"
  },
  {
    title: "Estoque Baixo",
    value: "23",
    change: "Requer atenção",
    icon: TrendingDown,
    color: "text-orange-600"
  },
  {
    title: "Vencimento Próximo",
    value: "8",
    change: "Próximos 30 dias",
    icon: AlertTriangle,
    color: "text-red-600"
  },
  {
    title: "Produtos Ativos",
    value: "1.224",
    change: "98,2% do total",
    icon: CheckCircle,
    color: "text-green-600"
  }
];

export const ProductStats = () => {
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
