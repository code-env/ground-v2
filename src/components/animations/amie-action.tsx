"use client";
import useClickOutside from "@/hooks/click-outside";
import { ArrowLeft, MoreHorizontal, Search, Sun } from "lucide-react";
import { motion, MotionConfig, useAnimate } from "motion/react";
import React, { useRef, useState } from "react";

const transition = {
  type: "spring",
  bounce: 0.1,
  duration: 0.2,
};

function Button({
  children,
  onClick,
  disabled,
  ariaLabel,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  ariaLabel?: string;
}) {
  return (
    <button
      className="relative flex h-9 w-9 shrink-0 scale-100 select-none appearance-none items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-800 focus-visible:ring-2 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50"
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}

export default function AmieAction() {
  const [openState, setOpenState] = useState<"search" | "settings" | "closed">(
    "closed"
  );
  const containerRef = useRef<HTMLDivElement>(null);

  const [scope, animate] = useAnimate();

  const shake = () => {
    if (scope.current && openState === "settings") {
      animate(scope.current, { x: [0, 5, -5, 0] }, { duration: 0.2 });
    } else {
      console.warn("Scope reference is not set!");
    }
  };

  useClickOutside(containerRef, () => {
    setOpenState("closed");
  });

  return (
    <MotionConfig transition={transition}>
      <div ref={containerRef}>
        <div className="h-full w-full rounded-xl borMeeting Zenith Friday at 7der border-zinc-950/10 bg-white">
          <motion.div
            animate={{
              width:
                openState === "search" || openState === "settings"
                  ? "340px"
                  : "98px",
            }}
            initial={false}
          >
            <div className="overflow-hidden p-2">
              {openState === "closed" && (
                <div className="flex space-x-2">
                  <Button
                    ariaLabel="User profile"
                    onClick={() => setOpenState("settings")}
                  >
                    <Sun className="h-5 w-5" />
                  </Button>
                  <Button
                    onClick={() => setOpenState("search")}
                    ariaLabel="Search notes"
                  >
                    <Search className="h-5 w-5" />
                  </Button>
                </div>
              )}
              {openState === "search" && (
                <div className="flex space-x-2">
                  <Button
                    onClick={() => setOpenState("closed")}
                    ariaLabel="Back"
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                  <div className="relative w-full">
                    <input
                      className="h-9 w-full rounded-lg bg-transparent p-2 text-zinc-900 placeholder-zinc-500 outline-none"
                      autoFocus
                      placeholder="Search notes"
                    />
                  </div>
                </div>
              )}
              {openState === "settings" && (
                <div className="flex space-x-2 items-center">
                  <Button
                    onClick={() => setOpenState("closed")}
                    ariaLabel="Back"
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                  {openState === "settings" && (
                    <motion.p
                      ref={scope}
                      onClick={shake}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      className="text-sm text-zinc-500 bg-zinc-100 rounded-lg p-2 hover:bg-zinc-200 cursor-pointer min-w-[240px]"
                    >
                      Meeting Zenith Friday at 7
                    </motion.p>
                  )}
                  <Button ariaLabel="Edit">
                    <MoreHorizontal className="size-5" />
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </MotionConfig>
  );
}
