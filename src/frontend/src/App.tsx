import { Toaster } from "@/components/ui/sonner";
import { useRef } from "react";
import AboutSection from "./components/AboutSection";
import CandidateApplySection from "./components/CandidateApplySection";
import ContactSection from "./components/ContactSection";
import EmployerInquirySection from "./components/EmployerInquirySection";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import HowItWorksSection from "./components/HowItWorksSection";
import IndustriesSection from "./components/IndustriesSection";
import JobsSection from "./components/JobsSection";
import ServicesSection from "./components/ServicesSection";
import TestimonialsSection from "./components/TestimonialsSection";
import { useInitializeSampleData } from "./hooks/useQueries";

export default function App() {
  useInitializeSampleData();
  const applyRef = useRef<HTMLDivElement>(null);
  const applyJobTitleRef = useRef<string>("");

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleApplyForJob = (jobTitle: string) => {
    applyJobTitleRef.current = jobTitle;
    scrollToSection("apply");
    // Small delay to allow scroll before setting job title
    setTimeout(() => {
      const event = new CustomEvent("setApplyJobTitle", { detail: jobTitle });
      window.dispatchEvent(event);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-background font-body">
      <Toaster position="top-right" richColors />
      <Header onNavigate={scrollToSection} />
      <main>
        <HeroSection
          onFindTalent={() => scrollToSection("employer")}
          onFindJob={() => scrollToSection("jobs")}
        />
        <ServicesSection />
        <IndustriesSection />
        <HowItWorksSection />
        <JobsSection onApply={handleApplyForJob} />
        <div ref={applyRef}>
          <CandidateApplySection />
        </div>
        <EmployerInquirySection />
        <TestimonialsSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer onNavigate={scrollToSection} />
    </div>
  );
}
