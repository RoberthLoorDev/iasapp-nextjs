"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";

export default function NavbarC() {
     const pathname = usePathname();

     const linksNavbar = [
          {
               name: "Resumen",
               href: "/resumen",
          },
          {
               name: "Inventario",
               href: "/inventario",
          },
          {
               name: "Ventas",
               href: "/ventas",
          },
          {
               name: "Perfil",
               href: "/perfil",
          },
     ];

     return (
          <nav className="flex justify-between h-[80px] px-50 border-b-1">
               <div className="flex items-center gap-2">
                    <Image src="/icon.svg" alt="Logo" width={45} height={45} />
                    <a href="#" className="text-lg font-bold">
                         IassApp
                    </a>
               </div>

               <div className="flex items-center gap-5 text-[#8E8E95]">
                    {linksNavbar.map((link) => {
                         const isActive = pathname === link.href;

                         return (
                              <a key={link.name} href={link.href} className={isActive ? "text-black font-bold" : ""}>
                                   {link.name}
                              </a>
                         );
                    })}
               </div>

               {/* Perfil */}
               <div className="flex items-center">
                    <Image src="/profile.png" alt="Perfil" width={48} className="my-auto" height={48} />
               </div>
          </nav>
     );
}
