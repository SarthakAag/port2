"use client";

import { motion } from "framer-motion";
import CodeBackground from "@/components/CodeBackground";

const collegeWork = [
  {
    role: "Head of Technical",
    company: "Matrix Club",
    period: "2025 – Present",
    tag: "01",
    desc: "Directed the technical wing of the Mathematics Club by managing digital platforms, organizing tech-driven events, and mentoring members. Leveraged React, Python, Java, and SQL to enhance efficiency and innovation.",
  },
  {
    role: "Designer",
    company: "ACE Club",
    period: "2025",
    tag: "02",
    desc: "Collaborated with the ACE Club's Design Team to create engaging graphics, event posters, and digital content. Focused on delivering creative, impactful designs that enhanced the club's branding and outreach.",
  },
  {
    role: "Event Coordinator",
    company: "DI Club",
    period: "2025",
    tag: "03",
    desc: "Coordinated flagship technical events Humar Compiler and Rune of Unity, managing event execution, participant engagement, and technical workflows to ensure smooth and impactful experiences.",
  },
  {
    role: "Designer",
    company: "Campus Newsletter",
    period: "2024 – 2025",
    tag: "04",
    desc: "Created layouts, graphics, and visual content for the Campus Newsletter that enhanced readability and engagement. Contributed to building a professional and appealing publication style.",
  },
];

const workExperience = [
  {
    role: "Data Analyst Intern",
    company: "Unified Mentor",
    period: "Oct 2025 – Dec 2025",
    tag: "01",
    desc: "Analyzed datasets using Python, Pandas, NumPy, and Matplotlib. Conducted exploratory data analysis and data cleaning to extract meaningful insights from real-world data.",
  },
  {
    role: "Full Stack Developer Intern",
    company: "Elevance Skills",
    period: "Dec 2025 – Feb 2026",
    tag: "02",
    desc: "Developed a full-stack travel booking web app inspired by MakeMyTrip using Next.js, Spring Boot (Java), and MongoDB. Implemented RESTful APIs for authentication, bookings, and data management.",
  },
  {
    role: "Intern",
    company: "Sri Jayaram Infotech Pvt. Ltd.",
    period: "Feb 2026 – Present",
    tag: "03",
    desc: "Contributing to backend development by building APIs and handling server-side logic. Working with databases and collaborating with frontend teams for seamless integration.",
  },
];

function SectionBlock({
  title,
  subtitle,
  items,
  accentFrom,
  accentTo,
  emptyMessage,
}: {
  title: string;
  subtitle: string;
  items: typeof collegeWork;
  accentFrom: string;
  accentTo: string;
  emptyMessage?: string;
}) {
  return (
    <div className="w-full max-w-6xl mb-24">
      {/* Block Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="mb-10 flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-8"
      >
        <div className="flex items-center gap-4">
          <div
            className={`w-1 h-14 rounded-full bg-gradient-to-b ${accentFrom} ${accentTo} shrink-0`}
          />
          <div>
            <p className="text-[10px] tracking-[0.4em] text-gray-500 uppercase font-mono mb-1">
              {subtitle}
            </p>
            <h3
              className={`text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r ${accentFrom} ${accentTo}`}
            >
              {title}
            </h3>
          </div>
        </div>
        <div className="hidden sm:block flex-1 h-px bg-white/5" />
        <span className="text-xs text-gray-600 font-mono hidden sm:block">
          {items.length} {items.length === 1 ? "entry" : "entries"}
        </span>
      </motion.div>

      {/* Cards */}
      {items.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="border border-dashed border-white/10 rounded-2xl p-10 text-center text-gray-600 text-sm font-mono"
        >
          {emptyMessage ?? "No entries yet."}
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group relative bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6 overflow-hidden cursor-default transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06]"
            >
              {/* Watermark number */}
              <span
                className={`absolute -bottom-4 -right-2 text-[7rem] font-black leading-none select-none text-transparent bg-clip-text bg-gradient-to-br ${accentFrom} ${accentTo} opacity-[0.06] group-hover:opacity-[0.11] transition-opacity duration-300`}
              >
                {item.tag}
              </span>

              {/* Top row */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-white leading-tight">
                    {item.role}
                  </h4>
                  <p
                    className={`text-sm font-semibold mt-0.5 text-transparent bg-clip-text bg-gradient-to-r ${accentFrom} ${accentTo}`}
                  >
                    {item.company}
                  </p>
                </div>
                <span className="text-[11px] text-gray-500 font-mono whitespace-nowrap ml-4 mt-1 shrink-0">
                  {item.period}
                </span>
              </div>

              {/* Divider */}
              <div
                className={`h-px w-full bg-gradient-to-r ${accentFrom} ${accentTo} opacity-10 group-hover:opacity-25 mb-4 transition-opacity duration-300`}
              />

              {/* Description */}
              <p className="text-gray-400 text-sm leading-relaxed">
                {item.desc}
              </p>

              {/* Left hover accent */}
              <div
                className={`absolute left-0 top-6 bottom-6 w-0.5 bg-gradient-to-b ${accentFrom} ${accentTo} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full`}
              />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      className="relative min-h-screen flex flex-col items-center py-24 px-4 sm:px-8 lg:px-16 text-white overflow-hidden"
    >
      {/* Background */}
      <motion.div
        className="absolute inset-0 -z-10 opacity-20"
        animate={{ y: [0, -50, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      >
        <CodeBackground />
      </motion.div>

      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #67e8f9 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      {/* Page heading */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-6xl mb-16 text-center"
      >
        <p className="text-[10px] tracking-[0.45em] text-cyan-500 uppercase font-mono mb-3">
          Portfolio
        </p>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500">
          Experience
        </h2>
        <p className="mt-4 text-gray-500 text-sm max-w-md mx-auto">
          A record of roles, contributions, and creative work across clubs and
          professional endeavors.
        </p>
      </motion.div>

      {/* College Work */}
      <SectionBlock
        title="College Work"
        subtitle="Campus Involvement"
        items={collegeWork}
        accentFrom="from-cyan-400"
        accentTo="to-blue-500"
      />

      {/* Work Experience */}
      <SectionBlock
        title="Work Experience"
        subtitle="Professional"
        items={workExperience}
        accentFrom="from-indigo-400"
        accentTo="to-purple-500"
      />
    </section>
  );
}