import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { AuthFetch } from "@/utils/AuthFetch";
import { useSession } from "next-auth/react";
import { Pencil, Check, X, Loader2 } from "lucide-react";
import FinishTask from "./FinishTask";
import DeleteTask from "./DeleteTask";

export default function TasksRoot({ isPending }) {
  const { data: session } = useSession();
  const userId = session?.user.id;
  const [selectedTask, setSelectedTask] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setEditedTask(task);
    setIsEditing(false);
  };

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await AuthFetch(
        `${process.env.BACKEND_URL}/tareas/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const filteredTasks = response.filter(
        (task) => task.finalizado !== isPending
      );
      setTasks(filteredTasks);
    } catch (error) {
      console.error("Error obteniendo las tareas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [userId, isPending]);

  const reload = () => {
    fetchTasks();
    setSelectedTask(null);
    setIsEditing(false);
  };

  const handleEditStart = () => {
    setIsEditing(true);
  };

  const handleEditCancel = () => {
    setIsEditing(false);
    setEditedTask(selectedTask);
  };

  const handleEditComplete = async () => {
    try {
      await AuthFetch(`${process.env.BACKEND_URL}/tareas`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedTask),
      });
      await fetchTasks();
      const updatedTask = tasks.find((task) => task.id === editedTask.id);
      setSelectedTask(updatedTask);
      setEditedTask(updatedTask);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTask((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Card className="overflow-auto max-h-[70dvh] w-full">
      <div className="flex">
        {/* Columna izquierda */}
        <div className="w-1/2 border-r">
          <div className="border-b">
            <header className="px-6 py-4">
              <h1 className="text-3xl font-bold text-center">
                Tareas {isPending ? "pendientes" : "finalizadas"}
              </h1>
            </header>
          </div>
          <CardHeader>
            <CardDescription className="text-center">
              {!loading ? (
                tasks.length > 0 ? (
                  tasks.map((task) => (
                    <div
                      key={task.id}
                      className="flex items-center space-x-2 my-4 cursor-pointer"
                    >
                      <p
                        className={`flex-grow border rounded-md px-3 py-2 h-[40px] text-sm leading-5 text-gray-900 cursor-pointer hover:bg-tinto-300 active:bg-tinto-400 ${
                          selectedTask?.id === task.id ? "bg-tinto-200" : ""
                        }`}
                        onClick={() => handleTaskClick(task)}
                      >
                        {task.nombre}
                      </p>
                      {isPending && (
                        <FinishTask taskId={task.id} reload={reload} />
                      )}
                      {/* <DeleteTask taskId={task.id} reload={reload} /> */}
                    </div>
                  ))
                ) : (
                  <p>
                    No hay tareas {isPending ? "pendientes" : "finalizadas"}.
                  </p>
                )
              ) : (
                <Loader2 className="h-8 w-8 mx-auto animate-spin" />
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
                    {isEditing ? (
                      <Input
                        name="nombre"
                        value={editedTask.nombre}
                        onChange={handleInputChange}
                        className="font-bold"
                      />
                    ) : (
                      <Label htmlFor="task-name">{selectedTask.nombre}</Label>
                    )}
                    <DeleteTask taskId={selectedTask.id} reload={reload} />
                  </div>
                  <div className="relative">
                    <Textarea
                      id="task-details"
                      name="descripcion"
                      className="mt-1 pr-24 pb-10"
                      value={
                        isEditing
                          ? editedTask.descripcion
                          : selectedTask.descripcion
                      }
                      onChange={handleInputChange}
                      readOnly={!isEditing}
                      style={{
                        outline: "none",
                        boxShadow: "none",
                        resize: "none",
                      }}
                    />
                    {isPending &&
                      (isEditing ? (
                        <div className="absolute bottom-2 right-2 space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={handleEditCancel}
                          >
                            <X className="h-4 w-4 mr-1" /> Cancelar
                          </Button>
                          <Button size="sm" onClick={handleEditComplete}>
                            <Check className="h-4 w-4 mr-1" /> Guardar
                          </Button>
                        </div>
                      ) : (
                        <Button
                          className="absolute bottom-2 right-2"
                          size="sm"
                          onClick={handleEditStart}
                        >
                          <Pencil className="h-4 w-4 mr-1" /> Editar
                        </Button>
                      ))}
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
