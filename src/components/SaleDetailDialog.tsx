"use client";

import {
     Dialog,
     DialogClose,
     DialogContent,
     DialogDescription,
     DialogFooter,
     DialogHeader,
     DialogTitle,
     DialogTrigger,
} from "@/shadcn/components/ui/dialog";
import { Button } from "@/shadcn/components/ui/button";
import { Badge } from "@/shadcn/components/ui/badge";
import { Eye } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shadcn/components/ui/table";

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

export function SaleDetailDialog({ sale }: { sale: Sale }) {
     return (
          <Dialog>
               <DialogTrigger asChild>
                    <Button size="icon" variant="ghost" className="hover:bg-gray-100">
                         <Eye className="h-4 w-4 text-gray-600" />
                    </Button>
               </DialogTrigger>
               <DialogContent className="sm:max-w-[700px] max-h-[90dvh] overflow-y-auto rounded-xl border border-[#EFEFEF]">
                    <DialogHeader>
                         <DialogTitle className="text-lg font-semibold text-gray-800">Detalle de venta</DialogTitle>
                         <DialogDescription>
                              Factura #{sale.invoiceNumber} — {sale.customerName}
                         </DialogDescription>
                    </DialogHeader>

                    {/* Info general */}
                    <div className="grid grid-cols-2 gap-4 bg-[#F5F7F9] rounded-lg p-4 text-sm">
                         <p>
                              <span className="font-semibold">Fecha:</span> {sale.createdAt}
                         </p>
                         <p>
                              <span className="font-semibold">Factura:</span> {sale.invoiceNumber}
                         </p>
                         <p>
                              <span className="font-semibold">Cliente:</span> {sale.customerName}
                         </p>
                         <p>
                              <span className="font-semibold">Cédula:</span> {sale.customerCedula}
                         </p>
                         <p>
                              <span className="font-semibold">Teléfono:</span> {sale.customerPhone}
                         </p>
                         <p>
                              <span className="font-semibold">Método pago:</span> {sale.paymentMethod}
                         </p>
                         <p>
                              <span className="font-semibold">Estado:</span>
                              {sale.status === "completed" && (
                                   <Badge className="ml-2 bg-green-100 text-green-700 border border-green-200">Completado</Badge>
                              )}
                              {sale.status === "pending" && (
                                   <Badge className="ml-2 bg-yellow-100 text-yellow-700 border border-yellow-200">
                                        Pendiente
                                   </Badge>
                              )}
                              {sale.status === "cancelled" && (
                                   <Badge className="ml-2 bg-red-100 text-red-700 border border-red-200">Cancelado</Badge>
                              )}
                         </p>
                    </div>

                    {/* Tabla de productos */}
                    <div className="rounded-xl border border-[#EFEFEF] overflow-hidden mt-4">
                         <Table>
                              <TableHeader className="bg-[#F0F2F5]">
                                   <TableRow className="border-0">
                                        <TableHead className="font-semibold text-gray-700">Producto</TableHead>
                                        <TableHead className="font-semibold text-gray-700">Cantidad</TableHead>
                                        <TableHead className="font-semibold text-gray-700">Precio Unitario</TableHead>
                                        <TableHead className="font-semibold text-gray-700">Subtotal</TableHead>
                                   </TableRow>
                              </TableHeader>
                              <TableBody>
                                   {sale.items.map((item) => (
                                        <TableRow key={item.id} className="border-0 hover:bg-gray-50">
                                             <TableCell>
                                                  {item.product.brand} {item.product.model} {item.product.variant}
                                             </TableCell>
                                             <TableCell>{item.quantity}</TableCell>
                                             <TableCell>${item.unitPrice}</TableCell>
                                             <TableCell className="font-semibold text-gray-800">${item.subtotal}</TableCell>
                                        </TableRow>
                                   ))}
                              </TableBody>
                         </Table>
                    </div>

                    {/* Totales */}
                    <div className="flex justify-end mt-4 text-sm space-x-6">
                         <p>
                              <span className="font-semibold">Subtotal:</span> ${sale.subtotal}
                         </p>
                         <p>
                              <span className="font-semibold">IVA:</span> ${sale.ivaAmount}
                         </p>
                         <p>
                              <span className="font-semibold">Total:</span> ${sale.total}
                         </p>
                    </div>

                    <DialogFooter>
                         <DialogClose asChild>
                              <Button variant="outline" className="border-[#EFEFEF] text-gray-700">
                                   Cerrar
                              </Button>
                         </DialogClose>
                    </DialogFooter>
               </DialogContent>
          </Dialog>
     );
}
