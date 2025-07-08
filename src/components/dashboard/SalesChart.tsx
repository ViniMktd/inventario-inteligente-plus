
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { TrendingUp, Calendar, BarChart3 } from "lucide-react";

const data = [
  { day: "Seg", vendas: 1200, color: "#3B82F6" },
  { day: "Ter", vendas: 1900, color: "#10B981" },
  { day: "Qua", vendas: 2800, color: "#8B5CF6" },
  { day: "Qui", vendas: 2200, color: "#F59E0B" },
  { day: "Sex", vendas: 3400, color: "#EF4444" },
  { day: "Sáb", vendas: 4100, color: "#06B6D4" },
  { day: "Dom", vendas: 2900, color: "#84CC16" }
];

const totalWeekSales = data.reduce((sum, item) => sum + item.vendas, 0);
const avgDailySales = totalWeekSales / data.length;
const bestDay = data.reduce((prev, current) => (prev.vendas > current.vendas) ? prev : current);

export const SalesChart = () => {
  return (
    <Card className="card-enhanced">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-success/10">
              <BarChart3 className="w-6 h-6 text-success" />
            </div>
            <div>
              <CardTitle className="text-xl font-bold">Vendas da Semana</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Performance diária de vendas
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-sm">
            <div className="text-right">
              <div className="font-semibold text-foreground">
                R$ {totalWeekSales.toLocaleString('pt-BR')}
              </div>
              <div className="text-muted-foreground">Total da semana</div>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Chart */}
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="day" 
                axisLine={false}
                tickLine={false}
                className="text-sm text-muted-foreground"
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                className="text-sm text-muted-foreground"
                tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip 
                formatter={(value) => [`R$ ${value.toLocaleString('pt-BR')}`, "Vendas"]}
                labelStyle={{ color: '#374151' }}
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                }}
              />
              <Bar dataKey="vendas" radius={[8, 8, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/50">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-success" />
              <span className="text-sm text-muted-foreground">Melhor dia</span>
            </div>
            <div className="font-semibold text-foreground">
              {bestDay.day} - R$ {bestDay.vendas.toLocaleString('pt-BR')}
            </div>
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-info" />
              <span className="text-sm text-muted-foreground">Média diária</span>
            </div>
            <div className="font-semibold text-foreground">
              R$ {Math.round(avgDailySales).toLocaleString('pt-BR')}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
