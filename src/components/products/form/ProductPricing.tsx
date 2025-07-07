
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { ProductFormData } from "./ProductFormSchema";

interface ProductPricingProps {
  form: UseFormReturn<ProductFormData>;
}

export const ProductPricing = ({ form }: ProductPricingProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField
        control={form.control}
        name="purchase_price"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Preço de Compra</FormLabel>
            <FormControl>
              <Input 
                type="number" 
                step="0.01" 
                placeholder="0.00"
                {...field}
                onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="sale_price"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Preço de Venda *</FormLabel>
            <FormControl>
              <Input 
                type="number" 
                step="0.01" 
                placeholder="0.00"
                {...field}
                onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
