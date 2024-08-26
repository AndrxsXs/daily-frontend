import React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";

import { useSession } from "next-auth/react";
import { useState } from "react";

import { AuthFetch } from "@/utils/AuthFetch";

export default function CreateTask() {
  const { data: session, status } = useSession();
  const userId = session?.user.id;
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = () => {
    setNombre("");
    setDescripcion("");
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const idCreador = userId || session?.user.id;
    const taskData = {
      nombre,
      descripcion,
      idCreador,
    };

    try {
      const response = await AuthFetch(`${process.env.BACKEND_URL}/tareas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      });

      console.log("Tarea creada:", response);
      handleReset();
    } catch (error) {
      console.error("Error creando la tarea:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
              <Input
                id="name"
                className="mt-1"
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Nombre de la tarea"
              />
            </div>
            <div>
              <Label htmlFor="message">Detalles</Label>
              <Textarea
                id="message"
                className="mt-1"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                placeholder="Descripción de la tarea"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <Button variant="outline">Cancelar</Button>
              {/* <Button variant="outline">Cancelar</Button> */}
              {!loading ? (
                <Button className="px-4 py-2" type="submit">
                  <Plus className="mr-2 h-4 w-4" />
                  Crear
                </Button>
              ) : (
                <Button disabled className="px-4 py-2">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creando
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
      </Card>
    </form>
  );
}
