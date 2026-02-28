import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Loader2, Send } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useSubmitApplication } from "../hooks/useQueries";

export default function CandidateApplySection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    skills: "",
    coverMessage: "",
  });
  const [jobTitle, setJobTitle] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const { mutateAsync, isPending } = useSubmitApplication();

  // Listen for job title events from Jobs section
  useEffect(() => {
    const handler = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      setJobTitle(customEvent.detail);
    };
    window.addEventListener("setApplyJobTitle", handler);
    return () => window.removeEventListener("setApplyJobTitle", handler);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.skills) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      const skillsList = form.skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      const message = jobTitle
        ? `Applying for: ${jobTitle}\n\n${form.coverMessage}`
        : form.coverMessage;

      await mutateAsync({
        name: form.name,
        email: form.email,
        phone: form.phone,
        skills: skillsList,
        coverMessage: message,
      });

      setSubmitted(true);
      setForm({ name: "", email: "", phone: "", skills: "", coverMessage: "" });
      setJobTitle("");
      toast.success("Application submitted successfully!");
    } catch {
      toast.error("Failed to submit application. Please try again.");
    }
  };

  return (
    <section id="apply" className="section-padding bg-navy">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-electric/20 text-electric-light text-sm font-semibold tracking-wide uppercase mb-4">
            Candidates
          </span>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
            Apply Now
          </h2>
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            Submit your profile and let us connect you with the right
            opportunity. Our recruiters review every application personally.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 md:p-10"
        >
          {submitted ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/20 mb-6">
                <CheckCircle className="w-10 h-10 text-green-400" />
              </div>
              <h3 className="font-display font-bold text-2xl text-white mb-3">
                Application Received!
              </h3>
              <p className="text-white/60 max-w-sm mx-auto mb-8">
                Thank you for applying. A recruiter will review your profile and
                reach out within 2 business days.
              </p>
              <Button
                onClick={() => setSubmitted(false)}
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10"
              >
                Submit Another Application
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {jobTitle && (
                <div className="px-4 py-3 rounded-xl bg-electric/15 border border-electric/30 text-electric-light text-sm">
                  <strong>Applying for:</strong> {jobTitle}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="apply-name"
                    className="text-white/80 font-medium"
                  >
                    Full Name <span className="text-electric">*</span>
                  </Label>
                  <Input
                    id="apply-name"
                    value={form.name}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, name: e.target.value }))
                    }
                    placeholder="Jane Smith"
                    required
                    className="bg-white/8 border-white/20 text-white placeholder:text-white/30 focus:border-electric focus:ring-electric/30"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="apply-email"
                    className="text-white/80 font-medium"
                  >
                    Email <span className="text-electric">*</span>
                  </Label>
                  <Input
                    id="apply-email"
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, email: e.target.value }))
                    }
                    placeholder="jane@example.com"
                    required
                    className="bg-white/8 border-white/20 text-white placeholder:text-white/30 focus:border-electric focus:ring-electric/30"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="apply-phone"
                  className="text-white/80 font-medium"
                >
                  Phone Number
                </Label>
                <Input
                  id="apply-phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, phone: e.target.value }))
                  }
                  placeholder="+1 (555) 000-0000"
                  className="bg-white/8 border-white/20 text-white placeholder:text-white/30 focus:border-electric focus:ring-electric/30"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="apply-skills"
                  className="text-white/80 font-medium"
                >
                  Key Skills <span className="text-electric">*</span>
                </Label>
                <Input
                  id="apply-skills"
                  value={form.skills}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, skills: e.target.value }))
                  }
                  placeholder="React, TypeScript, Node.js, AWS (comma-separated)"
                  required
                  className="bg-white/8 border-white/20 text-white placeholder:text-white/30 focus:border-electric focus:ring-electric/30"
                />
                <p className="text-white/40 text-xs">
                  Separate skills with commas
                </p>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="apply-message"
                  className="text-white/80 font-medium"
                >
                  Cover Message
                </Label>
                <Textarea
                  id="apply-message"
                  value={form.coverMessage}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, coverMessage: e.target.value }))
                  }
                  placeholder="Tell us about your experience, what you're looking for, and why you'd be a great fit..."
                  rows={5}
                  className="bg-white/8 border-white/20 text-white placeholder:text-white/30 focus:border-electric focus:ring-electric/30 resize-none"
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
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 w-4 h-4" />
                    Submit Application
                  </>
                )}
              </Button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
