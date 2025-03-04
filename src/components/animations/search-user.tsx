"use client";

import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
// import { Input } from "@/components/";
import useClickOutside from "@/hooks/click-outside";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { ReactNode, useRef, useState } from "react";

const searchVariants: Variants = {
  initial: {
    y: 10,
    opacity: 0,
    scale: 0.6,
  },
  animate: {
    y: 0,
    opacity: 1,
    scale: 1,
  },
  exit: {
    y: 10,
    opacity: 0,
    scale: 0.6,
  },
};

const addVariants: Variants = {
  initial: {
    y: -20,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
  },
  exit: {
    y: -20,
    opacity: 0,
  },
};

const SearchUser = () => {
  const [active, setActive] = useState(false);
  const [_, setValue] = useState("");
  const searchContainer = useRef<HTMLDivElement>(null);

  useClickOutside(searchContainer, () => {
    setActive(false);
  });

  return (
    <div className="size-full flex w-full flex-col bg-background rounded-xl">
      <AnimatePresence mode="wait">
        {active ? (
          <motion.div
            ref={searchContainer}
            key="search-container"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={searchVariants}
            className="mx-auto max-w-md w-full h-12 bg-gray-200 mt-10 border-4 border-gray-400/30 px-4 flex items-center gap-2 rounded-xl relative"
          >
            <Search className="size-4 text-gray-400/50" />
            <input
              type="text"
              placeholder="Search user"
              autoFocus
              className="bg-transparent border-none outline-none text-gray-400"
              onChange={(e) => setValue(e.target.value)}
            />
          </motion.div>
        ) : (
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={addVariants}
            className="size-full flex items-center justify-center flex-col"
          >
            <div className="relative flex items-center justify-center">
              {Array.from({ length: 3 }).map((_, index) => (
                <motion.div
                  layoutId={`searchUser-item-${index}`}
                  key={index}
                  className="border-4 absolute bg-background overflow-clip rounded-3xl flex items-center justify-center group"
                  transition={{
                    duration: 0.2,
                    ease: "linear",
                  }}
                  style={{
                    width: 300 + index * 50,
                    height: 80,
                    top: index * 20,
                  }}
                >
                  <div className="size-full flex items-center justify-between bg-gray-200 p-5">
                    <motion.div
                      layoutId={`searchUser-icon-${index}`}
                      className="size-10 bg-background min-w-10 rounded-full"
                    ></motion.div>
                    <motion.div
                      layoutId={`searchUser-indicator-second-item-${index}`}
                      className="h-4 rounded-full bg-muted w-1/2"
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              layout
              className="max-w-xl mx-auto mt-36 cursor-pointer rounded-3xl flex gap-4 items-flex items-center justify-center flex-col text-center"
            >
              <h1 className="font-semibold text-2xl">Add users to the group</h1>
              <div className="text-xl text-muted-foreground font-medium">
                Start by adding uses to the group or skip this step and do it
                later.
              </div>
              <div className="flex flex-col gap-2 w-full">
                <Button
                  onClick={() => setActive((prev) => !prev)}
                  className="text-primary-foreground"
                >
                  Add User
                </Button>
                <Button className="border-2 bg-secondary text-secondary-foreground">
                  Skip
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface ButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

const Button = ({ children, className, onClick }: ButtonProps) => {
  return (
    <button
      className={cn(
        "bg-primary w-full text-white py-2 rounded-xl outline-none",
        className,
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default SearchUser;
