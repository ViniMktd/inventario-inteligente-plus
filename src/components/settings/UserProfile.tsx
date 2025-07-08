
import { useState } from "react";
import { User, Edit2, Save, X, Mail, Phone, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "João Silva",
    email: "joao@exemplo.com",
    phone: "(11) 99999-9999",
    address: "São Paulo, SP"
  });
  const [editedProfile, setEditedProfile] = useState(profile);
  const { toast } = useToast();

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
    toast({
      title: "Perfil atualizado",
      description: "Suas informações foram salvas com sucesso.",
    });
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  return (
    <Card className="premium-card">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <User className="w-6 h-6 text-primary" />
            </div>
            <span className="text-xl font-bold">Perfil do Usuário</span>
          </div>
          {!isEditing ? (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setIsEditing(true)}
              className="modern-button"
            >
              <Edit2 className="w-4 h-4 mr-2" />
              Editar
            </Button>
          ) : (
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleCancel}
                className="modern-button"
              >
                <X className="w-4 h-4 mr-2" />
                Cancelar
              </Button>
              <Button 
                size="sm"
                onClick={handleSave}
                className="modern-button bg-success hover:bg-success/90"
              >
                <Save className="w-4 h-4 mr-2" />
                Salvar
              </Button>
            </div>
          )}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-semibold text-foreground">Nome Completo</Label>
            {isEditing ? (
              <Input
                id="name"
                value={editedProfile.name}
                onChange={(e) => setEditedProfile({...editedProfile, name: e.target.value})}
                className="modern-input"
              />
            ) : (
              <div className="flex items-center space-x-2 p-3 bg-muted/30 rounded-lg">
                <User className="w-4 h-4 text-muted-foreground" />
                <span className="font-medium">{profile.name}</span>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-semibold text-foreground">Email</Label>
            {isEditing ? (
              <Input
                id="email"
                type="email"
                value={editedProfile.email}
                onChange={(e) => setEditedProfile({...editedProfile, email: e.target.value})}
                className="modern-input"
              />
            ) : (
              <div className="flex items-center space-x-2 p-3 bg-muted/30 rounded-lg">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span className="font-medium">{profile.email}</span>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-semibold text-foreground">Telefone</Label>
            {isEditing ? (
              <Input
                id="phone"
                value={editedProfile.phone}
                onChange={(e) => setEditedProfile({...editedProfile, phone: e.target.value})}
                className="modern-input"
              />
            ) : (
              <div className="flex items-center space-x-2 p-3 bg-muted/30 rounded-lg">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span className="font-medium">{profile.phone}</span>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="address" className="text-sm font-semibold text-foreground">Endereço</Label>
            {isEditing ? (
              <Input
                id="address"
                value={editedProfile.address}
                onChange={(e) => setEditedProfile({...editedProfile, address: e.target.value})}
                className="modern-input"
              />
            ) : (
              <div className="flex items-center space-x-2 p-3 bg-muted/30 rounded-lg">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span className="font-medium">{profile.address}</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
