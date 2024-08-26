import React from "react";
import TasksList from "./TasksList";

export default function Pending() {
  return <TasksList isPending={true} />;
}
