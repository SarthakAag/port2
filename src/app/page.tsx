import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import About from "@/components/About";
import Skills from "@/components/Skills"; // ✅ new
import CodeBackground from "@/components/CodeBackground";
import CodeSection from "@/components/CodeSection";
import ExperienceSection from "@/components/ExperienceSection";
import ContactSection from "@/components/ContactSection";

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
       
        <Skills /> {/* ✅ added */}
        <CodeSection />   {/* ✅ New Code Section */}
        <ExperienceSection />
        <ContactSection />
        {/* 🚀 Future sections: Projects, Contact, Footer */}
      </div>
    </main>
  );
}

