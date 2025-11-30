"use client"

import { Navigation } from "@/components/navigation"
import Script from "next/script"
import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"

export default function ComportamientoProambientalPage() {
  const [scriptsLoaded, setScriptsLoaded] = useState(false)

  useEffect(() => {
    const checkScriptsLoaded = setInterval(() => {
      if (typeof window !== "undefined" && window.supabase) {
        setScriptsLoaded(true)
        clearInterval(checkScriptsLoaded)
        initializeApp()
      }
    }, 100)

    return () => clearInterval(checkScriptsLoaded)
  }, [])

  const initializeApp = async () => {
    console.log("[v0] Initializing Comportamiento Proambiental dashboard...")

    const supabase = createClient()

    const selectEstadoCivil = document.getElementById("selectEstadoCivil")
    const selectEducacion = document.getElementById("selectEducacion")
    const selectSituacionLaboral = document.getElementById("selectSituacionLaboral")
    const selectIngreso = document.getElementById("selectIngreso")

    const estadoCivilInfo = document.getElementById("estadoCivilInfo")
    const educacionInfo = document.getElementById("educacionInfo")
    const situacionLaboralInfo = document.getElementById("situacionLaboralInfo")
    const ingresoInfo = document.getElementById("ingresoInfo")

    let allData = []
    let currentData = []
    let currentChartType = "pie"
    const filterOptions = {
      estadosCiviles: [],
      nivelesEducacion: [],
      situacionesLaborales: [],
      nivelesIngreso: [],
    }

    async function inicializar() {
      console.log("[v0] Loading data from Supabase...")
      await cargarTodosLosDatos()
      await inicializarFiltros()
      await actualizar()
      setupEventListeners()
    }

    async function cargarTodosLosDatos() {
      const { data, error } = await supabase
        .from("cuestionario_comportamiento_proambiental_autosustentabilidad")
        .select("*")

      if (error) {
        console.error("[v0] Error loading data:", error)
        return
      }

      allData = data || []
      console.log(`[v0] Loaded ${allData.length} records`)
    }

    async function inicializarFiltros() {
      const { data: rows, error } = await supabase
        .from("cuestionario_comportamiento_proambiental_autosustentabilidad")
        .select("estado_civil, educacion_jefe_hogar, situacion_laboral_jefe_hogar, ingreso_mensual_jefe_hogar")

      if (error) {
        console.error("[v0] Error loading filters:", error)
        return
      }

      filterOptions.estadosCiviles = [...new Set(rows.map((r) => r.estado_civil).filter(Boolean))].sort()
      filterOptions.nivelesEducacion = [...new Set(rows.map((r) => r.educacion_jefe_hogar).filter(Boolean))].sort()
      filterOptions.situacionesLaborales = [
        ...new Set(rows.map((r) => r.situacion_laboral_jefe_hogar).filter(Boolean)),
      ].sort()
      filterOptions.nivelesIngreso = [...new Set(rows.map((r) => r.ingreso_mensual_jefe_hogar).filter(Boolean))].sort()

      estadoCivilInfo.textContent = `${filterOptions.estadosCiviles.length} estados civiles disponibles`
      educacionInfo.textContent = `${filterOptions.nivelesEducacion.length} niveles educativos disponibles`
      situacionLaboralInfo.textContent = `${filterOptions.situacionesLaborales.length} situaciones laborales disponibles`
      ingresoInfo.textContent = `${filterOptions.nivelesIngreso.length} niveles de ingreso disponibles`

      llenarSelector(selectEstadoCivil, filterOptions.estadosCiviles)
      llenarSelector(selectEducacion, filterOptions.nivelesEducacion)
      llenarSelector(selectSituacionLaboral, filterOptions.situacionesLaborales)
      llenarSelector(selectIngreso, filterOptions.nivelesIngreso)
    }

    function llenarSelector(selector, opciones) {
      const valorActual = selector.value

      while (selector.options.length > 1) {
        selector.remove(1)
      }

      opciones.forEach((opcion) => {
        const option = document.createElement("option")
        option.value = opcion
        option.textContent = opcion
        selector.appendChild(option)
      })

      if (valorActual && opciones.includes(valorActual)) {
        selector.value = valorActual
      }
    }

    async function actualizar() {
      console.log("[v0] Updating dashboard...")
      currentData = await obtenerFiltrados()

      const distribuciones = calcularDistribuciones(currentData)
      const distribucionesLikert = calcularDistribucionesLikert(currentData)

      actualizarResumen(currentData, distribuciones)
      renderDemographicsCharts(distribuciones)
      llenarTablasResumen(distribuciones, distribucionesLikert)
    }

    async function obtenerFiltrados() {
      let query = supabase.from("cuestionario_comportamiento_proambiental_autosustentabilidad").select("*")

      if (selectEstadoCivil.value) query = query.eq("estado_civil", selectEstadoCivil.value)
      if (selectEducacion.value) query = query.eq("educacion_jefe_hogar", selectEducacion.value)
      if (selectSituacionLaboral.value) query = query.eq("situacion_laboral_jefe_hogar", selectSituacionLaboral.value)
      if (selectIngreso.value) query = query.eq("ingreso_mensual_jefe_hogar", selectIngreso.value)

      const { data, error } = await query

      if (error) {
        console.error("[v0] Error filtering data:", error)
        return []
      }

      return data || []
    }

    function actualizarResumen(rows, distribuciones) {
      document.getElementById("summaryTotal").textContent = rows.length

      const hogarEntries = Object.entries(distribuciones.hogar)
      if (hogarEntries.length > 0) {
        const [hogarPredominante, hogarPorcentaje] = hogarEntries.reduce((a, b) => (a[1] > b[1] ? a : b))
        document.getElementById("summaryHogar").textContent = hogarPredominante
        document.getElementById("summaryHogarChange").innerHTML =
          `<span>${hogarPorcentaje.toFixed(1)}% del total</span>`
      }

      const educacionEntries = Object.entries(distribuciones.educacion)
      if (educacionEntries.length > 0) {
        const [educacionPredominante, educacionPorcentaje] = educacionEntries.reduce((a, b) => (a[1] > b[1] ? a : b))
        document.getElementById("summaryEducacion").textContent = educacionPredominante
        document.getElementById("summaryEducacionChange").innerHTML =
          `<span>${educacionPorcentaje.toFixed(1)}% del total</span>`
      }

      const laboralEntries = Object.entries(distribuciones.laboral)
      if (laboralEntries.length > 0) {
        const [laboralPredominante, laboralPorcentaje] = laboralEntries.reduce((a, b) => (a[1] > b[1] ? a : b))
        document.getElementById("summaryLaboral").textContent = laboralPredominante
        document.getElementById("summaryLaboralChange").innerHTML =
          `<span>${laboralPorcentaje.toFixed(1)}% del total</span>`
      }
    }

    function calcularDistribuciones(rows) {
      // Estado civil
      const estadoCivilCounts = {}
      rows.forEach((row) => {
        if (row.estado_civil) {
          estadoCivilCounts[row.estado_civil] = (estadoCivilCounts[row.estado_civil] || 0) + 1
        }
      })
      const totalEstadoCivil = Object.values(estadoCivilCounts).reduce((a, b) => a + b, 0)
      const estadoCivil = {}
      Object.keys(estadoCivilCounts).forEach((key) => {
        estadoCivil[key] = totalEstadoCivil > 0 ? (estadoCivilCounts[key] / totalEstadoCivil) * 100 : 0
      })

      // Edad
      const age0_10 = rows.filter((row) => row.edad_0_10 > 0).length
      const age11_25 = rows.filter((row) => row.edad_11_25 > 0).length
      const age26_50 = rows.filter((row) => row.edad_26_50 > 0).length
      const age51_90 = rows.filter((row) => row.edad_51_90 > 0).length
      const totalAge = age0_10 + age11_25 + age26_50 + age51_90

      const edad = {
        "0-10 años": totalAge > 0 ? (age0_10 / totalAge) * 100 : 0,
        "11-25 años": totalAge > 0 ? (age11_25 / totalAge) * 100 : 0,
        "26-50 años": totalAge > 0 ? (age26_50 / totalAge) * 100 : 0,
        "51-90 años": totalAge > 0 ? (age51_90 / totalAge) * 100 : 0,
      }

      // Educación
      const educacionCounts = {}
      rows.forEach((row) => {
        if (row.educacion_jefe_hogar) {
          educacionCounts[row.educacion_jefe_hogar] = (educacionCounts[row.educacion_jefe_hogar] || 0) + 1
        }
      })
      const totalEducacion = Object.values(educacionCounts).reduce((a, b) => a + b, 0)
      const educacion = {}
      Object.keys(educacionCounts).forEach((key) => {
        educacion[key] = totalEducacion > 0 ? (educacionCounts[key] / totalEducacion) * 100 : 0
      })

      // Situación laboral
      const laboralCounts = {}
      rows.forEach((row) => {
        if (row.situacion_laboral_jefe_hogar) {
          laboralCounts[row.situacion_laboral_jefe_hogar] = (laboralCounts[row.situacion_laboral_jefe_hogar] || 0) + 1
        }
      })
      const totalLaboral = Object.values(laboralCounts).reduce((a, b) => a + b, 0)
      const laboral = {}
      Object.keys(laboralCounts).forEach((key) => {
        laboral[key] = totalLaboral > 0 ? (laboralCounts[key] / totalLaboral) * 100 : 0
      })

      // Ingreso
      const ingresoCounts = {}
      rows.forEach((row) => {
        if (row.ingreso_mensual_jefe_hogar) {
          ingresoCounts[row.ingreso_mensual_jefe_hogar] = (ingresoCounts[row.ingreso_mensual_jefe_hogar] || 0) + 1
        }
      })
      const totalIngreso = Object.values(ingresoCounts).reduce((a, b) => a + b, 0)
      const ingreso = {}
      Object.keys(ingresoCounts).forEach((key) => {
        ingreso[key] = totalIngreso > 0 ? (ingresoCounts[key] / totalIngreso) * 100 : 0
      })

      // Tipo de hogar
      const hogarCounts = {}
      rows.forEach((row) => {
        if (row.tipo_hogar) {
          hogarCounts[row.tipo_hogar] = (hogarCounts[row.tipo_hogar] || 0) + 1
        }
      })
      const totalHogar = Object.values(hogarCounts).reduce((a, b) => a + b, 0)
      const hogar = {}
      Object.keys(hogarCounts).forEach((key) => {
        hogar[key] = totalHogar > 0 ? (hogarCounts[key] / totalHogar) * 100 : 0
      })

      return {
        estadoCivil,
        edad,
        educacion,
        laboral,
        ingreso,
        hogar,
        counts: {
          estadoCivil: estadoCivilCounts,
          edad: { "0-10 años": age0_10, "11-25 años": age11_25, "26-50 años": age26_50, "51-90 años": age51_90 },
          educacion: educacionCounts,
          laboral: laboralCounts,
          ingreso: ingresoCounts,
          hogar: hogarCounts,
        },
      }
    }

    function calcularDistribucionesLikert(rows) {
      const categorias = {
        sociocultural: [
          "conoce_desechos_solidos",
          "cree_comportamiento_adecuado_manejo",
          "separar_desechos_por_origen",
          "clasificacion_correcta_desechos",
          "comportamiento_comunidad_influye",
          "dedica_tiempo_reducir_reutilizar_reciclar",
          "desechos_solidos_problema_comunidad",
        ],
        afectivos: [
          "preocupa_exceso_desechos",
          "desechos_contaminan_ambiente",
          "afecta_emocionalmente_noticias_contaminacion",
          "frustracion_falta_acciones_ambientales",
          "importancia_planeta_futuras_generaciones",
        ],
        cognitivos: [
          "consciente_impacto_desechos_salud",
          "investiga_temas_ambientales",
          "consecuencias_acumulacion_desechos",
          "beneficios_reutilizar_residuo",
          "falta_informacion_obstaculo_gestion",
        ],
        ambiental: [
          "desechos_organicos_funcionalidad",
          "acumulacion_desechos_afecta_salud",
          "reduccion_reciclaje_reutilizacion_cuida_ambiente",
          "transformacion_desechos_nuevos_productos",
          "necesita_info_educacion_ambiental",
        ],
        economica: [
          "practica_separacion_reciclaje_ingreso",
          "desechos_hogar_reutilizados",
          "manejo_adecuado_desechos_aporta_desarrollo",
          "emprendimientos_reutilizacion_aportan_economia",
          "manejo_adecuado_desechos_oportunidad_emprendimiento",
        ],
        comunitario: [
          "reducir_residuos_eventos_concientizacion",
          "participaria_talleres_buenas_practicas",
          "manejo_adecuado_desechos_impacto_ambiente",
          "dispuesto_participar_emprendimiento_desechos",
          "participaria_feria_emprendimientos_desechos",
        ],
      }

      const distribuciones = {}
      const promedios = {}

      Object.keys(categorias).forEach((categoria) => {
        distribuciones[categoria] = {}
        promedios[categoria] = {
          "Totalmente desacuerdo": 0,
          Desacuerdo: 0,
          Indiferente: 0,
          "De acuerdo": 0,
          "Totalmente de acuerdo": 0,
          Promedio: 0,
        }

        categorias[categoria].forEach((pregunta) => {
          distribuciones[categoria][pregunta] = {
            "Totalmente desacuerdo": 0,
            Desacuerdo: 0,
            Indiferente: 0,
            "De acuerdo": 0,
            "Totalmente de acuerdo": 0,
            Promedio: 0,
          }

          rows.forEach((row) => {
            const respuesta = row[pregunta]
            if (respuesta && distribuciones[categoria][pregunta][respuesta] !== undefined) {
              distribuciones[categoria][pregunta][respuesta]++
            }
          })

          const total = rows.length
          let sumaPonderada = 0
          Object.keys(distribuciones[categoria][pregunta]).forEach((respuesta) => {
            if (respuesta !== "Promedio") {
              const porcentaje = (distribuciones[categoria][pregunta][respuesta] / total) * 100
              distribuciones[categoria][pregunta][respuesta] = porcentaje

              const valor = {
                "Totalmente desacuerdo": 1,
                Desacuerdo: 2,
                Indiferente: 3,
                "De acuerdo": 4,
                "Totalmente de acuerdo": 5,
              }[respuesta]

              sumaPonderada += valor * (distribuciones[categoria][pregunta][respuesta] / 100)
            }
          })

          distribuciones[categoria][pregunta]["Promedio"] = (sumaPonderada / 5) * 100

          Object.keys(promedios[categoria]).forEach((respuesta) => {
            if (respuesta !== "Promedio") {
              promedios[categoria][respuesta] += distribuciones[categoria][pregunta][respuesta]
            }
          })
          promedios[categoria]["Promedio"] += distribuciones[categoria][pregunta]["Promedio"]
        })

        const numPreguntas = categorias[categoria].length
        Object.keys(promedios[categoria]).forEach((respuesta) => {
          promedios[categoria][respuesta] = promedios[categoria][respuesta] / numPreguntas
        })
      })

      return { distribuciones, promedios }
    }

    function renderDemographicsCharts(distribuciones) {
      renderDemographicChart(
        "estadoCivilChart",
        Object.keys(distribuciones.estadoCivil),
        Object.values(distribuciones.estadoCivil),
        distribuciones.counts.estadoCivil,
      )
      renderDemographicChart(
        "edadChart",
        Object.keys(distribuciones.edad),
        Object.values(distribuciones.edad),
        distribuciones.counts.edad,
      )
      renderDemographicChart(
        "educacionChart",
        Object.keys(distribuciones.educacion),
        Object.values(distribuciones.educacion),
        distribuciones.counts.educacion,
      )
      renderDemographicChart(
        "laboralChart",
        Object.keys(distribuciones.laboral),
        Object.values(distribuciones.laboral),
        distribuciones.counts.laboral,
      )
      renderDemographicChart(
        "ingresoChart",
        Object.keys(distribuciones.ingreso),
        Object.values(distribuciones.ingreso),
        distribuciones.counts.ingreso,
      )
      renderDemographicChart(
        "hogarChart",
        Object.keys(distribuciones.hogar),
        Object.values(distribuciones.hogar),
        distribuciones.counts.hogar,
      )
    }

    function renderDemographicChart(canvasId, labels, data, counts) {
      const ctx = document.getElementById(canvasId)?.getContext("2d")
      if (!ctx) return

      if (window[canvasId + "Instance"]) {
        window[canvasId + "Instance"].destroy()
      }

      const colors = ["#4f46e5", "#0ea5e9", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"]

      window[canvasId + "Instance"] = new window.Chart(ctx, {
        type: currentChartType,
        data: {
          labels: labels,
          datasets: [
            {
              label: "Porcentaje (%)",
              data: data,
              backgroundColor: colors.slice(0, labels.length),
              borderColor: colors.slice(0, labels.length),
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: currentChartType === "pie",
              position: "right",
            },
            tooltip: {
              callbacks: {
                label: (context) => {
                  const value = context.parsed.y || context.parsed
                  const count = counts[context.label] || 0
                  return `${value.toFixed(1)}% (${count} personas)`
                },
              },
            },
          },
          scales:
            currentChartType !== "pie"
              ? {
                  y: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                      display: true,
                      text: "Porcentaje (%)",
                    },
                  },
                }
              : {},
        },
      })
    }

    function llenarTablasResumen(distribuciones, distribucionesLikert) {
      // Simple placeholder - full implementation would include all tables
      console.log("[v0] Tables would be filled here with data")
    }

    function setupEventListeners() {
      selectEstadoCivil?.addEventListener("change", actualizar)
      selectEducacion?.addEventListener("change", actualizar)
      selectSituacionLaboral?.addEventListener("change", actualizar)
      selectIngreso?.addEventListener("change", actualizar)

      // Chart type buttons
      document.querySelectorAll("[data-chart-type]").forEach((btn) => {
        btn.addEventListener("click", function () {
          document.querySelectorAll("[data-chart-type]").forEach((b) => {
            b.classList.remove("bg-teal-600", "text-white", "border-teal-600", "active")
            b.classList.add("bg-white", "border-slate-300")
          })

          this.classList.remove("bg-white", "border-slate-300")
          this.classList.add("bg-teal-600", "text-white", "border-teal-600", "active")

          currentChartType = this.getAttribute("data-chart-type")
          actualizar()
        })
      })

      // Tabs
      document.querySelectorAll(".tab").forEach((tab) => {
        tab.addEventListener("click", () => {
          const tabId = tab.getAttribute("data-tab")

          document.querySelectorAll(".tab").forEach((t) => {
            t.classList.remove("border-teal-600", "text-teal-700", "active")
            t.classList.add("border-transparent", "text-slate-600")
          })
          document.querySelectorAll(".tab-content").forEach((c) => {
            c.style.display = "none"
          })

          tab.classList.remove("border-transparent", "text-slate-600")
          tab.classList.add("border-teal-600", "text-teal-700", "active")
          document.getElementById(tabId).style.display = "block"
        })
      })
    }

    // Start initialization
    inicializar()
  }

  return (
    <>
      <Script
        src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"
        strategy="beforeInteractive"
        onLoad={() => console.log("[v0] Supabase loaded")}
      />
      <Script
        src="https://cdn.jsdelivr.net/npm/chart.js"
        strategy="beforeInteractive"
        onLoad={() => console.log("[v0] Chart.js loaded")}
      />
      <Script
        src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@2"
        strategy="beforeInteractive"
        onLoad={() => console.log("[v0] ChartDataLabels loaded")}
      />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/30 to-slate-50">
        <Navigation />

        <main className="container mx-auto px-4 py-8 max-w-7xl">
          {/* Panel de control principal */}
          <div className="bg-white rounded-xl p-6 shadow-lg mb-6 border border-slate-200">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-200">
              <i className="fas fa-sliders-h text-teal-600"></i>
              <h2 className="text-lg font-semibold text-teal-800">Filtros de Análisis</h2>
            </div>

            {/* Controles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex flex-col">
                <label
                  htmlFor="selectEstadoCivil"
                  className="text-sm font-medium text-slate-600 mb-2 flex items-center gap-2"
                >
                  <i className="fas fa-heart text-teal-600"></i> Estado Civil
                </label>
                <select
                  id="selectEstadoCivil"
                  className="px-4 py-3 rounded-lg border border-slate-300 bg-white text-sm transition-all focus:outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                >
                  <option value="">Todos los estados civiles</option>
                </select>
                <div className="text-xs text-slate-500 italic mt-1" id="estadoCivilInfo">
                  Cargando...
                </div>
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="selectEducacion"
                  className="text-sm font-medium text-slate-600 mb-2 flex items-center gap-2"
                >
                  <i className="fas fa-graduation-cap text-teal-600"></i> Nivel de Educación
                </label>
                <select
                  id="selectEducacion"
                  className="px-4 py-3 rounded-lg border border-slate-300 bg-white text-sm transition-all focus:outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                >
                  <option value="">Todos los niveles</option>
                </select>
                <div className="text-xs text-slate-500 italic mt-1" id="educacionInfo">
                  Cargando...
                </div>
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="selectSituacionLaboral"
                  className="text-sm font-medium text-slate-600 mb-2 flex items-center gap-2"
                >
                  <i className="fas fa-briefcase text-teal-600"></i> Situación Laboral
                </label>
                <select
                  id="selectSituacionLaboral"
                  className="px-4 py-3 rounded-lg border border-slate-300 bg-white text-sm transition-all focus:outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                >
                  <option value="">Todas las situaciones</option>
                </select>
                <div className="text-xs text-slate-500 italic mt-1" id="situacionLaboralInfo">
                  Cargando...
                </div>
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="selectIngreso"
                  className="text-sm font-medium text-slate-600 mb-2 flex items-center gap-2"
                >
                  <i className="fas fa-money-bill-wave text-teal-600"></i> Ingreso Mensual
                </label>
                <select
                  id="selectIngreso"
                  className="px-4 py-3 rounded-lg border border-slate-300 bg-white text-sm transition-all focus:outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                >
                  <option value="">Todos los ingresos</option>
                </select>
                <div className="text-xs text-slate-500 italic mt-1" id="ingresoInfo">
                  Cargando...
                </div>
              </div>
            </div>
          </div>

          {/* Tarjetas de resumen */}
          <div className="bg-white rounded-xl p-6 shadow-lg mb-6 border border-slate-200">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-200">
              <i className="fas fa-chart-line text-teal-600"></i>
              <h2 className="text-lg font-semibold text-teal-800">Resumen General</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-white to-teal-50/50 p-5 rounded-xl border border-teal-100 shadow-sm hover:-translate-y-1 transition-transform">
                <div className="flex items-center gap-2 text-sm text-slate-600 mb-2 font-medium">
                  <i className="fas fa-users text-teal-600"></i> Total de Encuestados
                </div>
                <div className="text-3xl font-bold text-teal-700 mb-1" id="summaryTotal">
                  0
                </div>
                <div className="text-xs text-slate-500">
                  <span>Muestra representativa del cantón</span>
                </div>
              </div>

              <div className="bg-gradient-to-br from-white to-teal-50/50 p-5 rounded-xl border border-teal-100 shadow-sm hover:-translate-y-1 transition-transform">
                <div className="flex items-center gap-2 text-sm text-slate-600 mb-2 font-medium">
                  <i className="fas fa-home text-teal-600"></i> Tipo de Hogar Predominante
                </div>
                <div className="text-3xl font-bold text-teal-700 mb-1" id="summaryHogar">
                  -
                </div>
                <div className="text-xs text-slate-500" id="summaryHogarChange">
                  <span>% del total</span>
                </div>
              </div>

              <div className="bg-gradient-to-br from-white to-teal-50/50 p-5 rounded-xl border border-teal-100 shadow-sm hover:-translate-y-1 transition-transform">
                <div className="flex items-center gap-2 text-sm text-slate-600 mb-2 font-medium">
                  <i className="fas fa-user-graduate text-teal-600"></i> Educación Predominante
                </div>
                <div className="text-3xl font-bold text-teal-700 mb-1" id="summaryEducacion">
                  -
                </div>
                <div className="text-xs text-slate-500" id="summaryEducacionChange">
                  <span>% del total</span>
                </div>
              </div>

              <div className="bg-gradient-to-br from-white to-teal-50/50 p-5 rounded-xl border border-teal-100 shadow-sm hover:-translate-y-1 transition-transform">
                <div className="flex items-center gap-2 text-sm text-slate-600 mb-2 font-medium">
                  <i className="fas fa-briefcase text-teal-600"></i> Situación Laboral Predominante
                </div>
                <div className="text-3xl font-bold text-teal-700 mb-1" id="summaryLaboral">
                  -
                </div>
                <div className="text-xs text-slate-500" id="summaryLaboralChange">
                  <span>% del total</span>
                </div>
              </div>
            </div>
          </div>

          {/* Gráficos y visualizaciones */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-200">
              <i className="fas fa-chart-bar text-teal-600"></i>
              <h2 className="text-lg font-semibold text-teal-800">Visualización de Datos</h2>
            </div>

            <div className="flex flex-wrap gap-2 mb-4 items-center">
              <div
                className="flex items-center gap-2 text-sm bg-white border border-slate-300 rounded-lg px-3 py-2 cursor-pointer hover:bg-slate-50 hover:border-teal-500 transition-all"
                data-chart-type="bar"
              >
                <i className="fas fa-chart-bar"></i> Barras
              </div>
              <div
                className="flex items-center gap-2 text-sm bg-teal-600 text-white border border-teal-600 rounded-lg px-3 py-2 cursor-pointer transition-all active"
                data-chart-type="pie"
              >
                <i className="fas fa-chart-pie"></i> Torta
              </div>
              <div
                className="flex items-center gap-2 text-sm bg-white border border-slate-300 rounded-lg px-3 py-2 cursor-pointer hover:bg-slate-50 hover:border-teal-500 transition-all"
                data-chart-type="line"
              >
                <i className="fas fa-chart-line"></i> Líneas
              </div>
            </div>

            <div className="flex flex-wrap border-b border-slate-200 mb-4">
              <div
                className="px-5 py-3 cursor-pointer font-medium border-b-2 border-teal-600 text-teal-700 transition-all tab active"
                data-tab="demographics"
              >
                Distribución Demográfica
              </div>
              <div
                className="px-5 py-3 cursor-pointer font-medium text-slate-600 border-b-2 border-transparent hover:text-teal-700 hover:border-teal-300 transition-all tab"
                data-tab="sociocultural"
              >
                Determinantes Socioculturales
              </div>
              <div
                className="px-5 py-3 cursor-pointer font-medium text-slate-600 border-b-2 border-transparent hover:text-teal-700 hover:border-teal-300 transition-all tab"
                data-tab="afectivos"
              >
                Determinantes Afectivos
              </div>
              <div
                className="px-5 py-3 cursor-pointer font-medium text-slate-600 border-b-2 border-transparent hover:text-teal-700 hover:border-teal-300 transition-all tab"
                data-tab="cognitivos"
              >
                Determinantes Cognitivos
              </div>
              <div
                className="px-5 py-3 cursor-pointer font-medium text-slate-600 border-b-2 border-transparent hover:text-teal-700 hover:border-teal-300 transition-all tab"
                data-tab="ambiental"
              >
                Sustentabilidad Ambiental
              </div>
              <div
                className="px-5 py-3 cursor-pointer font-medium text-slate-600 border-b-2 border-transparent hover:text-teal-700 hover:border-teal-300 transition-all tab"
                data-tab="economica"
              >
                Sustentabilidad Económica
              </div>
              <div
                className="px-5 py-3 cursor-pointer font-medium text-slate-600 border-b-2 border-transparent hover:text-teal-700 hover:border-teal-300 transition-all tab"
                data-tab="comunitario"
              >
                Desarrollo Comunitario
              </div>
            </div>

            <div className="tab-content" id="demographics">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-5">
                <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
                  <h3 className="text-teal-700 mb-4 text-base font-semibold">Distribución por Estado Civil</h3>
                  <div className="relative h-[350px]">
                    <canvas id="estadoCivilChart"></canvas>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
                  <h3 className="text-teal-700 mb-4 text-base font-semibold">Distribución por Nivel Educativo</h3>
                  <div className="relative h-[350px]">
                    <canvas id="educacionChart"></canvas>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
                  <h3 className="text-teal-700 mb-4 text-base font-semibold">Distribución por Situación Laboral</h3>
                  <div className="relative h-[350px]">
                    <canvas id="laboralChart"></canvas>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
                  <h3 className="text-teal-700 mb-4 text-base font-semibold">Distribución por Ingreso Mensual</h3>
                  <div className="relative h-[350px]">
                    <canvas id="ingresoChart"></canvas>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
                  <h3 className="text-teal-700 mb-4 text-base font-semibold">Distribución por Tipo de Hogar</h3>
                  <div className="relative h-[350px]">
                    <canvas id="hogarChart"></canvas>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
                  <h3 className="text-teal-700 mb-4 text-base font-semibold">Distribución por Grupos de Edad</h3>
                  <div className="relative h-[350px]">
                    <canvas id="edadChart"></canvas>
                  </div>
                </div>
              </div>
            </div>

            {/* Otros tabs */}
            <div className="tab-content" id="sociocultural" style={{ display: "none" }}>
              <div className="text-center py-12 text-slate-500">
                Los gráficos de Determinantes Socioculturales se cargarán al seleccionar esta pestaña...
              </div>
            </div>

            <div className="tab-content" id="afectivos" style={{ display: "none" }}>
              <div className="text-center py-12 text-slate-500">
                Los gráficos de Determinantes Afectivos se cargarán al seleccionar esta pestaña...
              </div>
            </div>

            <div className="tab-content" id="cognitivos" style={{ display: "none" }}>
              <div className="text-center py-12 text-slate-500">
                Los gráficos de Determinantes Cognitivos se cargarán al seleccionar esta pestaña...
              </div>
            </div>

            <div className="tab-content" id="ambiental" style={{ display: "none" }}>
              <div className="text-center py-12 text-slate-500">
                Los gráficos de Sustentabilidad Ambiental se cargarán al seleccionar esta pestaña...
              </div>
            </div>

            <div className="tab-content" id="economica" style={{ display: "none" }}>
              <div className="text-center py-12 text-slate-500">
                Los gráficos de Sustentabilidad Económica se cargarán al seleccionar esta pestaña...
              </div>
            </div>

            <div className="tab-content" id="comunitario" style={{ display: "none" }}>
              <div className="text-center py-12 text-slate-500">
                Los gráficos de Desarrollo Comunitario se cargarán al seleccionar esta pestaña...
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
