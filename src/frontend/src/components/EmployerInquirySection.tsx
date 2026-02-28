import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Building2, CheckCircle, Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useSubmitInquiry } from "../hooks/useQueries";

const benefits = [
  "48-hour talent shortlist",
  "Pre-vetted, reference-checked candidates",
  "Dedicated account manager",
  "90-day placement guarantee",
  "Flexible staffing models",
  "Volume discounts available",
];

export default function EmployerInquirySection() {
  const [form, setForm] = useState({
    companyName: "",
    contactName: "",
    email: "",
    roleNeeded: "",
    details: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const { mutateAsync, isPending } = useSubmitInquiry();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !form.companyName ||
      !form.contactName ||
      !form.email ||
      !form.roleNeeded
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      await mutateAsync(form);
      setSubmitted(true);
      setForm({
        companyName: "",
        contactName: "",
        email: "",
        roleNeeded: "",
        details: "",
      });
      toast.success("Inquiry submitted! We'll be in touch shortly.");
    } catch {
      toast.error("Failed to submit inquiry. Please try again.");
    }
  };

  return (
    <section id="employer" className="section-padding bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-electric/10 text-electric text-sm font-semibold tracking-wide uppercase mb-4">
            Employers
          </span>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-4">
            Find Talent for Your Team
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Tell us what you need and we'll have qualified candidates in front
            of you within 48 hours.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Left: Benefits */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h3 className="font-display font-bold text-2xl text-foreground mb-2">
                Why Choose TechTalent?
              </h3>
              <p className="text-muted-foreground">
                We don't just fill roles — we find people who make a difference.
              </p>
            </div>

            <ul className="space-y-3">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-electric/15 border border-electric/30 flex items-center justify-center flex-shrink-0">
                    <ArrowRight className="w-3 h-3 text-electric" />
                  </div>
                  <span className="text-foreground/80 text-sm">{benefit}</span>
                </li>
              ))}
            </ul>

            {/* Stat cards */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              {[
                { value: "48hrs", label: "Average Response" },
                { value: "92%", label: "Fill Rate" },
              ].map(({ value, label }) => (
                <div
                  key={label}
                  className="rounded-xl border border-electric/20 bg-electric/5 p-5 text-center"
                >
                  <div className="font-display font-bold text-3xl text-electric mb-1">
                    {value}
                  </div>
                  <div className="text-muted-foreground text-sm">{label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-2xl border border-border bg-card p-8 shadow-card"
          >
            {submitted ? (
              <div className="text-center py-10">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/10 border border-green-500/20 mb-6">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="font-display font-bold text-2xl text-foreground mb-3">
                  Inquiry Received!
                </h3>
                <p className="text-muted-foreground max-w-xs mx-auto mb-8">
                  A dedicated account manager will reach out within 4 business
                  hours to discuss your needs.
                </p>
                <Button onClick={() => setSubmitted(false)} variant="outline">
                  Submit Another Inquiry
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-electric/10 flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-electric" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-foreground">
                      Employer Inquiry
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Tell us about your hiring needs
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="emp-company">
                      Company Name <span className="text-electric">*</span>
                    </Label>
                    <Input
                      id="emp-company"
                      value={form.companyName}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, companyName: e.target.value }))
                      }
                      placeholder="Acme Corp"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emp-contact">
                      Your Name <span className="text-electric">*</span>
                    </Label>
                    <Input
                      id="emp-contact"
                      value={form.contactName}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, contactName: e.target.value }))
                      }
                      placeholder="John Doe"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emp-email">
                    Work Email <span className="text-electric">*</span>
                  </Label>
                  <Input
                    id="emp-email"
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, email: e.target.value }))
                    }
                    placeholder="john@acmecorp.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emp-role">
                    Role Needed <span className="text-electric">*</span>
                  </Label>
                  <Input
                    id="emp-role"
                    value={form.roleNeeded}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, roleNeeded: e.target.value }))
                    }
                    placeholder="e.g., Senior React Developer, DevOps Engineer"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emp-details">Additional Details</Label>
                  <Textarea
                    id="emp-details"
                    value={form.details}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, details: e.target.value }))
                    }
                    placeholder="Timeline, required skills, team size, remote/onsite preference..."
                    rows={4}
                    className="resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full h-12 bg-electric hover:bg-electric-light text-white shadow-glow-sm hover:shadow-glow transition-all duration-300 font-semibold"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Submit Inquiry
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </>
                  )}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
