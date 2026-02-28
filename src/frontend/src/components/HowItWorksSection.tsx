import { FileText, Rocket, Search, Users } from "lucide-react";
import { motion } from "motion/react";

const steps = [
  {
    number: "01",
    icon: FileText,
    title: "Submit Your Request",
    description:
      "Tell us what you need — the role, skills, timeline, and any special requirements. Our intake process is quick and thorough.",
  },
  {
    number: "02",
    icon: Search,
    title: "We Source Talent",
    description:
      "Our specialist recruiters search our vetted network and tap new talent pipelines to surface the best candidates within 48 hours.",
  },
  {
    number: "03",
    icon: Users,
    title: "Interview & Select",
    description:
      "Review curated shortlists, conduct interviews, and choose your ideal candidate. We handle scheduling and coordination.",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Onboard & Launch",
    description:
      "We manage paperwork, compliance, and onboarding logistics so your new team member can hit the ground running from day one.",
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="section-padding bg-background">
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
            Process
          </span>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From request to onboarding in as little as one week. Our streamlined
            process ensures speed without sacrificing quality.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-electric/40 to-transparent" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  className="relative flex flex-col items-center text-center"
                >
                  {/* Step circle */}
                  <div className="relative mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-electric flex items-center justify-center shadow-glow-sm">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-foreground flex items-center justify-center">
                      <span className="text-background text-xs font-bold">
                        {i + 1}
                      </span>
                    </div>
                  </div>

                  {/* Step number label */}
                  <div className="text-electric/50 text-xs font-mono tracking-widest mb-2">
                    STEP {step.number}
                  </div>

                  <h3 className="font-display font-bold text-lg text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-14"
        >
          <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-electric/8 border border-electric/20 text-sm text-foreground/80">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Average time-to-hire:{" "}
            <strong className="text-electric ml-1">5–7 business days</strong>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
