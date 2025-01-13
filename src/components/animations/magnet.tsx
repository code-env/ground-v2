import { ReactNode, useRef, useState, MouseEvent } from "react";

import { motion } from "motion/react";

interface MagnetProps {
  stiffness?: number;
  damping?: number;
  mass?: number;
  children: ReactNode;
}

export default function Magnet({
  children,
  stiffness = 100,
  damping = 20,
  mass = 0.2,
}: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null);

  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;

    const { height, width, left, top } = ref.current.getBoundingClientRect();

    const middleX = clientX - (left + width / 2);

    const middleY = clientY - (top + height / 2);

    setPosition({ x: middleX, y: middleY });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness, damping, mass }}
      className="z-20"
    >
      {children}
    </motion.div>
  );
}
