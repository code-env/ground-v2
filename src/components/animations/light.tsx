"use client";

import { motion } from "motion/react";
import { Fragment, useState } from "react";

const tabs = [
  { id: "home", label: "Home" },
  { id: "blog", label: "Blog" },
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "contact", label: "Contact" },
];

const FlashlightTabs = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <article className="grid aspect-video place-items-center rounded-xl border border-white/10 bg-white/5">
      <nav className="relative isolate">
        <ul className="flex overflow-hidden rounded-full border border-white/30 bg-text-light-accent p-1.5">
          {tabs.map((tab, index) => (
            <li key={tab.id} className="group relative isolate">
              <button
                onClick={() => setActiveTab(index)}
                className={`relative z-10 px-4 py-2 text-sm font-medium transition-all duration-300 ${
                  activeTab === index
                    ? "text-white [text-shadow:rgba(255,255,255,0.5)_1px_1px_12px]"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
              {activeTab === index && (
                <Fragment>
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 rounded-full bg-white/5 group-first-of-type:rounded-l-3xl group-first-of-type:rounded-r-md group-last-of-type:rounded-l-md group-last-of-type:rounded-r-3xl"
                    style={{ zIndex: -1 }}
                    transition={{
                      type: "spring",
                      duration: 0.7,
                    }}
                  />
                  <motion.div
                    layoutId="active-shade"
                    className="absolute -bottom-[90px] left-0 h-[100px] w-full rounded-full bg-white/10 blur-[7px]"
                    style={{ zIndex: -2 }}
                    transition={{
                      type: "spring",
                      duration: 0.7,
                    }}
                  />
                </Fragment>
              )}
            </li>
          ))}
        </ul>
        <div className="absolute -top-px z-10 h-px w-full bg-linear-to-r from-transparent from-20% via-white/60 via-50% to-transparent to-80%"></div>

        <div className="absolute inset-0 -bottom-px -z-10 overflow-hidden rounded-full">
          <motion.div
            className="absolute inset-0 w-1/5"
            animate={{
              x: `${100 * activeTab}%`,
            }}
            transition={{
              type: "spring",
              duration: 0.7,
            }}
          >
            <div className="h-full w-full scale-x-150 bg-linear-to-r from-transparent via-white/60 via-40% to-transparent"></div>
          </motion.div>
        </div>
      </nav>
    </article>
  );
};

export default FlashlightTabs;
