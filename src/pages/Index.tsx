
import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { ProductsPage } from "@/components/products/ProductsPage";
import { SalesPage } from "@/components/sales/SalesPage";
import { ReportsPage } from "@/components/reports/ReportsPage";
import { SettingsPage } from "@/components/settings/SettingsPage";

const Index = () => {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard />;
      case "products":
        return <ProductsPage />;
      case "sales":
        return <SalesPage />;
      case "reports":
        return <ReportsPage />;
      case "settings":
        return <SettingsPage />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />
      
      <div className="lg:ml-64">
        <Header 
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          currentPage={currentPage}
        />
        
        <main className="p-4 lg:p-6">
          {renderCurrentPage()}
        </main>
      </div>
    </div>
  );
};

export default Index;
