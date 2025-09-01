

"use client";

import { motion } from "framer-motion";
import { Github, Instagram, Mail, Linkedin } from "lucide-react";

export default function SocialSidebar() {
  const socials = [
    { href: "https://github.com/SarthakAag", icon: Github },
    { href: "https://www.instagram.com/sart_hak8215?igsh=MWd4Y2tuYTJ3Zno5ZA==", icon: Instagram },
    { href: "mailto:sarthakagar2012@gmail.com", icon: Mail },
    { href: "https://www.linkedin.com/in/sarthak-agarwal-0b1143281/", icon: Linkedin },
  ];

  return (
    <>
      {/* ✅ Desktop Sidebar */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="hidden md:flex fixed top-1/2 right-0 -translate-y-1/2 z-40 flex-col items-center gap-6 px-3 py-6"
      >
        {/* Vertical Text */}
        <motion.p
          whileHover={{ scale: 1.1 }}
          className="text-sm font-semibold tracking-widest rotate-180 [writing-mode:vertical-rl] bg-gradient-to-b from-cyan-400 via-blue-500 to-indigo-500 text-transparent bg-clip-text"
        >
          FOLLOW ME ON :
        </motion.p>

        {/* Line */}
        <div className="w-px h-10 bg-gradient-to-b from-cyan-400 via-blue-500 to-indigo-500"></div>

        {/* Icons */}
        <div className="flex flex-col gap-6">
          {socials.map((item, i) => (
            <motion.a
              key={i}
              href={item.href}
              target="_blank"
              whileHover={{ scale: 1.3, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
              className="transition-transform"
            >
              <item.icon
                size={28}
                strokeWidth={1.8}
                className="text-cyan-400 hover:text-blue-500 transition-colors"
              />
            </motion.a>
          ))}
        </div>
      </motion.div>

      {/* ✅ Mobile Bottom Bar */}
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex md:hidden fixed bottom-0 left-0 right-0 z-40 bg-black/60 backdrop-blur-md py-3 px-6 justify-center gap-8"
      >
        {socials.map((item, i) => (
          <motion.a
            key={i}
            href={item.href}
            target="_blank"
            whileHover={{ scale: 1.2, y: -4 }}
            whileTap={{ scale: 0.9 }}
            className="transition-transform"
          >
            <item.icon
              size={26}
              strokeWidth={1.8}
              className="text-cyan-400 hover:text-blue-500 transition-colors"
            />
          </motion.a>
        ))}
      </motion.div>
    </>
  );
}
