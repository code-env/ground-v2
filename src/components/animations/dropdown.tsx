"use client";
import useClickOutside from "@/hooks/click-outside";
import {
  ArrowLeft,
  ChevronDown,
  Code,
  MoreHorizontal,
  Search,
  Smile,
  Sun,
  WalletIcon,
} from "lucide-react";
import { motion, MotionConfig, useAnimate } from "motion/react";
import React, { useRef, useState } from "react";

const lists = [
  {
    title: "Features",
    description: "Explore the features of ground pro",
    icon: Smile,
  },
  {
    title: "Waitlist",
    description: "Checkout it's waitlist",
    icon: WalletIcon,
  },
  {
    title: "Build by",
    description: "Build by Bossadi Zenith",
    icon: Code,
  },
];

const DropdownNav = () => {
  return (
    <div className="size-full  flex items-center justify-start relative p-10 flex-col gap-10">
      <button className="bg-transparent duration-300 transition-all px-5 py-2 rounded-full hover:bg-white flex items-center gap-2">
        <span className="text-xl font-medium">Menu</span>{" "}
        <ChevronDown className="size-5 mt-1" />
      </button>
      <div className="w-3/4 bg-white border rounded-xl p-2 flex gap-4 ">
        <div className="flex-1 flex flex-col gap-2 ">
          {lists.map((item, index) => {
            /// some code
            return (
              <div
                key={index + item.title}
                className="flex gap-2 items-center hover:bg-gray-200 rounded-lg p-2 group cursor-pointer transition-all duration-300"
              >
                {/* {some icon code here} */}
                <div className="size-16 rounded-md flex items-center justify-center z-0">
                  <div className="h-full w-3/4 flex items-center justify-center border rounded-xl relative -rotate-6 group-hover:bg-red-500  transition-all duration-300 group-hover:rotate-6 ">
                    <item.icon className="size-8" />
                  </div>
                </div>
                <div>
                  <h1 className="font-semibold text-xl">{item.title}</h1>
                  <p className="text-neutral-500">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="w-80 h-full bg-white border rounded-md"></div>
      </div>
    </div>
  );
};

export default DropdownNav;
("");
