import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Briefcase, Calendar, MapPin, TrendingUp, Code, Users } from 'lucide-react';

// ── Custom Hook for Responsiveness ────────────────────────────────────────────
function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) setMatches(media.matches);
    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [matches, query]);
  return matches;
}

// ── Design tokens ─────────────────────────────────────────────────────────────
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

// ── Data ──────────────────────────────────────────────────────────────────────
const EXPERIENCES = [
  {
    title: 'Software Development Intern',
    company: 'Shiksha Sathi',
    duration: '3 Months',
    location: 'Remote',
    type: 'Full Stack',
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
    type: 'Full Stack',
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
function ExpCard({ exp, index, isMobile }: { exp: typeof EXPERIENCES[0]; index: number; isMobile: boolean }) {
  const accent = ACCENTS[index % ACCENTS.length];
  const isRight = index % 2 !== 0;

  // The central glowing node
  const TimelineNode = (
    <Reveal delay={0.1}>
      <div style={{ position: 'relative', width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <motion.div
          animate={{ scale: [1, 1.7, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', inset: 0, borderRadius: '50%',
            background: accent.glowStrong,
          }}
        />
        <div style={{
          width: 16, height: 16, borderRadius: '50%',
          background: accent.primary,
          boxShadow: `0 0 12px ${accent.primary}`,
          position: 'relative', zIndex: 1,
        }} />
      </div>
    </Reveal>
  );

  // MOBILE LAYOUT: Node on left, Card on right taking up remaining width
  if (isMobile) {
    return (
      <div style={{
        display: 'grid',
        gridTemplateColumns: '48px 1fr', // 2 Columns
        gap: 16,
        marginBottom: 48,
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 20 }}>
          {TimelineNode}
        </div>
        <div>
          <CardBody exp={exp} accent={accent} index={index} side="right" isMobile={isMobile} />
        </div>
      </div>
    );
  }

  // DESKTOP LAYOUT: Alternating 3 Columns
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 48px 1fr', // 3 Columns
      alignItems: 'start',
      gap: 0,
      marginBottom: 64,
    }}>
      <div style={{ paddingRight: 40 }}>
        {!isRight && <CardBody exp={exp} accent={accent} index={index} side="left" isMobile={isMobile} />}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 32 }}>
        {TimelineNode}
      </div>
      <div style={{ paddingLeft: 40 }}>
        {isRight && <CardBody exp={exp} accent={accent} index={index} side="right" isMobile={isMobile} />}
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
  isMobile,
}: {
  exp: typeof EXPERIENCES[0];
  accent: typeof ACCENTS[0];
  index: number;
  side: 'left' | 'right';
  isMobile: boolean;
}) {
  // On mobile, always animate from the bottom to prevent horizontal scrolling glitches
  const from = isMobile ? 'bottom' : (side === 'left' ? 'right' : 'left');

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
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 2,
          background: `linear-gradient(90deg, transparent, ${accent.primary}, transparent)`,
        }} />

        <div style={{
          position: 'absolute', top: 20, right: 20,
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: 'italic',
          fontSize: 'clamp(40px, 8vw, 56px)', // Responsive corner number
          fontWeight: 700,
          color: accent.number,
          opacity: 0.08,
          lineHeight: 1,
          userSelect: 'none',
          pointerEvents: 'none',
        }}>
          {String(index + 1).padStart(2, '0')}
        </div>

        {/* Responsive padding inside the card so it doesn't crush text on mobile */}
        <div style={{ padding: 'clamp(24px, 5vw, 32px) clamp(20px, 5vw, 32px) clamp(20px, 5vw, 28px)' }}>
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

          <Reveal delay={0.15 + index * 0.05}>
            <h3 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(1.2rem, 4vw, 1.55rem)',
              fontWeight: 700,
              color: '#f0ece4',
              lineHeight: 1.2,
              marginBottom: 6,
              letterSpacing: '-0.01em',
            }}>
              {exp.title}
            </h3>
          </Reveal>

          <Reveal delay={0.18 + index * 0.05}>
            <p style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 400,
              fontSize: 'clamp(14px, 3vw, 15px)',
              color: accent.primary,
              marginBottom: 18,
              opacity: 0.9,
            }}>
              {exp.company}
            </p>
          </Reveal>

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
                    fontSize: 'clamp(13px, 3vw, 14px)',
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
          padding: 'clamp(20px, 4vw, 28px) 20px', // Responsive padding
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          cursor: 'default',
          height: '100%',
        }}
      >
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
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: 'italic',
          fontSize: 'clamp(28px, 6vw, 36px)',
          fontWeight: 700,
          color: accent.primary,
          lineHeight: 1,
          marginBottom: 6,
        }}>
          {stat.value}
        </div>

        <div style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: 'clamp(9px, 2.5vw, 10px)',
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
export function Experience() {
  const isMobile = useMediaQuery('(max-width: 768px)'); // Detect mobile screens

  return (
    <section
      id="experience"
      style={{
        position: 'relative',
        overflow: 'hidden',
        padding: 'clamp(80px, 15vw, 120px) 0 clamp(60px, 15vw, 100px)', // Fluid top/bottom padding
        background: '#080808',
        fontFamily: "'Outfit', sans-serif",
      }}
    >
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=Outfit:wght@100..900&display=swap"
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
        padding: '0 clamp(16px, 4vw, 64px)', // Fluid horizontal padding
      }}>

        {/* ── Section header ── */}
        <Reveal from="bottom" style={{ textAlign: 'center', marginBottom: 'clamp(56px, 8vw, 80px)' }}>
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
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontSize: 'clamp(2.6rem, 8vw, 4.2rem)',
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
            fontSize: 'clamp(14px, 3vw, 15px)',
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

          {/* Vertical line - Dynamically shifts to the left on mobile */}
          <div style={{
            position: 'absolute',
            left: isMobile ? '24px' : 'calc(50% - 0.5px)', 
            top: 0, bottom: 0,
            width: 1,
            background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.1) 15%, rgba(255,255,255,0.1) 85%, transparent)',
            zIndex: 0,
            transition: 'left 0.3s ease', // Smooth transition on resize
          }} />

          {EXPERIENCES.map((exp, i) => (
            <ExpCard key={i} exp={exp} index={i} isMobile={isMobile} />
          ))}
        </div>

        {/* ── Stats strip ── */}
        <Reveal from="bottom" delay={0.1} style={{ marginTop: 'clamp(48px, 10vw, 80px)' }}>
          <div style={{
            borderRadius: 24,
            border: '1px solid rgba(255,255,255,0.07)',
            background: 'rgba(10,10,10,0.6)',
            backdropFilter: 'blur(20px)',
            padding: 'clamp(24px, 5vw, 40px)', // Responsive container padding
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: 1,
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
            }} />

            <div style={{
              display: 'grid',
              // Uses min(100%, 140px) so items don't overflow on ultra-narrow phones
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 140px), 1fr))',
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