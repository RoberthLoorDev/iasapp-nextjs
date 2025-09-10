import SlideBarC from "@/components/SlideBarC";
import React from "react";

interface MainLayoutProps {
     children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
     return (
          <div className="w-full min-h-screen flex">
               <SlideBarC />
               <main>{children}</main>
          </div>
     );
}
