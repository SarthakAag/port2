"use client";

import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { ExternalLink, Github, ChevronRight, ChevronLeft, BookOpen, FileText } from "lucide-react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const projects = [
  {
    title: "Stock Price Prediction",
    tagline: "ML-powered market insights",
    description:
      "An interactive stock market analysis web app providing real-time and historical stock insights using predictive modelling.",
    tech: ["Python", "Streamlit", "Yahoo Finance API", "Pandas", "Matplotlib"],
    category: "Data Science",
    color: "#06b6d4",
    image: "/images/projects/stock.png",
    live: "https://stockfinal-sarthak.streamlit.app/",
    github: "",
  },
  {
    title: "NextAuth CRUD System",
    tagline: "Full-stack authentication & data management",
    description:
      "A full-stack auth system with login, signup, protected routes, and CRUD functionality built on Next.js and MongoDB.",
    tech: ["Next.js", "MongoDB", "NextAuth", "REST API", "Tailwind"],
    category: "Full Stack",
    color: "#818cf8",
    image: "/images/projects/nextauth.png",
    live: "",
    github: "https://github.com/SarthakAag/nextauth1",
  },
{
  title: "AI-Powered Travel Booking Platform",
  tagline: "Full-stack MakeMyTrip-inspired travel ecosystem",
  description:
    "A full-stack travel booking platform featuring dynamic flight pricing, real-time seat locking, hotel and flight booking, refund tracking, review systems, admin dashboards, and live price history analytics. Built with scalable REST APIs and responsive modern UI.",
  tech: [
    "Next.js",
    "Spring Boot",
    "MongoDB",
    "Java",
    "TypeScript",
    "REST API",
    "Recharts"
  ],
  category: "Full Stack",
  color: "#34d399",
  image: "/images/projects/travel.png",
  live: "",
  github: "https://github.com/SarthakAag/travel2",
},
  {
    title: "AI-Powered Blog Platform",
    tagline: "Full-stack blogging with AI moderation",
    description:
      "A modern full-stack blog platform featuring AI-powered content moderation, image classification, and intelligent commenting using Ollama models.",
    tech: ["Next.js", "FastAPI", "PostgreSQL", "Tailwind CSS", "Ollama", "REST API"],
    category: "Full Stack",
    color: "#f472b6",
    image: "/images/projects/blog.png",
    live: "",
    github: "https://github.com/SarthakAag/blog-",
  },
{
  title: "VeriClaim AI",
  tagline: "Real-time fraud-aware insurance automation platform",
  description:
    "An AI-powered parametric insurance system for gig workers that automates risk detection, fraud analysis, trigger-based claims, and instant payouts using real-time weather, traffic, and location intelligence.",
  tech: [
    "Next.js",
    "TypeScript",
    "FastAPI",
    "PostgreSQL",
    "Custom ML Models",
    "Hybrid Fraud Detection",
    "WeatherAPI",
    "REST API"
  ],
  category: "AI / Full Stack",
  color: "#f97316",
  image: "/images/projects/payouts.png",
  live: "https://payouts.narwhals.sbs/",
  github: "https://github.com/SarthakAag/vericlaim",
},
{
  title: "AI-Driven Application Support & Operations",
  tagline: "Enterprise-grade intelligent incident management platform",
  description:
    "An AI-powered AIOps platform that automates IT support workflows using NLP-based ticket classification, semantic similarity search, ML-driven confidence scoring, and governance-based auto-resolution with human-in-the-loop controls.",
  tech: [
    "FastAPI",
    "Python",
    "Scikit-learn",
    "Sentence Transformers",
    "Machine Learning",
    "FAISS / Cosine Similarity",
    "Admin Dashboard",
    "Tailwind"
  ],
  category: "AI / ML",
  color: "#a78bfa",
  image: "/images/projects/ai.png",
  live: "",
  github: "https://github.com/SarthakAag/operations",
},
];

const certificates = {
  courses: [
    { name: "Introduction To Programming In C", issuer: "NPTEL – IIT", year: "2024" },
    { name: "Data Science Orientation", issuer: "Coursera – IBM", year: "2024" },
    { name: "Data Science Profession", issuer: "Coursera – Univ. of London", year: "2024" },
    { name: "Introduction to Data Analyst", issuer: "Coursera – Meta", year: "2024" },
    { name: "Database Management System", issuer: "NPTEL – IIT", year: "2025" },
    { name: "Frontend Developer Certificate", issuer: "HackerRank", year: "2025" },
    { name: "Demystifying Networks", issuer: "NPTEL – IIT", year: "2025" },
    { name: "Essentials of Personal Finance", issuer: "Nergy Vidya", year: "2025" },
    { name: "AI / ML", issuer: "Nasscom", year: "2025" },
  ],
  hackathons: [
    { name: "Ace Hacks – Round 3 Qualifier", issuer: "ACE Club", year: "2025" },
    { name: "CodeKalari", issuer: "IIIT Kottayam", year: "2025" },
    { name: "TANFINET Hackathon", issuer: "SRM KTR", year: "2025" },
    { name: "DevTrails 2026", issuer: "Guidewire", year: "2026" },
    { name: "Srijan Atos 2026", issuer: "Srijan × Atos", year: "2026" },
    { name: "Avishkar'26", issuer: "SRM VDP", year: "2026" },
  ],
};

const publications = [
  {
    title: "Stock Price Prediction",
    journal: "IJIREEICE",
    journalFull:
      "International Journal of Innovative Research in Electrical, Electronics, Instrumentation and Control Engineering",
    year: "2025",
    doi: "10.17148/IJIREEICE.2025.131017",
    authors: "Sarthak Agarwal, Devisha Agrawal, Abhishek Singh Rajput, Dr. Golda Dilip",
    abstract:
      "Stock markets are volatile and influenced by many factors, making price prediction difficult. This paper presents a web app that predicts stock prices using a trained Long Short-Term Memory (LSTM) model. The system fetches historical data from Yahoo Finance, preprocesses it, and predicts future prices for both U.S. and Indian markets, complete with visualization tools and performance metrics for analysis.",
    tags: ["LSTM", "Machine Learning", "Deep Learning", "Time Series Forecasting", "Python"],
    color: "#06b6d4",
    pdfLink:
      "https://ijireeice.com/wp-content/uploads/2025/10/IJIREEICE.2025.131017-STOCK.pdf",
    link: "https://ijireeice.com/papers/stock-price-prediction/",
  },
  {
    title: "VoxSpace: A Platform for Every Voice",
    journal: "IARJSET",
    journalFull:
      "International Advanced Research Journal in Science, Engineering and Technology",
    year: "2026",
    doi: "10.17148/IARJSET.2026.13455",
    authors: "Sarthak Agarwal, Abhishek Singh Rajput, Devisha Agrawal, Indumathy. M",
    abstract:
      "This paper presents an AI-enabled blogging platform designed to allow users to share content while ensuring safe, moderated output. It integrates AI-based text moderation and image classification to detect harmful material — auto-publishing safe content and flagging violations for admin review. An AI commenting feature further enhances user engagement and content quality.",
    tags: ["Next.js", "FastAPI", "PostgreSQL", "AI Moderation", "Image Classification", "NLP"],
    color: "#a78bfa",
    pdfLink:
      "https://iarjset.com/wp-content/uploads/2026/04/IARJSET.2026.13455-Voxspace.pdf",
    link: "https://iarjset.com/papers/voxspace-a-platform-for-every-voice/",
  },
];

const categoryColors: Record<string, string> = {
  "Data Science": "from-cyan-500/20 to-cyan-500/5 border-cyan-500/30 text-cyan-400",
  "Full Stack": "from-indigo-500/20 to-indigo-500/5 border-indigo-500/30 text-indigo-400",
  "Frontend": "from-pink-500/20 to-pink-500/5 border-pink-500/30 text-pink-400",
  "AI / ML": "from-violet-500/20 to-violet-500/5 border-violet-500/30 text-violet-400",
};

// ─── PROJECT CARD ─────────────────────────────────────────────────────────────

function ProjectCard({ project, i }: { project: (typeof projects)[0]; i: number }) {
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: i * 0.08 }}
      viewport={{ once: true }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group relative rounded-2xl overflow-hidden flex flex-col flex-shrink-0"
      style={{
        width: "320px",
        background: "linear-gradient(145deg, #0d1424 0%, #0a0f1e 100%)",
        border: `1px solid ${hovered ? project.color + "55" : "#1e293b"}`,
        boxShadow: hovered ? `0 0 28px 0 ${project.color}22` : "none",
        transition: "border 0.3s, box-shadow 0.3s",
      }}
    >
      <div className="relative w-full h-44 overflow-hidden bg-[#060d1a]">
        {imgError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `repeating-linear-gradient(135deg, ${project.color}22 0px, ${project.color}22 1px, transparent 1px, transparent 24px)`,
              }}
            />
            <span
              className="text-[10px] font-mono tracking-widest uppercase"
              style={{ color: project.color + "66" }}
            >
              screenshot here
            </span>
          </div>
        ) : (
          <img
            src={project.image}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e] via-transparent to-transparent" />
        <span
          className={`absolute top-3 left-3 text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full border bg-gradient-to-r ${
            categoryColors[project.category] ?? "text-gray-400 border-gray-700"
          }`}
        >
          {project.category}
        </span>
        <div className="absolute top-3 right-3 flex gap-2">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-black/60 flex items-center justify-center hover:bg-white/10 transition"
            >
              <Github size={14} className="text-white" />
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-black/60 flex items-center justify-center hover:bg-white/10 transition"
            >
              <ExternalLink size={14} className="text-white" />
            </a>
          )}
        </div>
      </div>

      <div className="flex flex-col flex-1 p-5 gap-3">
        <div>
          <h3 className="text-white font-bold text-base leading-snug">{project.title}</h3>
          <p className="text-[11px] font-mono mt-0.5" style={{ color: project.color }}>
            {project.tagline}
          </p>
        </div>
        <p className="text-gray-400 text-sm leading-relaxed flex-1">{project.description}</p>
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-[10px] font-mono px-2 py-0.5 rounded-md border"
              style={{
                borderColor: project.color + "44",
                color: project.color + "cc",
                background: project.color + "10",
              }}
            >
              {t}
            </span>
          ))}
        </div>
        {(project.live || project.github) && (
          <a
            href={project.live || project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs font-semibold mt-1"
            style={{ color: project.color }}
          >
            View Project <ChevronRight size={13} />
          </a>
        )}
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-0.5 transition-opacity duration-300"
        style={{
          background: `linear-gradient(to right, transparent, ${project.color}, transparent)`,
          opacity: hovered ? 1 : 0,
        }}
      />
    </motion.div>
  );
}

// ─── HORIZONTAL SCROLLER ─────────────────────────────────────────────────────

function ProjectScroller() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const CARD_WIDTH = 336;

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: dir === "right" ? CARD_WIDTH * 2 : -CARD_WIDTH * 2,
      behavior: "smooth",
    });
  };

  const onScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 10);
  };

  return (
    <div className="relative">
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 w-10 h-10 rounded-full flex items-center justify-center border border-white/10 bg-[#0a0f1e] transition-all duration-200 hover:border-cyan-500/50 hover:shadow-[0_0_16px_0_rgba(6,182,212,0.2)]"
        style={{
          opacity: canScrollLeft ? 1 : 0.2,
          pointerEvents: canScrollLeft ? "auto" : "none",
        }}
      >
        <ChevronLeft size={18} className="text-white" />
      </button>
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 w-10 h-10 rounded-full flex items-center justify-center border border-white/10 bg-[#0a0f1e] transition-all duration-200 hover:border-cyan-500/50 hover:shadow-[0_0_16px_0_rgba(6,182,212,0.2)]"
        style={{
          opacity: canScrollRight ? 1 : 0.2,
          pointerEvents: canScrollRight ? "auto" : "none",
        }}
      >
        <ChevronRight size={18} className="text-white" />
      </button>
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-black/60 to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l from-black/60 to-transparent" />
      <div
        ref={scrollRef}
        onScroll={onScroll}
        className="flex gap-4 overflow-x-auto pb-4 px-2"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <style>{`div::-webkit-scrollbar{display:none}`}</style>
        {projects.map((p, i) => (
          <ProjectCard key={i} project={p} i={i} />
        ))}
      </div>
      <div className="flex justify-center gap-1.5 mt-4">
        {projects.map((_, i) => (
          <button
            key={i}
            onClick={() =>
              scrollRef.current?.scrollTo({ left: i * CARD_WIDTH, behavior: "smooth" })
            }
            className="w-1.5 h-1.5 rounded-full transition-all duration-300 bg-white/20 hover:bg-cyan-400/60"
          />
        ))}
      </div>
    </div>
  );
}

// ─── CERT CARD ───────────────────────────────────────────────────────────────

function CertCard({
  cert,
  i,
  accent,
}: {
  cert: { name: string; issuer: string; year: string };
  i: number;
  accent: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: i * 0.07 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      className="relative flex items-center gap-4 rounded-xl px-5 py-4 transition-all duration-300"
      style={{
        background: "linear-gradient(135deg, #0d1424 0%, #0a0f1e 100%)",
        border: "1px solid #1e293b",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = accent + "55";
        (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 18px 0 ${accent}18`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "#1e293b";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
      }}
    >
      <div className="w-2 h-2 rounded-full shrink-0" style={{ background: accent }} />
      <div className="flex-1 min-w-0">
        <p className="text-white text-sm font-semibold truncate">{cert.name}</p>
        <p className="text-gray-500 text-xs mt-0.5">
          {cert.issuer} · {cert.year}
        </p>
      </div>
    </motion.div>
  );
}

function CertBlock({
  label,
  sublabel,
  items,
  accent,
  emptyText,
}: {
  label: string;
  sublabel: string;
  items: { name: string; issuer: string; year: string }[];
  accent: string;
  emptyText?: string;
}) {
  return (
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-1 h-10 rounded-full shrink-0" style={{ background: accent }} />
        <div>
          <p className="text-[9px] tracking-[0.4em] text-gray-600 uppercase font-mono">
            {sublabel}
          </p>
          <h4 className="text-lg font-bold text-white">{label}</h4>
        </div>
        <span className="ml-auto text-xs font-mono" style={{ color: accent + "88" }}>
          {String(items.length).padStart(2, "0")}
        </span>
      </div>
      {items.length === 0 ? (
        <div className="border border-dashed border-white/10 rounded-xl p-8 text-center text-gray-700 text-xs font-mono">
          {emptyText ?? "Coming soon."}
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {items.map((c, i) => (
            <CertCard key={i} cert={c} i={i} accent={accent} />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── PUBLICATION CARD ────────────────────────────────────────────────────────

function PublicationCard({ pub, i }: { pub: (typeof publications)[0]; i: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: i * 0.15 }}
      viewport={{ once: true }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative rounded-2xl overflow-hidden flex flex-col"
      style={{
        background: "linear-gradient(145deg, #0d1424 0%, #0a0f1e 100%)",
        border: `1px solid ${hovered ? pub.color + "55" : "#1e293b"}`,
        boxShadow: hovered ? `0 0 28px 0 ${pub.color}22` : "none",
        transition: "border 0.3s, box-shadow 0.3s",
      }}
    >
      {/* Top accent strip */}
      <div
        className="h-1 w-full"
        style={{ background: `linear-gradient(to right, ${pub.color}, transparent)` }}
      />

      <div className="p-6 flex flex-col gap-4">
        {/* Journal badge + year */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-2">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
              style={{ background: pub.color + "18", border: `1px solid ${pub.color}33` }}
            >
              <FileText size={14} style={{ color: pub.color }} />
            </div>
            <div>
              <p
                className="text-[10px] font-black tracking-widest uppercase"
                style={{ color: pub.color }}
              >
                {pub.journal}
              </p>
              <p className="text-[10px] text-gray-600 leading-tight max-w-[220px]">
                {pub.journalFull}
              </p>
            </div>
          </div>
          <span className="text-xs font-mono text-gray-600 shrink-0">{pub.year}</span>
        </div>

        {/* Title */}
        <h4 className="text-white font-bold text-base sm:text-lg leading-snug">{pub.title}</h4>

        {/* Authors */}
        <p
          className="text-[11px] font-mono leading-relaxed"
          style={{ color: pub.color + "99" }}
        >
          {pub.authors}
        </p>

        {/* Abstract */}
        <p className="text-gray-400 text-sm leading-relaxed">{pub.abstract}</p>

        {/* DOI */}
        <p className="text-[10px] font-mono text-gray-600">
          DOI: <span className="text-gray-500">{pub.doi}</span>
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {pub.tags.map((t) => (
            <span
              key={t}
              className="text-[10px] font-mono px-2 py-0.5 rounded-md border"
              style={{
                borderColor: pub.color + "44",
                color: pub.color + "cc",
                background: pub.color + "10",
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-3 mt-1 flex-wrap">
          <a
            href={pub.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-lg border transition-all duration-200"
            style={{
              borderColor: pub.color + "44",
              color: pub.color,
              background: hovered ? pub.color + "18" : pub.color + "0d",
            }}
          >
            <BookOpen size={13} /> Read Paper <ExternalLink size={11} />
          </a>
          <a
            href={pub.pdfLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-lg border transition-all duration-200"
            style={{
              borderColor: "#ffffff18",
              color: "#94a3b8",
              background: hovered ? "#ffffff0d" : "transparent",
            }}
          >
            <FileText size={13} /> PDF
          </a>
        </div>
      </div>

      {/* Bottom glow strip */}
      <div
        className="absolute bottom-0 left-0 right-0 h-0.5 transition-opacity duration-300"
        style={{
          background: `linear-gradient(to right, transparent, ${pub.color}, transparent)`,
          opacity: hovered ? 1 : 0,
        }}
      />
    </motion.div>
  );
}

function SectionHeading({ label, gradient }: { label: string; gradient: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="flex items-center gap-4 mb-10"
    >
      <h2
        className={`text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r ${gradient}`}
      >
        {label}
      </h2>
      <div className="flex-1 h-px bg-white/[0.04]" />
    </motion.div>
  );
}

// ─── MAIN EXPORT ──────────────────────────────────────────────────────────────

export default function ProjectsCertificatesSection() {
  return (
    <section className="relative min-h-screen px-4 sm:px-10 lg:px-16 py-24 text-white overflow-hidden">
      <div
        className="absolute inset-0 -z-10 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle, #67e8f9 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-6xl mx-auto flex flex-col gap-24">

        {/* PROJECTS */}
        <div>
          <div className="flex items-center justify-between mb-10">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500"
            >
              Projects
            </motion.h2>
            <span className="text-xs text-gray-600 font-mono hidden sm:block">
              {projects.length} projects · scroll →
            </span>
          </div>
          <ProjectScroller />
        </div>

        {/* PUBLICATIONS */}
        <div>
          <SectionHeading
            label="Publications"
            gradient="from-cyan-400 via-teal-400 to-emerald-400"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {publications.map((pub, i) => (
              <PublicationCard key={i} pub={pub} i={i} />
            ))}
          </div>
        </div>

        {/* CERTIFICATES */}
        <div>
          <SectionHeading
            label="Certificates"
            gradient="from-indigo-400 via-purple-400 to-pink-400"
          />
          <div className="mb-8">
            <CertBlock
              label="Courses"
              sublabel="Academic & Online"
              items={certificates.courses}
              accent="#06b6d4"
            />
          </div>
          <CertBlock
            label="Hackathons"
            sublabel="Competitions"
            items={certificates.hackathons}
            accent="#a78bfa"
          />
        </div>

      </div>
    </section>
  );
}