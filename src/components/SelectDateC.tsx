"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/shadcn/components/ui/button";
import { Calendar } from "@/shadcn/components/ui/calendar";
import { Label } from "@/shadcn/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/shadcn/components/ui/popover";
import { cn } from "@/lib/utils";

interface Props {
     value: Date | undefined;
     onChange: (date: Date | undefined) => void;
     label?: string;
     placeholder?: string;
     className?: string;
}

export function SelectDateC({ label, placeholder = "Seleccione una fecha", value, onChange, className }: Props) {
     const [open, setOpen] = React.useState(false);

     const handleSelect = (d: Date | undefined) => {
          onChange(d);
          setOpen(false);
     };

     return (
          <div className={cn("flex flex-col gap-3")}>
               {label && (
                    <Label htmlFor="date" className="px-1">
                         {label}
                    </Label>
               )}
               <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                         <Button variant="outline" id="date" className={`w-48 justify-between font-normal ${className}`}>
                              {value ? value.toLocaleDateString() : placeholder}
                              <ChevronDownIcon />
                         </Button>
                    </PopoverTrigger>

                    <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                         <Calendar mode="single" selected={value} captionLayout="dropdown" onSelect={handleSelect} />
                    </PopoverContent>
               </Popover>
          </div>
     );
}
