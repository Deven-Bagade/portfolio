import {
  ArrowLeft, Award, Trophy, Users, Lightbulb, Calendar,
  Target, Check, Star, TrendingUp, Zap, Layers, ExternalLink,
  ChevronLeft, ChevronRight, ArrowUpRight,
} from 'lucide-react';
import { motion, useScroll, useTransform, useInView } from 'motion/react';
import { useState, useRef } from 'react';

interface AchievementDetailProps {
  achievementId: number;
  onBack: () => void;
}

// ── Reusable scroll-reveal wrapper ──────────────────────────────────────────
function Reveal({
  children,
  delay = 0,
  direction = 'up',
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'left' | 'right';
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.15 });
  const dirMap = { up: [0, 32], left: [-40, 0], right: [40, 0] };
  const [dx, dy] = dirMap[direction];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: dx, y: dy }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: dx, y: dy }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

// ── Section label helper ────────────────────────────────────────────────────
function SectionLabel({
  icon: Icon,
  text,
  inline = false,
}: {
  icon: React.ElementType;
  text: string;
  inline?: boolean;
}) {
  return (
    <div style={{ display: inline ? 'inline-flex' : 'flex', alignItems: 'center', gap: 10, marginBottom: inline ? 0 : 24 }}>
      <div style={{
        width: 32, height: 32, borderRadius: 9,
        background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon size={15} color="#64748b" />
      </div>
      <span style={{
        fontFamily: "'Space Mono', monospace", fontSize: 11,
        letterSpacing: '0.14em', color: '#475569', textTransform: 'uppercase',
      }}>
        {text}
      </span>
    </div>
  );
}

export function AchievementDetail({ achievementId, onBack }: AchievementDetailProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const [similarIndex, setSimilarIndex] = useState(0);

  const GRAD_STOPS: Record<string, string> = {
    'from-blue-500 to-cyan-600':     '#3b82f6, #0891b2',
    'from-yellow-500 to-orange-600': '#eab308, #ea580c',
    'from-green-500 to-emerald-600': '#22c55e, #059669',
    'from-purple-500 to-pink-600':   '#a855f7, #db2777',
  };

  const achievements = [
    {
      title: 'Winter of Code',
      subtitle: 'Open-Source Contributor',
      AchIcon: Award,
      period: 'Winter 2024',
      organization: 'DevScript Winter of Code',
      description: 'Participated in a month-long open-source program contributing to meaningful projects and collaborating with developers worldwide.',
      longDescription: 'Winter of Code provided an incredible opportunity to dive deep into open-source development. Working on real-world codebases, I learned to navigate complex project structures, understand existing code, and make meaningful contributions. The experience taught me the importance of clear communication, thorough testing, and collaborative problem-solving in distributed teams.',
      contributions: [
        { title: 'Feature Development', desc: 'Implemented 3 major features improving user experience and functionality' },
        { title: 'Bug Fixes', desc: 'Resolved 12+ critical and medium-priority bugs across different modules' },
        { title: 'Code Reviews', desc: 'Participated in peer reviews, providing constructive feedback on 20+ PRs' },
        { title: 'Documentation', desc: 'Enhanced project documentation and created setup guides for new contributors' },
      ],
      skills: ['Git & GitHub', 'Code Review', 'Issue Tracking', 'Documentation', 'Testing', 'Collaboration'],
      impact: [
        { metric: 'Pull Requests', value: '15+', icon: TrendingUp },
        { metric: 'Lines of Code', value: '2000+', icon: Award },
        { metric: 'Projects', value: '3', icon: Star },
      ],
      learnings: [
        'Mastered Git workflows including branching, merging, and conflict resolution',
        'Learned to write clean, maintainable code following project conventions',
        'Developed skills in asynchronous communication with global teams',
        'Gained experience in contributing to diverse technology stacks',
      ],
      gradient: 'from-blue-500 to-cyan-600',
      gradStops: '#3b82f6, #0891b2',
    },
    {
      title: 'Aavishkar 2024',
      subtitle: 'UG Zonal Participant',
      AchIcon: Trophy,
      period: '2024',
      organization: 'University of Mumbai',
      description: 'Selected as zonal participant for presenting StockSync, an innovative inventory management solution at the prestigious Aavishkar Research Convention.',
      longDescription: 'Being selected for Aavishkar Research Convention 2024 was a significant milestone. The competition involved presenting research and innovations to expert panels. StockSync, our inventory management solution, stood out among numerous entries in the Commerce, Management & Law category. The experience of defending our research, answering challenging questions, and receiving feedback from industry experts was invaluable.',
      contributions: [
        { title: 'Research Methodology', desc: 'Conducted comprehensive research on inventory management challenges' },
        { title: 'Solution Design', desc: 'Designed innovative approach combining real-time sync with predictive analytics' },
        { title: 'Prototype Development', desc: 'Built working prototype demonstrating key features and capabilities' },
        { title: 'Presentation', desc: 'Presented research findings and solution to expert panel and audience' },
      ],
      skills: ['Research Methodology', 'Innovation', 'Presentation', 'Problem Solving', 'System Design'],
      impact: [
        { metric: 'Selection Level', value: 'Zonal', icon: Trophy },
        { metric: 'Category Rank', value: 'Top 10', icon: Star },
        { metric: 'Jury Score', value: '8.5/10', icon: Award },
      ],
      learnings: [
        'Developed strong research and analytical skills through rigorous preparation',
        'Learned to communicate complex technical concepts clearly to non-technical audiences',
        'Gained experience in competitive academic presentations under expert scrutiny',
        'Enhanced ability to defend ideas and respond to challenging questions confidently',
      ],
      gradient: 'from-yellow-500 to-orange-600',
      gradStops: '#eab308, #ea580c',
    },
    {
      title: 'Smart India Hackathon 2024',
      subtitle: 'Top 35 / 110 Teams',
      AchIcon: Lightbulb,
      period: 'September 2024',
      organization: 'Ministry of Education, Govt. of India',
      description: 'Secured Top 35 position among 110 participating teams in the internal hackathon by developing an innovative e-waste management solution.',
      longDescription: 'Smart India Hackathon 2024 was an intense 24-hour challenge that pushed our limits. Our team tackled the pressing problem of e-waste management with a comprehensive digital solution. Working under time pressure, we developed a platform connecting e-waste generators with certified recyclers, featuring real-time tracking, awareness campaigns, and incentive mechanisms. The hackathon taught us rapid prototyping, team coordination under pressure, and effective time management.',
      contributions: [
        { title: 'Solution Architecture', desc: 'Designed scalable architecture for e-waste tracking and management system' },
        { title: 'Full-Stack Development', desc: 'Developed both frontend and backend components within 24 hours' },
        { title: 'Team Coordination', desc: 'Coordinated with team of 6 members for efficient task distribution' },
        { title: 'Pitch Presentation', desc: 'Delivered compelling pitch highlighting solution impact and feasibility' },
      ],
      skills: ['Rapid Prototyping', 'Full-Stack Development', 'Team Leadership', 'Pitch Presentation', 'Problem Solving'],
      impact: [
        { metric: 'Final Rank', value: 'Top 35', icon: Trophy },
        { metric: 'Teams Competed', value: '110', icon: Users },
        { metric: 'Development Time', value: '24hrs', icon: TrendingUp },
      ],
      learnings: [
        'Mastered rapid prototyping and MVP development under extreme time pressure',
        'Learned to ruthlessly prioritize features when every minute counts',
        'Developed resilience and the ability to stay focused under pressure',
        'Enhanced team collaboration and real-time communication skills dramatically',
      ],
      gradient: 'from-green-500 to-emerald-600',
      gradStops: '#22c55e, #059669',
    },
    {
      title: 'Core Tech Member – GDG VIT',
      subtitle: 'Google Developer Groups',
      AchIcon: Users,
      period: '2024 – Present',
      organization: 'Google Developer Groups – VIT Chapter',
      description: 'Serving as core technical team member, contributing to event organization, website development, and fostering the tech community at VIT.',
      longDescription: 'As a Core Tech Member of GDG VIT, I play a pivotal role in organizing technical events, workshops, and hackathons that benefit the entire student community. Beyond event management, I led the development of the GDG VIT event website using modern web technologies. This role has enhanced my leadership, organizational, and technical skills while allowing me to give back to the community.',
      contributions: [
        { title: 'Event Website Development', desc: 'Built responsive event website with registration system using React and Tailwind CSS' },
        { title: 'Workshop Organization', desc: 'Organized 5+ technical workshops on web development, cloud computing, and AI' },
        { title: 'Community Management', desc: 'Managed GDG community, facilitated discussions, and supported members' },
        { title: 'Speaker Coordination', desc: 'Coordinated with industry speakers and organized tech talks for students' },
      ],
      skills: ['Event Management', 'Web Development', 'Community Building', 'Public Speaking', 'Leadership'],
      impact: [
        { metric: 'Events Organized', value: '10+', icon: Calendar },
        { metric: 'Attendees', value: '500+', icon: Users },
        { metric: 'Workshops', value: '5+', icon: Award },
      ],
      learnings: [
        'Developed strong leadership and organizational capabilities through hands-on event management',
        'Learned the full lifecycle of event planning — from ideation to post-event follow-up',
        'Enhanced public speaking and community presentation skills significantly',
        'Built a valuable professional network within the broader tech ecosystem',
      ],
      gradient: 'from-purple-500 to-pink-600',
      gradStops: '#a855f7, #db2777',
    },
  ];

  const achievement = achievements[achievementId];
  const gradStops = GRAD_STOPS[achievement.gradient] ?? achievement.gradStops ?? '#64748b, #334155';
  const g0 = gradStops.split(',')[0].trim();
  const AchIcon = achievement.AchIcon;

  const similarAchievements = achievements.filter((_, i) => i !== achievementId);
  const visibleSimilar = 2;

  const prevSimilar = () => setSimilarIndex(i => Math.max(0, i - 1));
  const nextSimilar = () => setSimilarIndex(i => Math.min(similarAchievements.length - visibleSimilar, i + 1));

  return (
    <div style={{
      minHeight: '100vh', background: '#060606',
      fontFamily: "'Syne', sans-serif", color: '#e2e8f0', overflowX: 'hidden',
    }}>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@400;600;700;800;900&display=swap" />

      {/* ── Global grid texture ── */}
      <div style={{
        pointerEvents: 'none', position: 'fixed', inset: 0, zIndex: 0,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      {/* ══════════════════════════════════════════════════════
          HERO — parallax
      ══════════════════════════════════════════════════════ */}
      <div ref={heroRef} style={{ position: 'relative', height: '90vh', minHeight: 560, overflow: 'hidden' }}>
        {/* Parallax bg */}
        <motion.div style={{ position: 'absolute', inset: '-20%', y: heroY }}>
          <div style={{
            position: 'absolute', inset: 0,
            background: `radial-gradient(ellipse 80% 70% at 60% 40%, ${g0}33, transparent 65%),
                         radial-gradient(ellipse 50% 50% at 20% 80%, ${gradStops.split(',').at(-1) ?? g0}22, transparent 60%),
                         #060606`,
          }} />
          {/* Diagonal accent lines */}
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.07 }} preserveAspectRatio="none">
            {[...Array(8)].map((_, i) => (
              <line key={i} x1={`${i * 15}%`} y1="0%" x2={`${i * 15 + 30}%`} y2="100%"
                stroke="white" strokeWidth="1" />
            ))}
          </svg>
          {/* Floating orbs */}
          {[...Array(5)].map((_, i) => (
            <motion.div key={i}
              style={{
                position: 'absolute',
                width: 200 + i * 80, height: 200 + i * 80, borderRadius: '50%',
                background: `radial-gradient(circle, ${g0}18, transparent 70%)`,
                left: `${10 + i * 18}%`, top: `${10 + (i % 3) * 25}%`,
                filter: 'blur(30px)',
              }}
              animate={{ y: [0, -20, 0], x: [0, i % 2 ? 12 : -12, 0] }}
              transition={{ duration: 6 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.8 }}
            />
          ))}
        </motion.div>

        {/* Hero content */}
        <motion.div style={{
          position: 'relative', zIndex: 10, height: '100%',
          display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
          padding: 'clamp(24px, 5vw, 64px)', opacity: heroOpacity,
        }}>
          {/* Back button */}
          <motion.button
            onClick={onBack}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ x: -4 }}
            style={{
              position: 'absolute', top: 'clamp(20px, 4vw, 40px)', left: 'clamp(20px, 4vw, 48px)',
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '10px 20px', borderRadius: 12,
              background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.12)',
              color: '#cbd5e1', fontFamily: "'Space Mono', monospace",
              fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase',
              cursor: 'pointer',
            }}
          >
            <ArrowLeft size={14} /> Back
          </motion.button>

          <div style={{ maxWidth: 900 }}>
            {/* Icon + subtitle row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}
            >
              {/* Icon badge */}
              <div style={{
                width: 56, height: 56, borderRadius: 18, flexShrink: 0,
                background: `linear-gradient(135deg, ${gradStops})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: `0 8px 28px ${g0}55`,
                border: '1px solid rgba(255,255,255,0.12)',
              }}>
                <AchIcon size={26} color="#fff" />
              </div>
              {/* Tag pill */}
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '5px 14px', borderRadius: 9999,
                background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
                fontFamily: "'Space Mono', monospace", fontSize: 10,
                letterSpacing: '0.15em', color: '#94a3b8', textTransform: 'uppercase',
              }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: g0 }} />
                {achievement.subtitle}
              </div>
            </motion.div>

            {/* Organization */}
            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18 }}
              style={{
                fontFamily: "'Space Mono', monospace", fontSize: 'clamp(11px, 1.3vw, 13px)',
                color: g0, letterSpacing: '0.12em', textTransform: 'uppercase',
                margin: '0 0 10px',
              }}
            >
              {achievement.organization}
            </motion.p>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontSize: 'clamp(2.4rem, 6vw, 5.5rem)', fontWeight: 900,
                letterSpacing: '-0.04em', lineHeight: 0.95, margin: '0 0 24px',
                background: `linear-gradient(120deg, #ffffff 30%, ${g0}cc)`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}
            >
              {achievement.title}
            </motion.h1>

            {/* Period pill */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.32 }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 7, marginBottom: 28 }}
            >
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 7,
                padding: '7px 16px', borderRadius: 10,
                background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.12)',
                fontFamily: "'Space Mono', monospace", fontSize: 11,
                color: '#94a3b8', letterSpacing: '0.06em',
              }}>
                <Calendar size={13} color={g0} />
                {achievement.period}
              </div>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.42 }}
              style={{ fontSize: 'clamp(14px, 1.8vw, 17px)', color: 'rgba(255,255,255,0.55)', lineHeight: 1.75, maxWidth: 620, margin: 0 }}
            >
              {achievement.description}
            </motion.p>
          </div>
        </motion.div>

        {/* Bottom fade */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 120, background: 'linear-gradient(transparent, #060606)', zIndex: 5 }} />
      </div>

      {/* ══════════════════════════════════════════════════════
          MAIN CONTENT
      ══════════════════════════════════════════════════════ */}
      <div style={{ position: 'relative', zIndex: 10, maxWidth: 1100, margin: '0 auto', padding: '0 clamp(16px, 4vw, 48px) 80px' }}>

        {/* ── Metrics ── */}
        <Reveal delay={0}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 80, marginTop: -40 }}>
            {achievement.impact.map((metric, i) => {
              const MIcon = metric.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -6 }}
                  style={{
                    background: 'rgba(14,14,14,0.95)', backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 20, padding: '28px 24px', textAlign: 'center',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                    position: 'relative', overflow: 'hidden',
                  }}
                >
                  <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 50% 0%, ${g0}12, transparent 60%)` }} />
                  <div style={{
                    width: 52, height: 52, borderRadius: 16, margin: '0 auto 16px',
                    background: `linear-gradient(135deg, ${gradStops})`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: `0 8px 24px ${g0}44`,
                  }}>
                    <MIcon size={22} color="#fff" />
                  </div>
                  <div style={{ fontSize: 36, fontWeight: 900, letterSpacing: '-0.03em', color: '#f1f5f9', marginBottom: 6 }}>{metric.value}</div>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: '0.12em', color: '#64748b', textTransform: 'uppercase' }}>{metric.metric}</div>
                </motion.div>
              );
            })}
          </div>
        </Reveal>

        {/* ── Overview / Story ── */}
        <Reveal delay={0.05}>
          <section style={{ marginBottom: 80 }}>
            <SectionLabel icon={Target} text="The Story" />
            <div style={{
              background: 'rgba(12,12,12,0.9)', backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 24, padding: 'clamp(28px, 4vw, 48px)',
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: `linear-gradient(180deg, ${gradStops})`, borderRadius: '3px 0 0 3px' }} />
              <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 60% 50% at 0% 50%, ${g0}0a, transparent 60%)` }} />
              <p style={{ fontSize: 'clamp(15px, 1.5vw, 17px)', color: 'rgba(255,255,255,0.6)', lineHeight: 1.9, margin: 0, position: 'relative', zIndex: 1 }}>
                {achievement.longDescription}
              </p>
            </div>
          </section>
        </Reveal>

        {/* ── Contributions ── */}
        <section style={{ marginBottom: 80 }}>
          <Reveal delay={0.05}>
            <SectionLabel icon={Layers} text="Key Contributions" />
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            {achievement.contributions.map((c, i) => (
              <Reveal key={i} delay={i * 0.06} direction={i % 2 === 0 ? 'left' : 'right'}>
                <motion.div
                  whileHover={{ y: -5, borderColor: 'rgba(255,255,255,0.18)' }}
                  style={{
                    background: 'rgba(12,12,12,0.9)', backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: 20, padding: '24px',
                    display: 'flex', alignItems: 'flex-start', gap: 16,
                    cursor: 'default', transition: 'border-color 0.3s', height: '100%',
                  }}
                >
                  <div style={{
                    width: 44, height: 44, borderRadius: 13, flexShrink: 0,
                    background: `linear-gradient(135deg, ${gradStops})`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: `0 6px 20px ${g0}33`,
                  }}>
                    <Check size={18} color="#fff" />
                  </div>
                  <div>
                    <h3 style={{ fontSize: 15, fontWeight: 800, color: '#f1f5f9', margin: '0 0 6px', letterSpacing: '-0.01em' }}>{c.title}</h3>
                    <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, margin: 0 }}>{c.desc}</p>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── Skills Developed ── */}
        <Reveal delay={0.05}>
          <section style={{ marginBottom: 80 }}>
            <SectionLabel icon={Zap} text="Skills Developed" />
            <div style={{
              background: 'rgba(12,12,12,0.9)', backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 24, padding: 'clamp(24px, 3vw, 40px)',
            }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {achievement.skills.map((skill, i) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: false, amount: 0.5 }}
                    transition={{ delay: i * 0.04, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ scale: 1.06, y: -2 }}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 8,
                      padding: '9px 18px', borderRadius: 12,
                      background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)',
                      fontFamily: "'Space Mono', monospace", fontSize: 12, color: '#94a3b8',
                      cursor: 'default',
                    }}
                  >
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: `linear-gradient(135deg, ${gradStops})` }} />
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          </section>
        </Reveal>

        {/* ── Key Takeaways (numbered steps) ── */}
        <Reveal delay={0.05}>
          <section style={{ marginBottom: 80 }}>
            <SectionLabel icon={Star} text="Key Takeaways" />
            <div style={{
              background: 'rgba(12,12,12,0.9)', backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 24, padding: 'clamp(24px, 3vw, 40px)',
            }}>
              {achievement.learnings.map((learning, i) => (
                <Reveal key={i} delay={i * 0.08} direction="left">
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 20,
                    padding: '16px 0',
                    borderBottom: i < achievement.learnings.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                  }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: '50%', flexShrink: 0,
                      background: `linear-gradient(135deg, ${gradStops})`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: `0 6px 20px ${g0}44`,
                      fontFamily: "'Space Mono', monospace", fontSize: 13, fontWeight: 700, color: '#fff',
                    }}>
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', lineHeight: 1.75, margin: 0, flex: 1 }}>
                      {learning}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>
        </Reveal>

        {/* ── Similar Achievements Carousel ── */}
        <section style={{ marginBottom: 80 }}>
          <Reveal delay={0.05}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
              <SectionLabel icon={Trophy} text="Other Achievements" inline />
              <div style={{ display: 'flex', gap: 8 }}>
                {[
                  { fn: prevSimilar, Icon: ChevronLeft, disabled: similarIndex === 0 },
                  { fn: nextSimilar, Icon: ChevronRight, disabled: similarIndex >= similarAchievements.length - visibleSimilar },
                ].map(({ fn, Icon, disabled }, idx) => (
                  <motion.button
                    key={idx}
                    onClick={fn}
                    whileHover={!disabled ? { scale: 1.08 } : {}}
                    whileTap={!disabled ? { scale: 0.95 } : {}}
                    style={{
                      width: 40, height: 40, borderRadius: 10, cursor: disabled ? 'not-allowed' : 'pointer',
                      background: disabled ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.07)',
                      border: '1px solid rgba(255,255,255,0.09)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: disabled ? '#334155' : '#94a3b8',
                      transition: 'all 0.2s',
                    }}
                  >
                    <Icon size={18} />
                  </motion.button>
                ))}
              </div>
            </div>
          </Reveal>

          <div style={{ overflow: 'hidden' }}>
            <motion.div
              animate={{ x: `-${similarIndex * (100 / visibleSimilar)}%` }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: 'flex', gap: 16 }}
            >
              {similarAchievements.map((sa, i) => {
                const saStops = GRAD_STOPS[sa.gradient] ?? '#64748b, #334155';
                const sa0 = saStops.split(',')[0].trim();
                const SaIcon = sa.AchIcon;
                return (
                  <motion.div
                    key={i}
                    whileHover={{ y: -6, borderColor: 'rgba(255,255,255,0.16)' }}
                    style={{
                      minWidth: `calc(${100 / visibleSimilar}% - ${16 * (visibleSimilar - 1) / visibleSimilar}px)`,
                      background: 'rgba(12,12,12,0.9)', backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: 20, overflow: 'hidden', cursor: 'pointer',
                      transition: 'border-color 0.3s', flexShrink: 0,
                    }}
                  >
                    {/* Gradient top bar */}
                    <div style={{ height: 4, background: `linear-gradient(90deg, ${saStops})` }} />
                    <div style={{ padding: '20px 20px 22px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <div style={{
                            width: 36, height: 36, borderRadius: 11,
                            background: `linear-gradient(135deg, ${saStops})`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: `0 4px 14px ${sa0}44`, flexShrink: 0,
                          }}>
                            <SaIcon size={16} color="#fff" />
                          </div>
                          <h3 style={{ fontSize: 15, fontWeight: 800, color: '#f1f5f9', margin: 0, letterSpacing: '-0.02em' }}>{sa.title}</h3>
                        </div>
                        <motion.div whileHover={{ scale: 1.15 }}>
                          <ArrowUpRight size={16} color="#475569" />
                        </motion.div>
                      </div>
                      <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', lineHeight: 1.6, margin: '0 0 12px' }}>{sa.subtitle}</p>
                      <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: 6,
                        padding: '3px 10px', borderRadius: 7,
                        background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)',
                        fontFamily: "'Space Mono', monospace", fontSize: 9, color: '#475569',
                      }}>
                        <Calendar size={9} color={sa0} />
                        {sa.period}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* ── CTA ── */}
        <Reveal delay={0.05}>
          <div style={{ position: 'relative', borderRadius: 28, overflow: 'hidden' }}>
            {/* Glow ring */}
            <div style={{ position: 'absolute', inset: -2, background: `linear-gradient(135deg, ${gradStops})`, borderRadius: 30, opacity: 0.4, filter: 'blur(12px)' }} />
            <div style={{
              position: 'relative', background: 'rgba(8,8,8,0.98)', borderRadius: 28,
              border: '1px solid rgba(255,255,255,0.10)',
              padding: 'clamp(36px, 5vw, 64px)', textAlign: 'center', overflow: 'hidden',
            }}>
              <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 60% 50% at 50% 0%, ${g0}10, transparent 60%)` }} />
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${g0}80, transparent)` }} />

              <motion.div
                animate={{ scale: [1, 1.05, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '5px 14px', borderRadius: 9999, marginBottom: 20,
                  background: `${g0}18`, border: `1px solid ${g0}40`,
                  fontFamily: "'Space Mono', monospace", fontSize: 10,
                  letterSpacing: '0.14em', color: g0, textTransform: 'uppercase',
                }}
              >
                <Star size={11} /> Inspired by this achievement?
              </motion.div>

              <h3 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 900, letterSpacing: '-0.035em', margin: '0 0 16px', color: '#f1f5f9' }}>
                Let's Build Something<br />
                <span style={{ background: `linear-gradient(120deg, ${gradStops})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Extraordinary
                </span>
              </h3>

              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.45)', lineHeight: 1.75, maxWidth: 480, margin: '0 auto 32px' }}>
                Discover more accomplishments and milestones from my journey.
              </p>

              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                <motion.button
                  onClick={onBack}
                  whileHover={{ scale: 1.04, y: -3 }} whileTap={{ scale: 0.97 }}
                  style={{
                    padding: '14px 28px', borderRadius: 14, cursor: 'pointer',
                    background: `linear-gradient(135deg, ${gradStops})`,
                    border: 'none', color: '#fff', fontWeight: 800, fontSize: 14,
                    fontFamily: "'Syne', sans-serif",
                    boxShadow: `0 16px 40px ${g0}40`,
                  }}
                >
                  View More Achievements
                </motion.button>
                <motion.a
                  href="mailto:devenbofficial@gmail.com"
                  whileHover={{ scale: 1.04, y: -3 }} whileTap={{ scale: 0.97 }}
                  style={{
                    padding: '14px 28px', borderRadius: 14, cursor: 'pointer',
                    background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    color: '#cbd5e1', fontWeight: 700, fontSize: 14,
                    fontFamily: "'Syne', sans-serif", textDecoration: 'none',
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                  }}
                >
                  <ExternalLink size={15} /> Get In Touch
                </motion.a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}