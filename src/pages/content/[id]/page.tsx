"use client";

import { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import {
    BookOpen,
    ArrowLeft,
    Volume2,
    TextIcon,
    ZoomIn,
    ZoomOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ContentPage() {
    const params = useParams();
    const contentId = params.id;

    const [fontSize, setFontSize] = useState(16);
    const [highContrast, setHighContrast] = useState(false);
    const [contentResult, setContentResult] = useState();
    const [titleResult, setTitleResult] = useState();
    const [typeResult, setTypeResult] = useState();
    const [levelResult, setLevelResult] = useState();
    const [createdAtResult, setCreatedAtResult] = useState();
    const [isSpeaking, setIsSpeaking] = useState(false);

    // Log the ID parameter when component mounts
    useEffect(() => {
        console.log("Content ID from URL parameter:", contentId);
    }, [contentId]);

    // Simulación de datos del contenido
    const content = {
        id: contentId,
        title: "Cálculo Diferencial",
        description: "Fundamentos de límites y derivadas",
        type: "Teoría",
        level: "Intermedio",
        duration: "45 min",
        author: "Dr. Carlos Rodríguez",
        date: "10/04/2025",
        content: `
      <h2>Introducción al Cálculo Diferencial</h2>
      <p>El cálculo diferencial es una rama de las matemáticas que se ocupa del estudio de cómo cambian las funciones cuando sus entradas cambian. El concepto principal del cálculo diferencial es la derivada.</p>
      
      <h3>Límites</h3>
      <p>Antes de entender las derivadas, es importante comprender el concepto de límite. Un límite describe el valor al que tiende una función cuando la variable independiente se aproxima a un cierto valor.</p>
      
      <p>Formalmente, el límite de una función f(x) cuando x tiende a un valor a se denota como:</p>
      <div class="math-formula">$$\\lim_{x \\to a} f(x) = L$$</div>
      
      <p>Esto significa que podemos hacer que f(x) esté tan cerca como queramos de L, haciendo que x esté suficientemente cerca de a (pero no necesariamente igual a a).</p>
      
      <h3>Derivadas</h3>
      <p>La derivada de una función en un punto dado mide la tasa de cambio instantánea de la función en ese punto. Geométricamente, representa la pendiente de la recta tangente a la gráfica de la función en ese punto.</p>
      
      <p>La derivada de una función f(x) con respecto a x se denota como f'(x) o df/dx, y se define como:</p>
      <div class="math-formula">$$f'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}$$</div>
      
      <h3>Reglas de Derivación</h3>
      <p>Existen varias reglas que facilitan el cálculo de derivadas:</p>
      <ul>
        <li>Regla de la constante: Si f(x) = c, entonces f'(x) = 0</li>
        <li>Regla de la potencia: Si f(x) = x^n, entonces f'(x) = n·x^(n-1)</li>
        <li>Regla del producto: Si h(x) = f(x)·g(x), entonces h'(x) = f'(x)·g(x) + f(x)·g'(x)</li>
        <li>Regla del cociente: Si h(x) = f(x)/g(x), entonces h'(x) = [f'(x)·g(x) - f(x)·g'(x)]/[g(x)]^2</li>
        <li>Regla de la cadena: Si h(x) = f(g(x)), entonces h'(x) = f'(g(x))·g'(x)</li>
      </ul>
      
      <h3>Aplicaciones</h3>
      <p>El cálculo diferencial tiene numerosas aplicaciones en física, ingeniería, economía y otras ciencias. Algunas aplicaciones comunes incluyen:</p>
      <ul>
        <li>Cálculo de velocidad y aceleración</li>
        <li>Optimización (encontrar máximos y mínimos)</li>
        <li>Análisis de crecimiento y decrecimiento</li>
        <li>Aproximación de funciones</li>
      </ul>
    `,
        resources: [
            { name: "Presentación de Límites", type: "PDF", size: "2.4 MB" },
            { name: "Ejercicios de Derivadas", type: "PDF", size: "1.8 MB" },
            { name: "Video explicativo", type: "MP4", size: "45 MB" },
        ],
    };

    const increaseFontSize = () => {
        setFontSize((prev) => Math.min(prev + 2, 24));
    };

    const decreaseFontSize = () => {
        setFontSize((prev) => Math.max(prev - 2, 12));
    };

    const toggleContrast = () => {
        setHighContrast((prev) => !prev);
    };

    //obtener el contenido desde la API http://localhost/math_api/contenidos/(id)
    useEffect(() => {
        fetch(`http://localhost/math_api/contenidos/${contentId}`)
            .then((res) => res.json())
            .then((data) => {
                console.log("Respuesta cruda:", data);

                setContentResult(data.data.descripcion);
                setTitleResult(data.data.titulo);
                setTypeResult(data.data.tipo);
                setLevelResult(data.data.nivel);
                setCreatedAtResult(data.data.created_at);
            })
            .catch((err) => console.error("Error fetching contenido:", err));
    }, [contentResult]);

    const contentRef = useRef<HTMLDivElement>(null);
    
    // --- Función para leer en voz alta o pausar ---
    const readAloud = () => {
        // Si ya está hablando, pausar
        if (isSpeaking) {
            speechSynthesis.pause();
            setIsSpeaking(false);
            return;
        }
        
        // Si hay una síntesis pausada, reanudarla
        if (speechSynthesis.paused) {
            speechSynthesis.resume();
            setIsSpeaking(true);
            return;
        }
        
        // Si no hay nada, empezar nueva lectura
        if (!contentRef.current) return;
        
        // extraer solo texto plano, sin HTML
        const text = contentRef.current.innerText;
        if (!text) return;

        // si ya está leyendo algo diferente, cancelamos antes
        if (speechSynthesis.speaking) {
            speechSynthesis.cancel();
        }

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "es-ES";
        utterance.rate = 1;
        utterance.pitch = 1;
        
        // Cambiar estado cuando termine de hablar
        utterance.onend = () => {
            setIsSpeaking(false);
        };
        
        // Iniciar lectura y actualizar estado
        speechSynthesis.speak(utterance);
        setIsSpeaking(true);
    };

    return (
        <div className="flex min-h-screen flex-col">
            <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
                <Link
                    to="/content"
                    className="flex items-center gap-2 font-bold"
                >
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
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">
                                {titleResult}
                            </h1>
                            <p className="text-muted-foreground">
                                Curso de Matemáticas
                            </p>
                        </div>
                        <Badge className="self-start sm:self-auto">
                            {typeResult}
                        </Badge>
                    </div>

                    <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                        <span>Nivel: {levelResult}</span>
                        <span className="mx-2">•</span>
                        <span>Duración: {"45 min"}</span>
                        <span className="mx-2">•</span>
                        <span>Fecha: {createdAtResult}</span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={decreaseFontSize}
                            aria-label="Disminuir tamaño de texto"
                        >
                            <ZoomOut className="h-4 w-4 mr-1" />
                            A-
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={increaseFontSize}
                            aria-label="Aumentar tamaño de texto"
                        >
                            <ZoomIn className="h-4 w-4 mr-1" />
                            A+
                        </Button>
                        <Button
                            variant={highContrast ? "default" : "outline"}
                            size="sm"
                            onClick={toggleContrast}
                            aria-label="Alternar alto contraste"
                        >
                            <TextIcon className="h-4 w-4 mr-1" />
                            Alto contraste
                        </Button>
                        <Button
                            onClick={readAloud}
                            variant={isSpeaking ? "default" : "outline"}
                            size="sm"
                            aria-label={isSpeaking ? "Pausar lectura" : "Leer en voz alta"}
                        >
                            <Volume2 className="h-4 w-4 mr-1" />
                            {isSpeaking ? "Pausar lectura" : "Leer en voz alta"}
                        </Button>
                    </div>

                    <Tabs defaultValue="contenido">
                        <TabsList className="grid w-full grid-cols-2 text-lg">
                            <TabsTrigger value="contenido">
                                Contenido
                            </TabsTrigger>
                            <TabsTrigger value="recursos">Recursos</TabsTrigger>
                        </TabsList>
                        <TabsContent value="contenido" className="mt-6">
                            <Card>
                                <CardContent
                                    className={`p-6 ${
                                        highContrast
                                            ? "bg-black text-white"
                                            : ""
                                    }`}
                                    style={{ fontSize: `${fontSize}px` }}
                                >
                                    <div
                                        ref={contentRef}
                                        className="content-area space-y-4"
                                        dangerouslySetInnerHTML={{
                                            __html: contentResult || "",
                                        }}
                                    ></div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="recursos" className="mt-6">
                            <Card>
                                <CardContent className="p-6">
                                    <h2 className="text-xl font-bold mb-4">
                                        Recursos Disponibles
                                    </h2>
                                    <ul className="space-y-4">
                                        {content.resources.map(
                                            (resource, index) => (
                                                <li
                                                    key={index}
                                                    className="flex items-center justify-between border-b pb-2"
                                                >
                                                    <div className="flex items-center">
                                                        {resource.type ===
                                                            "PDF" && (
                                                            <div className="bg-red-100 text-red-800 p-2 rounded mr-3">
                                                                PDF
                                                            </div>
                                                        )}
                                                        {resource.type ===
                                                            "MP4" && (
                                                            <div className="bg-blue-100 text-blue-800 p-2 rounded mr-3">
                                                                VIDEO
                                                            </div>
                                                        )}
                                                        <span>
                                                            {resource.name}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-4">
                                                        <span className="text-sm text-muted-foreground">
                                                            {resource.size}
                                                        </span>
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                        >
                                                            Descargar
                                                        </Button>
                                                    </div>
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>

                    <div className="flex justify-between">
                        <Button variant="outline">Contenido Anterior</Button>
                        <Button>Siguiente Contenido</Button>
                    </div>
                </div>
            </main>
        </div>
    );
}
