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
    <div className="md:flex items-center justify-center w-full hidden relative z-0">
      <div className="w-full border-y relative flex items-center justify-center">
        <div
          className={cn(
            "max-w-screen-lg w-full min-h-[500px] flex items-center justify-center relative p-2 z-10 bg-muted",
            className,
          )}
          style={{
            height: `${Math.max(100, height ? minHeight + height : minHeight)}px`,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default ComponentPreview;
