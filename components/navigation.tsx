"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LogOut, LogIn, Edit3, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { LoginModal } from "@/components/login-modal"
import { useState, useEffect } from "react"
import Image from "next/image"

export function Navigation() {
  const pathname = usePathname()
  const router = useRouter()
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [editMode, setEditMode] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      const demoAuth = localStorage.getItem("demo_auth") === "true"

      if (demoAuth) {
        setIsAuthenticated(true)
        return
      }

      try {
        const supabase = createClient()
        const {
          data: { user },
        } = await supabase.auth.getUser()
        setIsAuthenticated(!!user)
      } catch (err) {
        // If Supabase fails, check demo mode
        setIsAuthenticated(demoAuth)
      }
    }
    checkAuth()
  }, [])

  const navItems = [
    { href: "/", label: "Inicio" },
    { href: "/metas", label: "Metas" },
    { href: "/indicadores", label: "Indicadores" },
    { href: "/avances", label: "Avances" },
    { href: "/reportes", label: "Reportes" },
    { href: "/formularios", label: "Formularios" },
  ]

  const handleLogout = async () => {
    localStorage.removeItem("demo_auth")

    try {
      const supabase = createClient()
      await supabase.auth.signOut()
    } catch (err) {
      // Ignore Supabase errors on logout
    }

    setIsAuthenticated(false)
    setEditMode(false)
    router.push("/")
    router.refresh()
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-600 shadow-lg backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between px-4 md:h-20">
          <div className="flex items-center gap-2 md:gap-3">
            <Image
              src="/images/logo-ug.png"
              alt="Universidad de Guayaquil"
              width={40}
              height={40}
              className="h-8 w-auto md:h-10 lg:h-12"
            />
            <div className="hidden h-8 w-px bg-white/30 sm:block md:h-10" />
            <Link href="/" className="flex items-center gap-2 transition-transform hover:scale-105 md:gap-3">
              <Image
                src="/images/ingenieria.png"
                alt="Facultad de Ingeniería Industrial"
                width={48}
                height={48}
                className="h-10 w-auto md:h-12 lg:h-14"
              />
              <span className="hidden text-xs font-bold text-white sm:inline-block md:text-sm lg:text-base">
                Gestión de Residuos Sólidos
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 hover:bg-white/20 hover:shadow-md ${
                  pathname === item.href ? "bg-white/30 text-white shadow-md" : "text-white/90"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-2 lg:flex">
            {isAuthenticated && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setEditMode(!editMode)}
                className={`gap-2 rounded-lg transition-all duration-200 ${
                  editMode
                    ? "bg-white/30 text-white shadow-md hover:bg-white/40"
                    : "text-white hover:bg-white/20 hover:shadow-md"
                }`}
              >
                <Edit3 className="h-4 w-4" />
                <span>Modo de Edición</span>
              </Button>
            )}

            {isAuthenticated ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="gap-2 rounded-lg text-white transition-all duration-200 hover:bg-white/20 hover:shadow-md"
              >
                <LogOut className="h-4 w-4" />
                <span>Cerrar Sesión</span>
              </Button>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowLoginModal(true)}
                className="gap-2 rounded-lg text-white transition-all duration-200 hover:bg-white/20 hover:shadow-md"
              >
                <LogIn className="h-4 w-4" />
                <span>Iniciar Sesión</span>
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg text-white transition-all duration-200 hover:bg-white/20 lg:hidden"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {mobileMenuOpen && (
          <div className="animate-in slide-in-from-top border-t border-white/20 bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-600 lg:hidden">
            <nav className="container flex flex-col gap-1 px-4 py-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 hover:bg-white/20 ${
                    pathname === item.href ? "bg-white/30 text-white shadow-md" : "text-white/90"
                  }`}
                >
                  {item.label}
                </Link>
              ))}

              <div className="mt-2 flex flex-col gap-2 border-t border-white/20 pt-4">
                {isAuthenticated && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setEditMode(!editMode)
                      setMobileMenuOpen(false)
                    }}
                    className={`w-full justify-start gap-2 rounded-lg transition-all duration-200 ${
                      editMode ? "bg-white/30 text-white shadow-md hover:bg-white/40" : "text-white hover:bg-white/20"
                    }`}
                  >
                    <Edit3 className="h-4 w-4" />
                    <span>Modo de Edición</span>
                  </Button>
                )}

                {isAuthenticated ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      handleLogout()
                      setMobileMenuOpen(false)
                    }}
                    className="w-full justify-start gap-2 rounded-lg text-white transition-all duration-200 hover:bg-white/20"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Cerrar Sesión</span>
                  </Button>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setShowLoginModal(true)
                      setMobileMenuOpen(false)
                    }}
                    className="w-full justify-start gap-2 rounded-lg text-white transition-all duration-200 hover:bg-white/20"
                  >
                    <LogIn className="h-4 w-4" />
                    <span>Iniciar Sesión</span>
                  </Button>
                )}
              </div>
            </nav>
          </div>
        )}
      </header>

      <LoginModal open={showLoginModal} onOpenChange={setShowLoginModal} />
    </>
  )
}
