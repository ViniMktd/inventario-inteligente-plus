
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp } from "lucide-react";

const data = [
  { day: "Seg", vendas: 1200 },
  { day: "Ter", vendas: 1900 },
  { day: "Qua", vendas: 2800 },
  { day: "Qui", vendas: 2200 },
  { day: "Sex", vendas: 3400 },
  { day: "Sáb", vendas: 4100 },
  { day: "Dom", vendas: 2900 }
];

export const SalesChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <TrendingUp className="w-5 h-5 text-green-600" />
          <span>Vendas da Semana</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip 
                formatter={(value) => [`R$ ${value}`, "Vendas"]}
                labelStyle={{ color: '#374151' }}
              />
              <Bar dataKey="vendas" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
