
import { User, Settings, Shield, Database } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const SettingsPage = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Configurações</h1>
        <p className="text-gray-600">Gerencie as configurações do sistema e sua conta</p>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="w-5 h-5 text-blue-600" />
              <span>Perfil do Usuário</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Nome</label>
              <p className="text-gray-900">João Silva</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Email</label>
              <p className="text-gray-900">joao@exemplo.com</p>
            </div>
            <Button variant="outline" className="w-full">
              Editar Perfil
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="w-5 h-5 text-green-600" />
              <span>Configurações Gerais</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Tema</label>
              <p className="text-gray-900">Claro</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Moeda</label>
              <p className="text-gray-900">Real (R$)</p>
            </div>
            <Button variant="outline" className="w-full">
              Configurar
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-orange-600" />
              <span>Segurança</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Último Login</label>
              <p className="text-gray-900">Hoje às 09:30</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Senha</label>
              <p className="text-gray-900">••••••••</p>
            </div>
            <Button variant="outline" className="w-full">
              Alterar Senha
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Database className="w-5 h-5 text-purple-600" />
              <span>Backup & Dados</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Último Backup</label>
              <p className="text-gray-900">Ontem às 23:00</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Tamanho dos Dados</label>
              <p className="text-gray-900">2.4 MB</p>
            </div>
            <Button variant="outline" className="w-full">
              Fazer Backup
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Coming Soon */}
      <Card>
        <CardContent className="p-8 text-center">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Settings className="w-6 h-6 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Mais Configurações em Breve
          </h3>
          <p className="text-gray-600">
            Estamos trabalhando em funcionalidades avançadas de configuração para 
            personalizar ainda mais sua experiência.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
