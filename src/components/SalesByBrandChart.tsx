"use client";

import * as React from "react";
import { Pie, PieChart } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shadcn/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/shadcn/components/ui/chart";

import salesByBrandData from "@/data/ventas-por-marca.json";

const chartConfig = {
     ventas: {
          label: "Ventas (USD)",
     },
     xiaomi: {
          label: "Xiaomi",
          color: "var(--chart-1)",
     },
     samsung: {
          label: "Samsung",
          color: "var(--chart-2)",
     },
     huawei: {
          label: "Huawei",
          color: "var(--chart-3)",
     },
     apple: {
          label: "Apple",
          color: "var(--chart-4)",
     },
     motorola: {
          label: "Motorola",
          color: "var(--chart-5)",
     },
} satisfies ChartConfig;

export function SalesByBrandChart() {
     const total = React.useMemo(() => {
          return salesByBrandData.reduce((acc, curr) => acc + curr.ventas, 0);
     }, []);

     return (
          <Card className="border border-[#efefef]">
               <CardHeader className="pb-0">
                    <div className="flex-shrink-0">
                         <CardTitle className="text-[#05462F] text-2xl">VENTAS POR MARCA</CardTitle>
                         <CardDescription>Top 5</CardDescription>

                         {/* Total debajo de Top 5 */}
                         <div className="flex items-center gap-2 mt-2">
                              <span className="w-3 h-3 rounded-full bg-gray-500" />
                              <span className="text-sm text-muted-foreground">Total:</span>
                              <span className="font-semibold">{total.toLocaleString()} USD</span>
                         </div>
                    </div>
               </CardHeader>

               <CardContent className="flex flex-col items-center px-2">
                    <ChartContainer
                         config={chartConfig}
                         className="[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square max-h-[280px] w-full"
                    >
                         <PieChart>
                              <ChartTooltip
                                   content={
                                        <ChartTooltipContent
                                             hideLabel={false}
                                             labelFormatter={(value) => value} // sigue mostrando la marca como label
                                             formatter={(value) => {
                                                  const porcentaje = ((Number(value) / total) * 100).toFixed(1);
                                                  return [`${porcentaje}%`, ""]; // mostramos porcentaje en vez de cantidad
                                             }}
                                        />
                                   }
                              />

                              <Pie
                                   data={salesByBrandData.map((d) => ({
                                        ...d,
                                        fill:
                                             "color" in (chartConfig[d.marca.toLowerCase() as keyof typeof chartConfig] ?? {})
                                                  ? (
                                                         chartConfig[d.marca.toLowerCase() as keyof typeof chartConfig] as {
                                                              color: string;
                                                         }
                                                    ).color
                                                  : undefined,
                                   }))}
                                   dataKey="ventas"
                                   nameKey="marca"
                                   label
                              />
                         </PieChart>
                    </ChartContainer>

                    {/* Leyenda simple con puntos de color */}
                    <div className="flex flex-wrap justify-center gap-4 mt-4">
                         {salesByBrandData.map((d) => (
                              <div key={d.marca} className="flex items-center gap-2">
                                   <span
                                        className="w-3 h-3 rounded-full"
                                        style={{
                                             backgroundColor:
                                                  "color" in
                                                  (chartConfig[d.marca.toLowerCase() as keyof typeof chartConfig] ?? {})
                                                       ? (
                                                              chartConfig[d.marca.toLowerCase() as keyof typeof chartConfig] as {
                                                                   color: string;
                                                              }
                                                         ).color
                                                       : undefined,
                                        }}
                                   />
                                   <span className="text-sm text-muted-foreground">{d.marca}</span>
                              </div>
                         ))}
                    </div>
               </CardContent>
          </Card>
     );
}
