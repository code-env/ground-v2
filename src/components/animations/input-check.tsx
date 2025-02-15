import { useState, useEffect } from "react";
import { motion, AnimatePresence, useAnimate } from "motion/react";
import { Check, X } from "lucide-react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const TARGETWORD = "bossadizenith";

const MAX_LENGTH = TARGETWORD.length;

const InputCheck = () => {
  const [value, setValue] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [scope, animate] = useAnimate();

  const handleCheck = () => {
    if (value === TARGETWORD) {
      setIsValid(true);
    } else {
      setIsValid(false);
      animate(
        scope.current,
        { x: [0, 10, -10, 0, 0, 10, -10, 0] },
        { duration: 0.2 }
      );
    }
  };

  useEffect(() => {
    if (value.length === MAX_LENGTH) {
      handleCheck();
    } else {
      setIsValid(false);
    }
  }, [value]);

  return (
    <div className="size-full flex flex-col gap-2 items-center justify-center rounded-xl bg-background">
      <div className="relative max-w-sm w-full mx-auto" ref={scope}>
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={cn(
            "border-2 text-muted-foreground transition-all duration-300",
            {
              "border-green-500": isValid,
              "border-red-500": !isValid && value.length === MAX_LENGTH,
            }
          )}
          maxLength={MAX_LENGTH}
        />
        <div className="absolute top-1/2 right-2 -translate-y-1/2 size-5  rounded-full">
          <AnimatePresence mode="wait">
            {value.length === MAX_LENGTH ? (
              isValid ? (
                <motion.span
                  initial={{ opacity: 0, scale: 0.3 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.3 }}
                  transition={{ duration: 0.2 }}
                  key="check-icon"
                  className="size-full flex items-center justify-center bg-green-500 rounded-full"
                >
                  <Check className="size-3 text-background" />
                </motion.span>
              ) : (
                <motion.span
                  initial={{ opacity: 0, scale: 0.3 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.3 }}
                  transition={{ duration: 0.2 }}
                  key="x-icon"
                  className="size-full flex items-center justify-center bg-red-500 rounded-full"
                >
                  <X className="size-3 text-background" />
                </motion.span>
              )
            ) : (
              <motion.span
                initial={{ opacity: 0, scale: 0.3 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.3 }}
                transition={{ duration: 0.2 }}
                key="progress"
                className="size-full flex items-center justify-center"
              >
                <CircularProgressbar
                  value={value.length / MAX_LENGTH}
                  maxValue={1}
                  className="size-5"
                />
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>
      <p className="text-sm text-primary">
        Hint, targetword is <span className="font-semibold">{TARGETWORD}</span>
      </p>
    </div>
  );
};

export default InputCheck;
