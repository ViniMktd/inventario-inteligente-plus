
import { useState } from "react";
import { AlertTriangle, Calendar, Package, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

export const ExpiringProducts = () => {
  const [expiringProducts] = useState([
    { 
      id: 1, 
      product: "Leite Integral 1L", 
      quantity: 15, 
      expiryDate: "2024-12-15", 
      daysLeft: 7, 
      urgency: "critical" 
    },
    { 
      id: 2, 
      product: "Iogurte Natural", 
      quantity: 8, 
      expiryDate: "2024-12-20", 
      daysLeft: 12, 
      urgency: "warning" 
    },
    { 
      id: 3, 
      product: "Pão de Forma", 
      quantity: 25, 
      expiryDate: "2024-12-25", 
      daysLeft: 17, 
      urgency: "attention" 
    },
    { 
      id: 4, 
      product: "Queijo Mussarela", 
      quantity: 12, 
      expiryDate: "2024-12-30", 
      daysLeft: 22, 
      urgency: "attention" 
    }
  ]);

  const { toast } = useToast();

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "critical": return "destructive";
      case "warning": return "secondary";
      case "attention": return "outline";
      default: return "outline";
    }
  };

  const getUrgencyLabel = (urgency: string) => {
    switch (urgency) {
      case "critical": return "Crítico";
      case "warning": return "Atenção";
      case "attention": return "Observar";
      default: return "Normal";
    }
  };

  const criticalCount = expiringProducts.filter(p => p.urgency === "critical").length;
  const warningCount = expiringProducts.filter(p => p.urgency === "warning").length;
  const totalQuantity = expiringProducts.reduce((sum, p) => sum + p.quantity, 0);

  const handleExport = () => {
    toast({
      title: "Relatório exportado",
      description: "Lista de produtos vencendo foi gerada com sucesso.",
    });
  };

  return (
    <Card className="premium-card">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-destructive/10">
              <AlertTriangle className="w-6 h-6 text-destructive" />
            </div>
            <div>
              <span className="text-xl font-bold">Produtos Vencendo</span>
              <p className="text-sm text-muted-foreground mt-1">
                Produtos que vencem nos próximos 30 dias
              </p>
            </div>
          </div>
          <Button onClick={handleExport} className="modern-button">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-destructive/10 rounded-lg border border-destructive/20">
            <div className="text-2xl font-bold text-destructive">{criticalCount}</div>
            <div className="text-sm text-muted-foreground">Críticos (≤ 7 dias)</div>
          </div>
          <div className="p-4 bg-warning/10 rounded-lg border border-warning/20">
            <div className="text-2xl font-bold text-warning">{warningCount}</div>
            <div className="text-sm text-muted-foreground">Atenção (≤ 15 dias)</div>
          </div>
          <div className="p-4 bg-info/10 rounded-lg border border-info/20">
            <div className="text-2xl font-bold text-info">{totalQuantity}</div>
            <div className="text-sm text-muted-foreground">Total de Unidades</div>
          </div>
        </div>

        {/* Lista de Produtos */}
        <div className="space-y-3">
          {expiringProducts.map((product) => (
            <div key={product.id} className="p-4 border rounded-lg hover:bg-muted/30 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-warning/10">
                    <Package className="w-5 h-5 text-warning" />
                  </div>
                  <div>
                    <div className="font-semibold">{product.product}</div>
                    <div className="text-sm text-muted-foreground flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>Vence em {product.daysLeft} dias ({product.expiryDate})</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant={getUrgencyColor(product.urgency)}>
                    {getUrgencyLabel(product.urgency)}
                  </Badge>
                  <div className="text-right">
                    <div className="font-semibold">{product.quantity} unidades</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Ações Recomendadas */}
        <div className="p-4 bg-muted/30 rounded-lg border border-dashed border-muted-foreground/20">
          <div className="flex items-start space-x-2">
            <AlertTriangle className="w-5 h-5 text-warning mt-0.5" />
            <div className="space-y-1">
              <p className="text-sm font-medium">Ações Recomendadas</p>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Produtos críticos: Fazer promoção imediata</li>
                <li>• Produtos em atenção: Planejar campanhas de desconto</li>
                <li>• Revisar políticas de compra para evitar perdas</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
