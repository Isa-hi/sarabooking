"use client";
import { CrearUsuario } from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import React, { useState } from "react";

export default function Page() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = {
      name: formData.get("name")!.toString(),
      email: formData.get("email")!.toString(),
      phone: formData.get("phone")!.toString(),
      password: formData.get("password")!.toString(),
    };

    if (data.password !== formData.get("confirmPassword")) {
      alert("Las contraseñas no coinciden");
    } else {
      if(data.name&& data.email&& data.password && data.phone){
        CrearUsuario(data).then(() => {
          alert("Usuario creado correctamente");
          window.location.href = "/auth/login";
        });
      }
    }
  };

  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Regístrate 📝
        </CardTitle>
        <CardDescription className="text-center">
          Únete a SaraBooking y comienza a reservar tus citas de belleza ✨
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre Completo</Label>
              <Input name="name" id="name" placeholder="María García" required />
            </div>
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
              <Label htmlFor="phone">Número celular</Label>
              <Input
                id="phone"
                type="number"
                name="phone"
                placeholder="2211221122"
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
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? (
                    <EyeOffIcon className="h-4 w-4" />
                  ) : (
                    <EyeIcon className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>
          <CardFooter className="flex flex-col space-y-4">
            <Button className="w-full mt-5" type="submit">
              Registrarse
            </Button>
            <p className="text-sm text-center text-gray-600">
              ¿Ya tienes una cuenta?{" "}
              <a
                href="/auth/login"
                className="text-primary hover:underline text-fuchsia-600"
              >
                Inicia sesión aquí
              </a>
            </p>
          </CardFooter>
        </form>
      </CardContent>
    </>
  );
}
