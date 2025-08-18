"use client";

import {
     Table,
     TableBody,
     TableCaption,
     TableCell,
     TableFooter,
     TableHead,
     TableHeader,
     TableRow,
} from "@/shadcn/components/ui/table";
import {
     Pagination,
     PaginationContent,
     PaginationEllipsis,
     PaginationItem,
     PaginationLink,
     PaginationNext,
     PaginationPrevious,
} from "@/shadcn/components/ui/pagination";
import { Badge } from "@/shadcn/components/ui/badge";
import { ConversationDialog } from "./ConversationDialog";

// Datos de ejemplo
const conversaciones = [
     {
          cliente: "0989587211",
          producto: "iPhone 15 Pro",
          necesitaIntervencion: true,
          confirmacionCompra: "En proceso",
          inicioConversacion: "2025-08-17 09:15",
          mensajes: [
               { autor: "cliente" as const, texto: "Hola, estoy interesado en el iPhone 15 Pro." },
               {
                    autor: "bot" as const,
                    texto: "¡Hola! Tenemos disponible el iPhone 15 Pro. ¿Quieres ver opciones de financiamiento?",
               },
               { autor: "cliente" as const, texto: "Sí, por favor." },
               { autor: "bot" as const, texto: "Perfecto, tenemos 12 cuotas de $120 o 24 cuotas de $65. ¿Cuál prefieres?" },
          ],
     },
     {
          cliente: "0989587212",
          producto: "Samsung Galaxy S24",
          necesitaIntervencion: false,
          confirmacionCompra: "Confirmado",
          inicioConversacion: "2025-08-17 10:22",
          mensajes: [
               { autor: "cliente" as const, texto: "¿Tienen el Galaxy S24 en color negro?" },
               { autor: "bot" as const, texto: "Sí, disponible en negro y azul. ¿Quieres confirmar la compra?" },
               { autor: "cliente" as const, texto: "Sí, confirmo la compra." },
          ],
     },
];

export function ConversationsTable() {
     return (
          <div className="space-y-4">
               <Table>
                    <TableCaption>Lista de conversaciones recientes con clientes.</TableCaption>
                    <TableHeader className="bg-[#F9FAFB] rounded-3xl">
                         <TableRow>
                              <TableHead className="py-4 px-8">N° Cliente</TableHead>
                              <TableHead className="py-4 px-8">Producto</TableHead>
                              <TableHead className="py-4 px-8">Necesita intervención?</TableHead>
                              <TableHead className="py-4 px-8">Confirmación de compra</TableHead>
                              <TableHead className="py-4 px-8">Inicio de conversación</TableHead>
                         </TableRow>
                    </TableHeader>
                    <TableBody>
                         {conversaciones.map((conv) => (
                              <ConversationDialog
                                   key={conv.cliente}
                                   cliente={conv.cliente}
                                   producto={conv.producto}
                                   mensajes={conv.mensajes}
                                   trigger={
                                        <TableRow className="cursor-pointer hover:bg-gray-50">
                                             <TableCell className="font-medium py-4 px-8">{conv.cliente}</TableCell>
                                             <TableCell className="py-4 px-8">{conv.producto}</TableCell>
                                             <TableCell className="py-4 px-8">
                                                  {conv.necesitaIntervencion ? (
                                                       <Badge className="bg-[#FEE2E2] text-[#991B1B] p-1">
                                                            Sí, requiere atención
                                                       </Badge>
                                                  ) : (
                                                       <Badge variant="outline" className="bg-[#DBEAFE] text-[#1E40AF]">
                                                            No
                                                       </Badge>
                                                  )}
                                             </TableCell>
                                             <TableCell className="py-4 px-8">
                                                  {conv.confirmacionCompra === "Confirmado" ? (
                                                       <Badge className="bg-[#DCFCE7] text-[#166534]">Confirmado</Badge>
                                                  ) : (
                                                       <Badge className="bg-[#FEF9C3] text-[#854E0F]">En proceso</Badge>
                                                  )}
                                             </TableCell>
                                             <TableCell className="py-4 px-8">{conv.inicioConversacion}</TableCell>
                                        </TableRow>
                                   }
                              />
                         ))}
                    </TableBody>
                    <TableFooter className="bg-white">
                         <TableRow>
                              <TableCell colSpan={5}>
                                   <div className="flex justify-end">
                                        <Pagination className="bg-white">
                                             <PaginationContent>
                                                  <PaginationItem>
                                                       <PaginationPrevious href="#" />
                                                  </PaginationItem>
                                                  <PaginationItem>
                                                       <PaginationLink href="#">1</PaginationLink>
                                                  </PaginationItem>
                                                  <PaginationItem>
                                                       <PaginationLink href="#" isActive>
                                                            2
                                                       </PaginationLink>
                                                  </PaginationItem>
                                                  <PaginationItem>
                                                       <PaginationLink href="#">3</PaginationLink>
                                                  </PaginationItem>
                                                  <PaginationItem>
                                                       <PaginationEllipsis />
                                                  </PaginationItem>
                                                  <PaginationItem>
                                                       <PaginationNext href="#" />
                                                  </PaginationItem>
                                             </PaginationContent>
                                        </Pagination>
                                   </div>
                              </TableCell>
                         </TableRow>
                    </TableFooter>
               </Table>
          </div>
     );
}
