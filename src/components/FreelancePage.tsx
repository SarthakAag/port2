"use client";

import { motion, easeInOut, AnimatePresence } from "framer-motion";
import {
  Bot,
  Globe,
  MessageSquareCode,
  Database,
  Zap,
  ArrowRight,
  Terminal,
  Layers,
  BrainCircuit,
  Mail,
  CheckCircle2,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Clock,
  ArrowLeft,
  X,
  Send,
  Check,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";

// ─── Data ───────────────────────────────────────────────────────────────────

const services = [
  {
    icon: Bot,
    label: "AI Agents",
    tag: "01",
    color: "text-cyan-400",
    border: "border-cyan-400/30",
    glow: "bg-cyan-500/10",
    tagColor: "text-cyan-400/60",
    description:
      "Autonomous agents that plan, reason, and execute multi-step workflows. From LangGraph pipelines to custom tool-calling loops.",
    bullets: [
      "Task-planning & memory agents",
      "Tool-use & API integration",
      "LangChain / LangGraph / CrewAI",
      "Autonomous research bots",
    ],
  },
  {
    icon: Globe,
    label: "Web Development",
    tag: "02",
    color: "text-blue-400",
    border: "border-blue-400/30",
    glow: "bg-blue-500/10",
    tagColor: "text-blue-400/60",
    description:
      "Full-stack web apps built with Next.js, React, and modern backend APIs. Pixel-perfect UIs with performance as a first principle.",
    bullets: [
      "Next.js / React / TypeScript",
      "FastAPI & REST backends",
      "PostgreSQL / Supabase",
      "Responsive, animated UIs",
    ],
  },
  {
    icon: MessageSquareCode,
    label: "Chatbots & RAG",
    tag: "03",
    color: "text-indigo-400",
    border: "border-indigo-400/30",
    glow: "bg-indigo-500/10",
    tagColor: "text-indigo-400/60",
    description:
      "Context-aware chatbots grounded in your own data via retrieval-augmented generation. Accurate, fast, and production-ready.",
    bullets: [
      "Custom RAG pipelines",
      "Vector DBs (Pinecone, Qdrant)",
      "OpenAI / Anthropic / Gemini",
      "Chat UI with streaming",
    ],
  },
  {
    icon: Zap,
    label: "Automation & n8n",
    tag: "04",
    color: "text-yellow-400",
    border: "border-yellow-400/30",
    glow: "bg-yellow-500/10",
    tagColor: "text-yellow-400/60",
    description:
      "End-to-end workflow automation using n8n, Make, and custom scripts. Cut manual work and connect your entire tool stack.",
    bullets: [
      "n8n self-hosted workflows",
      "Email / Slack / WhatsApp flows",
      "AI-triggered automations",
      "Webhook & API orchestration",
    ],
  },
  {
    icon: Database,
    label: "Data & APIs",
    tag: "05",
    color: "text-emerald-400",
    border: "border-emerald-400/30",
    glow: "bg-emerald-500/10",
    tagColor: "text-emerald-400/60",
    description:
      "Data pipelines, scraping infrastructure, and clean REST / GraphQL APIs. From raw sources to structured, queryable output.",
    bullets: [
      "Database design & migrations",
      "Web scraping at scale",
      "REST & GraphQL APIs",
      "ETL pipelines & dashboards",
    ],
  },
  {
    icon: BrainCircuit,
    label: "ML Pipelines",
    tag: "06",
    color: "text-pink-400",
    border: "border-pink-400/30",
    glow: "bg-pink-500/10",
    tagColor: "text-pink-400/60",
    description:
      "Custom ML pipelines from data prep to model deployment. Specialising in molecular informatics, cheminformatics, and scientific ML.",
    bullets: [
      "scikit-learn / PyTorch",
      "RDKit & cheminformatics",
      "Model serving & APIs",
      "Experiment tracking (MLflow)",
    ],
  },
];

const process = [
  {
    icon: Terminal,
    step: "Discovery",
    desc: "We map out scope, tech stack, and deliverables in a single call.",
  },
  {
    icon: Layers,
    step: "Build",
    desc: "Iterative delivery with async updates — no black-box development.",
  },
  {
    icon: CheckCircle2,
    step: "Ship",
    desc: "Tested, documented, and handed over with full source access.",
  },
];

const TIME_SLOTS = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "2:00 PM", "2:30 PM",
  "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM",
];

const MONTH_NAMES = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

const DAY_NAMES = ["Su","Mo","Tu","We","Th","Fr","Sa"];

// ─── Animations ─────────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: easeInOut },
  }),
};

// ─── Booking Modal ───────────────────────────────────────────────────────────

function BookingModal({ onClose }: { onClose: () => void }) {
  const today = new Date();
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [step, setStep] = useState<"calendar" | "form" | "done">("calendar");
  const [form, setForm] = useState({ name: "", email: "", project: "" });
  const [sending, setSending] = useState(false);

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const isPast = (day: number) => {
    const d = new Date(viewYear, viewMonth, day);
    d.setHours(0, 0, 0, 0);
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return d < t;
  };

  const isWeekend = (day: number) => {
    const dow = new Date(viewYear, viewMonth, day).getDay();
    return dow === 0 || dow === 6;
  };

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };

  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const handleDayClick = (day: number) => {
    if (isPast(day) || isWeekend(day)) return;
    setSelectedDate(new Date(viewYear, viewMonth, day));
    setSelectedTime(null);
  };

  const handleConfirm = () => {
    if (selectedDate && selectedTime) setStep("form");
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email) return;
    setSending(true);

    const dateStr = selectedDate!.toLocaleDateString("en-US", {
      weekday: "long", year: "numeric", month: "long", day: "numeric",
    });

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          project: form.project,
          date: dateStr,
          time: selectedTime,
        }),
      });

      const data = await res.json();
      if (!data.ok) throw new Error("Send failed");

      setStep("done");
    } catch (err) {
      console.error(err);
      alert("Something went wrong — please email sarthakag2004@gmail.com directly.");
    } finally {
      setSending(false);
    }
  };

  const dateLabel = selectedDate?.toLocaleDateString("en-US", {
    weekday: "short", month: "short", day: "numeric",
  });

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      style={{ background: "rgba(0,0,0,0.80)", backdropFilter: "blur(8px)" }}
    >
      <div className="flex min-h-full items-center justify-center p-4 py-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: easeInOut }}
          className="relative w-full max-w-md bg-[#0f0f0f] border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
          >
            <X size={16} />
          </button>

          <AnimatePresence mode="wait">

            {/* ── Step: Calendar ── */}
            {step === "calendar" && (
              <motion.div
                key="calendar"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="p-5 sm:p-7"
              >
                <div className="flex items-center gap-3 mb-5 pr-8">
                  <div className="w-8 h-8 shrink-0 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                    <Calendar size={15} className="text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm">Book a meeting</h3>
                    <p className="text-gray-500 text-xs font-mono">30 min · Video call</p>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <button
                    onClick={prevMonth}
                    className="p-1.5 rounded-lg hover:bg-white/8 text-gray-400 hover:text-white transition-colors"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <span className="text-white font-semibold text-xs sm:text-sm">
                    {MONTH_NAMES[viewMonth]} {viewYear}
                  </span>
                  <button
                    onClick={nextMonth}
                    className="p-1.5 rounded-lg hover:bg-white/8 text-gray-400 hover:text-white transition-colors"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>

                <div className="grid grid-cols-7 mb-1">
                  {DAY_NAMES.map(d => (
                    <div key={d} className="text-center text-gray-600 text-[10px] font-mono py-1">
                      {d}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-0.5 mb-5">
                  {cells.map((day, idx) => {
                    if (!day) return <div key={idx} />;
                    const past = isPast(day);
                    const weekend = isWeekend(day);
                    const disabled = past || weekend;
                    const isSelected =
                      selectedDate &&
                      selectedDate.getDate() === day &&
                      selectedDate.getMonth() === viewMonth &&
                      selectedDate.getFullYear() === viewYear;

                    return (
                      <button
                        key={idx}
                        onClick={() => handleDayClick(day)}
                        disabled={disabled}
                        className={`
                          aspect-square rounded-lg text-xs sm:text-sm font-medium transition-all duration-150
                          ${disabled ? "text-gray-700 cursor-not-allowed" : "cursor-pointer"}
                          ${isSelected
                            ? "bg-gradient-to-br from-cyan-500 to-blue-600 text-white"
                            : !disabled
                              ? "text-gray-200 hover:bg-white/10"
                              : ""}
                        `}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>

                <AnimatePresence>
                  {selectedDate && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="flex items-center gap-1.5 mb-2.5">
                        <Clock size={12} className="text-cyan-400 shrink-0" />
                        <span className="text-gray-400 text-[11px] font-mono truncate">
                          {dateLabel} — pick a time (IST)
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-1.5 mb-5">
                        {TIME_SLOTS.map(t => (
                          <button
                            key={t}
                            onClick={() => setSelectedTime(t)}
                            className={`
                              py-2 rounded-xl text-[11px] font-mono font-medium transition-all duration-150
                              ${selectedTime === t
                                ? "bg-gradient-to-br from-cyan-500 to-blue-600 text-white"
                                : "bg-white/5 border border-white/8 text-gray-300 hover:bg-white/10 hover:border-cyan-400/30"}
                            `}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.button
                  onClick={handleConfirm}
                  disabled={!selectedDate || !selectedTime}
                  whileHover={selectedDate && selectedTime ? { scale: 1.02 } : {}}
                  whileTap={selectedDate && selectedTime ? { scale: 0.98 } : {}}
                  className={`
                    w-full py-3 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 transition-all
                    ${selectedDate && selectedTime
                      ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white cursor-pointer"
                      : "bg-white/5 text-gray-600 cursor-not-allowed"}
                  `}
                >
                  Continue <ArrowRight size={14} />
                </motion.button>
              </motion.div>
            )}

            {/* ── Step: Form ── */}
            {step === "form" && (
              <motion.div
                key="form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="p-5 sm:p-7"
              >
                <button
                  onClick={() => setStep("calendar")}
                  className="flex items-center gap-1.5 text-gray-500 hover:text-cyan-400 text-xs font-mono mb-5 transition-colors"
                >
                  <ArrowLeft size={13} /> back
                </button>

                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-cyan-500/8 border border-cyan-400/15 mb-5 w-fit max-w-full overflow-hidden">
                  <Calendar size={12} className="text-cyan-400 shrink-0" />
                  <span className="text-cyan-300 text-[11px] font-mono truncate">
                    {dateLabel} · {selectedTime}
                  </span>
                </div>

                <h3 className="font-bold text-white text-sm mb-1">Almost there</h3>
                <p className="text-gray-500 text-xs mb-5">Tell me a bit about you and your project.</p>

                <div className="flex flex-col gap-3">
                  <div>
                    <label className="text-gray-500 text-[11px] font-mono mb-1.5 block">Your name *</label>
                    <input
                      type="text"
                      placeholder="e.g. Alex Johnson"
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-gray-600
                        focus:outline-none focus:border-cyan-400/40 focus:bg-white/8 transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-gray-500 text-[11px] font-mono mb-1.5 block">Your email *</label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-gray-600
                        focus:outline-none focus:border-cyan-400/40 focus:bg-white/8 transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-gray-500 text-[11px] font-mono mb-1.5 block">Project details</label>
                    <textarea
                      rows={3}
                      placeholder="What are you building? What do you need help with?"
                      value={form.project}
                      onChange={e => setForm(f => ({ ...f, project: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-gray-600
                        focus:outline-none focus:border-cyan-400/40 focus:bg-white/8 transition-all resize-none"
                    />
                  </div>
                </div>

                <motion.button
                  onClick={handleSubmit}
                  disabled={!form.name || !form.email || sending}
                  whileHover={form.name && form.email ? { scale: 1.02 } : {}}
                  whileTap={form.name && form.email ? { scale: 0.98 } : {}}
                  className={`
                    mt-5 w-full py-3 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 transition-all
                    ${form.name && form.email
                      ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white cursor-pointer"
                      : "bg-white/5 text-gray-600 cursor-not-allowed"}
                  `}
                >
                  {sending ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    <>Send booking request <Send size={13} /></>
                  )}
                </motion.button>

                <p className="text-gray-600 text-[10px] text-center mt-2.5 font-mono">
                  Your request will be sent directly to Sarthak.
                </p>
              </motion.div>
            )}

            {/* ── Step: Done ── */}
            {step === "done" && (
              <motion.div
                key="done"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="p-8 sm:p-12 flex flex-col items-center text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                  className="w-14 h-14 rounded-full bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center mb-5"
                >
                  <Check size={24} className="text-cyan-400" />
                </motion.div>
                <h3 className="font-black text-white text-xl mb-2">Request sent!</h3>
                <p className="text-gray-400 text-sm leading-relaxed max-w-xs mb-2">
                  Your booking request for{" "}
                  <span className="text-cyan-300 font-mono">{dateLabel} · {selectedTime}</span>{" "}
                  has been emailed to Sarthak.
                </p>
                <p className="text-gray-600 text-xs mb-7 font-mono">
                  Expect a confirmation within 24 hrs.
                </p>
                <motion.button
                  onClick={onClose}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-7 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-sm"
                >
                  Done
                </motion.button>
              </motion.div>
            )}

          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function FreelancePage() {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <>
      <AnimatePresence>
        {bookingOpen && <BookingModal onClose={() => setBookingOpen(false)} />}
      </AnimatePresence>

      <main className="relative min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">

        <div className="pointer-events-none fixed inset-0 z-0">
          <div className="absolute top-[-10%] left-[-5%] w-[280px] h-[280px] sm:w-[480px] sm:h-[480px] bg-cyan-500/10 rounded-full blur-[80px] sm:blur-[120px]" />
          <div className="absolute bottom-[10%] right-[-5%] w-[240px] h-[240px] sm:w-[400px] sm:h-[400px] bg-blue-600/10 rounded-full blur-[70px] sm:blur-[120px]" />
          <div className="absolute top-[50%] left-[40%] w-[200px] h-[200px] sm:w-[320px] sm:h-[320px] bg-indigo-500/8 rounded-full blur-[60px] sm:blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">

          {/* ── Back button ── */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 sm:mb-10"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-gray-500 hover:text-cyan-400 text-xs sm:text-sm font-mono transition-colors group"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              back to portfolio
            </Link>
          </motion.div>

          {/* ── Hero ── */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="mb-4 inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 rounded-full
              bg-white/5 border border-cyan-400/20 backdrop-blur-xl"
          >
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-cyan-300 text-[10px] sm:text-xs tracking-widest uppercase font-mono">
              Available for freelance
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="mt-5 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.08] tracking-tight"
          >
            I build{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500 bg-clip-text text-transparent">
              intelligent
            </span>
            <br />
            software.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.35 }}
            className="mt-5 text-gray-400 text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed"
          >
            AI agents, RAG systems, full-stack web apps, and data pipelines —
            engineered to production standard, shipped without friction.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.7 }}
            className="mt-7 flex flex-col xs:flex-row gap-3 sm:gap-4"
          >
            <motion.button
              onClick={() => setBookingOpen(true)}
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(34,211,238,0.4)" }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-2xl
                bg-gradient-to-r from-cyan-500 to-blue-600
                text-white font-semibold text-sm shadow-xl cursor-pointer w-full xs:w-auto"
            >
              <Calendar size={15} /> Book a meeting
            </motion.button>
            <motion.a
              href="#services"
              whileHover={{ scale: 1.03, backgroundColor: "rgba(255,255,255,0.06)" }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-2xl
                border border-white/15 bg-white/5 backdrop-blur-xl
                text-gray-300 font-semibold text-sm w-full xs:w-auto"
            >
              See services <ExternalLink size={13} />
            </motion.a>
          </motion.div>

          {/* ── Services grid ── */}
          <section id="services" className="mt-20 sm:mt-28 scroll-mt-20">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-8 sm:mb-12"
            >
              <p className="text-[10px] sm:text-xs font-mono tracking-widest text-cyan-400/70 uppercase mb-2 sm:mb-3">
                // services
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight">
                What I can build for you
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {services.map((s, i) => (
                <motion.div
                  key={s.label}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className={`group relative rounded-2xl border ${s.border}
                    bg-white/[0.03] backdrop-blur-sm p-5 sm:p-6
                    hover:bg-white/[0.06] transition-colors duration-300`}
                >
                  <span className={`font-mono text-[10px] sm:text-xs ${s.tagColor} mb-2 sm:mb-3 block`}>
                    {s.tag}
                  </span>
                  <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl ${s.glow} flex items-center justify-center mb-3 sm:mb-4`}>
                    <s.icon size={18} className={s.color} />
                  </div>
                  <h3 className="font-bold text-base sm:text-lg text-white mb-2">{s.label}</h3>
                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-5">
                    {s.description}
                  </p>
                  <ul className="space-y-1 sm:space-y-1.5">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-xs sm:text-sm text-gray-500">
                        <span className={`mt-1 w-1 h-1 rounded-full ${s.color.replace("text-", "bg-")} shrink-0`} />
                        {b}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </section>

          {/* ── Process ── */}
          <section className="mt-20 sm:mt-28">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-8 sm:mb-12"
            >
              <p className="text-[10px] sm:text-xs font-mono tracking-widest text-cyan-400/70 uppercase mb-2 sm:mb-3">
                // how it works
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight">
                Simple. Fast. Shipped.
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              {process.map((p, i) => (
                <motion.div
                  key={p.step}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="relative rounded-2xl border border-white/8
                    bg-white/[0.03] p-5 sm:p-6 flex flex-col gap-3 sm:gap-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-cyan-500/10 flex items-center justify-center shrink-0">
                      <p.icon size={16} className="text-cyan-400" />
                    </div>
                    <span className="font-mono text-[10px] sm:text-xs text-cyan-400/50">0{i + 1}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm sm:text-base mb-1">{p.step}</h3>
                    <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">{p.desc}</p>
                  </div>
                  {i < process.length - 1 && (
                    <div className="hidden sm:block absolute top-1/2 -right-3 w-6 h-px bg-cyan-400/20" />
                  )}
                </motion.div>
              ))}
            </div>
          </section>

          {/* ── CTA ── */}
          <section id="contact" className="mt-20 sm:mt-28">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative rounded-2xl sm:rounded-3xl border border-cyan-400/15
                bg-gradient-to-br from-white/5 to-white/[0.01]
                backdrop-blur-xl p-7 sm:p-10 lg:p-16 text-center overflow-hidden"
            >
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="w-[280px] h-[140px] sm:w-[400px] sm:h-[200px] bg-cyan-500/10 rounded-full blur-[60px] sm:blur-[80px]" />
              </div>

              <div className="relative z-10">
                <p className="text-[10px] sm:text-xs font-mono tracking-widest text-cyan-400/70 uppercase mb-3 sm:mb-4">
                  // let's build
                </p>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4 sm:mb-5">
                  Got a project in mind?
                </h2>
                <p className="text-gray-400 text-sm sm:text-base lg:text-lg max-w-xl mx-auto mb-7 sm:mb-10 leading-relaxed">
                  Whether it's an AI agent, a web app, or an automation pipeline —
                  book a call or drop a message and let's figure it out.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
                  <motion.button
                    onClick={() => setBookingOpen(true)}
                    whileHover={{ scale: 1.06, boxShadow: "0 0 40px rgba(34,211,238,0.45)" }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center justify-center gap-2 sm:gap-3 px-7 sm:px-9 py-3.5 sm:py-4 rounded-2xl
                      bg-gradient-to-r from-cyan-500 to-blue-600
                      text-white font-semibold text-sm sm:text-base shadow-xl cursor-pointer w-full sm:w-auto"
                  >
                    <Calendar size={16} /> Book a meeting
                  </motion.button>
                  <motion.a
                    href="mailto:sarthakag2004@gmail.com"
                    whileHover={{ scale: 1.03, backgroundColor: "rgba(255,255,255,0.08)" }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center justify-center gap-2 sm:gap-3 px-7 sm:px-9 py-3.5 sm:py-4 rounded-2xl
                      border border-white/15 bg-white/5 backdrop-blur-xl
                      text-gray-300 font-semibold text-sm sm:text-base w-full sm:w-auto"
                  >
                    <Mail size={16} /> Email me
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </section>

        </div>
      </main>
    </>
  );
}