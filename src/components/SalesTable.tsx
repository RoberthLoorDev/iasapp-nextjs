"use client";

import { Badge } from "@/shadcn/components/ui/badge";
import { Button } from "@/shadcn/components/ui/button";
import { Input } from "@/shadcn/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shadcn/components/ui/table";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { useState } from "react";

// Importamos el JSON con ventas
import salesData from "@/data/ventas.json";
import { DeleteSaleDialog } from "./DeleteSaleDialog";
import { SaleDetailDialog } from "./SaleDetailDialog";
import { UpdateSaleDialog } from "./UpdateSaleDialog";

type SaleItem = {
     id: string;
     product: {
          id: string;
          brand: string;
          model: string;
          variant?: string;
     };
     quantity: number;
     unitPrice: number;
     subtotal: number;
};

type Sale = {
     id: string;
     createdAt: string;
     invoiceNumber: string;
     customerName: string;
     customerCedula: string;
     customerPhone: string;
     subtotal: number;
     ivaAmount: number;
     total: number;
     paymentMethod: string;
     status: string;
     items: SaleItem[];
};

export default function SalesTable() {
     const [query, setQuery] = useState("");
     const [page, setPage] = useState(1);
     const pageSize = 2;

     const filtered = (salesData as Sale[]).filter(
          (s) =>
               s.customerName.toLowerCase().includes(query.toLowerCase()) ||
               s.invoiceNumber.toLowerCase().includes(query.toLowerCase())
     );

     const totalPages = Math.ceil(filtered.length / pageSize);
     const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

     return (
          <div className="space-y-4">
               {/* Buscador */}
               <div className="relative w-1/3">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                    <Input
                         placeholder="Buscar por cliente o factura..."
                         className="pl-8 rounded-lg border-[#EFEFEF] focus-visible:ring-gray-300 focus-visible:border-gray-300"
                         value={query}
                         onChange={(e) => setQuery(e.target.value)}
                    />
               </div>

               {/* Tabla */}
               <div className="rounded-xl border border-[#EFEFEF] overflow-hidden shadow-sm">
                    <Table>
                         <TableHeader className="bg-[#04452E]">
                              <TableRow className="border-0">
                                   <TableHead className="text-white font-semibold py-2 pl-5">Fecha</TableHead>
                                   <TableHead className="text-white font-semibold py-2">Factura</TableHead>
                                   <TableHead className="text-white font-semibold py-2">Cliente</TableHead>
                                   <TableHead className="text-white font-semibold py-2">Subtotal</TableHead>
                                   <TableHead className="text-white font-semibold py-2">IVA</TableHead>
                                   <TableHead className="text-white font-semibold py-2">Total</TableHead>
                                   <TableHead className="text-white font-semibold py-2">Método</TableHead>
                                   <TableHead className="text-white font-semibold py-2">Status</TableHead>
                                   <TableHead className="text-white font-semibold py-2 text-center">Acciones</TableHead>
                              </TableRow>
                         </TableHeader>
                         <TableBody>
                              {paginated.map((s) => (
                                   <TableRow key={s.id} className="border-0 hover:bg-[#F9FAFB] transition-colors">
                                        <TableCell className="py-1.5 pl-5">{s.createdAt}</TableCell>
                                        <TableCell className="py-1.5 font-medium">{s.invoiceNumber}</TableCell>
                                        <TableCell className="py-1.5">{s.customerName}</TableCell>
                                        <TableCell className="py-1.5">${s.subtotal}</TableCell>
                                        <TableCell className="py-1.5">${s.ivaAmount}</TableCell>
                                        <TableCell className="py-1.5 font-semibold text-gray-800">${s.total}</TableCell>
                                        <TableCell className="py-1.5">{s.paymentMethod}</TableCell>
                                        <TableCell className="py-1.5">
                                             {s.status === "completed" && (
                                                  <Badge className="bg-green-100 text-green-700 border border-green-200">
                                                       Completado
                                                  </Badge>
                                             )}
                                             {s.status === "pending" && (
                                                  <Badge className="bg-yellow-100 text-yellow-700 border border-yellow-200">
                                                       Pendiente
                                                  </Badge>
                                             )}
                                             {s.status === "cancelled" && (
                                                  <Badge className="bg-red-100 text-red-700 border border-red-200">
                                                       Cancelado
                                                  </Badge>
                                             )}
                                        </TableCell>
                                        <TableCell className="py-1.5">
                                             <div className="flex justify-center gap-2">
                                                  <SaleDetailDialog sale={s} />
                                                  <UpdateSaleDialog sale={s} />
                                                  <DeleteSaleDialog sale={s} />
                                             </div>
                                        </TableCell>
                                   </TableRow>
                              ))}
                         </TableBody>
                    </Table>
               </div>

               {/* Footer con total y paginación */}
               <div className="mt-4 space-y-2">
                    <span className="text-sm text-black block">Total registros: {filtered.length}</span>
                    <div className="flex justify-center items-center gap-2">
                         <Button
                              variant="ghost"
                              size="icon"
                              className="border border-[#EFEFEF] rounded-md hover:bg-gray-100"
                              onClick={() => setPage((p) => Math.max(1, p - 1))}
                              disabled={page === 1}
                         >
                              <ChevronLeft className="h-4 w-4 text-black" />
                         </Button>
                         <span className="text-sm text-black">
                              Página {page} de {totalPages}
                         </span>
                         <Button
                              variant="ghost"
                              size="icon"
                              className="border border-[#EFEFEF] rounded-md hover:bg-gray-100"
                              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                              disabled={page === totalPages}
                         >
                              <ChevronRight className="h-4 w-4 text-black" />
                         </Button>
                    </div>
               </div>
          </div>
     );
}
