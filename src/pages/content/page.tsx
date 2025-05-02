import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

export default function ContentPage() {
    const [contenidos, setContenidos] = useState<any[]>([]);

    useEffect(() => {
        fetch("http://localhost/math_api/contenidos")
            .then((res) => res.json())
            .then((data) => {
                console.log("Respuesta cruda:", data);
                // si la API devuelve { data: [...] } o directamente [...]
                const lista = Array.isArray(data)
                    ? data
                    : Array.isArray(data.data)
                    ? data.data
                    : [];
                console.log("Arreglo final contenidos:", lista);
                setContenidos(lista);
            })
            .catch((err) => console.error("Error fetching contenidos:", err));
    }, []);

    return (
        <div className="flex min-h-screen flex-col">
            <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
                <Link
                    to="/dashboard"
                    className="flex items-center gap-2 font-bold"
                >
                    <BookOpen className="h-6 w-6" />
                    <span className="text-xl">MathAccess</span>
                </Link>
                <div className="ml-auto flex items-center gap-4">
                    <Link to="/dashboard">
                        <Button variant="outline">Volver al Panel</Button>
                    </Link>
                </div>
            </header>

            <main className="flex-1 p-4 md:p-6">
                <div className="mx-auto max-w-7xl space-y-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <h1 className="text-3xl font-bold tracking-tight">
                            Contenidos Matemáticos
                        </h1>
                        {/** 
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" aria-label="Filtrar contenido">
                <Filter className="h-5 w-5" />
              </Button>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Buscar contenido..." className="pl-8 w-full md:w-[250px]" />
              </div>
            </div>
            */}
                    </div>

                    <div className="flex flex-wrap gap-4">
                        {/* <Select defaultValue="todos">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Tipo de contenido" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos los tipos</SelectItem>
                <SelectItem value="teoria">Teoría</SelectItem>
                <SelectItem value="ejemplo">Ejemplos</SelectItem>
                <SelectItem value="actividad">Actividades</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="todos">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Nivel" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos los niveles</SelectItem>
                <SelectItem value="basico">Básico</SelectItem>
                <SelectItem value="intermedio">Intermedio</SelectItem>
                <SelectItem value="avanzado">Avanzado</SelectItem>
              </SelectContent>
            </Select> */}
                    </div>

                    {Array.isArray(contenidos) && contenidos.length > 0 ? (
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {contenidos.map((c) => (
                                <Card key={c.id}>
                                    <CardHeader>
                                        <div className="flex justify-between items-start">
                                            <CardTitle>{c.titulo}</CardTitle>
                                            <Badge>{c.tipo}</Badge>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div
                                            className="content-area line-clamp-1 overflow-hidden text-ellipsis"
                                            dangerouslySetInnerHTML={{
                                                __html: c.descripcion,
                                            }}
                                        ></div>
                                        <div className="mt-4 flex items-center text-sm text-muted-foreground">
                                            <span>Nivel: {c.nivel}</span>
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button asChild className="w-full">
                                            <Link to={`/content/${c.id}`}>
                                                Ver contenido
                                            </Link>
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-muted-foreground">
                            No hay contenidos disponibles.
                        </p>
                    )}

                    {/** 
          <div className="flex justify-center mt-8">
            <Button variant="outline" className="mx-1">
              1
            </Button>
            <Button variant="outline" className="mx-1">
              2
            </Button>
            <Button variant="outline" className="mx-1">
              3
            </Button>
            <Button variant="ghost" className="mx-1">
              ...
            </Button>
            <Button variant="outline" className="mx-1">
              8
            </Button>
          </div>
          */}
                </div>
            </main>
        </div>
    );
}
