import { cn } from "@/lib/utils";
import { AnimatePresence, motion, Variants } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

const playingVariants: Variants = {
  hidden: { opacity: 0, scale: 0.3, filter: "blur(4px)" },
  visible: { opacity: 1, scale: 1, filter: "blur(0px)" },
};

const Map = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const [_, setLineScales] = useState<number[]>(Array(26).fill(1));
  const [lineHeights, setLineHeights] = useState<number[]>(Array(21).fill(18));
  const animationFrameRef = useRef<number>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);

  useEffect(() => {
    const initializeAudio = async () => {
      const audio = new Audio("/audio.mp3");
      audio.volume = volume;
      audioRef.current = audio;

      const audioContext = new AudioContext();
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 64;

      const source = audioContext.createMediaElementSource(audio);
      source.connect(analyser);
      analyser.connect(audioContext.destination);

      audioContextRef.current = audioContext;
      analyserRef.current = analyser;
    };

    initializeAudio();

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const updateFrequencyData = () => {
      if (!analyserRef.current) return;

      const analyser = analyserRef.current;
      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      analyser.getByteFrequencyData(dataArray);

      // Map frequency data to line scales and heights
      const newScales = Array(26).fill(1);
      const newHeights = Array(21).fill(18);

      for (let i = 0; i < 21; i++) {
        const dataIndex = Math.floor(i * (dataArray.length / 21));
        const frequencyValue = dataArray[dataIndex];
        // Convert frequency value (0-255) to scale (1-3.5)
        newScales[i] = 1 + (frequencyValue / 255) * 2.5;
        // Convert frequency value (0-255) to height (18-100)
        newHeights[i] = 18 + (frequencyValue / 255) * 82;
      }

      setLineScales(newScales);
      setLineHeights(newHeights);
      animationFrameRef.current = requestAnimationFrame(updateFrequencyData);
    };

    updateFrequencyData();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const handlePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <div className="full center relative flex flex-col gap-8">
      <motion.div
        initial={{ opacity: 0, filter: "blur(4px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.5 }}
        className=" items-end flex gap-[9px]  min-h-[100px]"
        ref={containerRef}
      >
        {lineHeights.map((height, index) => (
          <motion.div
            key={index}
            className={cn(
              "w-px !max-h-[100px]",
              height > 50 ? "bg-red-300" : "bg-muted-foreground"
            )}
            initial={{ height: 18 }}
            animate={{
              height,
            }}
            transition={{
              type: "spring",
              bounce: 0,
              duration: 0.1,
            }}
          />
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex gap-10"
      >
        <motion.button
          onClick={handlePlayPause}
          className="center h-10 max-w-10 w-10 min-w-10 border rounded-full"
        >
          <AnimatePresence mode="wait" initial={false}>
            {isPlaying ? (
              <motion.span
                variants={playingVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                key="pause"
                className="center size-full rounded-full"
              >
                <Pause className="size-4" />
              </motion.span>
            ) : (
              <motion.span
                variants={playingVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                key="play"
                className="center  rounded-full"
              >
                <Play className="size-4" />
              </motion.span>
            )}
          </AnimatePresence>
          <span className="sr-only">{isPlaying ? "Pause" : "Play"}</span>
        </motion.button>
        <div className="flex items-center gap-2">
          <span className="text-zinc-400 sr-only">Volume</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="w-24 accent-zinc-200"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Map;
