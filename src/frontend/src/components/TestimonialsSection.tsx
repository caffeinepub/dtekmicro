import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useGetAllTestimonials } from "../hooks/useQueries";
import type { Testimonial } from "../hooks/useQueries";

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const initials = testimonial.author
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="h-full flex flex-col">
      <Quote className="w-8 h-8 text-electric/60 mb-4 flex-shrink-0" />
      <blockquote className="text-foreground/80 text-base md:text-lg leading-relaxed flex-1 italic mb-6">
        "{testimonial.quote}"
      </blockquote>
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-full bg-electric/20 border border-electric/30 flex items-center justify-center flex-shrink-0">
          <span className="text-electric font-bold text-sm">{initials}</span>
        </div>
        <div>
          <div className="font-semibold text-foreground text-sm">
            {testimonial.author}
          </div>
          <div className="text-muted-foreground text-xs">
            {testimonial.company}
          </div>
        </div>
      </div>
    </div>
  );
}

function TestimonialSkeleton() {
  return (
    <div className="rounded-2xl border border-border bg-card p-8 h-64">
      <Skeleton className="h-6 w-6 mb-4 rounded" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-3/4 mb-8" />
      <div className="flex items-center gap-3">
        <Skeleton className="w-11 h-11 rounded-full" />
        <div className="space-y-1.5">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-3 w-20" />
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const { data: testimonials, isLoading } = useGetAllTestimonials();
  const [current, setCurrent] = useState(0);

  const total = testimonials?.length ?? 0;
  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  return (
    <section id="testimonials" className="section-padding bg-muted/40">
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
            Testimonials
          </span>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-4">
            What Our Clients Say
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Don't take our word for it — here's what companies and candidates
            say about working with TechTalent.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TestimonialSkeleton key="tskel-0" />
            <TestimonialSkeleton key="tskel-1" />
            <TestimonialSkeleton key="tskel-2" />
          </div>
        ) : testimonials && testimonials.length > 0 ? (
          <>
            {/* Desktop: grid */}
            <div className="hidden md:grid grid-cols-3 gap-6">
              {testimonials.map((t, i) => (
                <motion.div
                  key={t.id.toString()}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="rounded-2xl border border-border bg-card p-8 shadow-card hover:shadow-card-hover transition-all duration-300"
                >
                  <TestimonialCard testimonial={t} />
                </motion.div>
              ))}
            </div>

            {/* Mobile: carousel */}
            <div className="md:hidden relative">
              <div className="overflow-hidden rounded-2xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.3 }}
                    className="rounded-2xl border border-border bg-card p-8 shadow-card min-h-64"
                  >
                    <TestimonialCard testimonial={testimonials[current]} />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Mobile nav */}
              {total > 1 && (
                <div className="flex items-center justify-center gap-4 mt-6">
                  <button
                    type="button"
                    onClick={prev}
                    className="w-10 h-10 rounded-full border border-border bg-card flex items-center justify-center hover:border-electric hover:text-electric transition-all duration-200"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <div className="flex gap-2">
                    {testimonials.map((t, i) => (
                      <button
                        type="button"
                        key={t.id.toString()}
                        onClick={() => setCurrent(i)}
                        className={`transition-all duration-200 rounded-full ${
                          i === current
                            ? "w-6 h-2 bg-electric"
                            : "w-2 h-2 bg-muted hover:bg-electric/40"
                        }`}
                        aria-label={`Go to testimonial ${i + 1}`}
                      />
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={next}
                    className="w-10 h-10 rounded-full border border-border bg-card flex items-center justify-center hover:border-electric hover:text-electric transition-all duration-200"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No testimonials yet. Check back soon!
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
