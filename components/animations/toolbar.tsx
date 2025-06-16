// "use client";

// import { useRef, useState } from "react";
// import { DocumentIcon, HomeIcon } from "@heroicons/react/24/outline";
// import WorkIcon from "@/app/_components/Icons/WorkIcon";
// import PlaygroundIcon from "@/app/_components/Icons/PlaygroundIcon";
// import clsx from "clsx";

// interface NavLink {
//   name: string;
//   slug: string;
//   icon: React.ReactNode;
// }

// const navLinks: NavLink[] = [
//   { name: "Home", slug: "/", icon: <HomeIcon /> },
//   { name: "Work", slug: "/work", icon: <WorkIcon /> },
//   { name: "Colophon", slug: "/colophon", icon: <DocumentIcon /> },
//   { name: "Playground", slug: "/playground", icon: <PlaygroundIcon /> },
// ];

// interface TooltipSetting {
//   left: number;
//   x: number;
//   width: number;
//   offsetLeft: number;
//   id: string | null;
// }

// export default function SpatialTooltip() {
//   const [tooltipSetting, setTooltipSetting] = useState<TooltipSetting>({
//     left: 0,
//     x: 0,
//     width: 0,
//     offsetLeft: 0,
//     id: null,
//   });
//   const toolTipRef = useRef<HTMLDivElement>(null);

//   const handleMouseEnter = (index: number) => {
//     const listItems = toolTipRef.current?.querySelectorAll("li");
//     if (listItems) {
//       const itemWidth = listItems[index].clientWidth;
//       const offsetLeft = -listItems[index].offsetLeft;
//       const x = (itemWidth - 36) / 2; //36 is the size of the button

//       setTooltipSetting({
//         left: (index / navLinks.length) * 100,
//         x: -x,
//         width: itemWidth,
//         offsetLeft,
//         id: navLinks[index].slug,
//       });
//     }
//   };

//   const handleOnMouseLeave = () => {
//     setTooltipSetting({
//       ...tooltipSetting,
//       id: null,
//     });
//   };

//   return (
//     <article className="relative grid min-h-96 place-items-center rounded-xl border border-white/10 bg-white/5 p-3 md:aspect-8/3 md:min-h-0">
//       <nav className="grid place-items-center text-black">
//         <div className="relative isolate">
//           <div
//             ref={toolTipRef}
//             className="absolute bottom-[calc(100%+10px)] overflow-hidden rounded-2xl bg-black/50 transition-all duration-300"
//             style={{
//               left: `${tooltipSetting.left}%`,
//               transform: `translateX(${tooltipSetting.x}px)`,
//               width: `${tooltipSetting.width}px`,
//               opacity: tooltipSetting.id ? 1 : 0,
//             }}
//           >
//             <ul
//               className="flex transition-all duration-300"
//               style={{
//                 transform: `translateX(${tooltipSetting.offsetLeft}px)`,
//               }}
//             >
//               {navLinks.map(({ name, slug }) => (
//                 <li key={slug} className="relative isolate grid px-3 py-2">
//                   <span
//                     className={clsx(
//                       "text-white transition-all duration-300",
//                       tooltipSetting.id === slug ? "delay-75" : "blur-xs"
//                     )}
//                   >
//                     {name}
//                   </span>
//                 </li>
//               ))}
//             </ul>
//           </div>
//           <ul className="flex">
//             {navLinks.map(({ icon, name, slug }, index) => (
//               <li key={slug} className="grid">
//                 <button
//                   className="group relative inline-block size-9 rounded-xl p-2 text-white transition duration-300 hover:bg-background-medium-accent hover:text-white"
//                   onMouseEnter={() => handleMouseEnter(index)}
//                   onMouseLeave={handleOnMouseLeave}
//                 >
//                   {icon}
//                   <span className="sr-only">{name}</span>
//                 </button>
//               </li>
//             ))}
//           </ul>

//           <div className="absolute -inset-2 -z-10 rounded-[20px] bg-black/50"></div>
//         </div>
//       </nav>
//     </article>
//   );
// }
