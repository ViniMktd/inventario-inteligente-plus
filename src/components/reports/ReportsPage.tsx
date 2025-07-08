
import { useState } from "react";
import { BarChart3, TrendingUp, Package, AlertTriangle, Download, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PurchaseSuggestion } from "./PurchaseSuggestion";
import { ExpiringProducts } from "./ExpiringProducts";
import { useToast } from "@/hooks/use-toast";

export const ReportsPage = () => {
  const [activeReport, setActiveReport] = useState("overview");
  const { toast } = useToast();

  const handleGenerateReport = (reportType: string) => {
    toast({
      title: "Relatório gerado",
      description: `Relatório de ${reportType} foi criado com sucesso.`,
    });
  };

  const quickReports = [
    {
      title: "Performance de Vendas",
      description: "Análise detalhada das vendas",
      icon: TrendingUp,
      color: "text-success",
      bgColor: "bg-success/10",
      value: "+12%",
      subtitle: "vs mês anterior",
      action: () => handleGenerateReport("Performance de Vendas")
    },
    {
      title: "Curva ABC",
      description: "Classificação de produtos",
      icon: BarChart3,
      color: "text-info",
      bgColor: "bg-info/10",
      value: "ABC",
      subtitle: "análise completa",
      action: () => handleGenerateReport("Curva ABC")
    },
    {
      title: "Giro de Estoque",
      description: "Rotatividade dos produtos",
      icon: Package,
      color: "text-warning",
      bgColor: "bg-warning/10",
      value: "4.2x",
      subtitle: "média mensal",
      action: () => handleGenerateReport("Giro de Estoque")
    },
    {
      title: "Margem de Lucro",
      description: "Rentabilidade por produto",
      icon: TrendingUp,
      color: "text-primary",
      bgColor: "bg-primary/10",
      value: "35%",
      subtitle: "margem média",
      action: () => handleGenerateReport("Margem de Lucro")
    }
  ];

  const reportTabs = [
    { id: "overview", label: "Visão Geral", icon: BarChart3 },
    { id: "purchase", label: "Sugestão de Compra", icon: Package },
    { id: "expiring", label: "Produtos Vencendo", icon: AlertTriangle }
  ];

  const renderContent = () => {
    switch (activeReport) {
      case "purchase":
        return <PurchaseSuggestion />;
      case "expiring":
        return <ExpiringProducts />;
      default:
        return (
          <div className="space-y-6">
            {/* Quick Reports Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickReports.map((report, index) => {
                const Icon = report.icon;
                return (
                  <Card key={index} className="premium-card hover:scale-105 transition-transform duration-200 cursor-pointer">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">{report.title}</CardTitle>
                      <div className={`p-2 rounded-lg ${report.bgColor}`}>
                        <Icon className={`w-5 h-5 ${report.color}`} />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className={`text-2xl font-bold ${report.color} mb-1`}>
                        {report.value}
                      </div>
                      <p className="text-xs text-muted-foreground mb-3">
                        {report.subtitle}
                      </p>
                      <Button 
                        onClick={report.action}
                        size="sm" 
                        className="modern-button w-full"
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        Gerar Relatório
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Relatórios Avançados */}
            <Card className="premium-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <BarChart3 className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <span className="text-xl font-bold">Relatórios Avançados</span>
                    <p className="text-sm text-muted-foreground mt-1">
                      Análises detalhadas e insights estratégicos
                    </p>
                  </div>
                </CardTitle>
              </CardHeader>
              
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Análises Disponíveis</h3>
                    <div className="space-y-3">
                      {[
                        "Sazonalidade de Vendas",
                        "Análise de Fornecedores",
                        "Rentabilidade por Categoria",
                        "Previsão de Demanda"
                      ].map((analysis, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                          <span className="font-medium">{analysis}</span>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleGenerateReport(analysis)}
                            className="modern-button"
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Formatos de Exportação</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {["PDF", "Excel", "CSV", "JSON"].map((format) => (
                        <Button 
                          key={format}
                          variant="outline" 
                          className="modern-button"
                          onClick={() => toast({
                            title: `Exportando em ${format}`,
                            description: "Seu relatório será baixado em breve.",
                          })}
                        >
                          {format}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Relatórios
        </h1>
        <p className="text-muted-foreground text-lg mt-2">
          Análises detalhadas e insights do seu negócio
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 p-1 bg-muted/30 rounded-lg">
        {reportTabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <Button
              key={tab.id}
              variant={activeReport === tab.id ? "default" : "ghost"}
              onClick={() => setActiveReport(tab.id)}
              className={`flex items-center space-x-2 transition-all duration-200 ${
                activeReport === tab.id 
                  ? "bg-background shadow-md scale-105" 
                  : "hover:bg-muted/50 hover:scale-102"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </Button>
          );
        })}
      </div>

      {/* Conteúdo */}
      <div className="animate-fade-in">
        {renderContent()}
      </div>
    </div>
  );
};
