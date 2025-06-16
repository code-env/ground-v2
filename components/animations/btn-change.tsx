"use client";

import { MessageCircle } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import { useState } from "react";
import { buttonVariants } from "../ui/button";

const BtnChange = () => {
  const [isHidden, setIsHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    if (y > 500) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
  });

  return (
    <div className="relative size-full overflow-hidden">
      <div className="size-full bg-background flex items-center justify-center">
        <motion.button
          layoutId="btn-change"
          layout="size"
          className={buttonVariants({ size: "lg" })}
        >
          Nothing
        </motion.button>
      </div>
      <ChatButton isHidden={isHidden} />
    </div>
  );
};

const ChatButton = ({ isHidden }: { isHidden: boolean }) => {
  return (
    <AnimatePresence mode="sync">
      {isHidden && (
        <motion.div
          layout="preserve-aspect"
          layoutId="ChatButton"
          animate={{
            width: 50,
            height: 50,
            opacity: isHidden ? 1 : 0,
          }}
          className="rounded-full bg-primary absolute items-center flex justify-center bottom-10 right-10 text-white cursor-pointer"
        >
          <MessageCircle className="h-4 w-4" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BtnChange;
