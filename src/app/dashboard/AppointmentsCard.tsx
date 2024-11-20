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
import { AppointmentType, ServiceType } from "@/types";
import { useState } from "react";

type AppointmentsCardProps = {
    services: ServiceType[];
    appointments: AppointmentType[];
}

export default function AppointmentsCard({ services, appointments }: AppointmentsCardProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );

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
              </div>
              <div className="w-1/3">
                <Label htmlFor="serviceFilter">Filtrar por Servicio</Label>
                <Select>
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
              </div>
              <div className="w-1/3">
                <Label htmlFor="statusFilter">Filtrar por Estado</Label>
                <Select>
                  <SelectTrigger id="statusFilter">
                    <SelectValue placeholder="Seleccionar estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los estados</SelectItem>
                    <SelectItem value="confirmed">Confirmado</SelectItem>
                    <SelectItem value="pending">Pendiente</SelectItem>
                    <SelectItem value="completed">Completado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              {appointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-center justify-between p-2 border rounded"
                >
                  <div>
                    <h3 className="font-semibold">{appointment.clientName}</h3>
                    <p className="text-sm text-gray-500">
                      {appointment.service} - {appointment.date}{" "}
                      {appointment.time}
                    </p>
                  </div>
                  <div>
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        appointment.status === "Confirmado"
                          ? "bg-green-100 text-green-800"
                          : appointment.status === "Pendiente"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {appointment.status}
                    </span>
                  </div>
                  <div>
                    <Button variant="outline" size="sm" className="mr-2">
                      Modificar
                    </Button>
                    <Button variant="destructive" size="sm">
                      Cancelar
                    </Button>
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
