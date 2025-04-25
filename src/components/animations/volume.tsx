import { cn } from "@/lib/utils";
import {
  motion as m,
  MotionConfig,
  Transition,
  useMotionValue,
  useTransform,
} from "motion/react";
import { useEffect, useState } from "react";
import useMeasure from "react-use-measure";

const TRANSITION: Transition = { type: "spring", bounce: 0, duration: 0.3 };

let clamp = (num: number, min: number, max: number) =>
  Math.max(Math.min(num, max), min);

function roundTo(number: number, decimals: number): number {
  return Math.round(number * Math.pow(10, decimals)) / Math.pow(10, decimals);
}

const Volume = () => {
  let initialHeight = 4;
  let height = 12;
  // let buffer = 12;
  const [clicked, setClicked] = useState(false);
  let [ref, bounds] = useMeasure();
  let [hovered, setHovered] = useState(false);

  let [panning, setPanning] = useState(false);
  let progress = useMotionValue(0.5);
  // let width = useTransform(progress, (v) => `${v * 100}%`);
  let roundedProgress = useTransform(
    progress,
    (v) => `${roundTo(v * 100, 0)}%`
  );
  const [widthValue, setWidthValue] = useState(roundedProgress.get());

  useEffect(() => {
    roundedProgress.on("change", (v) => setWidthValue(v));
  }, [roundedProgress]);

  let state = panning ? "panning" : hovered ? "hovered" : "idle";
  return (
    <MotionConfig transition={TRANSITION}>
      <div className="center full" onClickCapture={() => setClicked(true)}>
        <div className="flex items-center gap-4 border relative w-44 h-10">
          <div className="flex items-center">
            <svg width="25" height="25" viewBox="0 0 25 25" fill="none">
              <path
                d="M16.8574 20C17.5166 20 18 19.5078 18 18.8574V5.43652C18 4.77734 17.5166 4.25 16.8398 4.25C16.3916 4.25 16.0664 4.43457 15.5918 4.90039L11.918 8.33691C11.8652 8.38965 11.7949 8.41602 11.7158 8.41602H9.22852C7.92773 8.41602 7.22461 9.13672 7.22461 10.499V13.7686C7.22461 15.1309 7.92773 15.8516 9.22852 15.8516H11.7158C11.7949 15.8516 11.8564 15.8779 11.918 15.9307L15.5918 19.3936C16.0312 19.8154 16.4004 20 16.8574 20Z"
                fill="currentColor"
              ></path>
            </svg>
            <div className="flex items-center">
              <svg
                width="3"
                height="9"
                viewBox="0 0 3 9"
                fill="none"
                style={{ opacity: 1, transform: "translateY(-0.5px)" }}
              >
                <path
                  d="M0.380841 8.70504C0.758771 8.95113 1.25096 8.86324 1.52342 8.47652C2.23533 7.5273 2.65721 6.18258 2.65721 4.78511C2.65721 3.38765 2.23533 2.05172 1.52342 1.09371C1.25096 0.70699 0.758771 0.619099 0.380841 0.873982C-0.049823 1.15523 -0.128925 1.67379 0.213849 2.18355C0.697247 2.87789 0.969708 3.80953 0.969708 4.78511C0.969708 5.7607 0.697247 6.68355 0.213849 7.38668C-0.128925 7.89644 -0.049823 8.415 0.380841 8.70504Z"
                  fill="currentColor"
                ></path>
              </svg>
              <svg
                width="4"
                height="14"
                viewBox="0 0 4 14"
                fill="none"
                style={{ opacity: 1 }}
              >
                <path
                  d="M0.922639 13.0602C1.32694 13.3063 1.81912 13.2184 2.10037 12.8054C3.24295 11.1882 3.91092 9.01727 3.91092 6.78485C3.91092 4.55242 3.25174 2.37274 2.10037 0.764338C1.81912 0.351252 1.32694 0.254572 0.922639 0.509455C0.500764 0.773127 0.43924 1.30047 0.755646 1.76629C1.68729 3.13738 2.22342 4.92156 2.22342 6.78485C2.22342 8.63934 1.6785 10.4235 0.755646 11.8034C0.448029 12.2692 0.500764 12.7878 0.922639 13.0602Z"
                  fill="currentColor"
                ></path>
              </svg>
              <svg
                width="5"
                height="18"
                viewBox="0 0 5 18"
                fill="none"
                style={{ opacity: 1 }}
              >
                <path
                  d="M0.48256 17.4425C0.869279 17.6974 1.38783 17.5831 1.66908 17.1612C3.21596 14.8409 4.1476 11.9581 4.1476 8.79404C4.1476 5.62118 3.19838 2.74716 1.66908 0.418059C1.38783 -0.0126051 0.869279 -0.118074 0.48256 0.136809C0.0606854 0.40927 -0.000838012 0.927825 0.289201 1.39364C1.63393 3.4415 2.46889 5.98154 2.46889 8.79404C2.46889 11.589 1.63393 14.1466 0.289201 16.1856C-0.000838012 16.6515 0.0606854 17.17 0.48256 17.4425Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
          </div>
          <div className="flex-1 h-full">
            <m.div
              animate={state}
              onPanStart={() => setPanning(true)}
              onPanEnd={() => setPanning(false)}
              onPointerEnter={() => setHovered(true)}
              onPointerLeave={() => {
                setHovered(false);
                // setClicked(false);
              }}
              onPan={(_, info) => {
                let deltaInPercent = info.delta.x / bounds.width;
                let newPercent = clamp(progress.get() + deltaInPercent, 0, 1);
                progress.set(newPercent);
              }}
              className={cn(
                "flex items-center justify-center relative touch-none grow-0 w-full",
                clicked && "absolute inset-0 "
              )}
              initial={false}
              ref={ref}
            >
              <m.div
                initial={false}
                variants={{
                  idle: { height: initialHeight },
                  hovered: { height },
                  panning: { height },
                }}
                className="relative rounded-full overflow-hidden w-full"
              >
                <div className="h-full bg-muted" />
                <m.div
                  animate={{ width: widthValue }}
                  className="bg-red-500 absolute w-[20%] inset-0"
                />
              </m.div>
            </m.div>
          </div>
        </div>
      </div>
    </MotionConfig>
  );
};

export default Volume;
