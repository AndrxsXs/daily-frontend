import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Pencil, X, Check, Loader2 } from "lucide-react";
import { AuthFetch } from "@/utils/AuthFetch";

export default function EditTask({ task, isEditing, onEditStart, onEditCancel, onEditComplete }) {
  const [loading, setLoading] = useState(false);

  const handleEditComplete = async (updatedTask) => {
    setLoading(true);
    try {
      await AuthFetch(`${process.env.BACKEND_URL}/tareas`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTask),
      });
      onEditComplete();
    } catch (error) {
      console.error("Error updating task:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Button variant="ghost" disabled>
        <Loader2 className="h-4 w-4 animate-spin" />
      </Button>
    );
  }

  if (isEditing) {
    return (
      <>
        <Button variant="ghost" onClick={onEditCancel}>
          <X className="h-4 w-4" />
        </Button>
        <Button variant="ghost" onClick={() => handleEditComplete(task)}>
          <Check className="h-4 w-4" />
        </Button>
      </>
    );
  }

  return (
    <Button variant="ghost" onClick={onEditStart}>
      <Pencil className="h-4 w-4" />
    </Button>
  );
}
