"use client";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export default function Navbar() {
  const router = useRouter();
  const user = localStorage.getItem("user");

  return (
    <>
      <nav className="flex items-center justify-between p-4 bg-primary text-primary-foreground">
        <h1 className="text-2xl font-bold">
          <a href="/">✨ SaraBooking </a>{" "}
        </h1>
        <div className="gap-4 flex">
          {user?.length ? (
            <Button
              variant="secondary"
              onClick={() => {
                localStorage.removeItem("user");
                window.location.reload()
              }}
            >
              {" "}
              Cerrar sesión
            </Button>
          ) : (
            <>
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
            </>
          )}
        </div>
      </nav>
    </>
  );
}
