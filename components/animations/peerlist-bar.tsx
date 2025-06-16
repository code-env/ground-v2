import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

const items = [
  { name: "NEWEST", x: 10 },
  { name: "TRENDING", x: 46 },
  { name: "FOLLOWING", x: 90 },
];

const PeerListBar = () => {
  const ref = useRef<HTMLDivElement>(null);
  const activeRefIndicator = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [circleSize, setCircleSize] = useState(250);

  useEffect(() => {
    if (!ref.current || !activeRefIndicator.current) return;

    activeRefIndicator.current.style.setProperty(
      "--gradient-position-x",
      `${items[active].x}%`
    );
    activeRefIndicator.current.style.setProperty(
      "--circle-size",
      `${circleSize}px`
    );
  }, [active, circleSize]);

  const handleMouseMove = (event: MouseEvent) => {
    if (!ref.current) return;

    const { left, width } = ref.current.getBoundingClientRect();
    const mouseX = event.clientX - left;
    const percentage = mouseX / width;
    const newSize = 250 + percentage * (active === 1 ? 600 : 1000 - 250);

    setCircleSize(newSize);
  };

  const handleMousLeave = () => {
    setCircleSize(250);
  };

  useEffect(() => {
    const currentRef = ref.current;
    if (currentRef) {
      currentRef.addEventListener("mousemove", handleMouseMove);
      currentRef.addEventListener("mouseleave", handleMousLeave);
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener("mousemove", handleMouseMove);
        currentRef.removeEventListener("mouseleave", handleMousLeave);
      }
    };
  }, []);

  return (
    <div className="flex items-center justify-center size-full bg-[rgb(23,23,23)] rounded-xl">
      <div className="flex rounded-xl relative bg-clip-padding z-0" ref={ref}>
        {items.map((item, idx) => (
          <button
            key={idx}
            onClick={() => setActive(idx)}
            className={cn(
              "px-4 py-2 uppercase bg-clip-padding border border-transparent flex items-center bg-[rgb(23,23,23)] transition-all duration-300 text-white text-sm",
              {
                "rounded-l-xl": idx === 0,
                "rounded-r-xl": idx === items.length - 1,
                "text-[rgb(83,193,121)]": active === idx,
              }
            )}
          >
            {item.name}
          </button>
        ))}
        <div
          ref={activeRefIndicator}
          className="nothing rounded-xl absolute top-0 left-0 w-full h-full -z-10"
        />
      </div>
    </div>
  );
};

export default PeerListBar;
