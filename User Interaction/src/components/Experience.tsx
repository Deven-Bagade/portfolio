import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Briefcase, Calendar, MapPin, TrendingUp, Code, Users } from 'lucide-react';

// ── Design tokens ─────────────────────────────────────────────────────────────
// Accent palette per experience entry
const ACCENTS = [
  {
    primary: '#e8a87c',      // warm amber
    glow: 'rgba(232,168,124,0.12)',
    glowStrong: 'rgba(232,168,124,0.25)',
    border: 'rgba(232,168,124,0.28)',
    tag: 'rgba(232,168,124,0.1)',
    tagBorder: 'rgba(232,168,124,0.3)',
    tagText: '#e8a87c',
    number: '#e8a87c',
  },
  {
    primary: '#7eb8d4',      // steel blue
    glow: 'rgba(126,184,212,0.12)',
    glowStrong: 'rgba(126,184,212,0.25)',
    border: 'rgba(126,184,212,0.28)',
    tag: 'rgba(126,184,212,0.1)',
    tagBorder: 'rgba(126,184,212,0.3)',
    tagText: '#7eb8d4',
    number: '#7eb8d4',
  },
];

// ── Fonts ──────────────────────────────────────────────────────────────────────
// Add to index.html / global CSS:
// @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=DM+Mono:wght@300;400;500&family=Outfit:wght@300;400;500&display=swap');

// ── Data ──────────────────────────────────────────────────────────────────────
const EXPERIENCES = [
  {
    title: 'Software Development Intern',
    company: 'Shiksha Sathi',
    duration: '3 Months',
    location: 'Remote',
    type: 'Full-stack',
    description: [
      'Built a MERN stack web application following modular, scalable software engineering practices.',
      'Shipped Google Calendar sync, real-time chat, and 100ms-powered video conferencing end-to-end.',
    ],
    skills: ['MERN Stack', 'Google APIs', '100ms', 'Real-time Chat'],
  },
  {
    title: 'Web Development Intern',
    company: 'Vidyalankar Institute of Technology',
    duration: 'Dec 2024 – Feb 2025',
    location: 'Mumbai',
    type: 'Frontend + Backend',
    description: [
      'Led frontend and backend development for the Ethnicize project using the MERN stack.',
      'Collaborated with a cross-functional team of 4 in an Agile environment, shipping weekly updates.',
    ],
    skills: ['MERN Stack', 'Agile', 'Team Leadership', 'Testing'],
  },
];

const STATS = [
  { label: 'Months experience', value: '5+', icon: TrendingUp },
  { label: 'Projects shipped', value: '5+', icon: Code },
  { label: 'Technologies', value: '15+', icon: Briefcase },
  { label: 'Team projects', value: '3+', icon: Users },
];

// ── Animate on scroll (enter + exit) ─────────────────────────────────────────
function Reveal({
  children,
  delay = 0,
  from = 'bottom',
  className,
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  from?: 'bottom' | 'left' | 'right';
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.15 });

  const variants = {
    hidden: {
      opacity: 0,
      y: from === 'bottom' ? 40 : 0,
      x: from === 'left' ? -40 : from === 'right' ? 40 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
    },
    exit: {
      opacity: 0,
      y: from === 'bottom' ? 40 : 0,
      x: from === 'left' ? -40 : from === 'right' ? 40 : 0,
      transition: { duration: 0.4, ease: [0.55, 0, 0.8, 0.1] },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      variants={variants}
      initial="hidden"
      animate={inView ? 'visible' : 'exit'}
    >
      {children}
    </motion.div>
  );
}

// ── Experience card ───────────────────────────────────────────────────────────
function ExpCard({ exp, index }: { exp: typeof EXPERIENCES[0]; index: number }) {
  const accent = ACCENTS[index % ACCENTS.length];
  const isRight = index % 2 !== 0;

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 48px 1fr',
        alignItems: 'start',
        gap: 0,
        marginBottom: 64,
      }}
    >
      {/* ── Left slot ── */}
      <div style={{ paddingRight: 40 }}>
        {!isRight && <CardBody exp={exp} accent={accent} index={index} side="left" />}
      </div>

      {/* ── Center line + node ── */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 32 }}>
        {/* Node */}
        <Reveal delay={0.1}>
          <div style={{ position: 'relative', width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* Pulse ring */}
            <motion.div
              animate={{ scale: [1, 1.7, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                background: accent.glowStrong,
              }}
            />
            {/* Core dot */}
            <div style={{
              width: 16, height: 16, borderRadius: '50%',
              background: accent.primary,
              boxShadow: `0 0 12px ${accent.primary}`,
              position: 'relative', zIndex: 1,
            }} />
          </div>
        </Reveal>
      </div>

      {/* ── Right slot ── */}
      <div style={{ paddingLeft: 40 }}>
        {isRight && <CardBody exp={exp} accent={accent} index={index} side="right" />}
      </div>
    </div>
  );
}

// ── Card body ─────────────────────────────────────────────────────────────────
function CardBody({
  exp,
  accent,
  index,
  side,
}: {
  exp: typeof EXPERIENCES[0];
  accent: typeof ACCENTS[0];
  index: number;
  side: 'left' | 'right';
}) {
  const from = side === 'left' ? 'right' : 'left';

  return (
    <Reveal from={from} delay={0.05}>
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
        style={{
          borderRadius: 24,
          border: `1px solid ${accent.border}`,
          background: `linear-gradient(135deg, rgba(10,10,10,0.95), rgba(18,18,18,0.9))`,
          boxShadow: `0 0 0 0 transparent, inset 0 1px 0 rgba(255,255,255,0.05)`,
          overflow: 'hidden',
          position: 'relative',
          cursor: 'default',
        }}
      >
        {/* Accent glow top-edge */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 2,
          background: `linear-gradient(90deg, transparent, ${accent.primary}, transparent)`,
        }} />

        {/* Corner accent number */}
        <div style={{
          position: 'absolute', top: 20, right: 20,
          fontFamily: "'Playfair Display', serif",
          fontStyle: 'italic',
          fontSize: 56,
          fontWeight: 700,
          color: accent.number,
          opacity: 0.08,
          lineHeight: 1,
          userSelect: 'none',
          pointerEvents: 'none',
        }}>
          {String(index + 1).padStart(2, '0')}
        </div>

        <div style={{ padding: '32px 32px 28px' }}>
          {/* Type badge */}
          <Reveal delay={0.1 + index * 0.05}>
            <span style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 10,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: accent.tagText,
              background: accent.tag,
              border: `1px solid ${accent.tagBorder}`,
              padding: '4px 12px',
              borderRadius: 999,
              display: 'inline-block',
              marginBottom: 16,
            }}>
              {exp.type}
            </span>
          </Reveal>

          {/* Title */}
          <Reveal delay={0.15 + index * 0.05}>
            <h3 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(1.2rem, 2vw, 1.55rem)',
              fontWeight: 700,
              color: '#f0ece4',
              lineHeight: 1.2,
              marginBottom: 6,
              letterSpacing: '-0.01em',
            }}>
              {exp.title}
            </h3>
          </Reveal>

          {/* Company */}
          <Reveal delay={0.18 + index * 0.05}>
            <p style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 400,
              fontSize: 15,
              color: accent.primary,
              marginBottom: 18,
              opacity: 0.9,
            }}>
              {exp.company}
            </p>
          </Reveal>

          {/* Meta row */}
          <Reveal delay={0.22 + index * 0.05}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 22 }}>
              {[
                { icon: Calendar, label: exp.duration },
                { icon: MapPin, label: exp.location },
              ].map(({ icon: Icon, label }) => (
                <div key={label} style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '5px 12px',
                  borderRadius: 8,
                  border: '1px solid rgba(255,255,255,0.08)',
                  background: 'rgba(255,255,255,0.03)',
                }}>
                  <Icon size={12} color="rgba(255,255,255,0.4)" />
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.04em' }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Description bullets */}
          <div style={{ marginBottom: 24 }}>
            {exp.description.map((line, i) => (
              <Reveal key={i} delay={0.26 + i * 0.06 + index * 0.05}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 12 }}>
                  <div style={{
                    width: 5, height: 5, borderRadius: '50%',
                    background: accent.primary,
                    marginTop: 7, flexShrink: 0,
                    boxShadow: `0 0 6px ${accent.primary}`,
                  }} />
                  <p style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 300,
                    fontSize: 14,
                    color: 'rgba(255,255,255,0.65)',
                    lineHeight: 1.75,
                    margin: 0,
                  }}>
                    {line}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Skill tags */}
          <Reveal delay={0.38 + index * 0.05}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
              {exp.skills.map(skill => (
                <motion.span
                  key={skill}
                  whileHover={{ scale: 1.06, y: -2 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 11,
                    padding: '5px 12px',
                    borderRadius: 7,
                    border: `1px solid ${accent.tagBorder}`,
                    background: accent.tag,
                    color: accent.tagText,
                    cursor: 'default',
                    letterSpacing: '0.03em',
                    display: 'inline-block',
                  }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </Reveal>
        </div>
      </motion.div>
    </Reveal>
  );
}

// ── Stat card ─────────────────────────────────────────────────────────────────
function StatCard({ stat, index }: { stat: typeof STATS[0]; index: number }) {
  const Icon = stat.icon;
  const accent = ACCENTS[index % ACCENTS.length];

  return (
    <Reveal delay={index * 0.08} from="bottom">
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        style={{
          borderRadius: 20,
          border: `1px solid ${accent.border}`,
          background: 'rgba(10,10,10,0.9)',
          padding: '28px 20px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          cursor: 'default',
        }}
      >
        {/* Glow blob */}
        <div style={{
          position: 'absolute', top: -20, left: '50%', transform: 'translateX(-50%)',
          width: 80, height: 80, borderRadius: '50%',
          background: accent.glowStrong,
          filter: 'blur(18px)',
          pointerEvents: 'none',
        }} />

        <div style={{
          width: 40, height: 40, borderRadius: 12,
          background: accent.tag,
          border: `1px solid ${accent.tagBorder}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 14px',
        }}>
          <Icon size={18} color={accent.primary} />
        </div>

        <div style={{
          fontFamily: "'Playfair Display', serif",
          fontStyle: 'italic',
          fontSize: 36,
          fontWeight: 700,
          color: accent.primary,
          lineHeight: 1,
          marginBottom: 6,
        }}>
          {stat.value}
        </div>

        <div style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: 10,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.38)',
        }}>
          {stat.label}
        </div>
      </motion.div>
    </Reveal>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export function Experience({ onViewDetail }: { onViewDetail?: (id: number) => void }) {
  return (
    <section
      id="experience"
      style={{
        position: 'relative',
        overflow: 'hidden',
        padding: '120px 0 100px',
        background: '#080808',
        fontFamily: "'Outfit', sans-serif",
      }}
    >
      {/* Fonts */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=DM+Mono:wght@300;400;500&family=Outfit:wght@300;400;500&display=swap"
      />

      {/* Dot grid */}
      <div style={{
        pointerEvents: 'none', position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.055) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
      }} />

      {/* Ambient color halos */}
      <div style={{
        pointerEvents: 'none', position: 'absolute', inset: 0, zIndex: 0,
        background:
          'radial-gradient(ellipse 55% 40% at 10% 20%, rgba(232,168,124,0.06) 0%, transparent 65%),' +
          'radial-gradient(ellipse 45% 38% at 90% 75%, rgba(126,184,212,0.06) 0%, transparent 65%)',
      }} />

      <div style={{
        position: 'relative', zIndex: 10,
        maxWidth: 1400, margin: '0 auto',
        padding: '0 clamp(16px, 4vw, 64px)',
      }}>

        {/* ── Section header ── */}
        <Reveal from="bottom" style={{ textAlign: 'center', marginBottom: 80 }}>
          <span style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 10,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.28)',
            display: 'block',
            marginBottom: 16,
          }}>
            Career
          </span>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: 'italic',
            fontSize: 'clamp(2.6rem, 5.5vw, 4.2rem)',
            fontWeight: 700,
            color: '#f0ece4',
            letterSpacing: '-0.02em',
            lineHeight: 1.08,
            marginBottom: 16,
          }}>
            Work Experience
          </h2>
          <p style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 300,
            fontSize: 14,
            color: 'rgba(255,255,255,0.38)',
            maxWidth: 400,
            margin: '0 auto',
            lineHeight: 1.85,
            letterSpacing: '0.01em',
          }}>
            Hands-on time building real applications and shipping alongside teams that move fast.
          </p>
        </Reveal>

        {/* ── Timeline ── */}
        <div style={{ position: 'relative' }}>

          {/* Vertical line */}
          <div style={{
            position: 'absolute',
            left: 'calc(50% - 0.5px)',
            top: 0, bottom: 0,
            width: 1,
            background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.1) 15%, rgba(255,255,255,0.1) 85%, transparent)',
            zIndex: 0,
          }} />

          {EXPERIENCES.map((exp, i) => (
            <ExpCard key={i} exp={exp} index={i} />
          ))}
        </div>

        {/* ── Stats strip ── */}
        <Reveal from="bottom" delay={0.1} style={{ marginTop: 80 }}>
          <div style={{
            borderRadius: 24,
            border: '1px solid rgba(255,255,255,0.07)',
            background: 'rgba(10,10,10,0.6)',
            backdropFilter: 'blur(20px)',
            padding: '40px 40px',
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* shimmer top */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: 1,
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
            }} />

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: 16,
            }}>
              {STATS.map((stat, i) => (
                <StatCard key={stat.label} stat={stat} index={i} />
              ))}
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
}