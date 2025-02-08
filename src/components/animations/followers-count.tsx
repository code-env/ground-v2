import { AnimatePresence, motion } from "motion/react";
import { memo, useEffect, useRef, useState } from "react";

const animation = {
  hidden: (direction: -1 | 1) => ({
    y: direction === 1 ? 30 : -30,
    opacity: 0,
    filter: "blur(4px)",
    scale: 0.5,
  }),
  visible: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    scale: 1,
  },
  exit: (direction: -1 | 1) => ({
    y: direction === 1 ? -30 : 30,
    opacity: 0,
    filter: "blur(4px)",
    scale: 0.5,
  }),
};

const FollowerCounter = () => {
  const [count, setCount] = useState<number>(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const intervalRef = useRef<number | null>(null);
  const prevCount = useRef<number>(count);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  useEffect(() => {
    const setupAudio = (): void => {
      try {
        audioContextRef.current = new AudioContext();
        oscillatorRef.current = audioContextRef.current.createOscillator();
        gainNodeRef.current = audioContextRef.current.createGain();

        if (
          oscillatorRef.current &&
          gainNodeRef.current &&
          audioContextRef.current
        ) {
          oscillatorRef.current.connect(gainNodeRef.current);
          gainNodeRef.current.connect(audioContextRef.current.destination);

          oscillatorRef.current.frequency.setValueAtTime(
            220,
            audioContextRef.current.currentTime
          );
          gainNodeRef.current.gain.setValueAtTime(
            0.1,
            audioContextRef.current.currentTime
          );

          oscillatorRef.current.start();
        }
      } catch (error) {
        console.error("Audio setup failed:", error);
      }
    };

    setupAudio();
    let startTime = Date.now();
    const duration = 10000; // 10 seconds
    const targetNumber = 50;

    intervalRef.current = window.setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const easeInOut =
        progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      const newCount = Math.round(easeInOut * targetNumber);

      if (
        newCount !== prevCount.current &&
        audioContextRef.current &&
        oscillatorRef.current
      ) {
        setDirection(newCount > prevCount.current ? 1 : -1);
        setCount(newCount);
        prevCount.current = newCount;

        const frequency = 220 + 660 * progress;
        oscillatorRef.current.frequency.setValueAtTime(
          frequency,
          audioContextRef.current.currentTime
        );
      }

      if (progress >= 1) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        if (oscillatorRef.current) oscillatorRef.current.stop();
        if (audioContextRef.current) audioContextRef.current.close();
        setShowConfetti(true);
      }
    }, 50);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (oscillatorRef.current) oscillatorRef.current.stop();
      if (audioContextRef.current) audioContextRef.current.close();
    };
  }, []);

  return (
    <div className="size-full items-center justify-center flex bg-background rounded-xl p-8  flex-col relative">
      {showConfetti && <Confetti />}
      <div className="text-6xl font-bold text-primary mb-2 h-24 flex items-center">
        <AnimatePresence mode="popLayout" custom={direction}>
          {count
            .toString()
            .split("")
            .map((digit, index) => (
              <motion.span
                key={`${digit}-${index}`}
                variants={animation}
                initial="hidden"
                animate="visible"
                exit="exit"
                custom={direction}
                className="inline-block"
              >
                {digit}
              </motion.span>
            ))}
        </AnimatePresence>
      </div>
      <p className="text-primary text-xl">Followers on Peerlist.</p>
    </div>
  );
};

interface ConfettiParticleProps {
  index: number;
}

const ConfettiParticle: React.FC<ConfettiParticleProps> = memo(({}) => {
  const animationDuration = useRef(Math.random() * 2 + 1);
  const initialDelay = useRef(Math.random() * 0.5);
  const initialX = useRef(Math.random() * 100);
  const color = useRef(`hsl(${Math.random() * 360}, 80%, 60%)`);

  return (
    <motion.div
      className="absolute"
      initial={{
        top: "0%",
        left: `${initialX.current}%`,
        scale: 0,
        rotate: 0,
      }}
      animate={{
        top: "100%",
        scale: 1,
        rotate: 360,
      }}
      transition={{
        duration: animationDuration.current,
        delay: initialDelay.current,
        ease: "linear",
        repeat: Infinity,
      }}
    >
      <div
        className="w-2 h-2"
        style={{
          backgroundColor: color.current,
          clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)",
        }}
      />
    </motion.div>
  );
});

const Confetti: React.FC = memo(() => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {Array.from({ length: 50 }).map((_, index) => (
        <ConfettiParticle key={index} index={index} />
      ))}
    </div>
  );
});

export default FollowerCounter;
