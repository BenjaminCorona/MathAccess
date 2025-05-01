import {
  BookOpen,
  Calculator,
  BarChartIcon as ChartBar,
  Clock,
  GraduationCap,
  Medal,
  Settings,
  User,
  Users,
} from "lucide-react"
import { Link } from "react-router-dom"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProfilePage() {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <div className="hidden w-64 flex-col border-r bg-white p-4 dark:border-gray-800 dark:bg-gray-950 md:flex">
        <div className="flex items-center gap-2 py-4">
          <BookOpen className="h-6 w-6" />
          <h1 className="text-xl font-bold">MathAccess</h1>
        </div>
        <div className="mt-8 space-y-1">
          <Link
            to="/"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
          >
            <GraduationCap className="h-5 w-5" />
            <span>Inicio</span>
          </Link>
          <Link
            to="/contents"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
          >
            <BookOpen className="h-5 w-5" />
            <span>Contenidos</span>
          </Link>
          <Link
            to="/problems"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
          >
            <Calculator className="h-5 w-5" />
            <span>Problemas</span>
          </Link>
          <Link
            to="/progress"
            className="flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
          >
            <ChartBar className="h-5 w-5" />
            <span>Progreso</span>
          </Link>
          <Link
            to="/settings"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
          >
            <Settings className="h-5 w-5" />
            <span>Configuración</span>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-white px-4 dark:border-gray-800 dark:bg-gray-950 md:px-6">
          <div className="flex flex-1 items-center gap-4">
            <h1 className="text-xl font-bold md:text-2xl">Perfil de Usuario</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon">
              <Settings className="h-5 w-5" />
              <span className="sr-only">Configuración</span>
            </Button>
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Avatar" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </header>
        <main className="grid gap-6 p-4 md:grid-cols-2 md:p-6 lg:grid-cols-3">
          <Card className="lg:col-span-1">
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src="/placeholder.svg?height=64&width=64" alt="Avatar" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>Juan Pérez</CardTitle>
                <CardDescription>
                  <Badge className="mt-1">Estudiante</Badge>
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Correo electrónico</h3>
                  <p>juan.perez@ejemplo.com</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Institución</h3>
                  <p>Universidad Nacional de Matemáticas</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Especialidad</h3>
                  <p>Ingeniería Matemática</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Nivel académico</h3>
                  <p>Tercer año</p>
                </div>
                <div className="pt-2">
                  <Button variant="outline" className="w-full">
                    Editar perfil
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Roles y Permisos</CardTitle>
              <CardDescription>Gestiona tus roles y accesos en la plataforma</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="estudiante">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="estudiante">Estudiante</TabsTrigger>
                  <TabsTrigger value="maestro">Maestro</TabsTrigger>
                  <TabsTrigger value="administrador">Administrador</TabsTrigger>
                </TabsList>
                <TabsContent value="estudiante" className="mt-4 space-y-4">
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-green-100 p-2 dark:bg-green-900">
                        <User className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <h3 className="font-medium">Rol de Estudiante</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Rol activo - Acceso completo a materiales y ejercicios
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-lg border p-4">
                      <h3 className="font-medium">Permisos</h3>
                      <ul className="mt-2 space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-green-500"></span>
                          Acceso a todos los contenidos del curso
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-green-500"></span>
                          Resolución de problemas y ejercicios
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-green-500"></span>
                          Seguimiento de progreso personal
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-green-500"></span>
                          Participación en foros de discusión
                        </li>
                      </ul>
                    </div>
                    <div className="rounded-lg border p-4">
                      <h3 className="font-medium">Cursos inscritos</h3>
                      <ul className="mt-2 space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-green-500"></span>
                          Cálculo Diferencial
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-green-500"></span>
                          Álgebra Lineal
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-green-500"></span>
                          Ecuaciones Diferenciales
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-green-500"></span>
                          Probabilidad y Estadística
                        </li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="maestro" className="mt-4 space-y-4">
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-gray-100 p-2 dark:bg-gray-800">
                        <Users className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                      </div>
                      <div>
                        <h3 className="font-medium">Rol de Maestro</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Rol inactivo - Solicita acceso para crear contenido
                        </p>
                      </div>
                    </div>
                  </div>
                  <Button>Solicitar rol de maestro</Button>
                </TabsContent>
                <TabsContent value="administrador" className="mt-4 space-y-4">
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-gray-100 p-2 dark:bg-gray-800">
                        <Settings className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                      </div>
                      <div>
                        <h3 className="font-medium">Rol de Administrador</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Rol inactivo - Solo para personal autorizado
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Tu Progreso</CardTitle>
              <CardDescription>Resumen de actividad y rendimiento académico</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Problemas completados</h3>
                    <span className="font-bold">65%</span>
                  </div>
                  <Progress value={65} className="h-2" />
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex flex-col items-center rounded-lg border p-3">
                      <span className="text-2xl font-bold">42</span>
                      <span className="text-gray-500 dark:text-gray-400">Completados</span>
                    </div>
                    <div className="flex flex-col items-center rounded-lg border p-3">
                      <span className="text-2xl font-bold">23</span>
                      <span className="text-gray-500 dark:text-gray-400">Pendientes</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Contenido revisado</h3>
                    <span className="font-bold">80%</span>
                  </div>
                  <Progress value={80} className="h-2" />
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex flex-col items-center rounded-lg border p-3">
                      <span className="text-2xl font-bold">16</span>
                      <span className="text-gray-500 dark:text-gray-400">Temas</span>
                    </div>
                    <div className="flex flex-col items-center rounded-lg border p-3">
                      <span className="text-2xl font-bold">4</span>
                      <span className="text-gray-500 dark:text-gray-400">Pendientes</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Calificación promedio</h3>
                    <span className="font-bold">8.7/10</span>
                  </div>
                  <Progress value={87} className="h-2" />
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex flex-col items-center rounded-lg border p-3">
                      <span className="text-2xl font-bold">9.2</span>
                      <span className="text-gray-500 dark:text-gray-400">Máxima</span>
                    </div>
                    <div className="flex flex-col items-center rounded-lg border p-3">
                      <span className="text-2xl font-bold">7.5</span>
                      <span className="text-gray-500 dark:text-gray-400">Mínima</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Próximas entregas</CardTitle>
              <CardDescription>Ejercicios y problemas pendientes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 rounded-lg border p-4">
                  <div className="rounded-full bg-amber-100 p-2 dark:bg-amber-900">
                    <Clock className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">Derivadas</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Ejercicios de regla de la cadena</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">15/05/2025</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">3 días restantes</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 rounded-lg border p-4">
                  <div className="rounded-full bg-amber-100 p-2 dark:bg-amber-900">
                    <Clock className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">Integrales</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Métodos de integración</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">20/05/2025</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">8 días restantes</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 rounded-lg border p-4">
                  <div className="rounded-full bg-amber-100 p-2 dark:bg-amber-900">
                    <Clock className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">Ecuaciones Diferenciales</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Ecuaciones de primer orden</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">25/05/2025</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">13 días restantes</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Logros y certificaciones</CardTitle>
              <CardDescription>Reconocimientos obtenidos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 rounded-lg border p-4">
                  <div className="rounded-full bg-yellow-100 p-2 dark:bg-yellow-900">
                    <Medal className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="font-medium">Maestro del Cálculo</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Completado el curso de Cálculo Diferencial con nota sobresaliente
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 rounded-lg border p-4">
                  <div className="rounded-full bg-yellow-100 p-2 dark:bg-yellow-900">
                    <Medal className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="font-medium">Solucionador Ágil</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Resolvió 50 problemas en menos de 30 días
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 rounded-lg border p-4">
                  <div className="rounded-full bg-yellow-100 p-2 dark:bg-yellow-900">
                    <Medal className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="font-medium">Estudiante Constante</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Accedió a la plataforma durante 30 días consecutivos
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
