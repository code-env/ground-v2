import { useMounted } from "@/hooks/use-mounted";
import { Search } from "lucide-react";
import { AnimatePresence, motion as m } from "motion/react";
import { useEffect, useState } from "react";

const words = [
  "Bossadi",
  "Frontend Animations",
  "Frontend",
  "Development",
  "Engineering",
];

const WordRoll = () => {
  const mounted = useMounted();

  if (!mounted) return null;

  return (
    <div className="full p-10 pb-0">
      <div className="w-[400px] border-[10px] h-full border-b-0 rounded-[55px] p-4 rounded-b-none border-primary dark:border-muted flex flex-col mx-auto gap-10">
        <div className="w-32 bg-primary dark:bg-muted h-10 mx-auto rounded-full" />
        <div className="w-full border-2 rounded-full p-2 flex items-center gap-2">
          <div className="border size-8 rounded-full bg-muted flex items-center justify-center">
            <Search className="size-4 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground">
            Search for <Roller words={words} />
          </p>
        </div>
      </div>
    </div>
  );
};

interface RollerProps {
  words: string[];
  duration?: number;
  delay?: number;
}

const Roller = ({ words, duration = 2000, delay = 1000 }: RollerProps) => {
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, duration + delay);

    return () => clearInterval(interval);
  }, [duration, delay, words.length]);

  const currentWord = words[index];

  return (
    <m.span className="inline-flex" style={{ whiteSpace: "pre" }}>
      <AnimatePresence mode="wait">
        {currentWord.split("").map((letter, i) => (
          <m.span
            key={`current-${currentWord}-${i}`}
            initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, filter: "blur(10px)" }}
            transition={{
              duration: 0.25,
              delay: i * 0.05,
            }}
          >
            {letter}
          </m.span>
        ))}
      </AnimatePresence>
    </m.span>
  );
};

export default WordRoll;
