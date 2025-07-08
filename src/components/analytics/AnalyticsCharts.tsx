
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export const AnalyticsCharts = () => {
  const { data: chartData, isLoading } = useQuery({
    queryKey: ['analytics-charts'],
    queryFn: async () => {
      // Vendas por mês (últimos 6 meses)
      const salesByMonth = [];
      const now = new Date();
      
      for (let i = 5; i >= 0; i--) {
        const monthStart = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const monthEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 0);
        
        const { data: sales } = await supabase
          .from('sales')
          .select('final_amount')
          .eq('status', 'completed')
          .gte('created_at', monthStart.toISOString())
          .lte('created_at', monthEnd.toISOString());
        
        const total = sales?.reduce((sum, sale) => sum + Number(sale.final_amount || 0), 0) || 0;
        
        salesByMonth.push({
          month: monthStart.toLocaleDateString('pt-BR', { month: 'short' }),
          value: total
        });
      }

      // Top 5 produtos mais vendidos
      const { data: topProductsData } = await supabase
        .from('sale_items')
        .select(`
          product_id,
          quantity,
          products(name)
        `);

      const productSales: Record<string, number> = {};
      topProductsData?.forEach(item => {
        const productName = item.products?.name || 'Produto sem nome';
        if (productSales[productName]) {
          productSales[productName] += Number(item.quantity || 0);
        } else {
          productSales[productName] = Number(item.quantity || 0);
        }
      });

      const topProducts = Object.entries(productSales)
        .sort(([,a], [,b]) => Number(b) - Number(a))
        .slice(0, 5)
        .map(([name, quantity]) => ({ name, quantity: Number(quantity) }));

      // Categorias mais vendidas
      const { data: categorySales } = await supabase
        .from('sale_items')
        .select(`
          quantity,
          products(category_id, categories(name))
        `);

      const categoryData: Record<string, number> = {};
      categorySales?.forEach(item => {
        const categoryName = item.products?.categories?.name || 'Sem categoria';
        if (categoryData[categoryName]) {
          categoryData[categoryName] += Number(item.quantity || 0);
        } else {
          categoryData[categoryName] = Number(item.quantity || 0);
        }
      });

      const topCategories = Object.entries(categoryData)
        .sort(([,a], [,b]) => Number(b) - Number(a))
        .slice(0, 5)
        .map(([name, value]) => ({ name, value: Number(value) }));

      return {
        salesByMonth,
        topProducts,
        topCategories
      };
    },
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-5 bg-gray-200 rounded w-40"></div>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gray-200 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Vendas por Mês */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Vendas por Mês</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData?.salesByMonth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`R$ ${Number(value).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, 'Vendas']} />
              <Line type="monotone" dataKey="value" stroke="#0088FE" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Top Produtos */}
      <Card>
        <CardHeader>
          <CardTitle>Produtos Mais Vendidos</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData?.topProducts}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="quantity" fill="#00C49F" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Categorias */}
      <Card>
        <CardHeader>
          <CardTitle>Vendas por Categoria</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData?.topCategories}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(Number(percent) * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData?.topCategories?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};
