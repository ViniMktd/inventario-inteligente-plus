
import { BarChart3, TrendingUp, Package, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const ReportsPage = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Relatórios</h1>
        <p className="text-gray-600">Análises detalhadas e insights do seu negócio</p>
      </div>

      {/* Quick Reports */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sugestão de Compra</CardTitle>
            <Package className="w-4 h-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">produtos para repor</p>
            <Button variant="outline" size="sm" className="mt-2 w-full">
              Gerar Relatório
            </Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Produtos Vencendo</CardTitle>
            <AlertTriangle className="w-4 h-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">próximos 30 dias</p>
            <Button variant="outline" size="sm" className="mt-2 w-full">
              Ver Detalhes
            </Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Performance Vendas</CardTitle>
            <TrendingUp className="w-4 h-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12%</div>
            <p className="text-xs text-muted-foreground">vs mês anterior</p>
            <Button variant="outline" size="sm" className="mt-2 w-full">
              Analisar
            </Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Curva ABC</CardTitle>
            <BarChart3 className="w-4 h-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">ABC</div>
            <p className="text-xs text-muted-foreground">análise de produtos</p>
            <Button variant="outline" size="sm" className="mt-2 w-full">
              Calcular
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Coming Soon */}
      <Card>
        <CardContent className="p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <BarChart3 className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Relatórios Avançados em Desenvolvimento
          </h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Em breve você terá acesso a análises detalhadas, gráficos interativos e insights 
            poderosos para otimizar seu negócio.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Badge variant="outline">Giro de Estoque</Badge>
            <Badge variant="outline">Margem de Lucro</Badge>
            <Badge variant="outline">Sazonalidade</Badge>
            <Badge variant="outline">Fornecedores</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const Badge = ({ children, variant }: { children: React.ReactNode; variant: string }) => (
  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
    {children}
  </span>
);
