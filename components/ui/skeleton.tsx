
import * as React from "react";
import { cn } from "./utils";

// Fix: Use HTMLAttributes instead of ComponentProps to avoid ref-related type conflicts between mismatched type environments
function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-accent animate-pulse rounded-md", className)}
      {...props}
    />
  );
}

export { Skeleton };
