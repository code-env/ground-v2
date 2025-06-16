import { AnimatePresence, motion } from "motion/react";
import React, { useId } from "react";

const transition = {
  type: "spring",
  bounce: 0.1,
  duration: 0.2,
};

const SIZE = 80;

const images = Array.from({ length: 4 });

const Fellaz = () => {
  const [isHovered, setIsHovered] = React.useState(false);
  const [isActive, setIsActive] = React.useState(false);
  const id = useId(); // Unique ID for each component instance

  // const handleClick = () => {
  //   // Simple click animation simulation
  //   const element = document.querySelector(".fellaz-container");
  //   if (element) {
  //     element.animate(
  //       [
  //         { transform: "translateX(0)" },
  //         { transform: "translateX(5px)" },
  //         { transform: "translateX(-5px)" },
  //         { transform: "translateX(0)" },
  //       ],
  //       {
  //         duration: 500,
  //         iterations: 1,
  //       }
  //     );
  //   }
  // };

  return (
    <motion.div
      transition={transition}
      className="fellaz-container flex justify-center items-center flex-col"
      // onClick={handleClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <AnimatePresence>
        {!isActive ? (
          <div className="grid place-items-center relative">
            {images.map((_, index) => (
              <Image
                key={index}
                index={index}
                isHovered={isHovered}
                isActive={isActive}
                totalImages={images.length}
                setIsActive={setIsActive}
                id={id}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 p-2 w-fit">
            {images.map((_, index) => (
              <Image
                key={index}
                index={index}
                isHovered={isHovered}
                totalImages={images.length}
                isActive={isActive}
                setIsActive={setIsActive}
                id={id}
              />
            ))}
          </div>
        )}
      </AnimatePresence>
      <div className="mt-16 flex flex-col items-center">
        <motion.p layoutId={`${id}-title`} className="text-xl font-bold">
          Images
        </motion.p>
        <motion.p layoutId={`${id}-count`} className="text-sm">
          {images.length} items
        </motion.p>
      </div>
    </motion.div>
  );
};

interface ImageProps {
  index: number;
  isHovered: boolean;
  totalImages: number;
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
}

const Image = ({
  index,
  isHovered,
  totalImages,
  setIsActive,
  id,
  isActive,
}: ImageProps) => {
  const firstCard = index === totalImages - 1;

  // Default rotation when not hovered
  const baseRotation = isActive ? 0 : firstCard ? 0 : (index + 2) * 10;

  const hoverRotation = isActive
    ? 0
    : firstCard
      ? 0
      : isHovered
        ? (index + 2) * -10 // Negative rotation for hover effect
        : baseRotation;

  const hoverTranslateY = isActive
    ? 0
    : !firstCard && isHovered
      ? (totalImages - index - 1) * -10
      : 0;

  return (
    <motion.div
      animate={{
        rotate: hoverRotation,
        y: hoverTranslateY,
      }}
      layoutId={`${id}-${index}-image`}
      style={{
        position: isActive ? "relative" : "absolute", // Change position to relative when active
        gridRow: isActive ? "auto" : 1,
        gridColumn: isActive ? "auto" : 1,
        width: isActive ? SIZE * 2 : SIZE,
        height: isActive ? SIZE * 2 : SIZE,
      }}
      onClick={() => setIsActive((prev) => !prev)}
      className="rounded-3xl bg-background border flex items-center justify-center cursor-pointer"
    >
      <motion.span
        className="text-2xl font-bold"
        layoutId={`${id}-${index}-text`}
      >
        {index + 1}
      </motion.span>
    </motion.div>
  );
};

export default Fellaz;
