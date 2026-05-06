"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Code, Palette, Cpu, Globe, BarChart2, Activity } from "lucide-react";
import CodeBackground from "@/components/CodeBackground";

// ─── DATA ────────────────────────────────────────────────────────────────────

const skills = [
  {
    id: 0,
    name: "Frontend Development",
    level: 90,
    icon: Code,
    color: "#06b6d4",
    tools: ["HTML", "CSS", "JavaScript", "React", "Next.js", "Tailwind CSS"],
    toolIcons: [
      { name: "HTML", icon: "https://cdn.simpleicons.org/html5/E34F26" },
      { name: "CSS", icon: "https://cdn.simpleicons.org/css3/1572B6" },
      { name: "JavaScript", icon: "https://cdn.simpleicons.org/javascript/F7DF1E" },
      { name: "React", icon: "https://cdn.simpleicons.org/react/61DAFB" },
      { name: "Next.js", icon: "https://cdn.simpleicons.org/nextdotjs/ffffff" },
      { name: "Tailwind CSS", icon: "https://cdn.simpleicons.org/tailwindcss/06B6D4" },
    ],
    // icon shown inside the web node (SimpleIcons URL)
    nodeIconUrl: "https://cdn.simpleicons.org/react/61DAFB",
  },
  {
    id: 1,
    name: "UI / UX Design",
    level: 80,
    icon: Palette,
    color: "#f472b6",
    tools: ["Figma", "Adobe XD", "Framer Motion", "Canva"],
    toolIcons: [
      { name: "Figma", icon: "https://cdn.simpleicons.org/figma/F24E1E" },
      { name: "Adobe XD", icon: "https://cdn.simpleicons.org/adobexd/FF61F6" },
      { name: "Framer", icon: "https://cdn.simpleicons.org/framer/0055FF" },
      { name: "Canva", icon: "https://cdn.simpleicons.org/canva/00C4CC" },
    ],
    nodeIconUrl: "https://cdn.simpleicons.org/figma/F24E1E",
  },
  {
    id: 2,
    name: "Backend Development",
    level: 70,
    icon: Cpu,
    color: "#818cf8",
    tools: ["Node.js", "Express.js", "MongoDB", "Firebase", "FastAPI", "GoLang"],
    toolIcons: [
      { name: "Node.js", icon: "https://cdn.simpleicons.org/nodedotjs/339933" },
      { name: "Express", icon: "https://cdn.simpleicons.org/express/ffffff" },
      { name: "MongoDB", icon: "https://cdn.simpleicons.org/mongodb/47A248" },
      { name: "Firebase", icon: "https://cdn.simpleicons.org/firebase/FFCA28" },
      { name: "FastAPI", icon: "https://cdn.simpleicons.org/fastapi/009688" },
      { name: "Go", icon: "https://cdn.simpleicons.org/go/00ADD8" },
    ],
    nodeIconUrl: "https://cdn.simpleicons.org/nodedotjs/339933",
  },
  {
    id: 3,
    name: "Web Performance & SEO",
    level: 85,
    icon: Globe,
    color: "#34d399",
    tools: ["Lighthouse", "PageSpeed Insights", "SEO Best Practices"],
    toolIcons: [
      { name: "Lighthouse", icon: "https://cdn.simpleicons.org/lighthouse/F44B21" },
      { name: "Google", icon: "https://cdn.simpleicons.org/google/4285F4" },
      { name: "Vercel", icon: "https://cdn.simpleicons.org/vercel/ffffff" },
    ],
    nodeIconUrl: "https://cdn.simpleicons.org/lighthouse/F44B21",
  },
  {
    id: 4,
    name: "Data Analytics",
    level: 70,
    icon: BarChart2,
    color: "#fbbf24",
    tools: ["Python", "SQL", "Tableau", "Power BI", "Excel", "Spark", "Hadoop"],
    toolIcons: [
      { name: "Python", icon: "https://cdn.simpleicons.org/python/3776AB" },
      { name: "MySQL", icon: "https://cdn.simpleicons.org/mysql/4479A1" },
      { name: "Tableau", icon: "https://cdn.simpleicons.org/tableau/E97627" },
      { name: "Power BI", icon: "https://cdn.simpleicons.org/powerbi/F2C811" },
      { name: "Apache Spark", icon: "https://cdn.simpleicons.org/apachespark/E25A1C" },
      { name: "Hadoop", icon: "https://cdn.simpleicons.org/apachehadoop/66CCFF" },
    ],
    nodeIconUrl: "https://cdn.simpleicons.org/python/3776AB",
  },
  {
    id: 5,
    name: "Analytical & Statistical",
    level: 60,
    icon: Activity,
    color: "#a78bfa",
    tools: ["Regression", "Classification", "KPI Tracking", "Hypothesis Testing"],
    toolIcons: [
      { name: "NumPy", icon: "https://cdn.simpleicons.org/numpy/013243" },
      { name: "Pandas", icon: "https://cdn.simpleicons.org/pandas/150458" },
      { name: "Jupyter", icon: "https://cdn.simpleicons.org/jupyter/F37626" },
      { name: "scikit-learn", icon: "https://cdn.simpleicons.org/scikitlearn/F7931E" },
    ],
    nodeIconUrl: "https://cdn.simpleicons.org/jupyter/F37626",
  },
];

const codeLines = [
  "function Skills() {",
  "   const frontend = ['HTML', 'CSS', 'React'];",
  "   const backend = ['Node.js', 'MongoDB'];",
  "   return <Portfolio />;",
  "}",
];

// ─── WEB CONFIG ──────────────────────────────────────────────────────────────

const CENTER = { x: 300, y: 300 };
const RADIUS = 195;
const NODE_R = 38;

function getNodePos(i: number, total: number) {
  const angle = (2 * Math.PI * i) / total - Math.PI / 2;
  return {
    x: CENTER.x + RADIUS * Math.cos(angle),
    y: CENTER.y + RADIUS * Math.sin(angle),
  };
}

// ─── SVG SUB-COMPONENTS ──────────────────────────────────────────────────────

function WebRings() {
  const rings = [0.25, 0.5, 0.75, 1];
  return (
    <>
      {rings.map((r, i) => (
        <circle
          key={i}
          cx={CENTER.x}
          cy={CENTER.y}
          r={RADIUS * r}
          fill="none"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="1"
          strokeDasharray="4 8"
        />
      ))}
    </>
  );
}

function Spokes() {
  return (
    <>
      {skills.map((_, i) => {
        const pos = getNodePos(i, skills.length);
        return (
          <line
            key={i}
            x1={CENTER.x}
            y1={CENTER.y}
            x2={pos.x}
            y2={pos.y}
            stroke="rgba(255,255,255,0.07)"
            strokeWidth="1"
          />
        );
      })}
    </>
  );
}

function WebLines({ active }: { active: number | null }) {
  const lines: React.ReactElement[] = [];
  for (let i = 0; i < skills.length; i++) {
    for (let j = i + 1; j < skills.length; j++) {
      const a = getNodePos(i, skills.length);
      const b = getNodePos(j, skills.length);
      const isActive = active === i || active === j;
      lines.push(
        <motion.line
          key={`${i}-${j}`}
          x1={a.x} y1={a.y}
          x2={b.x} y2={b.y}
          animate={{
            stroke: isActive ? skills[active!].color + "60" : "rgba(255,255,255,0.05)",
            strokeWidth: isActive ? 1.5 : 0.8,
          }}
          transition={{ duration: 0.35 }}
        />
      );
    }
  }
  return <>{lines}</>;
}

function SkillPolygon({ active }: { active: number | null }) {
  const points = skills.map((s, i) => {
    const pos = getNodePos(i, skills.length);
    const frac = s.level / 100;
    return {
      x: CENTER.x + (pos.x - CENTER.x) * frac,
      y: CENTER.y + (pos.y - CENTER.y) * frac,
    };
  });
  const poly = points.map((p) => `${p.x},${p.y}`).join(" ");
  const activeColor = active !== null ? skills[active].color : "#06b6d4";

  return (
    <motion.polygon
      points={poly}
      animate={{ fill: activeColor + "1a", stroke: activeColor + "70" }}
      strokeWidth="1.5"
      transition={{ duration: 0.4 }}
    />
  );
}

// ─── SPIDER WEB ──────────────────────────────────────────────────────────────

function SpiderWeb({ active, onSelect }: { active: number | null; onSelect: (i: number | null) => void }) {
  return (
    <svg
      viewBox="0 0 600 600"
      className="w-full max-w-[540px] mx-auto select-none"
      style={{ filter: "drop-shadow(0 0 50px rgba(6,182,212,0.1))" }}
    >
      <defs>
        {/* Glow filter per skill color */}
        {skills.map((s) => (
          <filter key={s.id} id={`glow-${s.id}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        ))}
      </defs>

      <WebRings />
      <Spokes />
      <WebLines active={active} />
      <SkillPolygon active={active} />

      {/* Center hub */}
      <circle cx={CENTER.x} cy={CENTER.y} r={14} fill="#0a0f1e" stroke="#06b6d4" strokeWidth="1" opacity={0.6} />
      <circle cx={CENTER.x} cy={CENTER.y} r={8} fill="#06b6d4" opacity={0.5} />
      <circle cx={CENTER.x} cy={CENTER.y} r={4} fill="#ffffff" opacity={0.9} />

      {/* Nodes */}
      {skills.map((skill, i) => {
        const pos = getNodePos(i, skills.length);
        const isActive = active === i;

        return (
          <g
            key={i}
            onClick={() => onSelect(isActive ? null : i)}
            style={{ cursor: "pointer" }}
            filter={isActive ? `url(#glow-${skill.id})` : undefined}
          >
            {/* Outer pulse ring */}
            {isActive && (
              <motion.circle
                cx={pos.x} cy={pos.y}
                fill="none"
                stroke={skill.color}
                strokeWidth="0.8"
                animate={{ r: [NODE_R + 8, NODE_R + 24], opacity: [0.5, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
              />
            )}

            {/* Static glow ring */}
            <motion.circle
              cx={pos.x} cy={pos.y} r={NODE_R + 5}
              fill="none"
              animate={{
                stroke: isActive ? skill.color + "55" : "transparent",
                strokeWidth: 1,
              }}
              transition={{ duration: 0.3 }}
            />

            {/* Node circle */}
            <motion.circle
              cx={pos.x} cy={pos.y} r={NODE_R}
              animate={{
                fill: isActive ? skill.color + "28" : "#080e1c",
                stroke: isActive ? skill.color : skill.color + "66",
                strokeWidth: isActive ? 2.5 : 1.2,
              }}
              transition={{ duration: 0.3 }}
            />

            {/* Arc ring (proficiency indicator) */}
            <circle
              cx={pos.x} cy={pos.y}
              r={NODE_R - 5}
              fill="none"
              stroke={skill.color + "18"}
              strokeWidth="5"
            />
            <motion.circle
              cx={pos.x} cy={pos.y}
              r={NODE_R - 5}
              fill="none"
              stroke={skill.color}
              strokeWidth="5"
              strokeDasharray={`${(skill.level / 100) * 2 * Math.PI * (NODE_R - 5)} ${2 * Math.PI * (NODE_R - 5)}`}
              strokeDashoffset={2 * Math.PI * (NODE_R - 5) * 0.25}
              strokeLinecap="round"
              animate={{ opacity: isActive ? 1 : 0.5 }}
              transition={{ duration: 0.3 }}
            />

            {/* Brand icon via <image> */}
            <image
              href={skill.nodeIconUrl}
              x={pos.x - 13}
              y={pos.y - 13}
              width="26"
              height="26"
              style={{ pointerEvents: "none" }}
            />

            {/* Label below node */}
            <text
              x={pos.x}
              y={pos.y + NODE_R + 17}
              textAnchor="middle"
              fontSize="10"
              fontWeight="700"
              fontFamily="monospace"
              style={{ userSelect: "none" }}
            >
              <motion.tspan
                animate={{ fill: isActive ? skill.color : "rgba(255,255,255,0.55)" }}
                transition={{ duration: 0.3 }}
              >
                {skill.name.split(" ")[0]}
              </motion.tspan>
            </text>
            {skill.name.split(" ").length > 1 && (
              <text
                x={pos.x}
                y={pos.y + NODE_R + 29}
                textAnchor="middle"
                fontSize="9"
                fontFamily="monospace"
                style={{ userSelect: "none" }}
              >
                <motion.tspan
                  animate={{ fill: isActive ? skill.color + "bb" : "rgba(255,255,255,0.3)" }}
                  transition={{ duration: 0.3 }}
                >
                  {skill.name.split(" ").slice(1).join(" ")}
                </motion.tspan>
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

// ─── SKILL DETAIL PANEL ───────────────────────────────────────────────────────

function SkillDetail({ skill }: { skill: (typeof skills)[0] | null }) {
  return (
    <AnimatePresence mode="wait">
      {skill ? (
        <motion.div
          key={skill.id}
          initial={{ opacity: 0, y: 16, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.97 }}
          transition={{ duration: 0.3 }}
          className="rounded-2xl p-5 flex flex-col gap-4"
          style={{
            background: "linear-gradient(145deg, #0d1424 0%, #080e1c 100%)",
            border: `1px solid ${skill.color}44`,
            boxShadow: `0 0 40px 0 ${skill.color}15`,
          }}
        >
          {/* Header */}
          <div className="flex items-center gap-3">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center"
              style={{ background: skill.color + "18", border: `1px solid ${skill.color}44` }}
            >
              <skill.icon size={20} style={{ color: skill.color }} />
            </div>
            <div>
              <h3 className="text-white font-bold text-base leading-tight">{skill.name}</h3>
              <p className="text-xs font-mono mt-0.5" style={{ color: skill.color }}>
                Proficiency · {skill.level}%
              </p>
            </div>
            {/* node icon preview */}
            <img
              src={skill.nodeIconUrl}
              alt={skill.name}
              className="w-7 h-7 ml-auto opacity-70"
            />
          </div>

          {/* Progress bar */}
          <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${skill.level}%` }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="h-2 rounded-full"
              style={{ background: `linear-gradient(to right, ${skill.color}66, ${skill.color})` }}
            />
          </div>

          {/* Tool icons grid */}
          <div className="flex flex-wrap gap-2 pt-1">
            {skill.toolIcons.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border"
                style={{
                  borderColor: skill.color + "33",
                  background: skill.color + "0d",
                }}
                title={t.name}
              >
                <img src={t.icon} alt={t.name} className="w-3.5 h-3.5" />
                <span
                  className="text-[10px] font-mono"
                  style={{ color: skill.color + "cc" }}
                >
                  {t.name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="placeholder"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="rounded-2xl p-6 flex flex-col items-center justify-center gap-3 text-center min-h-[160px]"
          style={{
            background: "linear-gradient(145deg, #0d1424 0%, #080e1c 100%)",
            border: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center">
            <span className="text-white/20 text-xl">✦</span>
          </div>
          <p className="text-gray-600 text-sm font-mono">Click a node to explore</p>
          <p className="text-gray-700 text-xs">Select any skill from the web</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── SKILL STRIP ─────────────────────────────────────────────────────────────

function SkillStrip({ active, onSelect }: { active: number | null; onSelect: (i: number | null) => void }) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mt-8">
      {skills.map((skill, i) => {
        const isActive = active === i;
        return (
          <motion.button
            key={i}
            onClick={() => onSelect(isActive ? null : i)}
            whileHover={{ y: -4, scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            className="flex flex-col items-center gap-2.5 px-3 py-4 rounded-2xl border transition-all duration-300"
            style={{
              background: isActive ? skill.color + "15" : "rgba(255,255,255,0.02)",
              borderColor: isActive ? skill.color + "66" : "rgba(255,255,255,0.07)",
              boxShadow: isActive ? `0 0 24px 0 ${skill.color}25` : "none",
            }}
          >
            {/* Brand icon */}
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{
                background: isActive ? skill.color + "20" : "rgba(255,255,255,0.05)",
                border: `1px solid ${isActive ? skill.color + "55" : "rgba(255,255,255,0.08)"}`,
                transition: "all 0.3s",
              }}
            >
              <img
                src={skill.nodeIconUrl}
                alt={skill.name}
                className="w-5 h-5"
                style={{ opacity: isActive ? 1 : 0.45 }}
              />
            </div>

            {/* Label */}
            <span
              className="text-[10px] font-mono leading-tight text-center"
              style={{ color: isActive ? skill.color : "rgba(255,255,255,0.4)" }}
            >
              {skill.name.split(" ")[0]}
            </span>

            {/* Level */}
            <div className="w-full px-1">
              <div className="w-full bg-white/5 rounded-full h-1 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, delay: i * 0.08 }}
                  viewport={{ once: true }}
                  className="h-1 rounded-full"
                  style={{
                    background: isActive ? skill.color : skill.color + "55",
                  }}
                />
              </div>
              <p
                className="text-[9px] font-mono text-center mt-1"
                style={{ color: isActive ? skill.color + "bb" : "rgba(255,255,255,0.2)" }}
              >
                {skill.level}%
              </p>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}

// ─── MAIN EXPORT ──────────────────────────────────────────────────────────────

export default function Skills() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section
      id="skills"
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-12 py-20"
    >
      <CodeBackground />

      {/* Ambient typing effect */}
      <div className="absolute inset-0 flex flex-col items-start justify-center px-10 text-green-400 font-mono text-sm opacity-[0.12] select-none pointer-events-none">
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

      <div className="relative z-10 max-w-6xl w-full">

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-[10px] tracking-[0.5em] font-mono text-gray-600 uppercase mb-3">
            Technical Expertise
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(0,180,255,0.8)]">
            My Skills
          </h2>
          <p className="text-gray-600 text-sm font-mono mt-3">
            Click any node on the web to explore
          </p>
        </motion.div>

        {/* Main: Web + Right Panel */}
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-10">

          {/* Spider Web */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="w-full lg:w-[55%] flex-shrink-0"
          >
            <SpiderWeb active={active} onSelect={setActive} />
          </motion.div>

          {/* Right Panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="w-full lg:w-[45%] flex flex-col gap-4"
          >
            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Skills", value: `${skills.length}` },
                {
                  label: "Avg. Level",
                  value: `${Math.round(
                    skills.reduce((a, s) => a + s.level, 0) / skills.length
                  )}%`,
                },
                {
                  label: "Tools",
                  value: `${skills.reduce((a, s) => a + s.toolIcons.length, 0)}+`,
                },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  viewport={{ once: true }}
                  className="rounded-xl p-3 text-center"
                  style={{
                    background: "linear-gradient(145deg, #0d1424 0%, #080e1c 100%)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <p className="text-white font-bold text-xl">{stat.value}</p>
                  <p className="text-gray-600 text-[10px] font-mono mt-0.5">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Detail card */}
            <SkillDetail skill={active !== null ? skills[active] : null} />

            {/* All skills mini list */}
            <div
              className="rounded-2xl p-4 flex flex-col gap-3"
              style={{
                background: "linear-gradient(145deg, #0d1424 0%, #080e1c 100%)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <p className="text-[9px] tracking-[0.4em] text-gray-600 uppercase font-mono mb-1">
                All Skills
              </p>
              {skills.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setActive(active === i ? null : i)}
                  className="flex items-center gap-3 w-full text-left hover:opacity-80 transition-opacity"
                >
                  {/* Brand icon */}
                  <img
                    src={s.nodeIconUrl}
                    alt={s.name}
                    className="w-4 h-4 shrink-0"
                    style={{ opacity: active === i ? 1 : 0.35 }}
                  />
                  <span
                    className="text-xs font-mono w-36 truncate"
                    style={{ color: active === i ? s.color : "rgba(255,255,255,0.45)" }}
                  >
                    {s.name}
                  </span>
                  <div className="flex-1 bg-white/5 rounded-full h-1.5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${s.level}%` }}
                      transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                      viewport={{ once: true }}
                      className="h-1.5 rounded-full"
                      style={{
                        background:
                          active === i
                            ? `linear-gradient(to right, ${s.color}77, ${s.color})`
                            : "rgba(255,255,255,0.12)",
                      }}
                    />
                  </div>
                  <span
                    className="text-[10px] font-mono w-8 text-right shrink-0"
                    style={{ color: active === i ? s.color : "rgba(255,255,255,0.25)" }}
                  >
                    {s.level}%
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom icon strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <SkillStrip active={active} onSelect={setActive} />
        </motion.div>

      </div>
    </section>
  );
}