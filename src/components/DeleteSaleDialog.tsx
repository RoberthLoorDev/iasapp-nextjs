"use client";

import { useEffect, useState } from "react";
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
import { Trash2 } from "lucide-react";

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

export function DeleteSaleDialog({ sale }: { sale: Sale }) {
     const [countdown, setCountdown] = useState(7);
     const [open, setOpen] = useState(false);

     useEffect(() => {
          let timer: NodeJS.Timeout | null = null;

          if (open && countdown > 0) {
               timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
          }

          return () => {
               if (timer) clearTimeout(timer);
          };
     }, [open, countdown]);

     const handleOpenChange = (isOpen: boolean) => {
          setOpen(isOpen);
          if (isOpen) {
               setCountdown(7);
          }
     };

     return (
          <Dialog open={open} onOpenChange={handleOpenChange}>
               <DialogTrigger asChild>
                    <Button size="icon" variant="ghost" className="hover:bg-gray-100">
                         <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>
               </DialogTrigger>
               <DialogContent className="sm:max-w-[550px] rounded-xl border border-[#EFEFEF]">
                    <DialogHeader>
                         <DialogTitle className="text-lg font-semibold text-gray-800">Confirmar eliminación</DialogTitle>
                         <DialogDescription className="text-gray-600">
                              Esta acción no se puede deshacer. La venta será eliminada permanentemente.
                         </DialogDescription>
                    </DialogHeader>

                    {/* Info clave de la venta */}
                    <div className="grid grid-cols-2 gap-4 bg-[#F5F7F9] rounded-lg p-4 text-sm">
                         <p>
                              <span className="font-semibold">Factura:</span> {sale.invoiceNumber}
                         </p>
                         <p>
                              <span className="font-semibold">Fecha:</span> {sale.createdAt}
                         </p>
                         <p>
                              <span className="font-semibold">Cliente:</span> {sale.customerName}
                         </p>
                         <p>
                              <span className="font-semibold">Total:</span> ${sale.total}
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

                    <DialogFooter className="mt-4">
                         <DialogClose asChild>
                              <Button variant="outline" className="border-[#EFEFEF] text-gray-700">
                                   Cancelar
                              </Button>
                         </DialogClose>
                         <Button
                              disabled={countdown > 0}
                              className={`min-w-[120px] ${
                                   countdown > 0
                                        ? "bg-gray-200 text-gray-600 cursor-not-allowed"
                                        : "bg-red-600 text-white hover:bg-red-700"
                              }`}
                         >
                              {countdown > 0 ? `Eliminar (${countdown})` : "Eliminar"}
                         </Button>
                    </DialogFooter>
               </DialogContent>
          </Dialog>
     );
}
