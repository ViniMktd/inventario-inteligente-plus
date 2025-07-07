
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useProducts } from "@/hooks/useProducts";
import { useToast } from "@/components/ui/use-toast";
import type { Tables } from "@/integrations/supabase/types";
import { productSchema, ProductFormData } from "./form/ProductFormSchema";
import { ProductBasicInfo } from "./form/ProductBasicInfo";
import { ProductCategorySupplier } from "./form/ProductCategorySupplier";
import { ProductPricing } from "./form/ProductPricing";
import { ProductStock } from "./form/ProductStock";
import { ProductDetails } from "./form/ProductDetails";

interface ProductFormProps {
  product?: Tables<'products'>;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const ProductForm = ({ product, onSuccess, onCancel }: ProductFormProps) => {
  const { toast } = useToast();
  const { createProduct, updateProduct, isCreating, isUpdating } = useProducts();

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product?.name || "",
      description: product?.description || "",
      ean: product?.ean || "",
      internal_code: product?.internal_code || "",
      category_id: product?.category_id || "",
      supplier_id: product?.supplier_id || "",
      purchase_price: Number(product?.purchase_price) || 0,
      sale_price: Number(product?.sale_price) || 0,
      stock_quantity: product?.stock_quantity || 0,
      min_stock: product?.min_stock || 0,
      max_stock: product?.max_stock || undefined,
      unit: product?.unit || "UN",
      status: product?.status || "active",
      expiry_date: product?.expiry_date || "",
    },
  });

  const onSubmit = async (data: ProductFormData) => {
    try {
      // Ensure required fields are properly typed
      const productData = {
        name: data.name, // Explicitly include required field
        sale_price: data.sale_price, // Explicitly include required field
        description: data.description || null,
        ean: data.ean || null,
        internal_code: data.internal_code || null,
        category_id: data.category_id || null,
        supplier_id: data.supplier_id || null,
        purchase_price: data.purchase_price || 0,
        stock_quantity: data.stock_quantity || 0,
        min_stock: data.min_stock || 0,
        max_stock: data.max_stock || null,
        unit: data.unit || "UN",
        status: data.status || "active",
        expiry_date: data.expiry_date || null,
      };

      if (product) {
        await updateProduct({ id: product.id, ...productData });
      } else {
        await createProduct(productData);
      }

      onSuccess?.();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao salvar produto. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  const isLoading = isCreating || isUpdating;

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>
          {product ? "Editar Produto" : "Novo Produto"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <ProductBasicInfo form={form} />
            <ProductCategorySupplier form={form} />
            <ProductPricing form={form} />
            <ProductStock form={form} />
            <ProductDetails form={form} />

            {/* Botões */}
            <div className="flex justify-end space-x-2">
              {onCancel && (
                <Button type="button" variant="outline" onClick={onCancel}>
                  Cancelar
                </Button>
              )}
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Salvando..." : product ? "Atualizar" : "Cadastrar"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
