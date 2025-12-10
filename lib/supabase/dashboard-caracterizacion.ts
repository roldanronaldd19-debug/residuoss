import { createClient } from "./client"

export interface FiltrosCaracterizacion {
  lugar?: string
}

export async function obtenerOpcionesFiltrosCaracterizacion() {
  const supabase = createClient()

  if (!supabase) {
    throw new Error("Supabase no está configurado")
  }

  const { data, error } = await supabase.from("caracterizacion_desechos_daule").select("lugar")

  if (error) {
    console.error("Error loading filters:", error)
    throw error
  }

  const lugares = [...new Set(data.map((r: any) => r.lugar).filter(Boolean))].sort()

  return {
    lugares,
  }
}

export async function obtenerDatosFiltradosCaracterizacion(filtros: FiltrosCaracterizacion) {
  const supabase = createClient()

  if (!supabase) {
    throw new Error("Supabase no está configurado")
  }

  let query = supabase.from("caracterizacion_desechos_daule").select("*")

  if (filtros.lugar) {
    query = query.eq("lugar", filtros.lugar)
  }

  const { data, error } = await query

  if (error) {
    console.error("Error filtering data:", error)
    throw error
  }

  return data || []
}

export async function obtenerTodosLosDatos() {
  const supabase = createClient()

  if (!supabase) {
    throw new Error("Supabase no está configurado")
  }

  const { data, error } = await supabase.from("caracterizacion_desechos_daule").select("*")

  if (error) {
    console.error("Error loading all data:", error)
    throw error
  }

  return data || []
}
