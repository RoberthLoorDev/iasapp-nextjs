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
import { Input } from "@/shadcn/components/ui/input";
import { Label } from "@/shadcn/components/ui/label";
import { Textarea } from "@/shadcn/components/ui/textarea";
import { Edit } from "lucide-react";

type Product = {
     id: string;
     brand: string;
     model: string;
     variant?: string;
     ram: string;
     storage: string;
     processor?: string;
     display?: string;
     mainCameraMp?: number;
     frontCameraMp?: number;
     batteryMah?: number;
     features?: string;
     price: number;
     stock: number;
     description?: string;
     imageUrl?: string;
};

export function EditProductDialog({ product }: { product: Product }) {
     return (
          <Dialog>
               <DialogTrigger asChild>
                    <Button size="icon" variant="ghost" className="hover:bg-gray-100">
                         <Edit className="h-4 w-4 text-gray-600" />
                    </Button>
               </DialogTrigger>
               <DialogContent className="sm:max-w-[600px] max-h-[95dvh] overflow-y-auto rounded-xl border border-[#EFEFEF]">
                    <DialogHeader>
                         <DialogTitle className="text-lg font-semibold text-gray-800">Editar producto</DialogTitle>
                         <DialogDescription>Modifica los datos del producto y guarda los cambios.</DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-2">
                         {/* Primera fila */}
                         <div className="grid grid-cols-2 gap-4">
                              <div className="grid gap-2">
                                   <Label htmlFor="brand">Marca</Label>
                                   <Input
                                        id="brand"
                                        defaultValue={product.brand}
                                        className="border-[#EFEFEF] focus-visible:ring-gray-300"
                                   />
                              </div>
                              <div className="grid gap-2">
                                   <Label htmlFor="model">Modelo</Label>
                                   <Input
                                        id="model"
                                        defaultValue={product.model}
                                        className="border-[#EFEFEF] focus-visible:ring-gray-300"
                                   />
                              </div>
                         </div>

                         {/* Segunda fila */}
                         <div className="grid grid-cols-2 gap-4">
                              <div className="grid gap-2">
                                   <Label htmlFor="variant">Variante</Label>
                                   <Input
                                        id="variant"
                                        defaultValue={product.variant}
                                        className="border-[#EFEFEF] focus-visible:ring-gray-300"
                                   />
                              </div>
                              <div className="grid gap-2">
                                   <Label htmlFor="processor">Procesador</Label>
                                   <Input
                                        id="processor"
                                        defaultValue={product.processor}
                                        className="border-[#EFEFEF] focus-visible:ring-gray-300"
                                   />
                              </div>
                         </div>

                         {/* Tercera fila */}
                         <div className="grid grid-cols-2 gap-4">
                              <div className="grid gap-2">
                                   <Label htmlFor="ram">RAM</Label>
                                   <Input
                                        id="ram"
                                        defaultValue={product.ram}
                                        className="border-[#EFEFEF] focus-visible:ring-gray-300"
                                   />
                              </div>
                              <div className="grid gap-2">
                                   <Label htmlFor="storage">Almacenamiento</Label>
                                   <Input
                                        id="storage"
                                        defaultValue={product.storage}
                                        className="border-[#EFEFEF] focus-visible:ring-gray-300"
                                   />
                              </div>
                         </div>

                         {/* Cuarta fila */}
                         <div className="grid grid-cols-2 gap-4">
                              <div className="grid gap-2">
                                   <Label htmlFor="mainCamera">Cámara principal (MP)</Label>
                                   <Input
                                        id="mainCamera"
                                        type="number"
                                        defaultValue={product.mainCameraMp}
                                        className="border-[#EFEFEF] focus-visible:ring-gray-300"
                                   />
                              </div>
                              <div className="grid gap-2">
                                   <Label htmlFor="frontCamera">Cámara frontal (MP)</Label>
                                   <Input
                                        id="frontCamera"
                                        type="number"
                                        defaultValue={product.frontCameraMp}
                                        className="border-[#EFEFEF] focus-visible:ring-gray-300"
                                   />
                              </div>
                         </div>

                         {/* Quinta fila */}
                         <div className="grid grid-cols-2 gap-4">
                              <div className="grid gap-2">
                                   <Label htmlFor="battery">Batería (mAh)</Label>
                                   <Input
                                        id="battery"
                                        type="number"
                                        defaultValue={product.batteryMah}
                                        className="border-[#EFEFEF] focus-visible:ring-gray-300"
                                   />
                              </div>
                              <div className="grid gap-2">
                                   <Label htmlFor="price">Precio</Label>
                                   <Input
                                        id="price"
                                        type="number"
                                        defaultValue={product.price}
                                        className="border-[#EFEFEF] focus-visible:ring-gray-300"
                                   />
                              </div>
                         </div>

                         {/* Sexta fila */}
                         <div className="grid grid-cols-2 gap-4">
                              <div className="grid gap-2">
                                   <Label htmlFor="stock">Stock</Label>
                                   <Input
                                        id="stock"
                                        type="number"
                                        defaultValue={product.stock}
                                        className="border-[#EFEFEF] focus-visible:ring-gray-300"
                                   />
                              </div>
                              <div className="grid gap-2">
                                   <Label htmlFor="display">Pantalla</Label>
                                   <Input
                                        id="display"
                                        defaultValue={product.display}
                                        className="border-[#EFEFEF] focus-visible:ring-gray-300"
                                   />
                              </div>
                         </div>

                         {/* Features */}
                         <div className="grid gap-2">
                              <Label htmlFor="features">Características</Label>
                              <Textarea
                                   id="features"
                                   defaultValue={product.features}
                                   placeholder="• 5G • NFC • Dual SIM"
                                   className="border-[#EFEFEF] focus-visible:ring-gray-300"
                              />
                         </div>

                         {/* Description */}
                         <div className="grid gap-2">
                              <Label htmlFor="description">Descripción</Label>
                              <Textarea
                                   id="description"
                                   defaultValue={product.description}
                                   className="border-[#EFEFEF] focus-visible:ring-gray-300"
                              />
                         </div>

                         {/* Imagen */}
                         <div className="grid gap-2">
                              <Label htmlFor="imageUrl">Imagen (URL)</Label>
                              <Input
                                   id="imageUrl"
                                   defaultValue={product.imageUrl}
                                   className="border-[#EFEFEF] focus-visible:ring-gray-300"
                              />
                         </div>
                    </div>

                    <DialogFooter>
                         <DialogClose asChild>
                              <Button variant="outline" className="border-[#EFEFEF] text-gray-700">
                                   Cancelar
                              </Button>
                         </DialogClose>
                         <Button variant="default" type="submit" className="text-white hover:bg-gray-800">
                              Guardar
                         </Button>
                    </DialogFooter>
               </DialogContent>
          </Dialog>
     );
}
