
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  BarChart3, 
  Settings,
  X,
  FileText,
  CreditCard
} from "lucide-react";

interface SidebarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const menuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    description: "Visão geral do negócio"
  },
  {
    id: "products",
    label: "Produtos",
    icon: Package,
    description: "Gestão de estoque"
  },
  {
    id: "sales",
    label: "Vendas",
    icon: ShoppingCart,
    description: "PDV e histórico"
  },
  {
    id: "reports",
    label: "Relatórios",
    icon: BarChart3,
    description: "Análises e insights"
  },
  {
    id: "settings",
    label: "Configurações",
    icon: Settings,
    description: "Sistema e usuários"
  }
];

export const Sidebar = ({ currentPage, setCurrentPage, isOpen, setIsOpen }: SidebarProps) => {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={cn(
        "fixed left-0 top-0 z-50 h-full w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">StockPro</h1>
              <p className="text-xs text-gray-500">Gestão Inteligente</p>
            </div>
          </div>
          
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-1 rounded-md hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Menu */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id);
                  setIsOpen(false);
                }}
                className={cn(
                  "w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200",
                  isActive 
                    ? "bg-blue-50 text-blue-700 border border-blue-200" 
                    : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <Icon className={cn(
                  "w-5 h-5",
                  isActive ? "text-blue-600" : "text-gray-400"
                )} />
                <div className="flex-1">
                  <div className="font-medium">{item.label}</div>
                  <div className="text-xs text-gray-500">{item.description}</div>
                </div>
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <div className="text-xs text-gray-500 text-center">
            StockPro v1.0.0
            <br />
            Gestão Completa de Estoque
          </div>
        </div>
      </div>
    </>
  );
};
