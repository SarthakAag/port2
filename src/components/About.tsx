

"use client";

import { motion, Variants, easeOut } from "framer-motion";
import Image from "next/image";
import CodeBackground from "@/components/CodeBackground";

const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: easeOut },
  },
};

const stats = [
  { id: 1, label: "Projects Completed", value: "2+" },
  { id: 2, label: "Years Experience", value: "1+" },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-12 gap-16"
    >
      <CodeBackground />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative max-w-6xl w-full flex flex-col md:flex-row items-center gap-10 text-center md:text-left"
      >
        {/* Image Section */}
        <motion.div
          variants={item}
          className="flex-shrink-0"
        >
          <div className="rounded-3xl overflow-hidden shadow-xl border-2 border-cyan-400/40">
            <Image
              src="/image.png" // put your image here
              alt="About Me"
              width={400}
              height={400}
              className="object-cover"
            />
          </div>
        </motion.div>

        {/* Text Content */}
        <motion.div
          variants={item}
          className="bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-xl border border-white/20 flex flex-col gap-6 flex-1"
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 80 }}
        >
          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 
            bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 
            bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(0,180,255,0.8)]"
          >
            About Me
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-gray-200 leading-relaxed">
            I’m a{" "}
            <span className="text-cyan-400 font-semibold">
              Full Stack Developer
            </span>{" "}
            and{" "}
            <span className="text-blue-400 font-semibold">Data Analyst</span>{" "}
            passionate about creating dynamic web applications and deriving
            insights from complex data...
          </p>

          {/* Statistics */}
          <div className="grid grid-cols-2 sm:flex sm:justify-center gap-6 mt-6">
            {stats.map((stat) => (
              <motion.div
                key={stat.id}
                variants={item}
                className="bg-black/20 backdrop-blur-md rounded-xl p-6 flex flex-col items-center justify-center shadow-lg border border-white/10 hover:scale-105 transition-transform duration-300 w-36 sm:w-40"
              >
                <p className="text-2xl sm:text-3xl font-bold text-cyan-400">
                  {stat.value}
                </p>
                <p className="text-sm sm:text-base text-gray-300 text-center mt-1">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
