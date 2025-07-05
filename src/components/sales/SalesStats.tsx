
import { DollarSign, ShoppingCart, CreditCard, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const stats = [
  {
    title: "Vendas Hoje",
    value: "R$ 2.847,90",
    change: "+12,5%",
    icon: DollarSign,
    color: "text-green-600"
  },
  {
    title: "Transações",
    value: "47",
    change: "+8 vendas",
    icon: ShoppingCart,
    color: "text-blue-600"
  },
  {
    title: "Ticket Médio",
    value: "R$ 60,59",
    change: "+4,2%",
    icon: CreditCard,
    color: "text-purple-600"
  },
  {
    title: "Meta do Mês",
    value: "68%",
    change: "R$ 34.235,00",
    icon: TrendingUp,
    color: "text-orange-600"
  }
];

export const SalesStats = () => {
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
