import {
  Cpu,
  Factory,
  Globe,
  HeartPulse,
  Landmark,
  Shield,
  ShoppingCart,
  Truck,
} from "lucide-react";
import { motion } from "motion/react";

const industries = [
  {
    icon: Landmark,
    name: "Finance & Banking",
    desc: "FinTech, trading systems, compliance",
  },
  {
    icon: HeartPulse,
    name: "Healthcare & MedTech",
    desc: "EHR, telehealth, data security",
  },
  { icon: Cpu, name: "Technology", desc: "SaaS, cloud infrastructure, AI/ML" },
  {
    icon: ShoppingCart,
    name: "Retail & eCommerce",
    desc: "Digital transformation, logistics",
  },
  {
    icon: Shield,
    name: "Government & Defense",
    desc: "Cleared talent, secure systems",
  },
  {
    icon: Factory,
    name: "Manufacturing",
    desc: "Automation, IoT, supply chain",
  },
  {
    icon: Globe,
    name: "Media & Telecom",
    desc: "Streaming, networks, digital ops",
  },
  {
    icon: Truck,
    name: "Logistics & Supply Chain",
    desc: "WMS, TMS, fleet systems",
  },
];

export default function IndustriesSection() {
  return (
    <section id="industries" className="section-padding bg-navy">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-electric/20 text-electric-light text-sm font-semibold tracking-wide uppercase mb-4">
            Industries
          </span>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
            Expertise Across Every Sector
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            From regulated industries to fast-moving startups, we understand the
            unique IT challenges you face.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {industries.map((industry, i) => {
            const Icon = industry.icon;
            return (
              <motion.div
                key={industry.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                whileHover={{ y: -4 }}
                className="group relative rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 cursor-default hover:bg-white/10 hover:border-electric/40 transition-all duration-300"
              >
                <div className="mb-4 w-12 h-12 rounded-xl bg-electric/20 flex items-center justify-center group-hover:bg-electric/30 transition-colors duration-300">
                  <Icon className="w-6 h-6 text-electric-light" />
                </div>
                <h3 className="font-semibold text-white text-sm mb-1 leading-tight">
                  {industry.name}
                </h3>
                <p className="text-white/50 text-xs leading-relaxed">
                  {industry.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
