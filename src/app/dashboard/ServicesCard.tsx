import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ServiceType } from "@/types";
import { Scissors, Sparkles } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EditServiceForm from "./EditServiceForm";

type ServicesCardProps = {
  services: ServiceType[];
};
export default function ServicesCard({ services }: ServicesCardProps) {
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "Scissors":
        return <Scissors className="w-6 h-6" />;
      case "Sparkles":
        return <Sparkles className="w-6 h-6" />;
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestión de Servicios</CardTitle>
        <CardDescription>
          Añade, modifica o elimina servicios ofrecidos
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {services.map((service) => (
            <div key={service.id} className="flex items-center space-x-4">
              {renderIcon(service.icon)}
              <div>
                <h3 className="font-semibold">{service.name}</h3>
                <p className="text-sm text-gray-500">{service.description}</p>
              </div>
                <Dialog>
                  <DialogTrigger>Editar</DialogTrigger>
                  <DialogContent>
                  <DialogTitle>Formulario para editar servicio</DialogTitle>
                    <EditServiceForm service={service} />
                  </DialogContent>
                </Dialog>
              <Button variant="destructive" size="sm">
                Eliminar
              </Button>
            </div>
          ))}
          <Button>Añadir Nuevo Servicio</Button>
        </div>
      </CardContent>
    </Card>
  );
}
