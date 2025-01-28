import { Icons } from "@/components/shared/icons";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { motion, Transition } from "motion/react";

const TRANSITION: Transition = { duration: 0.5, ease: "easeInOut" };

const JoiDownloadButton = () => {
  const [hovered, setHovered] = useState(false);

  const handleToggleMouseState = () => setHovered((prev) => !prev);

  return (
    <div className="flex items-center justify-center size-full bg-white rounded-xl">
      <motion.button
        className={buttonVariants({
          className: "overflow-hidden flex items-center gap-2",
        })}
        onMouseEnter={handleToggleMouseState}
        onMouseLeave={handleToggleMouseState}
      >
        <motion.span
          animate={{ x: hovered ? "-200%" : 0 }}
          transition={TRANSITION}
        >
          <Icons.apple className="size-5 fill-primary-foreground" />
        </motion.span>

        <motion.span animate={{ x: hovered ? -15 : 0 }} transition={TRANSITION}>
          Download for IOS
        </motion.span>

        <motion.span
          animate={{ x: hovered ? -10 : 200, opacity: hovered ? 1 : 0 }}
          transition={TRANSITION}
        >
          <ArrowRight className="size-5" />
        </motion.span>
      </motion.button>
    </div>
  );
};

export default JoiDownloadButton;
