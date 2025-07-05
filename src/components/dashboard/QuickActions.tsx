
import { Plus, Upload, ShoppingCart, FileText, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const actions = [
  {
    title: "Nova Venda",
    description: "Iniciar PDV",
    icon: ShoppingCart,
    color: "bg-green-500 hover:bg-green-600",
    shortcut: "F2"
  },
  {
    title: "Cadastrar Produto", 
    description: "Adicionar novo item",
    icon: Plus,
    color: "bg-blue-500 hover:bg-blue-600",
    shortcut: "F3"
  },
  {
    title: "Importar XML",
    description: "Upload de NF-e",
    icon: Upload,
    color: "bg-purple-500 hover:bg-purple-600",
    shortcut: "F4"
  },
  {
    title: "Relatórios",
    description: "Análises e insights",
    icon: FileText,
    color: "bg-orange-500 hover:bg-orange-600",
    shortcut: "F5"
  }
];

export const QuickActions = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Package className="w-5 h-5 text-blue-600" />
          <span>Ações Rápidas</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {actions.map((action, index) => {
            const Icon = action.icon;
            
            return (
              <Button
                key={index}
                variant="ghost"
                className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-gray-50 group relative"
              >
                <div className={`w-12 h-12 rounded-lg ${action.color} flex items-center justify-center group-hover:scale-105 transition-transform`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-center">
                  <div className="font-medium text-gray-900">{action.title}</div>
                  <div className="text-sm text-gray-500">{action.description}</div>
                </div>
                <div className="absolute top-2 right-2 bg-gray-800 text-white text-xs px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  {action.shortcut}
                </div>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
