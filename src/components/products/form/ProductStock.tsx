
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { ProductFormData } from "./ProductFormSchema";

interface ProductStockProps {
  form: UseFormReturn<ProductFormData>;
}

export const ProductStock = ({ form }: ProductStockProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <FormField
        control={form.control}
        name="stock_quantity"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Quantidade em Estoque</FormLabel>
            <FormControl>
              <Input 
                type="number" 
                placeholder="0"
                {...field}
                onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="min_stock"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Estoque Mínimo</FormLabel>
            <FormControl>
              <Input 
                type="number" 
                placeholder="0"
                {...field}
                onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="max_stock"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Estoque Máximo</FormLabel>
            <FormControl>
              <Input 
                type="number" 
                placeholder="Opcional"
                {...field}
                onChange={(e) => field.onChange(parseInt(e.target.value) || undefined)}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
