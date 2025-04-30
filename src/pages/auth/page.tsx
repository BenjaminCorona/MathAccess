import { useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { BookOpen, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

/** 
npx shadcn@latest add input
npx shadcn@latest add label
npx shadcn@latest add radio-group
*/

export default function AuthPage() {
  const [searchParams] = useSearchParams()
  const isRegister = searchParams.get("register") === "true"
  const [showPassword, setShowPassword] = useState(false)

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
          <CardTitle className="text-2xl">{isRegister ? "Registrarse" : "Iniciar sesión"}</CardTitle>
          <CardDescription className="text-lg">
            {isRegister
              ? "Crea una cuenta para acceder a la plataforma"
              : "Ingresa tus credenciales para acceder a la plataforma"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
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
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {isRegister && (
            <div className="space-y-3">
              <Label className="text-lg">Selecciona tu rol</Label>
              <RadioGroup defaultValue="estudiante">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="estudiante" id="estudiante" className="h-5 w-5" />
                  <Label htmlFor="estudiante" className="text-lg">
                    Estudiante
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="maestro" id="maestro" className="h-5 w-5" />
                  <Label htmlFor="maestro" className="text-lg">
                    Maestro
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="administrador" id="administrador" className="h-5 w-5" />
                  <Label htmlFor="administrador" className="text-lg">
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
        <CardFooter className="flex flex-col gap-4">
          <Button className="w-full h-12 text-lg">{isRegister ? "Registrarme" : "Iniciar sesión"}</Button>

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
      </Card>
    </div>
  )
}
