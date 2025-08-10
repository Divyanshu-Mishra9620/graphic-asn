"use client";

import React, { useMemo } from "react";
import { motion, Transition } from "framer-motion";
import dynamic from "next/dynamic";

type ShapeName = keyof typeof shapes;

const shapes = {
  Shape1: dynamic(() => import("@/public/shapes/shape1.svg")),
  Shape2: dynamic(() => import("@/public/shapes/shape2.svg")),
  Shape3: dynamic(() => import("@/public/shapes/shape3.svg")),
  Shape4: dynamic(() => import("@/public/shapes/shape4.svg")),
  Shape5: dynamic(() => import("@/public/shapes/shape5.svg")),
  Shape6: dynamic(() => import("@/public/shapes/shape6.svg")),
  Shape7: dynamic(() => import("@/public/shapes/shape7.svg")),
  Shape8: dynamic(() => import("@/public/shapes/shape8.svg")),
  Shape9: dynamic(() => import("@/public/shapes/shape9.svg")),
};

interface ShapeConfig {
  name: ShapeName;
  initial: {
    y: string;
    x: string;
    size: string;
  };
  isHiddenOnMobile?: boolean;
  gradient: string;
}

const FloatingShapes = () => {
  const shapeConfigs = useMemo<ShapeConfig[]>(() => {
    return [
      {
        name: "Shape1",
        initial: { y: "10%", x: "15%", size: "55px" },
        gradient: "from-purple-400 to-blue-400",
      },
      {
        name: "Shape2",
        initial: { y: "15%", x: "85%", size: "45px" },
        isHiddenOnMobile: true,
        gradient: "from-amber-300 to-pink-400",
      },
      {
        name: "Shape3",
        initial: { y: "70%", x: "10%", size: "65px" },
        gradient: "from-emerald-300 to-teal-500",
      },
      {
        name: "Shape4",
        initial: { y: "80%", x: "90%", size: "40px" },
        isHiddenOnMobile: true,
        gradient: "from-rose-400 to-fuchsia-500",
      },
      {
        name: "Shape5",
        initial: { y: "5%", x: "50%", size: "50px" },
        gradient: "from-indigo-400 to-purple-500",
      },
      {
        name: "Shape6",
        initial: { y: "55%", x: "5%", size: "60px" },
        isHiddenOnMobile: true,
        gradient: "from-sky-300 to-blue-500",
      },
      {
        name: "Shape7",
        initial: { y: "90%", x: "65%", size: "35px" },
        gradient: "from-violet-400 to-purple-500",
      },
      {
        name: "Shape8",
        initial: { y: "30%", x: "25%", size: "70px" },
        isHiddenOnMobile: true,
        gradient: "from-pink-400 to-rose-500",
      },
      {
        name: "Shape9",
        initial: { y: "65%", x: "45%", size: "50px" },
        gradient: "from-cyan-300 to-blue-400",
      },
      {
        name: "Shape1",
        initial: { y: "40%", x: "95%", size: "45px" },
        isHiddenOnMobile: true,
        gradient: "from-amber-200 to-orange-400",
      },
    ];
  }, []);

  return (
    <div
      className="absolute inset-0 z-0 h-full w-full overflow-hidden"
      aria-hidden="true"
    >
      {shapeConfigs.map(
        ({ name, initial, isHiddenOnMobile, gradient }, index) => {
          const Component = shapes[name];
          if (!Component) return null;

          const transition: Transition = {
            duration: 15 + Math.random() * 10,
            delay: Math.random() * 5,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          };

          return (
            <motion.div
              key={`${name}-${index}`}
              className={`absolute ${
                isHiddenOnMobile ? "hidden lg:block" : "block"
              }`}
              style={{
                top: initial.y,
                left: initial.x,
                width: initial.size,
                height: initial.size,
              }}
              initial={{ opacity: 0 }}
              animate={{
                y: [0, -20 + Math.random() * 40],
                x: [0, -10 + Math.random() * 20],
                rotate: [0, -30 + Math.random() * 60],
                opacity: [0, 0.4 + Math.random() * 0.3, 0],
              }}
              transition={transition}
            >
              <div
                className={`h-full w-full bg-gradient-to-br ${gradient} rounded-lg opacity-30`}
              >
                <Component className="h-full w-full text-transparent" />
              </div>
            </motion.div>
          );
        }
      )}
    </div>
  );
};

export default FloatingShapes;
