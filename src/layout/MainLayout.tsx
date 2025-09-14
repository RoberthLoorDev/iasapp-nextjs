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
               <main className="flex-1 p-4 overflow-x-hidden">
                    {title && <h1 className="text-2xl font-semibold text-[#04452E] mb-4">{title}</h1>}
                    {children}
               </main>
          </div>
     );
}
