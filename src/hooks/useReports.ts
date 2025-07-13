import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useReports = () => {
  // Produtos com baixo estoque
  const {
    data: lowStockProducts = [],
    isLoading: isLoadingLowStock
  } = useQuery({
    queryKey: ['low-stock-products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          categories(name),
          suppliers(name)
        `)
        .eq('status', 'active')
        .lt('stock_quantity', 10) // Produtos com menos de 10 unidades
        .order('stock_quantity', { ascending: true });
      
      if (error) throw error;
      return data;
    },
  });

  // Produtos próximos ao vencimento
  const {
    data: expiringProducts = [],
    isLoading: isLoadingExpiring
  } = useQuery({
    queryKey: ['expiring-products'],
    queryFn: async () => {
      const nextMonth = new Date();
      nextMonth.setMonth(nextMonth.getMonth() + 1);
      
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          categories(name),
          suppliers(name)
        `)
        .eq('status', 'active')
        .not('expiry_date', 'is', null)
        .lt('expiry_date', nextMonth.toISOString().split('T')[0])
        .order('expiry_date', { ascending: true });
      
      if (error) throw error;
      return data;
    },
  });

  // Relatório de vendas por período
  const {
    data: salesReport,
    isLoading: isLoadingSalesReport
  } = useQuery({
    queryKey: ['sales-report'],
    queryFn: async () => {
      const today = new Date();
      const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
      const lastMonth = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

      // Vendas por dia nos últimos 7 dias
      const { data: dailySales, error: dailyError } = await supabase
        .from('sales')
        .select('created_at, final_amount')
        .eq('status', 'completed')
        .gte('created_at', lastWeek.toISOString())
        .order('created_at', { ascending: true });

      if (dailyError) throw dailyError;

      // Produtos mais vendidos
      const { data: topProducts, error: topProductsError } = await supabase
        .from('sale_items')
        .select(`
          product_id,
          quantity,
          products(name, sale_price)
        `)
        .gte('created_at', lastMonth.toISOString());

      if (topProductsError) throw topProductsError;

      // Agrupar produtos mais vendidos
      const productSales = topProducts.reduce((acc: any, item: any) => {
        const productId = item.product_id;
        if (!acc[productId]) {
          acc[productId] = {
            product_name: item.products?.name || 'Produto não encontrado',
            total_quantity: 0,
            total_revenue: 0
          };
        }
        acc[productId].total_quantity += item.quantity;
        acc[productId].total_revenue += item.quantity * (item.products?.sale_price || 0);
        return acc;
      }, {});

      const topSellingProducts = Object.values(productSales)
        .sort((a: any, b: any) => b.total_quantity - a.total_quantity)
        .slice(0, 10);

      // Agrupar vendas por dia
      const salesByDay = dailySales.reduce((acc: any, sale: any) => {
        const date = sale.created_at.split('T')[0];
        if (!acc[date]) {
          acc[date] = { date, total: 0, count: 0 };
        }
        acc[date].total += sale.final_amount;
        acc[date].count += 1;
        return acc;
      }, {});

      const dailySalesData = Object.values(salesByDay);

      return {
        dailySales: dailySalesData,
        topSellingProducts
      };
    },
  });

  // Movimentações de estoque recentes
  const {
    data: stockMovements = [],
    isLoading: isLoadingMovements
  } = useQuery({
    queryKey: ['stock-movements'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('stock_movements')
        .select(`
          *,
          products(name, internal_code)
        `)
        .order('created_at', { ascending: false })
        .limit(50);
      
      if (error) throw error;
      return data;
    },
  });

  // Sugestões de compra baseadas em estoque mínimo
  const {
    data: purchaseSuggestions = [],
    isLoading: isLoadingPurchase
  } = useQuery({
    queryKey: ['purchase-suggestions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          categories(name),
          suppliers(name, contact_name, phone, email)
        `)
        .eq('status', 'active')
        .not('min_stock', 'is', null)
        .filter('stock_quantity', 'lte', 'min_stock')
        .order('stock_quantity', { ascending: true });
      
      if (error) throw error;
      return data;
    },
  });

  return {
    lowStockProducts,
    isLoadingLowStock,
    expiringProducts,
    isLoadingExpiring,
    salesReport,
    isLoadingSalesReport,
    stockMovements,
    isLoadingMovements,
    purchaseSuggestions,
    isLoadingPurchase
  };
};