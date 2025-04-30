import { ArrowRight, BookOpen, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <header className="border-b">
                <div className="container flex h-16 items-center justify-between px-4 md:px-6">
                    <div className="flex items-center gap-2">
                        <BookOpen className="h-6 w-6" />
                        <span className="text-xl font-bold">MathAccess</span>
                    </div>
                    <nav className="flex gap-4 sm:gap-6">
                        <a
                            href="/auth"
                            className="text-lg font-medium underline-offset-4 hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-ring rounded-md"
                        >
                            Iniciar sesión
                        </a>
                        <a
                            href="/auth?register=true"
                            className="text-lg font-medium underline-offset-4 hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-ring rounded-md"
                        >
                            Registrarse
                        </a>
                    </nav>
                </div>
            </header>
            <main className="flex-1">
                <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
                    <div className="container px-4 md:px-6">
                        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
                            <div className="space-y-4">
                                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                                    Sistema de Enseñanza de Matemáticas
                                    Accesible
                                </h1>
                                <p className="text-xl text-muted-foreground">
                                    Una plataforma diseñada para hacer que el
                                    aprendizaje de las matemáticas sea accesible
                                    para todos los estudiantes universitarios,
                                    independientemente de sus capacidades.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Button
                                        asChild
                                        size="lg"
                                        className="text-lg h-12"
                                    >
                                        <a href="/auth">
                                            Iniciar sesión
                                            <ArrowRight className="ml-2 h-5 w-5" />
                                        </a>
                                    </Button>
                                    <Button
                                        asChild
                                        variant="outline"
                                        size="lg"
                                        className="text-lg h-12"
                                    >
                                        <a href="/auth?register=true">
                                            Registrarse
                                        </a>
                                    </Button>
                                </div>
                            </div>
                            <div className="relative h-[350px] w-full rounded-xl overflow-hidden">
                                <img
                                    src="/placeholder.svg?height=700&width=700"
                                    alt="Estudiantes aprendiendo matemáticas"
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </section>
                <section className="w-full py-12 md:py-24 lg:py-32">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                                    Características Principales
                                </h2>
                                <p className="max-w-[900px] text-muted-foreground text-xl">
                                    Nuestra plataforma está diseñada pensando en
                                    la accesibilidad y la experiencia de
                                    aprendizaje.
                                </p>
                            </div>
                        </div>
                        <div className="mx-auto grid max-w-5xl gap-8 pt-12 md:grid-cols-3">
                            <div className="flex flex-col items-center space-y-4 text-center">
                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                                    <BookOpen className="h-8 w-8" />
                                </div>
                                <h3 className="text-xl font-bold">
                                    Contenido Accesible
                                </h3>
                                <p className="text-muted-foreground text-lg">
                                    Material educativo diseñado para ser
                                    accesible con lectores de pantalla y
                                    navegación por teclado.
                                </p>
                            </div>
                            <div className="flex flex-col items-center space-y-4 text-center">
                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                                    <Users className="h-8 w-8" />
                                </div>
                                <h3 className="text-xl font-bold">
                                    Aprendizaje Personalizado
                                </h3>
                                <p className="text-muted-foreground text-lg">
                                    Adaptamos el contenido a las necesidades
                                    específicas de cada estudiante.
                                </p>
                            </div>
                            <div className="flex flex-col items-center space-y-4 text-center">
                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                                    <Award className="h-8 w-8" />
                                </div>
                                <h3 className="text-xl font-bold">
                                    Seguimiento de Progreso
                                </h3>
                                <p className="text-muted-foreground text-lg">
                                    Visualiza tu avance con gráficas accesibles
                                    y reportes detallados.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <footer className="border-t py-6 md:py-8">
                <div className="container flex flex-col items-center justify-center gap-4 px-4 md:px-6 text-center">
                    <div className="text-lg text-muted-foreground">
                        © 2025 Sistema de Enseñanza de Matemáticas Accesible.
                        Todos los derechos reservados.
                    </div>
                </div>
            </footer>
        </div>
    );
}
