"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ReservationFlow from "@/components/landing-page/reservationFlow";
import { ServiceType } from "@/types";
import { useState } from "react";

type props = {
  services: ServiceType[];
};
export default function LandingPage({ services }: props) {
  const [step, setStep] = useState(1);

  return (
    <>
      <section className="py-12 px-4 text-center bg-gradient-to-r from-pink-100 to-purple-100">
        <h2 className="text-4xl font-bold mb-4">Bienvenido a SaraBooking 🌟</h2>
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
    </>
  );
}
