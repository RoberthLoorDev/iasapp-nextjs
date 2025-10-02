"use client";

import { Button } from "@/shadcn/components/ui/button";
import {
     Dialog,
     DialogContent,
     DialogDescription,
     DialogFooter,
     DialogHeader,
     DialogTitle,
     DialogTrigger,
} from "@/shadcn/components/ui/dialog";
import { Input } from "@/shadcn/components/ui/input";
import { Label } from "@/shadcn/components/ui/label";
import { Textarea } from "@/shadcn/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProductSchema, CreateProductForm } from "../schemas/productSchema";
import useCreateProduct from "@/hooks/useCreateProduct";
import { useState } from "react";

export function CreateProductDialog() {
     const [open, setOpen] = useState(false);
     const { mutate, isPending } = useCreateProduct();

     const {
          register,
          handleSubmit,
          formState: { errors },
          reset, // Agregamos reset para limpiar el formulario
     } = useForm({
          resolver: zodResolver(createProductSchema),
          defaultValues: {
               brand: "",
               model: "",
               variant: "",
               ram: "",
               storage: "",
               processor: "",
               display: "",
               mainCameraMp: 0, // Opcional, usa undefined
               frontCameraMp: 0,
               batteryMah: 0,
               features: "",
               price: 0,
               stock: 0,
               description: "",
               imageUrl: "",
          },
     });

     const onSubmit = (data: CreateProductForm) => {
          console.log("Datos enviados al API:", data); // Para depurar
          mutate(data, {
               onSuccess: (response) => {
                    console.log("Respuesta del API:", response); // Para depurar
                    setOpen(false);
                    reset(); // Limpia el formulario después de éxito
               },
               onError: (error) => {
                    console.error("Error al crear el producto:", error); // Para depurar
               },
          });
     };

     return (
          <Dialog open={open} onOpenChange={setOpen}>
               <DialogTrigger asChild>
                    <Button className="bg-black text-white hover:bg-gray-800">+ Nuevo producto</Button>
               </DialogTrigger>

               <DialogContent className="sm:max-w-[600px] max-h-[95dvh] overflow-y-auto rounded-xl border border-[#EFEFEF]">
                    <DialogHeader>
                         <DialogTitle className="text-lg font-semibold text-gray-800">Crear nuevo producto</DialogTitle>
                         <DialogDescription>Ingresa los datos del producto para registrarlo en el inventario.</DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmit(onSubmit)}>
                         <div className="grid gap-4 py-2">
                              {/* Primera fila */}
                              <div className="grid grid-cols-2 gap-4">
                                   <div className="grid gap-2">
                                        <Label htmlFor="brand">Marca</Label>
                                        <Input
                                             id="brand"
                                             className="border-[#EFEFEF] focus-visible:ring-gray-300"
                                             {...register("brand")}
                                        />
                                        {errors.brand && <p className="text-red-500 text-sm">{errors.brand.message}</p>}
                                   </div>
                                   <div className="grid gap-2">
                                        <Label htmlFor="model">Modelo</Label>
                                        <Input
                                             id="model"
                                             className="border-[#EFEFEF] focus-visible:ring-gray-300"
                                             {...register("model")}
                                        />
                                        {errors.model && <p className="text-red-500 text-sm">{errors.model.message}</p>}
                                   </div>
                              </div>

                              {/* Segunda fila */}
                              <div className="grid grid-cols-2 gap-4">
                                   <div className="grid gap-2">
                                        <Label htmlFor="variant">Variante</Label>
                                        <Input
                                             id="variant"
                                             className="border-[#EFEFEF] focus-visible:ring-gray-300"
                                             {...register("variant")}
                                        />
                                        {errors.variant && <p className="text-red-500 text-sm">{errors.variant.message}</p>}
                                   </div>
                                   <div className="grid gap-2">
                                        <Label htmlFor="processor">Procesador</Label>
                                        <Input
                                             id="processor"
                                             className="border-[#EFEFEF] focus-visible:ring-gray-300"
                                             {...register("processor")}
                                        />
                                        {errors.processor && <p className="text-red-500 text-sm">{errors.processor.message}</p>}
                                   </div>
                              </div>

                              {/* Tercera fila */}
                              <div className="grid grid-cols-2 gap-4">
                                   <div className="grid gap-2">
                                        <Label htmlFor="ram">RAM</Label>
                                        <Input
                                             id="ram"
                                             className="border-[#EFEFEF] focus-visible:ring-gray-300"
                                             {...register("ram")}
                                        />
                                        {errors.ram && <p className="text-red-500 text-sm">{errors.ram.message}</p>}
                                   </div>
                                   <div className="grid gap-2">
                                        <Label htmlFor="storage">Almacenamiento</Label>
                                        <Input
                                             id="storage"
                                             className="border-[#EFEFEF] focus-visible:ring-gray-300"
                                             {...register("storage")}
                                        />
                                        {errors.storage && <p className="text-red-500 text-sm">{errors.storage.message}</p>}
                                   </div>
                              </div>

                              {/* Cuarta fila */}
                              <div className="grid grid-cols-2 gap-4">
                                   <div className="grid gap-2">
                                        <Label htmlFor="mainCamera">Cámara principal (MP)</Label>
                                        <Input
                                             id="mainCamera"
                                             type="number"
                                             className="border-[#EFEFEF] focus-visible:ring-gray-300"
                                             {...register("mainCameraMp", {
                                                  valueAsNumber: true,
                                             })}
                                        />
                                        {errors.mainCameraMp && (
                                             <p className="text-red-500 text-sm">{errors.mainCameraMp.message}</p>
                                        )}
                                   </div>
                                   <div className="grid gap-2">
                                        <Label htmlFor="frontCamera">Cámara frontal (MP)</Label>
                                        <Input
                                             id="frontCamera"
                                             type="number"
                                             className="border-[#EFEFEF] focus-visible:ring-gray-300"
                                             {...register("frontCameraMp", {
                                                  valueAsNumber: true,
                                             })}
                                        />
                                        {errors.frontCameraMp && (
                                             <p className="text-red-500 text-sm">{errors.frontCameraMp.message}</p>
                                        )}
                                   </div>
                              </div>

                              {/* Quinta fila */}
                              <div className="grid grid-cols-2 gap-4">
                                   <div className="grid gap-2">
                                        <Label htmlFor="battery">Batería (mAh)</Label>
                                        <Input
                                             id="battery"
                                             type="number"
                                             className="border-[#EFEFEF] focus-visible:ring-gray-300"
                                             {...register("batteryMah", {
                                                  valueAsNumber: true,
                                             })}
                                        />
                                        {errors.batteryMah && <p className="text-red-500 text-sm">{errors.batteryMah.message}</p>}
                                   </div>
                                   <div className="grid gap-2">
                                        <Label htmlFor="price">Precio</Label>
                                        <Input
                                             id="price"
                                             type="number"
                                             className="border-[#EFEFEF] focus-visible:ring-gray-300"
                                             {...register("price", {
                                                  valueAsNumber: true,
                                                  required: true,
                                             })}
                                        />
                                        {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
                                   </div>
                              </div>

                              {/* Sexta fila */}
                              <div className="grid grid-cols-2 gap-4">
                                   <div className="grid gap-2">
                                        <Label htmlFor="stock">Stock</Label>
                                        <Input
                                             id="stock"
                                             type="number"
                                             className="border-[#EFEFEF] focus-visible:ring-gray-300"
                                             {...register("stock", {
                                                  valueAsNumber: true,
                                             })}
                                        />
                                        {errors.stock && <p className="text-red-500 text-sm">{errors.stock.message}</p>}
                                   </div>
                                   <div className="grid gap-2">
                                        <Label htmlFor="display">Pantalla</Label>
                                        <Input
                                             id="display"
                                             className="border-[#EFEFEF] focus-visible:ring-gray-300"
                                             {...register("display")}
                                        />
                                        {errors.display && <p className="text-red-500 text-sm">{errors.display.message}</p>}
                                   </div>
                              </div>

                              {/* Features */}
                              <div className="grid gap-2">
                                   <Label htmlFor="features">Características</Label>
                                   <Textarea
                                        id="features"
                                        placeholder="• 5G • NFC • Dual SIM"
                                        className="border-[#EFEFEF] focus-visible:ring-gray-300"
                                        {...register("features")}
                                   />
                                   {errors.features && <p className="text-red-500 text-sm">{errors.features.message}</p>}
                              </div>

                              {/* Description */}
                              <div className="grid gap-2">
                                   <Label htmlFor="description">Descripción</Label>
                                   <Textarea
                                        id="description"
                                        className="border-[#EFEFEF] focus-visible:ring-gray-300"
                                        {...register("description")}
                                   />
                                   {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                              </div>

                              {/* Imagen */}
                              <div className="grid gap-2">
                                   <Label htmlFor="imageUrl">Imagen (URL)</Label>
                                   <Input
                                        id="imageUrl"
                                        className="border-[#EFEFEF] focus-visible:ring-gray-300"
                                        {...register("imageUrl")}
                                   />
                                   {errors.imageUrl && <p className="text-red-500 text-sm">{errors.imageUrl.message}</p>}
                              </div>
                         </div>

                         <DialogFooter>
                              <Button
                                   type="button"
                                   variant="outline"
                                   className="border-[#EFEFEF] text-gray-700"
                                   onClick={() => setOpen(false)}
                              >
                                   Cancelar
                              </Button>
                              <Button type="submit" className="bg-black text-white hover:bg-gray-800" disabled={isPending}>
                                   {isPending ? "Creando..." : "Crear Producto"}
                              </Button>
                         </DialogFooter>
                    </form>
               </DialogContent>
          </Dialog>
     );
}
