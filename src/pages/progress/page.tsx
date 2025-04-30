import { Link } from "react-router-dom"
import { BookOpen, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

export default function ProgressPage() {
  // Datos simulados para las gráficas
  const problemsData = [
    { name: "Ene", completados: 5, intentados: 8 },
    { name: "Feb", completados: 7, intentados: 10 },
    { name: "Mar", completados: 10, intentados: 12 },
    { name: "Abr", completados: 8, intentados: 15 },
    { name: "May", completados: 12, intentados: 14 },
  ]

  const timeData = [
    { name: "Lun", tiempo: 45 },
    { name: "Mar", tiempo: 60 },
    { name: "Mié", tiempo: 30 },
    { name: "Jue", tiempo: 75 },
    { name: "Vie", tiempo: 50 },
    { name: "Sáb", tiempo: 20 },
    { name: "Dom", tiempo: 10 },
  ]

  const categoryData = [
    { name: "Cálculo", value: 35 },
    { name: "Álgebra", value: 25 },
    { name: "Geometría", value: 20 },
    { name: "Estadística", value: 15 },
    { name: "Otros", value: 5 },
  ]

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

  const recentProblems = [
    { id: 1, title: "Derivadas de Funciones Compuestas", status: "Correcto", date: "10/04/2025" },
    { id: 2, title: "Integrales Definidas", status: "Incorrecto", date: "15/04/2025" },
    { id: 3, title: "Matrices y Determinantes", status: "Correcto", date: "20/04/2025" },
    { id: 4, title: "Límites y Continuidad", status: "Correcto", date: "25/04/2025" },
    { id: 5, title: "Ecuaciones Diferenciales", status: "Incorrecto", date: "01/05/2025" },
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
          <Link to="/dashboard">
            <Button variant="outline">Volver al Panel</Button>
          </Link>
        </div>
      </header>

      <main className="flex-1 p-4 md:p-6">
        <div className="mx-auto max-w-7xl space-y-6">
          <h1 className="text-3xl font-bold tracking-tight">Tu Progreso</h1>

          <Tabs defaultValue="graficas">
            <TabsList className="grid w-full grid-cols-2 text-lg">
              <TabsTrigger value="graficas">Gráficas</TabsTrigger>
              <TabsTrigger value="problemas">Problemas Resueltos</TabsTrigger>
            </TabsList>

            <TabsContent value="graficas" className="space-y-6 mt-6">
              <div className="grid gap-6 md:grid-cols-2">
                {/* Gráfica de Problemas */}
                <Card>
                  <CardHeader>
                    <CardTitle>Problemas Completados</CardTitle>
                    <CardDescription>Comparación mensual de problemas intentados vs. completados</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
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

                {/* Gráfica de Tiempo */}
                <Card>
                  <CardHeader>
                    <CardTitle>Tiempo de Estudio</CardTitle>
                    <CardDescription>Minutos dedicados al estudio por día</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={timeData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line
                            type="monotone"
                            dataKey="tiempo"
                            stroke="#8884d8"
                            name="Minutos"
                            strokeWidth={2}
                            activeDot={{ r: 8 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {/* Gráfica de Categorías */}
                <Card>
                  <CardHeader>
                    <CardTitle>Distribución por Categorías</CardTitle>
                    <CardDescription>Porcentaje de tiempo dedicado a cada tema</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={categoryData}
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

                {/* Resumen de Estadísticas */}
                <Card>
                  <CardHeader>
                    <CardTitle>Resumen de Estadísticas</CardTitle>
                    <CardDescription>Datos generales de tu progreso</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="mb-1 flex items-center justify-between">
                          <span>Problemas completados</span>
                          <span className="font-medium">42 de 65 (65%)</span>
                        </div>
                        <div className="h-3 rounded-full bg-muted">
                          <div className="h-3 rounded-full bg-primary" style={{ width: "65%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="mb-1 flex items-center justify-between">
                          <span>Contenido revisado</span>
                          <span className="font-medium">24 de 30 (80%)</span>
                        </div>
                        <div className="h-3 rounded-full bg-muted">
                          <div className="h-3 rounded-full bg-primary" style={{ width: "80%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="mb-1 flex items-center justify-between">
                          <span>Precisión en respuestas</span>
                          <span className="font-medium">75%</span>
                        </div>
                        <div className="h-3 rounded-full bg-muted">
                          <div className="h-3 rounded-full bg-primary" style={{ width: "75%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="mb-1 flex items-center justify-between">
                          <span>Tiempo total de estudio</span>
                          <span className="font-medium">42 horas</span>
                        </div>
                      </div>
                      <div>
                        <div className="mb-1 flex items-center justify-between">
                          <span>Promedio diario</span>
                          <span className="font-medium">45 minutos</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="problemas" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Problemas Resueltos Recientemente</CardTitle>
                  <CardDescription>Historial de tus últimos intentos</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b">
                          <th className="p-2 font-medium">Problema</th>
                          <th className="p-2 font-medium">Estado</th>
                          <th className="p-2 font-medium">Fecha</th>
                          <th className="p-2 font-medium">Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentProblems.map((problem) => (
                          <tr key={problem.id} className="border-b">
                            <td className="p-2">{problem.title}</td>
                            <td className="p-2">
                              <span
                                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                  problem.status === "Correcto"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                              >
                                {problem.status}
                              </span>
                            </td>
                            <td className="p-2">{problem.date}</td>
                            <td className="p-2">
                              <Button asChild variant="outline" size="sm">
                                <Link to={`/problems/${problem.id}`}>Ver detalles</Link>
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-6">
                    <h3 className="text-lg font-medium mb-2">Estadísticas de Problemas</h3>
                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="rounded-lg border p-4 text-center">
                        <div className="text-2xl font-bold">42</div>
                        <div className="text-sm text-muted-foreground">Total Completados</div>
                      </div>
                      <div className="rounded-lg border p-4 text-center">
                        <div className="text-2xl font-bold">32</div>
                        <div className="text-sm text-muted-foreground">Correctos</div>
                      </div>
                      <div className="rounded-lg border p-4 text-center">
                        <div className="text-2xl font-bold">10</div>
                        <div className="text-sm text-muted-foreground">Incorrectos</div>
                      </div>
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
