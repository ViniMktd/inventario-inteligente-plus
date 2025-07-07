
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import type { Tables, TablesInsert, TablesUpdate } from "@/integrations/supabase/types";

type Product = Tables<'products'>;
type ProductInsert = TablesInsert<'products'>;
type ProductUpdate = TablesUpdate<'products'>;

export const useProducts = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const {
    data: products = [],
    isLoading,
    error
  } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          categories(name),
          suppliers(name)
        `)
        .order('name');
      
      if (error) throw error;
      return data as Product[];
    },
  });

  const createProduct = useMutation({
    mutationFn: async (product: ProductInsert) => {
      const { data, error } = await supabase
        .from('products')
        .insert(product)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast({
        title: "Produto criado!",
        description: "O produto foi cadastrado com sucesso.",
      });
    },
    onError: (error: any) => {
      console.error('Erro ao criar produto:', error);
      toast({
        title: "Erro ao criar produto",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const updateProduct = useMutation({
    mutationFn: async ({ id, ...product }: { id: string } & ProductUpdate) => {
      const { data, error } = await supabase
        .from('products')
        .update(product)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast({
        title: "Produto atualizado!",
        description: "As informações foram atualizadas com sucesso.",
      });
    },
    onError: (error: any) => {
      console.error('Erro ao atualizar produto:', error);
      toast({
        title: "Erro ao atualizar produto",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const deleteProduct = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast({
        title: "Produto excluído!",
        description: "O produto foi removido com sucesso.",
      });
    },
    onError: (error: any) => {
      console.error('Erro ao excluir produto:', error);
      toast({
        title: "Erro ao excluir produto",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Função para buscar produtos por EAN ou nome (útil para PDV)
  const searchProducts = async (query: string) => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .or(`name.ilike.%${query}%,ean.eq.${query}`)
      .eq('status', 'active')
      .limit(10);
    
    if (error) throw error;
    return data;
  };

  // Função para atualizar estoque
  const updateStock = useMutation({
    mutationFn: async ({ id, quantity, operation }: { id: string; quantity: number; operation: 'add' | 'subtract' }) => {
      // Primeiro, buscar o produto atual
      const { data: product, error: fetchError } = await supabase
        .from('products')
        .select('stock_quantity')
        .eq('id', id)
        .single();
      
      if (fetchError) throw fetchError;
      
      // Calcular novo estoque
      const currentStock = product.stock_quantity || 0;
      const newStock = operation === 'add' 
        ? currentStock + quantity 
        : Math.max(0, currentStock - quantity);
      
      // Atualizar o estoque
      const { error } = await supabase
        .from('products')
        .update({ stock_quantity: newStock })
        .eq('id', id);
      
      if (error) throw error;
      
      return newStock;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  return {
    products,
    isLoading,
    error,
    createProduct: createProduct.mutate,
    updateProduct: updateProduct.mutate,
    deleteProduct: deleteProduct.mutate,
    updateStock: updateStock.mutate,
    searchProducts,
    isCreating: createProduct.isPending,
    isUpdating: updateProduct.isPending,
    isDeleting: deleteProduct.isPending,
    isUpdatingStock: updateStock.isPending,
  };
};
