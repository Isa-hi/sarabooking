import { TabsContent } from "@/components/ui/tabs";
import ServicesCard from "./ServicesCard";
import AppointmentsCard from "./AppointmentsCard";
import ClientsCard from "./ClientsCard";
import ReportsCard from "./ReportsCard";
import { ObtenerCitasExtendido, ObtenerServicios, ObtenerUsuarioConCitasTotales, ObtenerUsuarios } from "../actions";

export default async function Page() {
  const services = await ObtenerServicios();

  const appointments = await ObtenerCitasExtendido();

  const clients = await ObtenerUsuarioConCitasTotales();

  const statsData = [
    { id: "s1", service: "Corte de pelo", appointments: 45 },
    { id: "s2", service: "Manicura", appointments: 30 },
    { id: "s3", service: "Facial", appointments: 25 },
  ];

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
        <ReportsCard statsData={statsData} />
      </TabsContent>
    </>
  );
}
