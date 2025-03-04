import { cn } from "@/lib/utils";
import React, { useState } from "react";

interface ComponentPreviewProps {
  children: React.ReactNode;
  height?: number;
  notReady?: boolean;
  className?: string;
}

const ComponentPreview = ({
  children,
  height,
  notReady,
  className,
}: ComponentPreviewProps) => {
  const [minHeight] = useState<number>(500);

  if (notReady && process.env.NODE_ENV === "production") return null;

  return (
    <div className="min-h-screen md:flex items-center justify-center w-full hidden relative">
      <div className="w-full border-y relative flex items-center justify-center">
        <div
          className={cn(
            "max-w-screen-lg w-full min-h-[500px] flex items-center justify-center relative p-2 bg-muted/20",
            className,
          )}
          style={{
            height: `${Math.max(100, height ? minHeight + height : minHeight)}px`,
          }}
        >
          {children}
        </div>

        <div className="absolute h-[calc(100%+100px)] my-auto inset-0 -z-10">
          <div className="max-w-screen-lg w-full h-full mx-auto border-x "></div>
        </div>
      </div>
    </div>
  );
};

export default ComponentPreview;
