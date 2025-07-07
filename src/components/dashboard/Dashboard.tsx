
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
    <div className="space-y-6">
      {/* Welcome Message */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">
          Bem-vindo ao StockPro! 👋
        </h1>
        <p className="text-blue-100">
          Gerencie seu estoque e vendas de forma inteligente. Aqui está um resumo do seu negócio hoje.
        </p>
      </div>

      {/* Stats Cards */}
      <StatsCards />

      {/* Analytics Cards */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Analytics Avançado</h2>
        <AnalyticsCards />
      </div>

      {/* Quick Actions */}
      <QuickActions />

      {/* Analytics Charts */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Insights e Tendências</h2>
        <AnalyticsCharts />
      </div>

      {/* Charts and Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SalesChart />
        <StockAlerts />
      </div>

      {/* Recent Sales */}
      <RecentSales />

      {/* AI Assistant */}
      <AIAssistant />
    </div>
  );
};
