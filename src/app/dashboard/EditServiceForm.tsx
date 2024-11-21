"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Scissors, Sparkles, Droplet, Sun } from "lucide-react";
import { ActualizarServicio, CrearServicio } from "../actions";
import type { Service } from "@prisma/client"

interface props {
  service?: Service;
}

export default function EditServiceForm({ service }: props) {
  const [name, setName] = useState(service?.name || "");
  const [description, setDescription] = useState(service?.description || "");
  const [cost, setCost] = useState(service?.cost || 0);
  const [icon, setIcon] = useState(service?.icon || "");
  const [schedules, setSchedules] = useState(service?.schedules || []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (service) {
      ActualizarServicio(service.id, { name, description, cost, icon, schedules })
        .then(() => {
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error updating service:", error);
        });
    } else {
        CrearServicio({ name, description, cost, icon, schedules })
        .then(() => {
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error creating service:", error);
        });
    }
  };

  const iconOptions = [
    {
      value: "Scissors",
      label: "Tijeras",
      icon: <Scissors className="mr-2 h-4 w-4" />,
    },
    {
      value: "Sparkles",
      label: "Destellos",
      icon: <Sparkles className="mr-2 h-4 w-4" />,
    },
    {
      value: "Droplet",
      label: "Gota",
      icon: <Droplet className="mr-2 h-4 w-4" />,
    },
    { value: "Sun", label: "Sol", icon: <Sun className="mr-2 h-4 w-4" /> },
  ];

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>
          {service ? "Editar Servicio" : "Añadir Nuevo Servicio"}
        </CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre del Servicio</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej: Corte de Pelo"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Breve descripción del servicio"
              required
            />
          </div>
            <div className="space-y-2">
            <Label htmlFor="schedules">Horarios</Label>
            <div className="grid grid-cols-4 gap-2">
              {Array.from({ length: 12 }, (_, i) => {
              const hour = i + 8;
              const time = `${hour}:00${hour < 12 ? "am" : "pm"}`;
              const selectedSchedule = schedules.includes(time);
              return (
                <Button
                key={time}
                className={selectedSchedule ? "bg-green-600" : "bg-white text-black"}
                onClick={(e) => {
                  e.preventDefault();
                  setSchedules((prev) =>
                  selectedSchedule
                    ? prev.filter((t) => t !== time)
                    : [...prev, time]
                  );
                  console.log(schedules);
                }}
                >
                {time}
                </Button>
              );
              })}
            </div>
            </div>
          <div className="space-y-2">
            <Label htmlFor="cost">Costo ($)</Label>
            <Input
              id="cost"
              type="number"
              value={cost}
              onChange={(e) => setCost(Number(e.target.value))}
              min="0"
              step="0.01"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="icon">Icono</Label>
            <Select value={icon} onValueChange={setIcon}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona un icono" />
              </SelectTrigger>
              <SelectContent>
                {iconOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex items-center">
                      {option.icon}
                      {option.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            {service ? "Actualizar Servicio" : "Añadir Servicio"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
