import { cn } from "@/lib/utils";
import { useTheme } from "@/providers/theme";
import {
  AnimatePresence,
  motion as m,
  Variants,
  Transition,
  MotionConfig,
} from "motion/react";

const bgVariant: Variants = {
  hidden: {
    height: 30,
    width: 400,
    borderRadius: 10,
    top: 12,
    left: 0,
    right: 0,
    margin: "0 auto",
  },
  animate: {
    height: "100vh",
    width: "100%",
    top: 0,
    borderRadius: 0,
    left: 0,
  },
};

const TRANSITION: Transition = {
  duration: 0.3,
  ease: "easeInOut",
};

const IslandMode = () => {
  const { setTheme, theme } = useTheme();

  const toggleActive = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <MotionConfig transition={TRANSITION}>
      <div>
        <div className="fixed w-full z-50">
          <div
            className={cn(
              "max-w-md  mx-auto p-2 h-14 rounded-md bg-black border transition-all duration-300 backdrop-blur flex items-center",
              {
                "bg-muted/50": theme === "dark",
              }
            )}
          >
            <div className="size-10 bg-red-500 rounded-sm"></div>
            <div
              className={cn(
                "bg-muted h-3 w-8 rounded-full ml-auto relative transition-colors duration-300 cursor-pointer",
                {
                  "bg-orange-500": theme === "dark",
                }
              )}
              onClick={toggleActive}
            >
              <div
                className={cn(
                  "size-5 bg-muted-foreground absolute rounded-full top-0 bottom-0 my-auto transition-all duration-300",
                  {
                    "left-[calc(100%-20px)]": theme === "dark",
                    "left-0": theme === "light",
                  }
                )}
              />
            </div>
          </div>
        </div>
        <AnimatePresence>
          {theme === "dark" && (
            <m.div
              variants={bgVariant}
              initial="hidden"
              animate="animate"
              exit="hidden"
              className="!fixed z-30 bg-black inset-0 size-full"
            />
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
};

export default IslandMode;
