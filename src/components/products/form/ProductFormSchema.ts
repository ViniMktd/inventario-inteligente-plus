
import * as z from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  description: z.string().optional(),
  ean: z.string().optional(),
  internal_code: z.string().optional(),
  category_id: z.string().optional(),
  supplier_id: z.string().optional(),
  purchase_price: z.number().min(0, "Preço de compra deve ser positivo").optional(),
  sale_price: z.number().min(0.01, "Preço de venda é obrigatório"),
  stock_quantity: z.number().min(0, "Quantidade deve ser positiva").default(0),
  min_stock: z.number().min(0, "Estoque mínimo deve ser positivo").default(0),
  max_stock: z.number().min(0, "Estoque máximo deve ser positivo").optional(),
  unit: z.string().default("UN"),
  status: z.enum(["active", "inactive", "discontinued"]).default("active"),
  expiry_date: z.string().optional(),
});

export type ProductFormData = z.infer<typeof productSchema>;
