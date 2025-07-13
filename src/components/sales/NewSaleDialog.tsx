
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, ShoppingCart, Minus, Trash2, Search, Package } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useProducts } from "@/hooks/useProducts";
import { useSales, CreateSaleData } from "@/hooks/useSales";
import { Card, CardContent } from "@/components/ui/card";

interface SaleItem {
  id: string;
  product_id: string;
  product_name: string;
  price: number;
  quantity: number;
  total: number;
  stock_available: number;
}

export const NewSaleDialog = () => {
  const [open, setOpen] = useState(false);
  const [customer, setCustomer] = useState({ name: "", document: "" });
  const [items, setItems] = useState<SaleItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [discount, setDiscount] = useState(0);
  const [notes, setNotes] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  
  const { products, isLoading: isLoadingProducts } = useProducts();
  const { createSale, isCreatingSale } = useSales();

  // Filtrar produtos por busca
  const filteredProducts = products.filter(product =>
    product.status === 'active' &&
    (product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     (product.ean && product.ean.includes(searchTerm)) ||
     (product.internal_code && product.internal_code.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  const addItem = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    // Verificar se há estoque suficiente
    if (!product.stock_quantity || product.stock_quantity <= 0) {
      toast({
        title: "Produto sem estoque",
        description: `O produto ${product.name} não tem estoque disponível.`,
        variant: "destructive"
      });
      return;
    }

    const existingItem = items.find(item => item.id === productId);
    if (existingItem) {
      // Verificar se pode adicionar mais uma unidade
      if (existingItem.quantity >= product.stock_quantity) {
        toast({
          title: "Estoque insuficiente",
          description: `Apenas ${product.stock_quantity} unidades disponíveis.`,
          variant: "destructive"
        });
        return;
      }
      updateQuantity(productId, existingItem.quantity + 1);
    } else {
      const newItem: SaleItem = {
        id: productId,
        product_id: productId,
        product_name: product.name,
        price: product.sale_price,
        quantity: 1,
        total: product.sale_price,
        stock_available: product.stock_quantity
      };
      setItems([...items, newItem]);
    }
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }

    // Verificar estoque disponível
    const item = items.find(i => i.id === id);
    if (item && quantity > item.stock_available) {
      toast({
        title: "Estoque insuficiente",
        description: `Apenas ${item.stock_available} unidades disponíveis.`,
        variant: "destructive"
      });
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

    // Preparar dados da venda
    const saleData: CreateSaleData = {
      customer_name: customer.name || undefined,
      customer_document: customer.document || undefined,
      payment_method: paymentMethod as any,
      discount_amount: discount,
      notes: notes || undefined,
      items: items.map(item => ({
        product_id: item.product_id,
        quantity: item.quantity,
        unit_price: item.price,
        total_price: item.total
      }))
    };

    // Criar venda
    createSale(saleData);

    // Reset form
    setCustomer({ name: "", document: "" });
    setItems([]);
    setPaymentMethod("");
    setDiscount(0);
    setNotes("");
    setSearchTerm("");
    setOpen(false);
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

          {/* Product Search */}
          <div className="space-y-4">
            <Label>Buscar Produtos</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Buscar por nome, código ou EAN..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="modern-input pl-10"
              />
            </div>
          </div>

          {/* Available Products */}
          {searchTerm && (
            <div className="space-y-4">
              <Label>Produtos Disponíveis</Label>
              <div className="max-h-60 overflow-y-auto space-y-2">
                {isLoadingProducts ? (
                  <div className="text-center text-muted-foreground">Carregando produtos...</div>
                ) : filteredProducts.length === 0 ? (
                  <div className="text-center text-muted-foreground">Nenhum produto encontrado.</div>
                ) : (
                  filteredProducts.map((product) => (
                    <Card key={product.id} className="p-4 hover:bg-muted/20 cursor-pointer transition-colors" onClick={() => addItem(product.id)}>
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="font-medium">{product.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {product.internal_code && `Código: ${product.internal_code}`}
                            {product.ean && ` • EAN: ${product.ean}`}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Estoque: {product.stock_quantity || 0} {product.unit || 'UN'}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-success">
                            R$ {product.sale_price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </div>
                          <Button
                            size="sm"
                            disabled={!product.stock_quantity || product.stock_quantity <= 0}
                            className="mt-2"
                          >
                            <Plus className="w-4 h-4 mr-1" />
                            Adicionar
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Cart Items */}
          {items.length > 0 && (
            <div className="space-y-4">
              <Label>Itens da Venda</Label>
              <div className="space-y-2">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium">{item.product_name}</div>
                      <div className="text-sm text-muted-foreground">
                        R$ {item.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} cada
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Estoque: {item.stock_available}
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

                <div className="space-y-2">
                  <Label htmlFor="notes">Observações</Label>
                  <Input
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Observações adicionais (opcional)"
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

                <Button 
                  onClick={handleSave} 
                  disabled={isCreatingSale}
                  className="modern-button w-full bg-success hover:bg-success/90"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  {isCreatingSale ? "Processando..." : "Finalizar Venda"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
