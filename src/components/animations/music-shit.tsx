import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useState } from "react";

interface CardData {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  salary: {
    amount: string;
    className: string;
  };
}

const INITIAL_CARDS = [
  {
    id: 1,
    title: "Developer",
    subtitle: "Software Engineer",
    description:
      "I'm a software engineer with a passion for building web and mobile applications.",
    image: "/things/dev.png",
    salary: {
      amount: "100,000",
      className: "text-green-500 bg-green-500/10 border border-green-500",
    },
  },
  {
    id: 2,
    title: "Nurse",
    subtitle: "Medical Assistant",
    description: "I'm a nurse with a passion for helping people.",
    image: "/things/nurse.png",
    salary: {
      amount: "50,000",
      className: "text-blue-500 bg-blue-500/10 border border-blue-500",
    },
  },
  {
    id: 3,
    title: "Photographer",
    subtitle: "Camera Man",
    description: "I'm a photographer with a passion for capturing moments.",
    image: "/things/photographer.png",
    salary: {
      amount: "30,000",
      className: "text-yellow-500 bg-yellow-500/10 border border-yellow-500",
    },
  },
  {
    id: 4,
    title: "Waiter",
    subtitle: "Restaurant Staff",
    description: "I'm a waiter with a passion for serving people.",
    image: "/things/waiter.png",
    salary: {
      amount: "20,000",
      className: "text-blue-500 bg-blue-500/10 border border-blue-500",
    },
  },
] as const;

const ANIMATION_CONFIG = {
  stacked: {
    rotate: (index: number) => -5 * (index + 1),
    y: 0,
  },
  revealed: {
    rotate: (index: number) => {
      const angles = [-10, -5, 5, 10];
      return angles[index] || 0;
    },
    y: (index: number, total: number) => {
      if (index === 0) return 20;
      if (index === total - 1) return 20;
      return 0;
    },
  },
};

export default function CareerCards() {
  const [isRevealed, setIsRevealed] = useState(false);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <div
      className="relative size-full flex items-center justify-center rounded-xl bg-background"
      onMouseEnter={() => setIsRevealed(true)}
      onMouseLeave={() => {
        setIsRevealed(false);
        setHoveredId(null);
      }}
    >
      <div
        className={cn("relative", isRevealed ? "w-full h-full" : "w-56 h-72")}
      >
        {INITIAL_CARDS.map((card, index) => (
          <Card
            key={card.id}
            data={card}
            index={index}
            total={INITIAL_CARDS.length}
            isRevealed={isRevealed}
            isHovered={hoveredId === card.id}
            onHover={(id) => setHoveredId(id)}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          />
        ))}
      </div>
    </div>
  );
}

interface CardProps {
  data: CardData;
  index: number;
  total: number;
  isRevealed: boolean;
  isHovered: boolean;
  onHover: (id: number | null) => void;
  className?: string;
}

function Card({
  data,
  index,
  total,
  isRevealed,
  isHovered,
  onHover,
  className,
}: CardProps) {
  const config = isRevealed
    ? ANIMATION_CONFIG.revealed
    : ANIMATION_CONFIG.stacked;
  const rotateValue = config.rotate(index);
  const yOffset =
    typeof config.y === "function" ? config.y(index, total) : config.y;

  return (
    <motion.div
      layoutId={`career-card-${data.id}`}
      className={cn(
        "w-80 h-96 bg-muted rounded-2xl shadow-lg overflow-hidden cursor-pointer",
        className
      )}
      animate={{
        rotate: rotateValue,
        y: yOffset,
        x: isRevealed ? index * -30 : 0,
        scale: isHovered ? 1.02 : 1,
        zIndex: isHovered ? 50 : total - index,
      }}
      onMouseEnter={() => onHover(data.id)}
      onMouseLeave={() => onHover(null)}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 20,
      }}
    >
      <div className="size-full bg-background p-4 flex flex-col gap-4">
        <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
          <img
            src={data.image}
            alt={data.title}
            className="size-full object-cover"
          />
          <div
            className={cn(
              "absolute top-2 right-2 px-2 py-1 rounded-lg text-sm font-medium",
              data.salary.className
            )}
          >
            ${data.salary.amount}
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          <h3 className="text-2xl font-bold">{data.title}</h3>
          <p className="text-muted-foreground">{data.subtitle}</p>
          <p className="text-sm text-muted-foreground/80 mt-2 line-clamp-3">
            {data.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
