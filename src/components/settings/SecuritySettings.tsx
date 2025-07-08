
import { useState } from "react";
import { Shield, Key, Clock, AlertTriangle, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export const SecuritySettings = () => {
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: ""
  });
  const [sessions] = useState([
    { id: 1, device: "Chrome - Windows", location: "São Paulo, SP", lastActive: "Agora", current: true },
    { id: 2, device: "Safari - iPhone", location: "São Paulo, SP", lastActive: "2 horas atrás", current: false },
    { id: 3, device: "Firefox - Windows", location: "Rio de Janeiro, RJ", lastActive: "1 dia atrás", current: false }
  ]);
  const { toast } = useToast();

  const handlePasswordChange = () => {
    if (!passwords.current || !passwords.new || !passwords.confirm) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos.",
        variant: "destructive"
      });
      return;
    }

    if (passwords.new !== passwords.confirm) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem.",
        variant: "destructive"
      });
      return;
    }

    setPasswords({ current: "", new: "", confirm: "" });
    toast({
      title: "Senha alterada",
      description: "Sua senha foi atualizada com sucesso.",
    });
  };

  const handleEndSession = (sessionId: number) => {
    toast({
      title: "Sessão encerrada",
      description: "A sessão foi encerrada com sucesso.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Alteração de Senha */}
      <Card className="premium-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-warning/10">
              <Key className="w-6 h-6 text-warning" />
            </div>
            <span className="text-xl font-bold">Alterar Senha</span>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-password">Senha Atual</Label>
            <Input
              id="current-password"
              type="password"
              value={passwords.current}
              onChange={(e) => setPasswords({...passwords, current: e.target.value})}
              className="modern-input"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="new-password">Nova Senha</Label>
            <Input
              id="new-password"
              type="password"
              value={passwords.new}
              onChange={(e) => setPasswords({...passwords, new: e.target.value})}
              className="modern-input"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
            <Input
              id="confirm-password"
              type="password"
              value={passwords.confirm}
              onChange={(e) => setPasswords({...passwords, confirm: e.target.value})}
              className="modern-input"
            />
          </div>

          <Button onClick={handlePasswordChange} className="modern-button w-full">
            <Key className="w-4 h-4 mr-2" />
            Alterar Senha
          </Button>
        </CardContent>
      </Card>

      {/* Sessões Ativas */}
      <Card className="premium-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-info/10">
              <Shield className="w-6 h-6 text-info" />
            </div>
            <span className="text-xl font-bold">Sessões Ativas</span>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {sessions.map((session) => (
            <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${session.current ? 'bg-success/10' : 'bg-muted/50'}`}>
                  {session.current ? (
                    <CheckCircle className="w-5 h-5 text-success" />
                  ) : (
                    <Clock className="w-5 h-5 text-muted-foreground" />
                  )}
                </div>
                <div>
                  <div className="font-semibold flex items-center space-x-2">
                    <span>{session.device}</span>
                    {session.current && (
                      <span className="px-2 py-1 text-xs bg-success/20 text-success rounded-full">
                        Atual
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {session.location} • {session.lastActive}
                  </div>
                </div>
              </div>
              {!session.current && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEndSession(session.id)}
                  className="modern-button"
                >
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Encerrar
                </Button>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
