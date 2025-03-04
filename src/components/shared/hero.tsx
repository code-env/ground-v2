import Waitlist from "@/components/forms/waitlist";
import { motion } from "motion/react";
import { buttonVariants } from "../ui/button";
import Logo from "./logo";

const Hero = ({ hidden }: { hidden: boolean }) => {
  return (
    <div className="flex flex-col items-center justify-center pt-40 pb-20 gap-10 md:border-b mx-auto w-full max-w-screen-lg">
      <Logo gradient />
      <div className="flex flex-col items-center justify-center gap-4 max-w-sm">
        <h1 className="md:text-5xl text-2xl font-medium text-center leading-tight">
          Animations built for performance
        </h1>
        <p className="md:text-xl text-base text-center">
          We're building a library of animations that are built for performance.
        </p>
      </div>
      <Waitlist>
        {!hidden ? (
          <motion.button
            layoutId="home-chat-button"
            className={buttonVariants({ size: "lg", className: "!rounded-md" })}
          >
            <motion.span layoutId="home-chat-button-text">
              Join waitlist
            </motion.span>
          </motion.button>
        ) : (
          <button
            className={buttonVariants({
              size: "lg",
              className: "!rounded-md opacity-0",
            })}
          >
            <span>Join waitlist</span>
          </button>
        )}
      </Waitlist>
    </div>
  );
};

export default Hero;
