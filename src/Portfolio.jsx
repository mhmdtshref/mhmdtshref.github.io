import React, { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Github,
  Linkedin,
  Globe,
  MapPin,
  Phone,
  Download,
  ExternalLink,
  ArrowRight,
  Moon,
  Sun
} from "lucide-react";

// ──────────────────────────────────────────────────────────────────────────────
// Editable data: update this object to change content without touching the UI
// ──────────────────────────────────────────────────────────────────────────────
const data = {
  name: "Mohamed Sharif",
  title: "Full‑Stack JavaScript Engineer",
  tagline:
    "I build fast, reliable web apps with Next.js, Node.js, MongoDB & AWS.",
  summary:
    "6+ years of experience building, testing, and deploying production web apps. Comfortable across the stack with modern JavaScript tooling, cloud infrastructure, and pragmatic product thinking.",
  location: { city: "Hebron", country: "Palestine" },
  photoUrl: import.meta.env.BASE_URL + 'personal.png',
  contact: {
    email: "mhmdtshref@gmail.com",
    phone: "+970 56 029 090", // optional – replace or remove
  },
  social: {
    github: "https://github.com/mhmdtshref",
    linkedin: "https://www.linkedin.com/in/mhmdtshref/",
    x: "https://x.com/mhmdtshref",
    dribbble: "https://dribbble.com/mhmdtshref",
    website: "https://mhmdtshref.github.io/portfolio/", // legacy
  },
  highlights: [
    "Next.js",
    "React",
    "Node.js",
    "MongoDB & Atlas",
    "AWS (EC2, Lambda, API GW, CloudFront, S3)",
    "Vercel",
    "Clerk",
    "GitHub Actions",
    "Datadog",
    "HubSpot APIs",
    "Postgres",
  ],
  companies: [
    { name: "Kiitos / TAP Careers", href: "https://www.tapcareers.io/" },
    { name: "SUM", href: "https://www.sum.ae/" },
    { name: "fabric", href: "https://fabric.inc/" },
  ],
  experience: [
    {
      period: "2019 — Present",
      company: "Kiitos → TAP Careers",
      role: "Full‑Stack Developer (Remote)",
      points: [
        "Built features across a multi‑tenant platform for job matching and mentoring.",
        "Designed MongoDB schemas & Mongoose models; implemented vector search ($vectorSearch) and multi‑field filters for recommendations.",
        "Automated deployments with GitHub Actions; instrumented monitors & alerts with Datadog; integrated Slack webhooks.",
        "Auth with Clerk, file storage on S3, CDN via CloudFront; Next.js on Vercel for the front‑end.",
      ],
      stack: ["Next.js", "React", "Node.js", "MongoDB", "AWS", "Vercel", "Clerk", "Datadog"],
    },
    {
      period: "2018",
      company: "Gaza Sky Geeks (Code Camp)",
      role: "Full‑time Training (6 months)",
      points: [
        "Full‑stack fundamentals, agile teamwork, self‑learning mindset.",
        "Improved communication with native English mentors.",
      ],
      stack: ["JavaScript", "Node.js", "React"],
    },
    {
      period: "2018",
      company: "Founders & Coders",
      role: "International MVP Project (1 month)",
      points: [
        "Delivered an MVP with a distributed team and real client.",
        "Practiced client‑facing collaboration and delivery.",
      ],
      stack: ["JavaScript", "Node.js", "React"],
    },
  ],
  projects: [
    {
      name: "iMenu (QR Menu SaaS)",
      description:
        "A platform for restaurants to create & manage online menus with QR codes, theme library, and real‑time updates. Managers can switch themes (including holidays) without changing QR codes.",
      impact: [
        "Reduced menu change turnaround from days to minutes.",
        "Introduced template marketplace for developers (Handlebars/HTML).",
      ],
      stack: [
        "Next.js",
        "Node.js",
        "AWS Lambda",
        "CloudFront",
        "MongoDB",
        "Handlebars",
      ],
      links: [
        // { label: "Live", href: "https://…" },
        // { label: "Case Study", href: "#" },
      ],
      image: import.meta.env.BASE_URL + 'imenu.png',
    },
    {
      name: "TAP Careers (Full-Stack & AI Job Matching)",
      description:
        "End‑to‑end work on matching job seekers with roles using embeddings and vector search. Includes seeker preference filters, seniority, location, and availability logic.",
      impact: [
        "Improved candidate relevance via hybrid vector + boolean filtering.",
        "Added Slack/Vercel release notifications and health checks.",
      ],
      stack: ["Next.js", "MongoDB Atlas Vector", "Clerk", "Vercel", "Datadog"],
      links: [
        { label: "Website", href: "https://www.tapcareers.io/" },
      ],
      image: import.meta.env.BASE_URL + 'tapcareers.jpg',
    },
    {
      name: "SUM (Affiliate Deals Aggregator)",
      description:
        "Aggregates offers & coupon codes from multiple affiliate networks, with editorial tools for manual campaigns and events.",
      impact: [
        "Unified offers into a single searchable catalog with curation tools.",
      ],
      stack: ["React", "Node.js", "PostgreSQL/MongoDB", "REST APIs"],
      links: [
        { label: "Website", href: "https://www.sum.ae/" },
      ],
      image: import.meta.env.BASE_URL + 'sum.png',
    },
    {
      name: "RIS (Radiology Information System)",
      description:
        "Private system to manage patient journeys, staff assignments, and machine integrations (DICOM).",
      impact: [
        "Streamlined clinic operations with status tracking & role‑based workflows.",
      ],
      stack: ["Node.js", "React", "DICOM Integrations", "MongoDB"],
      links: [],
      image: import.meta.env.BASE_URL + 'ris-system.png',
    },
  ],
  education: [
    {
      school: "Palestine Polytechnic University (PPU)",
      degree: "B.Sc. in Computer Science",
      period: "2014 — 2018",
    },
    {
      school: "Hussain High School (Scientific)",
      degree: "Tawjihi — Scientific Stream",
      period: "2012 — 2014",
    },
  ],
  resumeUrl: import.meta.env.BASE_URL + 'Mohamed_Sharif_Resume.pdf',
};

// Small helpers
const cx = (...classes) => classes.filter(Boolean).join(" ");
const Section = ({ id, title, children }) => (
  <section id={id} className="scroll-mt-24 py-14 md:py-20">
    <div className="mx-auto max-w-6xl px-4">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">{title}</h2>
      </div>
      {children}
    </div>
  </section>
);

const NavLink = ({ href, children }) => (
  <a
    href={href}
    className="text-sm md:text-[15px] font-medium text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition"
  >
    {children}
  </a>
);

function useTheme() {
  const [dark, setDark] = useState(true);
  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [dark]);
  return { dark, setDark };
}

// ──────────────────────────────────────────────────────────────────────────────
// Main component
// ──────────────────────────────────────────────────────────────────────────────
export default function Portfolio() {
  const { dark, setDark } = useTheme();
  const years = useMemo(() => new Date().getFullYear() - 2019 + "+", []);

  return (
    <div className="min-h-screen bg-white text-black dark:bg-[#0b0d10] dark:text-white selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">
      {/* Top Nav */}
      <div className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-black/30 border-b border-black/5 dark:border-white/5">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <a href="#home" className="font-semibold tracking-tight">Mohamed Sharif</a>
          <nav className="hidden md:flex items-center gap-6">
            <NavLink href="#projects">Projects</NavLink>
            <NavLink href="#experience">Experience</NavLink>
            <NavLink href="#skills">Skills</NavLink>
            <NavLink href="#education">Education</NavLink>
            <NavLink href="#contact">Contact</NavLink>
          </nav>
          <div className="flex items-center gap-2">
            <a
              target='_blank'
              href={data.resumeUrl}
              className="hidden md:inline-flex items-center gap-2 rounded-xl border border-black/10 dark:border-white/10 px-3 py-2 text-sm hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition"
            >
              <Download className="h-4 w-4" /> <span>Resume</span>
            </a>
            <button
              className="inline-flex items-center justify-center rounded-xl border border-black/10 dark:border-white/10 p-2 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition"
              onClick={() => setDark((d) => !d)}
              aria-label="Toggle theme"
            >
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Hero */}
      <header id="home" className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-black/[.03] to-transparent dark:via-white/[.03]" />
        <div className="mx-auto max-w-6xl px-4 pt-16 md:pt-24 pb-10 md:pb-14">
          <div className="md:flex md:items-center md:gap-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <p className="text-sm uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">{data.title}</p>
            <h1 className="mt-3 text-3xl md:text-5xl font-semibold leading-tight">
              Hey, I’m <span className="underline decoration-4 decoration-black/20 dark:decoration-white/20 underline-offset-4">{data.name}</span>
            </h1>
            <p className="mt-4 text-lg md:text-xl text-gray-700 dark:text-gray-300">{data.tagline}</p>
            <p className="mt-4 text-[15px] leading-7 text-gray-600 dark:text-gray-300">{data.summary}</p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${data.contact.email}`}
                className="inline-flex items-center gap-2 rounded-xl bg-black text-white dark:bg-white dark:text-black px-4 py-2.5 text-sm hover:opacity-90 transition"
              >
                <Mail className="h-4 w-4" /> Contact
              </a>
              <a
                href={data.social.linkedin}
                target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-black/10 dark:border-white/10 px-4 py-2.5 text-sm hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition"
              >
                <Linkedin className="h-4 w-4" /> LinkedIn
              </a>
              <span className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                <MapPin className="h-4 w-4" /> {data.location.city}, {data.location.country}
              </span>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-2">
              {data.highlights.map((h) => (
                <span key={h} className="rounded-full border border-black/10 dark:border-white/10 px-3 py-1 text-[13px] text-gray-700 dark:text-gray-300">{h}</span>
              ))}
            </div>

            <div className="mt-6 text-sm text-gray-600 dark:text-gray-400">Professional experience: {years} years</div>
          </motion.div>

          {data.photoUrl && (
            <div className="mt-8 md:mt-0 md:flex-shrink-0">
              <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden ring-1 ring-black/10 dark:ring-white/10 shadow-2xl">
                <img src={data.photoUrl} alt={`${data.name} portrait`} className="h-full w-full object-cover" />
              </div>
            </div>
          )}
          </div>
        </div>
      </header>

      {/* Projects */}
      <Section id="projects" title="Featured Projects">
        <div className="grid md:grid-cols-2 gap-6">
          {data.projects.map((p) => (
            <article key={p.name} className="group overflow-hidden rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5">
              <div className="aspect-[16/9] overflow-hidden">
                <img src={p.image} alt={p.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]" />
              </div>
              <div className="p-5 md:p-6">
                <h3 className="text-lg md:text-xl font-semibold tracking-tight">{p.name}</h3>
                <p className="mt-2 text-[15px] leading-7 text-gray-600 dark:text-gray-300">{p.description}</p>
                {!!p.impact?.length && (
                  <ul className="mt-3 list-disc pl-5 text-[14px] text-gray-600 dark:text-gray-300">
                    {p.impact.map((i) => (
                      <li key={i}>{i}</li>
                    ))}
                  </ul>
                )}
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <span key={s} className="rounded-full bg-black/5 dark:bg-white/10 px-2.5 py-1 text-[12px] text-gray-700 dark:text-gray-200">{s}</span>
                  ))}
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {p.links?.map((l) => (
                    <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-[14px] font-medium text-gray-900 dark:text-gray-100 hover:underline">
                      {l.label} <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* Experience */}
      <Section id="experience" title="Experience">
        <div className="relative before:absolute before:left-4 md:before:left-1/2 before:top-0 before:h-full before:w-[2px] before:-translate-x-1/2 before:bg-black/10 dark:before:bg-white/10">
          <div className="space-y-10">
            {data.experience.map((e, idx) => (
              <div key={e.company} className={cx("relative grid md:grid-cols-2 gap-6 md:gap-10", idx % 2 === 1 ? "md:text-right" : "")}>
                <div className={cx("md:col-start-1", idx % 2 === 1 ? "md:order-2" : "") }>
                  <div className="text-xs uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">{e.period}</div>
                  <h3 className="mt-1 text-lg md:text-xl font-semibold">{e.company}</h3>
                  <div className="text-[15px] text-gray-600 dark:text-gray-300">{e.role}</div>
                  <ul className="mt-3 list-disc pl-5 text-[14px] text-gray-600 dark:text-gray-300">
                    {e.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {e.stack.map((s) => (
                      <span key={s} className="rounded-full bg-black/5 dark:bg-white/10 px-2.5 py-1 text-[12px] text-gray-700 dark:text-gray-200">{s}</span>
                    ))}
                  </div>
                </div>
                <div className={cx("md:col-start-2 flex items-start md:items-center", idx % 2 === 1 ? "md:order-1" : "") }>
                  <div className="relative mx-4 md:mx-0 w-8 h-8 rounded-full border-2 border-white dark:border-black bg-black/80 dark:bg-white/80" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Companies strip */}
        <div className="mt-10 rounded-2xl border border-black/10 dark:border-white/10 p-5">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-3">Worked with</div>
          <div className="flex flex-wrap items-center gap-4 md:gap-6">
            {data.companies.map((c) => (
              <a key={c.name} href={c.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm hover:underline">
                <Globe className="h-4 w-4" /> {c.name}
              </a>
            ))}
          </div>
        </div>
      </Section>

      {/* Skills */}
      <Section id="skills" title="Skills">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
          {data.highlights.map((h) => (
            <div key={h} className="rounded-xl border border-black/10 dark:border-white/10 p-4 text-[15px] text-gray-700 dark:text-gray-200 bg-white/70 dark:bg-white/5">
              {h}
            </div>
          ))}
        </div>
      </Section>

      {/* Education */}
      <Section id="education" title="Education">
        <div className="grid md:grid-cols-2 gap-6">
          {data.education.map((ed) => (
            <div key={ed.school} className="rounded-2xl border border-black/10 dark:border-white/10 p-5 bg-white/70 dark:bg-white/5">
              <div className="text-sm text-gray-500 dark:text-gray-400">{ed.period}</div>
              <div className="mt-1 text-lg font-semibold">{ed.school}</div>
              <div className="text-[15px] text-gray-700 dark:text-gray-300">{ed.degree}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* Contact */}
      <Section id="contact" title="Contact">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-black/10 dark:border-white/10 p-6 bg-white/70 dark:bg-white/5">
            <div className="space-y-3 text-[15px]">
              <a href={`mailto:${data.contact.email}`} className="flex items-center gap-2 hover:underline">
                <Mail className="h-4 w-4" /> {data.contact.email}
              </a>
              {data.contact.phone && (
                <a href={`tel:${data.contact.phone}`} className="flex items-center gap-2 hover:underline">
                  <Phone className="h-4 w-4" /> {data.contact.phone}
                </a>
              )}
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <MapPin className="h-4 w-4" /> {data.location.city}, {data.location.country}
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-black/10 dark:border-white/10 p-6 bg-white/70 dark:bg-white/5">
            <div className="grid grid-cols-2 gap-3 text-[15px]">
              <a href={data.social.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:underline">
                <Github className="h-4 w-4" /> GitHub
              </a>
              <a href={data.social.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:underline">
                <Linkedin className="h-4 w-4" /> LinkedIn
              </a>
              <a href={data.social.x} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:underline">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M18.244 2H21l-6.51 7.44L22 22h-6.79l-4.92-6.41L4.6 22H2l6.98-7.98L2 2h6.79l4.47 5.83L18.244 2Zm-2.383 18h2.1L8.22 4H6.046l9.815 16Z"/></svg>
                X (Twitter)
              </a>
              <a href={data.social.dribbble} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:underline">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M12 2a10 10 0 1 0 .001 20.001A10 10 0 0 0 12 2Zm6.32 4.273A8.49 8.49 0 0 1 19.5 12c0 .248-.012.493-.036.735a14.88 14.88 0 0 0-4.938-.349 22.61 22.61 0 0 0-.84-2.064c3.09-1.245 4.219-3.15 4.634-4.049Zm-1.9-1.583c-.37.766-1.323 2.328-3.92 3.4a21.9 21.9 0 0 0-3.02-4.422A8.47 8.47 0 0 1 16.42 4.69ZM8.76 3.9a20.4 20.4 0 0 1 3.1 4.534c-3.71 1.025-8.45 1.019-8.944 1.018A8.51 8.51 0 0 1 8.76 3.9ZM3.5 12c0-.082.002-.164.006-.246.532.003 6.095.011 10.02-1.27.26.536.484 1.093.671 1.665-3.005.9-5.76 3.006-7.643 6.37A8.49 8.49 0 0 1 3.5 12Zm3.264 7.129c1.71-3.03 4.07-5.02 6.892-5.89.576 2 .821 4.271.87 6.58a8.47 8.47 0 0 1-7.761-.69Zm9.196.387c-.047-2.062-.265-4.04-.76-5.809 1.48-.171 3.145-.107 4.971.251a8.51 8.51 0 0 1-4.21 5.558Z"/></svg>
                Dribbble
              </a>
              <a href={data.social.website} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:underline">
                <Globe className="h-4 w-4" /> Legacy Site
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <ArrowRight className="h-4 w-4" /> Available for full‑time remote roles & interesting SaaS collaborations.
        </div>
      </Section>

      <footer className="py-10 border-t border-black/5 dark:border-white/5">
        <div className="mx-auto max-w-6xl px-4 text-sm text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} {data.name}.
        </div>
      </footer>
    </div>
  );
}
