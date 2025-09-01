

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { Home, User, FolderKanban, Mail, Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: "#page", label: "Home", icon: <Home size={20} /> },
    { href: "#about", label: "About", icon: <User size={20} /> },
    { href: "#skills", label: "Skills", icon: <FolderKanban size={20} /> },
    { href: "#contact", label: "Contact", icon: <Mail size={20} /> },
  ];

  return (
    <nav className="relative w-full flex items-center justify-between px-4 sm:px-6 lg:px-12 py-4 bg-black/40 backdrop-blur-md text-white shadow-lg z-50">
      {/* Left Logo */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        className="font-extrabold text-xl sm:text-2xl md:text-3xl tracking-wide bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent cursor-pointer"
      >
        DataDrivenDesign
      </motion.h1>

      {/* Desktop Links on Right */}
      <div className="hidden md:flex space-x-6 lg:space-x-10 text-base lg:text-lg font-medium ml-auto">
        {links.map((link, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            className="flex items-center space-x-2 cursor-pointer group"
          >
            <motion.span
              whileHover={{ scale: 1.3, rotate: 10 }}
              className="text-gray-300 group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-500 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500"
            >
              {link.icon}
            </motion.span>
            <Link
              href={link.href}
              className="relative transition-colors duration-500 group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-500 group-hover:bg-clip-text group-hover:text-transparent"
            >
              {link.label}
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-500 group-hover:w-full"></span>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Mobile Menu Button */}
      <button
        aria-label="Toggle menu"
        className="md:hidden fixed top-4 right-4 z-50 text-white p-2 rounded-full bg-black/50 backdrop-blur-md shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={26} /> : <Menu size={26} />}
      </button>

      {/* Mobile Drawer */}
      {isOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", stiffness: 80 }}
          className="fixed top-0 right-0 h-screen w-2/3 sm:w-1/3 bg-black flex flex-col items-center justify-center space-y-6 text-lg sm:text-xl shadow-2xl z-40"
        >
          {links.map((link, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-3 cursor-pointer group px-8 py-4 rounded-xl transition-all duration-300 hover:bg-gray-900"
            >
              <motion.span
                whileHover={{ scale: 1.3, rotate: 10 }}
                className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent"
              >
                {link.icon}
              </motion.span>
              <Link
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-white group-hover:text-cyan-400 transition-colors duration-300"
              >
                {link.label}
              </Link>
            </motion.div>
          ))}
        </motion.div>
      )}
    </nav>
  );
}
