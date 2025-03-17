import { cn } from "@/lib/utils";
import { useTheme } from "@/providers/theme";
import { AnimatePresence, motion as m, Variants } from "motion/react";

const bgVariant: Variants = {
  hidden: {
    height: 24,
    width: 448,
    borderRadius: 12,
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

const IslandMode = () => {
  const { setTheme, theme } = useTheme();

  const toggleActive = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <div className="relative p-2 z-0 overflow-hidden min-h-screen">
      <div
        className={cn(
          "max-w-md  mx-auto z-10 p-2 rounded-full bg-black border transition-all duration-300",
          {
            "bg-muted/50": theme === "dark",
          },
        )}
      >
        <div
          className={cn(
            "bg-muted h-3 w-8 rounded-full ml-auto relative transition-colors duration-300",
            {
              "bg-orange-500": theme === "dark",
            },
          )}
          onClick={toggleActive}
        >
          <div
            className={cn(
              "size-5 bg-muted-foreground absolute rounded-full top-0 bottom-0 my-auto transition-all duration-300",
              {
                "left-[calc(100%-20px)]": theme === "dark",
                "left-0": theme === "light",
              },
            )}
          />
        </div>
      </div>
      <AnimatePresence>
        {theme === "dark" && (
          <m.div
            variants={bgVariant}
            initial="hidden"
            animate="animate"
            exit="hidden"
            className="fixed -z-10 bg-black"
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default IslandMode;
