
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, ShoppingCart, Minus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SaleItem {
  id: string;
  product: string;
  price: number;
  quantity: number;
  total: number;
}

export const NewSaleDialog = () => {
  const [open, setOpen] = useState(false);
  const [customer, setCustomer] = useState({ name: "", document: "" });
  const [items, setItems] = useState<SaleItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [discount, setDiscount] = useState(0);
  const { toast } = useToast();

  const availableProducts = [
    { id: "1", name: "Notebook Dell", price: 2500 },
    { id: "2", name: "Mouse Logitech", price: 45 },
    { id: "3", name: "Teclado Mecânico", price: 180 },
    { id: "4", name: "Monitor 24\"", price: 800 }
  ];

  const addItem = (productId: string) => {
    const product = availableProducts.find(p => p.id === productId);
    if (!product) return;

    const existingItem = items.find(item => item.id === productId);
    if (existingItem) {
      updateQuantity(productId, existingItem.quantity + 1);
    } else {
      const newItem: SaleItem = {
        id: productId,
        product: product.name,
        price: product.price,
        quantity: 1,
        total: product.price
      };
      setItems([...items, newItem]);
    }
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setItems(items.map(item => 
      item.id === id 
        ? { ...item, quantity, total: item.price * quantity }
        : item
    ));
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  const total = subtotal - discount;

  const handleSave = () => {
    if (items.length === 0) {
      toast({
        title: "Erro",
        description: "Adicione pelo menos um item à venda.",
        variant: "destructive"
      });
      return;
    }

    if (!paymentMethod) {
      toast({
        title: "Erro",
        description: "Selecione um método de pagamento.",
        variant: "destructive"
      });
      return;
    }

    // Reset form
    setCustomer({ name: "", document: "" });
    setItems([]);
    setPaymentMethod("");
    setDiscount(0);
    setOpen(false);

    toast({
      title: "Venda realizada",
      description: `Venda de R$ ${total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} foi registrada com sucesso.`,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="modern-button bg-success hover:bg-success/90">
          <Plus className="w-4 h-4 mr-2" />
          Nova Venda
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <ShoppingCart className="w-5 h-5" />
            <span>Nova Venda</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Customer Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="customer-name">Nome do Cliente</Label>
              <Input
                id="customer-name"
                value={customer.name}
                onChange={(e) => setCustomer({...customer, name: e.target.value})}
                placeholder="Nome (opcional)"
                className="modern-input"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="customer-document">CPF/CNPJ</Label>
              <Input
                id="customer-document"
                value={customer.document}
                onChange={(e) => setCustomer({...customer, document: e.target.value})}
                placeholder="Documento (opcional)"
                className="modern-input"
              />
            </div>
          </div>

          {/* Add Products */}
          <div className="space-y-4">
            <Label>Adicionar Produtos</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {availableProducts.map((product) => (
                <Button
                  key={product.id}
                  variant="outline"
                  onClick={() => addItem(product.id)}
                  className="modern-button h-auto p-4 flex flex-col items-center space-y-2"
                >
                  <div className="font-medium">{product.name}</div>
                  <div className="text-sm text-success">
                    R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </div>
                </Button>
              ))}
            </div>
          </div>

          {/* Cart Items */}
          {items.length > 0 && (
            <div className="space-y-4">
              <Label>Itens da Venda</Label>
              <div className="space-y-2">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium">{item.product}</div>
                      <div className="text-sm text-muted-foreground">
                        R$ {item.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} cada
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="w-24 text-right font-medium">
                      R$ {item.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Payment and Totals */}
          {items.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <Label>Método de Pagamento</Label>
                <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                  <SelectTrigger className="modern-input">
                    <SelectValue placeholder="Selecione o método" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dinheiro">Dinheiro</SelectItem>
                    <SelectItem value="cartao_debito">Cartão de Débito</SelectItem>
                    <SelectItem value="cartao_credito">Cartão de Crédito</SelectItem>
                    <SelectItem value="pix">PIX</SelectItem>
                    <SelectItem value="outros">Outros</SelectItem>
                  </SelectContent>
                </Select>

                <div className="space-y-2">
                  <Label htmlFor="discount">Desconto (R$)</Label>
                  <Input
                    id="discount"
                    type="number"
                    value={discount}
                    onChange={(e) => setDiscount(Number(e.target.value) || 0)}
                    min="0"
                    max={subtotal}
                    className="modern-input"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-muted/30 rounded-lg space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>R$ {subtotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-destructive">
                      <span>Desconto:</span>
                      <span>- R$ {discount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-lg font-bold border-t pt-2">
                    <span>Total:</span>
                    <span>R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                  </div>
                </div>

                <Button onClick={handleSave} className="modern-button w-full bg-success hover:bg-success/90">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Finalizar Venda
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
