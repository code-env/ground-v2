import { ChevronLeft } from "lucide-react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";
import Magnet from "./magnet";

const Cursor = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [_, setIsHovered] = useState(false);

  return (
    <div
      ref={containerRef}
      className="size-full bg-background rounded-xl relative overflow-hidden"
    >
      <CustomCursor
        buttonRef={buttonRef}
        containerRef={containerRef}
        setIsHovered={setIsHovered}
      />
      <div className="size-full flex items-center justify-center">
        <Magnet>
          <button
            ref={buttonRef}
            className={`rounded-xl px-6 py-3 relative z-20 text-blue-500 font-semibold text-xl flex items-center gap-2 `}
          >
            <ChevronLeft />
            <span>Appearance</span>
          </button>
        </Magnet>
      </div>
    </div>
  );
};

const OPTIONS = { damping: 20, stiffness: 500, mass: 0.2 };

interface CustomCursorProps {
  buttonRef: React.RefObject<HTMLButtonElement>;
  containerRef: React.RefObject<HTMLDivElement>;
  setIsHovered: React.Dispatch<React.SetStateAction<boolean>>;
}

const CustomCursor = ({
  buttonRef,
  containerRef,
  setIsHovered,
}: CustomCursorProps) => {
  const mousePos = {
    x: useMotionValue(0),
    y: useMotionValue(0),
  };

  const dampenedMousePos = {
    x: useSpring(mousePos.x, OPTIONS),
    y: useSpring(mousePos.y, OPTIONS),
  };

  const cursorSize = {
    height: useMotionValue(20),
    width: useMotionValue(20),
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!containerRef.current) return;

    const { clientX, clientY } = e;
    const rect = containerRef.current.getBoundingClientRect();

    const x = clientX - rect.left - cursorSize.width.get() / 2;
    const y = clientY - rect.top - cursorSize.height.get() / 2;

    mousePos.x.set(x);
    mousePos.y.set(y);

    // Magnetic effect
    if (buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const buttonCenterX = buttonRect.left + buttonRect.width / 2;
      const buttonCenterY = buttonRect.top + buttonRect.height / 2;

      const distanceX = buttonCenterX - (clientX - rect.left);
      const distanceY = buttonCenterY - (clientY - rect.top);
      const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

      // Adjust the cursor position if within a certain distance
      if (distance < 100) {
        const attractionStrength = 0.1; // Adjust this value for effect strength
        mousePos.x.set(mousePos.x.get() + distanceX * attractionStrength);
        mousePos.y.set(mousePos.y.get() + distanceY * attractionStrength);
      }
    }
  };

  const handleButtonHover = () => {
    if (!buttonRef.current) return;

    const { width, height } = buttonRef.current.getBoundingClientRect();
    cursorSize.height.set(height);
    cursorSize.width.set(width);

    setIsHovered(true);
  };

  const handleButtonLeave = () => {
    cursorSize.height.set(20);
    cursorSize.width.set(20);
    setIsHovered(false);
  };

  useEffect(() => {
    const container = containerRef.current;
    const button = buttonRef.current;

    if (!container || !button) return;

    container.addEventListener("mousemove", handleMouseMove);
    button.addEventListener("mouseenter", handleButtonHover);
    button.addEventListener("mouseleave", handleButtonLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      button.removeEventListener("mouseenter", handleButtonHover);
      button.removeEventListener("mouseleave", handleButtonLeave);
    };
  }, [containerRef]);

  return (
    <motion.div
      style={{
        x: dampenedMousePos.x,
        y: dampenedMousePos.y,
      }}
      animate={{
        width: cursorSize.width.get(),
        height: cursorSize.height.get(),
        borderRadius: 10,
      }}
      className="bg-gray-200 absolute pointer-events-none size-5 z-10"
    />
  );
};

export default Cursor;
