"use server";

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

// User Actions
export async function ObtenerUsuarioPorId(id: string) {
  return await prisma.user.findUnique({ where: { id } });
}

export async function IniciarSesion(email: string, password: string) {
  return await prisma.user.findFirst({ where: { email, password } });
}

export async function CrearUsuario(data: Omit<User, "id" | "createdAt" | "updatedAt">) {
  return await prisma.user.create({ data });
}