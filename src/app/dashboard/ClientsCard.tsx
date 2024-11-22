import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog } from "@/components/ui/dialog";
import { Appointment, User } from "@prisma/client";
import {
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import { ObtenerServicioPorId } from "../actions";

type props = {
  clients: (User & { appointments: Appointment[] })[];
};
export default async function ClientsCard({ clients }: props) {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Gestión de Clientes</CardTitle>
          <CardDescription>
            Visualiza y gestiona la información de los clientes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {clients.map((client) => (
              <div key={client.id} className="p-4 border rounded">
                <h3 className="font-semibold">{client.name}</h3>
                <p className="text-sm text-gray-500">
                  {client.email} - {client.phone}
                </p>
                <p className="text-sm text-gray-500">{/* client */}</p>
                <p className="text-sm">
                  Citas totales: {client.appointments.length}
                </p>
                <div className="mt-2">
                  <Dialog>
                    <DialogTrigger>
                      <div className="border rounded-md p-2 hover:bg-zinc-200">
                        Ver historial
                      </div>
                    </DialogTrigger>
                    <DialogContent className="mt-4">
                      {" "}
                      <DialogTitle className="font-bold">
                        Historial de citas de {client.name}{" "}
                      </DialogTitle>
                      {client.appointments.map(async (appointment) => (
                        <div
                          key={appointment.id}
                          className="p-3 border rounded w-1/2"
                        >
                          <h3 className="font-semibold">
                            { (await ObtenerServicioPorId(appointment.serviceId))?.name }
                          </h3>
                          <p className="text-sm text-gray-500">
                            {appointment.day.toLocaleDateString()}{" "}
                            {appointment.hour}
                          </p>
                          <p>Motivo: {appointment.motivo}</p>
                        </div>
                      ))}
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
