import useClickOutside from "@/hooks/click-outside";
import { CheckCircle2, Loader } from "lucide-react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { useEffect, useId, useRef, useState } from "react";

const TRANSITION = {
  type: "spring",
  bounce: 0.05,
  duration: 0.3,
};

const Feedback = () => {
  const uniqueId = useId();
  const formContainerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [feedback, setFeedback] = useState<null | string>(null);
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const openMenu = () => {
    setIsOpen(true);
  };

  const closeMenu = () => {
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setIsSent(true);
    }, 1000);

    setTimeout(() => {
      setIsSent(false);
      setIsOpen(false);
      setFeedback(null);
    }, 3000);
  };

  useClickOutside(formContainerRef, () => {
    setIsOpen(false);
  });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="flex items-center justify-center size-full">
      <MotionConfig transition={TRANSITION}>
        <div className="relative flex items-center justify-center">
          <motion.button
            key="button"
            layoutId={`popover-${uniqueId}`}
            className="flex h-9 items-center border-2 bg-background px-3"
            style={{
              borderRadius: 8,
            }}
            onClick={openMenu}
          >
            <motion.span
              layoutId={`popover-label-${uniqueId}`}
              className="text-sm"
            >
              Feedback
            </motion.span>
          </motion.button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                ref={formContainerRef}
                layoutId={`popover-${uniqueId}`}
                className="absolute h-[200px] w-96 overflow-hidden   bg-muted-foreground/20 border-2 p-1"
                style={{
                  borderRadius: 12,
                }}
              >
                <form
                  className="flex h-full flex-col bg-background rounded-lg border-2 border-zinc-950/10"
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
                  <motion.span
                    layoutId={`popover-label-${uniqueId}`}
                    aria-hidden="true"
                    style={{
                      opacity: feedback ? 0 : 1,
                    }}
                    className="absolute left-[21px] top-4 select-none text-sm text-zinc-500"
                  >
                    Feedback
                  </motion.span>
                  <textarea
                    className="h-full w-full resize-none rounded-md bg-transparent px-4 py-3 text-sm outline-none"
                    autoFocus
                    onChange={(e) => setFeedback(e.target.value)}
                  />
                  <div
                    key="close"
                    className="flex justify-end  p-3 border-t-2 border-dashed border-spacing-96  border-zinc-950/10"
                    style={{
                      borderSpacing: 10,
                    }}
                  >
                    <Button onClick={closeMenu}>
                      {isSending ? (
                        <Loader className="size-4 animate-spin" />
                      ) : (
                        "Send Feedback"
                      )}
                    </Button>
                  </div>
                </form>
                <AnimatePresence>
                  {isSent && (
                    <motion.div
                      className="absolute inset-0 bg-background flex items-center justify-center flex-col gap-1"
                      initial={{ opacity: 0, y: -100 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -100 }}
                    >
                      <CheckCircle2 className="text-neutral-950 fill-neutral-300 size-5" />
                      <h2 className="text-sm text-neutral-950 font-medium ">
                        Feedback sent
                      </h2>
                      <p className="text-xs text-neutral-500">
                        Thanks for helping me improve graound.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </MotionConfig>
    </div>
  );
};

const Button = ({
  children,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}) => {
  return (
    <motion.button
      className="relative ml-1 flex h-8 text-sm text-neutral-100 bg-neutral-900 hover:bg-neutral-800 items-center justify-center px-3 rounded-md w-40"
      type="submit"
      aria-label={children as string}
      onClick={onClick}
      disabled={disabled}
      key={children as string}
      transition={TRANSITION}
    >
      {children}
    </motion.button>
  );
};

export default Feedback;
