import { createClient } from "./client"

export interface FiltrosComportamiento {
  estadoCivil?: string
  educacion?: string
  situacionLaboral?: string
  ingreso?: string
}

export async function obtenerOpcionesFiltros() {
  const supabase = createClient()

  if (!supabase) {
    throw new Error("Supabase no está configurado")
  }

  const { data, error } = await supabase
    .from("cuestionario_comportamiento_proambiental_autosustentabilidad")
    .select("estado_civil, educacion_jefe_hogar, situacion_laboral_jefe_hogar, ingreso_mensual_jefe_hogar")

  if (error) {
    console.error("Error loading filters:", error)
    throw error
  }

  const estadosCiviles = [...new Set(data.map((r: any) => r.estado_civil).filter(Boolean))].sort()
  const nivelesEducacion = [...new Set(data.map((r: any) => r.educacion_jefe_hogar).filter(Boolean))].sort()
  const situacionesLaborales = [...new Set(data.map((r: any) => r.situacion_laboral_jefe_hogar).filter(Boolean))].sort()
  const nivelesIngreso = [...new Set(data.map((r: any) => r.ingreso_mensual_jefe_hogar).filter(Boolean))].sort()

  return {
    estadosCiviles,
    nivelesEducacion,
    situacionesLaborales,
    nivelesIngreso,
  }
}

export async function obtenerDatosFiltrados(filtros: FiltrosComportamiento) {
  const supabase = createClient()

  if (!supabase) {
    throw new Error("Supabase no está configurado")
  }

  let query = supabase.from("cuestionario_comportamiento_proambiental_autosustentabilidad").select("*")

  if (filtros.estadoCivil) {
    query = query.eq("estado_civil", filtros.estadoCivil)
  }
  if (filtros.educacion) {
    query = query.eq("educacion_jefe_hogar", filtros.educacion)
  }
  if (filtros.situacionLaboral) {
    query = query.eq("situacion_laboral_jefe_hogar", filtros.situacionLaboral)
  }
  if (filtros.ingreso) {
    query = query.eq("ingreso_mensual_jefe_hogar", filtros.ingreso)
  }

  const { data, error } = await query

  if (error) {
    console.error("Error filtering data:", error)
    throw error
  }

  return data || []
}
