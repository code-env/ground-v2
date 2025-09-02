import { useEffect, useState } from "react";
import { ChevronUp, ChevronDown, Clock } from "lucide-react";
import {
  MotionValue,
  useSpring,
  useTransform,
  motion as m,
} from "motion/react";
import { cn } from "@/lib/utils";
import { Icons } from "../shared/icons";

type TimeUnit = "hours" | "minutes" | "seconds";

const Timer = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const handleIncrement = (unit: TimeUnit) => {
    switch (unit) {
      case "hours":
        setHours((prev) => (prev >= 24 ? 0 : prev + 1));
        break;
      case "minutes":
        setMinutes((prev) => (prev >= 60 ? 0 : prev + 1));
        break;
      case "seconds":
        setSeconds((prev) => (prev >= 60 ? 0 : prev + 1));
        break;
    }
  };

  const handleDecrement = (unit: TimeUnit) => {
    switch (unit) {
      case "hours":
        setHours((prev) => (prev <= 0 ? 24 : prev - 1));
        break;
      case "minutes":
        setMinutes((prev) => (prev <= 0 ? 60 : prev - 1));
        break;
      case "seconds":
        setSeconds((prev) => (prev <= 0 ? 60 : prev - 1));
        break;
    }
  };

  return (
    <div className="full center select-none">
      <div className="flex h- p-2 h-32">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 bg-muted px-8 rounded-full p-2">
            <TimeSelector
              value={hours}
              max={24}
              unit="hours"
              onIncrement={() => handleIncrement("hours")}
              onDecrement={() => handleDecrement("hours")}
            />

            <TimeSelector
              value={minutes}
              max={60}
              unit="min"
              onIncrement={() => handleIncrement("minutes")}
              onDecrement={() => handleDecrement("minutes")}
            />

            <TimeSelector
              value={seconds}
              max={60}
              unit="sec"
              onIncrement={() => handleIncrement("seconds")}
              onDecrement={() => handleDecrement("seconds")}
            />
          </div>
          <ChevronButton
            className=" flex size-16 items-center justify-center gap-[6px] rounded-full bg-green-500/20 text-lg font-semibold text-green-500 hover:bg-green-500/30"
            ariaLabel="Start timer"
            onClick={() => {}}
          >
            <Icons.clock className="size-10 fill-green-600" />
          </ChevronButton>
        </div>
      </div>
    </div>
  );
};

interface TimeSelectorProps {
  value: number;
  unit: string;
  onIncrement: () => void;
  onDecrement: () => void;
  max: number;
}

const TimeSelector = ({
  value,
  unit,
  onIncrement,
  onDecrement,
  max,
}: TimeSelectorProps) => {
  let animatedValue = useSpring(value);
  useEffect(() => {
    animatedValue.set(value);
  }, [value, animatedValue]);

  const values = (value: number, max: number) => {
    const prev = (value - 1 + max) % max;
    const next = (value + 1) % max;
    return [prev, value, next];
  };

  return (
    <div className="flex flex-col items-center gap-2 ">
      <div className="flex items-center gap-1">
        <div
          className="text-lg size-6 relative"
          style={{
            perspective: "400px",
            transformStyle: "preserve-3d",
          }}
        >
          {values(value, max).map((index) => (
            <Number key={index} value={index} mv={animatedValue} />
          ))}
        </div>
        <span className="text-sm font-semibold text-muted-foreground">
          {unit}
        </span>
        <div className="flex flex-col">
          <ChevronButton
            onClick={onIncrement}
            ariaLabel="Increment"
            disabled={value >= max - 1}
          >
            <ChevronUp className="size-4" />
          </ChevronButton>
          <ChevronButton
            onClick={onDecrement}
            ariaLabel="Decrement"
            disabled={value <= 0}
          >
            <ChevronDown className="size-4" />
          </ChevronButton>
        </div>
      </div>
    </div>
  );
};

const Number = ({ value, mv }: { value: number; mv: MotionValue }) => {
  let y = useTransform(mv, (latest) => 50 * (latest - value));

  let rotateX = useTransform(mv, (latest) => {
    const diff = latest - value;
    return diff * 40;
  });

  let scale = useTransform(mv, (latest) => {
    const diff = Math.abs(latest - value);
    return Math.max(0.5, 1 - diff * 0.2);
  });

  let opacity = useTransform(mv, (latest) => {
    const diff = Math.abs(latest - value);
    return Math.max(0.3, 1 - diff * 0.3);
  });

  return (
    <m.span
      className="absolute inset-0 flex items-center justify-center"
      key={value}
      initial={{ filter: "blur(10px)", opacity: 0 }}
      animate={{ filter: "blur(0px)", opacity: 1 }}
      exit={{ filter: "blur(10px)", opacity: 0 }}
      style={{
        y,
        rotateX,
        opacity,
        transformOrigin: "center bottom",
        transformStyle: "preserve-3d",
        scale,
      }}
    >
      {value}
    </m.span>
  );
};

const ChevronButton = ({
  onClick,
  ariaLabel,
  children,
  disabled,
  className,
}: {
  onClick: () => void;
  ariaLabel: string;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
}) => {
  return (
    <m.button
      className={cn(
        "group flex size-6 items-center justify-center rounded-lg transition-colors duration-200 ease-out hover:bg-muted-foreground/30 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer",
        className
      )}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </m.button>
  );
};

export default Timer;
