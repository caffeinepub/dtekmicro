import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, Briefcase, Calendar, MapPin } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useGetAllJobs } from "../hooks/useQueries";
import type { Job } from "../hooks/useQueries";

interface JobsSectionProps {
  onApply: (jobTitle: string) => void;
}

const jobTypeColors: Record<string, string> = {
  "Full-time": "bg-green-500/15 text-green-700 border-green-500/30",
  "Part-time": "bg-yellow-500/15 text-yellow-700 border-yellow-500/30",
  Contract: "bg-blue-500/15 text-blue-700 border-blue-500/30",
  Remote: "bg-purple-500/15 text-purple-700 border-purple-500/30",
  Hybrid: "bg-teal-500/15 text-teal-700 border-teal-500/30",
};

function JobCard({
  job,
  onApply,
}: { job: Job; onApply: (title: string) => void }) {
  const colorClass =
    jobTypeColors[job.jobType] ??
    "bg-muted text-muted-foreground border-border";

  const postedDate = new Date(Number(job.posted) / 1_000_000);
  const daysAgo = Math.floor(
    (Date.now() - postedDate.getTime()) / (1000 * 60 * 60 * 24),
  );
  const postedLabel =
    daysAgo === 0 ? "Today" : daysAgo === 1 ? "Yesterday" : `${daysAgo}d ago`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5 }}
      className="group rounded-2xl border border-border bg-card p-6 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-display font-bold text-lg text-foreground truncate group-hover:text-electric transition-colors duration-200">
            {job.title}
          </h3>
        </div>
        <Badge
          className={`flex-shrink-0 text-xs font-semibold border ${colorClass} bg-opacity-100`}
        >
          {job.jobType}
        </Badge>
      </div>

      {/* Meta */}
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground mb-4">
        <span className="flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5" />
          {job.location}
        </span>
        <span className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5" />
          {postedLabel}
        </span>
      </div>

      {/* Description */}
      <p className="text-muted-foreground text-sm leading-relaxed mb-5 line-clamp-2">
        {job.description}
      </p>

      {/* Skills */}
      <div className="flex flex-wrap gap-2 mb-5">
        {job.skills.slice(0, 5).map((skill) => (
          <span
            key={skill}
            className="px-2.5 py-1 rounded-full bg-electric/8 border border-electric/20 text-electric text-xs font-medium"
          >
            {skill}
          </span>
        ))}
        {job.skills.length > 5 && (
          <span className="px-2.5 py-1 rounded-full bg-muted text-muted-foreground text-xs font-medium">
            +{job.skills.length - 5}
          </span>
        )}
      </div>

      {/* Apply button */}
      <Button
        onClick={() => onApply(job.title)}
        size="sm"
        className="w-full bg-electric hover:bg-electric-light text-white group-hover:shadow-glow-sm transition-all duration-300"
      >
        Apply Now
        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </Button>
    </motion.div>
  );
}

function JobSkeleton() {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <div className="flex justify-between mb-3">
        <Skeleton className="h-6 w-2/3" />
        <Skeleton className="h-5 w-20 rounded-full" />
      </div>
      <div className="flex gap-4 mb-4">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-4 w-20" />
      </div>
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-4/5 mb-5" />
      <div className="flex gap-2 mb-5">
        <Skeleton className="h-7 w-16 rounded-full" />
        <Skeleton className="h-7 w-20 rounded-full" />
        <Skeleton className="h-7 w-14 rounded-full" />
      </div>
      <Skeleton className="h-9 w-full rounded-lg" />
    </div>
  );
}

export default function JobsSection({ onApply }: JobsSectionProps) {
  const { data: jobs, isLoading } = useGetAllJobs();
  const [filter, setFilter] = useState<string>("All");

  const jobTypes = jobs
    ? ["All", ...Array.from(new Set(jobs.map((j) => j.jobType))).sort()]
    : ["All"];

  const filteredJobs = jobs
    ? filter === "All"
      ? jobs
      : jobs.filter((j) => j.jobType === filter)
    : [];

  return (
    <section id="jobs" className="section-padding bg-muted/40">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-electric/10 text-electric text-sm font-semibold tracking-wide uppercase mb-4">
            Open Positions
          </span>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-4">
            Find Your Next Role
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore current openings across top companies. New roles added
            weekly.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        {!isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap gap-2 justify-center mb-10"
          >
            {jobTypes.map((type) => (
              <button
                type="button"
                key={type}
                onClick={() => setFilter(type)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric ${
                  filter === type
                    ? "bg-electric text-white shadow-glow-sm"
                    : "bg-card border border-border text-muted-foreground hover:border-electric/40 hover:text-electric"
                }`}
              >
                <Briefcase className="inline w-3.5 h-3.5 mr-1.5 -mt-0.5" />
                {type}
                {type !== "All" && jobs && (
                  <span className="ml-1.5 text-xs opacity-70">
                    ({jobs.filter((j) => j.jobType === type).length})
                  </span>
                )}
                {type === "All" && jobs && (
                  <span className="ml-1.5 text-xs opacity-70">
                    ({jobs.length})
                  </span>
                )}
              </button>
            ))}
          </motion.div>
        )}

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            <>
              <JobSkeleton key="s0" />
              <JobSkeleton key="s1" />
              <JobSkeleton key="s2" />
              <JobSkeleton key="s3" />
              <JobSkeleton key="s4" />
              <JobSkeleton key="s5" />
            </>
          ) : (
            filteredJobs.map((job) => (
              <JobCard key={job.id.toString()} job={job} onApply={onApply} />
            ))
          )}
        </div>

        {!isLoading && filteredJobs.length === 0 && (
          <div className="text-center py-16">
            <Briefcase className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
            <p className="text-muted-foreground text-lg">
              No {filter} positions currently open.
            </p>
            <p className="text-muted-foreground/70 text-sm mt-1">
              Check back soon or submit your profile.
            </p>
            <Button
              onClick={() => setFilter("All")}
              variant="outline"
              className="mt-4"
            >
              View All Jobs
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
