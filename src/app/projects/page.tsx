"use client";

import { motion } from "framer-motion";
import { Award, FolderKanban, Download, ArrowLeft } from "lucide-react";
import Link from "next/link";
import CodeBackground from "@/components/CodeBackground";

const projects = [
  {
    title: "Portfolio Website",
    description: "A modern responsive portfolio with 3D elements and animations.",
    link: "https://github.com/SarthakAag/port2",
  },
  {
    title: "Data Analytics Dashboard",
    description: "Dashboard for visualizing insights from data with interactive charts.",
    link: "#",
  },
];

const certificates = [
  {
    name: "Essential for Personal Finance",
    issuer: "Nergy Vidya",
    year: "2025",
    link: "/certificates/nergy.pdf",
  },
  {
    name: "Introduction to Data Analyst",
    issuer: "CourseEra",
    year: "2024",
    link: "/certificates/dataanalyst.pdf",
  },
  {
    name: "Data Science",
    issuer: "Coursera",
    year: "2024",
    link: "/certificates/datascience.pdf",
  },
];

export default function ProjectsPage() {
  return (
    <section className="relative min-h-screen px-6 sm:px-12 py-16 text-white overflow-hidden">
      {/* ✅ Shared background with Hero */}
      <CodeBackground />

      {/* ✅ Gradient Back Arrow to Home */}
      <div className="absolute top-6 left-6 z-20">
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 px-4 py-2 rounded-lg shadow-lg border border-gray-700 transition duration-300"
        >
          <ArrowLeft size={20} />
        </Link>
      </div>

      {/* Foreground content */}
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col gap-16">
        
        {/* Certificates Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="flex items-center gap-3 text-3xl sm:text-4xl font-bold mb-6 text-cyan-400">
            <Award className="text-blue-400" /> Certificates
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {certificates.map((cert, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-r from-gray-900/80 to-gray-800/80 p-6 rounded-xl shadow-lg border border-gray-700 backdrop-blur-sm flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xl font-semibold text-cyan-300">{cert.name}</h3>
                  <p className="text-gray-400">
                    {cert.issuer} • {cert.year}
                  </p>
                </div>
                {/* ✅ Download Button */}
                <a
                  href={cert.link}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white px-4 py-2 rounded-lg shadow-md transition"
                >
                  <Download size={18} /> Download
                </a>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Projects Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h2 className="flex items-center gap-3 text-3xl sm:text-4xl font-bold mb-6 text-indigo-400">
            <FolderKanban className="text-cyan-400" /> Projects
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {projects.map((project, idx) => (
              <motion.a
                key={idx}
                href={project.link}
                target="_blank"
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-r from-gray-900/80 to-gray-800/80 p-6 rounded-xl shadow-lg border border-gray-700 backdrop-blur-sm block"
              >
                <h3 className="text-xl font-semibold text-indigo-300">{project.title}</h3>
                <p className="text-gray-400">{project.description}</p>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}


