import SlideBarC from "@/components/SlideBarC";
import React from "react";

interface MainLayoutProps {
     children: React.ReactNode;
     title?: string;
}

export default function MainLayout({ children, title }: MainLayoutProps) {
     return (
          <div className="w-full min-h-screen flex">
               <SlideBarC />
               <main className="flex-1 p-5 overflow-x-hidden mt-[20px]">
                    {title && <h1 className="text-3xl font-semibold text-[#04452E] mb-4">{title}</h1>}
                    {children}
               </main>
          </div>
     );
}
