"use client";

import { SelectDateC } from "@/components/SelectDateC";
import React, { useState } from "react";

export default function Page() {
     const [firstDate, setFirstDate] = useState<Date | undefined>(undefined);
     const [secondDate, setSecondDate] = useState<Date | undefined>(undefined);

     return (
          <div className="mx-50 mt-[50px]">
               <div className="flex w-full  justify-between">
                    <h1 className="font-bold text-3xl">Resumen</h1>

                    {/* filtrar  */}
                    <div className="flex gap-2">
                         <SelectDateC className="w-[120px]" value={firstDate} onChange={setFirstDate} placeholder="Inicio" />
                         <SelectDateC className="w-[120px]" value={secondDate} onChange={setSecondDate} placeholder="Fin" />
                    </div>
               </div>
          </div>
     );
}
