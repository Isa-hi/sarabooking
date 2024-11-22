"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Appointment, Service, User } from "@prisma/client";
import { useState } from "react";

type AppointmentsCardProps = {
  services: Service[];
  appointments: (Appointment & { user: User } & { service: Service })[];
};

export default function AppointmentsCard({
  services,
  appointments,
}: AppointmentsCardProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [selectedService, setSelectedService] = useState<string | undefined>();
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>();

  const [filteredAppointments, setFilteredAppointments] =
    useState(appointments);

  const handleDateFilter = () => {
    if (selectedDate) {
      setFilteredAppointments(
        appointments.filter(
          (appointment) =>
            appointment.day.toDateString() === selectedDate.toDateString()
        )
      );
    }
  };

  const handleServiceFilter = () => {
    if (selectedService) {
      if (selectedService === "all") {
        setFilteredAppointments(appointments);
        return;
      }
      setFilteredAppointments(
        appointments.filter(
          (appointment) => appointment.service.name === selectedService
        )
      );
    }
  };

  const handleStatusFilter = () => {
    if (selectedStatus) {
      if (selectedStatus === "all") {
        setFilteredAppointments(appointments);
        return;
      }
      setFilteredAppointments(
        appointments.filter(
          (appointment) => appointment.status === selectedStatus
        )
      );
    }
  };

  const handleSelectStatus = (value: string) => {
    setSelectedStatus(value);
  };
  const handleSelectService = (value: string) => {
    setSelectedService(value);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Vista General de Citas</CardTitle>
          <CardDescription>
            Gestiona y filtra las citas programadas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex space-x-4">
              <div className="w-1/3">
                <Label htmlFor="dateFilter">Filtrar por Fecha</Label>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                />
                <Button className="w-full" onClick={handleDateFilter}>
                  Filtar por fecha
                </Button>
              </div>
              <div className="w-1/3">
                <Label htmlFor="serviceFilter">Filtrar por Servicio</Label>
                <Select onValueChange={handleSelectService}>
                  <SelectTrigger id="serviceFilter">
                    <SelectValue placeholder="Seleccionar servicio" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los servicios</SelectItem>
                    {services.map((service) => (
                      <SelectItem key={service.id} value={service.name}>
                        {service.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button className="w-full" onClick={handleServiceFilter}>
                  Filtar por servicio
                </Button>
              </div>
              <div className="w-1/3">
                <Label htmlFor="statusFilter">Filtrar por Estado</Label>
                <Select onValueChange={handleSelectStatus}>
                  <SelectTrigger id="statusFilter">
                    <SelectValue placeholder="Seleccionar estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los estados</SelectItem>
                    <SelectItem value="Confirmado">Confirmado</SelectItem>
                    <SelectItem value="Pendiente">Pendiente</SelectItem>
                    <SelectItem value="Completado">Completado</SelectItem>
                    <SelectItem value="Cancelado">Cancelado</SelectItem>
                  </SelectContent>
                </Select>
                <Button className="w-full" onClick={handleStatusFilter}>
                  Filtar por estado
                </Button>
              </div>
            </div>
            <div className="space-y-2 w-1/2">
              {filteredAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-center justify-between p-2 border rounded"
                >
                  <div>
                    <h3 className="font-semibold">{appointment.user.name}</h3>
                    <p className="text-sm text-gray-500">
                      {appointment.service.name} -{" "}
                      {appointment.day.toLocaleDateString()} {appointment.hour}
                    </p>
                    <p>Motivo: {appointment.motivo}</p>
                  </div>
                  <div>
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        appointment.status === "Confirmado"
                          ? "bg-green-100 text-green-800"
                          : appointment.status === "Pendiente"
                          ? "bg-yellow-100 text-yellow-800"
                          : appointment.status === "Cancelado"
                          ? "bg-red-100 text-red-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {appointment.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
