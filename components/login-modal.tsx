"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Loader2, Lock, Mail } from "lucide-react"

interface LoginModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function LoginModal({ open, onOpenChange }: LoginModalProps) {
  const [email, setEmail] = useState("a@ug.com")
  const [password, setPassword] = useState("1234")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    // Check if credentials match the demo account
    if (email === "a@ug.com" && password === "1234") {
      // Store a simple auth flag in localStorage for demo purposes
      localStorage.setItem("demo_auth", "true")
      setLoading(false)
      onOpenChange(false)
      // Force a page reload to update auth state
      window.location.reload()
      return
    }

    try {
      const supabase = createClient()
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (authError) {
        // If Supabase fails but credentials are correct, use demo mode
        if (email === "a@ug.com" && password === "1234") {
          localStorage.setItem("demo_auth", "true")
          onOpenChange(false)
          window.location.reload()
        } else {
          setError("Credenciales incorrectas. Usa: a@ug.com / 1234")
        }
      } else {
        onOpenChange(false)
        router.refresh()
      }
    } catch (err) {
      // Fallback to demo mode if there's a network error
      if (email === "a@ug.com" && password === "1234") {
        localStorage.setItem("demo_auth", "true")
        onOpenChange(false)
        window.location.reload()
      } else {
        setError("Error de conexión. Usa las credenciales de prueba.")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">Iniciar Sesión</DialogTitle>
          <DialogDescription>Ingresa tus credenciales para acceder al sistema de gestión de residuos</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Correo Electrónico</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="correo@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="rounded-lg bg-emerald-50 p-3 text-sm dark:bg-emerald-950">
            <p className="font-medium text-emerald-900 dark:text-emerald-100">Credenciales de prueba:</p>
            <p className="text-emerald-700 dark:text-emerald-300">Email: a@ug.com</p>
            <p className="text-emerald-700 dark:text-emerald-300">Contraseña: 1234</p>
          </div>

          <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Iniciando sesión...
              </>
            ) : (
              "Iniciar Sesión"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
