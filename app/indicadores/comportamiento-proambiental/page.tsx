"use client"

import { Navigation } from "@/components/navigation"
import Script from "next/script"

export default function ComportamientoProambientalPage() {
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

      <Script
        id="supabase-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.SUPABASE_URL = "${process.env.NEXT_PUBLIC_SUPABASE_URL}";
            window.SUPABASE_ANON_KEY = "${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}";
            console.log("[v0] Supabase credentials loaded");
          `,
        }}
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
          
          .question-charts {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(600px, 1fr));
            gap: 24px;
            margin-top: 20px;
          }
          
          .question-chart-card {
            background: white;
            border-radius: 10px;
            padding: 20px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
            border: 1px solid var(--border);
          }
          
          .question-chart-card h3 {
            color: var(--primary);
            margin-bottom: 16px;
            font-size: 16px;
            font-weight: 600;
            line-height: 1.4;
          }
          
          .question-chart-container {
            position: relative;
            height: 400px;
            margin-top: 20px;
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
          
          .category-section {
            margin-bottom: 32px;
          }
          
          .category-title {
            color: var(--primary);
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 16px;
            padding-bottom: 8px;
            border-bottom: 1px solid var(--border);
          }
          
          .table-responsive {
            overflow-x: auto;
          }

          /* Improved mobile responsiveness */
          .container {
            padding: 0.5rem;
          }

          .controls {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 0.5rem;
            margin-bottom: 20px;
          }
          
          .controls select {
            font-size: 14px;
            padding: 0.5rem;
          }
          
          .chart-container {
            height: 350px;
            padding: 0.5rem;
          }
          
          .summary-cards {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
            margin-bottom: 2rem;
          }
          
          .summary-card {
            padding: 0.75rem;
          }
          
          .summary-card .value {
            font-size: 1.25rem;
          }
          
          .charts-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          
          .question-charts {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          
          .question-chart-container {
            height: 300px;
            padding: 0.5rem;
          }
          
          .question-chart-container h3 {
            font-size: 0.875rem;
            padding: 0.5rem;
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
          
          .tab-button {
            font-size: 0.875rem;
            padding: 0.5rem 1rem;
            white-space: nowrap;
          }
          
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
            
            .question-charts {
              grid-template-columns: 1fr;
              gap: 1rem;
            }
            
            .question-chart-container {
              height: 350px;
              padding: 0.5rem;
            }
            
            .question-chart-container h3 {
              font-size: 0.875rem;
              padding: 0.5rem;
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
            
            .tab-button {
              font-size: 0.875rem;
              padding: 0.5rem 1rem;
              white-space: nowrap;
            }
          }
          
          @media (max-width: 480px) {
            /* Extra small devices adjustments */
            .chart-container {
              height: 300px;
            }
            
            .question-chart-container {
              height: 250px;
            }
            
            .summary-card .value {
              font-size: 1.125rem;
            }
            
            table {
              font-size: 0.75rem;
            }
            
            th, td {
              padding: 0.375rem;
            }
          }
        </style>
        
        <div class="dashboard-container">
          <div class="card">
            <div class="card-title">
              <i class="fas fa-sliders-h"></i>
              Filtros de Análisis
            </div>
            
            <div class="controls">
              <div class="control-group">
                <label for="selectEstadoCivil"><i class="fas fa-heart"></i> Estado Civil</label>
                <select id="selectEstadoCivil">
                  <option value="">Todos los estados civiles</option>
                </select>
                <div class="filter-info" id="estadoCivilInfo">Cargando...</div>
              </div>

              <div class="control-group">
                <label for="selectEducacion"><i class="fas fa-graduation-cap"></i> Nivel de Educación</label>
                <select id="selectEducacion">
                  <option value="">Todos los niveles</option>
                </select>
                <div class="filter-info" id="educacionInfo">Cargando...</div>
              </div>

              <div class="control-group">
                <label for="selectSituacionLaboral"><i class="fas fa-briefcase"></i> Situación Laboral</label>
                <select id="selectSituacionLaboral">
                  <option value="">Todas las situaciones</option>
                </select>
                <div class="filter-info" id="situacionLaboralInfo">Cargando...</div>
              </div>

              <div class="control-group">
                <label for="selectIngreso"><i class="fas fa-money-bill-wave"></i> Ingreso Mensual</label>
                <select id="selectIngreso">
                  <option value="">Todos los ingresos</option>
                </select>
                <div class="filter-info" id="ingresoInfo">Cargando...</div>
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
                  <i class="fas fa-users"></i> Total de Encuestados
                </div>
                <div class="summary-value" id="summaryTotal">0</div>
                <div class="summary-subtitle">
                  <span>Muestra representativa del cantón</span>
                </div>
              </div>
              <div class="summary-card">
                <div class="summary-title">
                  <i class="fas fa-home"></i> Tipo de Hogar Predominante
                </div>
                <div class="summary-value" id="summaryHogar">-</div>
                <div class="summary-subtitle" id="summaryHogarChange">
                  <span>% del total</span>
                </div>
              </div>
              <div class="summary-card">
                <div class="summary-title">
                  <i class="fas fa-user-graduate"></i> Educación Predominante
                </div>
                <div class="summary-value" id="summaryEducacion">-</div>
                <div class="summary-subtitle" id="summaryEducacionChange">
                  <span>% del total</span>
                </div>
              </div>
              <div class="summary-card">
                <div class="summary-title">
                  <i class="fas fa-briefcase"></i> Situación Laboral Predominante
                </div>
                <div class="summary-value" id="summaryLaboral">-</div>
                <div class="summary-subtitle" id="summaryLaboralChange">
                  <span>% del total</span>
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
              <button class="chart-action-btn" data-chart-type="bar">
                <i class="fas fa-chart-bar"></i> Barras
              </button>
              <button class="chart-action-btn active" data-chart-type="pie">
                <i class="fas fa-chart-pie"></i> Torta
              </button>
              <button class="chart-action-btn" data-chart-type="line">
                <i class="fas fa-chart-line"></i> Líneas
              </button>
            </div>
            
            <div class="tabs">
              <div class="tab active" data-tab="demographics">Distribución Demográfica</div>
              <div class="tab" data-tab="sociocultural">Determinantes Socioculturales</div>
              <div class="tab" data-tab="afectivos">Determinantes Afectivos</div>
              <div class="tab" data-tab="cognitivos">Determinantes Cognitivos</div>
              <div class="tab" data-tab="ambiental">Sustentabilidad Ambiental</div>
              <div class="tab" data-tab="economica">Sustentabilidad Económica</div>
              <div class="tab" data-tab="comunitario">Desarrollo Comunitario</div>
            </div>
            
            <div class="tab-content active" id="demographics">
              <div class="charts-grid">
                <div class="chart-card">
                  <h3>Distribución por Estado Civil</h3>
                  <div class="chart-container-sm">
                    <canvas id="estadoCivilChart"></canvas>
                  </div>
                </div>
                <div class="chart-card">
                  <h3>Distribución por Nivel Educativo</h3>
                  <div class="chart-container-sm">
                    <canvas id="educacionChart"></canvas>
                  </div>
                </div>
                <div class="chart-card">
                  <h3>Distribución por Situación Laboral</h3>
                  <div class="chart-container-sm">
                    <canvas id="laboralChart"></canvas>
                  </div>
                </div>
                <div class="chart-card">
                  <h3>Distribución por Ingreso Mensual</h3>
                  <div class="chart-container-sm">
                    <canvas id="ingresoChart"></canvas>
                  </div>
                </div>
                <div class="chart-card">
                  <h3>Distribución por Tipo de Hogar</h3>
                  <div class="chart-container-sm">
                    <canvas id="hogarChart"></canvas>
                  </div>
                </div>
                <div class="chart-card">
                  <h3>Distribución por Grupos de Edad</h3>
                  <div class="chart-container-sm">
                    <canvas id="edadChart"></canvas>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="tab-content" id="sociocultural">
              <div class="question-charts">
                <div class="question-chart-card">
                  <h3>¿Conoce usted qué son los desechos sólidos domiciliarios?</h3>
                  <div class="question-chart-container">
                    <canvas id="socioculturalChart1"></canvas>
                  </div>
                </div>
                <div class="question-chart-card">
                  <h3>¿Cree usted que existe un comportamiento adecuado en el manejo de los desechos sólidos domiciliarios en la comunidad?</h3>
                  <div class="question-chart-container">
                    <canvas id="socioculturalChart2"></canvas>
                  </div>
                </div>
                <div class="question-chart-card">
                  <h3>¿Se debe separar los desechos sólidos según su tipo ejemplo: (papel - plástico - orgánico - inorgánico)?</h3>
                  <div class="question-chart-container">
                    <canvas id="socioculturalChart3"></canvas>
                  </div>
                </div>
                <div class="question-chart-card">
                  <h3>¿Es importante la correcta clasificación de los desechos sólidos orgánicos e inorgánicos en el hogar?</h3>
                  <div class="question-chart-container">
                    <canvas id="socioculturalChart4"></canvas>
                  </div>
                </div>
                <div class="question-chart-card">
                  <h3>¿Cree que el comportamiento de la comunidad influye en deterioro del medio ambiente?</h3>
                  <div class="question-chart-container">
                    <canvas id="socioculturalChart5"></canvas>
                  </div>
                </div>
                <div class="question-chart-card">
                  <h3>¿Dedica tiempo para reducir, reutilizar y/o reciclar los desechos sólidos que se generan en el hogar?</h3>
                  <div class="question-chart-container">
                    <canvas id="socioculturalChart6"></canvas>
                  </div>
                </div>
                <div class="question-chart-card">
                  <h3>¿Los desechos sólidos son un gran problema para la comunidad?</h3>
                  <div class="question-chart-container">
                    <canvas id="socioculturalChart7"></canvas>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="tab-content" id="afectivos">
              <div class="question-charts">
                <div class="question-chart-card">
                  <h3>¿Le preocupa el exceso de desechos sólidos domiciliarios?</h3>
                  <div class="question-chart-container">
                    <canvas id="afectivosChart1"></canvas>
                  </div>
                </div>
                <div class="question-chart-card">
                  <h3>¿Considera que los desechos sólidos domiciliarios intervienen en las consecuencias climáticas?</h3>
                  <div class="question-chart-container">
                    <canvas id="afectivosChart2"></canvas>
                  </div>
                </div>
                <div class="question-chart-card">
                  <h3>¿Le afecta emocionalmente cuando escucha noticias acerca de los desastres naturales?</h3>
                  <div class="question-chart-container">
                    <canvas id="afectivosChart3"></canvas>
                  </div>
                </div>
                <div class="question-chart-card">
                  <h3>¿Siente frustración debido a la falta de acciones significativas para abordar la generación de los desechos sólidos?</h3>
                  <div class="question-chart-container">
                    <canvas id="afectivosChart4"></canvas>
                  </div>
                </div>
                <div class="question-chart-card">
                  <h3>¿Considera importante pensar en el tipo de planeta que dejaremos a las futuras generaciones?</h3>
                  <div class="question-chart-container">
                    <canvas id="afectivosChart5"></canvas>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="tab-content" id="cognitivos">
              <div class="question-charts">
                <div class="question-chart-card">
                  <h3>¿Es consciente del impacto de los desechos sólidos domiciliarios en el medio ambiente?</h3>
                  <div class="question-chart-container">
                    <canvas id="cognitivosChart1"></canvas>
                  </div>
                </div>
                <div class="question-chart-card">
                  <h3>¿Investiga frecuentemente acerca de temas medio ambientales?</h3>
                  <div class="question-chart-container">
                    <canvas id="cognitivosChart2"></canvas>
                  </div>
                </div>
                <div class="question-chart-card">
                  <h3>¿Conoce las consecuencias de la acumulación de los desechos sólidos domiciliarios?</h3>
                  <div class="question-chart-container">
                    <canvas id="cognitivosChart3"></canvas>
                  </div>
                </div>
                <div class="question-chart-card">
                  <h3>¿Conoce los beneficios de reutilizar un residuo domiciliario?</h3>
                  <div class="question-chart-container">
                    <canvas id="cognitivosChart4"></canvas>
                  </div>
                </div>
                <div class="question-chart-card">
                  <h3>¿La falta de información es un obstáculo para la correcta gestión de los residuos sólidos domiciliario?</h3>
                  <div class="question-chart-container">
                    <canvas id="cognitivosChart5"></canvas>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="tab-content" id="ambiental">
              <div class="question-charts">
                <div class="question-chart-card">
                  <h3>¿Los desechos orgánicos generados en el hogar pueden tener otra funcionalidad?</h3>
                  <div class="question-chart-container">
                    <canvas id="ambientalChart1"></canvas>
                  </div>
                </div>
                <div class="question-chart-card">
                  <h3>¿La acumulación de desechos afectan a la salud de la población?</h3>
                  <div class="question-chart-container">
                    <canvas id="ambientalChart2"></canvas>
                  </div>
                </div>
                <div class="question-chart-card">
                  <h3>¿La reducción, reciclaje y la reutilización de los desechos sólidos puede cuidar al medio ambiente y a la vida silvestre?</h3>
                  <div class="question-chart-container">
                    <canvas id="ambientalChart3"></canvas>
                  </div>
                </div>
                <div class="question-chart-card">
                  <h3>¿Cree que la transformación de desechos sólidos en nuevos productos puede contribuir significativamente a la reducción de la generación de desechos?</h3>
                  <div class="question-chart-container">
                    <canvas id="ambientalChart4"></canvas>
                  </div>
                </div>
                <div class="question-chart-card">
                  <h3>¿Necesita más información acerca de educación ambiental?</h3>
                  <div class="question-chart-container">
                    <canvas id="ambientalChart5"></canvas>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="tab-content" id="economica">
              <div class="question-charts">
                <div class="question-chart-card">
                  <h3>¿En su hogar practica la separación de los desechos para el reciclaje y le representa algún ingreso?</h3>
                  <div class="question-chart-container">
                    <canvas id="economicaChart1"></canvas>
                  </div>
                </div>
                <div class="question-chart-card">
                  <h3>¿Los desechos sólidos generados en el hogar pueden ser reutilizados para una nueva función o creación de un producto?</h3>
                  <div class="question-chart-container">
                    <canvas id="economicaChart2"></canvas>
                  </div>
                </div>
                <div class="question-chart-card">
                  <h3>¿Cree que el manejo adecuado de los desechos sólidos domiciliarios podría aportar al desarrollo económico comunitario?</h3>
                  <div class="question-chart-container">
                    <canvas id="economicaChart3"></canvas>
                  </div>
                </div>
                <div class="question-chart-card">
                  <h3>¿Los emprendimientos en base a la reutilización de los desechos aporta a su economía?</h3>
                  <div class="question-chart-container">
                    <canvas id="economicaChart4"></canvas>
                  </div>
                </div>
                <div class="question-chart-card">
                  <h3>¿El manejo adecuado de los desechos sólidos domiciliarios ofrece oportunidades para el emprendimiento?</h3>
                  <div class="question-chart-container">
                    <canvas id="economicaChart5"></canvas>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="tab-content" id="comunitario">
              <div class="question-charts">
                <div class="question-chart-card">
                  <h3>¿Es posible reducir la generación de residuos sólidos domiciliarios por medio de eventos de concientización?</h3>
                  <div class="question-chart-container">
                    <canvas id="comunitarioChart1"></canvas>
                  </div>
                </div>
                <div class="question-chart-card">
                  <h3>¿Participaría en talleres de buenas prácticas y capacitaciones para el correcto manejo de los desechos sólidos domiciliarios?</h3>
                  <div class="question-chart-container">
                    <canvas id="comunitarioChart2"></canvas>
                  </div>
                </div>
                <div class="question-chart-card">
                  <h3>¿El manejo adecuado de los desechos sólidos domiciliarios puede tener un impacto significativo al medio ambiente?</h3>
                  <div class="question-chart-container">
                    <canvas id="comunitarioChart3"></canvas>
                  </div>
                </div>
                <div class="question-chart-card">
                  <h3>¿Está dispuesto a participar en un emprendimiento en base al uso de los desechos sólidos?</h3>
                  <div class="question-chart-container">
                    <canvas id="comunitarioChart4"></canvas>
                  </div>
                </div>
                <div class="question-chart-card">
                  <h3>¿Participaría a una feria de emprendimientos comunitarios en base a desechos domiciliarios reutilizados?</h3>
                  <div class="question-chart-container">
                    <canvas id="comunitarioChart5"></canvas>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card-title">
              <i class="fas fa-table"></i>
              Tablas Resumen por Categorías
            </div>
            
            <div class="tabs">
              <div class="tab active" data-tab-table="tabla-demografica">Datos Demográficos</div>
              <div class="tab" data-tab-table="tabla-sociocultural">Determinantes Socioculturales</div>
              <div class="tab" data-tab-table="tabla-afectivos">Determinantes Afectivos</div>
              <div class="tab" data-tab-table="tabla-cognitivos">Determinantes Cognitivos</div>
              <div class="tab" data-tab-table="tabla-ambiental">Sustentabilidad Ambiental</div>
              <div class="tab" data-tab-table="tabla-economica">Sustentabilidad Económica</div>
              <div class="tab" data-tab-table="tabla-comunitario">Desarrollo Comunitario</div>
            </div>
            
            <div class="tab-content active" id="tabla-demografica">
              <div class="category-section">
                <div class="category-title">Estado Civil</div>
                <div class="table-responsive">
                  <table>
                    <thead>
                      <tr>
                        <th>Estado Civil</th>
                        <th style="text-align:right">Cantidad</th>
                        <th style="text-align:right">% del Total</th>
                      </tr>
                    </thead>
                    <tbody id="tablaEstadoCivil"></tbody>
                    <tfoot>
                      <tr class="total-row">
                        <td><strong>Total</strong></td>
                        <td style="text-align:right"><strong id="totalEstadoCivil">0</strong></td>
                        <td style="text-align:right"><strong>100%</strong></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
              
              <div class="category-section">
                <div class="category-title">Distribución por Edades</div>
                <div class="table-responsive">
                  <table>
                    <thead>
                      <tr>
                        <th>Grupo de Edad</th>
                        <th style="text-align:right">Cantidad</th>
                        <th style="text-align:right">% del Total</th>
                      </tr>
                    </thead>
                    <tbody id="tablaEdades"></tbody>
                    <tfoot>
                      <tr class="total-row">
                        <td><strong>Total</strong></td>
                        <td style="text-align:right"><strong id="totalEdades">0</strong></td>
                        <td style="text-align:right"><strong>100%</strong></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
              
              <div class="category-section">
                <div class="category-title">Nivel de Educación</div>
                <div class="table-responsive">
                  <table>
                    <thead>
                      <tr>
                        <th>Nivel Educativo</th>
                        <th style="text-align:right">Cantidad</th>
                        <th style="text-align:right">% del Total</th>
                      </tr>
                    </thead>
                    <tbody id="tablaEducacion"></tbody>
                    <tfoot>
                      <tr class="total-row">
                        <td><strong>Total</strong></td>
                        <td style="text-align:right"><strong id="totalEducacion">0</strong></td>
                        <td style="text-align:right"><strong>100%</strong></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
              
              <div class="category-section">
                <div class="category-title">Situación Laboral</div>
                <div class="table-responsive">
                  <table>
                    <thead>
                      <tr>
                        <th>Situación Laboral</th>
                        <th style="text-align:right">Cantidad</th>
                        <th style="text-align:right">% del Total</th>
                      </tr>
                    </thead>
                    <tbody id="tablaLaboral"></tbody>
                    <tfoot>
                      <tr class="total-row">
                        <td><strong>Total</strong></td>
                        <td style="text-align:right"><strong id="totalLaboral">0</strong></td>
                        <td style="text-align:right"><strong>100%</strong></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
              
              <div class="category-section">
                <div class="category-title">Ingreso Mensual</div>
                <div class="table-responsive">
                  <table>
                    <thead>
                      <tr>
                        <th>Nivel de Ingreso</th>
                        <th style="text-align:right">Cantidad</th>
                        <th style="text-align:right">% del Total</th>
                      </tr>
                    </thead>
                    <tbody id="tablaIngreso"></tbody>
                    <tfoot>
                      <tr class="total-row">
                        <td><strong>Total</strong></td>
                        <td style="text-align:right"><strong id="totalIngreso">0</strong></td>
                        <td style="text-align:right"><strong>100%</strong></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
              
              <div class="category-section">
                <div class="category-title">Tipo de Hogar</div>
                <div class="table-responsive">
                  <table>
                    <thead>
                      <tr>
                        <th>Tipo de Hogar</th>
                        <th style="text-align:right">Cantidad</th>
                        <th style="text-align:right">% del Total</th>
                      </tr>
                    </thead>
                    <tbody id="tablaHogar"></tbody>
                    <tfoot>
                      <tr class="total-row">
                        <td><strong>Total</strong></td>
                        <td style="text-align:right"><strong id="totalHogar">0</strong></td>
                        <td style="text-align:right"><strong>100%</strong></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
            
            <div class="tab-content" id="tabla-sociocultural">
              <div class="category-section">
                <div class="category-title">Determinantes Socioculturales</div>
                <div class="table-responsive">
                  <table>
                    <thead>
                      <tr>
                        <th>Pregunta</th>
                        <th style="text-align:center">Totalmente Desacuerdo</th>
                        <th style="text-align:center">Desacuerdo</th>
                        <th style="text-align:center">Indiferente</th>
                        <th style="text-align:center">De Acuerdo</th>
                        <th style="text-align:center">Totalmente Acuerdo</th>
                        <th style="text-align:center">Promedio</th>
                      </tr>
                    </thead>
                    <tbody id="tablaSociocultural"></tbody>
                    <tfoot>
                      <tr class="total-row">
                        <td><strong>Promedio General</strong></td>
                        <td style="text-align:center"><strong id="promedioSocioculturalTD">0%</strong></td>
                        <td style="text-align:center"><strong id="promedioSocioculturalD">0%</strong></td>
                        <td style="text-align:center"><strong id="promedioSocioculturalI">0%</strong></td>
                        <td style="text-align:center"><strong id="promedioSocioculturalA">0%</strong></td>
                        <td style="text-align:center"><strong id="promedioSocioculturalTA">0%</strong></td>
                        <td style="text-align:center"><strong id="promedioSociocultural">0%</strong></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
            
            <div class="tab-content" id="tabla-afectivos">
              <div class="category-section">
                <div class="category-title">Determinantes Afectivos</div>
                <div class="table-responsive">
                  <table>
                    <thead>
                      <tr>
                        <th>Pregunta</th>
                        <th style="text-align:center">Totalmente Desacuerdo</th>
                        <th style="text-align:center">Desacuerdo</th>
                        <th style="text-align:center">Indiferente</th>
                        <th style="text-align:center">De Acuerdo</th>
                        <th style="text-align:center">Totalmente Acuerdo</th>
                        <th style="text-align:center">Promedio</th>
                      </tr>
                    </thead>
                    <tbody id="tablaAfectivos"></tbody>
                    <tfoot>
                      <tr class="total-row">
                        <td><strong>Promedio General</strong></td>
                        <td style="text-align:center"><strong id="promedioAfectivosTD">0%</strong></td>
                        <td style="text-align:center"><strong id="promedioAfectivosD">0%</strong></td>
                        <td style="text-align:center"><strong id="promedioAfectivosI">0%</strong></td>
                        <td style="text-align:center"><strong id="promedioAfectivosA">0%</strong></td>
                        <td style="text-align:center"><strong id="promedioAfectivosTA">0%</strong></td>
                        <td style="text-align:center"><strong id="promedioAfectivos">0%</strong></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
            
            <div class="tab-content" id="tabla-cognitivos">
              <div class="category-section">
                <div class="category-title">Determinantes Cognitivos</div>
                <div class="table-responsive">
                  <table>
                    <thead>
                      <tr>
                        <th>Pregunta</th>
                        <th style="text-align:center">Totalmente Desacuerdo</th>
                        <th style="text-align:center">Desacuerdo</th>
                        <th style="text-align:center">Indiferente</th>
                        <th style="text-align:center">De Acuerdo</th>
                        <th style="text-align:center">Totalmente Acuerdo</th>
                        <th style="text-align:center">Promedio</th>
                      </tr>
                    </thead>
                    <tbody id="tablaCognitivos"></tbody>
                    <tfoot>
                      <tr class="total-row">
                        <td><strong>Promedio General</strong></td>
                        <td style="text-align:center"><strong id="promedioCognitivosTD">0%</strong></td>
                        <td style="text-align:center"><strong id="promedioCognitivosD">0%</strong></td>
                        <td style="text-align:center"><strong id="promedioCognitivosI">0%</strong></td>
                        <td style="text-align:center"><strong id="promedioCognitivosA">0%</strong></td>
                        <td style="text-align:center"><strong id="promedioCognitivosTA">0%</strong></td>
                        <td style="text-align:center"><strong id="promedioCognitivos">0%</strong></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
            
            <div class="tab-content" id="tabla-ambiental">
              <div class="category-section">
                <div class="category-title">Sustentabilidad Ambiental</div>
                <div class="table-responsive">
                  <table>
                    <thead>
                      <tr>
                        <th>Pregunta</th>
                        <th style="text-align:center">Totalmente Desacuerdo</th>
                        <th style="text-align:center">Desacuerdo</th>
                        <th style="text-align:center">Indiferente</th>
                        <th style="text-align:center">De Acuerdo</th>
                        <th style="text-align:center">Totalmente Acuerdo</th>
                        <th style="text-align:center">Promedio</th>
                      </tr>
                    </thead>
                    <tbody id="tablaAmbiental"></tbody>
                    <tfoot>
                      <tr class="total-row">
                        <td><strong>Promedio General</strong></td>
                        <td style="text-align:center"><strong id="promedioAmbientalTD">0%</strong></td>
                        <td style="text-align:center"><strong id="promedioAmbientalD">0%</strong></td>
                        <td style="text-align:center"><strong id="promedioAmbientalI">0%</strong></td>
                        <td style="text-align:center"><strong id="promedioAmbientalA">0%</strong></td>
                        <td style="text-align:center"><strong id="promedioAmbientalTA">0%</strong></td>
                        <td style="text-align:center"><strong id="promedioAmbiental">0%</strong></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
            
            <div class="tab-content" id="tabla-economica">
              <div class="category-section">
                <div class="category-title">Sustentabilidad Económica</div>
                <div class="table-responsive">
                  <table>
                    <thead>
                      <tr>
                        <th>Pregunta</th>
                        <th style="text-align:center">Totalmente Desacuerdo</th>
                        <th style="text-align:center">Desacuerdo</th>
                        <th style="text-align:center">Indiferente</th>
                        <th style="text-align:center">De Acuerdo</th>
                        <th style="text-align:center">Totalmente Acuerdo</th>
                        <th style="text-align:center">Promedio</th>
                      </tr>
                    </thead>
                    <tbody id="tablaEconomica"></tbody>
                    <tfoot>
                      <tr class="total-row">
                        <td><strong>Promedio General</strong></td>
                        <td style="text-align:center"><strong id="promedioEconomicaTD">0%</strong></td>
                        <td style="text-align:center"><strong id="promedioEconomicaD">0%</strong></td>
                        <td style="text-align:center"><strong id="promedioEconomicaI">0%</strong></td>
                        <td style="text-align:center"><strong id="promedioEconomicaA">0%</strong></td>
                        <td style="text-align:center"><strong id="promedioEconomicaTA">0%</strong></td>
                        <td style="text-align:center"><strong id="promedioEconomica">0%</strong></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
            
            <div class="tab-content" id="tabla-comunitario">
              <div class="category-section">
                <div class="category-title">Desarrollo Comunitario</div>
                <div class="table-responsive">
                  <table>
                    <thead>
                      <tr>
                        <th>Pregunta</th>
                        <th style="text-align:center">Totalmente Desacuerdo</th>
                        <th style="text-align:center">Desacuerdo</th>
                        <th style="text-align:center">Indiferente</th>
                        <th style="text-align:center">De Acuerdo</th>
                        <th style="text-align:center">Totalmente Acuerdo</th>
                        <th style="text-align:center">Promedio</th>
                      </tr>
                    </thead>
                    <tbody id="tablaComunitario"></tbody>
                    <tfoot>
                      <tr class="total-row">
                        <td><strong>Promedio General</strong></td>
                        <td style="text-align:center"><strong id="promedioComunitarioTD">0%</strong></td>
                        <td style="text-align:center"><strong id="promedioComunitarioD">0%</strong></td>
                        <td style="text-align:center"><strong id="promedioComunitarioI">0%</strong></td>
                        <td style="text-align:center"><strong id="promedioComunitarioA">0%</strong></td>
                        <td style="text-align:center"><strong id="promedioComunitarioTA">0%</strong></td>
                        <td style="text-align:center"><strong id="promedioComunitario">0%</strong></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
        
        <script>
          (async function() {
            console.log('[v0] Waiting for scripts to load...');
            
            // Wait for all scripts to load
            while (!window.supabase || !window.Chart || !window.ChartDataLabels || !window.SUPABASE_URL || !window.SUPABASE_ANON_KEY) {
              await new Promise(resolve => setTimeout(resolve, 100));
            }
            
            console.log('[v0] All scripts loaded, initializing dashboard...');
            
            const { createClient } = window.supabase;
            const supabase = createClient(
              window.SUPABASE_URL,
              window.SUPABASE_ANON_KEY
            );
            
            console.log('[v0] Supabase client created');
            
            // Register Chart.js plugin
            window.Chart.register(window.ChartDataLabels);
            
            let currentData = [];
            let currentChartType = 'pie';
            
            const selectEstadoCivil = document.getElementById('selectEstadoCivil');
            const selectEducacion = document.getElementById('selectEducacion');
            const selectSituacionLaboral = document.getElementById('selectSituacionLaboral');
            const selectIngreso = document.getElementById('selectIngreso');
            
            async function inicializar() {
              console.log('[v0] Loading filter options...');
              await cargarFiltros();
              console.log('[v0] Loading data...');
              await actualizar();
              setupEventListeners();
            }
            
            async function cargarFiltros() {
              console.log('[v0] Fetching filter options from Supabase...');
              const { data, error } = await supabase
                .from('cuestionario_comportamiento_proambiental_autosustentabilidad')
                .select('estado_civil, educacion_jefe_hogar, situacion_laboral_jefe_hogar, ingreso_mensual_jefe_hogar');
              
              if (error) {
                console.error('[v0] Error loading filters:', error);
                alert('Error al cargar los filtros. Por favor, verifica la conexión a la base de datos.');
                return;
              }
              
              console.log('[v0] Loaded ' + data.length + ' records for filters');

              const estadosCiviles = [...new Set(data.map(r => r.estado_civil).filter(Boolean))].sort();
              const nivelesEducacion = [...new Set(data.map(r => r.educacion_jefe_hogar).filter(Boolean))].sort();
              const situacionesLaborales = [...new Set(data.map(r => r.situacion_laboral_jefe_hogar).filter(Boolean))].sort();
              const nivelesIngreso = [...new Set(data.map(r => r.ingreso_mensual_jefe_hogar).filter(Boolean))].sort();
              
              llenarSelector(selectEstadoCivil, estadosCiviles);
              llenarSelector(selectEducacion, nivelesEducacion);
              llenarSelector(selectSituacionLaboral, situacionesLaborales);
              llenarSelector(selectIngreso, nivelesIngreso);
              
              document.getElementById('estadoCivilInfo').textContent = estadosCiviles.length + ' estados civiles disponibles';
              document.getElementById('educacionInfo').textContent = nivelesEducacion.length + ' niveles educativos disponibles';
              document.getElementById('situacionLaboralInfo').textContent = situacionesLaborales.length + ' situaciones laborales disponibles';
              document.getElementById('ingresoInfo').textContent = nivelesIngreso.length + ' niveles de ingreso disponibles';
            }
            
            function llenarSelector(selector, opciones) {
              opciones.forEach(opcion => {
                const option = document.createElement('option');
                option.value = opcion;
                option.textContent = opcion;
                selector.appendChild(option);
              });
            }
            
            async function obtenerFiltrados() {
              console.log('[v0] Fetching filtered data...');
              let query = supabase.from('cuestionario_comportamiento_proambiental_autosustentabilidad').select('*');
              
              if (selectEstadoCivil.value) {
                query = query.eq('estado_civil', selectEstadoCivil.value);
                console.log('[v0] Filtering by estado_civil:', selectEstadoCivil.value);
              }
              if (selectEducacion.value) {
                query = query.eq('educacion_jefe_hogar', selectEducacion.value);
                console.log('[v0] Filtering by educacion:', selectEducacion.value);
              }
              if (selectSituacionLaboral.value) {
                query = query.eq('situacion_laboral_jefe_hogar', selectSituacionLaboral.value);
                console.log('[v0] Filtering by situacion_laboral:', selectSituacionLaboral.value);
              }
              if (selectIngreso.value) {
                query = query.eq('ingreso_mensual_jefe_hogar', selectIngreso.value);
                console.log('[v0] Filtering by ingreso:', selectIngreso.value);
              }
              
              const { data, error } = await query;
              
              if (error) {
                console.error('[v0] Error filtering data:', error);
                alert('Error al obtener los datos filtrados.');
                return [];
              }
              
              console.log('[v0] Fetched ' + (data ? data.length : 0) + ' filtered records');
              return data || [];
            }
            
            function calcularDistribuciones(rows) {
              const estadoCivilCounts = {};
              rows.forEach(row => {
                if (row.estado_civil) {
                  estadoCivilCounts[row.estado_civil] = (estadoCivilCounts[row.estado_civil] || 0) + 1;
                }
              });
              const totalEstadoCivil = Object.values(estadoCivilCounts).reduce((a, b) => a + b, 0);
              const estadoCivil = {};
              Object.keys(estadoCivilCounts).forEach(key => {
                estadoCivil[key] = totalEstadoCivil > 0 ? (estadoCivilCounts[key] / totalEstadoCivil) * 100 : 0;
              });
              
              const age0_10 = rows.filter(row => row.edad_0_10 > 0).length;
              const age11_25 = rows.filter(row => row.edad_11_25 > 0).length;
              const age26_50 = rows.filter(row => row.edad_26_50 > 0).length;
              const age51_90 = rows.filter(row => row.edad_51_90 > 0).length;
              const totalAge = age0_10 + age11_25 + age26_50 + age51_90;
              
              const edad = {
                '0-10 años': totalAge > 0 ? (age0_10 / totalAge) * 100 : 0,
                '11-25 años': totalAge > 0 ? (age11_25 / totalAge) * 100 : 0,
                '26-50 años': totalAge > 0 ? (age26_50 / totalAge) * 100 : 0,
                '51-90 años': totalAge > 0 ? (age51_90 / totalAge) * 100 : 0
              };
              
              const educacionCounts = {};
              rows.forEach(row => {
                if (row.educacion_jefe_hogar) {
                  educacionCounts[row.educacion_jefe_hogar] = (educacionCounts[row.educacion_jefe_hogar] || 0) + 1;
                }
              });
              const totalEducacion = Object.values(educacionCounts).reduce((a, b) => a + b, 0);
              const educacion = {};
              Object.keys(educacionCounts).forEach(key => {
                educacion[key] = totalEducacion > 0 ? (educacionCounts[key] / totalEducacion) * 100 : 0;
              });
              
              const laboralCounts = {};
              rows.forEach(row => {
                if (row.situacion_laboral_jefe_hogar) {
                  laboralCounts[row.situacion_laboral_jefe_hogar] = (laboralCounts[row.situacion_laboral_jefe_hogar] || 0) + 1;
                }
              });
              const totalLaboral = Object.values(laboralCounts).reduce((a, b) => a + b, 0);
              const laboral = {};
              Object.keys(laboralCounts).forEach(key => {
                laboral[key] = totalLaboral > 0 ? (laboralCounts[key] / totalLaboral) * 100 : 0;
              });
              
              const ingresoCounts = {};
              rows.forEach(row => {
                if (row.ingreso_mensual_jefe_hogar) {
                  ingresoCounts[row.ingreso_mensual_jefe_hogar] = (ingresoCounts[row.ingreso_mensual_jefe_hogar] || 0) + 1;
                }
              });
              const totalIngreso = Object.values(ingresoCounts).reduce((a, b) => a + b, 0);
              const ingreso = {};
              Object.keys(ingresoCounts).forEach(key => {
                ingreso[key] = totalIngreso > 0 ? (ingresoCounts[key] / totalIngreso) * 100 : 0;
              });
              
              const hogarCounts = {};
              rows.forEach(row => {
                if (row.tipo_hogar) {
                  hogarCounts[row.tipo_hogar] = (hogarCounts[row.tipo_hogar] || 0) + 1;
                }
              });
              const totalHogar = Object.values(hogarCounts).reduce((a, b) => a + b, 0);
              const hogar = {};
              Object.keys(hogarCounts).forEach(key => {
                hogar[key] = totalHogar > 0 ? (hogarCounts[key] / totalHogar) * 100 : 0;
              });
              
              return {
                estadoCivil,
                edad,
                educacion,
                laboral,
                ingreso,
                hogar,
                counts: {
                  estadoCivil: estadoCivilCounts,
                  edad: { '0-10 años': age0_10, '11-25 años': age11_25, '26-50 años': age26_50, '51-90 años': age51_90 },
                  educacion: educacionCounts,
                  laboral: laboralCounts,
                  ingreso: ingresoCounts,
                  hogar: hogarCounts
                }
              };
            }
            
            function calcularDistribucionesLikert(rows) {
              const categorias = {
                sociocultural: [
                  'conoce_desechos_solidos',
                  'cree_comportamiento_adecuado_manejo',
                  'separar_desechos_por_origen',
                  'clasificacion_correcta_desechos',
                  'comportamiento_comunidad_influye',
                  'dedica_tiempo_reducir_reutilizar_reciclar',
                  'desechos_solidos_problema_comunidad'
                ],
                afectivos: [
                  'preocupa_exceso_desechos',
                  'desechos_contaminan_ambiente',
                  'afecta_emocionalmente_noticias_contaminacion',
                  'frustracion_falta_acciones_ambientales',
                  'importancia_planeta_futuras_generaciones'
                ],
                cognitivos: [
                  'consciente_impacto_desechos_salud',
                  'investiga_temas_ambientales',
                  'consecuencias_acumulacion_desechos',
                  'beneficios_reutilizar_residuo',
                  'falta_informacion_obstaculo_gestion'
                ],
                ambiental: [
                  'desechos_organicos_funcionalidad',
                  'acumulacion_desechos_afecta_salud',
                  'reduccion_reciclaje_reutilizacion_cuida_ambiente',
                  'transformacion_desechos_nuevos_productos',
                  'necesita_info_educacion_ambiental'
                ],
                economica: [
                  'practica_separacion_reciclaje_ingreso',
                  'desechos_hogar_reutilizados',
                  'manejo_adecuado_desechos_aporta_desarrollo',
                  'emprendimientos_reutilizacion_aportan_economia',
                  'manejo_adecuado_desechos_oportunidad_emprendimiento'
                ],
                comunitario: [
                  'reducir_residuos_eventos_concientizacion',
                  'participaria_talleres_buenas_practicas',
                  'manejo_adecuado_desechos_impacto_ambiente',
                  'dispuesto_participar_emprendimiento_desechos',
                  'participaria_feria_emprendimientos_desechos'
                ]
              };
              
              const distribuciones = {};
              const promedios = {};
              
              Object.keys(categorias).forEach(categoria => {
                distribuciones[categoria] = {};
                promedios[categoria] = {
                  'Totalmente desacuerdo': 0,
                  'Desacuerdo': 0,
                  'Indiferente': 0,
                  'De acuerdo': 0,
                  'Totalmente de acuerdo': 0,
                  'Promedio': 0
                };
                
                categorias[categoria].forEach(pregunta => {
                  distribuciones[categoria][pregunta] = {
                    'Totalmente desacuerdo': 0,
                    'Desacuerdo': 0,
                    'Indiferente': 0,
                    'De acuerdo': 0,
                    'Totalmente de acuerdo': 0,
                    'Promedio': 0
                  };
                  
                  rows.forEach(row => {
                    const respuesta = row[pregunta];
                    if (respuesta && distribuciones[categoria][pregunta][respuesta] !== undefined) {
                      distribuciones[categoria][pregunta][respuesta]++;
                    }
                  });
                  
                  const total = rows.length;
                  let sumaPonderada = 0;
                  Object.keys(distribuciones[categoria][pregunta]).forEach(respuesta => {
                    if (respuesta !== 'Promedio') {
                      const porcentaje = (distribuciones[categoria][pregunta][respuesta] / total) * 100;
                      distribuciones[categoria][pregunta][respuesta] = porcentaje;
                      
                      const valor = {
                        'Totalmente desacuerdo': 1,
                        'Desacuerdo': 2,
                        'Indiferente': 3,
                        'De acuerdo': 4,
                        'Totalmente de acuerdo': 5
                      }[respuesta];
                      
                      sumaPonderada += valor * (distribuciones[categoria][pregunta][respuesta] / 100);
                    }
                  });
                  
                  distribuciones[categoria][pregunta]['Promedio'] = (sumaPonderada / 5) * 100;
                  
                  Object.keys(promedios[categoria]).forEach(respuesta => {
                    if (respuesta !== 'Promedio') {
                      promedios[categoria][respuesta] += distribuciones[categoria][pregunta][respuesta];
                    }
                  });
                  promedios[categoria]['Promedio'] += distribuciones[categoria][pregunta]['Promedio'];
                });
                
                const numPreguntas = categorias[categoria].length;
                Object.keys(promedios[categoria]).forEach(respuesta => {
                  promedios[categoria][respuesta] = promedios[categoria][respuesta] / numPreguntas;
                });
              });
              
              return { distribuciones, promedios };
            }
            
            function renderDemographicChart(canvasId, labels, data, counts) {
              const ctx = document.getElementById(canvasId)?.getContext('2d');
              if (!ctx) return;
              
              if (window[canvasId + 'Instance']) {
                window[canvasId + 'Instance'].destroy();
              }
              
              const colors = ['#4f46e5', '#0ea5e9', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
              
              const chartOptions = {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: currentChartType === 'pie',
                    position: 'right'
                  },
                  tooltip: {
                    callbacks: {
                      label: (context) => {
                        const value = context.parsed.y !== undefined ? context.parsed.y : context.parsed;
                        const count = counts[context.label] || 0;
                        return 'Porcentaje: ' + value.toFixed(1) + '% (' + count + ' personas)';
                      }
                    }
                  },
                  datalabels: {
                    formatter: (value) => {
                      return value.toFixed(1) + '%';
                    },
                    color: currentChartType === 'pie' ? '#fff' : '#1e293b',
                    font: {
                      weight: 'bold',
                      size: 12
                    },
                    anchor: currentChartType === 'pie' ? 'center' : (currentChartType === 'bar' ? 'end' : 'top'),
                    align: currentChartType === 'pie' ? 'center' : (currentChartType === 'bar' ? 'top' : 'top'),
                    offset: currentChartType === 'line' ? 8 : 0
                  }
                },
                scales: currentChartType !== 'pie' ? {
                  y: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                      display: true,
                      text: 'Porcentaje (%)'
                    },
                    ticks: {
                      padding: 15
                    }
                  },
                  x: {
                    ticks: {
                      padding: 10
                    }
                  }
                } : {}
              };
              
              window[canvasId + 'Instance'] = new window.Chart(ctx, {
                type: currentChartType,
                data: {
                  labels: labels,
                  datasets: [{
                    label: 'Porcentaje (%)',
                    data: data,
                    backgroundColor: colors.slice(0, labels.length),
                    borderColor: colors.slice(0, labels.length),
                    borderWidth: 1,
                    fill: currentChartType === 'line'
                  }]
                },
                options: chartOptions
              });
            }
            
            function renderQuestionChart(canvasId, datos, titulo, totalEncuestados) {
              const ctx = document.getElementById(canvasId)?.getContext('2d');
              if (!ctx) return;
              
              if (window[canvasId + 'Instance']) {
                window[canvasId + 'Instance'].destroy();
              }
              
              const respuestas = ['Totalmente desacuerdo', 'Desacuerdo', 'Indiferente', 'De acuerdo', 'Totalmente de acuerdo'];
              const valores = respuestas.map(r => datos[r] || 0);
              const colors = ['#ef4444', '#f59e0b', '#64748b', '#10b981', '#14b8a6'];
              
              const chartOptions = {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: currentChartType === 'pie',
                    position: 'right'
                  },
                  tooltip: {
                    callbacks: {
                      label: (context) => {
                        const value = context.parsed.y !== undefined ? context.parsed.y : context.parsed;
                        const count = Math.round((value / 100) * totalEncuestados);
                        return context.label + ': ' + value.toFixed(1) + '% (' + count + ' personas)';
                      }
                    }
                  },
                  datalabels: {
                    formatter: (value) => {
                      return value.toFixed(1) + '%';
                    },
                    color: currentChartType === 'pie' ? '#fff' : '#1e293b',
                    font: {
                      weight: 'bold',
                      size: 12
                    },
                    anchor: currentChartType === 'pie' ? 'center' : (currentChartType === 'bar' ? 'end' : 'top'),
                    align: currentChartType === 'pie' ? 'center' : (currentChartType === 'bar' ? 'top' : 'top'),
                    offset: currentChartType === 'line' ? 8 : 0
                  }
                },
                scales: currentChartType !== 'pie' ? {
                  y: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                      display: true,
                      text: 'Porcentaje (%)'
                    },
                    ticks: {
                      padding: 15
                    }
                  },
                  x: {
                    ticks: {
                      padding: 10
                    }
                  }
                } : {}
              };
              
              window[canvasId + 'Instance'] = new window.Chart(ctx, {
                type: currentChartType,
                data: {
                  labels: respuestas,
                  datasets: [{
                    label: 'Porcentaje (%)',
                    data: valores,
                    backgroundColor: colors,
                    borderColor: colors,
                    borderWidth: 1,
                    fill: currentChartType === 'line'
                  }]
                },
                options: chartOptions
              });
            }
            
            function renderAllCharts(distribuciones, distribucionesLikert) {
              // Demographics
              renderDemographicChart('estadoCivilChart', Object.keys(distribuciones.estadoCivil), Object.values(distribuciones.estadoCivil), distribuciones.counts.estadoCivil);
              renderDemographicChart('edadChart', Object.keys(distribuciones.edad), Object.values(distribuciones.edad), distribuciones.counts.edad);
              renderDemographicChart('educacionChart', Object.keys(distribuciones.educacion), Object.values(distribuciones.educacion), distribuciones.counts.educacion);
              renderDemographicChart('laboralChart', Object.keys(distribuciones.laboral), Object.values(distribuciones.laboral), distribuciones.counts.laboral);
              renderDemographicChart('ingresoChart', Object.keys(distribuciones.ingreso), Object.values(distribuciones.ingreso), distribuciones.counts.ingreso);
              renderDemographicChart('hogarChart', Object.keys(distribuciones.hogar), Object.values(distribuciones.hogar), distribuciones.counts.hogar);
              
              // Sociocultural
              const preguntasSociocultural = [
                'conoce_desechos_solidos',
                'cree_comportamiento_adecuado_manejo',
                'separar_desechos_por_origen',
                'clasificacion_correcta_desechos',
                'comportamiento_comunidad_influye',
                'dedica_tiempo_reducir_reutilizar_reciclar',
                'desechos_solidos_problema_comunidad'
              ];
              preguntasSociocultural.forEach((pregunta, index) => {
                const canvasId = 'socioculturalChart' + (index + 1);
                const datos = distribucionesLikert.distribuciones.sociocultural[pregunta];
                renderQuestionChart(canvasId, datos, '', currentData.length);
              });
              
              // Afectivos
              const preguntasAfectivos = [
                'preocupa_exceso_desechos',
                'desechos_contaminan_ambiente',
                'afecta_emocionalmente_noticias_contaminacion',
                'frustracion_falta_acciones_ambientales',
                'importancia_planeta_futuras_generaciones'
              ];
              preguntasAfectivos.forEach((pregunta, index) => {
                const canvasId = 'afectivosChart' + (index + 1);
                const datos = distribucionesLikert.distribuciones.afectivos[pregunta];
                renderQuestionChart(canvasId, datos, '', currentData.length);
              });
              
              // Cognitivos
              const preguntasCognitivos = [
                'consciente_impacto_desechos_salud',
                'investiga_temas_ambientales',
                'consecuencias_acumulacion_desechos',
                'beneficios_reutilizar_residuo',
                'falta_informacion_obstaculo_gestion'
              ];
              preguntasCognitivos.forEach((pregunta, index) => {
                const canvasId = 'cognitivosChart' + (index + 1);
                const datos = distribucionesLikert.distribuciones.cognitivos[pregunta];
                renderQuestionChart(canvasId, datos, '', currentData.length);
              });
              
              // Ambiental
              const preguntasAmbiental = [
                'desechos_organicos_funcionalidad',
                'acumulacion_desechos_afecta_salud',
                'reduccion_reciclaje_reutilizacion_cuida_ambiente',
                'transformacion_desechos_nuevos_productos',
                'necesita_info_educacion_ambiental'
              ];
              preguntasAmbiental.forEach((pregunta, index) => {
                const canvasId = 'ambientalChart' + (index + 1);
                const datos = distribucionesLikert.distribuciones.ambiental[pregunta];
                renderQuestionChart(canvasId, datos, '', currentData.length);
              });
              
              // Económica
              const preguntasEconomica = [
                'practica_separacion_reciclaje_ingreso',
                'desechos_hogar_reutilizados',
                'manejo_adecuado_desechos_aporta_desarrollo',
                'emprendimientos_reutilizacion_aportan_economia',
                'manejo_adecuado_desechos_oportunidad_emprendimiento'
              ];
              preguntasEconomica.forEach((pregunta, index) => {
                const canvasId = 'economicaChart' + (index + 1);
                const datos = distribucionesLikert.distribuciones.economica[pregunta];
                renderQuestionChart(canvasId, datos, '', currentData.length);
              });
              
              // Comunitario
              const preguntasComunitario = [
                'reducir_residuos_eventos_concientizacion',
                'participaria_talleres_buenas_practicas',
                'manejo_adecuado_desechos_impacto_ambiente',
                'dispuesto_participar_emprendimiento_desechos',
                'participaria_feria_emprendimientos_desechos'
              ];
              preguntasComunitario.forEach((pregunta, index) => {
                const canvasId = 'comunitarioChart' + (index + 1);
                const datos = distribucionesLikert.distribuciones.comunitario[pregunta];
                renderQuestionChart(canvasId, datos, '', currentData.length);
              });
            }
            
            function llenarTablaCategoria(tablaId, distribucion, counts, totalId) {
              const tbody = document.getElementById(tablaId);
              if (!tbody) return;
              tbody.innerHTML = '';
              
              let totalCount = 0;
              
              Object.keys(distribucion).forEach(categoria => {
                const count = counts[categoria] || 0;
                totalCount += count;
                
                const tr = document.createElement('tr');
                tr.innerHTML = 
                  '<td>' + categoria + '</td>' +
                  '<td style="text-align:right">' + count + '</td>' +
                  '<td style="text-align:right">' + distribucion[categoria].toFixed(2) + '%</td>';
                tbody.appendChild(tr);
              });
              
              const totalEl = document.getElementById(totalId);
              if (totalEl) totalEl.textContent = totalCount;
            }
            
            function llenarTablaLikert(tablaId, distribucion, promedios, categoria) {
              const tbody = document.getElementById(tablaId);
              if (!tbody) return;
              tbody.innerHTML = '';
              
              const respuestas = ['Totalmente desacuerdo', 'Desacuerdo', 'Indiferente', 'De acuerdo', 'Totalmente de acuerdo'];
              
              const preguntasMap = {
                'conoce_desechos_solidos': '¿Conoce usted qué son los desechos sólidos domiciliarios?',
                'cree_comportamiento_adecuado_manejo': '¿Cree usted que existe un comportamiento adecuado en el manejo de los desechos sólidos domiciliarios en la comunidad?',
                'separar_desechos_por_origen': '¿Se debe separar los desechos sólidos según su tipo ejemplo: (papel - plástico - orgánico - inorgánico)?',
                'clasificacion_correcta_desechos': '¿Es importante la correcta clasificación de los desechos sólidos orgánicos e inorgánicos en el hogar?',
                'comportamiento_comunidad_influye': '¿Cree que el comportamiento de la comunidad influye en deterioro del medio ambiente?',
                'dedica_tiempo_reducir_reutilizar_reciclar': '¿Dedica tiempo para reducir, reutilizar y/o reciclar los desechos sólidos que se generan en el hogar?',
                'desechos_solidos_problema_comunidad': '¿Los desechos sólidos son un gran problema para la comunidad?',
                'preocupa_exceso_desechos': '¿Le preocupa el exceso de desechos sólidos domiciliarios?',
                'desechos_contaminan_ambiente': '¿Considera que los desechos sólidos domiciliarios intervienen en las consecuencias climáticas?',
                'afecta_emocionalmente_noticias_contaminacion': '¿Le afecta emocionalmente cuando escucha noticias acerca de los desastres naturales?',
                'frustracion_falta_acciones_ambientales': '¿Siente frustración debido a la falta de acciones significativas para abordar la generación de los desechos sólidos?',
                'importancia_planeta_futuras_generaciones': '¿Considera importante pensar en el tipo de planeta que dejaremos a las futuras generaciones?',
                'consciente_impacto_desechos_salud': '¿Es consciente del impacto de los desechos sólidos domiciliarios en el medio ambiente?',
                'investiga_temas_ambientales': '¿Investiga frecuentemente acerca de temas medio ambientales?',
                'consecuencias_acumulacion_desechos': '¿Conoce las consecuencias de la acumulación de los desechos sólidos domiciliarios?',
                'beneficios_reutilizar_residuo': '¿Conoce los beneficios de reutilizar un residuo domiciliario?',
                'falta_informacion_obstaculo_gestion': '¿La falta de información es un obstáculo para la correcta gestión de los residuos sólidos domiciliario?',
                'desechos_organicos_funcionalidad': '¿Los desechos orgánicos generados en el hogar pueden tener otra funcionalidad?',
                'acumulacion_desechos_afecta_salud': '¿La acumulación de desechos afectan a la salud de la población?',
                'reduccion_reciclaje_reutilizacion_cuida_ambiente': '¿La reducción, reciclaje y la reutilización de los desechos sólidos puede cuidar al medio ambiente y a la vida silvestre?',
                'transformacion_desechos_nuevos_productos': '¿Cree que la transformación de desechos sólidos en nuevos productos puede contribuir significativamente a la reducción de la generación de desechos?',
                'necesita_info_educacion_ambiental': '¿Necesita más información acerca de educación ambiental?',
                'practica_separacion_reciclaje_ingreso': '¿En su hogar practica la separación de los desechos para el reciclaje y le representa algún ingreso?',
                'desechos_hogar_reutilizados': '¿Los desechos sólidos generados en el hogar pueden ser reutilizados para una nueva función o creación de un producto?',
                'manejo_adecuado_desechos_aporta_desarrollo': '¿Cree que el manejo adecuado de los desechos sólidos domiciliarios podría aportar al desarrollo económico comunitario?',
                'emprendimientos_reutilizacion_aportan_economia': '¿Los emprendimientos en base a la reutilización de los desechos aporta a su economía?',
                'manejo_adecuado_desechos_oportunidad_emprendimiento': '¿El manejo adecuado de los desechos sólidos domiciliarios ofrece oportunidades para el emprendimiento?',
                'reducir_residuos_eventos_concientizacion': '¿Es posible reducir la generación de residuos sólidos domiciliarios por medio de eventos de concientización?',
                'participaria_talleres_buenas_practicas': '¿Participaría en talleres de buenas prácticas y capacitaciones para el correcto manejo de los desechos sólidos domiciliarios?',
                'manejo_adecuado_desechos_impacto_ambiente': '¿El manejo adecuado de los desechos sólidos domiciliarios puede tener un impacto significativo al medio ambiente?',
                'dispuesto_participar_emprendimiento_desechos': '¿Está dispuesto a participar en un emprendimiento en base al uso de los desechos sólidos?',
                'participaria_feria_emprendimientos_desechos': '¿Participaría a una feria de emprendimientos comunitarios en base a desechos domiciliarios reutilizados?'
              };
              
              Object.keys(distribucion).forEach(pregunta => {
                const tr = document.createElement('tr');
                const preguntaTexto = preguntasMap[pregunta] || pregunta;
                
                let celdas = '<td>' + preguntaTexto + '</td>';
                respuestas.forEach(respuesta => {
                  celdas += '<td style="text-align:center">' + distribucion[pregunta][respuesta].toFixed(1) + '%</td>';
                });
                celdas += '<td style="text-align:center"><strong>' + distribucion[pregunta]['Promedio'].toFixed(1) + '%</strong></td>';
                
                tr.innerHTML = celdas;
                tbody.appendChild(tr);
              });
              
              const capCat = categoria.charAt(0).toUpperCase() + categoria.slice(1);
              const promedioTD = document.getElementById('promedio' + capCat + 'TD');
              const promedioD = document.getElementById('promedio' + capCat + 'D');
              const promedioI = document.getElementById('promedio' + capCat + 'I');
              const promedioA = document.getElementById('promedio' + capCat + 'A');
              const promedioTA = document.getElementById('promedio' + capCat + 'TA');
              const promedio = document.getElementById('promedio' + capCat);
              
              if (promedioTD) promedioTD.textContent = promedios['Totalmente desacuerdo'].toFixed(1) + '%';
              if (promedioD) promedioD.textContent = promedios['Desacuerdo'].toFixed(1) + '%';
              if (promedioI) promedioI.textContent = promedios['Indiferente'].toFixed(1) + '%';
              if (promedioA) promedioA.textContent = promedios['De acuerdo'].toFixed(1) + '%';
              if (promedioTA) promedioTA.textContent = promedios['Totalmente de acuerdo'].toFixed(1) + '%';
              if (promedio) promedio.textContent = promedios['Promedio'].toFixed(1) + '%';
            }
            
            function llenarTablasResumen(distribuciones, distribucionesLikert) {
              llenarTablaCategoria('tablaEstadoCivil', distribuciones.estadoCivil, distribuciones.counts.estadoCivil, 'totalEstadoCivil');
              llenarTablaCategoria('tablaEdades', distribuciones.edad, distribuciones.counts.edad, 'totalEdades');
              llenarTablaCategoria('tablaEducacion', distribuciones.educacion, distribuciones.counts.educacion, 'totalEducacion');
              llenarTablaCategoria('tablaLaboral', distribuciones.laboral, distribuciones.counts.laboral, 'totalLaboral');
              llenarTablaCategoria('tablaIngreso', distribuciones.ingreso, distribuciones.counts.ingreso, 'totalIngreso');
              llenarTablaCategoria('tablaHogar', distribuciones.hogar, distribuciones.counts.hogar, 'totalHogar');
              
              llenarTablaLikert('tablaSociocultural', distribucionesLikert.distribuciones.sociocultural, distribucionesLikert.promedios.sociocultural, 'sociocultural');
              llenarTablaLikert('tablaAfectivos', distribucionesLikert.distribuciones.afectivos, distribucionesLikert.promedios.afectivos, 'afectivos');
              llenarTablaLikert('tablaCognitivos', distribucionesLikert.distribuciones.cognitivos, distribucionesLikert.promedios.cognitivos, 'cognitivos');
              llenarTablaLikert('tablaAmbiental', distribucionesLikert.distribuciones.ambiental, distribucionesLikert.promedios.ambiental, 'ambiental');
              llenarTablaLikert('tablaEconomica', distribucionesLikert.distribuciones.economica, distribucionesLikert.promedios.economica, 'economica');
              llenarTablaLikert('tablaComunitario', distribucionesLikert.distribuciones.comunitario, distribucionesLikert.promedios.comunitario, 'comunitario');
            }
            
            function actualizarResumenes(distribuciones) {
              const totalRecords = currentData.length;
              document.getElementById('summaryTotal').textContent = totalRecords;
              
              const hogarEntries = Object.entries(distribuciones.hogar);
              if (hogarEntries.length > 0) {
                const [hogarPredominante, hogarPorcentaje] = hogarEntries.reduce((a, b) => (a[1] > b[1] ? a : b));
                document.getElementById('summaryHogar').textContent = hogarPredominante;
                document.getElementById('summaryHogarChange').innerHTML = '<span>' + hogarPorcentaje.toFixed(1) + '% del total</span>';
              }
              
              const educacionEntries = Object.entries(distribuciones.educacion);
              if (educacionEntries.length > 0) {
                const [educacionPredominante, educacionPorcentaje] = educacionEntries.reduce((a, b) => (a[1] > b[1] ? a : b));
                document.getElementById('summaryEducacion').textContent = educacionPredominante;
                document.getElementById('summaryEducacionChange').innerHTML = '<span>' + educacionPorcentaje.toFixed(1) + '% del total</span>';
              }
              
              const laboralEntries = Object.entries(distribuciones.laboral);
              if (laboralEntries.length > 0) {
                const [laboralPredominante, laboralPorcentaje] = laboralEntries.reduce((a, b) => (a[1] > b[1] ? a : b));
                document.getElementById('summaryLaboral').textContent = laboralPredominante;
                document.getElementById('summaryLaboralChange').innerHTML = '<span>' + laboralPorcentaje.toFixed(1) + '% del total</span>';
              }
            }
            
            async function actualizar() {
              console.log('[v0] Updating dashboard...');
              currentData = await obtenerFiltrados();
              
              const distribuciones = calcularDistribuciones(currentData);
              const distribucionesLikert = calcularDistribucionesLikert(currentData);
              
              renderAllCharts(distribuciones, distribucionesLikert);
              llenarTablasResumen(distribuciones, distribucionesLikert);
              actualizarResumenes(distribuciones);
              
              console.log('[v0] Dashboard updated with ' + currentData.length + ' records');
            }
            
            function setupEventListeners() {
              selectEstadoCivil?.addEventListener('change', actualizar);
              selectEducacion?.addEventListener('change', actualizar);
              selectSituacionLaboral?.addEventListener('change', actualizar);
              selectIngreso?.addEventListener('change', actualizar);
              
              // Chart type buttons
              document.querySelectorAll('[data-chart-type]').forEach(btn => {
                btn.addEventListener('click', function() {
                  document.querySelectorAll('[data-chart-type]').forEach(b => {
                    b.classList.remove('active');
                  });
                  this.classList.add('active');
                  currentChartType = this.getAttribute('data-chart-type');
                  actualizar();
                });
              });
              
              // Tabs for charts
              document.querySelectorAll('.tab[data-tab]').forEach(tab => {
                tab.addEventListener('click', () => {
                  const tabId = tab.getAttribute('data-tab');
                  
                  document.querySelectorAll('.tab[data-tab]').forEach(t => {
                    t.classList.remove('active');
                  });
                  document.querySelectorAll('.tab-content').forEach(c => {
                    if (c.id && !c.id.startsWith('tabla-')) {
                      c.classList.remove('active');
                    }
                  });
                  
                  tab.classList.add('active');
                  const content = document.getElementById(tabId);
                  if (content) content.classList.add('active');
                });
              });
              
              // Tabs for tables
              document.querySelectorAll('.tab[data-tab-table]').forEach(tab => {
                tab.addEventListener('click', () => {
                  const tabId = tab.getAttribute('data-tab-table');
                  
                  document.querySelectorAll('.tab[data-tab-table]').forEach(t => {
                    t.classList.remove('active');
                  });
                  document.querySelectorAll('.tab-content').forEach(c => {
                    if (c.id && c.id.startsWith('tabla-')) {
                      c.classList.remove('active');
                    }
                  });
                  
                  tab.classList.add('active');
                  const content = document.getElementById(tabId);
                  if (content) content.classList.add('active');
                });
              });
            }
            
            // Start initialization
            inicializar();
          })();
        </script>
      `,
        }}
      />
    </>
  )
}
