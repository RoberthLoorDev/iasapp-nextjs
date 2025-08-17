import Image from "next/image";
import React from "react";

interface Props {
     title: string;
     value: number;
     img: string;
}

export default function ResumeCardC({ title, value, img }: Props) {
     return (
          <div className="border-1 border-[#E5E7EB] rounded-xl flex p-4 items-center gap-4 w-[270px]">
               <div className="bg-[#DBEAFE] rounded-full p-3">
                    <Image src={img} alt="Resumen" width={23} height={23} className="" />
               </div>

               <div className="flex flex-col text-[#74747D]">
                    <span className="text-sm">{title}</span>
                    <span className="text-black text-2xl font-semibold">{value}</span>
               </div>
          </div>
     );
}
