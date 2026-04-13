import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, Trophy, Users, Lightbulb, GraduationCap } from 'lucide-react';

// ── Fonts ─────────────────────────────────────────────────────────────────────
// @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;1,400;1,600&family=DM+Mono:wght@300;400;500&family=Outfit:wght@300;400;500&display=swap');

// ── Accent palette per achievement ───────────────────────────────────────────
const ACCENTS = [
  { primary: '#f9c74f', glow: 'rgba(249,199,79,0.13)',  border: 'rgba(249,199,79,0.26)',  tag: 'rgba(249,199,79,0.09)',  tagBorder: 'rgba(249,199,79,0.28)'  }, // gold
  { primary: '#c49bff', glow: 'rgba(196,155,255,0.13)', border: 'rgba(196,155,255,0.26)', tag: 'rgba(196,155,255,0.09)', tagBorder: 'rgba(196,155,255,0.28)' }, // violet
  { primary: '#72ddb7', glow: 'rgba(114,221,183,0.13)', border: 'rgba(114,221,183,0.26)', tag: 'rgba(114,221,183,0.09)', tagBorder: 'rgba(114,221,183,0.28)' }, // teal
  { primary: '#7fbfff', glow: 'rgba(127,191,255,0.13)', border: 'rgba(127,191,255,0.26)', tag: 'rgba(127,191,255,0.09)', tagBorder: 'rgba(127,191,255,0.28)' }, // blue
];

// Education accent is now per-item inside EDUCATION array

// ── Data ──────────────────────────────────────────────────────────────────────
const ACHIEVEMENTS = [
  {
    title: 'Winter of Code',
    subtitle: 'Open-Source Contributor',
    icon: Award,
    description: 'Contributed to open-source projects, tackling real-world problem statements in a collaborative dev environment.',
    details: ['Codebase understanding & issue resolution', 'Feature enhancement and version control', 'Collaborative development practices'],
  },
  {
    title: 'Aavishkar 2024',
    subtitle: 'UG Zonal Participant',
    icon: Trophy,
    description: 'Selected as a zonal participant for StockSync in the Commerce, Management & Law category at this state-level research convention.',
    details: ['Presented innovative inventory management solution', 'Recognised at state-level research convention'],
  },
  {
    title: 'Smart India Hackathon 2024',
    subtitle: 'Top 35 / 110 Teams',
    icon: Lightbulb,
    description: 'Ranked in the top 35 of 110 teams in the SIH Internal Hackathon with a comprehensive e-waste management solution.',
    details: ['Developed e-waste management solution', 'Collaborated under 24-hour hackathon pressure'],
  },
  {
    title: 'Core Tech Member',
    subtitle: 'GDG VIT · Google Developer Groups',
    icon: Users,
    description: 'Contributed to the execution of GDG VIT\'s flagship technical event and built the official event website.',
    details: ['Built event site with React + Tailwind CSS', 'Organised technical workshops & sessions', 'Coordinated team for seamless execution'],
  },
];

const EDUCATION = [
  {
    degree: 'Bachelor of Technology',
    field: 'Information Technology',
    school: 'Vidyalankar Institute of Technology, Mumbai',
    period: '2023 – 2027',
    score: '9.65',
    scoreLabel: '/ 10 CGPA',
    scoreSub: 'up to 3rd year',
    icon: GraduationCap,
    accent: { primary: '#7fbfff', glow: 'rgba(127,191,255,0.15)', border: 'rgba(127,191,255,0.28)', tag: 'rgba(127,191,255,0.09)', tagBorder: 'rgba(127,191,255,0.28)' },
    tags: ['MERN Stack', 'Flutter', 'Java', 'DSA', 'DBMS'],
    status: 'Ongoing',
  },
  {
    degree: 'Higher Secondary',
    field: 'HSC · Science',
    school: 'Model College of Arts, Commerce & Science',
    period: '2021 – 2023',
    score: '84%',
    scoreLabel: 'Percentage',
    scoreSub: '',
    icon: Trophy,
    accent: { primary: '#72ddb7', glow: 'rgba(114,221,183,0.15)', border: 'rgba(114,221,183,0.28)', tag: 'rgba(114,221,183,0.09)', tagBorder: 'rgba(114,221,183,0.28)' },
    tags: ['Physics', 'Chemistry', 'Math', 'IT'],
    status: 'Completed',
  },
  {
    degree: 'Secondary School',
    field: 'SSC',
    school: "St. Jude's High School",
    period: '2021',
    score: '80%',
    scoreLabel: 'Percentage',
    scoreSub: '',
    icon: Award,
    accent: { primary: '#f9c74f', glow: 'rgba(249,199,79,0.15)', border: 'rgba(249,199,79,0.28)', tag: 'rgba(249,199,79,0.09)', tagBorder: 'rgba(249,199,79,0.28)' },
    tags: ['Mathematics', 'Science', 'English'],
    status: 'Completed',
  },
];

// ── Scroll reveal ─────────────────────────────────────────────────────────────
function Reveal({
  children,
  delay = 0,
  y = 32,
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.12 });
  return (
    <motion.div
      ref={ref}
      style={style}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

// ── Achievement card ──────────────────────────────────────────────────────────
function AchievementCard({ item, index, onViewDetail }: { item: typeof ACHIEVEMENTS[0]; index: number; onViewDetail?: (id: number) => void }) {
  const [hovered, setHovered] = useState(false);
  const accent = ACCENTS[index % ACCENTS.length];
  const Icon = item.icon;

  return (
    <Reveal delay={index * 0.07}>
      <motion.div
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        onClick={() => onViewDetail?.(index)}
        whileHover={{ y: -5 }}
        transition={{ type: 'spring', stiffness: 280, damping: 22 }}
        style={{
          position: 'relative',
          borderRadius: 24,
          border: `1px solid ${hovered ? accent.border : 'rgba(255,255,255,0.07)'}`,
          background: 'rgba(10,10,10,0.92)',
          overflow: 'hidden',
          cursor: 'pointer',
          height: '100%',
          transition: 'border-color 0.3s',
        }}
      >
        {/* Top accent bar */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 2,
            background: `linear-gradient(90deg, transparent, ${accent.primary}, transparent)`,
          }}
        />

        {/* Glow blob */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          style={{
            position: 'absolute', top: -30, right: -30,
            width: 140, height: 140, borderRadius: '50%',
            background: accent.glow, filter: 'blur(36px)',
            pointerEvents: 'none',
          }}
        />

        {/* Watermark number */}
        <div style={{
          position: 'absolute', bottom: -8, right: 16,
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: 'italic', fontSize: 100, fontWeight: 600,
          color: accent.primary,
          opacity: hovered ? 0.08 : 0.04,
          lineHeight: 1, pointerEvents: 'none', userSelect: 'none',
          transition: 'opacity 0.4s',
        }}>
          {String(index + 1).padStart(2, '0')}
        </div>

        <div style={{ padding: '28px 28px 24px', position: 'relative', zIndex: 1 }}>
          {/* Icon + subtitle badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <motion.div
              animate={{ scale: hovered ? 1.1 : 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 18 }}
              style={{
                width: 44, height: 44, borderRadius: 13,
                background: accent.tag,
                border: `1px solid ${accent.tagBorder}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Icon size={19} color={accent.primary} />
            </motion.div>
            <span style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 10, letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: accent.primary,
              background: accent.tag,
              border: `1px solid ${accent.tagBorder}`,
              padding: '4px 11px', borderRadius: 999,
            }}>
              {item.subtitle}
            </span>
          </div>

          {/* Title */}
          <h3 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontSize: 'clamp(1.2rem, 2vw, 1.5rem)',
            fontWeight: 600, color: '#f0ece4',
            marginBottom: 12, lineHeight: 1.2,
            letterSpacing: '-0.01em',
          }}>
            {item.title}
          </h3>

          {/* Description */}
          <p style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 300, fontSize: 13.5,
            color: 'rgba(255,255,255,0.52)',
            lineHeight: 1.8, marginBottom: 20,
          }}>
            {item.description}
          </p>

          {/* Detail bullets */}
          <div>
            {item.details.map((d, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 9 }}>
                <div style={{
                  width: 4, height: 4, borderRadius: '50%',
                  background: accent.primary,
                  boxShadow: `0 0 5px ${accent.primary}`,
                  marginTop: 8, flexShrink: 0,
                }} />
                <p style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 300, fontSize: 13,
                  color: 'rgba(255,255,255,0.48)',
                  lineHeight: 1.7, margin: 0,
                }}>
                  {d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </Reveal>
  );
}

// ── Education timeline ────────────────────────────────────────────────────────
function EducationSection() {
  return (
    <div style={{ position: 'relative' }}>
      {/* Vertical spine */}
      <div style={{
        position: 'absolute',
        left: 20,
        top: 0, bottom: 0,
        width: 1,
        background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.1) 10%, rgba(255,255,255,0.1) 90%, transparent)',
        zIndex: 0,
      }} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {EDUCATION.map((edu, index) => (
          <EduItem key={index} edu={edu} index={index} isLast={index === EDUCATION.length - 1} />
        ))}
      </div>
    </div>
  );
}

function EduItem({ edu, index, isLast }: { edu: typeof EDUCATION[0]; index: number; isLast: boolean }) {
  const [hovered, setHovered] = useState(false);
  const Icon = edu.icon;
  const { accent } = edu;

  return (
    <Reveal delay={0.08 + index * 0.1}>
      <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start', paddingBottom: isLast ? 0 : 48, position: 'relative' }}>

        {/* Left: node on the spine */}
        <div style={{ flexShrink: 0, width: 40, display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 1 }}>
          {/* Pulse ring */}
          <div style={{ position: 'relative', width: 40, height: 40 }}>
            <motion.div
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: index * 0.6 }}
              style={{
                position: 'absolute', inset: 0, borderRadius: '50%',
                background: accent.glow,
              }}
            />
            <div style={{
              position: 'absolute', inset: 0,
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${accent.tag}, rgba(10,10,10,0.8))`,
              border: `1px solid ${accent.border}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Icon size={16} color={accent.primary} />
            </div>
          </div>
        </div>

        {/* Right: card */}
        <motion.div
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          whileHover={{ x: 6 }}
          transition={{ type: 'spring', stiffness: 300, damping: 24 }}
          style={{
            flex: 1,
            borderRadius: 20,
            border: `1px solid ${hovered ? accent.border : 'rgba(255,255,255,0.07)'}`,
            background: hovered
              ? `linear-gradient(135deg, rgba(14,14,14,0.98) 0%, rgba(20,20,20,0.95) 100%)`
              : 'rgba(10,10,10,0.85)',
            overflow: 'hidden',
            position: 'relative',
            transition: 'border-color 0.3s, background 0.3s',
          }}
        >
          {/* Left accent stripe */}
          <div style={{
            position: 'absolute', left: 0, top: 0, bottom: 0, width: 3,
            background: `linear-gradient(to bottom, transparent, ${accent.primary}, transparent)`,
            opacity: hovered ? 1 : 0.3,
            transition: 'opacity 0.3s',
          }} />

          {/* Glow blob */}
          <motion.div
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.4 }}
            style={{
              position: 'absolute', top: -20, right: -20,
              width: 130, height: 130, borderRadius: '50%',
              background: accent.glow, filter: 'blur(32px)',
              pointerEvents: 'none',
            }}
          />

          <div style={{ padding: '24px 28px 24px 32px', position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, marginBottom: 16 }}>

              {/* Title block */}
              <div style={{ flex: 1, minWidth: 200 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                  <h4 style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontStyle: 'italic',
                    fontSize: index === 0 ? 'clamp(1.25rem, 2.2vw, 1.65rem)' : 'clamp(1.1rem, 1.8vw, 1.35rem)',
                    fontWeight: 600, color: '#f0ece4',
                    lineHeight: 1.15, letterSpacing: '-0.01em', margin: 0,
                  }}>
                    {edu.degree}
                  </h4>
                  {/* Status pill */}
                  <span style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 9, letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: accent.primary,
                    background: accent.tag,
                    border: `1px solid ${accent.tagBorder}`,
                    padding: '3px 9px', borderRadius: 999,
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                  }}>
                    {edu.status}
                  </span>
                </div>

                <p style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 11, color: accent.primary,
                  letterSpacing: '0.07em', marginBottom: 4,
                  opacity: 0.85,
                }}>
                  {edu.field}
                </p>

                <p style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 300, fontSize: 13,
                  color: 'rgba(255,255,255,0.42)',
                  lineHeight: 1.5, margin: 0,
                }}>
                  {edu.school}
                </p>
              </div>

              {/* Score + period block */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8, flexShrink: 0 }}>
                {/* Period */}
                <span style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 10, letterSpacing: '0.1em',
                  color: 'rgba(255,255,255,0.28)',
                }}>
                  {edu.period}
                </span>

                {/* Score badge */}
                <div style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center',
                  padding: index === 0 ? '12px 20px' : '10px 16px',
                  borderRadius: 14,
                  background: accent.tag,
                  border: `1px solid ${accent.tagBorder}`,
                  minWidth: 80, textAlign: 'center',
                }}>
                  <span style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontStyle: 'italic',
                    fontSize: index === 0 ? 36 : 28,
                    fontWeight: 600,
                    color: accent.primary,
                    lineHeight: 1,
                    display: 'block',
                  }}>
                    {edu.score}
                  </span>
                  <span style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 9, letterSpacing: '0.1em',
                    color: 'rgba(255,255,255,0.3)',
                    marginTop: 4, textTransform: 'uppercase',
                  }}>
                    {edu.scoreLabel}
                  </span>
                  {edu.scoreSub && (
                    <span style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: 8, color: 'rgba(255,255,255,0.22)',
                      marginTop: 2,
                    }}>
                      {edu.scoreSub}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Subject tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, paddingTop: 14, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
              {edu.tags.map(tag => (
                <span key={tag} style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 10, letterSpacing: '0.06em',
                  padding: '4px 10px', borderRadius: 7,
                  border: `1px solid ${accent.tagBorder}`,
                  background: accent.tag,
                  color: accent.primary,
                }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </Reveal>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export function Achievements({ onViewDetail }: { onViewDetail?: (id: number) => void }) {
  return (
    <section
      id="achievements"
      style={{
        position: 'relative', overflow: 'hidden',
        padding: '120px 0 100px',
        background: '#080808',
        fontFamily: "'Outfit', sans-serif",
      }}
    >
      {/* Fonts */}
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;1,400;1,600&family=DM+Mono:wght@300;400;500&family=Outfit:wght@300;400;500&display=swap" />

      {/* Dot grid */}
      <div style={{
        pointerEvents: 'none', position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
      }} />

      {/* Ambient halos */}
      <div style={{
        pointerEvents: 'none', position: 'absolute', inset: 0, zIndex: 0,
        background:
          'radial-gradient(ellipse 50% 35% at 8% 20%, rgba(249,199,79,0.05) 0%, transparent 65%),' +
          'radial-gradient(ellipse 45% 35% at 92% 70%, rgba(127,191,255,0.05) 0%, transparent 65%),' +
          'radial-gradient(ellipse 40% 30% at 50% 95%, rgba(232,168,124,0.04) 0%, transparent 60%)',
      }} />

      <div style={{
        position: 'relative', zIndex: 10,
        maxWidth: 1400, margin: '0 auto',
        padding: '0 clamp(16px, 4vw, 64px)',
      }}>

        {/* ── Section header ── */}
        <Reveal style={{ textAlign: 'center', marginBottom: 72 }}>
          <span style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 10, letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.28)',
            display: 'block', marginBottom: 16,
          }}>
            Recognition
          </span>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontSize: 'clamp(2.8rem, 6vw, 4.5rem)',
            fontWeight: 600, color: '#f0ece4',
            letterSpacing: '-0.02em', lineHeight: 1.05,
            marginBottom: 18,
          }}>
            Achievements & Leadership
          </h2>
          <p style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 300, fontSize: 14,
            color: 'rgba(255,255,255,0.38)',
            maxWidth: 400, margin: '0 auto',
            lineHeight: 1.85,
          }}>
            Moments where curiosity, teamwork, and craft got noticed.
          </p>
        </Reveal>

        {/* ── Achievements bento: 2-col ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 14,
          marginBottom: 56,
        }}>
          {ACHIEVEMENTS.map((item, i) => (
            <AchievementCard key={i} item={item} index={i} onViewDetail={onViewDetail} />
          ))}
        </div>

        {/* ── Education divider ── */}
        <Reveal style={{ marginBottom: 36 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08))' }} />
            <span style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 10, letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.28)',
              flexShrink: 0,
            }}>
              Education
            </span>
            <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, rgba(255,255,255,0.08), transparent)' }} />
          </div>
        </Reveal>

        {/* ── Education timeline ── */}
        <EducationSection />

      </div>
    </section>
  );
}