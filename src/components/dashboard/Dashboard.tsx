
import { StatsCards } from "./StatsCards";
import { QuickActions } from "./QuickActions";
import { RecentSales } from "./RecentSales";
import { StockAlerts } from "./StockAlerts";
import { SalesChart } from "./SalesChart";

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

      {/* Quick Actions */}
      <QuickActions />

      {/* Charts and Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SalesChart />
        <StockAlerts />
      </div>

      {/* Recent Sales */}
      <RecentSales />
    </div>
  );
};
