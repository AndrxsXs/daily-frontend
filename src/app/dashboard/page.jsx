import { Button } from "@/components/ui/button";
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
import { CircleHelp } from "lucide-react";
import { LayoutList } from "lucide-react";
import { ListChecks } from "lucide-react";
import { Plus } from "lucide-react";

export default function Page() {
  return (
    <div className="grid justify-center">
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="earring">
            <span className="px-2 py-1 rounded transition-all duration-300 text-[#683142] hover:bg-white hover:shadow-md">
              <LayoutList className="inline h-4 w-4" /> Pendientes
            </span>
          </TabsTrigger>
          <TabsTrigger value="finished">
            <span className="px-2 py-1 rounded transition-all duration-300 text-[#683142] hover:bg-white hover:shadow-md">
              <ListChecks className="inline h-4 w-4" /> Finalizadas
            </span>
          </TabsTrigger>
          <TabsTrigger value="create">
           <span className="px-2 py-1 rounded transition-all duration-300 text-[#683142] hover:bg-white hover:shadow-md">
              <Plus className="inline h-4 w-4" /> Crear tarea
            </span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="earring">
          <Card>
            <CardHeader>
              <CardDescription className="text-center">
                ¡Hola care pipi!
              </CardDescription>
            </CardHeader>
          </Card>
        </TabsContent>
        <TabsContent value="finished">
          <Card>
            <CardHeader>
              <CardDescription className="text-center">
                Chupa pija
              </CardDescription>
            </CardHeader>
          </Card>
        </TabsContent>
        <TabsContent value="create">
          <Card>
            <CardHeader>
              <CardDescription className="text-center">
                Ana la más linda
              </CardDescription>
            </CardHeader>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
