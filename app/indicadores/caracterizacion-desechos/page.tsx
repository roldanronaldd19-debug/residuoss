"use client"

import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, TrendingUp, Trash2, Scale, Package, Loader2 } from "lucide-react"

export default function CaracterizacionDesechosPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 dark:from-blue-950/20 dark:via-cyan-950/20 dark:to-teal-950/20">
        <div className="container px-4 py-12 md:py-16 lg:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/80 px-4 py-2 shadow-sm backdrop-blur dark:border-blue-800 dark:bg-blue-950/50 md:mb-6 md:px-6 md:py-3">
              <Trash2 className="h-4 w-4 text-blue-600 dark:text-blue-400 md:h-5 md:w-5" />
              <span className="text-xs font-medium text-blue-900 dark:text-blue-100 md:text-sm">
                Análisis de Residuos
              </span>
            </div>

            <h1 className="mb-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:mb-4 md:text-5xl lg:text-6xl">
              Caracterización de Desechos Sólidos
            </h1>

            <p className="text-pretty text-base text-muted-foreground md:text-lg lg:text-xl">
              Dashboard interactivo con análisis detallado sobre la composición, volumen y patrones de generación de
              desechos sólidos en la comunidad de Daule.
            </p>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-24 left-1/4 h-64 w-64 rounded-full bg-blue-400/20 blur-3xl md:h-96 md:w-96" />
        <div className="absolute -bottom-24 right-1/4 h-64 w-64 rounded-full bg-cyan-400/20 blur-3xl md:h-96 md:w-96" />
      </section>

      <section className="py-12 md:py-16">
        <div className="container px-4">
          <div className="mb-10 text-center md:mb-12">
            <h2 className="mb-3 text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:mb-4">
              Indicadores de Desechos Sólidos
            </h2>
            <p className="text-pretty text-base text-muted-foreground md:text-lg">
              Métricas en tiempo real sobre la caracterización de residuos en la comunidad
            </p>
          </div>

          {/* Placeholder cards */}
          <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 mb-8">
            {[
              {
                title: "Total de Residuos Recolectados",
                value: "Cargando...",
                icon: Scale,
                gradient: "from-blue-500 to-cyan-600",
              },
              {
                title: "Composición Orgánica",
                value: "Cargando...",
                icon: Package,
                gradient: "from-cyan-500 to-teal-600",
              },
              {
                title: "Residuos Reciclables",
                value: "Cargando...",
                icon: TrendingUp,
                gradient: "from-teal-500 to-green-600",
              },
            ].map((indicator, index) => (
              <Card key={index} className="group overflow-hidden border-none shadow-lg">
                <CardHeader className="space-y-3 pb-3 md:space-y-4 md:pb-4">
                  <div className="flex items-start justify-between">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${indicator.gradient} shadow-lg md:h-12 md:w-12`}
                    >
                      <indicator.icon className="h-5 w-5 text-white md:h-6 md:w-6" />
                    </div>
                  </div>

                  <div>
                    <CardTitle className="mb-1 text-2xl font-bold md:text-3xl">
                      <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                    </CardTitle>
                    <CardDescription className="text-sm font-medium md:text-base">{indicator.title}</CardDescription>
                  </div>
                </CardHeader>

                <CardContent className="pb-5 md:pb-6">
                  <p className="text-pretty text-xs leading-relaxed text-muted-foreground md:text-sm">
                    Los datos se están procesando...
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Coming soon message */}
          <div className="mx-auto max-w-3xl rounded-2xl border bg-gradient-to-br from-blue-50 to-cyan-50 p-6 dark:from-blue-950/20 dark:to-cyan-950/20 md:p-8">
            <div className="flex items-start gap-3 md:gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 dark:bg-blue-500 md:h-12 md:w-12">
                <BarChart3 className="h-5 w-5 text-white md:h-6 md:w-6" />
              </div>
              <div>
                <h3 className="mb-2 text-lg font-bold text-foreground md:text-xl">Dashboard en Desarrollo</h3>
                <p className="text-pretty text-sm leading-relaxed text-muted-foreground md:text-base">
                  El panel de análisis completo para la caracterización de desechos sólidos está en proceso de
                  implementación. Pronto podrás visualizar gráficos detallados, métricas de composición, tendencias
                  temporales y análisis comparativos de los residuos sólidos generados en la comunidad de Daule.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
