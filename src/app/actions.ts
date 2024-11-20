"use server";

import { prisma } from "@/lib/prisma";
import type { ServiceType } from "@/types";

export async function ObtenerServicios() {
  return await prisma.service.findMany();
}

export async function ObtenerServicioPorId(id: ServiceType["id"]) {
  return await prisma.service.findUnique({ where: { id } });
}

export async function CrearServicio(
  data: Pick<ServiceType, "name" | "icon" | "description" | "cost">
) {
  return await prisma.service.create({ data });
}

export async function ActualizarServicio(
  id: ServiceType["id"],
  data: Pick<ServiceType, "name" | "icon" | "description" | "cost">
) {
  return await prisma.service.update({ where: { id }, data });
}

export async function EliminarServicio(id: ServiceType["id"]) {
  return await prisma.service.delete({ where: { id } });
}
