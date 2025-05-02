import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    BookOpen,
    Menu,
    X,
    Home,
    BookText,
    Calculator,
    BarChart3,
    FilePlus,
    FileEdit,
    PieChart,
    LogOut,
    User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMobile } from "@/hooks/use-mobile";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function DashboardPage() {
    const navigate = useNavigate();

    interface UserData {
        id: number;
        nombre_completo: string;
        email: string;
        rol: string;
    }

    const isMobile = useMobile();
    const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
    const [role, setRole] = useState("estudiante"); // Simulación de rol, en producción vendría de autenticación
    const [userData, setUserData] = useState<UserData | null>(null);
    const [totalStudents, setTotalStudents] = useState(0);
    const [totalTeachers, setTotalTeachers] = useState(0);
    const [totalAdmins, setTotalAdmins] = useState(0);
    const [totalContent, setTotalContent] = useState(0);

    //useEffect para verificar si el usuario ya está autenticado
    useEffect(() => {
        const token = localStorage.getItem("auth_token");

        if (!token) {
            console.log("No hay token, redirigiendo a login");
            navigate("/auth");
            return;
        }

        try {
            const userDataString = localStorage.getItem("user_data");

            if (userDataString) {
                const parsedUserData = JSON.parse(userDataString);
                console.log("Datos del usuario cargados:", parsedUserData);
                setUserData(parsedUserData);
                // Setting role based on parsed user data
                if (parsedUserData.rol) {
                    setRole(parsedUserData.rol);
                }
            }
        } catch (error) {
            console.error("Error al cargar datos del usuario:", error);
        }
    }, [navigate]);

    // useEffect para verificar si el rol del usuario ha cambiado
    useEffect(() => {
        console.log("User data updated:", userData?.rol);
    }, [userData]);

    // función para obtener los usuarios de http://localhost/math_api/usuarios
    const fetchUsers = async () => {
        try {
            const response = await fetch("http://localhost/math_api/usuarios", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem(
                        "auth_token"
                    )}`,
                },
            });
            const data = await response.json();

            console.log("Usuarios:", data);

            // Check if data is an array before trying to access length
            if (Array.isArray(data)) {
                console.log("Número total de usuarios:", data.length);

                //logs para mostrar cuantos usuarios hay, y a parte cuantos de esos son usuarios cuantos maestros y cuantos admin
                const totalUsers = data.length;

                setTotalStudents(
                    data.filter((user: UserData) => user.rol === "usuario")
                        .length
                );

                setTotalTeachers(
                    data.filter((user: UserData) => user.rol === "maestro")
                        .length
                );

                setTotalAdmins(
                    data.filter((user: UserData) => user.rol === "admin").length
                );

                console.log("Total de usuarios:", totalUsers);
                console.log("Total de estudiantes:", totalStudents);
                console.log("Total de maestros:", totalTeachers);
                console.log("Total de administradores:", totalAdmins);
            } else if (data && typeof data === "object") {
                // If data is an object with a specific structure (like { usuarios: [...] })
                // Try to find the array in a common property
                const usersArray =
                    data.usuarios || data.data || data.results || [];
                if (Array.isArray(usersArray)) {
                    console.log("Número total de usuarios:", usersArray.length);

                    const totalUsers = usersArray.length;

                    setTotalStudents(
                        usersArray.filter(
                            (user: UserData) => user.rol === "usuario"
                        ).length
                    );

                    setTotalTeachers(
                        usersArray.filter(
                            (user: UserData) => user.rol === "maestro"
                        ).length
                    );

                    setTotalAdmins(
                        usersArray.filter(
                            (user: UserData) => user.rol === "admin"
                        ).length
                    );

                    console.log("Total de usuarios:", totalUsers);

                    console.log("Total de estudiantes:", totalStudents);
                    console.log("Total de maestros:", totalTeachers);
                    console.log("Total de administradores:", totalAdmins);
                } else {
                    console.log(
                        "No se pudo encontrar un arreglo de usuarios en la respuesta:",
                        data
                    );
                }
            } else {
                console.log(
                    "La respuesta no es un arreglo ni un objeto:",
                    data
                );
            }
            // Aquí puedes actualizar el estado con los datos obtenidos
        } catch (error) {
            console.error("Error al obtener usuarios:", error);
        }
    };

    //función para obtener los contenidos de http://localhost/math_api/contenidos
    const fetchContents = async () => {
        try {
            const response = await fetch(
                "http://localhost/math_api/contenidos",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem(
                            "auth_token"
                        )}`,
                    },
                }
            );
            const dataContent = await response.json();
            console.log("Contenidos:", dataContent);

            if (dataContent && typeof dataContent === "object") {
                // If data is an object with a specific structure (like { usuarios: [...] })
                // Try to find the array in a common property
                const usersArray =
                    dataContent.content ||
                    dataContent.data ||
                    dataContent.results ||
                    [];
                if (Array.isArray(usersArray)) {
                    console.log(
                        "Número total de contenidos:",
                        usersArray.length
                    );
                    setTotalContent(usersArray.length);
                } else {
                    console.log(
                        "No se pudo encontrar un arreglo de usuarios en la respuesta:",
                        dataContent
                    );
                }
            } else {
                console.log(
                    "La respuesta no es un arreglo ni un objeto:",
                    dataContent
                );
            }
        } catch (error) {
            console.error("Error al obtener contenidos:", error);
        }
    };

    //Llamar a la función para obtener los contenidos al cargar el componente
    useEffect(() => {
        fetchContents();
    }, [totalContent]);

    // Llamar a la función para obtener los usuarios al cargar el componente
    useEffect(() => {
        fetchUsers();
    }, [totalStudents, totalTeachers, totalAdmins]);
    // Función para cambiar el rol (solo para demostración)

    // Función para manejar el cierre de sesión
    const handleLogout = () => {
        Swal.fire({
            title: "¿Cerrar sesión?",
            text: "¿Estás seguro que deseas cerrar tu sesión?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Sí, cerrar sesión",
            cancelButtonText: "Cancelar",
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
        }).then((result) => {
            if (result.isConfirmed) {
                // Eliminar datos de autenticación del localStorage
                localStorage.removeItem("auth_token");
                localStorage.removeItem("user_data");
                localStorage.removeItem("auth_response");

                // Mostrar mensaje de éxito
                Swal.fire({
                    title: "Sesión cerrada",
                    text: "Has cerrado sesión correctamente",
                    icon: "success",
                    confirmButtonText: "Aceptar",
                    confirmButtonColor: "#3085d6",
                    timer: 2000,
                    timerProgressBar: true,
                }).then(() => {
                    // Redirigir al inicio
                    navigate("/");
                });
            }
        });
    };

    return (
        <div className="flex min-h-screen flex-col">
            <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
                <Button
                    variant="ghost"
                    size="icon"
                    aria-label={sidebarOpen ? "Cerrar menú" : "Abrir menú"}
                    className="md:hidden"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                    {sidebarOpen ? (
                        <X className="h-6 w-6" />
                    ) : (
                        <Menu className="h-6 w-6" />
                    )}
                </Button>
                <div className="flex items-center gap-2">
                    <BookOpen className="h-6 w-6" />
                    <span className="text-xl font-bold">MathAccess</span>
                </div>
                <div className="ml-auto flex items-center gap-4">
                    <Link to="/profile">
                        <Button
                            variant="ghost"
                            size="icon"
                            aria-label="Perfil de usuario"
                        >
                            <User className="h-5 w-5" />
                        </Button>
                    </Link>
                    <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Cerrar sesión"
                        onClick={handleLogout}
                    >
                        <LogOut className="h-5 w-5" />
                    </Button>
                </div>
            </header>
            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <aside
                    className={`${
                        sidebarOpen ? "flex" : "hidden"
                    } w-64 flex-col border-r bg-muted md:flex`}
                >
                    <nav className="grid gap-2 p-4 text-lg font-medium">
                        <Link
                            to="/dashboard"
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-primary hover:bg-accent transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-ring"
                        >
                            <Home className="h-5 w-5" />
                            <span>Inicio</span>
                        </Link>
                        <Link
                            to="/content"
                            className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-accent transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-ring"
                        >
                            <BookText className="h-5 w-5" />
                            <span>Contenidos</span>
                        </Link>
                        <Link
                            to="/problems"
                            className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-accent transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-ring"
                        >
                            <Calculator className="h-5 w-5" />
                            <span>Problemas</span>
                        </Link>
                        <Link
                            to="/progress"
                            className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-accent transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-ring"
                        >
                            <BarChart3 className="h-5 w-5" />
                            <span>Progreso</span>
                        </Link>

                        {/* Enlaces específicos según el rol */}
                        {(userData?.rol === "maestro" ||
                            userData?.rol === "admin") && (
                            <>
                                <div className="my-2 h-px bg-border"></div>
                                <Link
                                    to="/create-content"
                                    className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-accent transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-ring"
                                >
                                    <FilePlus className="h-5 w-5" />
                                    <span>Crear Contenido</span>
                                </Link>
                                <Link
                                    to="/create-problem"
                                    className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-accent transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-ring"
                                >
                                    <FileEdit className="h-5 w-5" />
                                    <span>Crear Problema</span>
                                </Link>
                            </>
                        )}

                        {userData?.rol === "admin" && (
                            <>
                                <Link
                                    to="/metrics"
                                    className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-accent transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-ring"
                                >
                                    <PieChart className="h-5 w-5" />
                                    <span>Métricas</span>
                                </Link>
                            </>
                        )}
                    </nav>
                </aside>

                {/* Contenido principal */}
                <main className="flex-1 overflow-y-auto p-4 md:p-6">
                    <div className="mx-auto max-w-7xl space-y-6">
                        <h1 className="text-3xl font-bold tracking-tight">
                            Panel Principal
                        </h1>

                        {/* Selector de rol (solo para demostración) */}
                        <div className="mb-6">
                            {/** <p className="mb-2 text-lg font-medium">Cambiar rol (demo):</p>*/}
                            <div className="flex gap-2">
                                {userData?.rol == "usuario" && (
                                    <Button
                                        variant={
                                            userData?.rol === "usuario"
                                                ? "default"
                                                : "outline"
                                        }
                                        onClick={() => setRole("usuario")}
                                    >
                                        Estudiante
                                    </Button>
                                )}
                                {userData?.rol == "maestro" && (
                                    <Button
                                        variant={
                                            userData?.rol === "maestro"
                                                ? "default"
                                                : "outline"
                                        }
                                        onClick={() => setRole("maestro")}
                                    >
                                        Maestro
                                    </Button>
                                )}
                                {userData?.rol == "admin" && (
                                    <Button
                                        variant={
                                            userData?.rol === "admin"
                                                ? "default"
                                                : "outline"
                                        }
                                        onClick={() => setRole("administrador")}
                                    >
                                        Administrador
                                    </Button>
                                )}
                            </div>
                        </div>

                        {/* Contenido específico según el rol */}
                        {userData?.rol === "usuario" && (
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>
                                            Contenidos Recientes
                                        </CardTitle>
                                        <CardDescription>
                                            Últimos materiales añadidos
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="space-y-2">
                                            <li className="rounded-lg border p-3 hover:bg-accent transition-colors">
                                                <Link
                                                    to="/content/1"
                                                    className="block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-ring rounded-md p-1"
                                                >
                                                    <div className="font-medium">
                                                        Cálculo Diferencial
                                                    </div>
                                                    <div className="text-sm text-muted-foreground">
                                                        Teoría básica de límites
                                                    </div>
                                                </Link>
                                            </li>
                                            <li className="rounded-lg border p-3 hover:bg-accent transition-colors">
                                                <Link
                                                    to="/content/2"
                                                    className="block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-ring rounded-md p-1"
                                                >
                                                    <div className="font-medium">
                                                        Álgebra Lineal
                                                    </div>
                                                    <div className="text-sm text-muted-foreground">
                                                        Matrices y determinantes
                                                    </div>
                                                </Link>
                                            </li>
                                        </ul>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>
                                            Problemas Pendientes
                                        </CardTitle>
                                        <CardDescription>
                                            Ejercicios asignados
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="space-y-2">
                                            <li className="rounded-lg border p-3 hover:bg-accent transition-colors">
                                                <Link
                                                    to="/problems/1"
                                                    className="block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-ring rounded-md p-1"
                                                >
                                                    <div className="font-medium">
                                                        Derivadas
                                                    </div>
                                                    <div className="text-sm text-muted-foreground">
                                                        Fecha límite: 15/05/2025
                                                    </div>
                                                </Link>
                                            </li>
                                            <li className="rounded-lg border p-3 hover:bg-accent transition-colors">
                                                <Link
                                                    to="/problems/2"
                                                    className="block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-ring rounded-md p-1"
                                                >
                                                    <div className="font-medium">
                                                        Integrales
                                                    </div>
                                                    <div className="text-sm text-muted-foreground">
                                                        Fecha límite: 20/05/2025
                                                    </div>
                                                </Link>
                                            </li>
                                        </ul>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Tu Progreso</CardTitle>
                                        <CardDescription>
                                            Resumen de actividad
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            <div>
                                                <div className="mb-1 flex items-center justify-between">
                                                    <span>
                                                        Problemas completados
                                                    </span>
                                                    <span className="font-medium">
                                                        65%
                                                    </span>
                                                </div>
                                                <div className="h-3 rounded-full bg-muted">
                                                    <div
                                                        className="h-3 rounded-full bg-primary"
                                                        style={{ width: "65%" }}
                                                    ></div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="mb-1 flex items-center justify-between">
                                                    <span>
                                                        Contenido revisado
                                                    </span>
                                                    <span className="font-medium">
                                                        80%
                                                    </span>
                                                </div>
                                                <div className="h-3 rounded-full bg-muted">
                                                    <div
                                                        className="h-3 rounded-full bg-primary"
                                                        style={{ width: "80%" }}
                                                    ></div>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        )}

                        {userData?.rol === "maestro" && (
                            <div className="grid gap-6 md:grid-cols-2">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>
                                            Contenidos Creados
                                        </CardTitle>
                                        <CardDescription>
                                            Tus materiales publicados
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="space-y-2">
                                            <li className="rounded-lg border p-3 hover:bg-accent transition-colors">
                                                <Link
                                                    to="/content/1"
                                                    className="block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-ring rounded-md p-1"
                                                >
                                                    <div className="font-medium">
                                                        Cálculo Diferencial
                                                    </div>
                                                    <div className="text-sm text-muted-foreground">
                                                        Publicado: 10/04/2025
                                                    </div>
                                                </Link>
                                            </li>
                                            <li className="rounded-lg border p-3 hover:bg-accent transition-colors">
                                                <Link
                                                    to="/content/2"
                                                    className="block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-ring rounded-md p-1"
                                                >
                                                    <div className="font-medium">
                                                        Álgebra Lineal
                                                    </div>
                                                    <div className="text-sm text-muted-foreground">
                                                        Publicado: 05/04/2025
                                                    </div>
                                                </Link>
                                            </li>
                                        </ul>
                                        <Button asChild className="mt-4 w-full">
                                            <Link to="/create-content">
                                                Crear nuevo contenido
                                            </Link>
                                        </Button>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Problemas Creados</CardTitle>
                                        <CardDescription>
                                            Ejercicios publicados
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="space-y-2">
                                            <li className="rounded-lg border p-3 hover:bg-accent transition-colors">
                                                <Link
                                                    to="/problems/1"
                                                    className="block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-ring rounded-md p-1"
                                                >
                                                    <div className="font-medium">
                                                        Derivadas
                                                    </div>
                                                    <div className="text-sm text-muted-foreground">
                                                        Asignado a: 3 grupos
                                                    </div>
                                                </Link>
                                            </li>
                                            <li className="rounded-lg border p-3 hover:bg-accent transition-colors">
                                                <Link
                                                    to="/problems/2"
                                                    className="block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-ring rounded-md p-1"
                                                >
                                                    <div className="font-medium">
                                                        Integrales
                                                    </div>
                                                    <div className="text-sm text-muted-foreground">
                                                        Asignado a: 2 grupos
                                                    </div>
                                                </Link>
                                            </li>
                                        </ul>
                                        <Button asChild className="mt-4 w-full">
                                            <Link to="/create-problem">
                                                Crear nuevo problema
                                            </Link>
                                        </Button>
                                    </CardContent>
                                </Card>
                            </div>
                        )}

                        {userData?.rol === "admin" && (
                            <Tabs defaultValue="usuarios">
                                <TabsList className="grid w-full grid-cols-3 text-lg">
                                    <TabsTrigger value="usuarios">
                                        Usuarios
                                    </TabsTrigger>
                                    <TabsTrigger value="contenido">
                                        Contenido
                                    </TabsTrigger>
                                    <TabsTrigger value="actividad">
                                        Actividad
                                    </TabsTrigger>
                                </TabsList>
                                <TabsContent value="usuarios" className="mt-6">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>
                                                Resumen de Usuarios
                                            </CardTitle>
                                            <CardDescription>
                                                Estadísticas generales
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="grid gap-6 md:grid-cols-3">
                                                <div className="flex flex-col items-center justify-center rounded-lg border p-4">
                                                    <span className="text-3xl font-bold">
                                                        {totalStudents}
                                                    </span>
                                                    <span className="text-muted-foreground">
                                                        Estudiantes
                                                    </span>
                                                </div>
                                                <div className="flex flex-col items-center justify-center rounded-lg border p-4">
                                                    <span className="text-3xl font-bold">
                                                        {totalTeachers}
                                                    </span>
                                                    <span className="text-muted-foreground">
                                                        Maestros
                                                    </span>
                                                </div>
                                                <div className="flex flex-col items-center justify-center rounded-lg border p-4">
                                                    <span className="text-3xl font-bold">
                                                        {totalAdmins}
                                                    </span>
                                                    <span className="text-muted-foreground">
                                                        Administradores
                                                    </span>
                                                </div>
                                            </div>
                                            <Button
                                                asChild
                                                className="mt-6 w-full"
                                            >
                                                <Link to="/metrics">
                                                    Ver métricas detalladas
                                                </Link>
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                                <TabsContent value="contenido" className="mt-6">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>
                                                Contenido del Sistema
                                            </CardTitle>
                                            <CardDescription>
                                                Resumen de materiales
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="grid gap-6 md:grid-cols-3">
                                                <div className="flex flex-col items-center justify-center rounded-lg border p-4">
                                                    <span className="text-3xl font-bold">
                                                        {totalContent}
                                                    </span>
                                                    <span className="text-muted-foreground">
                                                        Contenidos
                                                    </span>
                                                </div>
                                                <div className="flex flex-col items-center justify-center rounded-lg border p-4">
                                                    <span className="text-3xl font-bold">
                                                        87
                                                    </span>
                                                    <span className="text-muted-foreground">
                                                        Problemas
                                                    </span>
                                                </div>
                                                <div className="flex flex-col items-center justify-center rounded-lg border p-4">
                                                    <span className="text-3xl font-bold">
                                                        {totalContent}
                                                    </span>
                                                    <span className="text-muted-foreground">
                                                        Cursos
                                                    </span>
                                                </div>
                                            </div>
                                            <Button
                                                asChild
                                                className="mt-6 w-full"
                                            >
                                                <Link to="/metrics">
                                                    Ver métricas detalladas
                                                </Link>
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                                <TabsContent value="actividad" className="mt-6">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>
                                                Actividad Reciente
                                            </CardTitle>
                                            <CardDescription>
                                                Últimas acciones en el sistema
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <ul className="space-y-4">
                                                <li className="flex items-center gap-4 rounded-lg border p-3">
                                                    <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                                                        <User className="h-5 w-5" />
                                                    </div>
                                                    <div>
                                                        <div className="font-medium">
                                                            Ana García se
                                                            registró
                                                        </div>
                                                        <div className="text-sm text-muted-foreground">
                                                            Hace 2 horas
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="flex items-center gap-4 rounded-lg border p-3">
                                                    <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                                                        <FilePlus className="h-5 w-5" />
                                                    </div>
                                                    <div>
                                                        <div className="font-medium">
                                                            Nuevo contenido:
                                                            Ecuaciones
                                                            Diferenciales
                                                        </div>
                                                        <div className="text-sm text-muted-foreground">
                                                            Hace 5 horas
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="flex items-center gap-4 rounded-lg border p-3">
                                                    <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                                                        <FileEdit className="h-5 w-5" />
                                                    </div>
                                                    <div>
                                                        <div className="font-medium">
                                                            Nuevo problema:
                                                            Series de Taylor
                                                        </div>
                                                        <div className="text-sm text-muted-foreground">
                                                            Hace 1 día
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                            <Button
                                                asChild
                                                className="mt-6 w-full"
                                            >
                                                <Link to="/metrics">
                                                    Ver todas las actividades
                                                </Link>
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                            </Tabs>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}
