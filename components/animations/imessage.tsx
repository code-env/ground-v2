"use client";

import { cn } from "@/lib/utils";
import { EditorContent, useEditor } from "@tiptap/react";
import Placeholder from "@tiptap/extension-placeholder";
import Starter from "@tiptap/starter-kit";
import { Mic, PlusIcon, Sticker, X } from "lucide-react";
import { AnimatePresence, motion, Variants } from "motion/react";
import { useState, useRef } from "react";

// Improved transition settings for smoother animations
const smoothTransition = {
  type: "spring",
  stiffness: 500,
  damping: 40,
  mass: 1,
};

// Animation variants
const messageVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.96,
    y: 20,
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      ...smoothTransition,
      delay: 0.05,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    transition: { duration: 0.2 },
  },
};

const selectedMessageVariants: Variants = {
  initial: {
    y: 5,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      ...smoothTransition,
    },
  },
  exit: {
    y: -5,
    opacity: 0,
    transition: { duration: 0.2 },
  },
};

const containerVariants: Variants = {
  collapsed: {
    borderRadius: "28px",
  },
  expanded: {
    borderRadius: "10px 10px 22px 22px",
    transition: smoothTransition,
  },
};

interface Message {
  id: number;
  text: string;
}

const Imessage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = () => {
    if (newMessage.trim()) {
      const timestamp = new Date().getTime();
      setMessages([...messages, { id: timestamp, text: newMessage }]);
      setNewMessage("");

      // Scroll to bottom on new message
      setTimeout(scrollToBottom, 100);
    }
  };

  return (
    <div className="flex h-full flex-col items-end justify-end pb-6 mx-auto w-full gap-4">
      <div className="flex flex-col justify-end items-end gap-1 flex-1 h-full w-full overflow-y-auto overflow-x-hidden pr-1 pl-6">
        <AnimatePresence mode="popLayout">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              className="flex flex-col items-end w-full"
              onDoubleClick={() => setSelectedMessage(message.text)}
              variants={messageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              layout
            >
              <div className="px-3 py-2 text-base max-w-[80%] bg-blue-500 text-white z-10 break-words rounded-2xl rounded-tr-sm">
                {message.text}
              </div>
            </motion.div>
          ))}
          <div ref={messagesEndRef} />
        </AnimatePresence>
      </div>

      <motion.div
        className="w-full flex flex-col bg-background p-2 gap-2 relative overflow-hidden"
        variants={containerVariants}
        animate={selectedMessage ? "expanded" : "collapsed"}
        layout
      >
        <AnimatePresence>
          {selectedMessage && (
            <motion.div
              variants={selectedMessageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full bg-muted h-20 rounded-md relative p-2 z-10"
              layoutId="selectedMessage"
            >
              <p className="text-sm line-clamp-2 w-full text-muted-foreground">
                {selectedMessage}
              </p>
              <Button
                className="absolute top-1 right-1 size-6 center"
                onClick={() => setSelectedMessage(null)}
              >
                <X className="size-4" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          layoutId="message-container-holder"
          className="flex w-full items-end z-20 bg-red-500 min-h-10 rounded-full "
        >
          <div className="flex gap-0.5">
            <Button className="">
              <PlusIcon className="size-5" />
            </Button>
            <Button className="">
              <Sticker className="size-5" />
            </Button>
          </div>

          <Input setMessage={setNewMessage} handleSubmit={handleSubmit} />

          <Button className="size-10 group hover:bg-[#1daa61] rounded-full flex items-center justify-center transition-all duration-300">
            <motion.div
              whileTap={{ scale: 0.92 }}
              transition={smoothTransition}
            >
              <Mic />
            </motion.div>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <motion.button
      type="button"
      className={cn(
        "flex size-10 items-center justify-center bg-background rounded-full hover:bg-muted transition-all duration-300",
        className
      )}
      whileHover={{ backgroundColor: "hsl(var(--muted))" }}
      whileTap={{ scale: 0.95 }}
      transition={smoothTransition}
      {...props}
    >
      {children}
    </motion.button>
  );
};

interface InputProps {
  setMessage: (message: string) => void;
  handleSubmit: () => void;
}

const Input: React.FC<InputProps> = ({ setMessage, handleSubmit }) => {
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
        className="max-h-96 overflow-y-auto min-h-10 outline-none py-2 w-full px-3 bg-background rounded-2xl"
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default Imessage;
