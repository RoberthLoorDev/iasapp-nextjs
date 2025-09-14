import KPIResumenC from "@/components/KPIResumenC";
import MainLayout from "@/layout/MainLayout";
import React from "react";
import kpiData from "@/data/kpis-resumen.json";
import { SalesForDayChart } from "@/components/SalesForDayChart";
import { SalesByBrandChart } from "@/components/SalesByBrandChart";
import { TopProductsChart } from "@/components/TopProductsChart";
import { LowStockTable } from "@/components/LowStockTable";
import { LatestChatsTable } from "@/components/LatestChatsTable";
import { LatestSalesTable } from "@/components/LatestSalesTable";

export default function page() {
     return (
          <MainLayout title="Resumen">
               <div className="flex flex-col gap-5">
                    {/* KPIs */}
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

                    <SalesForDayChart />

                    {/* Bloque superior */}
                    <div className="grid gap-5 grid-cols-1 xl:grid-cols-3">
                         {/* En pantallas medianas, este ocupa todo el ancho */}
                         <div className="md:col-span-2 lg:col-span-1">
                              <TopProductsChart />
                         </div>

                         {/* Estos dos comparten fila en md, pero en lg ya son 3 cols iguales */}
                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 lg:col-span-2">
                              <SalesByBrandChart />
                              <LowStockTable />
                         </div>
                    </div>

                    {/* Bloque inferior */}
                    <div className="grid gap-5 grid-cols-1 xl:grid-cols-2">
                         <LatestChatsTable />
                         <LatestSalesTable />
                    </div>

                    {/* 
               Listas rapidas, tablas compactas
                    - Tabla de productos con bajo stock, top 5
                    - Top 5 productos mas vendidos, barras
                    - Ultimas ventas
                    - Ultimos chats
               */}
               </div>
          </MainLayout>
     );
}
