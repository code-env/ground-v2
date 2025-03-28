import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { motion as m, MotionConfig, Transition } from "motion/react";

interface TimelineItem {
  date: string;
  isActive?: boolean;
  isCompleted?: boolean;
}

const timelineItems: TimelineItem[] = [
  {
    date: "Jan 30",
    isCompleted: true,
  },
  {
    date: "Feb 06",
    isCompleted: true,
  },
  {
    date: "Feb 24",
    isCompleted: true,
  },
  {
    date: "Today",
    isActive: true,
  },
];

const TRANSITION: Transition = {
  duration: 0.3,
  ease: "circInOut",
  // delay: 0.1,
};

const StackClick = () => {
  const [selected, setSelected] = useState(0);
  return (
    <MotionConfig transition={TRANSITION}>
      <div className="full center  z-0">
        <div className="max-w-md border overflow-hidden w-full flex items-center gap-10">
          <div className="flex-1 border size-full"></div>
          <VerticalTimeline
            items={timelineItems}
            setSelected={setSelected}
            selected={selected}
          />
        </div>
      </div>
    </MotionConfig>
  );
};

interface VerticalTimelineProps {
  items: TimelineItem[];
  className?: string;
  setSelected: Dispatch<SetStateAction<number>>;
  selected: number;
}

function VerticalTimeline({
  items,
  className,
  setSelected,
  selected,
}: VerticalTimelineProps) {
  return (
    <div className={cn("flex flex-col", className)}>
      {items.map((item, index) => (
        <div
          key={index}
          className="flex items-start cursor-pointer"
          onClick={() => setSelected(index)}
        >
          <div className="relative flex flex-col items-center">
            <div
              className={cn(
                "flex h-5 relative w-5 items-center justify-center rounded-full border-4 border-gray-300 bg-white"
              )}
            />
            {index < items.length - 1 && (
              <div className="h-6 w-1 bg-gray-300" />
            )}
            {selected === index && (
              <m.div
                layoutId="active-timeline-container"
                className="absolute h-5 w-5 bg-emerald-600 rounded-full z-50"
              >
                <m.div
                  className="size-full bg-emerald-500 rounded-full center text-white"
                  layoutId="active-timeline-indicator-icon"
                >
                  <Check className="h-3 w-3" />
                </m.div>

                <div
                  className={cn(
                    "absolute h-8 left-0 right-0 mx-auto w-1 bg-gradient-to-b from-transparent via-emerald-600 to-transparent -z-10",
                    {
                      "top-0 bottom-0 my-auto h-16":
                        index > 0 && index < items.length - 1,
                      "top-0": index === 0,
                      "bottom-0": index === items.length - 1,
                    }
                  )}
                />
              </m.div>
            )}
          </div>
          <div
            className={cn("ml-4 ", {
              "pb-5 bg-red-500": index < items.length - 1,
            })}
          >
            <span
              className={cn(
                "text-sm font-medium",
                selected === index ? "text-emerald-600" : "text-gray-500"
              )}
            >
              {item.date}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StackClick;
