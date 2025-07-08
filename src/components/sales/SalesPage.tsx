
import { useState } from "react";
import { Search, Calendar, Filter, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SalesStats } from "./SalesStats";
import { SalesTable } from "./SalesTable";
import { NewSaleDialog } from "./NewSaleDialog";
import { useToast } from "@/hooks/use-toast";

export const SalesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("today");
  const [statusFilter, setStatusFilter] = useState("all");
  const { toast } = useToast();

  const handleExportSales = () => {
    toast({
      title: "Exportando vendas",
      description: "Seu relatório de vendas será baixado em breve.",
    });
  };

  const handleDateFilter = (period: string) => {
    setDateFilter(period);
    toast({
      title: "Filtro aplicado",
      description: `Exibindo vendas de: ${period === "today" ? "Hoje" : period === "week" ? "Esta semana" : period === "month" ? "Este mês" : "Período personalizado"}`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-success to-success/60 bg-clip-text text-transparent">
            Vendas
          </h1>
          <p className="text-muted-foreground text-lg mt-2">
            Gerencie suas vendas e histórico de transações
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center space-x-2">
            <Button 
              variant={dateFilter === "today" ? "default" : "outline"} 
              size="sm"
              onClick={() => handleDateFilter("today")}
              className="modern-button"
            >
              Hoje
            </Button>
            <Button 
              variant={dateFilter === "week" ? "default" : "outline"} 
              size="sm"
              onClick={() => handleDateFilter("week")}
              className="modern-button"
            >
              Semana
            </Button>
            <Button 
              variant={dateFilter === "month" ? "default" : "outline"} 
              size="sm"
              onClick={() => handleDateFilter("month")}
              className="modern-button"
            >
              Mês
            </Button>
          </div>
          
          <Button 
            variant="outline" 
            onClick={handleExportSales}
            className="modern-button"
          >
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
          
          <NewSaleDialog />
        </div>
      </div>

      {/* Stats */}
      <SalesStats />

      {/* Advanced Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Buscar por número, cliente..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="modern-input pl-10"
          />
        </div>
        
        <Button 
          variant="outline"
          className="modern-button justify-start"
          onClick={() => toast({ title: "Filtro de data", description: "Seletor de período será aberto" })}
        >
          <Calendar className="w-4 h-4 mr-2" />
          Período personalizado
        </Button>
        
        <div className="flex space-x-2">
          <Button 
            variant={statusFilter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("all")}
            className="modern-button flex-1"
          >
            Todas
          </Button>
          <Button 
            variant={statusFilter === "completed" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("completed")}
            className="modern-button flex-1"
          >
            Concluídas
          </Button>
          <Button 
            variant={statusFilter === "pending" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("pending")}
            className="modern-button flex-1"
          >
            Pendentes
          </Button>
        </div>
        
        <Button 
          variant="outline"
          className="modern-button"
          onClick={() => toast({ title: "Filtros avançados", description: "Modal de filtros será aberto" })}
        >
          <Filter className="w-4 h-4 mr-2" />
          Mais filtros
        </Button>
      </div>

      {/* Sales Table */}
      <SalesTable searchTerm={searchTerm} />

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button 
          variant="outline" 
          className="modern-button h-16 text-left flex-col items-start justify-center"
          onClick={() => toast({ title: "Relatório diário", description: "Gerando relatório de vendas do dia" })}
        >
          <div className="font-semibold">Relatório Diário</div>
          <div className="text-sm text-muted-foreground">Vendas de hoje</div>
        </Button>
        
        <Button 
          variant="outline" 
          className="modern-button h-16 text-left flex-col items-start justify-center"
          onClick={() => toast({ title: "Metas de vendas", description: "Visualizando progresso das metas" })}
        >
          <div className="font-semibold">Metas de Vendas</div>
          <div className="text-sm text-muted-foreground">Acompanhar progresso</div>
        </Button>
        
        <Button 
          variant="outline" 
          className="modern-button h-16 text-left flex-col items-start justify-center"
          onClick={() => toast({ title: "Comissões", description: "Calculando comissões de vendedores" })}
        >
          <div className="font-semibold">Comissões</div>
          <div className="text-sm text-muted-foreground">Calcular vendedores</div>
        </Button>
      </div>
    </div>
  );
};
