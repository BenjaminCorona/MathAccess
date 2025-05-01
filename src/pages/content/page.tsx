import { Link } from "react-router-dom"
import { BookOpen, Filter, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

export default function ContentPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Link to="/dashboard" className="flex items-center gap-2 font-bold">
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
            <h1 className="text-3xl font-bold tracking-tight">Contenidos Matemáticos</h1>
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
            {/** 
            <Select defaultValue="todos">
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
            </Select>
            */}
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Tarjeta de contenido 1 */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle>Cálculo Diferencial</CardTitle>
                  <Badge>Teoría</Badge>
                </div>
                <CardDescription>Fundamentos de límites y derivadas</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Este contenido cubre los conceptos básicos del cálculo diferencial, incluyendo límites, continuidad y
                  reglas de derivación.
                </p>
                <div className="mt-4 flex items-center text-sm text-muted-foreground">
                  <span>Nivel: Intermedio</span>
                  <span className="mx-2">•</span>
                  <span>Duración: 45 min</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link to="/content/1">Ver contenido</Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Tarjeta de contenido 2 */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle>Álgebra Lineal</CardTitle>
                  <Badge variant="outline">Ejemplo</Badge>
                </div>
                <CardDescription>Matrices y sistemas de ecuaciones</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Ejemplos prácticos de operaciones con matrices, determinantes y resolución de sistemas de ecuaciones
                  lineales.
                </p>
                <div className="mt-4 flex items-center text-sm text-muted-foreground">
                  <span>Nivel: Básico</span>
                  <span className="mx-2">•</span>
                  <span>Duración: 30 min</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link to="/content/2">Ver contenido</Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Tarjeta de contenido 3 */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle>Ecuaciones Diferenciales</CardTitle>
                  <Badge variant="secondary">Actividad</Badge>
                </div>
                <CardDescription>Resolución de ecuaciones de primer orden</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Actividades prácticas para resolver ecuaciones diferenciales de primer orden utilizando diferentes
                  métodos.
                </p>
                <div className="mt-4 flex items-center text-sm text-muted-foreground">
                  <span>Nivel: Avanzado</span>
                  <span className="mx-2">•</span>
                  <span>Duración: 60 min</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link to="/content/3">Ver contenido</Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Tarjeta de contenido 4 */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle>Probabilidad</CardTitle>
                  <Badge>Teoría</Badge>
                </div>
                <CardDescription>Conceptos fundamentales de probabilidad</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Introducción a los conceptos básicos de probabilidad, eventos, espacios muestrales y distribuciones.
                </p>
                <div className="mt-4 flex items-center text-sm text-muted-foreground">
                  <span>Nivel: Básico</span>
                  <span className="mx-2">•</span>
                  <span>Duración: 40 min</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link to="/content/4">Ver contenido</Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Tarjeta de contenido 5 */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle>Cálculo Integral</CardTitle>
                  <Badge variant="outline">Ejemplo</Badge>
                </div>
                <CardDescription>Técnicas de integración</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Ejemplos detallados de diferentes técnicas de integración, incluyendo sustitución, por partes y
                  fracciones parciales.
                </p>
                <div className="mt-4 flex items-center text-sm text-muted-foreground">
                  <span>Nivel: Intermedio</span>
                  <span className="mx-2">•</span>
                  <span>Duración: 50 min</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link to="/content/5">Ver contenido</Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Tarjeta de contenido 6 */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle>Geometría Analítica</CardTitle>
                  <Badge variant="secondary">Actividad</Badge>
                </div>
                <CardDescription>Cónicas y sus aplicaciones</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Actividades interactivas sobre cónicas: círculos, elipses, parábolas e hipérbolas, con aplicaciones
                  prácticas.
                </p>
                <div className="mt-4 flex items-center text-sm text-muted-foreground">
                  <span>Nivel: Intermedio</span>
                  <span className="mx-2">•</span>
                  <span>Duración: 45 min</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link to="/content/6">Ver contenido</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>

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
  )
}
