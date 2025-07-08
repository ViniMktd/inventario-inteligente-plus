
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
      {/* Welcome Message */}
      <div className="gradient-primary rounded-2xl p-8 text-white shadow-2xl hover-lift">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-3 tracking-tight">
              Bem-vindo ao StockPro! 👋
            </h1>
            <p className="text-blue-100 text-lg leading-relaxed max-w-2xl">
              Gerencie seu estoque e vendas de forma inteligente. Aqui está um resumo do seu negócio hoje.
            </p>
          </div>
          <div className="hidden lg:block">
            <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
              <span className="text-4xl">📊</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="animate-slide-up">
        <StatsCards />
      </div>

      {/* Analytics Cards */}
      <div className="space-y-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Analytics Avançado
          </h2>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
            <span>Dados em tempo real</span>
          </div>
        </div>
        <AnalyticsCards />
      </div>

      {/* Quick Actions */}
      <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <QuickActions />
      </div>

      {/* Analytics Charts */}
      <div className="space-y-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Insights e Tendências
          </h2>
          <div className="text-sm text-muted-foreground">
            Últimos 6 meses
          </div>
        </div>
        <AnalyticsCharts />
      </div>

      {/* Charts and Alerts Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
        <SalesChart />
        <StockAlerts />
      </div>

      {/* Recent Sales */}
      <div className="animate-fade-in" style={{ animationDelay: '0.5s' }}>
        <RecentSales />
      </div>

      {/* AI Assistant */}
      <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
        <AIAssistant />
      </div>
    </div>
  );
};
