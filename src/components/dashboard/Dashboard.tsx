
import { StatsCards } from "./StatsCards";
import { QuickActions } from "./QuickActions";
import { RecentSales } from "./RecentSales";
import { StockAlerts } from "./StockAlerts";
import { SalesChart } from "./SalesChart";
import { AnalyticsCards } from "@/components/analytics/AnalyticsCards";
import { AnalyticsCharts } from "@/components/analytics/AnalyticsCharts";
import { AIAssistant } from "@/components/ai/AIAssistant";

export const Dashboard = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Message - Enhanced */}
      <div className="premium-gradient-hero rounded-3xl p-8 md:p-12 text-white shadow-2xl hover-lift relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
        <div className="absolute top-4 right-4 opacity-20">
          <div className="text-8xl">📊</div>
        </div>
        <div className="relative z-10">
          <div className="flex items-start justify-between">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
                Bem-vindo ao{" "}
                <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                  StockPro
                </span>
                ! 👋
              </h1>
              <p className="text-blue-50/90 text-xl leading-relaxed max-w-3xl font-medium">
                Gerencie seu estoque e vendas de forma inteligente. 
                <br />
                Aqui está um resumo completo do seu negócio hoje.
              </p>
              <div className="flex items-center space-x-4 mt-6">
                <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                  <span className="text-sm font-medium">Sistema online</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                  <div className="text-sm font-medium">
                    {new Date().toLocaleDateString('pt-BR', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards - Enhanced */}
      <div className="animate-slide-up">
        <div className="mb-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Métricas Principais
          </h2>
          <p className="text-muted-foreground mt-1">Acompanhe os indicadores mais importantes do seu negócio</p>
        </div>
        <StatsCards />
      </div>

      {/* Analytics Cards - Enhanced */}
      <div className="space-y-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Analytics Avançado
            </h2>
            <p className="text-muted-foreground mt-1">Insights inteligentes para tomada de decisão</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 text-sm bg-success/10 text-success px-3 py-1.5 rounded-full font-medium">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
              <span>Dados em tempo real</span>
            </div>
          </div>
        </div>
        <AnalyticsCards />
      </div>

      {/* Quick Actions - Enhanced */}
      <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <QuickActions />
      </div>

      {/* Analytics Charts - Enhanced */}
      <div className="space-y-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-warning to-warning/70 bg-clip-text text-transparent">
              Insights e Tendências
            </h2>
            <p className="text-muted-foreground mt-1">Análise visual dos dados históricos</p>
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground bg-muted/30 px-3 py-1.5 rounded-full">
            <span>Últimos 6 meses</span>
          </div>
        </div>
        <AnalyticsCharts />
      </div>

      {/* Charts and Alerts Grid - Enhanced */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
        <SalesChart />
        <StockAlerts />
      </div>

      {/* Recent Sales - Enhanced */}
      <div className="animate-fade-in" style={{ animationDelay: '0.5s' }}>
        <div className="mb-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-success to-success/70 bg-clip-text text-transparent">
            Atividade Recente
          </h2>
          <p className="text-muted-foreground mt-1">Últimas transações e movimentações</p>
        </div>
        <RecentSales />
      </div>

      {/* AI Assistant - Enhanced */}
      <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
        <div className="mb-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-info to-info/70 bg-clip-text text-transparent">
            Assistente Inteligente
          </h2>
          <p className="text-muted-foreground mt-1">Obtenha insights personalizados com IA</p>
        </div>
        <AIAssistant />
      </div>
    </div>
  );
};
