
import { useState } from "react";
import { Plus, Search, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SalesStats } from "./SalesStats";
import { SalesTable } from "./SalesTable";

export const SalesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Vendas</h1>
          <p className="text-gray-600">Gerencie suas vendas e histórico de transações</p>
        </div>
        
        <div className="flex space-x-2">
          <Button variant="outline" className="flex items-center space-x-2">
            <Calendar className="w-4 h-4" />
            <span>Período</span>
          </Button>
          <Button className="flex items-center space-x-2 bg-green-600 hover:bg-green-700">
            <Plus className="w-4 h-4" />
            <span>Nova Venda</span>
          </Button>
        </div>
      </div>

      {/* Stats */}
      <SalesStats />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Buscar por número da venda, cliente..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Sales Table */}
      <SalesTable searchTerm={searchTerm} />
    </div>
  );
};
