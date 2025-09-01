

"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useEffect } from "react";
import { ChevronDown } from "lucide-react";
import CodeBackground from "@/components/CodeBackground";
import SocialDropdown from "@/components/SocialSidebar";
import { useRouter } from "next/navigation";

const codeBlock = [
  "function greet(name) {",
  "  return `Hello, ${name}!`;",
  "}",
  "",
  "const numbers = [1,2,3,4,5];",
  "const doubled = numbers.map(n => n*2);",
  "",
  "if(doubled.length > 0) {",
  "  console.log('Data processed successfully');",
  "}",
];

export default function HeroSection() {
  const router = useRouter();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(
    useTransform(
      mouseY,
      [0, typeof window !== "undefined" ? window.innerHeight : 1000],
      [10, -10]
    ),
    { stiffness: 100, damping: 20 }
  );

  const rotateY = useSpring(
    useTransform(
      mouseX,
      [0, typeof window !== "undefined" ? window.innerWidth : 1000],
      [-10, 10]
    ),
    { stiffness: 100, damping: 20 }
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-12 overflow-hidden">
      
      {/* Background */}
      <CodeBackground />

      {/* Floating Social Dropdown */}
      <SocialDropdown />

      {/* Code Block Background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div className="bg-black/30 rounded-xl p-4 sm:p-6 md:p-8 shadow-lg border border-gray-700 font-mono text-green-400 text-sm sm:text-base leading-relaxed overflow-hidden">
          {codeBlock.map((line, idx) => (
            <motion.div
              key={idx}
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              transition={{
                delay: idx * 0.1,
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              {line}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-6">
        <motion.h1
          style={{ rotateX, rotateY }}
          initial={{ width: 0 }}
          animate={{ width: "fit-content" }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="overflow-hidden whitespace-nowrap text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold 
                     bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 
                     bg-clip-text text-transparent border-r-2 sm:border-r-4 border-cyan-400 animate-pulse 
                     drop-shadow-[0_0_20px_rgba(0,180,255,0.9)]"
        >
          Sarthak Agarwal
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="mt-4 text-gray-300 text-lg sm:text-xl flex flex-wrap gap-2 justify-center"
        >
          <motion.span animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 3 }} className="text-cyan-400">Creative</motion.span>
          ×
          <motion.span animate={{ y: [0, -12, 0] }} transition={{ repeat: Infinity, duration: 3.5 }} className="text-blue-400">Technical</motion.span>
          ×
          <motion.span animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 4 }} className="text-indigo-400">Innovative</motion.span>
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 1 }}
          className="mt-2 text-gray-400 text-base sm:text-lg md:text-xl leading-relaxed"
        >
          Full-Stack Developer crafting immersive digital experiences with{" "}
          <span className="text-cyan-400">cutting-edge technology</span> and{" "}
          <span className="text-blue-400">mathematical precision</span>.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, -6, 0] }}
          transition={{ delay: 3.5, duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="mt-2 text-gray-400 text-base sm:text-lg md:text-xl"
        >
          From numbers to knowledge—<span className="text-indigo-400 font-semibold">I uncover insights hidden in data</span>.
        </motion.p>

        {/* Buttons */}
        <motion.div className="mt-6 flex flex-col sm:flex-row gap-4">
          <motion.button
            onClick={() => router.push("/projects")}
            whileHover={{ scale: 1.1, boxShadow: "0px 0px 20px rgba(0, 200, 255, 0.8)" }}
            whileTap={{ scale: 0.95 }}
            className="px-5 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold shadow-lg text-sm sm:text-base"
          >
            View My Work
          </motion.button>

          <motion.a
            href="/resume.pdf"
            download
            whileHover={{ scale: 1.1, backgroundColor: "rgba(30, 41, 59, 0.8)", boxShadow: "0px 0px 20px rgba(100, 100, 100, 0.6)" }}
            whileTap={{ scale: 0.95 }}
            className="px-5 py-3 rounded-full border border-gray-500 text-gray-300 font-semibold text-sm sm:text-base transition"
          >
            Download Resume
          </motion.a>
        </motion.div>
      </div>

      {/* Scroll Down Arrow */}
      <motion.a
        href="#about"
        className="absolute bottom-6 sm:bottom-8 cursor-pointer text-cyan-400"
        animate={{ y: [0, 12, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
      >
        <ChevronDown size={32} />
      </motion.a>
    </section>
  );
}
