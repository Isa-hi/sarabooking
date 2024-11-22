"use server";

import { transport } from "@/lib/nodemailer";
import { prisma } from "@/lib/prisma";
import type { ServiceType } from "@/types";
import { Appointment, User } from "@prisma/client";

// Service Actions
export async function ObtenerServicios() {
  return await prisma.service.findMany();
}

export async function ObtenerServicioPorId(id: ServiceType["id"]) {
  return await prisma.service.findUnique({ where: { id } });
}

export async function ObtenerServicioPorNombre(name: ServiceType["name"]) {
  return await prisma.service.findFirst({ where: { name } });
}

export async function CrearServicio(
  data: Pick<ServiceType, "name" | "icon" | "description" | "cost" | "schedules">
) {
  return await prisma.service.create({ data });
}

export async function ActualizarServicio(
  id: ServiceType["id"],
  data: Pick<ServiceType, "name" | "icon" | "description" | "cost" | "schedules">
) {
  return await prisma.service.update({ where: { id }, data });
}

export async function EliminarServicio(id: ServiceType["id"]) {
  return await prisma.service.delete({ where: { id } });
}

// Appointment Actions
export async function ObtenerCitas() {
  return await prisma.appointment.findMany();
}

export async function ObtenerCitasExtendido() {
  return await prisma.appointment.findMany({ include: { user: true, service: true } });
}

export async function CrearCita(data: Omit<Appointment, "id" | "createdAt" | "updatedAt">) {
  return await prisma.appointment.create({ data });
}

export async function ObtenerHorariosDisponibles({ serviceId, date }: { serviceId: ServiceType["id"]; date: Date }) {
  const service = await prisma.service.findUnique({ where: { id: serviceId } });
  if (!service) return [];
  const appointments = await prisma.appointment.findMany({ where: { serviceId, day: date } });
  return service.schedules.filter((time) => !appointments.some((appointment) => appointment.hour === time));
  
}

export async function EditarCita(id: string, data: Partial<Appointment>) {
  return await prisma.appointment.update({
    where: { id },
    data,
  });
}
// User Actions
export async function ObtenerUsuarios() {
  return await prisma.user.findMany({});
}

export async function ObtenerUsuarioConCitasTotales() {
  return await prisma.user.findMany({
    include: {
      appointments: true,
    },
  });
}

export async function ObtenerUsuarioPorId(id: string) {
  return await prisma.user.findUnique({ where: { id } });
}

export async function IniciarSesion(email: string, password: string) {
  return await prisma.user.findFirst({ where: { email, password } });
}

export async function CrearUsuario(data: Omit<User, "id" | "createdAt" | "updatedAt">) {
  return await prisma.user.create({ data });
}

// Tools
export async function getServiceNames(serviceIds: string[]) {
  const services = await prisma.service.findMany({
    where: {
      id: {
        in: serviceIds
      }
    },
    select: {
      id: true,
      name: true
    }
  })

  return services.reduce((acc, service) => {
    acc[service.id] = service.name
    return acc
  }, {} as Record<string, string>)
}

export async function EnviarEmail({ fromData, toData, subjectData, textData, htmlData } : { fromData: string, toData: string, subjectData: string, textData: string, htmlData: string }) {
  console.log("Sending email to", toData); 
  try {
    return await transport.sendMail({ from: fromData, to: toData, subject: subjectData, text: textData, html: htmlData });
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}