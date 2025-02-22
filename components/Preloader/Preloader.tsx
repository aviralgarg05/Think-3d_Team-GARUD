"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { opacity, slideUp } from "./anim";

const words = [
  "Loading Knowledge...",
  "Sharpening Pencils...",
  "Opening Books...",
  "Igniting Curiosity...",
  "Powering Learning...",
];

export default function Preloader() {
  const [index, setIndex] = useState(0);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });
  const [loadingPercentage, setLoadingPercentage] = useState(1);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== "undefined") {
      setDimension({ width: window.innerWidth, height: window.innerHeight });
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(
      () => {
        setIndex((prev) => (prev === words.length - 1 ? prev : prev + 1));
      },
      index === 0 ? 300 : 500
    );

    return () => clearTimeout(timer);
  }, [index]);

  useEffect(() => {
    const timer = setInterval(() => {
      setLoadingPercentage((prev) => (prev < 100 ? prev + 1 : prev));
    }, 21);

    return () => clearInterval(timer);
  }, []);

  if (!isMounted) return null;

  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${
    dimension.height
  } Q${dimension.width / 2} ${dimension.height + 300} 0 ${
    dimension.height
  }  L0 0`;
  const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${
    dimension.height
  } Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height}  L0 0`;

  const curve = {
    initial: {
      d: initialPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
    },
    exit: {
      d: targetPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.3 },
    },
  };

  return (
    <motion.div
      variants={slideUp}
      initial="initial"
      exit="exit"
      className="h-screen w-screen flex items-center z-20 justify-center fixed bg-[#252525]"
    >
      {dimension.width > 0 && (
        <>
          <AnimatePresence mode="wait">
            <motion.p
              key={index}
              variants={opacity}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center text-black text-2xl absolute z-10"
            >
              <span className="block w-2.5 h-2.5 bg-black rounded-full mr-2.5"></span>
              {words[index]}
            </motion.p>
          </AnimatePresence>
          <div className="absolute bottom-20 flex flex-col items-center w-full z-20">
            <div
              className="w-[100vh] border-t border-gray-300 mb-3"
              style={{ width: `${loadingPercentage}%` }}
            ></div>
            <span className="text-white text-xl">
              Loading {loadingPercentage}%
            </span>
          </div>
          <svg className="absolute top-0 w-full h-[calc(100%+300px)] z-0">
            <motion.path
              variants={curve}
              initial="initial"
              exit="exit"
              className="fill-[#252525]"
            ></motion.path>
          </svg>
        </>
      )}
    </motion.div>
  );
}
