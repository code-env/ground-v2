'use client'

import { ArrowRight, File, Image, Link, Plus, Video } from 'lucide-react'
import { AnimatePresence, MotionConfig, type Variants, motion } from "motion/react"
import { useState } from "react"

// Utility function to merge class names
const cn = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(' ')
}

const TRANSITION = {
  duration: 0.3,
}

const items = [
  {
    title: "File",
    icon: File,
    color: { base: '#00CED1', light: '#7FFFD4', dark: '#008B8B' },
  },
  {
    title: "Image",
    icon: Image,
    color: { base: '#FFA500', light: '#FFD700', dark: '#CD853F' },
  },
  {
    title: "Video",
    icon: Video,
    color: { base: '#FF0000', light: '#FF4444', dark: '#8B0000' },
  },
  {
    title: "Link",
    icon: Link,
    color: { base: '#808080', light: '#A0A0A0', dark: '#404040' },
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.1
    }
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1
    }
  }
}

const itemVariants: Variants = {
  hidden: {
    x: 30,
    scale: 0.3,
    opacity: 0,
  },
  visible: {
    x: 0,
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 10,
    },
  },
  exit: {
    opacity: 0,
    x: 30,
    scale: 0.3,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
    },
  },
}

export const PromptBox = () => {
  const [select, setSelect] = useState(false)

  return (
    <MotionConfig transition={TRANSITION}>
      <div className="size-full bg-white flex items-center justify-center rounded-xl">
        <motion.div className="h-20 border rounded-full w-1/2 p-2 flex items-center overflow-x-clip gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative size-16 rounded-full focus:outline-none focus:ring-4 focus:ring-white/20 flex items-center justify-center"
            onClick={() => setSelect((prev) => !prev)}
            style={{
              background: `radial-gradient(circle at 30% 30%, #7FFFD4 0%, #00CED1 60%, #008B8B 100%)`,
              boxShadow: `
                0 0 30px #00CED140,
                inset 0 0 30px #00CED140,
                0 5px 15px rgba(0,0,0,0.1)
              `
            }}
          >
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 70%)'
              }}
            />
            <Plus
              className={cn(
                "relative z-10 transition-all duration-300 stroke-[3] text-white size-8",
                select && "rotate-45"
              )}
            />
          </motion.button>

          <AnimatePresence mode="wait">
            {select ? (
              <motion.div
                className="flex gap-2"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {items.map((item, index) => (
                  <motion.button
                    key={index}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative size-16 rounded-full focus:outline-none focus:ring-4 focus:ring-white/20 flex items-center justify-center"
                    style={{
                      background: `radial-gradient(circle at 30% 30%, ${item.color.light} 0%, ${item.color.base} 60%, ${item.color.dark} 100%)`,
                      boxShadow: `
                        0 0 30px ${item.color.base}40,
                        inset 0 0 30px ${item.color.base}40,
                        0 5px 15px rgba(0,0,0,0.3)
                      `
                    }}
                  >
                    <div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 70%)'
                      }}
                    />
                    <item.icon className="relative z-10 text-white size-8" />
                  </motion.button>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                className="flex-1 h-full flex gap-2"
              >
                <input
                  className="flex-1 w-full pl-2 outline-none bg-transparent border-none placeholder:text-xl placeholder:font-semibold placeholder:text-neutral-500 text-neutral-500 text-xl font-semibold"
                  type="text"
                  placeholder="What's on your mind?"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative size-16 rounded-full focus:outline-none focus:ring-4 focus:ring-white/20 flex items-center justify-center border-4 border-red-500"
                  style={{
                    background: `radial-gradient(circle at 30% 30%, #FF4444 0%, #FF0000 60%, #8B0000 100%)`,
                    // boxShadow: `
                    //   0 0 30px #FF000040,
                    //   inset 0 0 30px #FF000040,
                    //   0 5px 15px rgba(0,0,0,0.05)
                    // `
                  }}
                >
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 0%)'
                    }}
                  />
                  <ArrowRight className="relative z-10 transition-all duration-300 stroke-[3] text-white size-8" />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </MotionConfig>
  )
}
