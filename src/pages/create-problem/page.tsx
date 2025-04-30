
import type React from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { BookOpen, ArrowLeft, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function CreateProblemPage() {
  const [steps, setSteps] = useState<string[]>([""])

  const addStep = () => {
    setSteps([...steps, ""])
  }

  const removeStep = (index: number) => {
    const newSteps = [...steps]
    newSteps.splice(index, 1)
    setSteps(newSteps)
  }

  const updateStep = (index: number, value: string) => {
    const newSteps = [...steps]
    newSteps[index] = value
    setSteps(newSteps)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para guardar el problema
    alert("Problema guardado correctamente")
  }

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
        <div className="mx-auto max-w-3xl space-y-6">
          <h1 className="text-3xl font-bold tracking-tight">Crear Nuevo Problema</h1>

          <Card>
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>Información del Problema</CardTitle>
                <CardDescription>Completa los detalles del problema matemático que deseas crear</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-lg">
                    Título
                  </Label>
                  <Input
                    id="title"
                    placeholder="Ej. Derivadas de Funciones Compuestas"
                    className="h-12 text-lg"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="statement" className="text-lg">
                    Enunciado del Problema
                  </Label>
                  <Textarea
                    id="statement"
                    placeholder="Escribe el enunciado del problema..."
                    className="min-h-[100px] text-lg"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="math-formula" className="text-lg">
                    Fórmula Matemática (LaTeX)
                  </Label>
                  <Textarea
                    id="math-formula"
                    placeholder="Ej. \int_{0}^{2} x^2 dx"
                    className="min-h-[80px] text-lg font-mono"
                  />
                  <p className="text-sm text-muted-foreground">
                    Usa sintaxis LaTeX para escribir fórmulas matemáticas. Ejemplo: \int_{0}^{2} x^2 dx
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="difficulty" className="text-lg">
                      Dificultad
                    </Label>
                    <Select required>
                      <SelectTrigger id="difficulty" className="h-12 text-lg">
                        <SelectValue placeholder="Selecciona una dificultad" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="facil">Fácil</SelectItem>
                        <SelectItem value="medio">Medio</SelectItem>
                        <SelectItem value="dificil">Difícil</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-lg">
                      Categoría
                    </Label>
                    <Select required>
                      <SelectTrigger id="category" className="h-12 text-lg">
                        <SelectValue placeholder="Selecciona una categoría" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="calculo">Cálculo</SelectItem>
                        <SelectItem value="algebra">Álgebra</SelectItem>
                        <SelectItem value="geometria">Geometría</SelectItem>
                        <SelectItem value="estadistica">Estadística</SelectItem>
                        <SelectItem value="otro">Otro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="solution" className="text-lg">
                    Solución
                  </Label>
                  <Textarea
                    id="solution"
                    placeholder="Escribe la solución completa del problema..."
                    className="min-h-[150px] text-lg"
                    required
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-lg">Pasos de Solución</Label>
                    <Button type="button" variant="outline" size="sm" onClick={addStep} className="flex items-center">
                      <Plus className="h-4 w-4 mr-1" />
                      Añadir Paso
                    </Button>
                  </div>

                  {steps.map((step, index) => (
                    <div key={index} className="flex gap-2">
                      <div className="flex-grow space-y-1">
                        <Label htmlFor={`step-${index}`} className="text-sm">
                          Paso {index + 1}
                        </Label>
                        <Textarea
                          id={`step-${index}`}
                          value={step}
                          onChange={(e) => updateStep(index, e.target.value)}
                          placeholder={`Describe el paso ${index + 1}...`}
                          className="min-h-[80px]"
                        />
                      </div>
                      {steps.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeStep(index)}
                          className="self-end mb-2"
                          aria-label={`Eliminar paso ${index + 1}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="accessibility">
                    <AccordionTrigger className="text-lg">Opciones de Accesibilidad</AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="alt-description" className="text-lg">
                          Descripción Alternativa
                        </Label>
                        <Textarea
                          id="alt-description"
                          placeholder="Proporciona una descripción alternativa del problema para lectores de pantalla..."
                          className="min-h-[80px]"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-lg">Opciones Adicionales</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="voice-input" className="h-5 w-5 rounded" />
                            <Label htmlFor="voice-input">Permitir entrada por voz</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="drawing-input" className="h-5 w-5 rounded" />
                            <Label htmlFor="drawing-input">Permitir entrada por dibujo</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="step-by-step" className="h-5 w-5 rounded" />
                            <Label htmlFor="step-by-step">Mostrar solución paso a paso</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="hints" className="h-5 w-5 rounded" />
                            <Label htmlFor="hints">Incluir pistas</Label>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button type="button" variant="outline">
                  Vista Previa
                </Button>
                <Button type="submit">Guardar Problema</Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </main>
    </div>
  )
}
