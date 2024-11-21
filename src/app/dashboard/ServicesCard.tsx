import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Droplet, PlusIcon, Scissors, Sparkles, Sun } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EditServiceForm from "../../components/services/EditServiceForm";
import DeleteServiceDialog from "../../components/services/DeleteServiceDialog";
import type { Service } from "@prisma/client";

type ServicesCardProps = {
  services: Service[];
};
export default function ServicesCard({ services }: ServicesCardProps) {
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "Scissors":
        return <Scissors className="w-6 h-6" />;
      case "Sparkles":
        return <Sparkles className="w-6 h-6" />;
      case "Droplet":
        return <Droplet className="w-6 h-6" />;
      case "Sun":
        return <Sun className="w-6 h-6" />;
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
            <div
              key={service.id}
              className="flex items-center space-x-4 border-l-4 border-green-500 p-3 w-1/2"
            >
              {renderIcon(service.icon)}
              <div>
                <h3 className="font-semibold">{service.name}</h3>
                <p className="text-sm text-gray-500">{service.description}</p>
                <p className="text-sm text-gray-500">{service.cost} $</p>
              </div>
              <Dialog>
                <div className="border rounded-md p-2 hover:bg-zinc-200">
                  <DialogTrigger>Editar</DialogTrigger>
                </div>
                <DialogContent>
                  <DialogTitle>Formulario para editar servicio</DialogTitle>
                  <EditServiceForm service={service} />
                </DialogContent>
              </Dialog>
              <Dialog>
                <div className="bg-red-600 rounded-md p-2 text-white hover:bg-red-700">
                  <DialogTrigger>Eliminar</DialogTrigger>
                </div>
                <DialogContent>
                  <DeleteServiceDialog serviceId={service.id} />
                </DialogContent>
              </Dialog>
            </div>
          ))}

          <Dialog>
            <DialogTrigger>
              <div className="bg-black text-white p-2 rounded-md w-full flex">
                <PlusIcon />
                Añadir Nuevo Servicio
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>Formulario para editar servicio</DialogTitle>
              <EditServiceForm />
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
}
