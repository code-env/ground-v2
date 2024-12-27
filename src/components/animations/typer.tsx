"use client";

// import { Input } from "@/components/";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowUp,
  Camera,
  CodeXml,
  FileText,
  Folder,
  Headset,
  Image,
  Mic,
  Mountain,
  Plus,
} from "lucide-react";
import { useEffect, useState } from "react";

const items = [
  { id: 1, icon: FileText },
  { id: 2, icon: Mountain },
  { id: 3, icon: CodeXml },
];

const icons = [
  { id: 1, icon: Camera },
  { id: 2, icon: Image },
  { id: 3, icon: Folder },
];

const Typer = () => {
  const [active, setActive] = useState(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    if (value.length > 0) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [value]);
  return (
    <div className="size-full flex items-center justify-center w-full flex-col">
      <div className="relative flex items-center justify-center">
        {items.map((item, index) => {
          // some code here

          return (
            <motion.div
              layoutId={`typer-item-${index}`}
              key={index}
              className="border absolute bg-background overflow-clip rounded-3xl flex items-center justify-center group cursor-pointer"
              animate={{
                rotate:
                  active && index === 0
                    ? -10
                    : active && index === 1
                    ? 10
                    : undefined,
              }}
              transition={{
                duration: 0.2,
                ease: "linear",
              }}
              style={{
                width: active ? 300 : 200 + index * 50,
                height: 200,
                top: active && index !== 2 ? 50 : index * 20,
                left: active && index === 1 ? 50 : undefined,
                right: active && index === 0 ? 50 : undefined,
              }}
            >
              <div className="size-full flex-col flex items-center justify-center gap-4">
                <motion.div
                  layoutId={`typer-icon-${index}`}
                  className="size-fit"
                >
                  <item.icon className="size-9 text-muted-foreground/80 group-hover:text-muted-foreground transition-all duration-300" />
                </motion.div>
                <div className="flex flex-col w-full items-center justify-center gap-1">
                  <motion.div
                    layoutId={`type-indicator-first-item-${index}`}
                    className="h-4 rounded-full bg-muted-foreground/80 w-1/3 group-hover:bg-muted-foreground transition-all duration-300"
                  />
                  <motion.div
                    layoutId={`type-indicator-second-item-${index}`}
                    className="h-4 rounded-full bg-muted w-1/2"
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        layout
        className="w-[576px] mx-auto mt-72 cursor-pointer rounded-3xl flex gap-2 items-flex items-center justify-center"
      >
        <AnimatePresence mode="popLayout">
          {!active ? (
            <div className="flex items-flex items-center justify-center gap-0.5">
              {icons.map((icon, index) => (
                <motion.div
                  initial={{ opacity: 0, filter: "blur(4px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0, filter: "blur(4px)" }}
                  transition={{ delay: index * 0.06 }}
                  className="size-9 min-w-[36px] flex items-center justify-center rounded-full hover:bg-muted/50"
                  key={index}
                >
                  <icon.icon size={20} />
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              key="check"
              initial={{ opacity: 0, scale: 0.3 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.3 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-center size-9 min-w-[36px] border bg-muted text-muted-foreground rounded-full"
            >
              <Plus className="size-4" />
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          initial={false}
          animate={{
            width: active ? 480 : 396,
          }}
          transition={{
            duration: 0.1,
            ease: "easeInOut",
          }}
          className="border rounded-full flex items-flex items-center justify-center bg-background px-3 flex-1 h-10"
        >
          <input
            placeholder="Message"
            className="bg-transparent border-none pl-0 pr-4 w-full outline-none"
            onChange={(e) => setValue(e.target.value)}
          />
          <Mic className="fill-muted-foreground/80 stroke-muted-foreground/80" />
        </motion.div>
        <div className="flex items-center justify-center size-9 min-w-[36px] bg-primary text-primary-foreground rounded-full">
          <AnimatePresence mode="wait" initial={false}>
            {active ? (
              <motion.div
                className=""
                key="check"
                initial={{ opacity: 0, scale: 0.3 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.3 }}
                transition={{ duration: 0.2 }}
              >
                <ArrowUp size={20} />
              </motion.div>
            ) : (
              <motion.div
                key="copy"
                initial={{ opacity: 0, scale: 0.3 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.3 }}
                transition={{ duration: 0.2 }}
              >
                <Headset size={20} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default Typer;
