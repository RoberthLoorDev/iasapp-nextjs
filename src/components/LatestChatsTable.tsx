"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shadcn/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shadcn/components/ui/card";

import chatsData from "@/data/ultimos-chats.json";

export function LatestChatsTable() {
     return (
          <Card className="border border-[#efefef]">
               <CardHeader className="pb-0">
                    <CardTitle className="text-[#05462F] text-2xl">ÚLTIMOS CHATS</CardTitle>
                    <CardDescription>5 conversaciones recientes</CardDescription>
               </CardHeader>

               <CardContent className="px-2 sm:p-6">
                    <Table>
                         <TableHeader>
                              <TableRow>
                                   <TableHead>Cliente</TableHead>
                                   <TableHead>Teléfono</TableHead>
                                   <TableHead>Último mensaje</TableHead>
                                   <TableHead className="text-right">Fecha</TableHead>
                              </TableRow>
                         </TableHeader>
                         <TableBody>
                              {chatsData.map((chat, idx) => (
                                   <TableRow key={idx}>
                                        <TableCell className="font-medium">{chat.cliente}</TableCell>
                                        <TableCell>{chat.telefono}</TableCell>
                                        <TableCell className="truncate max-w-[250px]">{chat.ultimoMensaje}</TableCell>
                                        <TableCell className="text-right">
                                             {new Date(chat.fecha).toLocaleString("es-ES", {
                                                  day: "2-digit",
                                                  month: "2-digit",
                                                  year: "numeric",
                                                  hour: "2-digit",
                                                  minute: "2-digit",
                                             })}
                                        </TableCell>
                                   </TableRow>
                              ))}
                         </TableBody>
                    </Table>
               </CardContent>
          </Card>
     );
}
