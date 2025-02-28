import Waitlist from "@/components/forms/waitlist";
import { buttonVariants } from "../ui/button";
import { motion } from "motion/react";

const Hero = ({ hidden }: { hidden: boolean }) => {
  return (
    <div className="flex flex-col items-center justify-center pt-40 pb-20 gap-10 md:border-b mx-auto w-full max-w-screen-lg">
      <div className="size-20 relative">
        <img src="/Graound.svg" alt="Graound" className="size-full" />
        <div className="gradient absolute inset-0 -z-10 size-16 m-auto blur-2xl" />
      </div>
      <div className="flex flex-col items-center justify-center gap-4 max-w-sm">
        <h1 className="md:text-5xl text-2xl font-medium text-center leading-tight">
          Animations built for performance
        </h1>
        <p className="md:text-xl text-base text-center">
          We're building a library of animations that are built for performance.
        </p>
      </div>
      <Waitlist>
        {!hidden && (
          <motion.button
            layoutId="home-chat-button"
            className={buttonVariants({ size: "lg", className: "!rounded-md" })}
          >
            <motion.span layoutId="home-chat-button-text">
              Join waitlist
            </motion.span>
          </motion.button>
        )}
      </Waitlist>
    </div>
  );
};

export default Hero;
