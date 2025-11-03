import { Navigation } from "@/components/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Target, BarChart3, TrendingUp, FileText, ClipboardList, Leaf, Recycle, Droplets } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const features = [
    {
      title: "Metas",
      description: "Define objetivos ambientales",
      icon: Target,
      href: "/metas",
      gradient: "from-emerald-500 to-green-500",
    },
    {
      title: "Indicadores",
      description: "Monitorea métricas clave",
      icon: BarChart3,
      href: "/indicadores",
      gradient: "from-green-500 to-teal-500",
    },
    {
      title: "Avances",
      description: "Registra tu progreso",
      icon: TrendingUp,
      href: "/avances",
      gradient: "from-amber-500 to-orange-500",
    },
    {
      title: "Reportes",
      description: "Genera informes detallados",
      icon: FileText,
      href: "/reportes",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Formularios",
      description: "Recolecta datos importantes",
      icon: ClipboardList,
      href: "/formularios",
      gradient: "from-orange-500 to-red-500",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 dark:from-emerald-950/20 dark:via-green-950/20 dark:to-teal-950/20">
        <div className="container px-4 py-12 md:py-20 lg:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-4 py-2 shadow-sm backdrop-blur dark:border-emerald-800 dark:bg-emerald-950/50 md:mb-8 md:px-6 md:py-3">
              <Leaf className="h-4 w-4 text-emerald-600 dark:text-emerald-400 md:h-5 md:w-5" />
              <span className="text-xs font-medium text-emerald-900 dark:text-emerald-100 md:text-sm">
                Plataforma de Gestión Ambiental
              </span>
            </div>

            <h1 className="mb-4 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:mb-6 md:text-5xl lg:text-7xl">
              Gestión de Residuos Sólidos
            </h1>

            <div className="space-y-3 text-pretty text-base text-muted-foreground md:space-y-4 md:text-lg lg:text-xl">
              <p className="mx-auto max-w-2xl leading-relaxed">
                Transformamos la manera en que gestionamos nuestros recursos naturales. Cada acción cuenta, cada
                decisión importa.
              </p>
              <p className="mx-auto max-w-2xl font-medium text-emerald-700 dark:text-emerald-400">
                Juntos construimos un futuro más sostenible, donde la eficiencia y el cuidado ambiental van de la mano.
              </p>
            </div>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row md:mt-12 md:gap-4">
              <div className="flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 shadow-sm backdrop-blur dark:bg-emerald-950/50 md:gap-3 md:px-6 md:py-3">
                <Recycle className="h-4 w-4 text-emerald-600 dark:text-emerald-400 md:h-5 md:w-5" />
                <span className="text-xs font-medium text-foreground md:text-sm">Reducción de residuos</span>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 shadow-sm backdrop-blur dark:bg-emerald-950/50 md:gap-3 md:px-6 md:py-3">
                <Droplets className="h-4 w-4 text-blue-600 dark:text-blue-400 md:h-5 md:w-5" />
                <span className="text-xs font-medium text-foreground md:text-sm">Impacto positivo</span>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-24 left-1/4 h-64 w-64 rounded-full bg-emerald-400/20 blur-3xl md:h-96 md:w-96" />
        <div className="absolute -bottom-24 right-1/4 h-64 w-64 rounded-full bg-green-400/20 blur-3xl md:h-96 md:w-96" />
      </section>

      <section className="py-12 md:py-16 lg:py-20">
        <div className="container px-4">
          <div className="mb-12 text-center md:mb-16">
            <h2 className="mb-3 text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:mb-4 md:text-4xl lg:text-5xl">
              Módulos del Sistema
            </h2>
            <p className="text-pretty text-base text-muted-foreground md:text-lg">
              Herramientas integrales para una gestión eficiente y sostenible
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
            {features.map((feature, index) => (
              <Link key={index} href={feature.href} className="group">
                <Card className="relative h-full overflow-hidden border-0 bg-gradient-to-br from-white to-gray-50 shadow-md transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl dark:from-gray-900 dark:to-gray-800">
                  <CardContent className="p-6 md:p-8">
                    <div className="relative space-y-4 md:space-y-6">
                      {/* Icon with gradient background */}
                      <div
                        className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.gradient} shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 md:h-16 md:w-16`}
                      >
                        <feature.icon className="h-7 w-7 text-white md:h-8 md:w-8" />
                      </div>

                      {/* Content */}
                      <div className="space-y-2 md:space-y-3">
                        <h3 className="text-xl font-bold text-foreground md:text-2xl">{feature.title}</h3>
                        <p className="text-balance text-sm leading-relaxed text-muted-foreground">
                          {feature.description}
                        </p>
                      </div>

                      {/* Hover arrow indicator */}
                      <div className="flex items-center gap-2 text-sm font-semibold text-emerald-600 opacity-0 transition-all duration-300 group-hover:opacity-100 dark:text-emerald-400">
                        <span>Acceder</span>
                        <svg
                          className="h-4 w-4 transition-transform group-hover:translate-x-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                          />
                        </svg>
                      </div>

                      {/* Decorative gradient overlay */}
                      <div
                        className={`absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br ${feature.gradient} opacity-5 blur-2xl transition-opacity duration-500 group-hover:opacity-10`}
                      />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
