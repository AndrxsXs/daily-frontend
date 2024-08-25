"use client";

import { Button } from "@/components/ui/button";

import { useSession } from "next-auth/react";
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
import { CircleHelp } from "lucide-react";
import { LayoutList } from "lucide-react";
import { ListChecks } from "lucide-react";
import { Plus } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { redirect } from "next/navigation";

export default function Page() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    redirect("/start");
    return <p>Acceso denegado</p>;
  }

  return (
    <div className="grid justify-center">
      <Tabs defaultValue="pending" className="w-[800px] ">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pending">
            <span className="px-2 py-1 rounded transition-all duration-300 text-[#683142] hover:bg-white hover:shadow-md">
              <LayoutList className="inline h-4 w-4" /> Pendientes
            </span>
          </TabsTrigger>
          <TabsTrigger value="finished">
            <span className="px-2 py-1 rounded transition-all duration-300 text-[#683142] hover:bg-white hover:shadow-md">
              <ListChecks className="inline h-4 w-4" /> Finalizadas
            </span>
          </TabsTrigger>

          <TabsTrigger value="create">
            <span className="px-2 py-1 rounded transition-all duration-300 text-[#683142] hover:bg-white hover:shadow-md">
              <Plus className="inline h-4 w-4" /> Crear tarea
            </span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="pending">
          <Card className="w-full">
            <CardHeader>
              <CardDescription className="text-center">
                ¡Hola care pipi!
              </CardDescription>
            </CardHeader>
          </Card>
        </TabsContent>

        {/* Modulo de tareas finalizadas */}
        <TabsContent value="finished">
          <Card className="overflow-hidden w-full">
            <div className="flex">
              {/* Columna izquierda */}
              <div className="w-1/2 border-r">
                <div className="border-b">
                  <header className="px-6 py-4">
                    <h1 className="text-3xl font-bold text-center">
                      Tareas finalizadas
                    </h1>
                  </header>
                </div>
                <CardHeader>
                  <CardDescription className="text-center">
                    <div className="flex items-center space-x-2">
                      <Input
                        readOnly
                        value="Nombre de la tarea"
                        className="flex-grow"
                      />
                      <Button variant="outline">Rehacer</Button>
                    </div>
                  </CardDescription>
                </CardHeader>
              </div>
              {/* Columna derecha */}
              <div className="w-1/2">
                <div className="border-b">
                  <header className="px-6 py-4">
                    <h1 className="text-3xl font-bold text-center">Detalle</h1>
                  </header>
                </div>
                <CardHeader>
                  <CardDescription className="text-center">
                    Contenido
                  </CardDescription>
                </CardHeader>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="create">
          <Card className="overflow-hidden w-full">
            <div className="border-b">
              <header className="px-6 py-4">
                <h1 className="text-3xl font-bold text-center">Crear tarea</h1>
              </header>
            </div>
            <CardHeader className="px-6 py-4">
              <div className="grid w-full items-center gap-4">
                <div>
                  <Label htmlFor="name">Nombre tarea</Label>
                  <Input id="name" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="message">Detalles</Label>
                  <Textarea id="message" className="mt-1" />
                </div>
                <div className="flex justify-end">
                  <Button className="mt-4 px-4 py-2">
                    <Plus className="mr-2 h-4 w-4" />
                    Crear
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
