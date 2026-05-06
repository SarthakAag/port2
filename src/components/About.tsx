"use client";

import Image from "next/image";
import {
  motion,
  Variants,
  easeOut,
  easeInOut,
} from "framer-motion";

import {
  Code2,
  Database,
  Sparkles,
  Rocket,
  ArrowRight,
} from "lucide-react";

import CodeBackground from "@/components/CodeBackground";

const container: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 60,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: easeOut,
    },
  },
};

const floatingAnimation = {
  y: [0, -12, 0],
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: easeInOut,
  },
};

const stats = [
  {
    id: 1,
    label: "Projects Completed",
    value: "6+",
    icon: Rocket,
  },
  {
    id: 2,
    label: "Years Experience",
    value: "1+",
    icon: Sparkles,
  },
  {
    id: 3,
    label: "Technologies",
    value: "10+",
    icon: Code2,
  },
];

const skills = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "MongoDB",
  "Python",
  "Tailwind",
  "SQL",
];

export default function About() {
  return (
    <section
      id="about"
      className="relative min-h-screen overflow-hidden px-6 py-24 lg:px-16 flex items-center justify-center"
    >
      {/* Background */}
      <CodeBackground />

      {/* Glow Effects */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/20 blur-3xl rounded-full" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-500/20 blur-3xl rounded-full" />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative z-10 max-w-7xl w-full grid lg:grid-cols-2 gap-16 items-center"
      >
        {/* LEFT SIDE */}
        <motion.div
          variants={fadeUp}
          animate={floatingAnimation}
          className="relative flex justify-center"
        >
          {/* Rotating Circle */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] rounded-full border border-cyan-400/30 border-dashed"
          />

          {/* Main Image */}
          <motion.div
            whileHover={{
              scale: 1.05,
              rotate: 1,
            }}
            transition={{
              type: "spring",
              stiffness: 120,
            }}
            className="relative rounded-[2rem] overflow-hidden border border-white/20 shadow-[0_0_60px_rgba(0,255,255,0.25)]"
          >
            <Image
              src="/image.png"
              alt="About Me"
              width={420}
              height={500}
              className="object-cover"
              priority
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </motion.div>

          {/* Floating Card 1 */}
          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: easeInOut,
            }}
            className="absolute -top-5 -left-5 bg-white/10 backdrop-blur-xl border border-white/20 px-4 py-3 rounded-2xl shadow-xl"
          >
            <div className="flex items-center gap-2">
              <Code2
                className="text-cyan-400"
                size={20}
              />

              <p className="text-sm text-white font-medium">
                Full Stack Developer
              </p>
            </div>
          </motion.div>

          {/* Floating Card 2 */}
          <motion.div
            animate={{
              y: [0, 12, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: easeInOut,
            }}
            className="absolute bottom-5 -right-5 bg-white/10 backdrop-blur-xl border border-white/20 px-4 py-3 rounded-2xl shadow-xl"
          >
            <div className="flex items-center gap-2">
              <Database
                className="text-blue-400"
                size={20}
              />

              <p className="text-sm text-white font-medium">
                Data Analyst
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* RIGHT SIDE */}
        <motion.div
          variants={fadeUp}
          className="relative bg-white/10 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 sm:p-10 shadow-[0_0_60px_rgba(0,0,0,0.4)]"
        >
          {/* Small Tag */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              delay: 0.2,
              duration: 0.8,
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-400/20 mb-6"
          >
            <Sparkles
              size={18}
              className="text-cyan-400"
            />

            <span className="text-cyan-300 text-sm font-medium tracking-wide">
              ABOUT ME
            </span>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{
              delay: 0.5,
              duration: 1,
            }}
            className="text-gray-300 text-lg leading-relaxed"
          >
            I’m a passionate{" "}
            <span className="text-cyan-400 font-semibold">
              Full Stack Developer
            </span>{" "}
            and{" "}
            <span className="text-blue-400 font-semibold">
              Data Analyst
            </span>{" "}
            who loves building interactive, scalable, and visually engaging web
            applications. I enjoy transforming complex problems into elegant
            digital solutions with modern technologies.
          </motion.p>

          {/* Skills */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            className="flex flex-wrap gap-3 mt-8"
          >
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                whileHover={{
                  scale: 1.1,
                  y: -5,
                }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                }}
                className="px-4 py-2 rounded-full bg-white/10 border border-white/10 text-gray-200 text-sm shadow-lg hover:border-cyan-400/40 transition-all"
              >
                {skill}
              </motion.div>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            className="grid grid-cols-2 sm:grid-cols-3 gap-5 mt-10"
          >
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <motion.div
                  key={stat.id}
                  variants={fadeUp}
                  whileHover={{
                    scale: 1.05,
                    y: -6,
                  }}
                  className="relative overflow-hidden rounded-2xl bg-black/30 border border-white/10 p-6 backdrop-blur-xl group"
                >
                  {/* Glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <Icon
                    className="text-cyan-400 mb-3"
                    size={28}
                  />

                  <h3 className="text-3xl font-bold text-white">
                    {stat.value}
                  </h3>

                  <p className="text-gray-400 text-sm mt-1">
                    {stat.label}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* CTA BUTTON */}
          <motion.a
            href="#contact"
            whileHover={{
              scale: 1.05,
              boxShadow:
                "0px 0px 25px rgba(0,255,255,0.5)",
            }}
            whileTap={{
              scale: 0.95,
            }}
            transition={{
              type: "spring",
              stiffness: 200,
            }}
            className="mt-10 inline-flex items-center gap-2 px-7 py-4 rounded-2xl 
            bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold 
            shadow-lg group cursor-pointer"
          >
            Let’s Connect

            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}