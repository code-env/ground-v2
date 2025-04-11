import { motion } from "motion/react";
import { buttonVariants } from "../ui/button";
import Logo from "./logo";
import { Icons } from "./icons";
import { Star } from "lucide-react";
import { siteConfig } from "@/lib/config";
const Hero = ({ hidden }: { hidden: boolean }) => {
  return (
    <div className="w-full md:border-b bg-background">
      <div className="flex flex-col items-center justify-center pt-40 pb-20 gap-10 mx-auto w-full max-w-screen-lg bg-background md:border-x relative">
        <Logo gradient={true} />
        <div className="flex flex-col items-center justify-center gap-4 max-w-sm">
          <h1 className="md:text-5xl text-2xl font-medium text-center leading-tight">
            Animations built for performance
          </h1>
          <p className="md:text-xl text-base text-center">
            We're building a library of animations that are built for
            performance.
          </p>
        </div>
        {!hidden ? (
          <motion.button
            layoutId="home-chat-button"
            className={buttonVariants({ size: "lg", className: "!rounded-md" })}
          >
            <motion.span layoutId="home-chat-button-text">
              Scroll to browse Components
            </motion.span>
          </motion.button>
        ) : (
          <button
            className={buttonVariants({
              size: "lg",
              className: "!rounded-md opacity-0",
            })}
          >
            <span>Browse Components</span>
          </button>
        )}

        <a
          href={siteConfig.link.githubRepo}
          target="_blank"
          className="absolute top-0 right-0 flex items-center gap-2 border border-r-0 border-t-0 border-muted-foreground/20 p-2 text-sm font-medium"
        >
          <Icons.github className="w-4 h-4 fill-primary" />
          <span>Star on GitHub</span>
          <Star className="w-4 h-4 fill-primary/50" />
        </a>
      </div>
    </div>
  );
};

export default Hero;
