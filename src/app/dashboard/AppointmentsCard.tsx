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
import { Edit, Trash } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { EditarCita } from "../actions";

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

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentAppointment, setCurrentAppointment] =
    useState<Appointment | null>(null);

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

  const handleEditAppointment = (appointment: Appointment) => {
    setCurrentAppointment(appointment);
    setIsEditDialogOpen(true);
  };

  const handleSaveAppointment = () => {
    EditarCita(currentAppointment!.id, {
      motivo: currentAppointment!.motivo,
    }).then(() => {
      setIsEditDialogOpen(false);
      window.location.reload();
    });
  };

  const handleChangeAppointmentStatus = (id: string, status: string) => {
    EditarCita(id, { status }).then(() => {
      window.location.reload();
    });
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
                  <div className="flex items-center space-x-2">
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
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleEditAppointment(appointment)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Editar Cita</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <Label>Notas</Label>
                          <Input
                            value={currentAppointment?.motivo || ""}
                            onChange={(e) =>
                              setCurrentAppointment({
                                ...currentAppointment!,
                                motivo: e.target.value,
                              })
                            }
                          />
                          <Button onClick={handleSaveAppointment}>
                            Guardar
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Select
                      onValueChange={(value) =>
                        handleChangeAppointmentStatus(appointment.id, value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Cambiar estado" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Confirmado">Confirmado</SelectItem>
                        <SelectItem value="Pendiente">Pendiente</SelectItem>
                        <SelectItem value="Completado">Completado</SelectItem>
                        <SelectItem value="Cancelado">Cancelado</SelectItem>
                      </SelectContent>
                    </Select>
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
