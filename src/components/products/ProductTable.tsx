
import { useState } from "react";
import { Eye, Edit, Trash2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface ProductTableProps {
  searchTerm: string;
}

const mockProducts = [
  {
    id: "1",
    ean: "7891234567890",
    name: "Açúcar Cristal União 1kg",
    category: "Mercearia",
    costPrice: 3.20,
    salePrice: 4.99,
    currentStock: 5,
    minStock: 20,
    supplier: "União Açúcar",
    status: "low-stock"
  },
  {
    id: "2", 
    ean: "7891234567891",
    name: "Leite Integral Parmalat 1L",
    category: "Laticínios",
    costPrice: 2.80,
    salePrice: 4.29,
    currentStock: 45,
    minStock: 30,
    supplier: "Parmalat",
    status: "ok"
  },
  {
    id: "3",
    ean: "7891234567892", 
    name: "Arroz Tipo 1 Camil 5kg",
    category: "Mercearia",
    costPrice: 18.50,
    salePrice: 24.90,
    currentStock: 12,
    minStock: 25,
    supplier: "Camil",
    status: "low-stock"
  },
  {
    id: "4",
    ean: "7891234567893",
    name: "Óleo de Soja Liza 900ml",
    category: "Mercearia", 
    costPrice: 4.20,
    salePrice: 6.49,
    currentStock: 78,
    minStock: 15,
    supplier: "Cargill",
    status: "ok"
  }
];

export const ProductTable = ({ searchTerm }: ProductTableProps) => {
  const [products] = useState(mockProducts);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.ean.includes(searchTerm) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStockStatus = (current: number, minimum: number) => {
    if (current <= minimum * 0.3) return { label: "Crítico", variant: "destructive" as const };
    if (current <= minimum) return { label: "Baixo", variant: "secondary" as const };
    return { label: "Normal", variant: "outline" as const };
  };

  return (
    <Card>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left p-4 font-medium text-gray-900">Produto</th>
                <th className="text-left p-4 font-medium text-gray-900">EAN</th>
                <th className="text-left p-4 font-medium text-gray-900">Categoria</th>
                <th className="text-right p-4 font-medium text-gray-900">Custo</th>
                <th className="text-right p-4 font-medium text-gray-900">Venda</th>
                <th className="text-center p-4 font-medium text-gray-900">Estoque</th>
                <th className="text-center p-4 font-medium text-gray-900">Status</th>
                <th className="text-center p-4 font-medium text-gray-900">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => {
                const stockStatus = getStockStatus(product.currentStock, product.minStock);
                
                return (
                  <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-4">
                      <div>
                        <div className="font-medium text-gray-900">{product.name}</div>
                        <div className="text-sm text-gray-500">{product.supplier}</div>
                      </div>
                    </td>
                    <td className="p-4 text-gray-600 font-mono text-sm">
                      {product.ean}
                    </td>
                    <td className="p-4">
                      <Badge variant="outline">{product.category}</Badge>
                    </td>
                    <td className="p-4 text-right font-medium">
                      R$ {product.costPrice.toFixed(2)}
                    </td>
                    <td className="p-4 text-right font-medium">
                      R$ {product.salePrice.toFixed(2)}
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center space-x-1">
                        <span className="font-medium">{product.currentStock}</span>
                        {product.currentStock <= product.minStock && (
                          <AlertTriangle className="w-4 h-4 text-orange-500" />
                        )}
                      </div>
                      <div className="text-xs text-gray-500">
                        Min: {product.minStock}
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <Badge variant={stockStatus.variant}>
                        {stockStatus.label}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-center space-x-1">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};
