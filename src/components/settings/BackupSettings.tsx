
import { useState } from "react";
import { Database, Download, Upload, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

export const BackupSettings = () => {
  const [backupProgress, setBackupProgress] = useState(0);
  const [isBackingUp, setIsBackingUp] = useState(false);
  const [lastBackup] = useState("Ontem às 23:00");
  const [dataSize] = useState("2.4 MB");
  const { toast } = useToast();

  const handleBackup = async () => {
    setIsBackingUp(true);
    setBackupProgress(0);

    // Simular progresso do backup
    const interval = setInterval(() => {
      setBackupProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsBackingUp(false);
          toast({
            title: "Backup concluído",
            description: "Seus dados foram salvos com sucesso.",
          });
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleRestore = () => {
    toast({
      title: "Restauração iniciada",
      description: "Seus dados estão sendo restaurados.",
    });
  };

  const handleExport = () => {
    toast({
      title: "Exportação iniciada",
      description: "Preparando arquivo para download.",
    });
  };

  return (
    <Card className="premium-card">
      <CardHeader>
        <CardTitle className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-info/10">
            <Database className="w-6 h-6 text-info" />
          </div>
          <span className="text-xl font-bold">Backup & Dados</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Status do Backup */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-success/10 rounded-lg border border-success/20">
            <div className="flex items-center space-x-2 mb-2">
              <CheckCircle className="w-5 h-5 text-success" />
              <span className="font-semibold text-success">Último Backup</span>
            </div>
            <p className="text-sm text-muted-foreground">{lastBackup}</p>
          </div>

          <div className="p-4 bg-info/10 rounded-lg border border-info/20">
            <div className="flex items-center space-x-2 mb-2">
              <Database className="w-5 h-5 text-info" />
              <span className="font-semibold text-info">Tamanho dos Dados</span>
            </div>
            <p className="text-sm text-muted-foreground">{dataSize}</p>
          </div>

          <div className="p-4 bg-warning/10 rounded-lg border border-warning/20">
            <div className="flex items-center space-x-2 mb-2">
              <Clock className="w-5 h-5 text-warning" />
              <span className="font-semibold text-warning">Backup Automático</span>
            </div>
            <p className="text-sm text-muted-foreground">Diário às 23:00</p>
          </div>
        </div>

        {/* Progresso do Backup */}
        {isBackingUp && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Fazendo backup...</span>
              <span className="text-sm text-muted-foreground">{backupProgress}%</span>
            </div>
            <Progress value={backupProgress} className="h-2" />
          </div>
        )}

        {/* Ações */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button 
            onClick={handleBackup}
            disabled={isBackingUp}
            className="modern-button flex items-center justify-center space-x-2"
          >
            <Upload className="w-4 h-4" />
            <span>Fazer Backup</span>
          </Button>

          <Button 
            onClick={handleRestore}
            variant="outline"
            className="modern-button flex items-center justify-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Restaurar</span>
          </Button>

          <Button 
            onClick={handleExport}
            variant="outline"
            className="modern-button flex items-center justify-center space-x-2"
          >
            <Database className="w-4 h-4" />
            <span>Exportar</span>
          </Button>
        </div>

        {/* Informações */}
        <div className="p-4 bg-muted/30 rounded-lg border border-dashed border-muted-foreground/20">
          <div className="flex items-start space-x-2">
            <AlertCircle className="w-5 h-5 text-info mt-0.5" />
            <div className="space-y-1">
              <p className="text-sm font-medium">Sobre os Backups</p>
              <p className="text-xs text-muted-foreground">
                Os backups são executados automaticamente todos os dias às 23:00. 
                Você pode fazer backup manual a qualquer momento. Os dados são 
                criptografados e armazenados com segurança.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
