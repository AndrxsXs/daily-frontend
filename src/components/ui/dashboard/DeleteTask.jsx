import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2 } from "lucide-react";
import { AuthFetch } from "@/utils/AuthFetch";

export default function DeleteTask({ taskId, reload }) {
  const [loading, setLoading] = React.useState(false);

  const handleDeleteTask = async () => {
    setLoading(true);

    try {
      await AuthFetch(`${process.env.BACKEND_URL}/tareas/${taskId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Tarea eliminada");
    } catch (error) {
      console.error("Error eliminando la tarea:", error);
    } finally {
      setLoading(false);
      reload();
    }
  };

  return (
    <>
      {!loading ? (
        <Button variant="ghost" onClick={handleDeleteTask}>
          <Trash2 className="h-4 w-4" />
        </Button>
      ) : (
        <Button variant="ghost" disabled>
          <Loader2 className="h-4 w-4 animate-spin" />
        </Button>
      )}
    </>
  );
}
