import { TabsContent } from "@/components/ui/tabs";
import ServicesCard from "./ServicesCard";
import AppointmentsCard from "./AppointmentsCard";
import ClientsCard from "./ClientsCard";
import ReportsCard from "./ReportsCard";
import { getServiceNames, ObtenerCitasExtendido, ObtenerServicios, ObtenerUsuarioConCitasTotales } from "../actions";

export default async function Page() {
  const services = await ObtenerServicios();

  const appointments = await ObtenerCitasExtendido();

  const clients = await ObtenerUsuarioConCitasTotales();

  const serviceIds = [...new Set(appointments.map((appointment) => appointment.serviceId))];
  const serviceNames = await getServiceNames(serviceIds);

  return (
    <>
      <TabsContent value="services">
        <ServicesCard services={services} />
      </TabsContent>

      <TabsContent value="appointments">
        <AppointmentsCard services={services} appointments={appointments} />
      </TabsContent>

      <TabsContent value="clients">
        <ClientsCard clients={clients} />
      </TabsContent>

      <TabsContent value="reports">
        <ReportsCard appointments={appointments} serviceNames={serviceNames} />
      </TabsContent>
    </>
  );
}
