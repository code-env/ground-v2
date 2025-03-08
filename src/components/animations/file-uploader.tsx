import { buttonVariants } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

import {
  AnimatePresence,
  MotionConfig,
  Transition,
  motion as m,
} from "motion/react";
import { useEffect, useState } from "react";

type States = "idle" | "processing" | "uploading" | "success" | "error";

type FileType = {
  id: number;
  name: string;
  state: States;
};

const TRANSITION: Transition = {
  duration: 0.5,
  ease: "easeInOut",
};

const initialFiles: FileType[] = [
  { name: "file1", state: "idle" as States },
  { name: "file2", state: "idle" as States },
  { name: "file3", state: "idle" as States },
  { name: "file4", state: "idle" as States },
].map((file, index) => ({ ...file, id: index + 1 }));

const Uploader = () => {
  const [files, setFiles] = useState<FileType[]>(initialFiles);

  useEffect(() => {
    const uploadFile = async (index: number) => {
      if (index >= files.length) return;

      setFiles((prev) =>
        prev.map((file, i) =>
          i === index ? { ...file, state: "processing" } : file,
        ),
      );

      await new Promise((resolve) => setTimeout(resolve, 1000));

      setFiles((prev) =>
        prev.map((file, i) =>
          i === index ? { ...file, state: "uploading" } : file,
        ),
      );

      await new Promise((resolve) => setTimeout(resolve, 2000));

      setFiles((prev) =>
        prev.map((file, i) =>
          i === index ? { ...file, state: "success" } : file,
        ),
      );

      uploadFile(index + 1);
    };

    uploadFile(0);
  }, [files.length]);

  return (
    <MotionConfig transition={TRANSITION}>
      <div className="max-w-md w-full flex flex-col divide-y-2 rounded-xl border-2 overflow-hidden">
        {files.map((file) => (
          <div
            key={file.id}
            className="p-4 first:rounded-t-xl last:rounded-b-xl bg-background flex items-center justify-between"
          >
            <div className="flex items-center space-x-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              <p>{file.name}</p>
            </div>
            <m.button
              className={buttonVariants({
                variant: "outline",
                className:
                  file.state === "success" &&
                  "bg-blue-100 text-blue-500 border-blue-100 hover:bg-blue-200 hover:text-blue-500",
              })}
              animate={{ width: "auto" }}
              layout="position"
            >
              <AnimatePresence mode="popLayout" initial={false}>
                <m.div
                  key={file.state}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="capitalize"
                >
                  {file.state}
                </m.div>
              </AnimatePresence>
            </m.button>
          </div>
        ))}
      </div>
    </MotionConfig>
  );
};

export default Uploader;
