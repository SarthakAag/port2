

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Twitter, MapPin, Phone } from "lucide-react";
import CodeBackground from "@/components/CodeBackground";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("✅ Message sent successfully!");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("❌ Failed to send message.");
      }
    } catch (err) {
      setStatus("⚠️ Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen flex items-center justify-center py-16 sm:py-20 px-4 sm:px-6 text-white overflow-hidden"
    >
      {/* ✅ Background Animation */}
      <motion.div
        className="absolute inset-0 opacity-20 -z-10"
        animate={{ y: [0, -40, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      >
        <CodeBackground />
      </motion.div>

      <div className="max-w-6xl mx-auto w-full relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white via-blue-300 to-purple-300 bg-clip-text text-transparent">
            Let's Connect
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto px-4">
            Ready to collaborate on something amazing? Let's discuss your next project and bring your ideas to life.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <div className="bg-black/30 backdrop-blur-lg border border-white/20 rounded-2xl sm:rounded-3xl p-6 sm:p-8">
            <h3 className="text-xl sm:text-2xl font-semibold text-white mb-4 sm:mb-6">Send a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 mb-2 text-sm font-medium">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/5 border border-white/20 
                      rounded-lg sm:rounded-xl text-white placeholder-gray-400 focus:outline-none 
                      focus:border-blue-400 focus:bg-white/10 transition-all text-sm sm:text-base"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2 text-sm font-medium">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/5 border border-white/20 
                      rounded-lg sm:rounded-xl text-white placeholder-gray-400 focus:outline-none 
                      focus:border-blue-400 focus:bg-white/10 transition-all text-sm sm:text-base"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 mb-2 text-sm font-medium">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/5 border border-white/20 
                    rounded-lg sm:rounded-xl text-white placeholder-gray-400 focus:outline-none 
                    focus:border-blue-400 focus:bg-white/10 transition-all text-sm sm:text-base"
                  placeholder="Project collaboration"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2 text-sm font-medium">Message</label>
                <textarea
                  rows={5}
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/5 border border-white/20 
                    rounded-lg sm:rounded-xl text-white placeholder-gray-400 focus:outline-none 
                    focus:border-blue-400 focus:bg-white/10 transition-all resize-none text-sm sm:text-base"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-purple-600 
                  rounded-lg sm:rounded-xl font-semibold text-white shadow-lg shadow-blue-500/25 
                  hover:shadow-blue-500/40 transition-all duration-300 hover:scale-105 active:scale-95 
                  disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
            {status && <p className="mt-4 text-center text-sm">{status}</p>}
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            {/* Contact Details */}
            <div className="bg-black/30 backdrop-blur-lg border border-white/20 rounded-2xl sm:rounded-3xl p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-semibold text-white mb-4 sm:mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-blue-500/20 text-blue-400">
                    <Mail size={18} className="sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <p className="text-gray-300 text-xs sm:text-sm">Email</p>
                    <p className="text-white font-medium text-sm sm:text-base">sarthakagar2012@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-green-500/20 text-green-400">
                    <Phone size={18} className="sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <p className="text-gray-300 text-xs sm:text-sm">Phone</p>
                    <p className="text-white font-medium text-sm sm:text-base">+91 8299426750</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-purple-500/20 text-purple-400">
                    <MapPin size={18} className="sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <p className="text-gray-300 text-xs sm:text-sm">Location</p>
                    <p className="text-white font-medium text-sm sm:text-base">Chennai, Tamil Nadu</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Availability */}
            <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-lg border border-green-500/30 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-center">
              <div className="w-3 h-3 bg-green-400 rounded-full mx-auto mb-4 animate-pulse shadow-lg shadow-green-400/50"></div>
              <p className="text-white font-semibold mb-2 text-sm sm:text-base">Available for New Projects</p>
              <p className="text-gray-300 text-xs sm:text-sm"></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
