"use client";

import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shadcn/components/ui/table";
import { Button } from "@/shadcn/components/ui/button";
import { Input } from "@/shadcn/components/ui/input";
import { Badge } from "@/shadcn/components/ui/badge";
import { Edit, Trash2, Copy, Search, ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import { EditProductDialog } from "./EditProductDialog";
import { DeleteProductDialog } from "./DeleteProductDialog";
import { CreateProductDialog } from "./CreateProductDialog";

type Product = {
     id: string;
     brand: string;
     model: string;
     variant: string;
     ram: string;
     storage: string;
     price: number;
     stock: number;
     camera: number;
     battery: number;
     updatedAt: string;
};

const sampleProducts: Product[] = [
     {
          id: "1",
          brand: "Samsung",
          model: "Galaxy S23",
          variant: "Ultra",
          ram: "12GB",
          storage: "256GB",
          price: 1199,
          stock: 8,
          camera: 200,
          battery: 5000,
          updatedAt: "2023-09-10",
     },
     {
          id: "2",
          brand: "Xiaomi",
          model: "Mi 13",
          variant: "Pro",
          ram: "8GB",
          storage: "128GB",
          price: 699,
          stock: 2,
          camera: 50,
          battery: 4600,
          updatedAt: "2023-08-28",
     },
     {
          id: "3",
          brand: "Apple",
          model: "iPhone 14",
          variant: "Pro Max",
          ram: "6GB",
          storage: "512GB",
          price: 1399,
          stock: 5,
          camera: 48,
          battery: 4300,
          updatedAt: "2023-09-01",
     },
];

export default function ProductsTable() {
     const [query, setQuery] = useState("");
     const [page, setPage] = useState(1);
     const pageSize = 2; // demo: 2 productos por página

     const filtered = sampleProducts.filter(
          (p) =>
               p.brand.toLowerCase().includes(query.toLowerCase()) ||
               p.model.toLowerCase().includes(query.toLowerCase()) ||
               p.variant.toLowerCase().includes(query.toLowerCase())
     );

     const totalPages = Math.ceil(filtered.length / pageSize);
     const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

     return (
          <div className="space-y-4">
               {/* Buscador */}

               <div className="flex justify-between flex-col-reverse gap-5 sm:flex-row sm:justify-between">
                    <div className="relative md:w-2/3 lg:w-1/3 w-full">
                         <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                         <Input
                              placeholder="Buscar por marca, modelo o variante..."
                              className="pl-8 rounded-lg border-[#EFEFEF] focus-visible:ring-gray-300 focus-visible:border-gray-300"
                              value={query}
                              onChange={(e) => setQuery(e.target.value)}
                         />
                    </div>
                    {/* Crear producto */}
                    <CreateProductDialog />
               </div>

               {/* Tabla */}
               <div className="rounded-xl border border-[#EFEFEF] overflow-hidden shadow-sm">
                    <Table>
                         <TableHeader className="bg-[#F5F7F9]">
                              <TableRow className="border-0">
                                   <TableHead className="font-semibold text-gray-700 py-2 pl-5">Marca</TableHead>
                                   <TableHead className="font-semibold text-gray-700 py-2">Modelo</TableHead>
                                   <TableHead className="font-semibold text-gray-700 py-2">Variante</TableHead>
                                   <TableHead className="font-semibold text-gray-700 py-2">RAM / Almacenamiento</TableHead>
                                   <TableHead className="font-semibold text-gray-700 py-2">Precio</TableHead>
                                   <TableHead className="font-semibold text-gray-700 py-2">Stock</TableHead>
                                   <TableHead className="font-semibold text-gray-700 py-2">Cámara</TableHead>
                                   <TableHead className="font-semibold text-gray-700 py-2">Batería</TableHead>
                                   <TableHead className="text-center font-semibold text-gray-700 py-2">Acciones</TableHead>
                              </TableRow>
                         </TableHeader>
                         <TableBody>
                              {paginated.map((p) => (
                                   <TableRow key={p.id} className="border-0 hover:bg-gray-50 transition-colors">
                                        <TableCell className="font-medium py-1.5 pl-5">{p.brand}</TableCell>
                                        <TableCell className="py-1.5">{p.model}</TableCell>
                                        <TableCell className="py-1.5">{p.variant}</TableCell>
                                        <TableCell className="py-1.5">
                                             {p.ram} / {p.storage}
                                        </TableCell>
                                        <TableCell className="py-1.5">
                                             <span className="font-semibold text-gray-800">${p.price}</span>
                                        </TableCell>
                                        <TableCell className="py-1.5">
                                             {p.stock <= 3 ? (
                                                  <Badge className="bg-red-100 text-red-700 border border-red-200">
                                                       Bajo: {p.stock}
                                                  </Badge>
                                             ) : (
                                                  <Badge className="bg-green-100 text-green-700 border border-green-200">
                                                       {p.stock}
                                                  </Badge>
                                             )}
                                        </TableCell>
                                        <TableCell className="py-1.5">{p.camera} MP</TableCell>
                                        <TableCell className="py-1.5">{p.battery} mAh</TableCell>
                                        <TableCell className="py-1.5">
                                             <div className="flex justify-center gap-2">
                                                  <EditProductDialog product={p} />
                                                  <DeleteProductDialog product={p} />
                                                  {/* <Button size="icon" variant="ghost" className="hover:bg-gray-100">
                                                       <Copy className="h-4 w-4 text-gray-600" />
                                                  </Button> */}
                                                  <Button size="icon" variant="ghost" className="hover:bg-gray-100">
                                                       <ShoppingCart className="h-4 w-4 text-green-600" />
                                                  </Button>
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
