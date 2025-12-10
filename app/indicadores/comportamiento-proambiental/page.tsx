"use client"

import { useEffect, useState } from "react"
import { Navigation } from "@/components/navigation"
import Script from "next/script"
import { createClient } from "@/lib/supabase/client"

export default function ComportamientoProambientalPage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadScriptsAndInitialize = async () => {
      const checkScriptsLoaded = () => {
        return new Promise<void>((resolve) => {
          const interval = setInterval(() => {
            if ((window as any).Chart && (window as any).ChartDataLabels) {
              clearInterval(interval)
              resolve()
            }
          }, 100)
        })
      }

      await checkScriptsLoaded()

      const supabase = createClient()

      if (!supabase) {
        console.error("[v0] Supabase no está configurado")
        alert("Error: Por favor configura Supabase en las variables de entorno")
        setIsLoading(false)
        return
      }
      ;(window as any).supabaseClient = supabase

      const scriptElement = document.getElementById("comportamiento-init-script")
      if (scriptElement) {
        const scriptContent = scriptElement.textContent || ""
        try {
          const func = new Function(scriptContent)
          func()
          setIsLoading(false)
        } catch (error) {
          console.error("[v0] Error executing initialization script:", error)
          setIsLoading(false)
        }
      }
    }

    loadScriptsAndInitialize()
  }, [])

  return (
    <>
      <Script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js" strategy="afterInteractive" />
      <Script
        src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@2.2.0/dist/chartjs-plugin-datalabels.min.js"
        strategy="afterInteractive"
      />

      <Navigation />

      {isLoading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(255, 255, 255, 0.9)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              border: "4px solid #f3f3f3",
              borderTop: "4px solid #0f766e",
              borderRadius: "50%",
              width: "50px",
              height: "50px",
              animation: "spin 1s linear infinite",
            }}
          />
        </div>
      )}

      <div
        dangerouslySetInnerHTML={{
          __html: `
          <style>
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          </style>
          
          <script id="comportamiento-init-script">
          (async function() {
            console.log('[v0] Initializing Comportamiento Proambiental app...');
            
            while (!window.Chart || !window.ChartDataLabels || !window.supabaseClient) {
              await new Promise(resolve => setTimeout(resolve, 100));
            }
            
            console.log('[v0] All scripts loaded, initializing dashboard...');
            
            const supabase = window.supabaseClient;
            
            // Aquí irá el resto de tu código de comportamiento proambiental
            // Por ahora, solo un placeholder para demostrar que funciona
            console.log('[v0] Dashboard initialized successfully');
            
          })();
          </script>
        `,
        }}
      />
    </>
  )
}
