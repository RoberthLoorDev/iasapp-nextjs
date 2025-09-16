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
import { Label } from "@/shadcn/components/ui/label";
import { Trash2 } from "lucide-react";

type Product = {
     id: string;
     brand: string;
     model: string;
     variant?: string;
     price: number;
     stock: number;
};

export function DeleteProductDialog({ product }: { product: Product }) {
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

     // Reiniciar contador cuando se abre el modal
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
               <DialogContent className="sm:max-w-[450px] rounded-xl border border-[#EFEFEF]">
                    <DialogHeader>
                         <DialogTitle className="text-lg font-semibold text-gray-800">Confirmar eliminación</DialogTitle>
                         <DialogDescription>
                              Esta acción no se puede deshacer. El producto será eliminado permanentemente.
                         </DialogDescription>
                    </DialogHeader>

                    {/* Datos clave del producto */}
                    <div className="bg-[#F5F7F9] rounded-lg p-4 text-sm space-y-1">
                         <p>
                              <Label className="font-semibold">Marca:</Label> {product.brand}
                         </p>
                         <p>
                              <Label className="font-semibold">Modelo:</Label> {product.model}
                         </p>
                         {product.variant && (
                              <p>
                                   <Label className="font-semibold">Variante:</Label> {product.variant}
                              </p>
                         )}
                         <p>
                              <Label className="font-semibold">Precio:</Label> ${product.price}
                         </p>
                         <p>
                              <Label className="font-semibold">Stock:</Label> {product.stock}
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
                              className={`${
                                   countdown > 0
                                        ? "bg-gray-300 text-gray-600 cursor-not-allowed"
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
