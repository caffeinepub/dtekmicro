import { Zap } from "lucide-react";
import { SiGithub, SiLinkedin, SiX } from "react-icons/si";

interface FooterProps {
  onNavigate: (id: string) => void;
}

const navGroups = [
  {
    title: "Services",
    links: [
      { label: "Contract Staffing", id: "services" },
      { label: "Permanent Placement", id: "services" },
      { label: "Project Consulting", id: "services" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", id: "about" },
      { label: "How It Works", id: "how-it-works" },
      { label: "Industries", id: "industries" },
    ],
  },
  {
    title: "Talent",
    links: [
      { label: "Browse Jobs", id: "jobs" },
      { label: "Apply Now", id: "apply" },
      { label: "Contact Us", id: "contact" },
    ],
  },
];

export default function Footer({ onNavigate }: FooterProps) {
  const year = new Date().getFullYear();
  const hostname = encodeURIComponent(window.location.hostname);

  return (
    <footer className="bg-navy-dark border-t border-white/10">
      {/* Main Footer */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-2 space-y-5">
            <button
              type="button"
              onClick={() => onNavigate("hero")}
              className="flex items-center gap-2 group"
            >
              <div className="w-8 h-8 bg-electric rounded-lg flex items-center justify-center shadow-glow-sm group-hover:shadow-glow transition-shadow duration-300">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-display font-bold text-xl text-white tracking-tight">
                DTek<span className="text-electric">Micro</span>
              </span>
            </button>

            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              Connecting exceptional IT professionals with the companies that
              need them most. Building technology teams since 2012.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {[
                { Icon: SiLinkedin, label: "LinkedIn", href: "#" },
                { Icon: SiX, label: "X (Twitter)", href: "#" },
                { Icon: SiGithub, label: "GitHub", href: "#" },
              ].map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg border border-white/15 bg-white/5 flex items-center justify-center text-white/50 hover:text-electric hover:border-electric/40 hover:bg-electric/10 transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Nav groups */}
          {navGroups.map((group) => (
            <div key={group.title} className="space-y-4">
              <h4 className="font-semibold text-white text-sm tracking-wide uppercase">
                {group.title}
              </h4>
              <ul className="space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <button
                      type="button"
                      onClick={() => onNavigate(link.id)}
                      className="text-white/50 text-sm hover:text-electric transition-colors duration-200 focus-visible:outline-none focus-visible:text-electric"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/35 text-xs text-center sm:text-left">
            © {year} DTekMicro. All rights reserved.
          </p>
          <p className="text-white/30 text-xs text-center">
            Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-electric/60 hover:text-electric transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
