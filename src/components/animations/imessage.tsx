"use client";

import { Mic, PlusIcon, Sticker } from "lucide-react";
import { AnimatePresence, motion, Variants } from "motion/react";
import { EditorContent, useEditor } from "@tiptap/react";
import Starter from "@tiptap/starter-kit";
import { useState } from "react";

const transitionDebug = {
  type: "easeOut",
  duration: 0.2,
};

const Imessage = () => {
  const [messages, setMessages] = useState<
    {
      id: number;
      text: string;
    }[]
  >([]);
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
            <motion.div
              key={message.id}
              layout="position"
              className="z-10 max-w-[80%] break-words rounded  bg-background"
              layoutId={`container-[${messages.length - 1}]`}
              transition={transitionDebug}
            >
              <div className="px-3 py-2 text-base ">{message.text}</div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <div className="flex w-full items-end bg-background rounded-[22px] p-1">
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
        <Button>
          <Mic className="size-5" />
        </Button>
      </div>
    </div>
  );
};

const Button = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) => {
  return (
    <button
      type="submit"
      className="flex size-10 items-center justify-center bg-background rounded-full hover:bg-muted transition-all duration-300"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const paragraphVariants: Variants = {
  hidden: { opacity: 0, x: 10, filter: "blur(10px)" },
  visible: { opacity: 1, x: 0, filter: "blur(0px)" },
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
      Starter.configure({
        italic: false,
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
        className="max-h-96 overflow-y-auto min-h-10 outline-none py-2 w-full px-1"
        onKeyDown={handleKeyDown}
        starter-kit
      />
      <motion.p
        variants={paragraphVariants}
        animate={editor?.getText().length === 0 ? "visible" : "hidden"}
        exit="hidden"
        initial="hidden"
        className="absolute left-1 top-0 bottom-0 my-auto h-fit text-neutral-500"
      >
        Type a message
      </motion.p>
    </div>
  );
};

export default Imessage;
