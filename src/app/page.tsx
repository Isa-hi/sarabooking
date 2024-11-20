"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, MapPin, Scissors, Sparkles } from "lucide-react";
import ReservationFlow from "@/components/landing-page/reservationFlow";
import { useState } from "react";

export default function Component() {
  const [step, setStep] = useState(1);

  const services = [
    { name: "Corte de pelo 💇", icon: <Scissors className="w-6 h-6" /> },
    { name: "Manicura 💅", icon: <Sparkles className="w-6 h-6" /> },
    { name: "Facial 🧖‍♀️", icon: <Sparkles className="w-6 h-6" /> },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <section className="py-12 px-4 text-center bg-gradient-to-r from-pink-100 to-purple-100">
          <h2 className="text-4xl font-bold mb-4">
            Bienvenido a SaraBooking 🌟
          </h2>
          <p className="text-xl mb-8">
            Tu destino único para belleza y relajación
          </p>
          <Button size="lg" onClick={() => setStep(2)}>
            Reservar Ahora 📅
          </Button>
        </section>
        <section id="reservation-flow" className="bg-fuchsia-200">
          <ReservationFlow step={step} setStep={setStep} services={services} />
        </section>
        <section className="py-12 px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Nuestros Servicios 💆‍♀️
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <Card key={service.name} className="text-center">
                <CardHeader>
                  <CardTitle className="flex items-center justify-center gap-2">
                    {service.icon}
                    {service.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Experimenta lo mejor en cuidado de belleza</p>
                  <ul className="list-disc list-inside text-center mt-2">
                    <li>Profesionales expertos</li>
                    <li>Productos de alta calidad</li>
                    <li>Atención personalizada</li>
                  </ul>
                  <span className="block mt-4 font-bold">Desde $150</span>
                  <a href="#reservation-flow">
                    <Button
                      className="mt-4 bg-fuchsia-600"
                      onClick={() => setStep(2)}
                    >
                      {" "}
                      Reservar Ahora
                    </Button>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
        <section className="py-12 px-4 bg-muted">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ubicación y Horarios 📍</h2>
            <p className="flex items-center justify-center gap-2 mb-2">
              <MapPin className="w-5 h-5" />
              Calle Belleza 123, Ciudad Glamour
            </p>
            <p className="flex items-center justify-center gap-2">
              <Clock className="w-5 h-5" />
              Lun-Sáb: 10:00 AM - 7:00 PM
            </p>
          </div>
        </section>
      </main>
      <footer className="py-6 px-4 bg-primary text-primary-foreground text-center">
        <p>© 2024 SaraBooking. Todos los derechos reservados. ✨</p>
      </footer>
    </div>
  );
}
