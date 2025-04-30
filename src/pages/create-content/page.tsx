"use client"

import type React from "react"

import { useState } from "react"
import { Link } from "react-router-dom"
import { BookOpen, ArrowLeft, Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function CreateContentPage() {
  const [files, setFiles] = useState<File[]>([])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setFiles((prev) => [...prev, ...newFiles])
    }
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para guardar el contenido
    alert("Contenido guardado correctamente")
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
          <h1 className="text-3xl font-bold tracking-tight">Crear Nuevo Contenido</h1>

          <Card>
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>Información del Contenido</CardTitle>
                <CardDescription>Completa los detalles del material educativo que deseas crear</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-lg">
                    Título
                  </Label>
                  <Input
                    id="title"
                    placeholder="Ej. Introducción al Cálculo Diferencial"
                    className="h-12 text-lg"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-lg">
                    Descripción
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Describe brevemente el contenido..."
                    className="min-h-[100px] text-lg"
                    required
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="type" className="text-lg">
                      Tipo de Contenido
                    </Label>
                    <Select required>
                      <SelectTrigger id="type" className="h-12 text-lg">
                        <SelectValue placeholder="Selecciona un tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="teoria">Teoría</SelectItem>
                        <SelectItem value="ejemplo">Ejemplo</SelectItem>
                        <SelectItem value="actividad">Actividad</SelectItem>
                        <SelectItem value="evaluacion">Evaluación</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="level" className="text-lg">
                      Nivel
                    </Label>
                    <Select required>
                      <SelectTrigger id="level" className="h-12 text-lg">
                        <SelectValue placeholder="Selecciona un nivel" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basico">Básico</SelectItem>
                        <SelectItem value="intermedio">Intermedio</SelectItem>
                        <SelectItem value="avanzado">Avanzado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags" className="text-lg">
                    Etiquetas (separadas por comas)
                  </Label>
                  <Input id="tags" placeholder="Ej. cálculo, derivadas, límites" className="h-12 text-lg" />
                </div>

                <div className="space-y-2">
                  <Label className="text-lg">Archivos Adjuntos</Label>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-center w-full">
                      <label
                        htmlFor="file-upload"
                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted hover:bg-accent hover:border-accent-foreground transition-colors"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                          <p className="mb-2 text-sm text-muted-foreground">
                            <span className="font-semibold">Haz clic para subir</span> o arrastra y suelta
                          </p>
                          <p className="text-xs text-muted-foreground">PDF, DOCX, PPTX, MP4, MP3 (MAX. 20MB)</p>
                        </div>
                        <Input
                          id="file-upload"
                          type="file"
                          className="hidden"
                          multiple
                          onChange={handleFileChange}
                          accept=".pdf,.docx,.pptx,.mp4,.mp3"
                        />
                      </label>
                    </div>

                    {files.length > 0 && (
                      <div className="space-y-2">
                        <p className="font-medium">Archivos seleccionados:</p>
                        <ul className="space-y-2">
                          {files.map((file, index) => (
                            <li key={index} className="flex items-center justify-between p-2 rounded-md bg-muted">
                              <span className="truncate">{file.name}</span>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => removeFile(index)}
                                aria-label={`Eliminar archivo ${file.name}`}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="accessibility">
                    <AccordionTrigger className="text-lg">Opciones de Accesibilidad</AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="alt-text" className="text-lg">
                          Texto Alternativo para Imágenes
                        </Label>
                        <Textarea
                          id="alt-text"
                          placeholder="Describe las imágenes para lectores de pantalla..."
                          className="min-h-[80px]"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="transcript" className="text-lg">
                          Transcripción (para contenido de audio/video)
                        </Label>
                        <Textarea
                          id="transcript"
                          placeholder="Proporciona una transcripción del contenido..."
                          className="min-h-[80px]"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-lg">Opciones Adicionales</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="high-contrast" className="h-5 w-5 rounded" />
                            <Label htmlFor="high-contrast">Modo de alto contraste</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="screen-reader" className="h-5 w-5 rounded" />
                            <Label htmlFor="screen-reader">Optimizado para lectores de pantalla</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="keyboard-nav" className="h-5 w-5 rounded" />
                            <Label htmlFor="keyboard-nav">Navegación por teclado</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="text-to-speech" className="h-5 w-5 rounded" />
                            <Label htmlFor="text-to-speech">Soporte para texto a voz</Label>
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
                <Button type="submit">Guardar Contenido</Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </main>
    </div>
  )
}
