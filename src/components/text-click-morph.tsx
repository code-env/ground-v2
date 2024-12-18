import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState, useEffect } from "react";
import "./styles.css";

export default function App() {
  return (
    <main className="flex size-full flex-col items-center justify-center overflow-y-auto p-4 md:p-8">
      <div className="flex w-full max-w-xs items-center justify-center">
        <View />
      </div>
    </main>
  );
}

function View() {
  const [text, setText] = useState("Creative");

  const characters = useMemo(() => {
    const entities = text.split("").map((ch) => ch.toLowerCase());
    const characters = [];

    for (let index = 0; index < entities.length; index++) {
      const entity = entities[index];
      const count = entities.slice(0, index).filter((e) => e === entity).length;

      characters.push({
        id: `${entity}${count + 1}`,
        label: characters.length === 0 ? entity.toUpperCase() : entity,
      });
    }

    return characters;
  }, [text]);

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     setText((prevText) => {
  //       const currentIndex = WORDS.indexOf(prevText);
  //       const nextIndex = (currentIndex + 1) % WORDS.length;
  //       return WORDS[nextIndex];
  //     });
  //   }, 2000);

  //   return () => clearInterval(intervalId);
  // }, []);

  return (
    <div className="flex w-full flex-col items-center justify-center space-y-6">
      <div className="size-56 bg-gray-100 rounded-xl border flex items-center justify-center">
        <p className="flex items-center justify-center rounded-3xl text-3xl font-medium text-black">
          <AnimatePresence mode="popLayout">
            {characters.map((character) => (
              <motion.span
                key={character.id}
                layoutId={character.id}
                layout="position"
                className="inline-block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  type: "spring",
                  bounce: 0.1,
                  duration: 0.3,
                }}
              >
                {character.label}
              </motion.span>
            ))}
          </AnimatePresence>
        </p>
      </div>
      <div className="flex items-center gap-2">
        {WORDS.map((word, indx) => {
          //something
          return (
            <button
              className="px-3 py-1.5 border rounded-xl hover:bg-gray-50 transition-all duration-300"
              onClick={() => setText(word)}
            >
              {word}
            </button>
          );
        })}
      </div>
    </div>
  );
}

const WORDS = ["Creative", "Create", "Continue", "Confirm"];
