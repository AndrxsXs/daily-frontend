import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function FinishedTasks() {
  // Estado para controlar que se vea el textarea en tareas finalizadas.
  const [showTextarea, setShowTextarea] = useState(false);
  return (
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
  );
}
