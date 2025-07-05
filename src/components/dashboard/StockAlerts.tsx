
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Package, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const alerts = [
  {
    product: "Açúcar Cristal 1kg",
    type: "Estoque Baixo",
    current: 5,
    minimum: 20,
    level: "high"
  },
  {
    product: "Leite Integral 1L",
    type: "Vencimento Próximo", 
    daysLeft: 3,
    level: "critical"
  },
  {
    product: "Arroz Tipo 1 5kg",
    type: "Estoque Baixo",
    current: 12,
    minimum: 30,
    level: "medium"
  },
  {
    product: "Óleo de Soja 900ml",
    type: "Estoque Crítico",
    current: 2,
    minimum: 15,
    level: "critical"
  }
];

export const StockAlerts = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-orange-600" />
            <span>Alertas de Estoque</span>
          </div>
          <Badge variant="secondary">{alerts.length}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {alerts.map((alert, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  alert.level === "critical" ? "bg-red-100" :
                  alert.level === "high" ? "bg-orange-100" : "bg-yellow-100"
                }`}>
                  {alert.type === "Vencimento Próximo" ? (
                    <Clock className={`w-4 h-4 ${
                      alert.level === "critical" ? "text-red-600" : 
                      alert.level === "high" ? "text-orange-600" : "text-yellow-600"
                    }`} />
                  ) : (
                    <Package className={`w-4 h-4 ${
                      alert.level === "critical" ? "text-red-600" :
                      alert.level === "high" ? "text-orange-600" : "text-yellow-600"
                    }`} />
                  )}
                </div>
                
                <div>
                  <div className="font-medium text-gray-900 text-sm">
                    {alert.product}
                  </div>
                  <div className="text-xs text-gray-500">
                    {alert.type === "Vencimento Próximo" 
                      ? `Vence em ${alert.daysLeft} dias`
                      : `${alert.current} un. (mín: ${alert.minimum})`
                    }
                  </div>
                </div>
              </div>
              
              <Badge variant={
                alert.level === "critical" ? "destructive" :
                alert.level === "high" ? "secondary" : "outline"
              }>
                {alert.type}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
