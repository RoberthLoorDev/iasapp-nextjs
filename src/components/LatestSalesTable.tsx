"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shadcn/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shadcn/components/ui/card";

import salesData from "@/data/ultimas-ventas.json";

export function LatestSalesTable() {
     return (
          <Card className="border border-[#efefef]">
               <CardHeader className="pb-0">
                    <CardTitle className="text-[#05462F] text-2xl">ÚLTIMAS VENTAS</CardTitle>
                    <CardDescription>5 registros recientes</CardDescription>
               </CardHeader>

               <CardContent className="px-2 sm:p-6">
                    <Table>
                         <TableHeader>
                              <TableRow>
                                   <TableHead>Cliente</TableHead>
                                   <TableHead>Teléfono</TableHead>
                                   <TableHead>Producto</TableHead>
                                   <TableHead className="text-right">Cantidad</TableHead>
                                   <TableHead className="text-right">Total</TableHead>
                                   <TableHead className="text-right">Fecha</TableHead>
                              </TableRow>
                         </TableHeader>
                         <TableBody>
                              {salesData.map((sale, idx) => (
                                   <TableRow key={idx}>
                                        <TableCell className="font-medium">{sale.cliente}</TableCell>
                                        <TableCell>{sale.telefono}</TableCell>
                                        <TableCell>{sale.producto}</TableCell>
                                        <TableCell className="text-right">{sale.cantidad}</TableCell>
                                        <TableCell className="text-right">${sale.total}</TableCell>
                                        <TableCell className="text-right">
                                             {new Date(sale.fecha).toLocaleDateString("es-ES")}
                                        </TableCell>
                                   </TableRow>
                              ))}
                         </TableBody>
                    </Table>
               </CardContent>
          </Card>
     );
}
