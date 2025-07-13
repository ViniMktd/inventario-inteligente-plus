
import { Eye, Printer, X, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useSales } from "@/hooks/useSales";
import { useToast } from "@/hooks/use-toast";

interface SalesTableProps {
  searchTerm: string;
}

const getPaymentMethodLabel = (method: string) => {
  const labels: { [key: string]: string } = {
    'dinheiro': 'Dinheiro',
    'cartao_debito': 'Cartão de Débito',
    'cartao_credito': 'Cartão de Crédito',
    'pix': 'PIX',
    'outros': 'Outros'
  };
  return labels[method] || method;
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'completed':
      return <Badge variant="default" className="bg-success/10 text-success border-success/20">Concluída</Badge>;
    case 'pending':
      return <Badge variant="secondary" className="bg-warning/10 text-warning border-warning/20">Pendente</Badge>;
    case 'cancelled':
      return <Badge variant="destructive" className="bg-destructive/10 text-destructive border-destructive/20">Cancelada</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export const SalesTable = ({ searchTerm }: SalesTableProps) => {
  const { sales, isLoadingSales, cancelSale, isCancellingSale } = useSales();
  const { toast } = useToast();

  const filteredSales = sales.filter(sale =>
    sale.sale_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (sale.customer_name && sale.customer_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    getPaymentMethodLabel(sale.payment_method).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePrintReceipt = (sale: any) => {
    toast({
      title: "Imprimindo cupom",
      description: `Cupom da venda ${sale.sale_number} será impresso.`,
    });
  };

  const handleCancelSale = (saleId: string) => {
    cancelSale(saleId);
  };

  if (isLoadingSales) {
    return (
      <Card className="modern-card">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left p-4 font-medium text-foreground">Venda</th>
                  <th className="text-left p-4 font-medium text-foreground">Data/Hora</th>
                  <th className="text-center p-4 font-medium text-foreground">Itens</th>
                  <th className="text-right p-4 font-medium text-foreground">Total</th>
                  <th className="text-left p-4 font-medium text-foreground">Pagamento</th>
                  <th className="text-center p-4 font-medium text-foreground">Status</th>
                  <th className="text-center p-4 font-medium text-foreground">Ações</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 5 }).map((_, index) => (
                  <tr key={index} className="border-b border-border">
                    <td className="p-4"><Skeleton className="h-4 w-24" /></td>
                    <td className="p-4"><Skeleton className="h-4 w-20" /></td>
                    <td className="p-4 text-center"><Skeleton className="h-4 w-8 mx-auto" /></td>
                    <td className="p-4 text-right"><Skeleton className="h-4 w-16 ml-auto" /></td>
                    <td className="p-4"><Skeleton className="h-4 w-20" /></td>
                    <td className="p-4 text-center"><Skeleton className="h-4 w-16 mx-auto" /></td>
                    <td className="p-4 text-center"><Skeleton className="h-4 w-12 mx-auto" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="modern-card">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left p-4 font-medium text-foreground">Venda</th>
                <th className="text-left p-4 font-medium text-foreground">Cliente</th>
                <th className="text-left p-4 font-medium text-foreground">Data/Hora</th>
                <th className="text-center p-4 font-medium text-foreground">Itens</th>
                <th className="text-right p-4 font-medium text-foreground">Total</th>
                <th className="text-left p-4 font-medium text-foreground">Pagamento</th>
                <th className="text-center p-4 font-medium text-foreground">Status</th>
                <th className="text-center p-4 font-medium text-foreground">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredSales.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-muted-foreground">
                    {searchTerm ? "Nenhuma venda encontrada para a busca." : "Nenhuma venda registrada ainda."}
                  </td>
                </tr>
              ) : (
                filteredSales.map((sale) => (
                  <tr key={sale.id} className="border-b border-border hover:bg-muted/20 transition-colors">
                    <td className="p-4">
                      <div className="font-medium text-foreground">{sale.sale_number}</div>
                    </td>
                    <td className="p-4">
                      <div className="text-foreground">
                        {sale.customer_name || "Cliente não informado"}
                      </div>
                      {sale.customer_document && (
                        <div className="text-sm text-muted-foreground">{sale.customer_document}</div>
                      )}
                    </td>
                    <td className="p-4 text-muted-foreground">
                      <div>{new Date(sale.created_at || '').toLocaleDateString('pt-BR')}</div>
                      <div className="text-sm">{new Date(sale.created_at || '').toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</div>
                    </td>
                    <td className="p-4 text-center font-medium">
                      {sale.sale_items?.length || 0}
                    </td>
                    <td className="p-4 text-right font-bold text-success">
                      R$ {sale.final_amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="p-4">
                      <Badge variant="outline">{getPaymentMethodLabel(sale.payment_method)}</Badge>
                    </td>
                    <td className="p-4 text-center">
                      {getStatusBadge(sale.status || 'pending')}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-center space-x-1">
                        <Button variant="ghost" size="sm" onClick={() => toast({ title: "Visualizar venda", description: "Modal de detalhes será implementado" })}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handlePrintReceipt(sale)}>
                          <Printer className="w-4 h-4" />
                        </Button>
                        {sale.status === 'completed' && (
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                                <X className="w-4 h-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle className="flex items-center space-x-2">
                                  <AlertTriangle className="w-5 h-5 text-destructive" />
                                  <span>Cancelar Venda</span>
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  Tem certeza que deseja cancelar a venda {sale.sale_number}? Esta ação irá reverter o estoque dos produtos e não pode ser desfeita.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction 
                                  onClick={() => handleCancelSale(sale.id)}
                                  disabled={isCancellingSale}
                                  className="bg-destructive hover:bg-destructive/90"
                                >
                                  {isCancellingSale ? "Cancelando..." : "Confirmar Cancelamento"}
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};
