"use client"

import { Button } from "@/components/ui/button"

import { Navigation } from "@/components/navigation"
import { Card } from "@/components/ui/card"
import { BarChart3, TrendingUp, Recycle, Leaf, Droplets, Wind, FileText } from "lucide-react"
import Link from "next/link"

export default function IndicadoresPage() {
  const indicators = [
    {
      title: "Tasa de Reciclaje",
      value: "68%",
      change: "+12%",
      trend: "up",
      icon: Recycle,
      description: "Porcentaje de residuos reciclados del total generado",
      gradient: "from-emerald-500 to-green-600",
    },
    {
      title: "Reducción de Residuos",
      value: "2.4 ton",
      change: "+8%",
      trend: "up",
      icon: TrendingUp,
      description: "Toneladas de residuos reducidos este mes",
      gradient: "from-green-500 to-teal-600",
    },
    {
      title: "Compostaje Orgánico",
      value: "45%",
      change: "+15%",
      trend: "up",
      icon: Leaf,
      description: "Residuos orgánicos convertidos en compost",
      gradient: "from-teal-500 to-cyan-600",
    },
    {
      title: "Ahorro de Agua",
      value: "1,250 L",
      change: "+5%",
      trend: "up",
      icon: Droplets,
      description: "Litros de agua ahorrados mediante prácticas sostenibles",
      gradient: "from-blue-500 to-indigo-600",
    },
    {
      title: "Reducción de Emisiones",
      value: "320 kg",
      change: "+18%",
      trend: "up",
      icon: Wind,
      description: "CO₂ evitado mediante gestión eficiente de residuos",
      gradient: "from-indigo-500 to-purple-600",
    },
    {
      title: "Participación Comunitaria",
      value: "82%",
      change: "+22%",
      trend: "up",
      icon: BarChart3,
      description: "Hogares activamente participando en programas ambientales",
      gradient: "from-purple-500 to-pink-600",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      <Navigation />

      <section className="container px-4 py-8 md:py-12">
        <div className="mx-auto max-w-4xl text-center mb-10 md:mb-12">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-4 py-2 shadow-sm backdrop-blur md:mb-6 md:px-6 md:py-3">
            <BarChart3 className="h-4 w-4 text-emerald-600 md:h-5 md:w-5" />
            <span className="text-xs font-medium text-emerald-900 md:text-sm">Panel de Indicadores</span>
          </div>

          <h1 className="mb-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:mb-4 md:text-5xl">
            Indicadores de Gestión Ambiental
          </h1>

          <p className="text-pretty text-base text-muted-foreground md:text-lg">
            Análisis detallado de las encuestas realizadas en la comunidad de Daule para evaluar el comportamiento
            proambiental y la caracterización de residuos sólidos.
          </p>
        </div>

        {/* Two main sections */}
        <div className="grid gap-6 md:gap-8 lg:grid-cols-2">
          {/* Sección 1: Comportamiento Proambiental */}
          <Card className="group overflow-hidden border-none shadow-lg transition-all hover:shadow-2xl hover:-translate-y-1">
            <div className="relative h-48 overflow-hidden bg-gradient-to-br from-emerald-500 via-green-600 to-teal-600 p-6 md:h-56 md:p-8">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20" />

              <div className="relative">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm shadow-lg md:h-16 md:w-16">
                  <Leaf className="h-7 w-7 text-white md:h-8 md:w-8" />
                </div>

                <h2 className="mt-4 text-2xl font-bold text-white md:mt-6 md:text-3xl">Comportamiento Proambiental</h2>
                <p className="mt-2 text-sm text-white/90 md:text-base">Análisis de autosustentabilidad</p>
              </div>
            </div>

            <div className="p-6 md:p-8">
              <p className="mb-6 text-pretty text-sm leading-relaxed text-muted-foreground md:text-base">
                Visualización interactiva de los resultados de la encuesta sobre comportamiento proambiental y
                autosustentabilidad en el Cantón Daule. Incluye análisis demográfico, determinantes socioculturales,
                afectivos y cognitivos.
              </p>

              <Link href="/indicadores/comportamiento-proambiental">
                <Button className="w-full bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-lg hover:from-emerald-700 hover:to-green-700 hover:shadow-xl transition-all">
                  <BarChart3 className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                  Ver Análisis Completo
                </Button>
              </Link>
            </div>
          </Card>

          {/* Sección 2: Caracterización de Desechos Sólidos */}
          <Card className="group overflow-hidden border-none shadow-lg transition-all hover:shadow-2xl hover:-translate-y-1">
            <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-500 via-cyan-600 to-teal-600 p-6 md:h-56 md:p-8">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20" />

              <div className="relative">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm shadow-lg md:h-16 md:w-16">
                  <FileText className="h-7 w-7 text-white md:h-8 md:w-8" />
                </div>

                <h2 className="mt-4 text-2xl font-bold text-white md:mt-6 md:text-3xl">
                  Caracterización de Desechos Sólidos
                </h2>
                <p className="mt-2 text-sm text-white/90 md:text-base">Comunidad de Daule</p>
              </div>
            </div>

            <div className="p-6 md:p-8">
              <p className="mb-6 text-pretty text-sm leading-relaxed text-muted-foreground md:text-base">
                Dashboard interactivo con métricas y análisis detallado sobre la caracterización de desechos sólidos en
                la comunidad de Daule. Datos de composición, volumen y patrones de generación de residuos.
              </p>

              <Link href="/indicadores/caracterizacion-desechos">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg hover:from-blue-700 hover:to-cyan-700 hover:shadow-xl transition-all">
                  <BarChart3 className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                  Ver Análisis Completo
                </Button>
              </Link>
            </div>
          </Card>
        </div>

        {/* Info section */}
        <div className="mx-auto mt-10 max-w-3xl rounded-2xl border bg-white/80 backdrop-blur-sm p-6 shadow-lg md:mt-12 md:p-8">
          <div className="flex items-start gap-3 md:gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-600 md:h-12 md:w-12">
              <BarChart3 className="h-5 w-5 text-white md:h-6 md:w-6" />
            </div>
            <div>
              <h3 className="mb-2 text-lg font-bold text-foreground md:text-xl">Datos en Tiempo Real</h3>
              <p className="text-pretty text-sm leading-relaxed text-muted-foreground md:text-base">
                Ambos paneles se alimentan directamente de las encuestas recopiladas en la comunidad de Daule. Los datos
                se actualizan automáticamente para proporcionar información precisa y actualizada sobre el
                comportamiento ambiental y la gestión de residuos sólidos.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
