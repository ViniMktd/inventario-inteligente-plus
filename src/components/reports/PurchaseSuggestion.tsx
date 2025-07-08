
import { useState } from "react";
import { Package, ShoppingCart, AlertTriangle, TrendingUp, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

export const PurchaseSuggestion = () => {
  const [suggestions] = useState([
    { 
      id: 1, 
      product: "Notebook Dell Inspiron", 
      currentStock: 2, 
      minStock: 10, 
      avgSales: 8, 
      suggestedQty: 20, 
      priority: "high",
      cost: 2500 
    },
    { 
      id: 2, 
      product: "Mouse Logitech", 
      currentStock: 5, 
      minStock: 15, 
      avgSales: 12, 
      suggestedQty: 25, 
      priority: "medium",
      cost: 45 
    },
    { 
      id: 3, 
      product: "Teclado Mecânico", 
      currentStock: 1, 
      minStock: 8, 
      avgSales: 6, 
      suggestedQty: 15, 
      priority: "high",
      cost: 180 
    },
    { 
      id: 4, 
      product: "Monitor 24\"", 
      currentStock: 3, 
      minStock: 12, 
      avgSales: 10, 
      suggestedQty: 18, 
      priority: "medium",
      cost: 800 
    }
  ]);

  const { toast } = useToast();

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "destructive";
      case "medium": return "secondary";
      default: return "outline";
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high": return AlertTriangle;
      case "medium": return TrendingUp;
      default: return Package;
    }
  };

  const totalInvestment = suggestions.reduce((sum, item) => sum + (item.suggestedQty * item.cost), 0);

  const handleGenerateReport = () => {
    toast({
      title: "Relatório gerado",
      description: "Sugestão de compra foi exportada com sucesso.",
    });
  };

  return (
    <Card className="premium-card">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-warning/10">
              <ShoppingCart className="w-6 h-6 text-warning" />
            </div>
            <div>
              <span className="text-xl font-bold">Sugestão de Compra</span>
              <p className="text-sm text-muted-foreground mt-1">
                Produtos com estoque baixo que precisam ser repostos
              </p>
            </div>
          </div>
          <Button onClick={handleGenerateReport} className="modern-button">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-destructive/10 rounded-lg border border-destructive/20">
            <div className="text-2xl font-bold text-destructive">
              {suggestions.filter(s => s.priority === "high").length}
            </div>
            <div className="text-sm text-muted-foreground">Prioridade Alta</div>
          </div>
          <div className="p-4 bg-warning/10 rounded-lg border border-warning/20">
            <div className="text-2xl font-bold text-warning">
              {suggestions.filter(s => s.priority === "medium").length}
            </div>
            <div className="text-sm text-muted-foreground">Prioridade Média</div>
          </div>
          <div className="p-4 bg-success/10 rounded-lg border border-success/20">
            <div className="text-2xl font-bold text-success">
              R$ {totalInvestment.toLocaleString('pt-BR')}
            </div>
            <div className="text-sm text-muted-foreground">Investimento Total</div>
          </div>
        </div>

        {/* Lista de Produtos */}
        <div className="space-y-3">
          {suggestions.map((suggestion) => {
            const PriorityIcon = getPriorityIcon(suggestion.priority);
            return (
              <div key={suggestion.id} className="p-4 border rounded-lg hover:bg-muted/30 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Package className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold">{suggestion.product}</div>
                      <div className="text-sm text-muted-foreground">
                        Estoque atual: {suggestion.currentStock} | Mínimo: {suggestion.minStock}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge variant={getPriorityColor(suggestion.priority)} className="flex items-center space-x-1">
                      <PriorityIcon className="w-3 h-3" />
                      <span className="capitalize">{suggestion.priority}</span>
                    </Badge>
                    <div className="text-right">
                      <div className="font-semibold">Sugerido: {suggestion.suggestedQty}</div>
                      <div className="text-sm text-muted-foreground">
                        R$ {(suggestion.suggestedQty * suggestion.cost).toLocaleString('pt-BR')}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
