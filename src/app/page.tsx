import { Clock, MapPin } from "lucide-react";
import LandingPage from "@/components/landing-page/LandingPage";
import { ObtenerServicios } from "./actions";

export default async function Component() {
  const services = await ObtenerServicios();
  
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <LandingPage services={services} />
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
