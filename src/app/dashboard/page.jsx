"use client";

import { Button } from "@/components/ui/button";

import { useSession } from "next-auth/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pen, Trash2 } from "lucide-react";
import { Pencil } from "lucide-react";
import { X } from "lucide-react";
import { LayoutList } from "lucide-react";
import { ListChecks } from "lucide-react";
import { Plus } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { redirect } from "next/navigation";

import React, { useState } from "react";

import CreateTask from "@/components/ui/dashboard/CreateTask";
import PendingTasks from "@/components/ui/dashboard/PendingTasks";
import FinishedTasks from "@/components/ui/dashboard/FinishedTasks";

import Completed from "@/components/ui/dashboard/Completed";
import Pending from "@/components/ui/dashboard/Pending";

export default function Page() {
  // Se obtiene el estado de la sesión.
  const { data: session, status } = useSession();
  const [selectedTab, setSelectedTab] = useState("pending");

  const handleCancel = () => {
    setSelectedTab("pending");
  };

  if (status === "loading") {
    return <p>Loading...</p>;
  } else if (status === "unauthenticated") {
    redirect("/start");
    return <p>Acceso denegado</p>;
  } else
    return (
      <main className="grid justify-center">
        <Tabs
          value={selectedTab}
          onValueChange={setSelectedTab}
          defaultValue="pending"
          className="w-[60dvw] max-w-[1000px]"
        >
          <TabsList
            className="grid w-full grid-cols-3 gap-2
          text-tinto-500
          dark:text-tinto-200
          bg-[#d3b19e]"
          >
            <TabsTrigger
              value="pending"
              className="
          data-[state=active]:aria-selected:text-tinto-700 hover:shadow-sm hover:bg-tinto-50 dark:hover:bg-tinto-950"
            >
              <span className="px-2 rounded transition-shadow duration-300 ">
                <LayoutList className="inline h-4 w-4" /> Pendientes
              </span>
            </TabsTrigger>
            <TabsTrigger
              value="finished"
              className="
          data-[state=active]:aria-selected:text-tinto-700 hover:shadow-sm hover:bg-tinto-50 dark:hover:bg-tinto-950"
            >
              <span className="px-2 rounded transition-shadow duration-300 ">
                <ListChecks className="inline h-4 w-4" /> Finalizadas
              </span>
            </TabsTrigger>

            <TabsTrigger
              value="create"
              className="
          data-[state=active]:aria-selected:text-tinto-700 hover:shadow-sm hover:bg-tinto-50 dark:hover:bg-tinto-950"
            >
              <span className="px-2 rounded transition-shadow duration-300 ">
                <Plus className="inline h-4 w-4" /> Crear tarea
              </span>
            </TabsTrigger>
          </TabsList>

          {/* Módulo de tareas pendientes */}
          <TabsContent value="pending">
            <Pending />
          </TabsContent>

          {/* Modulo de tareas finalizadas */}
          <TabsContent value="finished">
            <Completed />
          </TabsContent>

          <TabsContent value="create">
            <CreateTask handleCancel={handleCancel} />
          </TabsContent>
        </Tabs>
      </main>
    );
}
