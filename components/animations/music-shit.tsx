import { motion } from "motion/react";
import { useState } from "react";

// Types
interface JobItem {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  angle: number;
  hoverAngle: number;
  salary: {
    amount: string;
    className: string;
  };
}

// Data
const JOBS: JobItem[] = [
  {
    id: 1,
    title: "Developer",
    subtitle: "Software Engineer",
    description:
      "I'm a software engineer with a passion for building web and mobile applications.",
    image: "/things/dev.png",
    angle: -5,
    hoverAngle: -10,
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
    angle: -10,
    hoverAngle: -5,
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
    angle: -15,
    hoverAngle: 5,
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
    angle: -20,
    hoverAngle: 10,
    salary: {
      amount: "20,000",
      className: "text-orange-500 bg-orange-500/10 border border-orange-500",
    },
  },
];

// Animation configurations
const SPRING_CONFIG = { type: "spring", stiffness: 200, damping: 20 } as const;
const CARD_OVERLAP = -30;
const EDGE_CARD_OFFSET = 50;

// Utility function to combine class names
const cn = (...classes: (string | undefined)[]) =>
  classes.filter(Boolean).join(" ");

// Components
interface JobCardProps {
  item: JobItem;
  index: number;
  isRevealed: boolean;
}

const JobCard = ({ item, index, isRevealed }: JobCardProps) => {
  const isEdgeCard = index === 0 || index === JOBS.length - 1;

  return (
    <motion.div
      className={cn(
        "w-80 h-96 border bg-background p-1 rounded-2xl shadow-lg overflow-hidden min-w-80",
        !isRevealed ? "absolute" : undefined
      )}
      layoutId={`job-card-${item.id}`}
      animate={{
        rotate: isRevealed ? item.hoverAngle : item.angle,
        zIndex: JOBS.length - index,
        marginLeft: isRevealed ? index * CARD_OVERLAP : "auto",
        marginTop: isRevealed && isEdgeCard ? EDGE_CARD_OFFSET : 0,
      }}
      transition={SPRING_CONFIG}
    >
      <div className="size-full bg-background rounded-xl p-4 relative">
        <div className="flex flex-col gap-2">
          <img
            src={item.image}
            alt={item.title}
            width={200}
            height={200}
            className="mx-auto object-cover"
          />
          <div>
            <h3 className="text-2xl font-bold">{item.title}</h3>
            <p className="text-lg text-muted-foreground">{item.subtitle}</p>
            <p className="text-sm text-muted-foreground/60 mt-2 line-clamp-3">
              {item.description}
            </p>
            <span
              className={cn(
                item.salary.className,
                "text-sm font-bold absolute top-2 right-2 px-2 py-1 rounded-lg"
              )}
            >
              ${item.salary.amount}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

interface CardStackProps {
  items: JobItem[];
  isRevealed: boolean;
}

const CardStack = ({ items, isRevealed }: CardStackProps) => (
  <div
    className={
      isRevealed
        ? "size-full flex items-center justify-center relative"
        : "size-56 flex items-center justify-center"
    }
  >
    {items.map((item, index) => (
      <JobCard
        key={item.id}
        item={item}
        index={index}
        isRevealed={isRevealed}
      />
    ))}
  </div>
);

// Main component
const MusicSheet = () => {
  const [isRevealed, setIsRevealed] = useState(false);

  const handleMouseEnter = () => setIsRevealed(true);
  const handleMouseLeave = () => setIsRevealed(false);

  return (
    <div
      className="relative size-full flex items-center justify-center rounded-xl min-h-96"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <CardStack items={JOBS} isRevealed={isRevealed} />
    </div>
  );
};

export default MusicSheet;
