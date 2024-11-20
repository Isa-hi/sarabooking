import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ClientType } from "@/types";

type props = {
    clients: ClientType[];
}
export default function ClientsCard({ clients }: props) {
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
                <p className="text-sm">Citas totales: {client.appointments}</p>
                <p className="text-sm">Preferencias: {client.preferences}</p>
                <div className="mt-2">
                  <Button variant="outline" size="sm" className="mr-2">
                    Ver Historial
                  </Button>
                  <Button variant="outline" size="sm">
                    Editar Perfil
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
