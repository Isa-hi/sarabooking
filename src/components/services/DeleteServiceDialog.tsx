"use client"

import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ServiceType } from "@/types";
import { EliminarServicio } from "../../app/actions";

type DeleteServiceDialogProps = {
    serviceId: ServiceType["id"];
};
export default function DeleteServiceDialog({ serviceId }: DeleteServiceDialogProps) {
    const handleDelete = () => {
        EliminarServicio(serviceId)
            .then(() => {
                window.location.reload();
            })
            .catch((error) => {
                console.error("Error deleting service:", error);
            });
    };
  return (
    <>
      <DialogTitle>Formulario para editar servicio</DialogTitle>
      <DialogHeader>
        <h2>Eliminar Servicio</h2>
      </DialogHeader>
      <DialogDescription>
        ¿Estás seguro de que deseas eliminar el servicio?
      </DialogDescription>
      <div className="flex justify-end space-x-4">
        <Button>Cancelar</Button>
        <Button variant="destructive" onClick={handleDelete}>Eliminar</Button>
      </div>
    </>
  );
}
