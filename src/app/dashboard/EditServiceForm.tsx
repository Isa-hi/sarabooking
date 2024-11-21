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
import { ServiceType } from "@/types";
import { ActualizarServicio, CrearServicio } from "../actions";

interface Service {
  service?: ServiceType;
}

export default function EditServiceForm({ service }: Service) {
  const [name, setName] = useState(service?.name || "");
  const [description, setDescription] = useState(service?.description || "");
  const [cost, setCost] = useState(service?.cost || 0);
  const [icon, setIcon] = useState(service?.icon || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (service) {
      ActualizarServicio(service.id, { name, description, cost, icon })
        .then(() => {
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error updating service:", error);
        });
    } else {
        CrearServicio({ name, description, cost, icon })
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
