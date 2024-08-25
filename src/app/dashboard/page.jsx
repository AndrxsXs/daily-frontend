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
import { Trash2 } from "lucide-react";
import { Pencil } from "lucide-react";
import { X } from "lucide-react";
import { LayoutList } from "lucide-react";
import { ListChecks } from "lucide-react";
import { Plus } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { redirect } from "next/navigation";

import React, { useState } from "react";

export default function Page() {
  // Estado para controlar que se vea el textarea en tareas finalizadas.
  const [showTextarea, setShowTextarea] = useState(false);
  // Se obtiene el estado de la sesión.
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    redirect("/start");
    return <p>Acceso denegado</p>;
  }

  return (
    <main className="grid justify-center">
      <Tabs defaultValue="pending" className="w-[60dvw] max-w-[1000px]">
        <TabsList
          className="grid w-full grid-cols-3 gap-2
          text-tinto-500
          dark:text-tinto-200
          bg-[#d3b19e]"
        >
          <TabsTrigger
            value="pending"
            className="
          data-[state=active]:aria-selected:text-tinto-700 hover:shadow-sm hover:bg-tinto-50 dark:hover:bg-tinto-950"
          >
            <span className="px-2 rounded transition-shadow duration-300 ">
              <LayoutList className="inline h-4 w-4" /> Pendientes
            </span>
          </TabsTrigger>
          <TabsTrigger
            value="finished"
            className="
          data-[state=active]:aria-selected:text-tinto-700 hover:shadow-sm hover:bg-tinto-50 dark:hover:bg-tinto-950"
          >
            <span className="px-2 rounded transition-shadow duration-300 ">
              <ListChecks className="inline h-4 w-4" /> Finalizadas
            </span>
          </TabsTrigger>

          <TabsTrigger
            value="create"
            className="
          data-[state=active]:aria-selected:text-tinto-700 hover:shadow-sm hover:bg-tinto-50 dark:hover:bg-tinto-950"
          >
            <span className="px-2 rounded transition-shadow duration-300 ">
              <Plus className="inline h-4 w-4" /> Crear tarea
            </span>
          </TabsTrigger>
        </TabsList>

        {/* Módulo de tareas pendientes */}
        <TabsContent value="pending">
          <Card className="overflow-hidden w-full">
            <div className="flex">
              {/* Columna izquierda */}
              <div className="w-1/2 border-r">
                <div className="border-b">
                  <header className="px-6 py-4">
                    <h1 className="text-3xl font-bold text-center">
                      Tareas pendientes
                    </h1>
                  </header>
                </div>
                <CardHeader>
                  <CardDescription className="text-center">
                    <div className="flex items-center space-x-2">
                      <p
                        className="flex-grow cursor-pointer border rounded-md px-3 py-2 text-sm leading-5 text-gray-900 "
                        onClick={() => setShowTextarea(true)}
                      >
                        Nombre de la tarea
                      </p>
                      <Button variant="outline">Finalizar</Button>
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
                  <CardDescription>
                    {showTextarea && (
                      <>
                        <div className="flex justify-between items-center mb-2">
                          <Label htmlFor="message">Nombre de la tarea</Label>
                          <Button variant="ghost">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="relative">
                          <Textarea
                            id="message"
                            className="mt-1 pr-24 pb-10"
                            readOnly
                            style={{
                              outline: "none",
                              boxShadow: "none",
                              resize: "none", // No se si esto va
                            }}
                            onFocus={(e) => {
                              e.target.style.border = e.target.style.border;
                              e.target.style.outline = "none";
                            }}
                          />
                          <Button
                            className="absolute bottom-2 right-2" // Posicionamos el botón
                            size="sm"
                          >
                            <Pencil className="h-4 w-4 mr-1" /> Editar
                          </Button>
                        </div>
                      </>
                    )}
                  </CardDescription>
                </CardHeader>
              </div>
            </div>
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
                      <p
                        className="flex-grow cursor-pointer border rounded-md px-3 py-2 text-sm leading-5 text-gray-900 "
                        onClick={() => setShowTextarea(true)}
                      >
                        Nombre de la tarea
                      </p>
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
                  <CardDescription>
                    {showTextarea && (
                      <>
                        <div className="flex justify-between items-center mb-2">
                          <Label htmlFor="message">Nombre de la tarea</Label>
                          <Button variant="ghost">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <Textarea
                          id="message"
                          className="mt-1"
                          readOnly
                          style={{
                            outline: "none",
                            boxShadow: "none",
                          }}
                          onFocus={(e) => {
                            e.target.style.border = e.target.style.border;
                            e.target.style.outline = "none";
                          }}
                        />
                      </>
                    )}
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
                <div className="flex justify-end space-x-4">
                  <Button variant="outline">Cancelar</Button>
                  <Button className="px-4 py-2">
                    <Plus className="mr-2 h-4 w-4" />
                    Crear
                  </Button>
                </div>
                
              </div>
            </CardHeader>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}
