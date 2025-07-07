
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { ProductFormData } from "./ProductFormSchema";

interface ProductBasicInfoProps {
  form: UseFormReturn<ProductFormData>;
}

export const ProductBasicInfo = ({ form }: ProductBasicInfoProps) => {
  return (
    <>
      {/* Informações Básicas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do Produto *</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Arroz Branco 5kg" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="ean"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Código EAN</FormLabel>
              <FormControl>
                <Input placeholder="Ex: 7891000100103" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Descrição</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Descreva o produto..."
                className="resize-none"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
