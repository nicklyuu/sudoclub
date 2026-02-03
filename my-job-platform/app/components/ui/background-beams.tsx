"use client";
import React from "react";
import { cn } from "@/lib/utils";

export const BackgroundBeams = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "absolute h-full w-full inset-0 bg-neutral-950",
        className
      )}
    >
      <div className="absolute h-full w-full bg-neutral-950 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="absolute left-0 top-0 h-full w-full overflow-hidden">
        <div className="pointer-events-none absolute -inset-[10px] opacity-50">
          <div className="absolute top-1/2 left-1/2 h-[50rem] w-[50rem] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle_at_50%_50%,rgba(14,165,233,0.1),transparent_50%)]"></div>
          <div className="absolute top-0 left-0 h-full w-full bg-[radial-gradient(circle_at_50%_50%,rgba(14,165,233,0.05),transparent_50%)] animate-beam"></div>
          {/* Beams */}
          <div
            style={{
              "--duration": "10s",
              "--delay": "0s",
            } as React.CSSProperties}
            className={cn(
              "absolute left-[50%] top-[50%] h-[2px] w-40 -translate-x-[50%] -translate-y-[50%] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 blur-sm animate-beam-move"
            )}
          ></div>
          <div
            style={{
              "--duration": "15s",
              "--delay": "2s",
            } as React.CSSProperties}
            className={cn(
              "absolute left-[40%] top-[60%] h-[2px] w-60 -translate-x-[50%] -translate-y-[50%] bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm animate-beam-move"
            )}
          ></div>
           <div
            style={{
              "--duration": "12s",
              "--delay": "5s",
            } as React.CSSProperties}
            className={cn(
              "absolute left-[60%] top-[40%] h-[2px] w-52 -translate-x-[50%] -translate-y-[50%] bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-0 blur-sm animate-beam-move"
            )}
          ></div>
        </div>
      </div>
      <GridPattern />
    </div>
  );
};

const GridPattern = () => {
  return (
    <div className="pointer-events-none absolute inset-0 h-full w-full [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
    </div>
  );
};
