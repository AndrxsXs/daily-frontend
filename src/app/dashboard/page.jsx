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
import Link from "next/link";

export default function Page() {
  return (
    <div className="grid justify-center">
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="earring">Pendientes</TabsTrigger>
          <TabsTrigger value="finished">Finalizadas</TabsTrigger>
          <TabsTrigger value="create">Crear Tarea</TabsTrigger>
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

