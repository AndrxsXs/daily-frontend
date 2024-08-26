import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

import { AuthFetch } from "@/utils/AuthFetch";

export default function RestartTask({ taskId, reload }) {
  const [loading, setLoading] = React.useState(false);

  const handleRestartTask = async () => {
    setLoading(true);

    try {
      await AuthFetch(`${process.env.BACKEND_URL}/tareas/reiniciar/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });
      // console.log("Tarea finalizada");
    } catch (error) {
      console.error("Error reiniciando la tarea:", error);
    } finally {
      setLoading(false);
      reload();
    }
  };

  return (
    <>
      {!loading ? (
        <Button variant="outline" onClick={handleRestartTask}>
          Reiniciar
        </Button>
      ) : (
        <Button variant="outline" disabled>
          <Loader2 className="h-4 w-4" />
          Reiniciando...
        </Button>
      )}
    </>
  );
}
