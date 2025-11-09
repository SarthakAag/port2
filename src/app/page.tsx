import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import About from "@/components/About";
import Skills from "@/components/Skills";
import CodeBackground from "@/components/CodeBackground";
import CodeSection from "@/components/CodeSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsCertificatesSection from "@/components/ProjectsCertificatesSection"; // ✅ Add this
import ContactSection from "@/components/ContactSection";
import ChatWidget from '@/components/chat/ChatWidget';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Shared Background Layer for ALL sections */}
      <CodeBackground />

      {/* Foreground */}
      <div className="relative z-10 space-y-24">
        <Navbar />
        <HeroSection />
        <About />
        <Skills />
        <CodeSection />
        <ExperienceSection />
        <ProjectsCertificatesSection /> {/* ✅ Add this */}
        <ContactSection />
        
        {/* Add chatbot - it will appear as a fixed button */}
        <ChatWidget />
      </div>
    </main>
  );
}