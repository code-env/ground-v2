"use client";
import {
  animate,
  motionValue,
  motion,
  useTransform,
  useSpring,
} from "motion/react";

export const Seo = () => {
  const x = motionValue(0);
  animate(x, 100, { duration: 0.9 });
  const number = useTransform(x, (v) => Number(v.toFixed(0)));
  const springX = useSpring(x, { damping: 40 });
  const dx = useTransform(springX, (v) => `${v / 100}px 1px`);

  return (
    <motion.div
      whileInView="visible"
      viewport={{ once: true }}
      initial={{
        boxShadow: "none",
      }}
      animate={{
        boxShadow:
          "0 2.0155254638171756px 1.6124203710537404px -.34375px #0099ff24,0 4.777151241141837px 3.8217209929134697px -.6875px #0099ff23,0 8.714images017655176574px 6.971214124141261px -1.03125px #0099ff23,0 14.487036858627107px 11.589629486901686px -1.375px #09f2,0 23.395383266347928px 18.71630661307834px -1.71875px #09f2,0 38.29592112890677px 30.636736903125417px -2.0625px #0099ff21,0 65.94299011604161px 52.7543920928333px -2.40625px #0099ff20,0 120px 96px -2.75px #0099ff1d",
      }}
      transition={{ delay: 2.3, duration: 0.6 }}
      className="w-fit h-fit rounded-full p-2 bg-cyan-600 relative flex items-center justify-center"
    >
      <svg
        width="150"
        height="150"
        viewBox="0 0 150 150"
        className="-rotate-90"
        fill="none"
      >
        <motion.circle
          cx="75"
          cy="75"
          r="70"
          strokeWidth={"0.5rem"}
          pathLength="0.99"
          strokeDashoffset={"0px"}
          className="stroke-white"
          strokeDasharray={dx}
        />
      </svg>
      <motion.div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl font-bold text-white">
        {number}
      </motion.div>
    </motion.div>
  );
};
