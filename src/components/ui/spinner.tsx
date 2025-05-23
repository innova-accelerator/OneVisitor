
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface SpinnerProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function Spinner({ className, size = "md" }: SpinnerProps) {
  const sizeClass = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12"
  };

  return (
    <div className="flex justify-center items-center p-4 w-full">
      <Loader2 
        className={cn(
          "animate-spin text-primary", 
          sizeClass[size],
          className
        )} 
      />
    </div>
  );
}
