"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shadcn/components/ui/card";

import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/shadcn/components/ui/chart";

import ventasData from "@/data/ventas-ultimos-30-dias.json";

const chartConfig = {
     ventas: {
          label: "Ventas (USD)",
          color: "var(--chart-1)",
     },
     unidades: {
          label: "Unidades",
          color: "var(--chart-2)",
     },
} satisfies ChartConfig;

export function SalesForDayChart() {
     const total = React.useMemo(
          () => ({
               ventas: ventasData.reduce((acc, curr) => acc + curr.ventas, 0),
               unidades: ventasData.reduce((acc, curr) => acc + curr.unidades, 0),
          }),
          []
     );

     return (
          <Card className="border border-[#efefef]">
               <CardHeader className="pb-0">
                    {/* Header responsive */}
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                         <div className="flex-shrink-0">
                              <CardTitle className="text-[#05462F] text-2xl">VENTAS POR DIA</CardTitle>
                              <CardDescription>Últimos 30 días</CardDescription>
                         </div>

                         {/* Totales - responsive layout */}
                         <div className="flex gap-4 sm:gap-6 mt-4 lg:mt-0 lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2">
                              <div className="flex items-center gap-2">
                                   <span className="w-3 h-3 rounded-full" style={{ backgroundColor: chartConfig.ventas.color }} />
                                   <span className="text-sm text-muted-foreground">{chartConfig.ventas.label}:</span>
                                   <span className="font-semibold">{total.ventas.toLocaleString()}</span>
                              </div>

                              <div className="flex items-center gap-2">
                                   <span
                                        className="w-3 h-3 rounded-full"
                                        style={{ backgroundColor: chartConfig.unidades.color }}
                                   />
                                   <span className="text-sm text-muted-foreground">{chartConfig.unidades.label}:</span>
                                   <span className="font-semibold">{total.unidades.toLocaleString()}</span>
                              </div>
                         </div>

                         {/* Spacer invisible para equilibrar - solo en pantallas grandes */}
                         <div className="hidden lg:block flex-shrink-0 invisible">
                              <div className="text-2xl">VENTAS POR DIA</div>
                              <div className="text-sm">Últimos 30 días</div>
                         </div>
                    </div>
               </CardHeader>

               <CardContent className="px-2 ">
                    <ChartContainer config={chartConfig} className="aspect-auto h-[280px] w-full">
                         <BarChart accessibilityLayer data={ventasData} margin={{ left: 12, right: 12 }}>
                              <CartesianGrid vertical={false} />
                              <XAxis
                                   dataKey="fecha"
                                   tickLine={false}
                                   axisLine={false}
                                   tickMargin={8}
                                   minTickGap={32}
                                   tickFormatter={(value) => {
                                        const date = new Date(value);
                                        return date.toLocaleDateString("es-ES", {
                                             month: "short",
                                             day: "numeric",
                                        });
                                   }}
                              />
                              <ChartTooltip
                                   content={
                                        <ChartTooltipContent
                                             className="w-[150px]"
                                             nameKey="ventas"
                                             labelFormatter={(value) => {
                                                  return new Date(value).toLocaleDateString("es-ES", {
                                                       month: "short",
                                                       day: "numeric",
                                                       year: "numeric",
                                                  });
                                             }}
                                        />
                                   }
                              />
                              <Bar dataKey="ventas" fill={chartConfig.ventas.color} radius={4} />
                              <Bar dataKey="unidades" fill={chartConfig.unidades.color} radius={4} />
                         </BarChart>
                    </ChartContainer>
               </CardContent>
          </Card>
     );
}
