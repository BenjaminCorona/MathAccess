import { Link } from "react-router-dom"
import { BookOpen, ArrowLeft, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts"

export default function MetricsPage() {
  // Datos simulados para las gráficas
  const usersData = [
    { name: "Ene", estudiantes: 80, maestros: 12, administradores: 3 },
    { name: "Feb", estudiantes: 95, maestros: 14, administradores: 3 },
    { name: "Mar", estudiantes: 110, maestros: 15, administradores: 4 },
    { name: "Abr", estudiantes: 125, maestros: 18, administradores: 5 },
    { name: "May", estudiantes: 140, maestros: 20, administradores: 5 },
  ]

  const activityData = [
    { name: "Lun", sesiones: 120 },
    { name: "Mar", sesiones: 150 },
    { name: "Mié", sesiones: 180 },
    { name: "Jue", sesiones: 140 },
    { name: "Vie", sesiones: 160 },
    { name: "Sáb", sesiones: 80 },
    { name: "Dom", sesiones: 60 },
  ]

  const contentData = [
    { name: "Teoría", value: 42 },
    { name: "Ejemplos", value: 28 },
    { name: "Actividades", value: 35 },
    { name: "Evaluaciones", value: 15 },
  ]

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

  const problemsData = [
    { name: "Cálculo", completados: 65, intentados: 85 },
    { name: "Álgebra", completados: 55, intentados: 70 },
    { name: "Geometría", completados: 40, intentados: 60 },
    { name: "Estadística", completados: 30, intentados: 45 },
  ]

  const timeData = [
    { name: "Semana 1", tiempo: 450 },
    { name: "Semana 2", tiempo: 520 },
    { name: "Semana 3", tiempo: 480 },
    { name: "Semana 4", tiempo: 580 },
    { name: "Semana 5", tiempo: 620 },
    { name: "Semana 6", tiempo: 590 },
    { name: "Semana 7", tiempo: 650 },
    { name: "Semana 8", tiempo: 700 },
  ]

  const recentUsers = [
    { id: 1, name: "Ana García", role: "Estudiante", lastLogin: "Hoy, 10:25 AM" },
    { id: 2, name: "Carlos Rodríguez", role: "Maestro", lastLogin: "Hoy, 09:15 AM" },
    { id: 3, name: "Laura Martínez", role: "Estudiante", lastLogin: "Ayer, 18:30 PM" },
    { id: 4, name: "Miguel Sánchez", role: "Estudiante", lastLogin: "Ayer, 15:45 PM" },
    { id: 5, name: "Elena Pérez", role: "Administrador", lastLogin: "Hace 2 días" },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Link to="/dashboard" className="flex items-center gap-2 font-bold">
          <ArrowLeft className="h-5 w-5" />
          <BookOpen className="h-6 w-6" />
          <span className="text-xl">MathAccess</span>
        </Link>
        <div className="ml-auto flex items-center gap-4">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Exportar Reportes
          </Button>
          <Link to="/dashboard">
            <Button variant="outline">Volver al Panel</Button>
          </Link>
        </div>
      </header>

      <main className="flex-1 p-4 md:p-6">
        <div className="mx-auto max-w-7xl space-y-6">
          <h1 className="text-3xl font-bold tracking-tight">Métricas del Sistema</h1>

          <div className="grid gap-6 md:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Total Usuarios</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">148</div>
                <p className="text-xs text-muted-foreground">+12% desde el mes pasado</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Contenidos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">120</div>
                <p className="text-xs text-muted-foreground">+8% desde el mes pasado</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Problemas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">87</div>
                <p className="text-xs text-muted-foreground">+15% desde el mes pasado</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Sesiones Diarias</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">127</div>
                <p className="text-xs text-muted-foreground">+5% desde la semana pasada</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="usuarios">
            <TabsList className="grid w-full grid-cols-3 text-lg">
              <TabsTrigger value="usuarios">Usuarios</TabsTrigger>
              <TabsTrigger value="contenido">Contenido</TabsTrigger>
              <TabsTrigger value="actividad">Actividad</TabsTrigger>
            </TabsList>

            <TabsContent value="usuarios" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Crecimiento de Usuarios</CardTitle>
                  <CardDescription>Evolución mensual por tipo de usuario</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={usersData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="estudiantes" fill="#0088FE" name="Estudiantes" />
                        <Bar dataKey="maestros" fill="#00C49F" name="Maestros" />
                        <Bar dataKey="administradores" fill="#FFBB28" name="Administradores" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Usuarios Recientes</CardTitle>
                  <CardDescription>Últimos accesos al sistema</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b">
                          <th className="p-2 font-medium">Usuario</th>
                          <th className="p-2 font-medium">Rol</th>
                          <th className="p-2 font-medium">Último Acceso</th>
                          <th className="p-2 font-medium">Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentUsers.map((user) => (
                          <tr key={user.id} className="border-b">
                            <td className="p-2">{user.name}</td>
                            <td className="p-2">{user.role}</td>
                            <td className="p-2">{user.lastLogin}</td>
                            <td className="p-2">
                              <Button variant="outline" size="sm">
                                Ver perfil
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <Button className="mt-4 w-full">Ver todos los usuarios</Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="contenido" className="space-y-6 mt-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Distribución de Contenido</CardTitle>
                    <CardDescription>Por tipo de contenido</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[350px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={contentData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          />
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Problemas por Categoría</CardTitle>
                    <CardDescription>Completados vs. Intentados</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[350px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={problemsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="intentados" fill="#8884d8" name="Problemas Intentados" />
                          <Bar dataKey="completados" fill="#82ca9d" name="Problemas Completados" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Estadísticas de Contenido</CardTitle>
                  <CardDescription>Resumen general</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-3">
                    <div className="space-y-2">
                      <h3 className="font-medium">Contenidos más vistos</h3>
                      <ol className="list-decimal list-inside space-y-1">
                        <li>Cálculo Diferencial (245 vistas)</li>
                        <li>Álgebra Lineal (198 vistas)</li>
                        <li>Ecuaciones Diferenciales (156 vistas)</li>
                        <li>Probabilidad (132 vistas)</li>
                        <li>Geometría Analítica (98 vistas)</li>
                      </ol>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-medium">Problemas más resueltos</h3>
                      <ol className="list-decimal list-inside space-y-1">
                        <li>Derivadas (87 soluciones)</li>
                        <li>Matrices (76 soluciones)</li>
                        <li>Límites (65 soluciones)</li>
                        <li>Integrales (54 soluciones)</li>
                        <li>Probabilidad (42 soluciones)</li>
                      </ol>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-medium">Contenidos por dificultad</h3>
                      <div className="space-y-4">
                        <div>
                          <div className="mb-1 flex items-center justify-between">
                            <span>Básico</span>
                            <span className="font-medium">45%</span>
                          </div>
                          <div className="h-2 rounded-full bg-muted">
                            <div className="h-2 rounded-full bg-blue-500" style={{ width: "45%" }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="mb-1 flex items-center justify-between">
                            <span>Intermedio</span>
                            <span className="font-medium">35%</span>
                          </div>
                          <div className="h-2 rounded-full bg-muted">
                            <div className="h-2 rounded-full bg-green-500" style={{ width: "35%" }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="mb-1 flex items-center justify-between">
                            <span>Avanzado</span>
                            <span className="font-medium">20%</span>
                          </div>
                          <div className="h-2 rounded-full bg-muted">
                            <div className="h-2 rounded-full bg-yellow-500" style={{ width: "20%" }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="actividad" className="space-y-6 mt-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Sesiones Diarias</CardTitle>
                    <CardDescription>Número de sesiones por día de la semana</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[350px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={activityData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="sesiones" fill="#8884d8" name="Sesiones" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Tiempo de Uso</CardTitle>
                    <CardDescription>Minutos totales por semana</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[350px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={timeData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Area type="monotone" dataKey="tiempo" stroke="#8884d8" fill="#8884d8" name="Minutos" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Estadísticas de Actividad</CardTitle>
                  <CardDescription>Resumen general</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-3">
                    <div className="rounded-lg border p-4">
                      <div className="text-2xl font-bold">42 min</div>
                      <div className="text-sm text-muted-foreground">Tiempo promedio por sesión</div>
                    </div>
                    <div className="rounded-lg border p-4">
                      <div className="text-2xl font-bold">3.5</div>
                      <div className="text-sm text-muted-foreground">Sesiones promedio por usuario/semana</div>
                    </div>
                    <div className="rounded-lg border p-4">
                      <div className="text-2xl font-bold">78%</div>
                      <div className="text-sm text-muted-foreground">Tasa de retención semanal</div>
                    </div>
                    <div className="rounded-lg border p-4">
                      <div className="text-2xl font-bold">15:30 - 18:30</div>
                      <div className="text-sm text-muted-foreground">Horario de mayor actividad</div>
                    </div>
                    <div className="rounded-lg border p-4">
                      <div className="text-2xl font-bold">8.5</div>
                      <div className="text-sm text-muted-foreground">Problemas intentados por usuario/semana</div>
                    </div>
                    <div className="rounded-lg border p-4">
                      <div className="text-2xl font-bold">65%</div>
                      <div className="text-sm text-muted-foreground">Tasa de finalización de problemas</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
