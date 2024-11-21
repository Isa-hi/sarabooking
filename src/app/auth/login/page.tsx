"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { IniciarSesion } from "@/app/actions";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = {
      email: formData.get("email")!.toString(),
      password: formData.get("password")!.toString(),
    };
    IniciarSesion(data.email, data.password).then((user) => {
      if (user) {
        alert("Inicio de sesión correcto");       
        localStorage.setItem("user", JSON.stringify(user));
        window.location.href = "/";
      } else {
        alert("Credenciales incorrectas");
      }
    });
  };

  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Iniciar Sesión 🔐
        </CardTitle>
        <CardDescription className="text-center">
          Bienvenido de vuelta a SaraBooking ✨
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="tu@email.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-4 w-4" />
                  ) : (
                    <EyeIcon className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button className="w-full" type="submit">
            Iniciar Sesión
          </Button>
          <p className="text-sm text-center text-gray-600">
            ¿No tienes una cuenta?{" "}
            <a
              href="/auth/register"
              className="text-primary hover:underline text-fuchsia-600"
            >
              Registrate aquí
            </a>
          </p>
        </CardFooter>
      </form>
    </>
  );
}
