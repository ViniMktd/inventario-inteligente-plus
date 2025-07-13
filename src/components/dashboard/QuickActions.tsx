import { Plus, Upload, ShoppingCart, FileText, Package, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
const actions = [{
  title: "Nova Venda",
  description: "Iniciar PDV",
  icon: ShoppingCart,
  color: "text-white",
  bgGradient: "gradient-success",
  shortcut: "F2",
  priority: "high"
}, {
  title: "Cadastrar Produto",
  description: "Adicionar novo item",
  icon: Plus,
  color: "text-white",
  bgGradient: "gradient-info",
  shortcut: "F3",
  priority: "high"
}, {
  title: "Importar XML",
  description: "Upload de NF-e",
  icon: Upload,
  color: "text-white",
  bgGradient: "gradient-warning",
  shortcut: "F4",
  priority: "medium"
}, {
  title: "Relatórios",
  description: "Análises e insights",
  icon: FileText,
  color: "text-white",
  bgGradient: "gradient-primary",
  shortcut: "F5",
  priority: "medium"
}];
export const QuickActions = () => {
  return <Card className="card-enhanced">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <div>
              <span className="text-xl font-bold">Ações Rápidas</span>
              <p className="text-sm text-muted-foreground mt-1">
                Acesse funcionalidades principais rapidamente
              </p>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {actions.map((action, index) => {
          const Icon = action.icon;
          return <Button key={index} variant="ghost" className="h-auto p-0 flex flex-col hover:bg-transparent group relative overflow-hidden">
                <div className="w-full p-6 rounded-xl border-2 border-border hover:border-primary/20 transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg bg-card group-hover:bg-gradient-to-br group-hover:from-card group-hover:to-muted/20">
                  {/* Priority indicator */}
                  {action.priority === "high" && <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-success animate-pulse" />}
                  
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl ${action.bgGradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <Icon className={`w-8 h-8 ${action.color}`} />
                  </div>
                  
                  {/* Content */}
                  <div className="text-center space-y-2">
                    <div className="font-semibold text-foreground group-hover:text-primary transition-colors duration-200 mx-0 px-[30px]">
                      {action.title}
                    </div>
                    <div className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors duration-200">
                      {action.description}
                    </div>
                  </div>
                  
                  {/* Shortcut badge */}
                  <div className="absolute bottom-3 right-3 bg-background/80 backdrop-blur-sm text-foreground text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 border shadow-sm">
                    {action.shortcut}
                  </div>
                </div>
              </Button>;
        })}
        </div>
        
        {/* Help text */}
        <div className="mt-6 p-4 rounded-lg bg-muted/30 border border-dashed border-muted-foreground/20">
          <p className="text-sm text-muted-foreground text-center">
            💡 <strong>Dica:</strong> Use os atalhos do teclado para acesso ainda mais rápido às funcionalidades
          </p>
        </div>
      </CardContent>
    </Card>;
};