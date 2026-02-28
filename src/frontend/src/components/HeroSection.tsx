import { Button } from "@/components/ui/button";
import { ArrowRight, Briefcase, TrendingUp, Users } from "lucide-react";
import { motion } from "motion/react";

interface HeroSectionProps {
  onFindTalent: () => void;
  onFindJob: () => void;
}

const stats = [
  { icon: Users, value: "2,400+", label: "Placements Made" },
  { icon: Briefcase, value: "850+", label: "Client Companies" },
  { icon: TrendingUp, value: "96%", label: "Satisfaction Rate" },
];

export default function HeroSection({
  onFindTalent,
  onFindJob,
}: HeroSectionProps) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('/assets/generated/hero-banner.dim_1400x600.jpg')",
        }}
      />

      {/* Overlay */}
      <div className="hero-overlay absolute inset-0" />

      {/* Decorative geometric shapes */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full opacity-10 blur-3xl bg-electric" />
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full opacity-8 blur-3xl bg-teal" />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-electric/40 bg-electric/10 backdrop-blur-sm text-electric-light text-sm font-medium mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-electric animate-pulse" />
          Now Placing Top IT Professionals
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-display font-bold text-5xl md:text-6xl lg:text-7xl text-white leading-[1.05] tracking-tight mb-6"
        >
          Connect with <span className="text-gradient">Top IT Talent</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="text-lg md:text-xl text-white/75 max-w-2xl mx-auto leading-relaxed mb-10"
        >
          Bridging the gap between exceptional technology professionals and
          forward-thinking companies. We make the right connections — fast,
          precise, and built to last.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <Button
            onClick={onFindTalent}
            size="lg"
            className="bg-electric hover:bg-electric-light text-white shadow-glow hover:shadow-glow transition-all duration-300 text-base px-8 h-14 font-semibold group"
          >
            Find Talent
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            onClick={onFindJob}
            size="lg"
            variant="outline"
            className="border-white/40 text-white bg-white/8 backdrop-blur-sm hover:bg-white/15 hover:border-white/60 text-base px-8 h-14 font-semibold"
          >
            Browse Open Jobs
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="grid grid-cols-3 gap-4 md:gap-8 max-w-lg mx-auto"
        >
          {stats.map(({ icon: Icon, value, label }) => (
            <div key={label} className="text-center">
              <div className="flex justify-center mb-2">
                <Icon className="w-5 h-5 text-electric" />
              </div>
              <div className="font-display font-bold text-2xl md:text-3xl text-white">
                {value}
              </div>
              <div className="text-xs md:text-sm text-white/60 mt-0.5">
                {label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/40 text-xs tracking-widest uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="w-0.5 h-8 bg-gradient-to-b from-electric/60 to-transparent rounded-full"
        />
      </motion.div>
    </section>
  );
}
