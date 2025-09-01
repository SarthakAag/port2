

"use client";

import { motion } from "framer-motion";
import CodeBackground from "@/components/CodeBackground";

export default function ExperienceSection() {
  const experiences = [
    {
      role: "Head of Technical",
      company: "Matrix Club",
      college: "SRM Institute of Science and Technology",
      period: "2025 - Present",
      desc: "Directed the technical wing of the Mathematics Club by managing digital platforms, organizing tech-driven events, and mentoring members. Leveraged React, Python, Java, and SQL to enhance efficiency and innovation.",
    },
    {
      role: "Designer",
      company: "ACE Club",
      college: "SRM Institute of Science and Technology",
      period: "2025",
      desc: "Collaborated with the ACE Club’s Design Team to create engaging graphics, event posters, and digital content. Focused on delivering creative, impactful designs that enhanced the club’s branding and outreach.",
    },
    {
      role: "Event Coordinator",
      company: "DI Club",
      college: "SRM Institute of Science and Technology",
      period: "2025",
      desc: "Coordinated flagship technical events Humar Compiler and Rune of Unity in the DI Club, managing event execution, participant engagement, and technical workflows to ensure smooth and impactful experiences.",
    },
    {
      role: "Designer",
      company: "Campus Newsletter",
      college: "SRM Institute of Science and Technology",
      period: "2024 , 2025",
      desc: "Worked as a Designer for the Campus Newsletter, creating layouts, graphics, and visual content that enhanced readability and engagement. Contributed to building a professional and appealing publication style.",
    },
  ];

  return (
    <section
      id="experience"
      className="relative min-h-screen flex flex-col items-center justify-center py-16 px-4 sm:px-6 lg:px-12 text-white overflow-hidden"
    >
      {/* Background Layer */}
      <motion.div
        className="absolute inset-0 -z-10 opacity-20"
        animate={{ y: [0, -50, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      >
        <CodeBackground />
      </motion.div>

      {/* Section Title */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500 mb-16 text-center"
      >
        My Experience
      </motion.h2>

      {/* Experience Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full max-w-6xl">
        {experiences.map((exp, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40, rotateY: -10 }}
            whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
            transition={{ duration: 0.7, delay: i * 0.3 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05, rotateY: 5 }}
            className="relative bg-black/30 backdrop-blur-lg border border-white/10 rounded-3xl p-6 shadow-lg shadow-cyan-500/20 cursor-pointer transition-transform duration-300"
          >
            {/* Gradient Glow */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 rounded-3xl blur opacity-30"></div>

            {/* Content */}
            <div className="relative z-10">
              <h3 className="text-xl sm:text-2xl font-semibold">{exp.role}</h3>
              <p className="text-sm sm:text-base text-cyan-400 mt-1">
                {exp.company} • {exp.period}
              </p>
              <p className="text-xs sm:text-sm text-gray-400 italic mt-1">{exp.college}</p>
              <p className="mt-4 text-gray-300 text-sm sm:text-base">{exp.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Decorative Floating Connectors */}
      <motion.div
        className="absolute w-1 h-40 bg-gradient-to-b from-cyan-400 via-blue-400 to-indigo-400 rounded-full left-1/2 top-1/4 -translate-x-1/2 opacity-30"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-1 h-40 bg-gradient-to-b from-cyan-400 via-blue-400 to-indigo-400 rounded-full left-1/4 top-1/2 opacity-30"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-1 h-40 bg-gradient-to-b from-cyan-400 via-blue-400 to-indigo-400 rounded-full right-1/4 top-1/3 opacity-30"
        animate={{ y: [0, 25, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
    </section>
  );
}
