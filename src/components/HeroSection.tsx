"use client";

import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  easeInOut,
} from "framer-motion";

import { useEffect } from "react";

import {
  ChevronDown,
  Sparkles,
  ArrowRight,
  Download,
} from "lucide-react";

import CodeBackground from "@/components/CodeBackground";
import SocialDropdown from "@/components/SocialSidebar";

const codeBlock = [
  "const developer = 'Sarthak';",
  "const skills = ['React', 'Next.js'];",
  "",
  "function createAmazingUI() {",
  "  return innovation + creativity;",
  "}",
  "",
  "console.log('Building Future 🚀');",
];

const floatingTags = [
  "Creative",
  "Innovative",
  "Problem Solver",
  "UI/UX Focused",
];

export default function HeroSection() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () =>
      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );
  }, [mouseX, mouseY]);

  // Fixed hydration-safe transforms
  const rotateX = useSpring(
    useTransform(mouseY, [0, 1000], [10, -10]),
    {
      stiffness: 120,
      damping: 20,
    }
  );

  const rotateY = useSpring(
    useTransform(mouseX, [0, 1800], [-10, 10]),
    {
      stiffness: 120,
      damping: 20,
    }
  );

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-6"
    >
      {/* Background */}
      <CodeBackground />

      {/* Animated Glow Effects */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />

      <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />

      {/* Social Sidebar */}
      <SocialDropdown />

      {/* Background Code Window */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.12 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div
          className="bg-black/40 backdrop-blur-xl rounded-3xl p-8 border border-white/10 
          shadow-2xl font-mono text-green-400 text-sm leading-8 max-w-2xl w-full"
        >
          {codeBlock.map((line, idx) => (
            <motion.div
              key={idx}
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              transition={{
                delay: idx * 0.15,
                duration: 1.5,
              }}
            >
              {line}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Main Content */}
      <div
        className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center"
      >
        {/* Top Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-6 inline-flex items-center gap-2 px-5 py-2 rounded-full 
          bg-white/10 border border-cyan-400/20 backdrop-blur-xl"
        >
          <Sparkles
            size={18}
            className="text-cyan-400"
          />

          <span className="text-cyan-300 text-sm tracking-wide">
            FULL STACK DEVELOPER & DATA ANALYST
          </span>
        </motion.div>

        {/* Typing Effect Name */}
        <motion.div
          style={{
            rotateX,
            rotateY,
          }}
        >
          <motion.h1
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{
              duration: 2.5,
              ease: easeInOut,
            }}
            className="overflow-hidden whitespace-nowrap border-r-4 border-cyan-400 pr-3
            text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-tight
            bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500
            bg-clip-text text-transparent"
          >
            Sarthak Agarwal
          </motion.h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 0.8,
            duration: 1,
          }}
          className="mt-8 text-gray-300 text-lg sm:text-xl md:text-2xl max-w-3xl leading-relaxed"
        >
          Crafting immersive digital experiences with{" "}
          <span className="text-cyan-400 font-semibold">
            modern web technologies
          </span>{" "}
          and transforming complex data into{" "}
          <span className="text-blue-400 font-semibold">
            meaningful insights
          </span>.
        </motion.p>

        {/* Floating Tags */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {floatingTags.map((item, index) => (
            <motion.div
              key={item}
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 3 + index,
                repeat: Infinity,
                ease: easeInOut,
              }}
              className="px-5 py-2 rounded-full bg-white/10 border border-white/10 
              text-gray-200 backdrop-blur-xl"
            >
              {item}
            </motion.div>
          ))}
        </div>

        {/* Buttons */}
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 1,
            duration: 1,
          }}
          className="mt-10 flex flex-col sm:flex-row gap-5"
        >
          {/* View Work */}
          <motion.a
            href="#experience"
            whileHover={{
              scale: 1.08,
              boxShadow:
                "0px 0px 35px rgba(0,255,255,0.6)",
            }}
            whileTap={{
              scale: 0.95,
            }}
            transition={{
              type: "spring",
              stiffness: 200,
            }}
            className="group px-8 py-4 rounded-2xl 
            bg-gradient-to-r from-cyan-500 to-blue-600 
            text-white font-semibold shadow-xl flex items-center gap-2"
          >
            View My Work

            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </motion.a>

          {/* Resume */}
          <motion.a
            href="/resume.pdf"
            download
            whileHover={{
              scale: 1.08,
              backgroundColor:
                "rgba(255,255,255,0.08)",
            }}
            whileTap={{
              scale: 0.95,
            }}
            className="px-8 py-4 rounded-2xl border border-white/20 
            bg-white/5 backdrop-blur-xl text-gray-200 font-semibold 
            flex items-center gap-2"
          >
            <Download size={18} />

            Download Resume
          </motion.a>
        </motion.div>
      </div>

      {/* Scroll Down */}
      <motion.a
        href="#about"
        animate={{
          y: [0, 12, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
          ease: easeInOut,
        }}
        className="absolute bottom-8 text-cyan-400 cursor-pointer"
      >
        <ChevronDown size={36} />
      </motion.a>
    </section>
  );
}