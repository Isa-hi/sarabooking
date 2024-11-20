"use client";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export default function Navbar() {
  const router = useRouter();
  return (
    <>
      <nav className="flex items-center justify-between p-4 bg-primary text-primary-foreground">
        <h1 className="text-2xl font-bold">
          <a href="/">✨ SaraBooking </a>{" "}
        </h1>
        <div className="gap-4 flex">
          <Button
            variant="secondary"
            onClick={() => router.push("/auth/register")}
          >
            Registrarse
          </Button>
          <Button
            variant="ghost"
            className="border"
            onClick={() => router.push("/auth/login")}
          >
            Iniciar sesión
          </Button>
        </div>
      </nav>
    </>
  );
}
