import { siteConfig } from "@/lib/config";
import { EditorContent, useEditor } from "@tiptap/react";
import Starter from "@tiptap/starter-kit";
import { File, Image, Link, Mic, SendHorizonal, Smile } from "lucide-react";
import {
  AnimatePresence,
  motion,
  MotionConfig,
  type Transition,
  type Variants,
} from "motion/react";
import { useState } from "react";

type Message = { id: number; text: string };

const TRANSITION: Transition = {
  duration: 0.5,
  type: "spring",
};

const fileItems = [
  {
    icon: Image,
    text: "Photo and Video",
  },
  {
    icon: File,
    text: "File",
  },
];

const TelegramInput = () => {
  const [input, setInput] = useState("");
  const [onEmoji, setOnEmoji] = useState(false);
  const [onFile, setOnFile] = useState(false);
  const [messages, setMessages] = useState([] as Message[]);

  const handleSubmit = () => {
    if (input.trim()) {
      setMessages([...messages, { id: Date.now(), text: input }]);
      setInput("");
    }
  };

  return (
    <MotionConfig transition={TRANSITION}>
      <div className="size-full flex flex-col gap-3">
        <Messages messages={messages} message={input} />
        <div className="flex items-end gap-3">
          <div className="flex-1 flex items-end bg-background border rounded-[0.9375rem] rounded-br-none px-4 pr-0 relative">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                <img
                  src={siteConfig.link.imageURl}
                  alt={siteConfig.author}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <button
                className="w-10 h-10 bg-background rounded-full flex items-center justify-center group"
                onMouseEnter={() => setOnEmoji(true)}
                onMouseLeave={() => setOnEmoji(false)}
              >
                <Smile className="w-5 h-5 text-neutral-500 group-hover:text-primary transition-all" />
              </button>
            </div>

            <AnimatePresence>
              {onFile && (
                <motion.ul
                  className="absolute bottom-[70px] right-0 bg-background rounded-lg p-2 flex flex-col gap-2"
                  initial={{ opacity: 0, scale: 0.3 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.3 }}
                  onMouseLeave={() => setOnFile(false)}
                >
                  {fileItems.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-2 p-2 hover:bg-gray-200 rounded-lg cursor-pointer transition-all"
                    >
                      <item.icon className="w-4 h-4" />
                      <span className="text-sm">{item.text}</span>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {onEmoji && (
                <motion.div
                  className="absolute bottom-[70px] left-0 bg-background rounded-lg w-40 p-5 border"
                  initial={{ opacity: 0, scale: 0.3 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.3 }}
                ></motion.div>
              )}
            </AnimatePresence>

            <div className="flex-1 flex items-end p-2">
              <Editor
                setInput={setInput}
                handleSubmit={handleSubmit}
                messages={messages}
              />
              <button
                className="w-10 h-10 flex items-center justify-center group"
                onMouseEnter={() => setOnFile(true)}
              >
                <Link className="w-5 h-5 text-neutral-500 group-hover:text-primary transition-all" />
              </button>
            </div>

            <svg
              width="12"
              height="17"
              viewBox="0 0 12 17"
              fill="green"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute -right-3 bottom-0"
            >
              <path
                d="M10 17H0V0C0.321667 2.84 1.46 5.767 3.41667 8.782C4.92333 11.107 7.49333 13.267 11.125 15.262C11.373 15.398 11.5466 15.5759 11.6232 15.7722C11.6997 15.9685 11.6756 16.1741 11.5539 16.362C11.4323 16.55 11.2188 16.7114 10.9415 16.8253C10.6642 16.9391 10.336 17 10 17Z"
                fill="white"
                className=""
              />
            </svg>
          </div>

          <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center">
            <AnimatePresence mode="wait">
              {input.length > 0 ? (
                <motion.div
                  className="size-full flex items-center justify-center"
                  key="check"
                  initial={{ opacity: 0, scale: 0.3 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.3 }}
                  transition={{ duration: 0.2 }}
                >
                  <SendHorizonal
                    size={30}
                    className="fill-primary stroke-primary"
                    onClick={handleSubmit} // Add this event handler
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="copy"
                  className="size-full flex items-center justify-center"
                  initial={{ opacity: 0, scale: 0.3 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.3 }}
                  transition={{ duration: 0.2 }}
                >
                  <Mic className="fill-primary stroke-primary" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </MotionConfig>
  );
};

const paragraphVariants: Variants = {
  hidden: { opacity: 0, x: 10 },
  visible: { opacity: 1, x: 0 },
};

interface EditorProps {
  setInput: (value: string) => void;
  handleSubmit: () => void;
  messages: Message[];
}

function Editor({ setInput, handleSubmit, messages }: EditorProps) {
  const editor = useEditor({
    extensions: [
      Starter.configure({
        italic: false,
      }),
    ],
    onUpdate: ({ editor }) => {
      setInput(editor.getText());
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
    <div className="flex flex-col gap-4 flex-1 relative">
      <EditorContent
        editor={editor}
        className="max-h-96  overflow-y-auto py-3 outline-none rounded-lg min-h-full"
        onKeyDown={handleKeyDown}
        starter-kit
      />

      <motion.p
        variants={paragraphVariants}
        animate={editor?.getText().length === 0 ? "visible" : "hidden"}
        exit="hidden"
        initial="hidden"
        className="absolute left-[1px] top-0 bottom-0 my-auto h-fit text-neutral-500"
      >
        Message
      </motion.p>
      <motion.div
        key={messages.length}
        layout="position"
        className="z-10 mt-2 max-w-[250px] break-words rounded  bg-background self-end absolute"
        layoutId={`messages-[${messages.length - 1}]`}
        transition={trans}
        initial={{ opacity: 0.6, zIndex: -1 }}
        animate={{ opacity: 0.6, zIndex: -1 }}
        exit={{ opacity: 1, zIndex: 1 }}
      >
        <div className="px-3 py-2 text-[15px] leading-[15px] text-primary">
          {editor?.getText()}
        </div>
      </motion.div>
    </div>
  );
}

interface MessagesProps {
  messages: Message[];
  message: string;
}

const trans = {
  type: "spring",
  duration: 0.2,
};

const Messages = ({ messages }: MessagesProps) => {
  return (
    <div className="flex-1 w-full overflow-y-auto flex flex-col justify-end overflow-x-clip">
      <AnimatePresence mode="wait">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            layout="position"
            className="z-10 mt-2 max-w-[250px] break-words rounded  bg-background self-end"
            transition={trans}
            layoutId={`messages-[${messages.length - 1}]`}
          >
            <div className="px-3 py-2 text-[15px] leading-[15px] text-primary">
              {message.text}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TelegramInput;
