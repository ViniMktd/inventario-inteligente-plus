
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const recentSales = [
  {
    id: "VND-2024-001",
    time: "14:32",
    items: 5,
    total: 89.90,
    payment: "Cartão",
    status: "Concluída"
  },
  {
    id: "VND-2024-002", 
    time: "14:15",
    items: 2,
    total: 25.80,
    payment: "Dinheiro",
    status: "Concluída"
  },
  {
    id: "VND-2024-003",
    time: "13:58",
    items: 8,
    total: 156.45,
    payment: "PIX",
    status: "Concluída"
  },
  {
    id: "VND-2024-004",
    time: "13:42",
    items: 3,
    total: 42.30,
    payment: "Cartão",
    status: "Concluída"
  }
];

export const RecentSales = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShoppingCart className="w-5 h-5 text-green-600" />
            <span>Vendas Recentes</span>
          </div>
          <Button variant="outline" size="sm">
            Ver Todas
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {recentSales.map((sale, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <ShoppingCart className="w-5 h-5 text-green-600" />
                </div>
                
                <div>
                  <div className="font-medium text-gray-900">{sale.id}</div>
                  <div className="text-sm text-gray-500">
                    {sale.time} • {sale.items} itens • {sale.payment}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <div className="font-bold text-gray-900">
                    R$ {sale.total.toFixed(2)}
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    {sale.status}
                  </Badge>
                </div>
                
                <Button variant="ghost" size="sm">
                  <Eye className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
