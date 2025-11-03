import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ClipboardList, ExternalLink, FileText, Users, Leaf, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function FormulariosPage() {
  const forms = [
    {
      title: "Caracterización de los Desechos Sólidos",
      subtitle: "Comunidad de Daule",
      description:
        "Ayúdanos a identificar y clasificar los tipos de residuos generados en la comunidad. Tu participación es fundamental para desarrollar estrategias efectivas de gestión de residuos.",
      icon: FileText,
      link: "https://tally.so/r/3jd0da",
      gradient: "from-emerald-500 to-green-600",
      features: ["Clasificación de residuos", "Análisis de volúmenes", "Identificación de patrones"],
    },
    {
      title: "Encuesta de Autosustentabilidad",
      subtitle: "Comportamiento Proambiental",
      description:
        "Evalúa tus prácticas ambientales y descubre cómo puedes contribuir a un futuro más sostenible. Esta encuesta nos ayuda a entender el compromiso de la comunidad con el medio ambiente.",
      icon: Leaf,
      link: "https://tally.so/r/nrNo9M",
      gradient: "from-teal-500 to-cyan-600",
      features: ["Hábitos sostenibles", "Conciencia ambiental", "Compromiso comunitario"],
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 dark:from-emerald-950/20 dark:via-green-950/20 dark:to-teal-950/20">
        <div className="container px-4 py-12 md:py-16 lg:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-4 py-2 shadow-sm backdrop-blur dark:border-emerald-800 dark:bg-emerald-950/50 md:mb-6 md:px-6 md:py-3">
              <ClipboardList className="h-4 w-4 text-emerald-600 dark:text-emerald-400 md:h-5 md:w-5" />
              <span className="text-xs font-medium text-emerald-900 dark:text-emerald-100 md:text-sm">
                Recolección de Datos
              </span>
            </div>

            <h1 className="mb-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:mb-4 md:text-5xl lg:text-6xl">
              Formularios de Gestión Ambiental
            </h1>

            <p className="text-pretty text-base text-muted-foreground md:text-lg lg:text-xl">
              Tu participación es esencial para construir una comunidad más sostenible. Completa nuestros formularios y
              contribuye al cambio positivo.
            </p>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-24 left-1/4 h-64 w-64 rounded-full bg-emerald-400/20 blur-3xl md:h-96 md:w-96" />
        <div className="absolute -bottom-24 right-1/4 h-64 w-64 rounded-full bg-teal-400/20 blur-3xl md:h-96 md:w-96" />
      </section>

      <section className="py-12 md:py-16">
        <div className="container px-4">
          <div className="mx-auto max-w-5xl space-y-6 md:space-y-8">
            {forms.map((form, index) => (
              <Card key={index} className="group overflow-hidden border-none shadow-lg transition-all hover:shadow-2xl">
                <div className="grid gap-0 md:grid-cols-[1fr_auto]">
                  <CardHeader className="space-y-3 p-6 md:space-y-4 md:p-8">
                    <div className="flex items-start gap-3 md:gap-4">
                      <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${form.gradient} shadow-lg md:h-14 md:w-14`}
                      >
                        <form.icon className="h-6 w-6 text-white md:h-7 md:w-7" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="mb-1 text-xl md:text-2xl">{form.title}</CardTitle>
                        <CardDescription className="text-sm font-medium md:text-base">{form.subtitle}</CardDescription>
                      </div>
                    </div>

                    <p className="text-pretty text-sm leading-relaxed text-muted-foreground md:text-base">
                      {form.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {form.features.map((feature, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 rounded-full bg-muted px-3 py-1.5 text-xs font-medium md:px-4 md:py-2 md:text-sm"
                        >
                          <TrendingUp className="h-3 w-3 text-emerald-600 dark:text-emerald-400 md:h-4 md:w-4" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </CardHeader>

                  <CardContent className="flex items-center justify-center bg-gradient-to-br from-muted/50 to-muted p-6 md:min-w-[200px] md:p-8">
                    <Link href={form.link} target="_blank" rel="noopener noreferrer" className="w-full">
                      <Button
                        size="lg"
                        className={`group/btn h-auto w-full flex-col gap-2 bg-gradient-to-br ${form.gradient} py-4 text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl md:py-6`}
                      >
                        <span className="text-base font-bold md:text-lg">Completar Formulario</span>
                        <ExternalLink className="h-4 w-4 transition-transform group-hover/btn:translate-x-1 md:h-5 md:w-5" />
                      </Button>
                    </Link>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>

          <div className="mx-auto mt-12 max-w-3xl rounded-2xl border bg-gradient-to-br from-emerald-50 to-green-50 p-6 dark:from-emerald-950/20 dark:to-green-950/20 md:mt-16 md:p-8">
            <div className="flex items-start gap-3 md:gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-600 dark:bg-emerald-500 md:h-12 md:w-12">
                <Users className="h-5 w-5 text-white md:h-6 md:w-6" />
              </div>
              <div>
                <h3 className="mb-2 text-lg font-bold text-foreground md:text-xl">
                  ¿Por qué es importante tu participación?
                </h3>
                <p className="text-pretty text-sm leading-relaxed text-muted-foreground md:text-base">
                  Los datos que recopilamos a través de estos formularios nos permiten tomar decisiones informadas,
                  desarrollar políticas efectivas y crear programas que realmente respondan a las necesidades de nuestra
                  comunidad. Cada respuesta cuenta y nos acerca más a nuestros objetivos de sostenibilidad.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
