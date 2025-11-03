import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, TrendingUp, Recycle, Leaf, Droplets, Wind } from "lucide-react"

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
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 dark:from-emerald-950/20 dark:via-green-950/20 dark:to-teal-950/20">
        <div className="container px-4 py-12 md:py-16 lg:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-4 py-2 shadow-sm backdrop-blur dark:border-emerald-800 dark:bg-emerald-950/50 md:mb-6 md:px-6 md:py-3">
              <BarChart3 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 md:h-5 md:w-5" />
              <span className="text-xs font-medium text-emerald-900 dark:text-emerald-100 md:text-sm">
                Métricas de Desempeño
              </span>
            </div>

            <h1 className="mb-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:mb-4 md:text-5xl lg:text-6xl">
              Indicadores Ambientales
            </h1>

            <p className="text-pretty text-base text-muted-foreground md:text-lg lg:text-xl">
              Monitorea el impacto positivo de nuestras acciones ambientales. Cada métrica refleja nuestro compromiso
              con un futuro sostenible.
            </p>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-24 left-1/4 h-64 w-64 rounded-full bg-emerald-400/20 blur-3xl md:h-96 md:w-96" />
        <div className="absolute -bottom-24 right-1/4 h-64 w-64 rounded-full bg-teal-400/20 blur-3xl md:h-96 md:w-96" />
      </section>

      <section className="py-12 md:py-16">
        <div className="container px-4">
          <div className="mb-10 text-center md:mb-12">
            <h2 className="mb-3 text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:mb-4">
              Métricas Clave de Gestión
            </h2>
            <p className="text-pretty text-base text-muted-foreground md:text-lg">
              Resultados medibles que demuestran nuestro progreso hacia la sostenibilidad
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
            {indicators.map((indicator, index) => (
              <Card key={index} className="group overflow-hidden border-none shadow-lg transition-all hover:shadow-xl">
                <CardHeader className="space-y-3 pb-3 md:space-y-4 md:pb-4">
                  <div className="flex items-start justify-between">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${indicator.gradient} shadow-lg md:h-12 md:w-12`}
                    >
                      <indicator.icon className="h-5 w-5 text-white md:h-6 md:w-6" />
                    </div>
                    <div
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold md:px-3 md:text-sm ${
                        indicator.trend === "up"
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400"
                          : "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400"
                      }`}
                    >
                      {indicator.change}
                    </div>
                  </div>

                  <div>
                    <CardTitle className="mb-1 text-2xl font-bold md:text-3xl">{indicator.value}</CardTitle>
                    <CardDescription className="text-sm font-medium md:text-base">{indicator.title}</CardDescription>
                  </div>
                </CardHeader>

                <CardContent className="pb-5 md:pb-6">
                  <p className="text-pretty text-xs leading-relaxed text-muted-foreground md:text-sm">
                    {indicator.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mx-auto mt-12 max-w-3xl rounded-2xl border bg-gradient-to-br from-emerald-50 to-green-50 p-6 dark:from-emerald-950/20 dark:to-green-950/20 md:mt-16 md:p-8">
            <div className="flex items-start gap-3 md:gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-600 dark:bg-emerald-500 md:h-12 md:w-12">
                <TrendingUp className="h-5 w-5 text-white md:h-6 md:w-6" />
              </div>
              <div>
                <h3 className="mb-2 text-lg font-bold text-foreground md:text-xl">Progreso Continuo</h3>
                <p className="text-pretty text-sm leading-relaxed text-muted-foreground md:text-base">
                  Estos indicadores se actualizan regularmente para reflejar el impacto real de nuestras iniciativas
                  ambientales. El crecimiento positivo en cada métrica demuestra que juntos estamos construyendo una
                  comunidad más sostenible y consciente del medio ambiente.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
