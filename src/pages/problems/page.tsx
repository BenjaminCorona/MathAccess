import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
    BookOpen,
    Filter,
    Search,
    CheckCircle,
    Clock,
    AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { mathProblems } from "./problems";

export default function ProblemsPage() {
    const navigate = useNavigate();

    return (
        <div className="flex min-h-screen flex-col">
            <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
                <Link
                    to="/dashboard"
                    className="flex items-center gap-2 font-bold"
                >
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
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <h1 className="text-3xl font-bold tracking-tight">
                            Problemas Matemáticos
                        </h1>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {mathProblems.map((problem) => (
                            <Card key={problem.id}>
                                <CardHeader>
                                    <div className="flex justify-between items-start">
                                        <CardTitle>
                                            {problem.title}
                                        </CardTitle>
                                        <Badge 
                                            className={
                                                problem.status === "Completado" 
                                                    ? "bg-green-500" 
                                                    : problem.status === "Pendiente" 
                                                    ? "bg-yellow-500 text-black" 
                                                    : "bg-destructive"
                                            }
                                        >
                                            {problem.status}
                                        </Badge>
                                    </div>
                                    <CardDescription>
                                        {problem.description.length > 60
                                            ? `${problem.description.substring(0, 60)}...`
                                            : problem.description}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p>
                                        {problem.description}
                                    </p>
                                    <div className="mt-4 flex items-center text-sm text-muted-foreground">
                                        <span>Dificultad: {problem.difficulty}</span>
                                        <span className="mx-2">•</span>
                                        <span className="flex items-center">
                                            {problem.status === "Completado" ? (
                                                <CheckCircle className="mr-1 h-4 w-4 text-green-500" />
                                            ) : problem.status === "Vencido" ? (
                                                <AlertCircle className="mr-1 h-4 w-4 text-destructive" />
                                            ) : (
                                                <Clock className="mr-1 h-4 w-4 text-yellow-500" />
                                            )}
                                            {problem.status === "Completado"
                                                ? "Completado"
                                                : problem.status === "Vencido"
                                                ? `Vencido: ${problem.dueDate}`
                                                : `Fecha límite: ${problem.dueDate || "No especificada"}`}
                                        </span>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button asChild className="w-full">
                                        <Link to={`/problems/${problem.id}`}>
                                            {problem.status === "Completado"
                                                ? "Ver problema"
                                                : problem.status === "Vencido"
                                                ? "Ver problema"
                                                : "Resolver ahora"}
                                        </Link>
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}





