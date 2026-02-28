import { Clock, Layers, UserCheck } from "lucide-react";
import { motion } from "motion/react";

const services = [
  {
    icon: Clock,
    title: "Contract Staffing",
    description:
      "Flexible, short-to-medium term IT professionals ready to plug in and deliver. Ideal for project surges, seasonal demands, or specialized skills you need now.",
    highlights: ["Rapid deployment", "Pre-vetted talent", "Flexible terms"],
    color: "from-blue-500/20 to-electric/10",
  },
  {
    icon: UserCheck,
    title: "Permanent Placement",
    description:
      "We find the right permanent hire — not just technically qualified, but a cultural fit who will grow with your organization for the long term.",
    highlights: ["Deep screening", "Culture alignment", "90-day guarantee"],
    color: "from-teal/20 to-blue-400/10",
    featured: true,
  },
  {
    icon: Layers,
    title: "Project Consulting",
    description:
      "End-to-end project delivery with senior consultants and technical leads who bring structure, expertise, and accountability to your most critical initiatives.",
    highlights: ["Senior experts", "Delivery focus", "Full accountability"],
    color: "from-purple-500/20 to-electric/10",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="section-padding bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-electric/10 text-electric text-sm font-semibold tracking-wide uppercase mb-4">
            What We Do
          </span>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-4">
            Staffing Solutions Built for Scale
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Whether you need a single specialist or an entire delivery team, we
            have the model to match your needs.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className={`relative group rounded-2xl border bg-card p-8 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 ${
                  service.featured
                    ? "border-electric/40 ring-1 ring-electric/20"
                    : "border-border"
                }`}
              >
                {service.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-3 py-1 rounded-full bg-electric text-white text-xs font-bold tracking-wide">
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Icon */}
                <div
                  className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} mb-6`}
                >
                  <Icon className="w-7 h-7 text-electric" />
                </div>

                <h3 className="font-display font-bold text-xl text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Highlights */}
                <ul className="space-y-2">
                  {service.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex items-center gap-2 text-sm text-foreground/80"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-electric flex-shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
