import { cn } from "@/lib/utils";
import { Apple, ArrowRight, Github, X } from "lucide-react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { ReactNode, useId, useState } from "react";

const TRANSITION = {
  type: "spring",
  bounce: 0.05,
  duration: 0.3,
};

const SignIn = () => {
  const uniqueId = useId();
  const [isOpen, setIsOpen] = useState(false);

  const openMenu = () => {
    console.log("something is clicked");

    setIsOpen((prev) => !prev);
  };
  return (
    <MotionConfig transition={TRANSITION}>
      <div className="relative flex items-center justify-center">
        <motion.button
          key="button"
          layoutId={`signin-popover-${uniqueId}`}
          className="flex h-11 items-center border-2 border-border bg-background px-10 text-primary font-semibold text-lg gap-2"
          style={{
            borderRadius: 22,
          }}
          onClick={openMenu}
        >
          <motion.span layoutId={`signin-popover-label-${uniqueId}`}>
            Sign in
          </motion.span>
          <motion.span layoutId="signin-popover-toggle">
            <ArrowRight className="size-4" />
          </motion.span>
        </motion.button>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="button"
            layoutId={`signin-popover-${uniqueId}`}
            className="absolute w-96 overflow-hidden border-muted-foreground/20 bg-background border-2 "
            style={{
              borderRadius: 20,
            }}
          >
            <div className="h-10 border-b flex items-center justify-between px-4">
              <motion.span
                layoutId={`signin-popover-label-${uniqueId}`}
                className="text-base font-semibold"
              >
                Sign in
              </motion.span>
              <motion.button
                layoutId="signin-popover-toggle"
                className="size-6 hover:bg-muted flex items-center justify-center rounded-full transition-all duration-300"
                onClick={openMenu}
              >
                <X className="size-4" />
              </motion.button>
            </div>
            <div className="p-4 flex flex-col gap-4">
              <Button className="bg-gray-200 font-semibold text-primary-foreground">
                <Github />
                Continue with Github
              </Button>
              <Button className="bg-gray-200 font-semibold text-primary-foreground">
                <Apple />
                Continue with Apple
              </Button>
              <div className="h-10 flex items-center justify-center relative">
                <div className="h-1 border-b w-full" />
                <div className="absolute top-0 right-0 bottom-0 left-0 m-auto size-9 rounded-full bg-background flex items-center justify-center">
                  or
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <input
                  type="text"
                  placeholder="Email"
                  className="h-11 border placeholder:text-primary-foreground/50 w-full rounded-lg px-4 placeholder:font-semibold outline-none text-primary-foreground"
                />
                <Button className="w-full font-semibold bg-primary text-primary-foreground">
                  Continue <ArrowRight className="size-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </MotionConfig>
  );
};

interface ButtonProps {
  className?: string;
  children: ReactNode;
}

const Button = ({ className, children }: ButtonProps) => {
  return (
    <button
      className={cn(
        "h-11 w-full flex items-center justify-center gap-2 rounded-xl outline-none",
        className,
      )}
    >
      {children}
    </button>
  );
};

export default SignIn;
