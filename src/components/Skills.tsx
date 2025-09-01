

"use client";

import { motion } from "framer-motion";
import { Code, Palette, Cpu, Globe, BarChart2, Activity } from "lucide-react";
import CodeBackground from "@/components/CodeBackground";

const skills = [
  {
    id: 1,
    name: "Frontend Development",
    level: 90,
    icon: Code,
    tools: ["HTML", "CSS", "JavaScript", "React", "Next.js", "Tailwind CSS"],
  },
  {
    id: 2,
    name: "UI / UX Design",
    level: 80,
    icon: Palette,
    tools: ["Figma", "Adobe XD", "Framer Motion", "Canva"],
  },
  {
    id: 3,
    name: "Backend Development",
    level: 70,
    icon: Cpu,
    tools: ["Node.js", "Express.js", "MongoDB", "Firebase"],
  },
  {
    id: 4,
    name: "Web Performance & SEO",
    level: 85,
    icon: Globe,
    tools: ["Lighthouse", "PageSpeed Insights", "SEO Best Practices"],
  },
  {
    id: 5,
    name: "Data Analytics",
    level: 70,
    icon: BarChart2,
    tools: ["Python", "SQL", "Tableau", "Power BI", "Excel", "Spark", "Hadoop"],
  },
  {
    id: 6,
    name: "Analytical & Statistical",
    level: 60,
    icon: Activity,
    tools: ["Regression", "Classification", "KPI Tracking", "Hypothesis Testing"],
  },
];

const codeLines = [
  "function Skills() {",
  "   const frontend = ['HTML', 'CSS', 'React'];",
  "   const backend = ['Node.js', 'MongoDB'];",
  "   return <Portfolio />;",
  "}",
];

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-12 py-20"
    >
      {/* Background Layer */}
      <CodeBackground />

      {/* Typing Code Effect */}
      <div className="absolute inset-0 flex flex-col items-start justify-center px-10 text-green-400 font-mono text-sm opacity-20 select-none pointer-events-none">
        {codeLines.map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: i * 0.4 }}
            viewport={{ once: true }}
          >
            {line}
          </motion.p>
        ))}
      </div>

      {/* Skills */}
      <div className="relative z-10 max-w-6xl w-full">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center text-3xl sm:text-4xl md:text-5xl font-extrabold mb-12 bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(0,180,255,0.8)]"
        >
          My Skills
        </motion.h2>

        {/* Skills Grid: 1 col mobile, 2 col tablet, 3 col desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05, boxShadow: "0px 0px 30px rgba(0,200,255,0.4)" }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl border border-blue-500/40 bg-gradient-to-b from-blue-900/30 to-blue-800/10 backdrop-blur-md shadow-lg hover:bg-blue-900/20 hover:backdrop-blur-lg cursor-pointer"
            >
              {/* Icon + Name */}
              <div className="flex items-center gap-3 mb-4">
                <skill.icon className="text-cyan-400 w-7 h-7" />
                <h3 className="text-lg font-semibold text-white">{skill.name}</h3>
              </div>

              {/* Progress */}
              <div className="w-full bg-gray-700/40 rounded-full h-3 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="h-3 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500"
                />
              </div>

              {/* Percentage */}
              <p className="mt-2 text-sm text-gray-300">{skill.level}%</p>

              {/* Tools */}
              <ul className="mt-4 flex flex-wrap gap-2">
                {skill.tools.map((tool, idx) => (
                  <li
                    key={idx}
                    className="text-xs px-3 py-1 rounded-full bg-blue-500/20 text-cyan-300 border border-blue-400/30"
                  >
                    {tool}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
