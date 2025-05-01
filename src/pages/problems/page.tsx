import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { BookOpen, Filter, Search, CheckCircle, Clock, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

export default function ProblemsPage() {
  const navigate = useNavigate();
  
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
            <h1 className="text-3xl font-bold tracking-tight">Problemas Matemáticos</h1>
            {/** 
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" aria-label="Filtrar problemas">
                <Filter className="h-5 w-5" />
              </Button>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Buscar problema..." className="pl-8 w-full md:w-[250px]" />
              </div>
            </div>
            */}
          </div>


          <div className="flex flex-wrap gap-4">
          {/** 
            <Select defaultValue="todos">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Dificultad" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todas las dificultades</SelectItem>
                <SelectItem value="facil">Fácil</SelectItem>
                <SelectItem value="medio">Medio</SelectItem>
                <SelectItem value="dificil">Difícil</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="todos">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos los estados</SelectItem>
                <SelectItem value="pendiente">Pendiente</SelectItem>
                <SelectItem value="completado">Completado</SelectItem>
                <SelectItem value="vencido">Vencido</SelectItem>
              </SelectContent>
            </Select>
          */}
            </div>
          

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Problema 1 */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle>Derivadas de Funciones Compuestas</CardTitle>
                  <Badge className="bg-green-500">Completado</Badge>
                </div>
                <CardDescription>Aplicación de la regla de la cadena</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Calcular la derivada de funciones compuestas utilizando la regla de la cadena y otras reglas de
                  derivación.
                </p>
                <div className="mt-4 flex items-center text-sm text-muted-foreground">
                  <span>Dificultad: Media</span>
                  <span className="mx-2">•</span>
                  <span className="flex items-center">
                    <CheckCircle className="mr-1 h-4 w-4 text-green-500" />
                    Completado
                  </span>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link to="/problems/1">Ver problema</Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Problema 2 */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle>Integrales Definidas</CardTitle>
                  <Badge className="bg-yellow-500 text-black">Pendiente</Badge>
                </div>
                <CardDescription>Cálculo de áreas bajo curvas</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Resolver integrales definidas para calcular el área bajo una curva en un intervalo específico.</p>
                <div className="mt-4 flex items-center text-sm text-muted-foreground">
                  <span>Dificultad: Media</span>
                  <span className="mx-2">•</span>
                  <span className="flex items-center">
                    <Clock className="mr-1 h-4 w-4 text-yellow-500" />
                    Fecha límite: 20/05/2025
                  </span>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link to="/problems/2">Resolver ahora</Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Problema 3 */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle>Ecuaciones Diferenciales</CardTitle>
                  <Badge variant="destructive">Vencido</Badge>
                </div>
                <CardDescription>Resolución de ecuaciones de primer orden</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Resolver ecuaciones diferenciales de primer orden utilizando el método de separación de variables.
                </p>
                <div className="mt-4 flex items-center text-sm text-muted-foreground">
                  <span>Dificultad: Difícil</span>
                  <span className="mx-2">•</span>
                  <span className="flex items-center">
                    <AlertCircle className="mr-1 h-4 w-4 text-destructive" />
                    Vencido: 01/04/2025
                  </span>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full" variant="outline">
                  <Link to="/problems/3">Ver problema</Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Problema 4 */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle>Límites y Continuidad</CardTitle>
                  <Badge className="bg-yellow-500 text-black">Pendiente</Badge>
                </div>
                <CardDescription>Evaluación de límites complejos</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Calcular límites utilizando diferentes técnicas y analizar la continuidad de funciones en puntos
                  específicos.
                </p>
                <div className="mt-4 flex items-center text-sm text-muted-foreground">
                  <span>Dificultad: Fácil</span>
                  <span className="mx-2">•</span>
                  <span className="flex items-center">
                    <Clock className="mr-1 h-4 w-4 text-yellow-500" />
                    Fecha límite: 25/05/2025
                  </span>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link to="/problems/4">Resolver ahora</Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Problema 5 */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle>Matrices y Determinantes</CardTitle>
                  <Badge className="bg-green-500">Completado</Badge>
                </div>
                <CardDescription>Operaciones con matrices</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Realizar operaciones con matrices, calcular determinantes y resolver sistemas de ecuaciones lineales.
                </p>
                <div className="mt-4 flex items-center text-sm text-muted-foreground">
                  <span>Dificultad: Media</span>
                  <span className="mx-2">•</span>
                  <span className="flex items-center">
                    <CheckCircle className="mr-1 h-4 w-4 text-green-500" />
                    Completado
                  </span>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link to="/problems/5">Ver problema</Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Problema 6 */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle>Series de Taylor</CardTitle>
                  <Badge className="bg-yellow-500 text-black">Pendiente</Badge>
                </div>
                <CardDescription>Aproximación de funciones</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Calcular la serie de Taylor para aproximar funciones alrededor de un punto específico.</p>
                <div className="mt-4 flex items-center text-sm text-muted-foreground">
                  <span>Dificultad: Difícil</span>
                  <span className="mx-2">•</span>
                  <span className="flex items-center">
                    <Clock className="mr-1 h-4 w-4 text-yellow-500" />
                    Fecha límite: 30/05/2025
                  </span>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link to="/problems/6">Resolver ahora</Link>
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
              5
            </Button>
          </div>
          */}
        </div>
      </main>
    </div>
  )
}
