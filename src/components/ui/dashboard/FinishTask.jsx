import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

import { AuthFetch } from "@/utils/AuthFetch";

export default function FinishTask({ taskId, reload }) {
  const [loading, setLoading] = React.useState(false);

  const handleFinishTask = async () => {
    setLoading(true);

    try {
      await AuthFetch(`${process.env.BACKEND_URL}/tareas/finalizar/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });
    //   console.log("Tarea finalizada");
    } catch (error) {
      console.error("Error finalizando la tarea:", error);
    } finally {
      setLoading(false);
      reload();
    }
  };

  return (
    <>
      {!loading ? (
        <Button variant="outline" onClick={handleFinishTask}>
          Finalizar
        </Button>
      ) : (
        <Button variant="outline" disabled>
          <Loader2 className="h-4 w-4" />
          Finalizando...
        </Button>
      )}
    </>
  );
}
