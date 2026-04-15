import { Mail, Phone, MapPin, Github, Linkedin, Send, ArrowUpRight, Sparkles, Terminal } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { motion, useInView, useReducedMotion} from 'framer-motion';

// ── Easing ────────────────────────────────────────────────────────────────────
const EASE_IN  = [0.22, 1, 0.36, 1];
const EASE_OUT = [0.55, 0, 0.8, 0.1];

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0, transition: { duration: 0.7, delay, ease: EASE_IN } },
  exit:        { opacity: 0, y: 40, transition: { duration: 0.4, ease: EASE_OUT } },
  viewport:    { once: false, amount: 0.1 },
});

const fadeLeft = (delay = 0) => ({
  initial:     { opacity: 0, x: -50 },
  whileInView: { opacity: 1, x: 0, transition: { duration: 0.7, delay, ease: EASE_IN } },
  exit:        { opacity: 0, x: -50, transition: { duration: 0.4, ease: EASE_OUT } },
  viewport:    { once: false, amount: 0.1 },
});

const fadeRight = (delay = 0) => ({
  initial:     { opacity: 0, x: 50 },
  whileInView: { opacity: 1, x: 0, transition: { duration: 0.7, delay, ease: EASE_IN } },
  exit:        { opacity: 0, x: 50, transition: { duration: 0.4, ease: EASE_OUT } },
  viewport:    { once: false, amount: 0.1 },
});

// ── Typewriter effect ─────────────────────────────────────────────────────────
function Typewriter({ lines }: { lines: string[] }) {
  const [displayed, setDisplayed] = useState('');
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });

  useEffect(() => {
    if (!isInView) { setDisplayed(''); setLineIdx(0); setCharIdx(0); setDeleting(false); return; }
    const current = lines[lineIdx];
    const delay = deleting ? 40 : 80;
    const t = setTimeout(() => {
      if (!deleting) {
        if (charIdx < current.length) {
          setDisplayed(current.slice(0, charIdx + 1));
          setCharIdx(c => c + 1);
        } else {
          setTimeout(() => setDeleting(true), 1800);
        }
      } else {
        if (charIdx > 0) {
          setDisplayed(current.slice(0, charIdx - 1));
          setCharIdx(c => c - 1);
        } else {
          setDeleting(false);
          setLineIdx(i => (i + 1) % lines.length);
        }
      }
    }, delay);
    return () => clearTimeout(t);
  }, [isInView, charIdx, deleting, lineIdx, lines]);

  return (
    <span ref={ref} style={{ color: '#e2e8f0', fontFamily: "'DM Mono', monospace" }}>
      {displayed}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
        style={{ display: 'inline-block', width: 2, height: '1.1em', background: '#94a3b8', marginLeft: 3, verticalAlign: 'middle' }}
      />
    </span>
  );
}

// ── Glitch text ───────────────────────────────────────────────────────────────
function GlitchText({ text }: { text: string }) {
  const [glitch, setGlitch] = useState(false);
  useEffect(() => {
    const id = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 150);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <span style={{ position: 'relative', display: 'inline-block' }}>
      <span style={{
        background: 'linear-gradient(135deg, #f1f5f9 0%, #ffffff 40%, #94a3b8 100%)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        display: 'block',
      }}>{text}</span>
      {glitch && (
        <>
          <span style={{
            position: 'absolute', top: 0, left: 2, display: 'block',
            background: 'linear-gradient(135deg, #94a3b8, #cbd5e1)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            clipPath: 'polygon(0 30%, 100% 30%, 100% 50%, 0 50%)',
            opacity: 0.7,
          }}>{text}</span>
          <span style={{
            position: 'absolute', top: 0, left: -2, display: 'block',
            background: 'linear-gradient(135deg, #475569, #94a3b8)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            clipPath: 'polygon(0 60%, 100% 60%, 100% 75%, 0 75%)',
            opacity: 0.5,
          }}>{text}</span>
        </>
      )}
    </span>
  );
}

// ── Magnetic card (tilts toward mouse) ───────────────────────────────────────
function MagneticCard({ children, style = {} }: { children: React.ReactNode; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setTilt({ x: dy * -6, y: dx * 6 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setHovered(false); }}
      style={{
        ...style,
        transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) ${hovered ? 'translateY(-6px)' : ''}`,
        transition: hovered ? 'transform 0.1s ease-out, box-shadow 0.3s' : 'transform 0.5s ease-out, box-shadow 0.3s',
      }}
    >
      {children}
    </div>
  );
}

// ── Animated border card (refined) ────────────────────────────────────────────
function AnimBorderCard({ children, style = {} }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ position: 'relative', borderRadius: 24, ...style }}>
      {/* subtle pulsing border glow */}
      <motion.div
        animate={{ 
          opacity: [0.3, 0.6, 0.3],
          boxShadow: [
            '0 0 0 1px rgba(148, 163, 184, 0.1), 0 0 20px rgba(148, 163, 184, 0.05)',
            '0 0 0 1px rgba(148, 163, 184, 0.25), 0 0 30px rgba(148, 163, 184, 0.15)',
            '0 0 0 1px rgba(148, 163, 184, 0.1), 0 0 20px rgba(148, 163, 184, 0.05)'
          ]
        }}
        transition={{ 
          duration: 3, 
          repeat: Infinity, 
          ease: 'easeInOut' 
        }}
        style={{
          position: 'absolute', 
          inset: -1, 
          borderRadius: 25, 
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />
      <div style={{ position: 'relative', zIndex: 1, borderRadius: 24, overflow: 'hidden' }}>
        {children}
      </div>
    </div>
  );
}

function PaperPlane() {
  return (
    <>
      <style>{`
        @keyframes fly {
          0%   { transform: translate(0,0) rotate(0deg) scale(1); }
          28%  { transform: translate(18px,-20px) rotate(-30deg) scale(0.85); }
          65%  { transform: translate(-5px,7px) rotate(12deg) scale(1.1); }
          100% { transform: translate(0,0) rotate(0deg) scale(1); }
        }
        .paper-plane {
          animation: fly 3.5s cubic-bezier(0.34,1.56,0.64,1) infinite;
          animation-delay: 0.5s;
          display: flex;
        }
      `}</style>
      <span className="paper-plane">
        <Send size={20} color="#e2e8f0" />
      </span>
    </>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export function Contact() {
  const reduceMotion = useReducedMotion();

  const contactMethods = [
    { icon: Mail,   title: 'Email',    value: 'devenbofficial@gmail.com',        href: 'mailto:devenbofficial@gmail.com', tag: 'DIRECT' },
    { icon: Phone,  title: 'Phone',    value: '+91 8369183414',                  href: 'tel:+918369183414',               tag: 'CALL' },
    { icon: MapPin, title: 'Location', value: 'Kalyan, Maharashtra, India',      href: null,                              tag: 'BASE' },
  ];

  const socialLinks = [
    { icon: Github,   title: 'GitHub',   sub: 'Deven-Bagade',            href: 'https://github.com/Deven-Bagade',                           tag: 'CODE' },
    { icon: Linkedin, title: 'LinkedIn', sub: 'deven-bagade-5b092b2b3',  href: 'https://www.linkedin.com/in/deven-bagade-5b092b2b3',        tag: 'NETWORK' },
  ];

  return (
    <section
      id="contact"
      style={{
        position: 'relative', overflow: 'hidden',
        padding: '112px 24px 64px',
        background: '#080808',
        fontFamily: "'Outfit', sans-serif", // Base Body text font
      }}
    >
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=Outfit:wght@100..900&display=swap" />

      {/* ── Background grid ── */}
      <div style={{
        pointerEvents: 'none', position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)',
        backgroundSize: '64px 64px',
      }} />

      {/* ── Corner halos ── */}
      <div style={{
        pointerEvents: 'none', position: 'absolute', inset: 0, zIndex: 0,
        background: 'radial-gradient(ellipse 50% 40% at 5% 90%, rgba(148,163,184,0.06) 0%, transparent 60%), radial-gradient(ellipse 40% 35% at 95% 10%, rgba(71,85,105,0.07) 0%, transparent 55%)',
      }} />

      {/* ── Scanline ── */}
      {!reduceMotion && (
        <motion.div
          style={{ pointerEvents: 'none', position: 'absolute', left: 0, right: 0, zIndex: 0, height: 1, background: 'rgba(255,255,255,0.03)' }}
          animate={{ top: ['-2%', '104%'] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'linear', repeatDelay: 3 }}
        />
      )}

      {/* ── Floating particles ── */}
      {!reduceMotion && [...Array(18)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            pointerEvents: 'none', position: 'absolute', zIndex: 0,
            width: i % 3 === 0 ? 3 : 2, height: i % 3 === 0 ? 3 : 2,
            borderRadius: '50%',
            background: i % 2 === 0 ? 'rgba(148,163,184,0.35)' : 'rgba(226,232,240,0.2)',
            left: `${(i * 5.5 + 3) % 97}%`,
            top: `${(i * 7.3 + 10) % 90}%`,
          }}
          animate={{ y: [0, -28, 0], x: [0, i % 2 === 0 ? 10 : -10, 0], opacity: [0.2, 0.7, 0.2] }}
          transition={{ duration: 5 + (i % 4), repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
        />
      ))}

      <div style={{ position: 'relative', zIndex: 10, maxWidth: 1100, margin: '0 auto' }}>

        {/* ── Header ── */}
        <motion.div {...fadeUp(0)} style={{ textAlign: 'center', marginBottom: 80 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '6px 18px', borderRadius: 9999,
            border: '1px solid rgba(255,255,255,0.1)',
            background: 'rgba(255,255,255,0.04)',
            marginBottom: 20,
          }}>
            <Terminal size={13} color="#94a3b8" />
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: '0.16em', color: '#94a3b8', textTransform: 'uppercase' }}>
              Let's Connect
            </span>
          </div>

          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(3rem, 7vw, 5.5rem)', fontWeight: 900, letterSpacing: '-0.035em', lineHeight: 1, marginBottom: 20 }}>
            <GlitchText text="Get In Touch" />
          </h2>

          {/* Terminal typewriter */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 12,
            padding: '12px 24px', borderRadius: 14,
            border: '1px solid rgba(255,255,255,0.08)',
            background: 'rgba(10,10,10,0.8)',
            backdropFilter: 'blur(12px)',
            marginBottom: 24,
            fontFamily: "'DM Mono', monospace",
            fontSize: 13,
          }}>
            <span style={{ color: '#475569' }}>$ </span>
            <Typewriter lines={[
              'open --role internship',
              'open --role full-time',
              'open --role freelance',
              'open --role collaboration',
            ]} />
          </div>

          <p style={{ maxWidth: 480, margin: '0 auto', color: 'rgba(255,255,255,0.45)', fontFamily: "'Outfit', sans-serif", fontSize: 14, lineHeight: 1.9, letterSpacing: '0.02em' }}>
            Currently open to opportunities. Reach out — I respond within 24 hours.
          </p>
        </motion.div>

        {/* ── Contact method cards ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20, marginBottom: 20 }}>
          {contactMethods.map((m, i) => {
            const Icon = m.icon;
            const inner = (
              <MagneticCard style={{
                borderRadius: 22,
                border: '1px solid rgba(255,255,255,0.09)',
                background: 'rgba(12,12,12,0.9)',
                backdropFilter: 'blur(24px)',
                padding: '32px 28px',
                boxShadow: '0 16px 40px rgba(0,0,0,0.5)',
                cursor: m.href ? 'pointer' : 'default',
                position: 'relative',
                overflow: 'hidden',
              }}>
                {/* shimmer top */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)' }} />
                {/* ambient */}
                <div style={{ position: 'absolute', bottom: -40, right: -40, width: 120, height: 120, borderRadius: '50%', background: 'rgba(148,163,184,0.05)', filter: 'blur(30px)', pointerEvents: 'none' }} />

                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: 14,
                    background: 'linear-gradient(135deg, rgba(71,85,105,0.9), rgba(15,23,42,0.95))',
                    border: '1px solid rgba(255,255,255,0.09)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.5)',
                  }}>
                    <Icon size={20} color="#94a3b8" />
                  </div>
                  <span style={{
                    fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: '0.14em',
                    textTransform: 'uppercase', color: '#64748b',
                    border: '1px solid rgba(255,255,255,0.07)',
                    padding: '3px 8px', borderRadius: 6,
                    background: 'rgba(255,255,255,0.03)',
                  }}>{m.tag}</span>
                </div>

                <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: '0.12em', color: '#475569', textTransform: 'uppercase', marginBottom: 6 }}>{m.title}</p>
                <p style={{ fontSize: 15, fontWeight: 700, color: '#e2e8f0', margin: 0, wordBreak: 'break-all', lineHeight: 1.4 }}>{m.value}</p>

                {m.href && (
                  <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.07)' }} />
                    <ArrowUpRight size={14} color="#475569" />
                  </div>
                )}
              </MagneticCard>
            );

            return (
              <motion.div
                key={i}
                {...fadeUp(0.08 * i + 0.1)}
              >
                {m.href
                  ? <a href={m.href} style={{ textDecoration: 'none', display: 'block' }}>{inner}</a>
                  : inner
                }
              </motion.div>
            );
          })}
        </div>

        {/* ── Social links — animated border ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20, marginBottom: 28 }}>
          {socialLinks.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div key={i} {...fadeUp(0.2 + i * 0.1)}>
                <AnimBorderCard>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'none', display: 'block' }}
                  >
                    <MagneticCard style={{
                      borderRadius: 24,
                      background: 'rgba(10,10,10,0.95)',
                      backdropFilter: 'blur(24px)',
                      padding: '28px 28px',
                      cursor: 'pointer',
                      position: 'relative',
                      overflow: 'hidden',
                    }}>
                      {/* ambient glow */}
                      <div style={{ position: 'absolute', top: -30, left: -30, width: 100, height: 100, borderRadius: '50%', background: 'rgba(148,163,184,0.04)', filter: 'blur(24px)', pointerEvents: 'none' }} />

                      <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
                        <div style={{
                          width: 52, height: 52, borderRadius: 16, flexShrink: 0,
                          background: 'linear-gradient(135deg, #334155, #0f172a)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          boxShadow: '0 10px 24px rgba(0,0,0,0.6)',
                        }}>
                          <Icon size={22} color="#cbd5e1" />
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 800, color: '#f1f5f9', margin: 0 }}>{s.title}</h3>
                            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#64748b', border: '1px solid rgba(255,255,255,0.07)', padding: '2px 7px', borderRadius: 5, background: 'rgba(255,255,255,0.03)' }}>{s.tag}</span>
                          </div>
                          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: '#475569', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.sub}</p>
                        </div>
                        <ArrowUpRight size={18} color="#334155" />
                      </div>
                    </MagneticCard>
                  </a>
                </AnimBorderCard>
              </motion.div>
            );
          })}
        </div>

        {/* ── CTA banner ── */}
        <motion.div {...fadeUp(0.3)} style={{ position: 'relative' }}>
          {/* outer ring glow */}
          <div style={{
            position: 'absolute', inset: -3, borderRadius: 32,
            background: 'linear-gradient(135deg, rgba(71,85,105,0.5), rgba(30,41,59,0.2), rgba(148,163,184,0.3))',
            filter: 'blur(14px)', opacity: 0.5, pointerEvents: 'none',
          }} />

          <div style={{
            position: 'relative', borderRadius: 28,
            border: '1px solid rgba(255,255,255,0.1)',
            background: 'rgba(8,8,8,0.95)',
            backdropFilter: 'blur(32px)',
            padding: 'clamp(36px, 5vw, 60px)',
            boxShadow: '0 40px 80px rgba(0,0,0,0.7)',
            overflow: 'hidden',
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            gap: 32,
            alignItems: 'center',
          }}>
            {/* top shimmer */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)' }} />

            {/* decorative grid intersection in corner */}
            <div style={{ position: 'absolute', bottom: 0, right: 0, width: 200, height: 200, pointerEvents: 'none', overflow: 'hidden', borderRadius: '0 0 28px 0' }}>
              {[...Array(4)].map((_, i) => (
                <div key={i} style={{ position: 'absolute', left: 0, right: 0, top: i * 40, height: 1, background: 'rgba(255,255,255,0.03)' }} />
              ))}
              {[...Array(4)].map((_, i) => (
                <div key={i} style={{ position: 'absolute', top: 0, bottom: 0, left: i * 40, width: 1, background: 'rgba(255,255,255,0.03)' }} />
              ))}
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <Sparkles size={16} color="#94a3b8" />
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: '0.16em', color: '#64748b', textTransform: 'uppercase' }}>Open to Work</span>
              </div>

              <h3 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 900, letterSpacing: '-0.03em',
                margin: '0 0 12px',
                background: 'linear-gradient(90deg, #f1f5f9, #94a3b8)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>
                Let's Build Something Great
              </h3>

              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)', lineHeight: 1.75, margin: '0 0 20px', maxWidth: 520 }}>
                Open to internships, full-time roles, freelance projects, and open-source collaborations.
                Let's create innovative solutions together.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {['Internship', 'Full-time', 'Freelance', 'Open Source'].map((tag) => (
                  <span key={tag} style={{
                    fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.08)', padding: '4px 10px', borderRadius: 7,
                  }}>{tag}</span>
                ))}
              </div>
            </div>

            {/* CTA button */}
            <motion.a
              href="mailto:devenbofficial@gmail.com"
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                padding: '24px 32px',
                borderRadius: 20,
                flexShrink: 0,
                background: 'linear-gradient(135deg, #334155, #1e293b)',
                border: '1px solid rgba(255,255,255,0.12)',
                boxShadow: '0 16px 40px rgba(0,0,0,0.6)',
                textDecoration: 'none',
                cursor: 'pointer',
                minWidth: 130,
              }}
            >
              <div>
                <PaperPlane />
              </div>
              <span style={{ fontSize: 13, fontWeight: 800, color: '#f1f5f9', letterSpacing: '-0.01em' }}>
                Send Message
              </span>
              <span
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 9,
                  color: '#475569',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                24hr reply
              </span>
            </motion.a>
          </div>
        </motion.div>

        {/* ── Footer ── */}
        <motion.div {...fadeUp(0.4)} style={{ marginTop: 64, textAlign: 'center' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 12,
            padding: '14px 28px', borderRadius: 14,
            border: '1px solid rgba(255,255,255,0.07)',
            background: 'rgba(255,255,255,0.03)',
            backdropFilter: 'blur(12px)',
          }}>
            {/* pulse dot */}
            <span style={{ position: 'relative', display: 'flex', width: 8, height: 8 }}>
              <motion.span
                animate={{ scale: [1, 2], opacity: [0.6, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#94a3b8' }}
              />
              <span style={{ position: 'relative', width: 8, height: 8, borderRadius: '50%', background: '#94a3b8', display: 'inline-flex' }} />
            </span>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: 'rgba(255,255,255,0.35)', margin: 0, letterSpacing: '0.06em' }}>
              © 2026 Deven Bagade · Kalyan, Maharashtra
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}