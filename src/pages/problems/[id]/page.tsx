import type React from "react"

import { useState } from "react"
import { Link } from "react-router-dom"
import { BookOpen, ArrowLeft, Send, Mic, PenTool } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function ProblemPage({ params }: { params: { id: string } }) {
  const [inputMethod, setInputMethod] = useState<"text" | "voice" | "draw">("text")
  const [answer, setAnswer] = useState("")
  const [showSolution, setShowSolution] = useState(false)

  // Simulación de datos del problema
  const problem = {
    id: params.id,
    title: "Integrales Definidas",
    description: "Calcular el área bajo la curva de la función f(x) = x² en el intervalo [0, 2].",
    difficulty: "Media",
    dueDate: "20/05/2025",
    status: "Pendiente",
    mathFormula: "\\int_{0}^{2} x^2 dx",
    solution:
      "El área bajo la curva se calcula mediante la integral definida:\n\n$$\\int_{0}^{2} x^2 dx = \\left[ \\frac{x^3}{3} \\right]_{0}^{2} = \\frac{2^3}{3} - \\frac{0^3}{3} = \\frac{8}{3} - 0 = \\frac{8}{3}$$\n\nPor lo tanto, el área bajo la curva es $$\\frac{8}{3}$$ unidades cuadradas.",
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para verificar la respuesta
    alert(`Respuesta enviada: ${answer}`)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Link to="/problems" className="flex items-center gap-2 font-bold">
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
        <div className="mx-auto max-w-4xl space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-3xl font-bold tracking-tight">{problem.title}</h1>
            <Badge className="bg-yellow-500 text-black self-start sm:self-auto">{problem.status}</Badge>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Enunciado del Problema</CardTitle>
              <CardDescription>
                Dificultad: {problem.difficulty} • Fecha límite: {problem.dueDate}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg">{problem.description}</p>

              <div className="rounded-lg bg-muted p-4 text-center">
                <div className="text-xl" dangerouslySetInnerHTML={{ __html: `$$${problem.mathFormula}$$` }} />
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label htmlFor="answer" className="text-lg font-medium">
                      Tu respuesta:
                    </label>
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant={inputMethod === "text" ? "default" : "outline"}
                        size="sm"                        
                        onClick={() => setInputMethod("text")}
                        aria-label="Responder con texto"
                      >
                        Texto
                      </Button>
                      <Button
                        type="button"
                        variant={inputMethod === "voice" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setInputMethod("voice")}
                        aria-label="Responder con voz"
                      >
                        <Mic className="h-4 w-4 mr-1" />
                        Voz
                      </Button>
                      <Button
                        type="button"
                        variant={inputMethod === "draw" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setInputMethod("draw")}
                        aria-label="Responder dibujando"
                      >
                        <PenTool className="h-4 w-4 mr-1" />
                        Dibujo
                      </Button>
                    </div>
                  </div>

                  {inputMethod === "text" && (
                    <Textarea
                      id="answer"
                      placeholder="Escribe tu respuesta aquí..."
                      className="min-h-[150px] text-lg"
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                    />
                  )}

                  {inputMethod === "voice" && (
                    <div className="flex flex-col items-center justify-center min-h-[150px] rounded-md border border-input bg-background p-4">
                      <Button type="button" size="lg" className="rounded-full h-16 w-16">
                        <Mic className="h-8 w-8" />
                      </Button>
                      <p className="mt-4 text-muted-foreground">
                        Haz clic en el micrófono y habla para grabar tu respuesta
                      </p>
                    </div>
                  )}

                  {inputMethod === "draw" && (
                    <div className="min-h-[250px] rounded-md border border-input bg-background p-4">
                      <div className="h-full flex items-center justify-center">
                        <p className="text-muted-foreground">Herramienta de dibujo (simulada)</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={() => setShowSolution(!showSolution)}>
                    {showSolution ? "Ocultar solución" : "Ver solución"}
                  </Button>
                  <Button type="submit">
                    Enviar respuesta
                    <Send className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </form>

              {showSolution && (
                <div className="mt-6 rounded-lg border p-4">
                  <h3 className="text-xl font-bold mb-2">Solución:</h3>
                  <div dangerouslySetInnerHTML={{ __html: problem.solution }} />
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
