import Image from "next/image";
import React from "react";

interface KPIResumenCProps {
     className?: string;
     icon: string;
     title: string;
     value: string;
     percentage: string;
     percentageIcon: string;
}

export default function KPIResumenC({ icon, title, value, percentage, percentageIcon, className }: KPIResumenCProps) {
     return (
          <div className={`border-[2px] border-[#EFEFEF] flex flex-col p-3 min-w-[220px] rounded-xl gap-2 ${className}`}>
               {/* titulo, dato, porcentaje, icon */}
               <div className="flex gap-1 items-center">
                    <Image src={icon} alt="coin icon" width={20} height={20} />
                    <span className="text-[#BDC4C2] whitespace-nowrap">{title}</span>
               </div>
               <div className="flex justify-between items-end">
                    <span className="font-semibold text-3xl text-[#05462F]">{value}</span>
                    <div className="flex items-center gap-2">
                         <Image src={percentageIcon} alt="arrow up icon" width={16} height={16} />
                         <span className="text-[#33A680]">{percentage}</span>
                    </div>
               </div>
          </div>
     );
}
