"use client";

import { cn } from "@/lib/utils";
import { EditorContent, useEditor } from "@tiptap/react";
import Placeholder from "@tiptap/extension-placeholder";
import Starter from "@tiptap/starter-kit";
import { Mic, PlusIcon, Sticker, X } from "lucide-react";
import { AnimatePresence, motion, Variants } from "motion/react";
import { useState } from "react";

const transitionDebug = {
  type: "easeOut",
  duration: 0.2,
};

const selectedMessageVariants: Variants = {
  initial: {
    y: 100,
  },
  animate: {
    y: 0,
  },
};
const Imessage = () => {
  const [messages, setMessages] = useState<
    {
      id: number;
      text: string;
    }[]
  >([]);
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);

  const [newMessage, setNewMessage] = useState<string>("");

  const handleSubmit = () => {
    if (newMessage.trim()) {
      const timestamp = new Date().getTime();
      setMessages([...messages, { id: timestamp, text: newMessage }]);
      setNewMessage("");
    }
  };

  return (
    <div className="flex h-full flex-col items-end justify-end pb-6 mx-auto w-full gap-4">
      <div className="flex flex-col justify-end items-end gap-0.5 flex-1 h-full w-full overflow-hidden">
        <AnimatePresence mode="wait">
          {messages.map((message) => (
            <div
              key={message.id}
              className="flex flex-col items-end w-full"
              onDoubleClick={() => setSelectedMessage(message.text)}
            >
              <motion.div
                layoutId={`container-[${messages.length - 1}]`}
                transition={transitionDebug}
                layout="position"
                className="px-3 py-2 text-base max-w-[80%] bg-background z-10 break-words rounded"
              >
                {message.text}
              </motion.div>
            </div>
          ))}
        </AnimatePresence>
      </div>
      <motion.div
        className="w-full flex flex-col bg-background p-2 gap-2 relative overflow-hidden"
        animate={{
          borderRadius: selectedMessage ? "10px 10px 22px 22px" : "28px",
        }}
      >
        <AnimatePresence>
          {selectedMessage && (
            <motion.div
              variants={selectedMessageVariants}
              initial="initial"
              animate="animate"
              exit="initial"
              className="w-full bg-muted h-20 rounded-md relative p-2 z-0"
            >
              <p className="text-sm line-clamp-2 w-full text-muted-foreground">
                {selectedMessage}
              </p>
              <Button
                className="absolute top-0 right-0 size-6 center"
                onClick={() => setSelectedMessage(null)}
              >
                <X className="size-4" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="flex w-full items-end z-[9999999] bg-background">
          <div className="flex gap-0.5">
            <Button>
              <PlusIcon className="size-5" />
            </Button>
            <Button>
              <Sticker className="size-5" />
            </Button>
          </div>
          <Input setMessage={setNewMessage} handleSubmit={handleSubmit} />
          <motion.div
            key={messages.length}
            layout="position"
            className="pointer-events-none absolute z-10 flex h-9 w-[80%] items-center overflow-hidden break-words rounded-full  [word-break:break-word] "
            layoutId={`container-[${messages.length}]`}
            transition={transitionDebug}
            initial={{ opacity: 0.6, zIndex: -1 }}
            animate={{ opacity: 0.6, zIndex: -1 }}
            exit={{ opacity: 1, zIndex: 1 }}
          >
            <div className="">{newMessage}</div>
          </motion.div>
          <Button className="size-10 group hover:bg-[#1daa61] rounded-full center transition-all duration-300">
            <Mic className="" />
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

const Button = ({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
}) => {
  return (
    <button
      type="submit"
      className={cn(
        "flex size-10 items-center justify-center bg-background rounded-full hover:bg-muted transition-all duration-300",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

const Input = ({
  setMessage,
  handleSubmit,
}: {
  setMessage: (message: string) => void;
  handleSubmit: () => void;
}) => {
  const editor = useEditor({
    extensions: [
      Starter,
      Placeholder.configure({
        placeholder: "Type a message",
      }),
    ],

    onUpdate: ({ editor }) => {
      setMessage(editor.getText());
    },
  });

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      editor?.commands.clearContent();
      handleSubmit();
    }
  };
  return (
    <div className="flex flex-1 relative">
      <EditorContent
        editor={editor}
        className="max-h-96 overflow-y-auto min-h-10 outline-none py-2 w-full px-1 bg-background"
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default Imessage;
