"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shadcn/components/ui/table";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shadcn/components/ui/card";

import lowStockData from "@/data/low-stock-products.json";

export function LowStockTable() {
     return (
          <Card className="border border-[#efefef]">
               <CardHeader className="pb-0">
                    <CardTitle className="text-[#05462F] text-2xl">PRODUCTOS CON BAJO STOCK</CardTitle>
                    <CardDescription>Top 5 equipos</CardDescription>
               </CardHeader>

               <CardContent className="px-2 sm:p-6">
                    <Table>
                         <TableHeader>
                              <TableRow>
                                   <TableHead className="w-[70%]">Modelo</TableHead>
                                   <TableHead className="text-right">Stock disponible</TableHead>
                              </TableRow>
                         </TableHeader>

                         <TableBody className="text-[#70707D]">
                              {lowStockData.reverse().map((item) => (
                                   <TableRow key={item.modelo}>
                                        <TableCell className="font-medium">{item.modelo}</TableCell>
                                        <TableCell className="text-right">{item.stock}</TableCell>
                                   </TableRow>
                              ))}
                         </TableBody>
                    </Table>
               </CardContent>
          </Card>
     );
}
