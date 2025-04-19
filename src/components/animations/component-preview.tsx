import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";
import React, { useState } from "react";

interface ComponentPreviewProps {
  children: React.ReactNode;
  height?: number;
  notReady?: boolean;
  className?: string;
  href?: string;
}

const ComponentPreview = ({
  children,
  height,
  notReady,
  className,
  href,
}: ComponentPreviewProps) => {
  const [minHeight] = useState<number>(500);

  if (notReady && process.env.NODE_ENV === "production") return null;

  return (
    <div className="md:flex items-center justify-center w-full hidden relative bg-background">
      <div className="w-full border-y relative flex items-center justify-center">
        <div
          className={cn(
            "max-w-screen-lg w-full flex items-center justify-center relative p-2 bg-muted border-x group",
            className
          )}
          style={{
            height: `${Math.max(
              100,
              height ? minHeight + height : minHeight
            )}px`,
          }}
        >
          {children}
          {href && (
            <a
              href={href}
              target="_blank"
              className={cn(
                "absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-t-0 border-r-0 bg-red-50 px-2 py-0.5",
                "flex items-center gap-2"
              )}
            >
              <p className="flex items-center gap-2 text-sm">
                <span>Inspiration </span>
                <ExternalLink className="size-4 " />
              </p>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComponentPreview;
