import { useState, FormEvent, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { BookOpen, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
// Importamos SweetAlert2
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const isRegister = searchParams.get("register") === "true";
    const [showPassword, setShowPassword] = useState(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rol, setRol] = useState("usuario");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Función para guardar los datos de autenticación en localStorage
    const saveAuthData = (data: any) => {
        if (data && data.data) {
            // Guardar el token
            if (data.data.token) {
                localStorage.setItem("auth_token", data.data.token);
            }

            // Guardar los datos del usuario
            if (data.data.user) {
                localStorage.setItem(
                    "user_data",
                    JSON.stringify(data.data.user)
                );
            }

            // Guardar toda la respuesta
            localStorage.setItem("auth_response", JSON.stringify(data));
        }
    };

    const handleRegister = async (e: FormEvent) => {
        e.preventDefault();

        if (isRegister) {
            setIsSubmitting(true);

            // Actualizar el mapeo de roles para que coincidan exactamente con la API
            const rolMapping: Record<string, string> = {
                estudiante: "usuario",
                maestro: "maestro",
                admin: "admin",
            };

            const userData = {
                name,
                email,
                password,
                rol: rolMapping[rol] || "usuario",
            };

            console.log("Enviando datos:", userData);

            try {
                const response = await fetch(
                    "http://localhost/math_api/auth/register",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(userData),
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    console.error("Error en la respuesta de la API:", {
                        status: response.status,
                        statusText: response.statusText,
                        data,
                    });

                    if (response.status === 422) {
                        console.error(
                            "Error de validación. Verifique los datos enviados:",
                            data.errors || data
                        );
                    }

                    // Mostrar alerta de error
                    Swal.fire({
                        title: "¡Error!",
                        text:
                            data.message ||
                            "Ocurrió un error al registrar el usuario",
                        icon: "error",
                        confirmButtonText: "Aceptar",
                        confirmButtonColor: "#3085d6",
                    });

                    throw new Error(
                        `Error ${response.status}: ${
                            data.message || response.statusText
                        }`
                    );
                }

                console.log("Registro exitoso:", data);

                // Guardar datos de autenticación
                saveAuthData(data);

                // Mostrar alerta de éxito
                Swal.fire({
                    title: "¡Registro exitoso!",
                    text: data.message || "Usuario registrado correctamente",
                    icon: "success",
                    confirmButtonText: "Continuar",
                    confirmButtonColor: "#28a745",
                }).then(() => {
                    // Opcional: redirigir al usuario a la página de inicio de sesión o dashboard
                    if (data.status === "success") {
                        // Si hay token, vamos directo al dashboard
                        if (data.data && data.data.token) {
                            window.location.href = "/dashboard";
                        } else {
                            // Si no hay token, vamos al login
                            window.location.href = "/auth";
                        }
                    }
                });

                // Limpiamos el formulario después de un registro exitoso
                if (data.status === "success") {
                    setName("");
                    setEmail("");
                    setPassword("");
                    setRol("estudiante");
                }
            } catch (error) {
                console.error("Error al registrar:", error);
                // Mostrar alerta de error genérico si ocurre un error en la solicitud
                Swal.fire({
                    title: "Error de conexión",
                    text: "No se pudo conectar con el servidor. Inténtelo más tarde.",
                    icon: "error",
                    confirmButtonText: "Aceptar",
                    confirmButtonColor: "#3085d6",
                });
            } finally {
                setIsSubmitting(false);
            }
        } else {
            // Manejo del inicio de sesión
            setIsSubmitting(true);

            const loginData = {
                email,
                password,
            };

            console.log("Enviando datos de inicio de sesión:", loginData);

            try {
                const response = await fetch(
                    "http://localhost/math_api/auth/login",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(loginData),
                    }
                );

                const data = await response.json();
                console.log("Respuesta del login:", data);

                if (!response.ok) {
                    console.error("Error en la respuesta de la API:", {
                        status: response.status,
                        statusText: response.statusText,
                        data,
                    });

                    // Mostrar alerta de error
                    Swal.fire({
                        title: "¡Error de inicio de sesión!",
                        text: data.message || "Credenciales incorrectas",
                        icon: "error",
                        confirmButtonText: "Intentar de nuevo",
                        confirmButtonColor: "#3085d6",
                    });

                    throw new Error(
                        `Error ${response.status}: ${
                            data.message || response.statusText
                        }`
                    );
                }

                // Guardar datos de autenticación
                saveAuthData(data);

                // Mostrar alerta de éxito
                Swal.fire({
                    title: "¡Inicio de sesión exitoso!",
                    text: data.message || "Bienvenido/a de nuevo",
                    icon: "success",
                    confirmButtonText: "Continuar",
                    confirmButtonColor: "#28a745",
                }).then(() => {
                    // Redirigir al dashboard o página principal
                    if (data.status === "success") {
                        window.location.href = "/dashboard";
                    }
                });

                // Limpiar el formulario después de un inicio de sesión exitoso
                if (data.status === "success") {
                    setEmail("");
                    setPassword("");
                }
            } catch (error) {
                console.error("Error al iniciar sesión:", error);
                // Mostrar alerta de error genérico si ocurre un error en la solicitud
                Swal.fire({
                    title: "Error de conexión",
                    text: "No se pudo conectar con el servidor. Inténtelo más tarde.",
                    icon: "error",
                    confirmButtonText: "Aceptar",
                    confirmButtonColor: "#3085d6",
                });
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    useEffect(() => {
        // Verificar si el usuario ya está autenticado
        const token = localStorage.getItem("auth_token");
        if (token) {
            // Si hay un token, redirigir al dashboard
            navigate("/dashboard");
        }
    }, []);

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-muted p-4">
            <Link
                to="/"
                className="absolute left-4 top-4 flex items-center gap-2 text-lg font-bold md:left-8 md:top-8 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-ring rounded-md p-2"
            >
                <BookOpen className="h-6 w-6" />
                <span>MathAccess</span>
            </Link>

            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl">
                        {isRegister ? "Registrarse" : "Iniciar sesión"}
                    </CardTitle>
                    <CardDescription className="text-lg">
                        {isRegister
                            ? "Crea una cuenta para acceder a la plataforma"
                            : "Ingresa tus credenciales para acceder a la plataforma"}
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleRegister}>
                    <CardContent className="space-y-6">
                        {isRegister && (
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-lg">
                                    Nombre completo
                                </Label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="TuUserName"
                                    className="h-12 text-lg"
                                    required
                                    aria-required="true"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                        )}
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-lg">
                                Correo electrónico
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="tu@email.com"
                                className="h-12 text-lg"
                                required
                                aria-required="true"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-lg">
                                Contraseña
                            </Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className="h-12 text-lg pr-10"
                                    required
                                    aria-required="true"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-0 top-0 h-full px-3"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    aria-label={
                                        showPassword
                                            ? "Ocultar contraseña"
                                            : "Mostrar contraseña"
                                    }
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5" />
                                    ) : (
                                        <Eye className="h-5 w-5" />
                                    )}
                                </Button>
                            </div>
                        </div>

                        {isRegister && (
                            <div className="space-y-3">
                                <Label className="text-lg">
                                    Selecciona tu rol
                                </Label>
                                <RadioGroup value={rol} onValueChange={setRol}>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem
                                            value="estudiante"
                                            id="estudiante"
                                            className="h-5 w-5"
                                        />
                                        <Label
                                            htmlFor="estudiante"
                                            className="text-lg"
                                        >
                                            Alumno
                                        </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem
                                            value="maestro"
                                            id="maestro"
                                            className="h-5 w-5"
                                        />
                                        <Label
                                            htmlFor="maestro"
                                            className="text-lg"
                                        >
                                            Maestro
                                        </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem
                                            value="admin"
                                            id="administrador"
                                            className="h-5 w-5"
                                        />
                                        <Label
                                            htmlFor="administrador"
                                            className="text-lg"
                                        >
                                            Administrador
                                        </Label>
                                    </div>
                                </RadioGroup>
                            </div>
                        )}

                        {!isRegister && (
                            <div className="text-right">
                                <Link
                                    to="/auth/recuperar"
                                    className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-ring rounded-md p-1 text-lg"
                                >
                                    ¿Olvidaste tu contraseña?
                                </Link>
                            </div>
                        )}
                    </CardContent>
                    <CardFooter className="flex flex-col gap-4 mt-4">
                        <Button
                            type="submit"
                            className="w-full h-12 text-lg"
                            disabled={isSubmitting}
                        >
                            {isSubmitting
                                ? "Procesando..."
                                : isRegister
                                ? "Registrarme"
                                : "Iniciar sesión"}
                        </Button>

                        <div className="text-center text-lg">
                            {isRegister ? (
                                <span>
                                    ¿Ya tienes una cuenta?{" "}
                                    <Link
                                        to="/auth"
                                        className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-ring rounded-md p-1"
                                    >
                                        Inicia sesión
                                    </Link>
                                </span>
                            ) : (
                                <span>
                                    ¿No tienes una cuenta?{" "}
                                    <Link
                                        to="/auth?register=true"
                                        className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-ring rounded-md p-1"
                                    >
                                        Regístrate
                                    </Link>
                                </span>
                            )}
                        </div>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
