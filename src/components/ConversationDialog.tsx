import { useState } from "react";
import { Badge } from "@/shadcn/components/ui/badge";
import { Button } from "@/shadcn/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/shadcn/components/ui/dialog";
import { Input } from "@/shadcn/components/ui/input";

type Mensaje = {
     autor: "cliente" | "bot" | "agente";
     texto: string;
};

interface ConversationDialogProps {
     cliente: string;
     producto: string;
     mensajes: Mensaje[];
     trigger: React.ReactNode;
}

export function ConversationDialog({ cliente, producto, mensajes, trigger }: ConversationDialogProps) {
     const [isTaken, setIsTaken] = useState(false);
     const [inputValue, setInputValue] = useState("");
     const [chatMensajes, setChatMensajes] = useState(mensajes);

     const handleSend = () => {
          if (!inputValue.trim()) return;
          setChatMensajes([...chatMensajes, { autor: "agente", texto: inputValue }]);
          setInputValue("");
     };

     return (
          <Dialog>
               <DialogTrigger asChild>{trigger}</DialogTrigger>
               <DialogContent className="sm:max-w-[600px] flex flex-col">
                    {/* Encabezado */}
                    <DialogHeader className="border-b pb-2 mb-2">
                         <DialogTitle className="flex flex-col gap-1">
                              <span className="text-lg font-semibold">Cliente {cliente}</span>
                              <span className="text-sm text-gray-500">Producto: {producto}</span>
                              <Badge className="w-fit bg-[#eefaff] text-[#0d7ff2]">En conversación</Badge>
                         </DialogTitle>
                    </DialogHeader>

                    {/* Chat */}
                    <div className="flex-1 space-y-3 max-h-[65dvh] overflow-y-auto p-2">
                         {chatMensajes.map((msg, idx) => (
                              <div key={idx} className={`flex ${msg.autor === "cliente" ? "justify-start" : "justify-end"}`}>
                                   <div
                                        className={`rounded-lg px-4 py-2 max-w-[70%] text-sm ${
                                             msg.autor === "cliente"
                                                  ? "bg-[#eefaff] text-[#123359]" // Cliente
                                                  : msg.autor === "bot"
                                                  ? "bg-[#0d7ff2] text-white" // Bot
                                                  : "bg-[#145394] text-white" // Agente
                                        }`}
                                   >
                                        {msg.texto}
                                   </div>
                              </div>
                         ))}
                    </div>

                    {/* Footer */}
                    <div className="mt-4 border-t pt-3">
                         {!isTaken ? (
                              <Button className="w-full bg-[#1493fc] hover:bg-[#0d7ff2]" onClick={() => setIsTaken(true)}>
                                   Tomar chat
                              </Button>
                         ) : (
                              <div className="flex gap-2">
                                   <Input
                                        placeholder="Escribe un mensaje..."
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                                   />
                                   <Button className="bg-[#145394] hover:bg-[#104375]" onClick={handleSend}>
                                        Enviar
                                   </Button>
                              </div>
                         )}
                    </div>
               </DialogContent>
          </Dialog>
     );
}
