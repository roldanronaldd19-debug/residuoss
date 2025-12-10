"use client"

import { useEffect, useState } from "react"
import { Navigation } from "@/components/navigation"
import Script from "next/script"
import { createClient } from "@/lib/supabase/client"

export default function CaracterizacionDesechosPage() {
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

      const scriptElement = document.getElementById("caracterizacion-init-script")
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

      <div
        dangerouslySetInnerHTML={{
          __html: `
        <style>
          :root {
            --primary: #0f766e;
            --primary-light: #14b8a6;
            --primary-dark: #0d5d57;
            --secondary: #2d4cc8;
            --accent: #7c3aed;
            --bg1: #f8fafc;
            --bg2: #f0fdfa;
            --card: #ffffff;
            --muted: #64748b;
            --success: #10b981;
            --warning: #f59e0b;
            --danger: #ef4444;
            --border: #e2e8f0;
            --shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.025);
            --radius: 12px;
          }
          
          body {
            font-family: 'Inter', 'Segoe UI', Roboto, Arial, sans-serif;
            background: linear-gradient(135deg, var(--bg1), var(--bg2));
            color: #1e293b;
            line-height: 1.6;
          }
          
          .dashboard-container {
            max-width: 1400px;
            margin: 32px auto;
            padding: 0 20px;
          }
          
          .card {
            background: var(--card);
            border-radius: var(--radius);
            padding: 24px;
            box-shadow: var(--shadow);
            margin-bottom: 24px;
            border: 1px solid var(--border);
            transition: transform 0.2s, box-shadow 0.2s;
          }
          
          .card:hover {
            transform: translateY(-2px);
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          }
          
          .card-title {
            color: var(--primary);
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 16px;
            display: flex;
            align-items: center;
            gap: 8px;
            border-bottom: 1px solid var(--border);
            padding-bottom: 12px;
          }
          
          .controls {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 16px;
            margin-bottom: 20px;
          }
          
          .control-group {
            display: flex;
            flex-direction: column;
          }
          
          .control-group label {
            font-size: 14px;
            font-weight: 500;
            margin-bottom: 6px;
            color: var(--muted);
            display: flex;
            align-items: center;
            gap: 6px;
          }
          
          .filter-info {
            font-size: 11px;
            color: var(--muted);
            margin-top: 4px;
            font-style: italic;
          }
          
          select {
            padding: 12px 14px;
            border-radius: 8px;
            border: 1px solid var(--border);
            background: white;
            font-family: inherit;
            font-size: 14px;
            transition: all 0.2s;
            appearance: none;
            padding-right: 40px;
          }
          
          select:focus {
            outline: none;
            border-color: var(--primary);
            box-shadow: 0 0 0 3px rgba(15, 118, 110, 0.1);
          }
          
          .summary-cards {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: 16px;
            margin-bottom: 24px;
          }
          
          .summary-card {
            background: linear-gradient(135deg, #fff, #f7fffb);
            padding: 20px;
            border-radius: 10px;
            border: 1px solid #eef7f4;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
            transition: transform 0.2s;
          }
          
          .summary-card:hover {
            transform: translateY(-2px);
          }
          
          .summary-title {
            font-size: 13px;
            color: var(--muted);
            margin-bottom: 8px;
            display: flex;
            align-items: center;
            gap: 6px;
            font-weight: 500;
          }
          
          .summary-value {
            font-size: 28px;
            font-weight: 700;
            color: var(--primary);
            margin-bottom: 4px;
          }
          
          .summary-subtitle {
            font-size: 12px;
          }
          
          .chart-container {
            position: relative;
            height: 500px;
            margin-top: 20px;
          }
          
          .chart-container-sm {
            position: relative;
            height: 350px;
            margin-top: 20px;
          }
          
          .tabs {
            display: flex;
            border-bottom: 1px solid var(--border);
            margin-bottom: 16px;
            flex-wrap: wrap;
          }
          
          .tab {
            padding: 12px 20px;
            cursor: pointer;
            font-weight: 500;
            color: var(--muted);
            border-bottom: 2px solid transparent;
            transition: all 0.2s;
          }
          
          .tab.active {
            color: var(--primary);
            border-bottom: 2px solid var(--primary);
          }
          
          .tab-content {
            display: none;
          }
          
          .tab-content.active {
            display: block;
          }
          
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 12px;
          }
          
          th, td {
            padding: 14px 12px;
            text-align: left;
            border-bottom: 1px solid var(--border);
          }
          
          th {
            font-weight: 600;
            color: var(--muted);
            font-size: 14px;
            background-color: #f8fafc;
          }
          
          tr:hover {
            background-color: #f8fafc;
          }
          
          .total-row {
            background-color: #f0f9ff;
            font-weight: 600;
          }
          
          .total-row td {
            border-top: 2px solid var(--primary);
          }
          
          .charts-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
            gap: 24px;
            margin-top: 20px;
          }
          
          .chart-card {
            background: white;
            border-radius: 10px;
            padding: 20px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
            border: 1px solid var(--border);
          }
          
          .chart-card h3 {
            color: var(--primary);
            margin-bottom: 16px;
            font-size: 16px;
            font-weight: 600;
          }
          
          .chart-action-btn {
            padding: 6px 12px;
            border-radius: 6px;
            background: white;
            border: 1px solid var(--border);
            font-size: 12px;
            cursor: pointer;
            transition: all 0.2s;
            display: inline-flex;
            align-items: center;
            gap: 4px;
            margin-right: 8px;
          }
          
          .chart-action-btn:hover {
            background: var(--bg1);
            border-color: var(--primary-light);
          }
          
          .chart-action-btn.active {
            background: var(--primary);
            color: white;
            border-color: var(--primary);
          }
          
          .category-header {
            background-color: #f0f9ff;
            font-weight: 600;
            color: var(--primary);
            border-top: 2px solid var(--primary-light);
          }
          
          .subcategory-row {
            background-color: #f8fafc;
          }
          
          .subcategory-row td:first-child {
            padding-left: 40px;
          }
          
          .category-total-row {
            background-color: #e6f7f4;
            font-weight: 600;
            color: var(--primary-dark);
            border-bottom: 1px solid var(--primary-light);
          }
          
          .category-total-row td:first-child {
            padding-left: 20px;
          }
          
          .loading-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(255, 255, 255, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
          }
          
          .loading-spinner {
            border: 4px solid #f3f3f3;
            border-top: 4px solid var(--primary);
            border-radius: 50%;
            width: 50px;
            height: 50px;
            animation: spin 1s linear infinite;
          }
          
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          /* Improved mobile responsiveness */
          @media (max-width: 768px) {
            .controls {
              grid-template-columns: 1fr;
            }
            
            .chart-container {
              height: 400px;
            }
            
            .summary-cards {
              grid-template-columns: 1fr;
              gap: 0.75rem;
            }
            
            .summary-card {
              padding: 0.75rem;
            }
            
            .summary-card h3 {
              font-size: 0.875rem;
            }
            
            .summary-card .value {
              font-size: 1.25rem;
            }
            
            .charts-grid {
              grid-template-columns: 1fr;
              gap: 1rem;
            }
            
            table {
              font-size: 0.875rem;
            }
            
            th, td {
              padding: 0.5rem;
            }
            
            .tabs {
              overflow-x: auto;
              -webkit-overflow-scrolling: touch;
            }
            
            .tab {
              font-size: 0.875rem;
              padding: 0.5rem 1rem;
              white-space: nowrap;
            }
            
            .subcategory-row td:first-child {
              padding-left: 30px;
            }
            
            .category-total-row td:first-child {
              padding-left: 15px;
            }
          }
        </style>
        
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
        
        ${isLoading ? '<div class="loading-overlay"><div class="loading-spinner"></div></div>' : ""}
        
        <div class="dashboard-container">
          <div class="card">
            <div class="card-title">
              <i class="fas fa-sliders-h"></i>
              Filtros de Análisis
            </div>
            
            <div class="controls">
              <div class="control-group">
                <label for="selectLugar"><i class="fas fa-map-marker-alt"></i> Ubicación</label>
                <select id="selectLugar">
                  <option value="">Todas las ubicaciones</option>
                </select>
                <div class="filter-info" id="lugarInfo">Cargando...</div>
              </div>
              
              <div class="control-group">
                <label><i class="fas fa-redo"></i> Acciones</label>
                <button id="btnResetFilters" class="chart-action-btn" style="margin-top: 0; padding: 12px 14px; height: 44px;">
                  Restablecer Filtros
                </button>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card-title">
              <i class="fas fa-chart-line"></i>
              Resumen General
            </div>
            
            <div class="summary-cards">
              <div class="summary-card">
                <div class="summary-title">
                  <i class="fas fa-clipboard-list"></i> Total de Encuestas
                </div>
                <div class="summary-value" id="summaryEncuestas">0</div>
                <div class="summary-subtitle">
                  <span>Registros en la base de datos</span>
                </div>
              </div>
              <div class="summary-card">
                <div class="summary-title">
                  <i class="fas fa-map-marked-alt"></i> Total de Ubicaciones
                </div>
                <div class="summary-value" id="summaryUbicaciones">0</div>
                <div class="summary-subtitle">
                  <span>Lugares únicos registrados</span>
                </div>
              </div>
              <div class="summary-card">
                <div class="summary-title">
                  <i class="fas fa-weight-hanging"></i> Total de Desechos
                </div>
                <div class="summary-value" id="summaryTotalKg">0 kg</div>
                <div class="summary-subtitle">
                  <span>Suma total de kilogramos</span>
                </div>
              </div>
              <div class="summary-card">
                <div class="summary-title">
                  <i class="fas fa-balance-scale"></i> Promedio por Encuesta
                </div>
                <div class="summary-value" id="summaryPromedio">0 kg</div>
                <div class="summary-subtitle">
                  <span>Promedio de kg por encuesta</span>
                </div>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card-title">
              <i class="fas fa-chart-bar"></i>
              Visualización de Datos
            </div>
            
            <div style="margin-bottom: 16px;">
              <button class="chart-action-btn active" data-chart-type="bar">
                <i class="fas fa-chart-bar"></i> Barras
              </button>
              <button class="chart-action-btn" data-chart-type="pie">
                <i class="fas fa-chart-pie"></i> Torta
              </button>
              <button class="chart-action-btn" data-chart-type="line">
                <i class="fas fa-chart-line"></i> Líneas
              </button>
            </div>
            
            <div class="tabs">
              <div class="tab active" data-tab="main-chart">Distribución por Categoría</div>
            </div>
            
            <div class="tab-content active" id="main-chart">
              <div class="chart-container">
                <canvas id="mainChart"></canvas>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card-title">
              <i class="fas fa-table"></i>
              Tabla Resumen por Categorías
            </div>
            
            <div class="table-responsive">
              <table id="tableResumen">
                <thead>
                  <tr>
                    <th>Categoría / Subcategoría</th>
                    <th style="text-align:right">Peso (kg)</th>
                    <th style="text-align:right">% del Total</th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
            </div>
          </div>
        </div>

        <script id="caracterizacion-init-script">
        (async function(){
          console.log('[v0] Initializing Caracterización de Desechos app...');
          
          while (!window.Chart || !window.ChartDataLabels || !window.supabaseClient) {
            await new Promise(resolve => setTimeout(resolve, 100));
          }
          
          console.log('[v0] All scripts loaded, initializing dashboard...');
          
          const supabase = window.supabaseClient;
          
          window.Chart.register(window.ChartDataLabels);

          // ---------- SELECTORES ----------
          const selectLugar = document.getElementById('selectLugar');
          const btnResetFilters = document.getElementById('btnResetFilters');

          // Elementos de información de filtros
          const lugarInfo = document.getElementById('lugarInfo');

          // Elementos de resumen
          const summaryEncuestas = document.getElementById('summaryEncuestas');
          const summaryUbicaciones = document.getElementById('summaryUbicaciones');
          const summaryTotalKg = document.getElementById('summaryTotalKg');
          const summaryPromedio = document.getElementById('summaryPromedio');
          
          // Tabla
          const tbody = document.querySelector('#tableResumen tbody');

          // Charts
          const mainCtx = document.getElementById('mainChart').getContext('2d');
          let mainChart;

          // Variables globales para datos
          let currentData = [];
          let allData = [];
          let currentChartType = 'bar';
          let filterOptions = {
            lugares: []
          };

          // Definición de las 15 categorías principales con sus subcategorías
          const categoriasPrincipales = [
            {
              id: 1,
              nombre: "MATERIA ORGÁNICA",
              subcategorias: [
                { campo: "materia_organica_jardin_kg", nombre: "De jardín" },
                { campo: "materia_organica_cocina_kg", nombre: "De cocina" }
              ]
            },
            {
              id: 2,
              nombre: "GRASAS Y ACEITES",
              subcategorias: [
                { campo: "grasas_aceite_comestible_kg", nombre: "Aceite comestible" }
              ]
            },
            {
              id: 3,
              nombre: "MEDICINA",
              subcategorias: [
                { campo: "medicina_jarabe_kg", nombre: "Jarabe" },
                { campo: "medicina_tabletas_kg", nombre: "Tabletas" }
              ]
            },
            {
              id: 4,
              nombre: "PAPELES Y CARTÓN",
              subcategorias: [
                { campo: "papel_blanco_kg", nombre: "Papel blanco" },
                { campo: "papel_periodico_kg", nombre: "Papel periódico" },
                { campo: "papel_archivo_kg", nombre: "Papel archivo" },
                { campo: "carton_kg", nombre: "Cartón" },
                { campo: "tetra_brik_kg", nombre: "Tetra-brik" }
              ]
            },
            {
              id: 5,
              nombre: "PLÁSTICOS",
              subcategorias: [
                { campo: "plastico_pet_kg", nombre: "PET" },
                { campo: "plastico_mixto_kg", nombre: "Plástico mixto" },
                { campo: "bot_aceite_kg", nombre: "Botella de aceite" },
                { campo: "bolsas_kg", nombre: "Bolsas" }
              ]
            },
            {
              id: 6,
              nombre: "VIDRIOS",
              subcategorias: [
                { campo: "vidrio_blanco_kg", nombre: "Blanco" },
                { campo: "vidrio_verde_kg", nombre: "Verde" },
                { campo: "vidrio_otros_kg", nombre: "Otros" }
              ]
            },
            {
              id: 7,
              nombre: "METALES",
              subcategorias: [
                { campo: "metal_hierro_kg", nombre: "Hierro" },
                { campo: "metal_aluminio_kg", nombre: "Aluminio" },
                { campo: "metal_cobre_kg", nombre: "Cobre" },
                { campo: "metal_otros_kg", nombre: "Otros" }
              ]
            },
            {
              id: 8,
              nombre: "TEXTIL",
              subcategorias: [
                { campo: "textil_ropa_kg", nombre: "Ropa" },
                { campo: "textil_zapatos_kg", nombre: "Zapatos" }
              ]
            },
            {
              id: 9,
              nombre: "CAUCHO Y CUERO",
              subcategorias: [
                { campo: "caucho_cuero_kg", nombre: "Caucho y cuero" }
              ]
            },
            {
              id: 10,
              nombre: "MADERA",
              subcategorias: [
                { campo: "madera_kg", nombre: "Madera" }
              ]
            },
            {
              id: 11,
              nombre: "HIGIÉNICOS",
              subcategorias: [
                { campo: "higienico_papel_kg", nombre: "Papel higiénico" },
                { campo: "higienico_panales_kg", nombre: "Pañales" },
                { campo: "higienico_toallas_kg", nombre: "Toallas sanitarias" }
              ]
            },
            {
              id: 12,
              nombre: "ELECTRODOMÉSTICOS",
              subcategorias: [
                { campo: "electrodomestico_linea_blanca_kg", nombre: "Línea blanca" },
                { campo: "electrodomestico_electronicos_kg", nombre: "Electrónicos" }
              ]
            },
            {
              id: 13,
              nombre: "PELIGROSOS Y ESPECIALES",
              subcategorias: [
                { campo: "peligroso_pilas_kg", nombre: "Pilas" },
                { campo: "peligroso_fluorescentes_kg", nombre: "Fluorescentes" },
                { campo: "peligroso_fertilizantes_kg", nombre: "Fertilizantes" },
                { campo: "peligroso_plaguicidas_kg", nombre: "Plaguicidas" }
              ]
            },
            {
              id: 14,
              nombre: "INERTES",
              subcategorias: [
                { campo: "inerte_tierra_kg", nombre: "Tierra" },
                { campo: "inerte_ceramica_kg", nombre: "Cerámica" },
                { campo: "inerte_otros_kg", nombre: "Otros" }
              ]
            },
            {
              id: 15,
              nombre: "OTROS",
              subcategorias: [
                { campo: "otros_kg", nombre: "Otros desechos" }
              ]
            }
          ];

          // Nombres cortos para los gráficos
          const nombresCortos = {
            "MATERIA ORGÁNICA": "Mat. Orgánica",
            "GRASAS Y ACEITES": "Grasas y Aceites",
            "MEDICINA": "Medicina",
            "PAPELES Y CARTÓN": "Papel y Cartón",
            "PLÁSTICOS": "Plásticos",
            "VIDRIOS": "Vidrios",
            "METALES": "Metales",
            "TEXTIL": "Textil",
            "CAUCHO Y CUERO": "Caucho y Cuero",
            "MADERA": "Madera",
            "HIGIÉNICOS": "Higiénicos",
            "ELECTRODOMÉSTICOS": "Electrodomésticos",
            "PELIGROSOS Y ESPECIALES": "Peligrosos",
            "INERTES": "Inertes",
            "OTROS": "Otros"
          };

          function getChartTypeName(type) {
            const names = {
              'bar': 'Gráfico de Barras',
              'pie': 'Gráfico Circular',
              'line': 'Gráfico de Líneas'
            };
            return names[type] || type;
          }

          function calcularIntervaloDinamico(maxValue) {
            if (maxValue === 0) return { max: 10, stepSize: 2 };
            
            let yAxisMax;
            
            if (maxValue < 5) {
              yAxisMax = Math.ceil(maxValue * 1.5);
            } else if (maxValue < 20) {
              yAxisMax = Math.ceil(maxValue * 1.3);
            } else if (maxValue < 100) {
              yAxisMax = Math.ceil(maxValue * 1.2);
            } else if (maxValue < 500) {
              yAxisMax = Math.ceil(maxValue * 1.15);
            } else {
              yAxisMax = Math.ceil(maxValue * 1.1);
            }
            
            const rangos = [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000, 2000, 5000];
            let intervalo = 1;
            
            for (let i = 0; i < rangos.length; i++) {
              if (yAxisMax / rangos[i] <= 15) {
                intervalo = rangos[i];
                break;
              }
            }
            
            yAxisMax = Math.ceil(yAxisMax / intervalo) * intervalo;
            
            if (yAxisMax <= maxValue) {
              yAxisMax = maxValue + intervalo;
            }
            
            const stepSize = intervalo;
            
            return { max: yAxisMax, stepSize: stepSize };
          }

          async function initApp() {
            await cargarTodosLosDatos();
            await inicializarFiltros();
            await actualizar();
            setupEventListeners();
          }

          function setupEventListeners() {
            selectLugar.addEventListener('change', async function() {
              await actualizar();
            });
            
            document.querySelectorAll('.chart-action-btn').forEach(btn => {
              btn.addEventListener('click', function() {
                document.querySelectorAll('.chart-action-btn').forEach(b => {
                  b.classList.remove('active');
                });
                
                this.classList.add('active');
                
                currentChartType = this.getAttribute('data-chart-type');
                
                if (currentData.length > 0) {
                  const resumenCategorias = calcularResumenPorCategorias(currentData);
                  renderChart(resumenCategorias.categorias, resumenCategorias.valores, currentChartType);
                }
              });
            });
            
            btnResetFilters.addEventListener('click', function() {
              selectLugar.value = '';
              actualizar();
            });
          }

          async function cargarTodosLosDatos() {
            const q = await supabase.from('caracterizacion_desechos_daule').select('*');
            if (q.error) {
              console.error(q.error);
              return;
            }
            allData = q.data || [];
          }

          async function inicializarFiltros() {
            const q = await supabase.from('caracterizacion_desechos_daule').select('lugar');
            if (q.error) {
              console.error(q.error);
              return;
            }
            const rows = q.data || [];

            filterOptions.lugares = [...new Set(rows.map(r => r.lugar).filter(Boolean))].sort();

            lugarInfo.textContent = \`\${filterOptions.lugares.length} ubicaciones disponibles\`;

            llenarSelector(selectLugar, filterOptions.lugares);
          }

          function llenarSelector(selector, opciones) {
            const valorActual = selector.value;
            
            selector.innerHTML = '<option value="">Todas las ubicaciones</option>';
            
            opciones.forEach(opcion => {
              const opt = document.createElement('option');
              opt.value = opcion;
              opt.textContent = opcion;
              selector.appendChild(opt);
            });
            
            if (valorActual && opciones.includes(valorActual)) {
              selector.value = valorActual;
            }
          }

          async function obtenerFiltrados() {
            let q = supabase.from('caracterizacion_desechos_daule').select('*');
            if (selectLugar.value) q = q.eq('lugar', selectLugar.value);
            
            const r = await q;
            if (r.error) {
              console.error(r.error);
              return [];
            }
            return r.data || [];
          }

          function calcularResumenPorCategorias(rows) {
            if (!rows || rows.length === 0) {
              return {
                categorias: [],
                valores: [],
                totalSum: 0,
                detalles: []
              };
            }
            
            const valoresPorCategoria = Array(categoriasPrincipales.length).fill(0);
            const detallesPorCategoria = [];
            
            rows.forEach(row => {
              categoriasPrincipales.forEach((categoria, idx) => {
                categoria.subcategorias.forEach(subcategoria => {
                  const valor = parseFloat(row[subcategoria.campo]) || 0;
                  valoresPorCategoria[idx] += valor;
                });
              });
            });
            
            categoriasPrincipales.forEach((categoria, idx) => {
              const totalCategoria = valoresPorCategoria[idx];
              
              const subcategoriasConValores = categoria.subcategorias.map(subcategoria => {
                let subtotal = 0;
                rows.forEach(row => {
                  subtotal += parseFloat(row[subcategoria.campo]) || 0;
                });
                return {
                  nombre: subcategoria.nombre,
                  valor: subtotal
                };
              }).filter(sub => sub.valor > 0);
              
              if (totalCategoria > 0 || subcategoriasConValores.length > 0) {
                detallesPorCategoria.push({
                  categoria: categoria.nombre,
                  total: totalCategoria,
                  subcategorias: subcategoriasConValores
                });
              }
            });
            
            const totalSum = valoresPorCategoria.reduce((a, b) => a + b, 0);
            
            const categoriasConValores = [];
            const valoresFiltrados = [];
            
            detallesPorCategoria.forEach((detalle, idx) => {
              if (detalle.total > 0) {
                categoriasConValores.push(nombresCortos[detalle.categoria] || detalle.categoria);
                valoresFiltrados.push(detalle.total);
              }
            });
            
            return {
              categorias: categoriasConValores,
              valores: valoresFiltrados,
              totalSum: totalSum,
              detalles: detallesPorCategoria
            };
          }

          function renderChart(labels, values, chartType) {
            if (mainChart) mainChart.destroy();
            
            const totalSum = values.reduce((a, b) => a + b, 0);
            const percentages = values.map(v => totalSum > 0 ? ((v / totalSum) * 100) : 0);
            const percentageLabels = percentages.map(p => p.toFixed(1) + '%');
            
            const maxValue = Math.max(...values);
            
            const { max: yAxisMax, stepSize } = calcularIntervaloDinamico(maxValue);
            
            const colors = [
              '#4f46e5', '#0ea5e9', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6',
              '#06b6d4', '#84cc16', '#f97316', '#ec4899', '#a855f7', '#6366f1',
              '#14b8a6', '#f43f5e', '#8b5cf6'
            ].slice(0, labels.length);
            
            const baseConfig = {
              data: {
                labels: labels,
                datasets: [{
                  label: 'Peso (kg)',
                  data: values,
                  backgroundColor: chartType === 'line' ? '#0f766e' : colors,
                  borderColor: chartType === 'line' ? '#0f766e' : colors.map(c => c.replace(')', ', 0.8)')),
                  borderWidth: chartType === 'line' ? 3 : 1,
                  pointBackgroundColor: colors,
                  pointBorderColor: '#ffffff',
                  pointBorderWidth: 2,
                  pointRadius: chartType === 'line' ? 6 : 0,
                  pointHoverRadius: chartType === 'line' ? 8 : 0,
                  fill: chartType === 'line' ? {
                    target: 'origin',
                    above: 'rgba(15, 118, 110, 0.1)'
                  } : undefined,
                  tension: chartType === 'line' ? 0.4 : 0
                }]
              },
              options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: chartType === 'pie',
                    position: 'right',
                    labels: {
                      font: {
                        size: 11
                      },
                      generateLabels: function(chart) {
                        if (chartType === 'pie') {
                          const original = window.Chart.defaults.plugins.legend.labels.generateLabels;
                          const labels = original.call(this, chart);
                          labels.forEach((label, i) => {
                            label.text += \` (\${percentageLabels[i]})\`;
                          });
                          return labels;
                        }
                        return window.Chart.defaults.plugins.legend.labels.generateLabels.call(this, chart);
                      }
                    }
                  },
                  title: {
                    display: true,
                    text: \`Distribución de Desechos Sólidos por Categoría - \${getChartTypeName(chartType)}\`,
                    font: {
                      size: 16,
                      weight: 'bold'
                    },
                    padding: 20
                  },
                  tooltip: {
                    callbacks: {
                      label: function(context) {
                        let label = context.dataset.label || '';
                        if (label) label += ': ';
                        const value = context.parsed !== undefined ? context.parsed : context.raw;
                        label += value.toFixed(2) + ' kg';
                        const percentage = totalSum > 0 ? (value / totalSum * 100).toFixed(1) : 0;
                        label += \` (\${percentage}%)\`;
                        return label;
                      }
                    }
                  },
                  datalabels: {
                    display: chartType !== 'line',
                    color: '#1e293b',
                    font: {
                      size: 11,
                      weight: 'bold'
                    },
                    formatter: function(value, context) {
                      const percentage = totalSum > 0 ? ((value / totalSum) * 100).toFixed(1) : 0;
                      return percentage + '%';
                    },
                    anchor: chartType === 'pie' ? 'end' : 'end',
                    align: chartType === 'pie' ? 'end' : 'top',
                    offset: chartType === 'pie' ? 0 : 4
                  }
                }
              }
            };
            
            if (chartType === 'bar') {
              baseConfig.options.scales = {
                y: {
                  beginAtZero: true,
                  max: yAxisMax,
                  title: {
                    display: true,
                    text: 'Peso (kg)',
                    font: { size: 14, weight: 'bold' },
                    padding: { top: 20, bottom: 10 }
                  },
                  ticks: {
                    callback: function(value) {
                      return Number.isInteger(value) ? value.toString() : value.toFixed(1);
                    },
                    padding: 20,
                    stepSize: stepSize,
                    maxTicksLimit: 15,
                    font: {
                      size: 12
                    }
                  },
                  grid: {
                    drawBorder: false
                  }
                },
                x: {
                  title: {
                    display: true,
                    text: 'Categorías de Desechos',
                    font: { size: 14, weight: 'bold' },
                    padding: { top: 10, bottom: 20 }
                  },
                  ticks: {
                    maxRotation: 45,
                    minRotation: 45,
                    padding: 10,
                    font: {
                      size: 11
                    },
                    autoSkip: true,
                    maxTicksLimit: 15
                  },
                  grid: {
                    display: false
                  }
                }
              };
              baseConfig.options.barPercentage = 0.7;
              baseConfig.options.categoryPercentage = 0.8;
            } else if (chartType === 'line') {
              baseConfig.options.scales = {
                y: {
                  beginAtZero: true,
                  max: yAxisMax,
                  title: {
                    display: true,
                    text: 'Peso (kg)',
                    font: { size: 14, weight: 'bold' }
                  },
                  ticks: {
                    stepSize: stepSize,
                    font: {
                      size: 12
                    }
                  }
                },
                x: {
                  title: {
                    display: true,
                    text: 'Categorías de Desechos',
                    font: { size: 14, weight: 'bold' }
                  },
                  ticks: {
                    maxRotation: 45,
                    minRotation: 45,
                    font: {
                      size: 11
                    }
                  }
                }
              };
            }
            
            mainChart = new window.Chart(mainCtx, {
              type: chartType,
              ...baseConfig
            });
          }

          function renderResumen(currentSummary) {
            tbody.innerHTML = '';
            
            summaryEncuestas.textContent = currentData.length;
            
            const ubicacionesUnicas = [...new Set(currentData.map(r => r.lugar).filter(Boolean))];
            summaryUbicaciones.textContent = ubicacionesUnicas.length;
            
            summaryTotalKg.textContent = currentSummary.totalSum.toFixed(2) + ' kg';
            
            const promedioPorEncuesta = currentData.length > 0 ? currentSummary.totalSum / currentData.length : 0;
            summaryPromedio.textContent = promedioPorEncuesta.toFixed(2) + ' kg';
            
            let totalGeneral = 0;
            let esPrimeraCategoria = true;
            
            currentSummary.detalles.forEach((detalle, index) => {
              if (detalle.total > 0) {
                if (!esPrimeraCategoria) {
                  const separador = document.createElement('tr');
                  separador.innerHTML = \`<td colspan="3" style="padding: 8px 0; background-color: #f8fafc;"></td>\`;
                  tbody.appendChild(separador);
                }
                
                const trCategoria = document.createElement('tr');
                trCategoria.style.backgroundColor = '#f0f9ff';
                trCategoria.style.fontWeight = '600';
                trCategoria.innerHTML = \`
                  <td><strong>\${detalle.categoria}</strong></td>
                  <td style="text-align:right"></td>
                  <td style="text-align:right"></td>
                \`;
                tbody.appendChild(trCategoria);
                
                totalGeneral += detalle.total;
                
                detalle.subcategorias.forEach(subcategoria => {
                  const porcentajeSubcategoria = currentSummary.totalSum > 0 ? 
                    ((subcategoria.valor / currentSummary.totalSum) * 100).toFixed(2) + '%' : '0.00%';
                  
                  const trSubcategoria = document.createElement('tr');
                  trSubcategoria.style.backgroundColor = '#f8fafc';
                  trSubcategoria.innerHTML = \`
                    <td style="padding-left: 40px;">\${subcategoria.nombre}</td>
                    <td style="text-align:right">\${subcategoria.valor.toFixed(2)}</td>
                    <td style="text-align:right">\${porcentajeSubcategoria}</td>
                  \`;
                  tbody.appendChild(trSubcategoria);
                });
                
                const porcentajeCategoria = currentSummary.totalSum > 0 ? 
                  ((detalle.total / currentSummary.totalSum) * 100).toFixed(2) + '%' : '0.00%';
                
                const trTotalCategoria = document.createElement('tr');
                trTotalCategoria.style.backgroundColor = '#e6f7f4';
                trTotalCategoria.style.fontWeight = '600';
                trTotalCategoria.innerHTML = \`
                  <td style="padding-left: 20px;"><strong>TOTAL \${detalle.categoria}</strong></td>
                  <td style="text-align:right"><strong>\${detalle.total.toFixed(2)}</strong></td>
                  <td style="text-align:right"><strong>\${porcentajeCategoria}</strong></td>
                \`;
                tbody.appendChild(trTotalCategoria);
                
                esPrimeraCategoria = false;
              }
            });
            
            if (currentSummary.detalles.length === 0) {
              const trVacio = document.createElement('tr');
              trVacio.innerHTML = \`
                <td colspan="3" style="text-align:center; padding:40px; color:var(--muted);">
                  No hay datos disponibles para los filtros seleccionados
                </td>
              \`;
              tbody.appendChild(trVacio);
            } else {
              const totalRow = document.createElement('tr');
              totalRow.className = 'total-row';
              totalRow.innerHTML = \`
                <td><strong>TOTAL GENERAL</strong></td>
                <td style="text-align:right"><strong>\${totalGeneral.toFixed(2)}</strong></td>
                <td style="text-align:right"><strong>100.00%</strong></td>
              \`;
              tbody.appendChild(totalRow);
            }
          }

          async function actualizar() {
            try {
              currentData = await obtenerFiltrados();
              
              const currentSummary = calcularResumenPorCategorias(currentData);
              
              renderChart(currentSummary.categorias, currentSummary.valores, currentChartType);
              renderResumen(currentSummary);
              
            } catch (err) {
              console.error(err);
              alert('Error al actualizar. Revisa la consola para más detalles.');
            }
          }

          await initApp();

        })();
        </script>
      `,
        }}
      />
    </>
  )
}
