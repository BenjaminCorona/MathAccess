import type React from "react";

import { use, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BookOpen, ArrowLeft, Send, Mic, PenTool } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mathProblems } from "../problems";
import Swal from "sweetalert2";

export default function ProblemPage() {
    const params = useParams();
    const { id } = params;

    const [inputMethod, setInputMethod] = useState<"text" | "voice" | "draw">(
        "text"
    );
    const [answer, setAnswer] = useState("");
    const [showSolution, setShowSolution] = useState(false);

    // estados para problemas
    const [descriptionProblem, setDescriptionProblem] = useState("");
    const [difficultyProblem, setDifficultyProblem] = useState("");
    const [dueDateProblem, setDueDateProblem] = useState("");
    const [mathFormulaProblem, setMathFormulaProblem] = useState("");
    const [solutionProblem, setSolutionProblem] = useState("");
    const [statusProblem, setStatusProblem] = useState("");
    const [titleProblem, setTitleProblem] = useState("");

    /** 
    console.log("Problem ID:", id);
    console.log(
        "Math Problems:",
        mathProblems.filter((problem) => problem.id === Number(id))
    );
    */

    useEffect(() => {
        setTitleProblem(
            mathProblems.filter((problem) => problem.id === Number(id))[0].title
        );
        setDifficultyProblem(
            mathProblems.filter((problem) => problem.id === Number(id))[0]
                .difficulty
        );
        setDueDateProblem(
            mathProblems.filter((problem) => problem.id === Number(id))[0]
                .dueDate
        );
        setMathFormulaProblem(
            mathProblems.filter((problem) => problem.id === Number(id))[0]
                .mathFormula
        );
        setSolutionProblem(
            mathProblems.filter((problem) => problem.id === Number(id))[0]
                .solution
        );
        setStatusProblem(
            mathProblems.filter((problem) => problem.id === Number(id))[0]
                .status
        );
        setDescriptionProblem(
            mathProblems.filter((problem) => problem.id === Number(id))[0]
                .description
        );
    }, [id]);

    useEffect(() => {
        //imprimir los estados del problema
        console.log("Título:", titleProblem);
        console.log("Dificultad:", difficultyProblem);
        console.log("Fecha de entrega:", dueDateProblem);
        console.log("Fórmula matemática:", mathFormulaProblem);
        console.log("Solución:", solutionProblem);
        console.log("Estado:", statusProblem);
        console.log("Descripción:", descriptionProblem);
    }, [
        titleProblem,
        difficultyProblem,
        dueDateProblem,
        mathFormulaProblem,
        solutionProblem,
        statusProblem,
        descriptionProblem,
    ]);

    // Simulación de datos del problema
    const problem = {
        id: id,
        title: titleProblem,
        description: descriptionProblem,
        difficulty: difficultyProblem,
        dueDate: dueDateProblem,
        status: statusProblem,
        mathFormula: mathFormulaProblem,
        solution: solutionProblem,
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Clean up both the answer and solution for comparison
        const userAnswer = answer.trim().toLowerCase();
        const correctSolution = solutionProblem.trim().toLowerCase();

        // Compare the user's answer with the solution
        if (userAnswer === correctSolution) {
            Swal.fire({
                title: "¡Respuesta Correcta!",
                text: "¡Felicidades! Has resuelto el problema correctamente.",
                icon: "success",
                confirmButtonText: "Continuar",
            });
        } else {
            Swal.fire({
                title: "Respuesta Incorrecta",
                text: "Tu respuesta no coincide con la solución. ¡Inténtalo de nuevo!",
                icon: "error",
                confirmButtonText: "Intentar otra vez",
            });
        }
    };

    return (
        <div className="flex min-h-screen flex-col">
            <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
                <Link
                    to="/problems"
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
                        <h1 className="text-3xl font-bold tracking-tight">
                            {problem.title}
                        </h1>
                        <Badge className="bg-yellow-500 text-black self-start sm:self-auto">
                            {problem.status}
                        </Badge>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Enunciado del Problema</CardTitle>
                            <CardDescription>
                                Dificultad: {problem.difficulty} • Fecha límite:{" "}
                                {problem.dueDate}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-lg">{problem.description}</p>

                            <div className="rounded-lg bg-muted p-4 text-center">
                                <div
                                    className="text-xl"
                                    dangerouslySetInnerHTML={{
                                        __html: `$$${problem.mathFormula}$$`,
                                    }}
                                />
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <label
                                            htmlFor="answer"
                                            className="text-lg font-medium"
                                        >
                                            Tu respuesta:
                                        </label>
                                        <div className="flex gap-2">
                                            <Button
                                                type="button"
                                                variant={
                                                    inputMethod === "text"
                                                        ? "default"
                                                        : "outline"
                                                }
                                                size="sm"
                                                onClick={() =>
                                                    setInputMethod("text")
                                                }
                                                aria-label="Responder con texto"
                                            >
                                                Texto
                                            </Button>
                                            <Button
                                                type="button"
                                                variant={
                                                    inputMethod === "voice"
                                                        ? "default"
                                                        : "outline"
                                                }
                                                size="sm"
                                                onClick={() =>
                                                    setInputMethod("voice")
                                                }
                                                aria-label="Responder con voz"
                                            >
                                                <Mic className="h-4 w-4 mr-1" />
                                                Voz
                                            </Button>
                                            <Button
                                                type="button"
                                                variant={
                                                    inputMethod === "draw"
                                                        ? "default"
                                                        : "outline"
                                                }
                                                size="sm"
                                                onClick={() =>
                                                    setInputMethod("draw")
                                                }
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
                                            onChange={(e) =>
                                                setAnswer(e.target.value)
                                            }
                                        />
                                    )}

                                    {inputMethod === "voice" && (
                                        <div className="flex flex-col items-center justify-center min-h-[150px] rounded-md border border-input bg-background p-4">
                                            <Button
                                                type="button"
                                                size="lg"
                                                className="rounded-full h-16 w-16"
                                            >
                                                <Mic className="h-8 w-8" />
                                            </Button>
                                            <p className="mt-4 text-muted-foreground">
                                                Haz clic en el micrófono y habla
                                                para grabar tu respuesta
                                            </p>
                                        </div>
                                    )}

                                    {inputMethod === "draw" && (
                                        <div className="min-h-[250px] rounded-md border border-input bg-background p-4">
                                            <div className="h-full flex items-center justify-center">
                                                <p className="text-muted-foreground">
                                                    Herramienta de dibujo
                                                    (simulada)
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="flex justify-between">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() =>
                                            setShowSolution(!showSolution)
                                        }
                                    >
                                        {showSolution
                                            ? "Ocultar solución"
                                            : "Ver solución"}
                                    </Button>
                                    <Button type="submit">
                                        Enviar respuesta
                                        <Send className="ml-2 h-4 w-4" />
                                    </Button>
                                </div>
                            </form>

                            {showSolution && (
                                <div className="mt-6 rounded-lg border p-4">
                                    <h3 className="text-xl font-bold mb-2">
                                        Solución:
                                    </h3>
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: problem.solution,
                                        }}
                                    />
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}
