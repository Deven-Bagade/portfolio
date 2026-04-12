import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink, Github, Smartphone, Globe, MessageSquare, Video, ShoppingCart, ArrowUpRight } from 'lucide-react';

// ── Fonts ─────────────────────────────────────────────────────────────────────
// Add to index.html / global CSS:
// @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;1,400;1,600&family=DM+Mono:wght@300;400;500&family=Outfit:wght@300;400;500&display=swap');

// ── Per-project color accents ─────────────────────────────────────────────────
const ACCENTS = [
  { primary: '#7fbfff', glow: 'rgba(127,191,255,0.14)', border: 'rgba(127,191,255,0.24)', tag: 'rgba(127,191,255,0.1)', tagBorder: 'rgba(127,191,255,0.3)', label: 'Mobile' },
  { primary: '#c49bff', glow: 'rgba(196,155,255,0.14)', border: 'rgba(196,155,255,0.24)', tag: 'rgba(196,155,255,0.1)', tagBorder: 'rgba(196,155,255,0.3)', label: 'Health Tech' },
  { primary: '#72ddb7', glow: 'rgba(114,221,183,0.14)', border: 'rgba(114,221,183,0.24)', tag: 'rgba(114,221,183,0.1)', tagBorder: 'rgba(114,221,183,0.3)', label: 'EdTech' },
  { primary: '#ffb77a', glow: 'rgba(255,183,122,0.14)', border: 'rgba(255,183,122,0.24)', tag: 'rgba(255,183,122,0.1)', tagBorder: 'rgba(255,183,122,0.3)', label: 'Real-time' },
  { primary: '#f87c9a', glow: 'rgba(248,124,154,0.14)', border: 'rgba(248,124,154,0.24)', tag: 'rgba(248,124,154,0.1)', tagBorder: 'rgba(248,124,154,0.3)', label: 'E-Commerce' },
  { primary: '#7ddde0', glow: 'rgba(125,221,224,0.14)', border: 'rgba(125,221,224,0.24)', tag: 'rgba(125,221,224,0.1)', tagBorder: 'rgba(125,221,224,0.3)', label: 'Research' },
];

// ── Data ──────────────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    name: 'Attendance Tracker',
    description: 'Personal attendance management app with timetable-based lecture tracking and offline-first architecture.',
    features: ['Present / Absent / Late marking with notes', 'Offline-first with reliable sync', 'Modular, clean UI architecture'],
    tech: ['Flutter', 'Firebase', 'REST APIs'],
    icon: Smartphone,
    github: '',
    live: '',
  },
  {
    name: 'Mannsparysha',
    subtitle: 'Mental Health Support',
    description: 'Emotional well-being app with a privacy-first approach, AI chat support, and stress management tools.',
    features: ['AI-based chat + mood tracking', 'Stress management & recommendations', 'Privacy-first, user-centric design'],
    tech: ['Flutter', 'Firebase', 'AI concepts'],
    icon: MessageSquare,
    github: '',
    live: '',
  },
  {
    name: 'LearnVista',
    description: 'Secure video-sharing platform for authenticated teacher-student interaction with granular access control.',
    features: ['Search, like, and save with access control', 'Streamlined servlet & DB handling', 'Secure auth & authorization'],
    tech: ['Java', 'Servlets', 'JSP', 'JavaScript', 'MySQL'],
    icon: Video,
    github: '',
    live: '',
  },
  {
    name: 'Chat Application',
    description: 'Real-time messaging system with media and file sharing for 1:1 and group conversations.',
    features: ['Real-time messaging with media', 'Optimized servlet calls & MySQL queries', 'Group chat with file sharing'],
    tech: ['Java Servlets', 'JSP', 'MySQL', 'Apache Tomcat', 'JavaScript'],
    icon: MessageSquare,
    github: '',
    live: '',
  },
  {
    name: 'Ethnicize',
    subtitle: 'E-Commerce Platform',
    description: 'Scalable marketplace connecting Indian sellers to global buyers with multi-portal architecture.',
    features: ['Seller, Buyer, and Admin portals', 'JWT authentication & RESTful APIs', 'Scalable MERN architecture'],
    tech: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'Tailwind CSS', 'JWT'],
    icon: ShoppingCart,
    github: 'https://github.com/Deven-Bagade',
    live: '',
  },
  {
    name: 'StockSync',
    subtitle: 'Research Project',
    description: 'Inventory management solution presented at Aavishkar Research Convention 2024 — zonal participant.',
    features: ['Real-time inventory tracking & analytics', 'Multi-location synchronization', 'Aavishkar 2024 zonal selection'],
    tech: ['Research', 'Innovation', 'Management'],
    icon: Globe,
    github: '',
    live: '',
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

// ── Project card ──────────────────────────────────────────────────────────────
function ProjectCard({
  project,
  index,
  onViewDetail,
}: {
  project: typeof PROJECTS[0];
  index: number;
  onViewDetail?: (id: number) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const accent = ACCENTS[index % ACCENTS.length];
  const Icon = project.icon;

  // Featured (first) card spans full width on large screens
  const isFeatured = index === 0;

  return (
    <Reveal delay={index * 0.06} style={{ gridColumn: isFeatured ? 'span 2' : 'span 1', minWidth: 0 }}>
      <motion.div
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        onClick={() => onViewDetail?.(index)}
        whileHover={{ y: -6 }}
        transition={{ type: 'spring', stiffness: 280, damping: 22 }}
        style={{
          position: 'relative',
          borderRadius: 24,
          border: `1px solid ${hovered ? accent.border : 'rgba(255,255,255,0.07)'}`,
          background: hovered
            ? `linear-gradient(145deg, rgba(14,14,14,0.98), rgba(20,20,20,0.95))`
            : 'rgba(10,10,10,0.9)',
          overflow: 'hidden',
          cursor: 'pointer',
          transition: 'border-color 0.3s, background 0.3s',
          height: '100%',
        }}
      >
        {/* Accent top bar */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 2,
            background: `linear-gradient(90deg, transparent, ${accent.primary}, transparent)`,
          }}
        />

        {/* Ambient glow blob */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          style={{
            position: 'absolute', top: -40, right: -40,
            width: 180, height: 180, borderRadius: '50%',
            background: accent.glow,
            filter: 'blur(40px)',
            pointerEvents: 'none',
          }}
        />

        {/* Large watermark number */}
        <div style={{
          position: 'absolute', bottom: -10, right: 16,
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: 'italic',
          fontSize: 120,
          fontWeight: 600,
          color: accent.primary,
          opacity: hovered ? 0.07 : 0.04,
          lineHeight: 1,
          pointerEvents: 'none',
          userSelect: 'none',
          transition: 'opacity 0.4s',
        }}>
          {String(index + 1).padStart(2, '0')}
        </div>

        <div style={{ padding: isFeatured ? '36px 36px 32px' : '28px 28px 24px', position: 'relative', zIndex: 1 }}>

          {/* Top row: icon + label badge + action buttons */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              {/* Icon container */}
              <motion.div
                animate={{ scale: hovered ? 1.1 : 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                style={{
                  width: isFeatured ? 52 : 44,
                  height: isFeatured ? 52 : 44,
                  borderRadius: 14,
                  background: accent.tag,
                  border: `1px solid ${accent.tagBorder}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Icon size={isFeatured ? 22 : 18} color={accent.primary} />
              </motion.div>

              {/* Category badge */}
              <span style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 10,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: accent.primary,
                background: accent.tag,
                border: `1px solid ${accent.tagBorder}`,
                padding: '4px 11px',
                borderRadius: 999,
              }}>
                {accent.label}
              </span>
            </div>

            {/* Action buttons — slide in on hover */}
            <motion.div
              animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : 10 }}
              transition={{ duration: 0.25 }}
              style={{ display: 'flex', gap: 8 }}
            >
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={e => e.stopPropagation()}
                  style={{
                    width: 34, height: 34, borderRadius: 10,
                    background: accent.tag,
                    border: `1px solid ${accent.tagBorder}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  <ExternalLink size={13} color={accent.primary} />
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={e => e.stopPropagation()}
                  style={{
                    width: 34, height: 34, borderRadius: 10,
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  <Github size={13} color="rgba(255,255,255,0.6)" />
                </a>
              )}
            </motion.div>
          </div>

          {/* Title + subtitle */}
          <div style={{ marginBottom: 14 }}>
            <h3 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: 'italic',
              fontSize: isFeatured ? 'clamp(1.6rem, 2.5vw, 2.2rem)' : 'clamp(1.25rem, 2vw, 1.55rem)',
              fontWeight: 600,
              color: '#f0ece4',
              lineHeight: 1.15,
              marginBottom: 4,
              letterSpacing: '-0.01em',
            }}>
              {project.name}
            </h3>
            {project.subtitle && (
              <p style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 11,
                color: accent.primary,
                opacity: 0.8,
                letterSpacing: '0.06em',
              }}>
                {project.subtitle}
              </p>
            )}
          </div>

          {/* Description */}
          <p style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 300,
            fontSize: 14,
            color: 'rgba(255,255,255,0.55)',
            lineHeight: 1.8,
            marginBottom: 20,
          }}>
            {project.description}
          </p>

          {/* Feature bullets */}
          <div style={{ marginBottom: 24 }}>
            {project.features.map((f, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 9 }}>
                <div style={{
                  width: 4, height: 4, borderRadius: '50%',
                  background: accent.primary,
                  marginTop: 8, flexShrink: 0,
                  boxShadow: `0 0 5px ${accent.primary}`,
                }} />
                <p style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 300,
                  fontSize: 13,
                  color: 'rgba(255,255,255,0.55)',
                  lineHeight: 1.7,
                  margin: 0,
                }}>
                  {f}
                </p>
              </div>
            ))}
          </div>

          {/* Tech tags */}
          <div style={{
            borderTop: '1px solid rgba(255,255,255,0.06)',
            paddingTop: 18,
            display: 'flex',
            flexWrap: 'wrap',
            gap: 7,
          }}>
            {project.tech.map(t => (
              <span
                key={t}
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 10,
                  letterSpacing: '0.05em',
                  padding: '4px 11px',
                  borderRadius: 7,
                  border: `1px solid ${accent.tagBorder}`,
                  background: accent.tag,
                  color: accent.primary,
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </Reveal>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export function Projects({ onViewDetail }: { onViewDetail?: (id: number) => void }) {
  return (
    <section
      id="projects"
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
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;1,400;1,600&family=DM+Mono:wght@300;400;500&family=Outfit:wght@300;400;500&display=swap"
      />

      {/* Dot grid */}
      <div style={{
        pointerEvents: 'none', position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
      }} />

      {/* Ambient halos matching project accents */}
      <div style={{
        pointerEvents: 'none', position: 'absolute', inset: 0, zIndex: 0,
        background:
          'radial-gradient(ellipse 50% 35% at 5% 25%, rgba(127,191,255,0.05) 0%, transparent 65%),' +
          'radial-gradient(ellipse 45% 35% at 95% 65%, rgba(248,124,154,0.05) 0%, transparent 65%),' +
          'radial-gradient(ellipse 40% 30% at 50% 90%, rgba(114,221,183,0.04) 0%, transparent 60%)',
      }} />

      <div style={{
        position: 'relative', zIndex: 10,
        maxWidth: 1400, margin: '0 auto',
        padding: '0 clamp(16px, 4vw, 64px)',
      }}>

        {/* ── Header ── */}
        <Reveal style={{ textAlign: 'center', marginBottom: 72 }}>
          <span style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 10,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.28)',
            display: 'block',
            marginBottom: 16,
          }}>
            Work
          </span>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontSize: 'clamp(2.8rem, 6vw, 4.5rem)',
            fontWeight: 600,
            color: '#f0ece4',
            letterSpacing: '-0.02em',
            lineHeight: 1.05,
            marginBottom: 18,
          }}>
            Featured Projects
          </h2>
          <p style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 300,
            fontSize: 14,
            color: 'rgba(255,255,255,0.38)',
            maxWidth: 420,
            margin: '0 auto',
            lineHeight: 1.85,
          }}>
            Full-stack apps, mobile tools, and research work — each one a distinct problem solved.
          </p>
        </Reveal>

        {/* ── Bento grid ── */}
        {/* Row 1: featured (span 2) + 1 normal */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 14,
          marginBottom: 14,
        }}>
          <ProjectCard project={PROJECTS[0]} index={0} onViewDetail={onViewDetail} />
          <ProjectCard project={PROJECTS[1]} index={1} onViewDetail={onViewDetail} />
        </div>

        {/* Row 2: 3 equal columns */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 14,
          marginBottom: 14,
        }}>
          <ProjectCard project={PROJECTS[2]} index={2} onViewDetail={onViewDetail} />
          <ProjectCard project={PROJECTS[3]} index={3} onViewDetail={onViewDetail} />
          <ProjectCard project={PROJECTS[4]} index={4} onViewDetail={onViewDetail} />
        </div>

        {/* Row 3: last card + CTA */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 14,
        }}>
          <ProjectCard project={PROJECTS[5]} index={5} onViewDetail={onViewDetail} />

          {/* GitHub CTA card */}
          <Reveal delay={0.35}>
            <motion.a
              href="https://github.com/Deven-Bagade"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 280, damping: 22 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                borderRadius: 24,
                border: '1px solid rgba(255,255,255,0.08)',
                background: 'rgba(10,10,10,0.7)',
                padding: '40px 32px',
                textDecoration: 'none',
                height: '100%',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
              }}
            >
              {/* Shimmer top */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 1,
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
              }} />

              {/* Large Github icon */}
              <motion.div
                whileHover={{ rotate: 10, scale: 1.1 }}
                style={{
                  width: 64, height: 64,
                  borderRadius: 18,
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 24,
                }}
              >
                <Github size={28} color="rgba(255,255,255,0.7)" />
              </motion.div>

              <p style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 10,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.28)',
                marginBottom: 10,
              }}>
                See more
              </p>

              <h3 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: 'italic',
                fontSize: 'clamp(1.3rem, 2vw, 1.8rem)',
                fontWeight: 600,
                color: '#f0ece4',
                marginBottom: 14,
                lineHeight: 1.2,
              }}>
                All projects on GitHub
              </h3>

              <p style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 300,
                fontSize: 13,
                color: 'rgba(255,255,255,0.38)',
                lineHeight: 1.7,
                marginBottom: 24,
                maxWidth: 260,
              }}>
                Open source work, experiments, and everything in between.
              </p>

              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '10px 22px',
                borderRadius: 12,
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
                color: 'rgba(255,255,255,0.8)',
                fontFamily: "'DM Mono', monospace",
                fontSize: 12,
                letterSpacing: '0.06em',
              }}>
                <Github size={13} />
                github.com/Deven-Bagade
                <ArrowUpRight size={12} />
              </div>
            </motion.a>
          </Reveal>
        </div>

      </div>
    </section>
  );
}