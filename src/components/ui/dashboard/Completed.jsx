import React from "react";
import TasksList from "./TasksList";

export default function CompletedTasks() {
  return <TasksList isPending={false} />;
}
