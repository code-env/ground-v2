// import React, { useState } from "react";
// import {
//   animate,
//   motion,
//   useMotionValue,
//   useMotionValueEvent,
// } from "framer-motion";
// import NumberFlow from "@number-flow/react";

// const RECT_NUM = 100;

// export default function Work19() {
//   const [topIndex, setTopIndex] = useState(0);

//   const motionX = useMotionValue(0);
//   const rotate = useMotionValue(0);
//   const accumulatedRotation = React.useRef(0);

//   useMotionValueEvent(motionX, "change", (latest) => {
//     rotate.set(accumulatedRotation.current + latest / 5);
//   });

//   return (
//     <div>
//       <div className="mb-8 flex flex-col items-center justify-center"></div>

//       <div className="relative h-36 w-96 overflow-hidden rounded-3xl bg-primary p-4 shadow-2xl">
//         <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-30 h-[20%] bg-gradient-to-b from-transparent to-black"></div>

//         <div className="mb-6 flex items-center justify-center text-white">
//           <NumberFlow value={topIndex} className="text-xl" />
//         </div>

//         <div className="pointer-events-none absolute left-1/2 z-20 h-full w-1 -translate-x-1/2 -translate-y-3 rounded-full bg-background"></div>

//         <motion.div
//           drag="x"
//           dragConstraints={{ left: 0, right: 0 }}
//           dragElastic={0}
//           onDrag={(event, info) => {
//             motionX.set(info.offset.x);

//             const currentRotation = rotate.get();

//             const snapAngle = 360 / RECT_NUM;
//             let normalizedRotation = currentRotation;
//             normalizedRotation = ((normalizedRotation % 360) + 360) % 360;
//             const nearestMultiple =
//               Math.round(normalizedRotation / snapAngle) * snapAngle;

//             const topIndex =
//               (RECT_NUM - nearestMultiple / snapAngle) % RECT_NUM;
//             setTopIndex(Math.floor(topIndex));
//           }}
//           onDragEnd={() => {
//             const currentRotation = rotate.get();

//             const snapAngle = 360 / RECT_NUM;
//             let normalizedRotation = currentRotation;
//             normalizedRotation = ((normalizedRotation % 360) + 360) % 360;
//             const nearestMultiple =
//               Math.round(normalizedRotation / snapAngle) * snapAngle;

//             const fullRotations = Math.floor(currentRotation / 360) * 360;
//             const finalRotation = fullRotations + nearestMultiple;

//             accumulatedRotation.current = finalRotation;

//             animate(rotate, finalRotation, {
//               type: "spring",
//               stiffness: 300,
//               damping: 30,
//             });
//           }}
//           style={{ rotate }}
//           className="relative aspect-square w-full cursor-grab rounded-full bg-transparent active:cursor-grabbing"
//         >
//           {Array.from({ length: RECT_NUM }).map((_, i) => (
//             <div
//               key={i}
//               data-index={i}
//               className="absolute inset-0 flex justify-center overflow-hidden rounded-full"
//               style={{
//                 transform: `rotate(${i * (360 / RECT_NUM)}deg)`,
//               }}
//             >
//               <div className="absolute h-8 w-0.5 bg-gray-200"></div>
//             </div>
//           ))}
//         </motion.div>
//         <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-[calc(50%+1rem)] bg-gradient-to-r from-blue-500 to-yellow-500 mix-blend-multiply"></div>
//       </div>
//     </div>
//   );
// }
