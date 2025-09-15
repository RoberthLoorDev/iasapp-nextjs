"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function SlideBarC() {
     const pathname = usePathname();
     const [isCollapsed, setIsCollapsed] = useState(false);
     const [isButtonPressed, setIsButtonPressed] = useState(false);

     // Guardar el estado en localStorage
     useEffect(() => {
          const savedState = localStorage.getItem("sidebar-collapsed");
          if (savedState !== null) {
               setIsCollapsed(JSON.parse(savedState));
          }
     }, []);

     const toggleSidebar = () => {
          const newState = !isCollapsed;
          setIsCollapsed(newState);
          localStorage.setItem("sidebar-collapsed", JSON.stringify(newState));
     };

     const handleButtonMouseDown = () => {
          setIsButtonPressed(true);
     };

     const handleButtonMouseUp = () => {
          setIsButtonPressed(false);
     };

     const options = [
          {
               label: "Dashboard",
               icon: "/icons/dashboard.svg",
               href: "/resumen",
          },
          {
               label: "Inventario",
               icon: "/icons/device-mobile.svg",
               href: "/inventario",
          },
          {
               label: "Ventas",
               icon: "/icons/sales.svg",
               href: "/ventas",
          },
     ];

     return (
          <div
               className={`fixed top-0 left-0 z-50 min-h-full bg-sidebar-background text-white flex flex-col p-4 transition-all duration-300 ease-in-out ${
                    isCollapsed ? "w-20" : "w-64"
               }`}
          >
               {/* Header section - cambio de layout según el estado */}
               <div
                    className={`transition-all duration-300 ${
                         isCollapsed ? "flex flex-col items-center gap-3" : "flex items-center justify-between"
                    }`}
               >
                    {/* Logo section */}
                    <div className={`flex items-center ${isCollapsed ? "justify-center" : "gap-2"}`}>
                         <Image src="/icon.png" alt="Sidebar Image" width={25} height={25} className="flex-shrink-0" />
                         <span
                              className={`text-[20px] text-[#04452E] font-bold transition-all duration-300 ${
                                   isCollapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100 w-auto ml-2"
                              }`}
                         >
                              iasapp
                         </span>
                    </div>

                    {/* Toggle button con animaciones bonitas */}
                    <Image
                         className={`bg-white p-2 rounded-md cursor-pointer flex-shrink-0 transition-all duration-200 ease-in-out
                              hover:bg-gray-100 hover:shadow-md hover:scale-105 
                              active:scale-95 active:shadow-sm
                              ${isCollapsed ? "rotate-180" : ""}
                              ${isButtonPressed ? "scale-90 shadow-inner" : ""}
                         `}
                         src="/icons/chevron-left.svg"
                         alt="sidebar chevron"
                         width={35}
                         height={35}
                         onClick={toggleSidebar}
                         onMouseDown={handleButtonMouseDown}
                         onMouseUp={handleButtonMouseUp}
                         onMouseLeave={handleButtonMouseUp}
                    />
               </div>

               {/* Options section */}
               <div className="flex flex-col gap-1 mt-10">
                    {options.map((option, idx) => {
                         const isActive = pathname === option.href;

                         return (
                              <Link
                                   key={idx}
                                   href={option.href}
                                   className={`group flex items-center w-full rounded-md py-2 px-3 hover:cursor-pointer transition-all duration-200 ${
                                        isActive ? "bg-[#E2F0ED]" : "hover:bg-[#E2F0ED]"
                                   } ${isCollapsed ? "justify-center" : "gap-2"}`}
                                   title={isCollapsed ? option.label : ""}
                              >
                                   {/* Icon */}
                                   <div
                                        className={`w-5 h-5 flex-shrink-0 transition-colors duration-200 ${
                                             isActive ? "bg-[#1CA576]" : "bg-[#738781] group-hover:bg-[#1CA576]"
                                        }`}
                                        style={{
                                             mask: `url(${option.icon}) no-repeat center`,
                                             maskSize: "contain",
                                             WebkitMask: `url(${option.icon}) no-repeat center`,
                                             WebkitMaskSize: "contain",
                                        }}
                                   />

                                   {/* Text label */}
                                   <span
                                        className={`font-medium text-base transition-all duration-300 ${
                                             isActive ? "text-[#05462E]" : "text-[#738781] group-hover:text-[#1CA576]"
                                        } ${
                                             isCollapsed
                                                  ? "opacity-0 w-0 overflow-hidden whitespace-nowrap"
                                                  : "opacity-100 w-auto"
                                        }`}
                                   >
                                        {option.label}
                                   </span>
                              </Link>
                         );
                    })}
               </div>
          </div>
     );
}
