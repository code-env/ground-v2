import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { motion as m } from "motion/react";

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

const StackClick = () => {
  const [selected, setSelected] = useState(0);
  return (
    <div className="full center">
      <div className="max-w-lg border w-full flex items-center gap-10">
        <div className="flex-1"></div>
        <VerticalTimeline
          items={timelineItems}
          setSelected={setSelected}
          selected={selected}
        />
        <div className="flex-1"></div>
      </div>
    </div>
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
          {/* Timeline circle and line */}
          <m.div
            layoutId="active-timeline-indicator-container"
            className="relative flex flex-col items-center"
          >
            <m.div
              layoutId="active-timeline-indicator"
              className={cn(
                "flex h-5 w-5 items-center justify-center rounded-full border-4",
                selected === index
                  ? "border-emerald-600 bg-emerald-600 text-white"
                  : "border-gray-300 bg-white"
              )}
            >
              {selected === index && <Check className="h-3 w-3" />}
            </m.div>
            {/* Connector line */}
            {index < items.length - 1 && (
              <div className="h-12 w-1 bg-gray-300" />
            )}
          </m.div>

          {/* Date text */}
          <div className="ml-4 pb-10">
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
