"use client";

import { ConversationsTable } from "@/components/ConversationsTableC";
import ResumeCardC from "@/components/ResumeCardC";
import { SelectDateC } from "@/components/SelectDateC";
import React, { useState } from "react";

export default function Page() {
     const [firstDate, setFirstDate] = useState<Date | undefined>(undefined);
     const [secondDate, setSecondDate] = useState<Date | undefined>(undefined);

     //cards de resumen
     const cards = [
          {
               title: "Conversaciones hoy",
               value: 5,
               img: "/message.svg",
          },
          {
               title: "Conversaciones este mes",
               value: 20,
               img: "/message.svg",
          },
          {
               title: "Clientes nuevos",
               value: 20,
               img: "/device-mobile.svg",
          },
     ];

     return (
          <div className="mx-50 mt-[50px]">
               {/* Titulo y filtro */}
               <div className="flex w-full  justify-between">
                    <h1 className="font-bold text-3xl">Resumen</h1>

                    {/* filtrar  */}
                    <div className="flex gap-2">
                         <SelectDateC className="w-[120px]" value={firstDate} onChange={setFirstDate} placeholder="Inicio" />
                         <SelectDateC className="w-[120px]" value={secondDate} onChange={setSecondDate} placeholder="Fin" />
                    </div>
               </div>

               {/* Tarjetas de resumen */}
               <div className="mt-5 flex gap-4">
                    {cards.map((card, index) => (
                         <ResumeCardC key={index} title={card.title} value={card.value} img={card.img} />
                    ))}
               </div>

               {/* Tabla con las conversaciones */}
               {/* - Numero del cliente
               - Producto
               - Necesita intervención?
               - Confirmación de compra
               */}

               {/* tabla */}
               <div className="flex flex-col mt-10">
                    <h2 className="text-xl font-semibold mb-4">Conversaciones recientes</h2>
                    <ConversationsTable />
               </div>
          </div>
     );
}
