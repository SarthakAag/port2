"use client";

import Link from "next/link";
import {
  motion,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";

import { useState } from "react";

import {
  Home,
  User,
  FolderKanban,
  Mail,
  Menu,
  X,
  Briefcase,
} from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const [hidden, setHidden] = useState(false);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;

    if (latest > previous && latest > 80) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const links = [
    {
      href: "#page",
      label: "Home",
      icon: <Home size={20} />,
    },
    {
      href: "#about",
      label: "About",
      icon: <User size={20} />,
    },
    {
      href: "#experience",
      label: "Experience",
      icon: <FolderKanban size={20} />,
    },
    {
      href: "#contact",
      label: "Contact",
      icon: <Mail size={20} />,
    },
    {
      href: "/freelance",
      label: "Freelance",
      icon: <Briefcase size={20} />,
    },
  ];

  return (
    <>
      {/* Navbar */}
      <motion.nav
        initial={{
          y: -100,
          opacity: 0,
        }}
        animate={{
          y: hidden ? -100 : 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.35,
          ease: "easeInOut",
        }}
        className="
        fixed top-4 left-1/2 -translate-x-1/2
        w-[95%] sm:w-[92%] lg:w-[82%]
        z-50
      "
      >
        <div
          className="
          flex items-center justify-between
          px-5 sm:px-8 py-4
          rounded-full
          bg-black/30
          backdrop-blur-2xl
          border border-white/10
          shadow-[0_8px_32px_rgba(0,0,0,0.35)]
        "
        >
          {/* Logo */}
          <motion.h1
            whileHover={{
              scale: 1.08,
            }}
            whileTap={{
              scale: 0.95,
            }}
            className="
            font-extrabold
            text-xl sm:text-2xl md:text-3xl
            bg-gradient-to-r
            from-cyan-400
            via-blue-400
            to-purple-500
            bg-clip-text
            text-transparent
            cursor-pointer
          "
          >
            DataDrivenDesign
          </motion.h1>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8 lg:gap-10">
            {links.map((link, i) => (
              <motion.div
                key={i}
                whileHover={{
                  y: -2,
                }}
                whileTap={{
                  scale: 0.95,
                }}
                className="
                group
                relative
                flex items-center gap-2
              "
              >
                {/* Icon */}
                <motion.span
                  whileHover={{
                    rotate: 10,
                    scale: 1.15,
                  }}
                  className="
                  text-gray-300
                  group-hover:text-cyan-400
                  transition-all duration-300
                "
                >
                  {link.icon}
                </motion.span>

                {/* Link */}
                <Link
                  href={link.href}
                  className="
                  relative
                  text-gray-300
                  font-medium
                  group-hover:text-cyan-400
                  transition-all duration-300
                "
                >
                  {link.label}

                  <span
                    className="
                    absolute
                    left-0
                    -bottom-1
                    w-0
                    h-[2px]
                    bg-gradient-to-r
                    from-cyan-400
                    to-blue-500
                    transition-all duration-300
                    group-hover:w-full
                  "
                  />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Mobile Button */}
          <button
            aria-label="Toggle menu"
            onClick={() => setIsOpen(!isOpen)}
            className="
            md:hidden
            p-2
            rounded-full
            bg-white/10
            border border-white/10
            text-white
          "
          >
            {isOpen ? (
              <X size={24} />
            ) : (
              <Menu size={24} />
            )}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      {isOpen && (
        <motion.div
          initial={{
            x: "100%",
          }}
          animate={{
            x: 0,
          }}
          exit={{
            x: "100%",
          }}
          transition={{
            type: "spring",
            stiffness: 120,
          }}
          className="
          fixed top-0 right-0
          h-screen
          w-[75%] sm:w-[45%]
          z-40

          bg-black/90
          backdrop-blur-2xl
          border-l border-white/10

          flex flex-col
          items-center
          justify-center
          gap-8
        "
        >
          {links.map((link, i) => (
            <motion.div
              key={i}
              whileHover={{
                scale: 1.05,
                x: 5,
              }}
              whileTap={{
                scale: 0.95,
              }}
              className="
              flex items-center gap-3
              px-8 py-4
              rounded-2xl
              bg-white/5
              border border-white/5
              hover:bg-white/10
            "
            >
              <span className="text-cyan-400">
                {link.icon}
              </span>

              <Link
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="
                text-white
                text-lg
                hover:text-cyan-400
                transition-colors
              "
              >
                {link.label}
              </Link>
            </motion.div>
          ))}
        </motion.div>
      )}
    </>
  );
}