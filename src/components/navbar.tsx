"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isUserAdmin, setIsUserAdmin] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userObject = JSON.parse(storedUser);
      setUser(userObject);
      const adminEmail = "ejemplo@ejemplo.mx";
      setIsUserAdmin(userObject.email === adminEmail);
    }
  }, []);

  return (
    <>
      <nav className="flex items-center justify-between p-4 bg-primary text-primary-foreground">
        <h1 className="text-2xl font-bold">
          <a href="/">✨ SaraBooking </a>{" "}
        </h1>
        <div className="gap-4 flex">
          {user ? (
            <>
              <Button
                variant="secondary"
                onClick={() => {
                  localStorage.removeItem("user");
                  window.location.reload();
                }}
              >
                {" "}
                Cerrar sesión
              </Button>
              {isUserAdmin && (
                <Button
                  variant="ghost"
                  onClick={() => router.push("/dashboard")}
                >
                  Admin Dashboard
                </Button>
              )}
            </>
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
