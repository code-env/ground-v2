"use client";

import { motion } from "motion/react";

const Bolt = () => {
  const svgIconVariants = {
    hidden: {
      opacity: 0,
      pathLength: 0,
      fill: "rgba(252, 211, 77, 0)",
    },
    visible: {
      opacity: 1,
      pathLength: 1,
      fill: "rgba(252, 211, 77, 1)",
    },
  };

  return (
    <div className="size-24 bg-background rounded-xl flex items-center justify-center">
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-10 stroke-amber-500 stroke-1"
      >
        <motion.path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
          variants={svgIconVariants}
          initial="hidden"
          animate="visible"
          transition={{
            default: {
              duration: 2,
              ease: "easeInOut",
              delay: 1,
              repeat: Infinity,
              repeatType: "reverse",
              repeatDelay: 1,
            },
            fill: {
              duration: 2,
              ease: "easeIn",
              delay: 2,
              repeat: Infinity,
              repeatType: "reverse",
              repeatDelay: 1,
            },
          }}
        />
      </motion.svg>
    </div>
  );
};

export default Bolt;
