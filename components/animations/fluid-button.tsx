import { cn } from "@/lib/utils";
import { Home, Mail, Menu, Settings, User, X } from "lucide-react";
import {
  AnimatePresence,
  motion as m,
  MotionConfig,
  Transition,
} from "motion/react";
import { useState } from "react";
import { buttonVariants } from "../ui/button";

const buttons = [
  {
    icon: Home,
    id: "home",
  },
  {
    icon: Mail,
    id: "mail",
  },
  {
    icon: User,
    id: "user",
  },
  {
    icon: Settings,
    id: "settings",
  },
];

const GooeyFilter = () => {
  return (
    <svg
      style={{
        position: "absolute",
        width: 0,
        height: 0,
        pointerEvents: "none",
      }}
      aria-hidden="true"
    >
      <defs>
        <filter id="gooey-effect">
          <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -7"
            result="gooey"
          />
          <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
        </filter>
      </defs>
    </svg>
  );
};

const TRANSITION: Transition = {
  duration: 0.5,
  type: "spring",
};

const FluidButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <MotionConfig transition={TRANSITION}>
      <div className="bg-background full p-10 flex flex-col">
        <GooeyFilter />
        <div
          className="bg-background rounded-full w-10 h-10 relative flex justify-center flex-col"
          style={{ filter: "url(#gooey-effect)" }}
        >
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              buttonVariants({
                variant: "secondary",
                size: "icon",
                className:
                  "rounded-full min-w-10 min-h-10 z-10 hover:bg-secondary shadow-none",
              })
            )}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <m.div
                  className="size-full flex items-center justify-center"
                  key="close"
                  initial={{ opacity: 0, filter: "blur(4px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, filter: "blur(4px)" }}
                  transition={{ duration: 0.5 }}
                >
                  <X size={30} className="fill-primary stroke-primary" />
                </m.div>
              ) : (
                <m.div
                  key="open"
                  className="size-full flex items-center justify-center"
                  initial={{ opacity: 0, filter: "blur(4px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, filter: "blur(4px)" }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="fill-primary stroke-primary" />
                </m.div>
              )}
            </AnimatePresence>
          </button>
          <AnimatePresence mode="wait">
            {isOpen && (
              <div className="absolute top-0 left-0">
                {buttons.map((button, i) => (
                  <m.button
                    key={button.id}
                    className="size-10 center bg-secondary rounded-full absolute group"
                    initial={{ scale: 0, y: 0 }}
                    animate={{
                      scale: 1,
                      y: (i + 1) * 40,
                    }}
                    exit={{
                      scale: 0,
                      y: 0,
                      opacity: 0,
                      transition: {
                        delay: (buttons.length - i - 1) * 0.1,
                        type: "spring",
                        stiffness: 200,
                        damping: 20,
                      },
                    }}
                    transition={{
                      delay: i * 0.1,
                      type: "spring",
                      stiffness: 200,
                      damping: 20,
                    }}
                  >
                    <button.icon className="size-4 text-muted-foreground group-hover:text-primary" />
                  </m.button>
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>
        <div className="flex-1 center">
          <h1 className="text-2xl font-medium">
            Open the menu in the top left corner
          </h1>
        </div>
      </div>
    </MotionConfig>
  );
};

export default FluidButton;
