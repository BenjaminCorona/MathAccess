"use client"

import type React from "react"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { BookOpen, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Importamos SweetAlert2
import Swal from "sweetalert2"

export default function CreateContentPage() {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Estados para los campos del formulario (nombres cambiados a español)
  const [titulo, setTitulo] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [tipo, setTipo] = useState("")
  const [nivel, setNivel] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Crear objeto con los datos del formulario
    const contentData = {
      titulo,
      descripcion,
      tipo,
      nivel
    }
    
    console.log("Enviando datos:", contentData)
    
    try {
      const response = await fetch("http://localhost/math_api/contenidos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contentData)
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        console.error("Error en la respuesta de la API:", {
          status: response.status,
          statusText: response.statusText,
          data
        })
        
        // Mostrar alerta de error
        Swal.fire({
          title: "¡Error!",
          text: data.message || "Ocurrió un error al guardar el contenido",
          icon: "error",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#3085d6"
        })
        
        throw new Error(`Error ${response.status}: ${data.message || response.statusText}`)
      }
      
      console.log("Contenido guardado exitosamente:", data)
      
      // Mostrar alerta de éxito
      Swal.fire({
        title: "¡Contenido guardado!",
        text: data.message || "El contenido se ha guardado correctamente",
        icon: "success",
        confirmButtonText: "Continuar",
        confirmButtonColor: "#28a745"
      }).then(() => {
        // Redirigir al dashboard o a la lista de contenidos
        navigate("/dashboard")
      })
      
      // Limpiar el formulario después de guardar exitosamente
      if (data.status === "success") {
        setTitulo("")
        setDescripcion("")
        setTipo("")
        setNivel("")
      }
      
    } catch (error) {
      console.error("Error al guardar contenido:", error)
      // Mostrar alerta de error genérico si ocurre un error en la solicitud
      Swal.fire({
        title: "Error de conexión",
        text: "No se pudo conectar con el servidor. Inténtelo más tarde.",
        icon: "error",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#3085d6"
      })
    } finally {
      setIsSubmitting(false)
    }
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
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
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
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="type" className="text-lg">
                      Tipo de Contenido
                    </Label>
                    <Select 
                      required 
                      value={tipo} 
                      onValueChange={setTipo}
                    >
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
                      Nivel de dificultad
                    </Label>
                    <Select 
                      required
                      value={nivel}
                      onValueChange={setNivel}
                    >
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
              </CardContent>
                <div className="mt-6">
                <CardFooter className="flex justify-between">
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Guardando..." : "Guardar Contenido"}
                  </Button>
                </CardFooter>
                </div>
            </form>
          </Card>
        </div>
      </main>
    </div>
  )
}
