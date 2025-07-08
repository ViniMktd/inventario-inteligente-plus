
import { useState } from "react";
import { User, Settings, Shield, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserProfile } from "./UserProfile";
import { GeneralSettings } from "./GeneralSettings";
import { SecuritySettings } from "./SecuritySettings";
import { BackupSettings } from "./BackupSettings";

export const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "Perfil", icon: User, component: UserProfile },
    { id: "general", label: "Geral", icon: Settings, component: GeneralSettings },
    { id: "security", label: "Segurança", icon: Shield, component: SecuritySettings },
    { id: "backup", label: "Backup", icon: Database, component: BackupSettings }
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || UserProfile;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Configurações
        </h1>
        <p className="text-muted-foreground text-lg mt-2">
          Gerencie as configurações do sistema e sua conta
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 p-1 bg-muted/30 rounded-lg">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "ghost"}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 transition-all duration-200 ${
                activeTab === tab.id 
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
        <ActiveComponent />
      </div>
    </div>
  );
};
