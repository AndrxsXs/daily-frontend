import React, { useEffect, useState } from "react";
import { Trash2, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { AuthFetch } from "@/utils/AuthFetch";

import { useSession } from "next-auth/react";

import FinishTask from "./FinishTask";

export default function PendingTasks() {
  const { data: session } = useSession();
  const userId = session?.user.id;
  // Estado para controlar que se vea el textarea en tareas finalizadas.
  const [showTextarea, setShowTextarea] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [tasks, setTasks] = useState([]);

  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };

  const fetchTasks = async () => {
    try {
      const response = await AuthFetch(
        `${process.env.BACKEND_URL}/tareas/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const pendingTasks = response.filter((task) => !task.finalizado);

      setTasks(pendingTasks);
      console.log("Tareas pendientes obtenidas:", pendingTasks);
    } catch (error) {
      console.error("Error obteniendo las tareas:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const reload = () => {
    fetchTasks();
    setSelectedTask(null);
  }

  return (
    <Card className="overflow-auto max-h-[70dvh] w-full">
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
              {tasks.length > 0 ? (
                tasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center space-x-2 space-y-1 cursor-pointer"
                    onClick={() => handleTaskClick(task)}
                  >
                    <p className="flex-grow border rounded-md px-3 py-2 text-sm leading-5 text-gray-900">
                      {task.nombre}
                    </p>
                    <FinishTask taskId={task.id} reload={reload} />
                  </div>
                ))
              ) : (
                <p>No hay tareas pendientes.</p>
              )}
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
              {selectedTask ? (
                <>
                  <div className="flex justify-between items-center mb-2">
                    <Label htmlFor="task-name">{selectedTask.nombre}</Label>
                    <Button variant="ghost">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="relative">
                    <Textarea
                      id="task-details"
                      className="mt-1 pr-24 pb-10"
                      readOnly
                      value={selectedTask.descripcion}
                      style={{
                        outline: "none",
                        boxShadow: "none",
                        resize: "none",
                      }}
                    />
                    <Button className="absolute bottom-2 right-2" size="sm">
                      <Pencil className="h-4 w-4 mr-1" /> Editar
                    </Button>
                  </div>
                </>
              ) : (
                <p className="text-center">
                  Selecciona una tarea para ver los detalles
                </p>
              )}
            </CardDescription>
          </CardHeader>
        </div>
      </div>
    </Card>
  );
}
