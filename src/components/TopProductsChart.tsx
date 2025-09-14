"use client";

import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shadcn/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/shadcn/components/ui/chart";

import topProductsData from "@/data/top-productos.json";

const chartConfig = {
     ventas: {
          label: "Ventas",
          color: "var(--chart-1)",
     },
     label: {
          color: "var(--background)",
     },
} satisfies ChartConfig;

export function TopProductsChart() {
     return (
          <Card className="border border-[#efefef]">
               <CardHeader className="pb-0">
                    <CardTitle className="text-[#05462F] text-2xl">TOP 5 PRODUCTOS MÁS VENDIDOS</CardTitle>
                    <CardDescription>Basado en ventas totales</CardDescription>
               </CardHeader>

               <CardContent className="px-2 sm:p-6">
                    <ChartContainer config={chartConfig} className="h-[300px] w-full">
                         <BarChart data={topProductsData} layout="vertical" margin={{ left: 0, right: 16 }}>
                              <CartesianGrid horizontal={false} />
                              <YAxis dataKey="modelo" type="category" tickLine={false} axisLine={false} width={80} />
                              <XAxis dataKey="ventas" type="number" hide />
                              <ChartTooltip
                                   cursor={false}
                                   content={
                                        <ChartTooltipContent
                                             indicator="line"
                                             nameKey="ventas"
                                             labelFormatter={(value) => value}
                                        />
                                   }
                              />
                              <Bar dataKey="ventas" layout="vertical" fill={chartConfig.ventas.color} radius={4} barSize={30}>
                                   {/* Etiqueta a la derecha con la cantidad */}
                                   <LabelList
                                        dataKey="ventas"
                                        position="right"
                                        offset={8}
                                        className="fill-foreground"
                                        fontSize={12}
                                   />
                              </Bar>
                         </BarChart>
                    </ChartContainer>
               </CardContent>
          </Card>
     );
}
