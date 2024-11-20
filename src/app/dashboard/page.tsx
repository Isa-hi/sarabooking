"use client"

import { useState } from "react";
import { TabsContent } from "@/components/ui/tabs";
import ServicesCard from "./ServicesCard";
import AppointmentsCard from "./AppointmentsCard";
import ClientsCard from "./ClientsCard";
import ReportsCard from "./ReportsCard";
import { ObtenerServicios } from "../actions";
import { ServiceType } from "@/types";

export default async function Page() {
  const [services, setServices] = useState<ServiceType[]>([]);
  setServices(await ObtenerServicios());

  const [appointments, setAppointments] = useState([
    {
      id: "1",
      clientName: "María García",
      service: "Corte de pelo",
      day: "2023-06-15",
      hour: "10:00",
      status: "Confirmado",
    },
    {
      id: "2",
      clientName: "Juan Pérez",
      service: "Manicura",
      day: "2023-06-16",
      hour: "11:00",
      status: "Pendiente",
    },
    {
      id: "3",
      clientName: "Ana Rodríguez",
      service: "Facial",
      day: "2023-06-17",
      hour: "14:00",
      status: "Completado",
    },
  ]);

  const [clients, setClients] = useState([
    {
      id: "1",
      name: "María García",
      email: "maria@example.com",
      phone: "123-456-7890",
      appointments: 5,
      preferences: "Corte de pelo",
    },
    {
      id: "2",
      name: "Juan Pérez",
      email: "juan@example.com",
      phone: "098-765-4321",
      appointments: 3,
      preferences: "Manicura",
    },
    {
      id: "3",
      name: "Ana Rodríguez",
      email: "ana@example.com",
      phone: "555-555-5555",
      appointments: 7,
      preferences: "Facial",
    },
  ]);

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
        <AppointmentsCard services={services} appointments={appointments}/>
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
