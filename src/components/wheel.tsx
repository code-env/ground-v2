import { X } from "lucide-react";
import {
  animate,
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
} from "motion/react";
import { useRef, useState } from "react";

interface Element {
  id: number;
  img: string;
}

const items: Element[] = [
  {
    id: 1,
    img: "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 2,
    img: "https://media.istockphoto.com/id/1168977609/photo/paparazzi-photographer-in-petropolis-rio-de-janeiro.jpg?s=612x612&w=0&k=20&c=R0XWB0-J0s-kbWfW6RgYGvNGMxnMSProeb8_KH-D2AA=",
  },
  {
    id: 3,
    img: "https://cdn.create.vista.com/api/media/small/137693132/stock-photo-woman-photographer-holding-a-camera-in-the-wild-for-take-a-photo",
  },
  {
    id: 4,
    img: "https://media.istockphoto.com/id/1049506008/photo/senior-african-american-woman-hiking-with-camera.jpg?b=1&s=612x612&w=0&k=20&c=xqaVJQFpF2KmL04zaVK_FF0CFAlaZdF39nRKOTBnBC4=",
  },
  {
    id: 5,
    img: "https://media.istockphoto.com/id/1336160936/photo/freelance-female-photographer-holding-a-camera.jpg?s=612x612&w=0&k=20&c=zlUnQT31KdlJCfDycdJauJVeiKO11IhtjESAjZhaTvQ=",
  },
  {
    id: 6,
    img: "https://st3.depositphotos.com/3433891/33505/i/450/depositphotos_335052976-stock-photo-young-african-american-photographer-woman.jpg",
  },
  {
    id: 7,
    img: "https://st4.depositphotos.com/13194036/22991/i/450/depositphotos_229919434-stock-photo-beautiful-smiling-girl-using-photo.jpg",
  },
  {
    id: 8,
    img: "https://st4.depositphotos.com/13194036/i/600/depositphotos_229919408-stock-photo-beautiful-young-woman-using-photo.jpg",
  },
  {
    id: 9,
    img: "https://img.freepik.com/premium-photo/young-photographer-standing-front-reflective-umbrella_53876-82660.jpg",
  },
  {
    id: 10,
    img: "https://img.freepik.com/premium-photo/side-view-woman-working-as-photographer_23-2150506106.jpg",
  },
  {
    id: 11,
    img: "https://media.istockphoto.com/id/1069722364/photo/young-african-photographer-at-work-at-studio.jpg?s=612x612&w=0&k=20&c=sgY8pDSSNSj4YIZYBVb-N2vW4TlV9ZNjXTdMFhJ1new=",
  },
  {
    id: 12,
    img: "https://media.istockphoto.com/id/121349708/photo/young-asian-girl-taking-a-photo.jpg?s=612x612&w=0&k=20&c=GRstiRHSDMhnSYlGOmlSe2_tv0Hrk_ogJmMydfE-nbI=",
  },
];

const Wheel = () => {
  const [activeElement, setActiveElement] = useState<Element | null>(null);

  const motionX = useMotionValue(0);
  const rotate = useMotionValue(0);
  const accumulatedRotation = useRef(0);

  const radius = 190;
  const snapAngle = 360 / items.length;

  useMotionValueEvent(motionX, "change", (latest) => {
    rotate.set(accumulatedRotation.current + latest / 5);
  });

  const handleDrag = (_: any, info: any) => {
    motionX.set(info.offset.x);
  };

  const handleDragEnd = () => {
    const currentRotation = rotate.get();
    const normalizedRotation = ((currentRotation % 360) + 360) % 360;
    const nearestMultiple =
      Math.round(normalizedRotation / snapAngle) * snapAngle;
    const finalRotation =
      Math.floor(currentRotation / 360) * 360 + nearestMultiple;

    accumulatedRotation.current = finalRotation;

    animate(rotate, finalRotation, {
      type: "spring",
      stiffness: 300,
      damping: 30,
    });
  };

  return (
    <div className="relative size-full flex items-center justify-center">
      <div className="relative size-full flex items-center justify-center overflow-hidden rounded-xl bg-white p-4">
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          style={{ rotate }}
          className="relative size-full cursor-grab rounded-lg bg-transparent flex items-center justify-center active:cursor-grabbing"
        >
          {items.map((ele, index) => {
            const angle = (index / items.length) * 2 * Math.PI;
            const x = radius * Math.cos(angle);
            const y = radius * Math.sin(angle);
            const rotation = (index * 360) / items.length;

            return (
              <motion.div
                key={ele.id}
                className="absolute size-20 p-1 cursor-pointer shadow-lg shadow-black/10 rounded-lg"
                style={{ x, y, rotate: rotation }}
                onClick={() => setActiveElement(ele)}
              >
                <motion.img
                  src={ele.img}
                  alt="Image"
                  layoutId={`spinner-${ele.id}`}
                  className="size-full object-cover rounded-lg border-2 border-white"
                />
              </motion.div>
            );
          })}
        </motion.div>
        <h1 className="text-black text-4xl font-bold absolute bottom-0 left-0 right-0 top-0 m-auto size-fit z-10">
          Spin
        </h1>
      </div>
      <ActiveItem
        activeElement={activeElement}
        setActiveElement={setActiveElement}
      />
    </div>
  );
};

interface ActiveItemProps {
  activeElement: Element | null;
  setActiveElement: (element: Element | null) => void;
}

const ActiveItem = ({ activeElement, setActiveElement }: ActiveItemProps) => {
  return (
    <AnimatePresence>
      {activeElement && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 flex items-center justify-center z-20 bg-white"
        >
          <motion.div
            layoutId={`spinner-${activeElement.id}`}
            className="w-[400px] h-[400px] rounded-3xl overflow-hidden relative bg-white p-2 shadow-lg shadow-black/10"
          >
            <button
              className="absolute right-5 top-5 size-10 text-white bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center"
              onClick={() => setActiveElement(null)}
            >
              <X className="w-6 h-6" />
            </button>
            <motion.img
              src={activeElement.img}
              alt="Image"
              className="w-full h-full object-cover rounded-2xl border-2 border-white"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Wheel;
