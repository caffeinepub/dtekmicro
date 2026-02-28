import { BarChart3, Handshake, Lightbulb, Shield } from "lucide-react";
import { motion } from "motion/react";

const values = [
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "We continuously evolve our sourcing methods, screening tools, and client workflows to stay ahead of a changing market.",
  },
  {
    icon: Shield,
    title: "Integrity",
    description:
      "We operate with full transparency — with clients, with candidates, and with ourselves. No games, no bait-and-switch.",
  },
  {
    icon: BarChart3,
    title: "Results",
    description:
      "We measure success by your success. Placements that stick, projects that deliver, and relationships that last.",
  },
  {
    icon: Handshake,
    title: "Partnership",
    description:
      "We're not a transactional vendor — we're a strategic partner invested in the long-term growth of your team.",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="section-padding bg-navy">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          {/* Left: Story */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block px-3 py-1 rounded-full bg-electric/20 text-electric-light text-sm font-semibold tracking-wide uppercase mb-6">
              About TechTalent
            </span>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-6 leading-tight">
              Built by Technologists,{" "}
              <span className="text-gradient">for Technologists</span>
            </h2>
            <div className="space-y-4 text-white/65 leading-relaxed">
              <p>
                Founded in 2012 by a team of engineering leaders and HR
                professionals, TechTalent was born from frustration with
                traditional recruiting — slow, generic, and disconnected from
                how technology teams actually work.
              </p>
              <p>
                Today, we specialize exclusively in IT and technology staffing
                across North America. Our recruiters come from engineering
                backgrounds, which means they understand what "strong Java
                developer" or "cloud-native architect" actually means — and can
                find the real ones.
              </p>
              <p>
                With over 2,400 successful placements and clients ranging from
                Fortune 500 enterprises to fast-growth startups, we've built one
                of the most trusted IT talent networks in the industry.
              </p>
            </div>

            {/* Team badges */}
            <div className="flex flex-wrap gap-3 mt-8">
              {[
                "12+ Years Experience",
                "400+ Clients Served",
                "Exclusively IT & Tech",
              ].map((b) => (
                <span
                  key={b}
                  className="px-4 py-2 rounded-full border border-electric/30 bg-electric/10 text-electric-light text-sm font-medium"
                >
                  {b}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right: Values */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-5"
          >
            {values.map((value, i) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group rounded-xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 hover:border-electric/30 transition-all duration-300"
                >
                  <div className="w-11 h-11 rounded-xl bg-electric/20 flex items-center justify-center mb-4 group-hover:bg-electric/30 transition-colors">
                    <Icon className="w-5 h-5 text-electric-light" />
                  </div>
                  <h3 className="font-display font-bold text-white text-base mb-2">
                    {value.title}
                  </h3>
                  <p className="text-white/55 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
