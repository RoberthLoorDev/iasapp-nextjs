import KPIResumenC from "@/components/KPIResumenC";
import MainLayout from "@/layout/MainLayout";
import React from "react";
import kpiData from "@/data/kpis-resumen.json";

export default function page() {
     return (
          <MainLayout title="Resumen">
               {/* 
               KPIs
                    - KPIs de ventas, usd
                    - KPIs de ventas, cantidad
                    - KPI unidades vendidas
                    - Productos con bajo stock. 
                    - Conversaciones nuevas. 
               */}
               {/* <h1 className="text-2xl text-[#04452E] font-semibold">Resumen</h1> */}

               {/* kpis */}
               <div className="w-full overflow-x-auto py-4">
                    <div className="flex gap-6 w-max">
                         {kpiData.map((kpi) => (
                              <KPIResumenC
                                   key={kpi.title}
                                   icon={kpi.icon}
                                   title={kpi.title}
                                   value={kpi.value}
                                   percentage={kpi.percentage}
                                   percentageIcon={kpi.percentageIcon}
                                   className="flex-shrink-0"
                              />
                         ))}
                    </div>
               </div>

               {/* 
               Graficos
                    - Grafico de ventas por dias de los ultimos 30 dias, barras
                    - Grafico de ventas por marca, top 5, pastel o barras.
               */}

               {/* 
               Listas rapidas, tablas compactas
                    - Tabla de productos con bajo stock, top 5
                    - Top 5 productos mas vendidos, barras
                    - Ultimas ventas
                    - Ultimos chats
               */}
          </MainLayout>
     );
}
