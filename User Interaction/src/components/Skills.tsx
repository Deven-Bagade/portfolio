import { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Terminal, Layers, Server, Database, Wrench, Brain, Sparkles } from 'lucide-react';

// ── Types ────────────────────────────────────────────────────────────────────
interface TechGroup {
  category: string;
  icon: React.ElementType;
  color: string;
  bg: string;
  border: string;
  tags: string[];
}

interface SoftSkill {
  title: string;
  blurb: string;
}

// ── Data ─────────────────────────────────────────────────────────────────────
const TECH_GROUPS: TechGroup[] = [
  {
    category: 'Languages',
    icon: Terminal,
    color: '#7c6fcd',
    bg: 'rgba(124,111,205,0.08)',
    border: 'rgba(124,111,205,0.22)',
    tags: ['Java', 'JavaScript', 'Python', 'C', 'Dart'],
  },
  {
    category: 'Frontend & Mobile',
    icon: Layers,
    color: '#3a8fc7',
    bg: 'rgba(58,143,199,0.08)',
    border: 'rgba(58,143,199,0.22)',
    tags: ['React.js', 'Flutter', 'Tailwind CSS', 'Android Studio'],
  },
  {
    category: 'Backend & APIs',
    icon: Server,
    color: '#2daa84',
    bg: 'rgba(45,170,132,0.08)',
    border: 'rgba(45,170,132,0.22)',
    tags: ['Node.js', 'Express.js', 'Flask', 'Firebase', 'REST APIs'],
  },
  {
    category: 'AI & Machine Learning',
    icon: Brain,
    color: '#d4913a',
    bg: 'rgba(212,145,58,0.08)',
    border: 'rgba(212,145,58,0.22)',
    tags: ['LLMs', 'Bayesian Networks', 'OpenCV', 'XGBoost', 'PGM'],
  },
  {
    category: 'DevOps & Tooling',
    icon: Wrench,
    color: '#c96060',
    bg: 'rgba(201,96,96,0.08)',
    border: 'rgba(201,96,96,0.22)',
    tags: ['Docker', 'Jenkins', 'Selenium', 'CI/CD', 'Git', 'Agile'],
  },
];

const ALL_TAGS = TECH_GROUPS.flatMap(g => g.tags.map(t => ({ tag: t, color: g.color, border: g.border, bg: g.bg })));

const SOFT_SKILLS: SoftSkill[] = [
  { title: 'Problem decomposer', blurb: 'I break complex systems into clear, buildable pieces before writing a single line.' },
  { title: 'Collaborator first', blurb: 'Cross-functional teams, async-friendly comms, zero silos.' },
  { title: 'Fast learner', blurb: 'New stack? Give me a weekend and a good README.' },
  { title: 'Detail-driven', blurb: 'Ownership over output — every edge case ships with the feature.' },
  { title: 'Agile practitioner', blurb: 'Iterative builds, quick pivots, continuous delivery mindset.' },
];

// ── Marquee ──────────────────────────────────────────────────────────────────
function Marquee() {
  const doubled = [...ALL_TAGS, ...ALL_TAGS];
  return (
    <div
      style={{
        overflow: 'hidden',
        maskImage: 'linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)',
        WebkitMaskImage: 'linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)',
        marginBottom: 48,
      }}
    >
      <motion.div
        style={{ display: 'flex', gap: 10, width: 'max-content' }}
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 32, ease: 'linear', repeat: Infinity }}
      >
        {doubled.map(({ tag, color, bg, border }, i) => (
          <span
            key={i}
            style={{
              fontFamily: "'DM Mono', monospace", // Labels / Tags font
              fontSize: 12,
              padding: '6px 14px',
              borderRadius: 999,
              border: `1px solid ${border}`,
              background: bg,
              color,
              whiteSpace: 'nowrap',
              fontWeight: 400,
              letterSpacing: '0.02em',
            }}
          >
            {tag}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// ── Tag chip ─────────────────────────────────────────────────────────────────
function Tag({ label, color, bg, border }: { label: string; color: string; bg: string; border: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.span
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={{ y: hovered ? -3 : 0, scale: hovered ? 1.04 : 1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      style={{
        fontFamily: "'DM Mono', monospace", // Labels / Tags font
        fontSize: 12,
        padding: '6px 14px',
        borderRadius: 8,
        border: `1px solid ${hovered ? color : border}`,
        background: hovered ? bg : 'rgba(255,255,255,0.03)',
        color: hovered ? color : 'rgba(255,255,255,0.55)',
        whiteSpace: 'nowrap',
        cursor: 'default',
        transition: 'color 0.2s, background 0.2s, border-color 0.2s',
        display: 'inline-block',
      }}
    >
      {label}
    </motion.span>
  );
}

// ── Group card ────────────────────────────────────────────────────────────────
function GroupCard({ group, index }: { group: TechGroup; index: number }) {
  const Icon = group.icon;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.15 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      style={{
        borderRadius: 20,
        border: '1px solid rgba(255,255,255,0.07)',
        background: 'rgba(255,255,255,0.03)',
        backdropFilter: 'blur(16px)',
        padding: '24px 24px 20px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* top shimmer */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        background: `linear-gradient(90deg,transparent,${group.color}44,transparent)`,
      }} />

      {/* header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
        <div style={{
          width: 34, height: 34, borderRadius: 10,
          background: group.bg,
          border: `1px solid ${group.border}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <Icon size={15} color={group.color} />
        </div>
        <span style={{
          fontFamily: "'DM Mono', monospace", // Labels / Tags font
          fontSize: 11,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: group.color,
          fontWeight: 500,
        }}>
          {group.category}
        </span>
      </div>

      {/* tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {group.tags.map(tag => (
          <Tag key={tag} label={tag} color={group.color} bg={group.bg} border={group.border} />
        ))}
      </div>
    </motion.div>
  );
}

// ── Soft skill card ───────────────────────────────────────────────────────────
function SoftCard({ skill, index }: { skill: SoftSkill; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.2 });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.55, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: 16,
        border: `1px solid ${hovered ? 'rgba(255,255,255,0.14)' : 'rgba(255,255,255,0.07)'}`,
        background: hovered ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.02)',
        padding: '20px 20px',
        transition: 'border-color 0.25s, background 0.25s',
        transform: hovered ? 'translateY(-4px)' : 'none',
        cursor: 'default',
      }}
    >
      {/* counter */}
      <span style={{
        fontFamily: "'DM Mono', monospace", // Labels / Tags font
        fontSize: 10,
        color: 'rgba(255,255,255,0.2)',
        letterSpacing: '0.1em',
        display: 'block',
        marginBottom: 10,
      }}>
        {String(index + 1).padStart(2, '0')}
      </span>

      <h4 style={{
        fontFamily: "'Cormorant Garamond', serif", // Headings / Titles font
        fontSize: 22,
        fontWeight: 600,
        color: '#f0f0f0',
        marginBottom: 8,
        lineHeight: 1.1,
      }}>
        {skill.title}
      </h4>
      <p style={{
        fontSize: 13,
        color: 'rgba(255,255,255,0.45)',
        lineHeight: 1.7,
        margin: 0,
        fontFamily: "'Outfit', sans-serif", // Body text font
        fontWeight: 300,
      }}>
        {skill.blurb}
      </p>
    </motion.div>
  );
}

// ── Section header ────────────────────────────────────────────────────────────
function SectionHeader({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{ textAlign: 'center', marginBottom: 48 }}
    >
      <span style={{
        fontFamily: "'DM Mono', monospace", // Labels / Tags font
        fontSize: 10,
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.3)',
        display: 'block',
        marginBottom: 14,
      }}>
        {eyebrow}
      </span>
      <h2 style={{
        fontFamily: "'Cormorant Garamond', serif", // Headings / Titles font
        fontSize: 'clamp(3rem, 6vw, 4.5rem)',
        fontWeight: 700,
        color: '#f5f5f5',
        letterSpacing: '-0.01em',
        lineHeight: 1.1,
        marginBottom: sub ? 16 : 0,
      }}>
        {title}
      </h2>
      {sub && (
        <p style={{
          fontFamily: "'Outfit', sans-serif", // Body text font
          fontWeight: 300,
          fontSize: 14,
          color: 'rgba(255,255,255,0.38)',
          maxWidth: 420,
          margin: '0 auto',
          lineHeight: 1.8,
          letterSpacing: '0.01em',
        }}>
          {sub}
        </p>
      )}
    </motion.div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export function Skills() {
  return (
    <section
      id="skills"
      style={{
        position: 'relative',
        overflow: 'hidden',
        padding: '120px 0 100px',
        background: '#080808',
        fontFamily: "'Outfit', sans-serif", // Base Body text font
      }}
    >
      {/* ── Google Fonts ── */}
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=Outfit:wght@100..900&display=swap" />

      {/* ── Background: fine dot grid ── */}
      <div style={{
        pointerEvents: 'none',
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
      }} />

      {/* ── Ambient halos ── */}
      <div style={{
        pointerEvents: 'none', position: 'absolute', inset: 0, zIndex: 0,
        background:
          'radial-gradient(ellipse 50% 40% at 20% 30%, rgba(124,111,205,0.06) 0%, transparent 70%),' +
          'radial-gradient(ellipse 40% 35% at 80% 70%, rgba(45,170,132,0.05) 0%, transparent 65%)',
      }} />

      <div style={{ position: 'relative', zIndex: 10, maxWidth: 1400, margin: '0 auto', padding: '0 clamp(16px, 4vw, 64px)' }}>

        {/* ── Header ── */}
        <SectionHeader
          eyebrow="Capabilities"
          title="Tools of the trade"
          sub="A living toolkit, shaped by real projects and an appetite for whatever comes next."
        />

        {/* ── Scrolling marquee ── */}
        <Marquee />

        {/* ── Tech groups grid ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 14,
          marginBottom: 72,
        }}>
          {TECH_GROUPS.map((group, i) => (
            <GroupCard key={group.category} group={group} index={i} />
          ))}
        </div>

        {/* ── Divider ── */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{
            height: 1,
            background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.08),transparent)',
            marginBottom: 72,
            transformOrigin: 'left center',
          }}
        />

        {/* ── Soft skills header ── */}
        <SectionHeader
          eyebrow="Beyond the stack"
          title="How I work"
        />

        {/* ── Soft skills grid ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 12,
        }}>
          {SOFT_SKILLS.map((skill, i) => (
            <SoftCard key={skill.title} skill={skill} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}