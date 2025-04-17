import { FireworksBackground } from "@/components/animations/fireworks";
import { useTheme } from "@/providers/theme";
import { motion as m } from "motion/react";

const BD = () => {
  const { theme } = useTheme();
  return (
    <div className="min-h-screen relative flex items-center justify-center">
      <FireworksBackground
        className="absolute inset-0 flex items-center justify-center rounded-xl"
        color={theme === "dark" ? "white" : "black"}
      />
      <div className="lg:size-[500px] size-[300px]  rounded-3xl relative  flex items-center justify-center">
        {Array.from({ length: 10 }).map((_, index) => {
          const angle = (index / 10) * 2 * Math.PI;
          const x = 250 * Math.cos(angle);
          const y = 250 * Math.sin(angle);
          const rotation = (index * 360) / 10;
          return (
            <m.div
              key={index}
              className="absolute size-20 p-1 cursor-pointer shadow-lg shadow-black/10 rounded-lg bg-[url(/pic.png)] bg-cover bg-center"
              style={{ x, y, rotate: rotation }}
            />
          );
        })}
        <p className="text-2xl font-bold">Happy Birthday PiC</p>
      </div>
    </div>
  );
};

export default BD;
