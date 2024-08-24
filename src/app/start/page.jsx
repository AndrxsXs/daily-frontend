import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

export default function Page() {
  return (
    <div className="grid justify-center">
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account">Iniciar sesión</TabsTrigger>
          <TabsTrigger value="password">Registro</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardDescription className="text-center">
                ¡Hola! Organiza tu día y mantén tus tareas bajo
                control.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Usuario</Label>
                <Input id="name" placeholder="Nombre de usuario" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="current">Contraseña</Label>
                <Input id="current" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Iniciar sesión</Button>
            </CardFooter>
            <CardDescription className="text-center">¿Nuevo usuario? Registrate</CardDescription>
          </Card>
        </TabsContent>
        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardDescription className="text-center">
                Ingresa tu usuario y contraseña para crear tu cuenta.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Usuario</Label>
                <Input id="name" placeholder="Nombre de usuario" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new">Contraseña</Label>
                <Input id="new" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Registrar</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
