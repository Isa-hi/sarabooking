import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { ServiceType } from "@/types";
import { Scissors, Sparkles, Droplet, Sun } from "lucide-react";
import { CrearCita, ObtenerHorariosDisponibles, ObtenerServicioPorNombre } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";

type ReservationFlowProps = {
  step: number;
  setStep: (step: number) => void;
  services: ServiceType[];
};

export default function ReservationFlow({
  step,
  setStep,
  services,
}: ReservationFlowProps) {
  const { toast } = useToast();
  const [selectedService, setSelectedService] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState("");
  const [serviceFromDB, setServiceFromDB] = useState<ServiceType | null>(null);
  const [times, setTimes] = useState<string[]>([]);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);

  const user = localStorage.getItem("user")!;
  const userObject = JSON.parse(user);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const serviceFromDB = await ObtenerServicioPorNombre(selectedService);
        if (!serviceFromDB) return;
        setServiceFromDB(serviceFromDB);
        setTimes(serviceFromDB.schedules);
        const availableTimes = await ObtenerHorariosDisponibles({ serviceId: serviceFromDB.id, date: selectedDate! });
        setAvailableTimes(availableTimes);
      } catch (error) {
        console.error("Error fetching service:", error);
      }
    };

    fetchService();
  }, [selectedService, selectedDate]);

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "Scissors":
        return <Scissors className="w-6 h-6" />;
      case "Sparkles":
        return <Sparkles className="w-6 h-6" />;
      case "Droplet":
        return <Droplet className="w-6 h-6" />;
      case "Sun":
        return <Sun className="w-6 h-6" />;
      default:
        return null;
    }
  };

  const handleSubmit = () => {
    if (!selectedDate || !selectedTime || !serviceFromDB) return;
    CrearCita({
      day: selectedDate,
      hour: selectedTime,
      serviceId: serviceFromDB.id,
      userId: userObject.id,
    });
    toast({
      title: "Reserva Exitosa",
      description: `Tu cita para ${selectedService} ha sido reservada para el ${selectedDate?.toLocaleDateString()} a las ${selectedTime}`,
      className: "bg-green-100 border-green-500",
    });
    setSelectedService("");
    setSelectedDate(undefined);
    setSelectedTime("");
    setStep(1);
  };

  return (
    <>
      {step >= 2 && (
        <section className="py-12 px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Reserva Tu Cita 📅
          </h2>
          <div className="max-w-4xl mx-auto">
            {step === 2 && (
              <div>
                <h3 className="text-2xl font-semibold mb-4">
                  Selecciona un Servicio
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {services.map((service) => (
                    <Button
                      key={service.name}
                      variant={
                        selectedService === service.name ? "default" : "outline"
                      }
                      className="h-auto py-4"
                      onClick={() => {
                        setSelectedService(service.name);
                        setStep(3);
                      }}
                    >
                      <div className="flex flex-col items-center gap-2">
                        {renderIcon(service.icon)}
                        {service.name}
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
            )}
            {step === 3 && (
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold mb-4">
                  Selecciona Fecha y Hora
                </h3>
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => setSelectedDate(date)}
                      disabled={(date) => date < new Date()}
                      className="rounded-md border bg-white"
                    />
                    </div>
                  <div className="flex-1">
                    <div className="grid grid-cols-2 gap-2">
                      {times.map((time) => (
                        <Button
                          key={time}
                          variant={
                            selectedTime === time ? "default" : "outline"
                          }
                          onClick={() => setSelectedTime(time)}
                          disabled={!availableTimes.includes(time)}
                          className={"disabled:opacity-50 disabled:cursor-not-allowed"}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
                <Button
                  onClick={() => setStep(4)}
                  disabled={!selectedDate || !selectedTime}
                >
                  Siguiente
                </Button>
              </div>
            )}
            {step === 4 && (
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold mb-4">
                  Completa Tu Reserva
                </h3>
                <div className="grid gap-4">
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label
                      htmlFor="name"
                      className="text-fuchsia-800 font-bold text-md"
                    >
                      Nombre
                    </Label>
                    <Input
                      type="text"
                      id="name"
                      placeholder="Tu Nombre"
                      className="bg-white"
                    />
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label
                      htmlFor="phone"
                      className="text-fuchsia-800 font-bold text-md"
                    >
                      Número de Contacto
                    </Label>
                    <Input
                      type="tel"
                      id="phone"
                      placeholder="Tu Número de Teléfono"
                      className="bg-white"
                    />
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label
                      htmlFor="reason"
                      className="text-fuchsia-800 font-bold text-md"
                    >
                      Motivo de la Cita
                    </Label>
                    <Textarea
                      id="reason"
                      placeholder="Cuéntanos más sobre tu cita"
                      className="bg-white"
                    />
                  </div>
                </div>
                <div className="pt-4">
                  <Button onClick={handleSubmit}>Confirmar Reserva</Button>
                </div>
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
}
