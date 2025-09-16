"use client";

import { useState } from "react";
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
import { Input } from "@/shadcn/components/ui/input";
import { Label } from "@/shadcn/components/ui/label";
import { Plus, Pencil } from "lucide-react";
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

export function UpdateSaleDialog({ sale }: { sale: Sale }) {
     // Calculamos el IVA (%) inicial a partir del JSON
     const initialIvaRate = sale.subtotal > 0 ? (sale.ivaAmount * 100) / sale.subtotal : 15;

     const [ivaRate, setIvaRate] = useState<number>(initialIvaRate);
     const [items, setItems] = useState(
          sale.items.map((i) => ({
               productName: `${i.product.brand} ${i.product.model} ${i.product.variant || ""}`,
               quantity: i.quantity,
               unitPrice: i.unitPrice,
               subtotal: i.subtotal,
          }))
     );
     const [customerName, setCustomerName] = useState(sale.customerName);
     const [customerCedula, setCustomerCedula] = useState(sale.customerCedula);
     const [customerPhone, setCustomerPhone] = useState(sale.customerPhone || "");

     // Calcular totales en base a los items editados
     const subtotal = items.reduce((acc, item) => acc + item.subtotal, 0);
     const ivaAmount = (subtotal * ivaRate) / 100;
     const total = subtotal + ivaAmount;

     const addItem = () => {
          setItems([...items, { productName: "", quantity: 1, unitPrice: 0, subtotal: 0 }]);
     };

     const updateItem = (index: number, field: keyof (typeof items)[0], value: any) => {
          const updated = [...items];
          const item = { ...updated[index], [field]: value };

          if (field === "quantity" || field === "unitPrice") {
               item.subtotal = item.quantity * item.unitPrice;
          }

          updated[index] = item;
          setItems(updated);
     };

     return (
          <Dialog>
               <DialogTrigger asChild>
                    <Button size="icon" variant="ghost" className="hover:bg-gray-100">
                         <Pencil className="h-4 w-4 text-gray-600" />
                    </Button>
               </DialogTrigger>
               <DialogContent className="sm:max-w-[750px] max-h-[90dvh] overflow-y-auto rounded-xl border border-[#EFEFEF]">
                    <DialogHeader>
                         <DialogTitle className="text-lg font-semibold text-gray-800">Actualizar venta</DialogTitle>
                         <DialogDescription className="text-gray-600">Modifica la información de la venta.</DialogDescription>
                    </DialogHeader>

                    {/* Cliente */}
                    <div className="bg-[#F5F7F9] rounded-lg p-4 space-y-3 text-sm">
                         <h3 className="font-semibold text-gray-700">Datos del cliente</h3>
                         <div className="grid grid-cols-3 gap-3">
                              <div>
                                   <Label>Nombre</Label>
                                   <Input
                                        className="bg-white mt-1"
                                        value={customerName}
                                        onChange={(e) => setCustomerName(e.target.value)}
                                   />
                              </div>
                              <div>
                                   <Label>Cédula</Label>
                                   <Input
                                        className="bg-white mt-1"
                                        value={customerCedula}
                                        onChange={(e) => setCustomerCedula(e.target.value)}
                                   />
                              </div>
                              <div>
                                   <Label>Teléfono</Label>
                                   <Input
                                        className="bg-white mt-1"
                                        value={customerPhone}
                                        onChange={(e) => setCustomerPhone(e.target.value)}
                                   />
                              </div>
                         </div>
                    </div>

                    {/* Productos */}
                    <div className="bg-[#F5F7F9] rounded-lg p-4 space-y-3 text-sm">
                         <h3 className="font-semibold text-gray-700">Productos</h3>
                         <div className="rounded-xl border border-[#EFEFEF] overflow-hidden">
                              <Table>
                                   <TableHeader className="bg-[#F0F2F5]">
                                        <TableRow>
                                             <TableHead>Producto</TableHead>
                                             <TableHead>Cantidad</TableHead>
                                             <TableHead>Precio Unitario</TableHead>
                                             <TableHead>Subtotal</TableHead>
                                        </TableRow>
                                   </TableHeader>
                                   <TableBody>
                                        {items.map((item, index) => (
                                             <TableRow key={index}>
                                                  <TableCell>
                                                       <Input
                                                            className="bg-white mt-1"
                                                            value={item.productName}
                                                            onChange={(e) => updateItem(index, "productName", e.target.value)}
                                                       />
                                                  </TableCell>
                                                  <TableCell>
                                                       <Input
                                                            className="bg-white mt-1"
                                                            type="number"
                                                            value={item.quantity}
                                                            onChange={(e) =>
                                                                 updateItem(index, "quantity", Number(e.target.value))
                                                            }
                                                       />
                                                  </TableCell>
                                                  <TableCell>
                                                       <Input
                                                            className="bg-white mt-1"
                                                            type="number"
                                                            value={item.unitPrice}
                                                            onChange={(e) =>
                                                                 updateItem(index, "unitPrice", Number(e.target.value))
                                                            }
                                                       />
                                                  </TableCell>
                                                  <TableCell className="font-semibold text-gray-800">${item.subtotal}</TableCell>
                                             </TableRow>
                                        ))}
                                   </TableBody>
                              </Table>
                         </div>
                         <Button onClick={addItem} variant="outline" size="sm" className="mt-2 border-[#EFEFEF]">
                              <Plus className="h-4 w-4 mr-1" /> Agregar producto
                         </Button>
                    </div>

                    {/* Totales */}
                    <div className="bg-[#F5F7F9] rounded-lg p-4 space-y-3 text-sm">
                         <h3 className="font-semibold text-gray-700">Totales</h3>
                         <div className="grid grid-cols-4 gap-3 items-center">
                              <div>
                                   <Label>IVA (%)</Label>
                                   <Input
                                        className="bg-white mt-1"
                                        type="number"
                                        value={ivaRate}
                                        onChange={(e) => setIvaRate(Number(e.target.value))}
                                   />
                              </div>
                              <p className="col-span-1 font-semibold">Subtotal: ${subtotal.toFixed(2)}</p>
                              <p className="col-span-1 font-semibold">IVA: ${ivaAmount.toFixed(2)}</p>
                              <p className="col-span-1 font-semibold text-gray-800">Total: ${total.toFixed(2)}</p>
                         </div>
                    </div>

                    <DialogFooter>
                         <DialogClose asChild>
                              <Button variant="outline" className="border-[#EFEFEF] text-gray-700">
                                   Cancelar
                              </Button>
                         </DialogClose>
                         <Button className="bg-[#04452E] text-white hover:bg-green-900">Guardar cambios</Button>
                    </DialogFooter>
               </DialogContent>
          </Dialog>
     );
}
