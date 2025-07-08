
import { useState } from "react";
import { Settings, Sun, Moon, Globe, DollarSign, Bell, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export const GeneralSettings = () => {
  const [settings, setSettings] = useState({
    theme: "light",
    language: "pt-BR",
    currency: "BRL",
    notifications: true,
    autoBackup: true,
    twoFactor: false
  });
  const { toast } = useToast();

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    toast({
      title: "Configuração atualizada",
      description: "A alteração foi salva automaticamente.",
    });
  };

  return (
    <Card className="premium-card">
      <CardHeader>
        <CardTitle className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-success/10">
            <Settings className="w-6 h-6 text-success" />
          </div>
          <span className="text-xl font-bold">Configurações Gerais</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-8">
        {/* Tema */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-warning/10">
              {settings.theme === "light" ? (
                <Sun className="w-5 h-5 text-warning" />
              ) : (
                <Moon className="w-5 h-5 text-warning" />
              )}
            </div>
            <div>
              <Label className="text-base font-semibold">Tema</Label>
              <p className="text-sm text-muted-foreground">Escolha entre tema claro ou escuro</p>
            </div>
          </div>
          <Select value={settings.theme} onValueChange={(value) => handleSettingChange("theme", value)}>
            <SelectTrigger className="w-32 modern-input">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Claro</SelectItem>
              <SelectItem value="dark">Escuro</SelectItem>
              <SelectItem value="auto">Automático</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Idioma */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-info/10">
              <Globe className="w-5 h-5 text-info" />
            </div>
            <div>
              <Label className="text-base font-semibold">Idioma</Label>
              <p className="text-sm text-muted-foreground">Selecione o idioma da interface</p>
            </div>
          </div>
          <Select value={settings.language} onValueChange={(value) => handleSettingChange("language", value)}>
            <SelectTrigger className="w-32 modern-input">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pt-BR">Português</SelectItem>
              <SelectItem value="en-US">English</SelectItem>
              <SelectItem value="es-ES">Español</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Moeda */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <DollarSign className="w-5 h-5 text-primary" />
            </div>
            <div>
              <Label className="text-base font-semibold">Moeda</Label>
              <p className="text-sm text-muted-foreground">Moeda padrão para exibição</p>
            </div>
          </div>
          <Select value={settings.currency} onValueChange={(value) => handleSettingChange("currency", value)}>
            <SelectTrigger className="w-32 modern-input">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="BRL">Real (R$)</SelectItem>
              <SelectItem value="USD">Dólar ($)</SelectItem>
              <SelectItem value="EUR">Euro (€)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Notificações */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-warning/10">
              <Bell className="w-5 h-5 text-warning" />
            </div>
            <div>
              <Label className="text-base font-semibold">Notificações</Label>
              <p className="text-sm text-muted-foreground">Receber alertas e notificações</p>
            </div>
          </div>
          <Switch
            checked={settings.notifications}
            onCheckedChange={(checked) => handleSettingChange("notifications", checked)}
          />
        </div>

        {/* Backup Automático */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-success/10">
              <Shield className="w-5 h-5 text-success" />
            </div>
            <div>
              <Label className="text-base font-semibold">Backup Automático</Label>
              <p className="text-sm text-muted-foreground">Backup diário dos dados</p>
            </div>
          </div>
          <Switch
            checked={settings.autoBackup}
            onCheckedChange={(checked) => handleSettingChange("autoBackup", checked)}
          />
        </div>

        {/* Autenticação de Dois Fatores */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-destructive/10">
              <Shield className="w-5 h-5 text-destructive" />
            </div>
            <div>
              <Label className="text-base font-semibold">Autenticação 2FA</Label>
              <p className="text-sm text-muted-foreground">Segurança adicional da conta</p>
            </div>
          </div>
          <Switch
            checked={settings.twoFactor}
            onCheckedChange={(checked) => handleSettingChange("twoFactor", checked)}
          />
        </div>
      </CardContent>
    </Card>
  );
};
