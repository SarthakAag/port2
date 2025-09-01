

"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import CodeBackground from "@/components/CodeBackground";
import { useEffect, useState } from "react";

const staticCode = `const aboutMe = {
  name: "Sarthak Agarwal",
  role: "Full-Stack Developer",
  location: "India",
  interests: ["Web Dev", "AI/ML", "UI/UX", "Open Source"],
  languages: {
    frontend: ["HTML", "CSS", "JavaScript", "React", "Next.js"],
    backend: ["Node.js", "Express", "MongoDB", "SQL"],
  },
  funFact: "I debug faster with coffee ☕",
};

export default aboutMe;`;

const typingLines = [
  `// Currently working on: Portfolio 🚀`,
  `// Learning: Three.js & Framer Motion ✨`,
  `// Motto: "Code. Debug. Repeat." 🔥`
];

export default function CodeSection() {
  const [displayedLine, setDisplayedLine] = useState("");
  const [lineIndex, setLineIndex] = useState(0);

  // 3D tilt on hover
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(
    useTransform(mouseY, [0, 1000], [10, -10]),
    { stiffness: 100, damping: 20 }
  );
  const rotateY = useSpring(
    useTransform(mouseX, [0, 1000], [-10, 10]),
    { stiffness: 100, damping: 20 }
  );

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedLine(typingLines[lineIndex].slice(0, i));
      i++;
      if (i > typingLines[lineIndex].length) {
        clearInterval(interval);
        setTimeout(() => {
          setDisplayedLine("");
          setLineIndex((prev) => (prev + 1) % typingLines.length);
        }, 2000);
      }
    }, 60);
    return () => clearInterval(interval);
  }, [lineIndex]);

  return (
    <section
      id="code"
      className="relative min-h-screen flex items-center justify-center px-6 py-20 font-mono text-blue-400"
    >
      {/* Background */}
      <CodeBackground />

      {/* Foreground Code Editor */}
      <motion.div
        style={{ rotateX, rotateY }}
        onMouseMove={(e) => {
          mouseX.set(e.clientX);
          mouseY.set(e.clientY);
        }}
        className="relative z-10 w-full max-w-4xl bg-black/90 rounded-2xl shadow-2xl border border-blue-400/40 overflow-hidden cursor-pointer"
        whileHover={{ scale: 1.03 }}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-4 py-2 bg-zinc-900 border-b border-blue-400/30">
          <span className="text-sm text-gray-300">aboutMe.js</span>
          <div className="flex gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
            <span className="w-3 h-3 rounded-full bg-green-500"></span>
          </div>
        </div>

        {/* Static Code with Gradient */}
        <motion.pre
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="p-6 text-sm sm:text-base leading-relaxed overflow-x-auto whitespace-pre-wrap text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500"
        >
          {staticCode}
        </motion.pre>

        {/* Typing Effect */}
        <motion.pre
          className="px-6 pb-6 text-sm sm:text-base leading-relaxed whitespace-pre-wrap text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500"
        >
          {displayedLine}
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="inline-block w-2 h-5 bg-blue-400 ml-1"
          />
        </motion.pre>
      </motion.div>
    </section>
  );
}