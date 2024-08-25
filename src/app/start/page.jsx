"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [registerData, setRegisterData] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.id]: e.target.value });
  };

  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.id]: e.target.value });
  };

  const handleInvalidCredentials = () => {
    setLoginData({ ...loginData, password: "" });
    setError("Credenciales inválidas");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      setLoading(true);
      const result = await signIn("credentials", {
        redirect: false,
        username: loginData.username,
        password: loginData.password,
      });
      if (result.error) {
        handleInvalidCredentials();
        setLoading(false);
      } else {
        router.push("/dashboard");
        setLoading(false);
      }
    } catch (error) {
      setError("Ocurrió un error durante el inicio de sesión");
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    try {
      setLoading(true);
      const response = await fetch(
        "https://confident-cooperation-production.up.railway.app/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(registerData),
        }
      );
      if (response.ok) {
        // Registro exitoso, ahora iniciamos sesión automáticamente
        await handleLogin(e);
        setLoading(false);
      } else {
        const data = await response.json();
        setError(data.message || "Error en el registro");
      }
    } catch (error) {
      setError("Ocurrió un error durante el registro");
      setLoading(false);
    }
  };

  return (
    <div className="grid justify-center">
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Iniciar sesión</TabsTrigger>
          <TabsTrigger value="register">Registro</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardDescription className="text-center">
                ¡Hola! Organiza tu día y mantén tus tareas bajo control.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleLogin}>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="username">Usuario</Label>
                  <Input
                    id="username"
                    placeholder="Nombre de usuario"
                    value={loginData.username}
                    onChange={handleLoginChange}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="password">Contraseña</Label>
                  <Input
                    id="password"
                    placeholder="Contraseña"
                    type="password"
                    value={loginData.password}
                    onChange={handleLoginChange}
                    required
                  />
                </div>
              </CardContent>
              <CardFooter>
                {!loading ? (
                  <Button type="submit" className="w-full">
                    Iniciar sesión
                  </Button>
                ) : (
                  <Button disabled className="w-full">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Cargando
                  </Button>
                )}
              </CardFooter>
            </form>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          </Card>
        </TabsContent>
        <TabsContent value="register">
          <Card>
            <CardHeader>
              <CardDescription className="text-center">
                Ingresa tu usuario y contraseña para crear tu cuenta.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleRegister}>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="register-username">Usuario</Label>
                  <Input
                    id="register-username"
                    placeholder="Nombre de usuario"
                    value={registerData.username}
                    onChange={handleRegisterChange}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="register-password">Contraseña</Label>
                  <Input
                    id="register-password"
                    type="password"
                    value={registerData.password}
                    onChange={handleRegisterChange}
                    required
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full">
                  Registrar
                </Button>
              </CardFooter>
            </form>
            {error && <p className="text-red-500 text-center">{error}</p>}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
