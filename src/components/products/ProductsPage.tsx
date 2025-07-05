
import { useState } from "react";
import { Plus, Search, Filter, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProductTable } from "./ProductTable";
import { ProductStats } from "./ProductStats";

export const ProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Produtos</h1>
          <p className="text-gray-600">Gerencie seu estoque e cadastre novos produtos</p>
        </div>
        
        <div className="flex space-x-2">
          <Button variant="outline" className="flex items-center space-x-2">
            <Upload className="w-4 h-4" />
            <span>Importar XML</span>
          </Button>
          <Button className="flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Novo Produto</span>
          </Button>
        </div>
      </div>

      {/* Stats */}
      <ProductStats />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Buscar por nome, EAN ou código..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" className="flex items-center space-x-2">
          <Filter className="w-4 h-4" />
          <span>Filtros</span>
        </Button>
      </div>

      {/* Product Table */}
      <ProductTable searchTerm={searchTerm} />
    </div>
  );
};
