import { GraduationCap, Target, Heart, Award, BookOpen, Rocket, Sparkles, ArrowUpRight } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

// ── Easing ────────────────────────────────────────────────────────────────────
const easeOutCubic = (x: number) => 1 - Math.pow(1 - x, 3);

// ── Animated counter ──────────────────────────────────────────────────────────
function Counter({ end, duration, suffix = '', decimals = 0 }: { end: number; duration: number; suffix?: string; decimals?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;
    let startTime: number | null = null;
    const animate = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / (duration * 1000), 1);
      setCount(parseFloat((end * easeOutCubic(progress)).toFixed(decimals)));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, end, duration, decimals]);

  return <span ref={ref}>{count.toFixed(decimals)}{suffix}</span>;
}

// ── Stagger helpers (animate in AND out on scroll) ───────────────────────────
const EASE_IN  = [0.22, 1, 0.36, 1];
const EASE_OUT = [0.55, 0, 0.8, 0.1];

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 36 },
  whileInView: { opacity: 1, y: 0, transition: { duration: 0.65, delay, ease: EASE_IN } },
  exit:        { opacity: 0, y: 36, transition: { duration: 0.4, ease: EASE_OUT } },
  viewport:    { once: false, amount: 0.12 },
});

const fadeLeft = (delay = 0) => ({
  initial:     { opacity: 0, x: -40 },
  whileInView: { opacity: 1, x: 0, transition: { duration: 0.65, delay, ease: EASE_IN } },
  exit:        { opacity: 0, x: -40, transition: { duration: 0.4, ease: EASE_OUT } },
  viewport:    { once: false, amount: 0.12 },
});

const fadeRight = (delay = 0) => ({
  initial:     { opacity: 0, x: 40 },
  whileInView: { opacity: 1, x: 0, transition: { duration: 0.65, delay, ease: EASE_IN } },
  exit:        { opacity: 0, x: 40, transition: { duration: 0.4, ease: EASE_OUT } },
  viewport:    { once: false, amount: 0.12 },
});

// ── Thin horizontal rule ──────────────────────────────────────────────────────
const HR = () => (
  <div style={{ width: '100%', height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)', margin: '0 0 24px' }} />
);

// ── Main component ────────────────────────────────────────────────────────────
export function About() {
  const reduceMotion = useReducedMotion();

  const stats = [
    { value: 9.65, decimals: 2, suffix: '', label: 'CGPA', icon: GraduationCap, accent: '#e2e8f0' },
    { value: 5,    decimals: 0, suffix: '+', label: 'Projects', icon: Rocket,        accent: '#cbd5e1' },
    { value: 15,   decimals: 0, suffix: '+', label: 'Technologies', icon: Award,     accent: '#94a3b8' },
  ];

  const cards = [
    {
      icon: GraduationCap,
      title: 'Education Excellence',
      body: 'Pursuing B.Tech in Information Technology with a 9.65 CGPA, building a strong foundation in computer science fundamentals and modern development practices.',
      tag: 'Academic',
      accent: '#e2e8f0',
    },
    {
      icon: Target,
      title: 'Career Goals',
      body: 'Actively seeking opportunities to deliver value through technology-driven, scalable solutions. Aspiring to work on challenging problems that make real-world impact.',
      tag: 'Ambition',
      accent: '#cbd5e1',
    },
    {
      icon: Heart,
      title: 'Interests',
      body: 'Passionate about open-source, hackathons, and applications that solve real problems. Enthusiastic about emerging technologies and creative engineering.',
      tag: 'Passion',
      accent: '#94a3b8',
    },
  ];

  return (
    <section
      id="about"
      style={{
        position: 'relative',
        overflow: 'hidden',
        // Responsive vertical padding using clamp
        padding: 'clamp(64px, 10vw, 112px) 24px',
        background: '#080808',
        fontFamily: "'Outfit', sans-serif",
      }}
    >
      {/* ── Google Fonts ── */}
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=Outfit:wght@100..900&display=swap" />

      {/* ── Background grid ── */}
      <div style={{
        pointerEvents: 'none',
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)',
        backgroundSize: '64px 64px',
      }} />

      {/* ── Radial halos ── */}
      <div style={{
        pointerEvents: 'none',
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        background: `
          radial-gradient(ellipse 55% 45% at 8% 25%,  rgba(148,163,184,0.07) 0%, transparent 65%),
          radial-gradient(ellipse 45% 40% at 92% 75%, rgba(100,116,139,0.06) 0%, transparent 60%)
        `,
      }} />

      {/* ── Scanline ── */}
      {!reduceMotion && (
        <motion.div
          style={{ pointerEvents: 'none', position: 'absolute', left: 0, right: 0, zIndex: 0, height: 1, background: 'rgba(255,255,255,0.04)' }}
          animate={{ top: ['-2%', '104%'] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear', repeatDelay: 2 }}
        />
      )}

      {/* ── Content ── */}
      <div style={{ position: 'relative', zIndex: 10, maxWidth: 1100, margin: '0 auto' }}>

        {/* ─── Section header ─── */}
        <motion.div {...fadeUp(0)} style={{ textAlign: 'center', marginBottom: 'clamp(48px, 8vw, 80px)' }}>
          {/* eyebrow */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '6px 18px', borderRadius: 9999,
            border: '1px solid rgba(255,255,255,0.12)',
            background: 'rgba(255,255,255,0.04)',
            marginBottom: 20,
          }}>
            <Sparkles size={14} style={{ color: '#94a3b8' }} />
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: '0.15em', color: '#94a3b8', textTransform: 'uppercase' }}>
              Who I Am
            </span>
          </div>

          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(2.5rem, 8vw, 5rem)', // Scaled down for mobile
            fontWeight: 900,
            letterSpacing: '-0.03em',
            lineHeight: 1,
            marginBottom: 16,
            background: 'linear-gradient(135deg, #f1f5f9 0%, #ffffff 40%, #94a3b8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            About Me
          </h2>

          <p style={{
            maxWidth: 520,
            margin: '0 auto',
            color: 'rgba(255,255,255,0.5)',
            fontFamily: "'Outfit', sans-serif",
            fontSize: 'clamp(14px, 3vw, 15px)', // Responsive text
            lineHeight: 1.8,
            letterSpacing: '0.02em',
          }}>
            Passionate developer crafting innovative solutions with clean code and user-centric design
          </p>
        </motion.div>

        {/* ─── Main 2-col grid ─── */}
        <div style={{ 
            display: 'grid', 
            // The min(100%, 400px) allows the grid to collapse into a single column on mobile screens
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))', 
            gap: 32, 
            marginBottom: 32 
        }}>

          {/* ── Left col ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

            {/* Background card */}
            <motion.div {...fadeLeft(0.1)} style={{
              position: 'relative',
              borderRadius: 24,
              border: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(15,15,15,0.85)',
              backdropFilter: 'blur(24px)',
              padding: 'clamp(24px, 5vw, 36px)', // Responsive padding
              boxShadow: '0 24px 48px rgba(0,0,0,0.5)',
              overflow: 'hidden',
            }}>
              {/* top shimmer line */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)' }} />

              {/* corner accent */}
              <div style={{ position: 'absolute', top: -30, right: -30, width: 100, height: 100, borderRadius: '50%', background: 'rgba(148,163,184,0.05)', filter: 'blur(20px)' }} />

              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 14,
                  background: 'linear-gradient(135deg, #475569, #1e293b)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
                  flexShrink: 0,
                }}>
                  <BookOpen size={22} color="#e2e8f0" />
                </div>
                <div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(20px, 5vw, 24px)', fontWeight: 800, color: '#f1f5f9', margin: 0 }}>Background</h3>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: '#475569', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                    VIT Mumbai · 3rd Year
                  </span>
                </div>
              </div>

              <HR />

              <p style={{ fontFamily: "'Outfit', sans-serif", color: 'rgba(255,255,255,0.72)', lineHeight: 1.8, fontSize: 'clamp(14px, 3vw, 15px)', marginBottom: 14 }}>
                I'm a 3rd-year B.Tech Information Technology student at Vidyalankar Institute of Technology,
                Mumbai, maintaining a{' '}
                <span style={{ color: '#e2e8f0', fontWeight: 700 }}>9.65 CGPA</span>. My journey in technology has been
                driven by a passion for creating impactful solutions that bridge the gap between user needs and technical innovation.
              </p>
              <p style={{ fontFamily: "'Outfit', sans-serif", color: 'rgba(255,255,255,0.72)', lineHeight: 1.8, fontSize: 'clamp(14px, 3vw, 15px)', margin: 0 }}>
                With hands-on experience in full-stack web and mobile app development, I've worked on diverse projects —
                from mental health support applications to e-commerce platforms — always focusing on scalability, UX, and clean code.
              </p>
            </motion.div>

            {/* Stats row */}
            <div style={{ 
                display: 'grid', 
                // Uses auto-fit to wrap stats gracefully on extremely narrow devices
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 100px), 1fr))', 
                gap: 16 
            }}>
              {stats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={i}
                    {...fadeUp(0.15 + i * 0.1)}
                    whileHover={{ y: -6, scale: 1.04 }}
                    style={{
                      position: 'relative',
                      borderRadius: 20,
                      border: '1px solid rgba(255,255,255,0.1)',
                      background: 'rgba(15,15,15,0.8)',
                      backdropFilter: 'blur(16px)',
                      padding: 'clamp(16px, 3vw, 24px) 12px', // Responsive padding
                      textAlign: 'center',
                      boxShadow: '0 12px 32px rgba(0,0,0,0.4)',
                      overflow: 'hidden',
                      cursor: 'default',
                    }}
                  >
                    {/* glow dot */}
                    <div style={{ position: 'absolute', top: -20, left: '50%', transform: 'translateX(-50%)', width: 60, height: 60, borderRadius: '50%', background: `${stat.accent}12`, filter: 'blur(16px)' }} />
                    <div style={{
                      width: 'clamp(32px, 8vw, 40px)', height: 'clamp(32px, 8vw, 40px)', // Scales icon container
                      borderRadius: 12,
                      background: 'linear-gradient(135deg, rgba(71,85,105,0.8), rgba(30,41,59,0.9))',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      margin: '0 auto 14px',
                      border: '1px solid rgba(255,255,255,0.08)',
                    }}>
                      <Icon size={18} color={stat.accent} />
                    </div>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(24px, 6vw, 32px)', fontWeight: 900, color: stat.accent, lineHeight: 1, marginBottom: 6, letterSpacing: '-0.02em' }}>
                      <Counter end={stat.value} duration={2} suffix={stat.suffix} decimals={stat.decimals} />
                    </div>
                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>
                      {stat.label}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* ── Right col — feature cards ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {cards.map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={i}
                  {...fadeRight(0.1 + i * 0.14)}
                  whileHover={{ y: -5 }}
                  style={{
                    position: 'relative',
                    borderRadius: 24,
                    border: '1px solid rgba(255,255,255,0.09)',
                    background: 'rgba(12,12,12,0.85)',
                    backdropFilter: 'blur(20px)',
                    padding: 'clamp(20px, 5vw, 28px)', // Responsive padding
                    boxShadow: '0 16px 40px rgba(0,0,0,0.45)',
                    overflow: 'hidden',
                    cursor: 'default',
                    transition: 'box-shadow 0.3s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 20px 50px rgba(0,0,0,0.6), 0 0 0 1px ${card.accent}22`)}
                  onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.45)')}
                >
                  {/* top shimmer */}
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${card.accent}40, transparent)` }} />

                  {/* ambient blob */}
                  <div style={{ position: 'absolute', top: -40, right: -40, width: 120, height: 120, borderRadius: '50%', background: `${card.accent}08`, filter: 'blur(30px)', pointerEvents: 'none' }} />

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                    <div style={{
                      width: 48, height: 48, borderRadius: 14, flexShrink: 0,
                      background: 'linear-gradient(135deg, rgba(71,85,105,0.9), rgba(15,23,42,0.95))',
                      border: '1px solid rgba(255,255,255,0.08)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: `0 8px 20px rgba(0,0,0,0.5), 0 0 0 1px ${card.accent}18`,
                    }}>
                      <Icon size={22} color={card.accent} />
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, marginBottom: 8 }}>
                        <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(18px, 4vw, 20px)', fontWeight: 800, color: '#f1f5f9', margin: 0 }}>{card.title}</h4>
                        <span style={{
                          fontFamily: "'DM Mono', monospace",
                          fontSize: 9,
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          color: card.accent,
                          background: `${card.accent}14`,
                          border: `1px solid ${card.accent}30`,
                          padding: '3px 8px',
                          borderRadius: 6,
                        }}>
                          {card.tag}
                        </span>
                      </div>
                      <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(13px, 3vw, 14px)', color: 'rgba(255,255,255,0.6)', lineHeight: 1.75, margin: 0 }}>{card.body}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ─── Professional Summary banner ─── */}
        <motion.div {...fadeUp(0.3)} style={{ position: 'relative' }}>
          {/* outer glow ring */}
          <div style={{
            position: 'absolute', inset: -2, borderRadius: 28,
            background: 'linear-gradient(135deg, rgba(71,85,105,0.5), rgba(30,41,59,0.3), rgba(148,163,184,0.2))',
            filter: 'blur(12px)',
            opacity: 0.6,
            pointerEvents: 'none',
          }} />

          <div style={{
            position: 'relative',
            borderRadius: 28,
            border: '1px solid rgba(255,255,255,0.1)',
            background: 'rgba(10,10,10,0.9)',
            backdropFilter: 'blur(32px)',
            padding: 'clamp(28px, 6vw, 48px)', // Responsive padding
            boxShadow: '0 32px 64px rgba(0,0,0,0.6)',
            overflow: 'hidden',
          }}>
            {/* top shimmer */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)' }} />
            {/* decorative circle */}
            <div style={{ position: 'absolute', bottom: -60, right: -60, width: 200, height: 200, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.04)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: -90, right: -90, width: 280, height: 280, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.025)', pointerEvents: 'none' }} />

            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 'clamp(12px, 3vw, 18px)', marginBottom: 24 }}>
              <div style={{
                width: 56, height: 56, borderRadius: 16, flexShrink: 0,
                background: 'linear-gradient(135deg, #475569, #0f172a)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 12px 28px rgba(0,0,0,0.6)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}>
                <Rocket size={26} color="#e2e8f0" />
              </div>
              <div>
                <h3 style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 'clamp(1.4rem, 6vw, 2rem)',
                  fontWeight: 900,
                  margin: 0,
                  letterSpacing: '-0.025em',
                  background: 'linear-gradient(90deg, #f1f5f9, #94a3b8)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>
                  Professional Summary
                </h3>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: '#475569', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                  Open to opportunities
                </span>
              </div>
            </div>

            <HR />

            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(14px, 3vw, 16px)', color: 'rgba(255,255,255,0.68)', lineHeight: 1.85, margin: 0, maxWidth: 820 }}>
              B.Tech Information Technology 3rd-year student at Vidyalankar Institute of Technology with a{' '}
              <span style={{ color: '#e2e8f0', fontWeight: 700 }}>9.65 CGPA</span>, experienced in developing{' '}
              <span style={{ color: '#ffffff', fontWeight: 700 }}>full-stack web and mobile applications</span>. Proven ability to
              build impactful projects, collaborate in hackathons, and contribute to open-source initiatives through internships
              and programs. Actively seeking opportunities to deliver value through technology-driven, scalable solutions.
            </p>

            {/* bottom row */}
            <div style={{ marginTop: 28, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {['Full-Stack Dev', 'Mobile Apps', 'Open Source', 'Hackathons', 'Cloud & DevOps'].map((tag, i) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1, transition: { delay: 0.1 + i * 0.07, duration: 0.4, ease: [0.22,1,0.36,1] } }}
                  exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.25 } }}
                  viewport={{ once: false, amount: 0.5 }}
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 'clamp(9px, 2.5vw, 10px)',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.5)',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.09)',
                    padding: '5px 12px',
                    borderRadius: 8,
                  }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}