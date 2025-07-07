
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus, Edit } from "lucide-react";
import { ProductForm } from "./ProductForm";
import type { Tables } from "@/integrations/supabase/types";

interface ProductDialogProps {
  product?: Tables<'products'>;
  trigger?: React.ReactNode;
  onSuccess?: () => void;
}

export const ProductDialog = ({ product, trigger, onSuccess }: ProductDialogProps) => {
  const [open, setOpen] = useState(false);

  const handleSuccess = () => {
    setOpen(false);
    onSuccess?.();
  };

  const defaultTrigger = product ? (
    <Button variant="ghost" size="sm">
      <Edit className="w-4 h-4" />
    </Button>
  ) : (
    <Button className="flex items-center space-x-2">
      <Plus className="w-4 h-4" />
      <span>Novo Produto</span>
    </Button>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || defaultTrigger}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {product ? "Editar Produto" : "Novo Produto"}
          </DialogTitle>
        </DialogHeader>
        <ProductForm
          product={product}
          onSuccess={handleSuccess}
          onCancel={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
};
