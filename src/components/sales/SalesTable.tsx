
import { Eye, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface SalesTableProps {
  searchTerm: string;
}

const mockSales = [
  {
    id: "VND-2024-001",
    date: "2024-01-15",
    time: "14:32",
    items: 5,
    total: 89.90,
    payment: "Cartão de Crédito",
    status: "Concluída"
  },
  {
    id: "VND-2024-002",
    date: "2024-01-15", 
    time: "14:15",
    items: 2,
    total: 25.80,
    payment: "Dinheiro",
    status: "Concluída"
  },
  {
    id: "VND-2024-003",
    date: "2024-01-15",
    time: "13:58", 
    items: 8,
    total: 156.45,
    payment: "PIX",
    status: "Concluída"
  },
  {
    id: "VND-2024-004",
    date: "2024-01-15",
    time: "13:42",
    items: 3,
    total: 42.30,
    payment: "Cartão de Débito",
    status: "Concluída"
  },
  {
    id: "VND-2024-005",
    date: "2024-01-15",
    time: "12:28",
    items: 12,
    total: 198.67,
    payment: "PIX",
    status: "Concluída"
  }
];

export const SalesTable = ({ searchTerm }: SalesTableProps) => {
  const filteredSales = mockSales.filter(sale =>
    sale.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sale.payment.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left p-4 font-medium text-gray-900">Venda</th>
                <th className="text-left p-4 font-medium text-gray-900">Data/Hora</th>
                <th className="text-center p-4 font-medium text-gray-900">Itens</th>
                <th className="text-right p-4 font-medium text-gray-900">Total</th>
                <th className="text-left p-4 font-medium text-gray-900">Pagamento</th>
                <th className="text-center p-4 font-medium text-gray-900">Status</th>
                <th className="text-center p-4 font-medium text-gray-900">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredSales.map((sale) => (
                <tr key={sale.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-4">
                    <div className="font-medium text-gray-900">{sale.id}</div>
                  </td>
                  <td className="p-4 text-gray-600">
                    <div>{new Date(sale.date).toLocaleDateString('pt-BR')}</div>
                    <div className="text-sm text-gray-500">{sale.time}</div>
                  </td>
                  <td className="p-4 text-center font-medium">
                    {sale.items}
                  </td>
                  <td className="p-4 text-right font-bold text-green-600">
                    R$ {sale.total.toFixed(2)}
                  </td>
                  <td className="p-4">
                    <Badge variant="outline">{sale.payment}</Badge>
                  </td>
                  <td className="p-4 text-center">
                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                      {sale.status}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-center space-x-1">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Printer className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};
