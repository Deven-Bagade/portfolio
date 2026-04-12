import { GraduationCap, Target, Heart, Award, BookOpen, Rocket, Sparkles } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

interface CounterProps {
  end: number;
  duration: number;
  suffix?: string;
}

function Counter({ end, duration, suffix = '' }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;
    let startTime: number | null = null;
    const startValue = 0;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) / (duration * 1000);
      if (progress < 1) {
        setCount(Math.floor(startValue + (end - startValue) * easeOutCubic(progress)));
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };
    requestAnimationFrame(animate);
  }, [isInView, end, duration]);

  const easeOutCubic = (x: number): number => 1 - Math.pow(1 - x, 3);

  return (
    <div ref={ref} className="inline-block">
      {count}{suffix}
    </div>
  );
}

export function About() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="about"
      className="relative overflow-hidden py-24 px-4"
      style={{ background: '#0a0a0a', fontFamily: "'Syne', sans-serif" }}
    >
      {/* Fonts */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@400;700;800;900&display=swap"
      />

      {/* Grid texture overlay - grayscale */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Radial gradients - grayscale */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: `
            radial-gradient(ellipse 60% 50% at 10% 30%, rgba(128,128,128,0.08) 0%, transparent 60%),
            radial-gradient(ellipse 50% 45% at 90% 70%, rgba(64,64,64,0.06) 0%, transparent 55%)
          `,
        }}
      />

      {/* Subtle scanline (only if reduced motion not preferred) - grayscale */}
      {!reduceMotion && (
        <motion.div
          className="pointer-events-none absolute left-0 right-0 z-0 h-px"
          style={{ background: 'rgba(255,255,255,0.05)' }}
          animate={{ top: ['-2%', '102%'] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'linear', repeatDelay: 1.5 }}
        />
      )}

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header - grayscale gradient */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2
            className="text-5xl md:text-6xl mb-4 font-black tracking-tight"
            style={{
              background: 'linear-gradient(135deg, #d1d5db, #ffffff, #9ca3af)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            About Me
          </h2>
          <p
            className="max-w-2xl mx-auto text-white"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            Passionate developer crafting innovative solutions with clean code and user-centric design
          </p>
        </motion.div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Background Card */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative rounded-3xl backdrop-blur-xl border border-white p-8 shadow-2xl"
              style={{ background: 'rgba(0,0,0,0.65)' }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-500 to-gray-700 flex items-center justify-center shadow-lg">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">Background</h3>
              </div>
              <p className="text-white leading-relaxed mb-4">
                I'm a 3rd-year B.Tech Information Technology student at Vidyalankar Institute of Technology,
                Mumbai, maintaining a <span className="text-gray-300 font-semibold">9.65 CGPA</span>. My journey in technology has been driven by a passion for
                creating impactful solutions that bridge the gap between user needs and technical innovation.
              </p>
              <p className="text-white leading-relaxed">
                With hands-on experience in full-stack web development and mobile app development, I've worked
                on diverse projects ranging from mental health support applications to e-commerce platforms,
                always focusing on scalability, user experience, and clean code practices.
              </p>
            </motion.div>

            {/* Stats Cards - grayscale */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: 9.65, suffix: '', label: 'CGPA', icon: GraduationCap, gradient: 'from-gray-500 to-gray-600', color: '#9ca3af' },
                { value: 5, suffix: '+', label: 'Projects', icon: Rocket, gradient: 'from-gray-600 to-gray-700', color: '#cbd5e1' },
                { value: 15, suffix: '+', label: 'Technologies', icon: Award, gradient: 'from-gray-500 to-gray-800', color: '#e5e7eb' }
              ].map((stat, index) => {
                const StatIcon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    whileHover={{ y: -6, scale: 1.03 }}
                    className="relative rounded-2xl border border-white backdrop-blur-md p-4 text-center"
                    style={{ background: 'rgba(0,0,0,0.6)' }}
                  >
                    <div className={`w-10 h-10 mx-auto mb-3 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg`}>
                      <StatIcon className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-2xl font-bold mb-1" style={{ color: stat.color }}>
                      <Counter end={stat.value} duration={2000} suffix={stat.suffix} />
                    </div>
                    <div className="text-xs uppercase tracking-wider text-white" style={{ fontFamily: "'Space Mono', monospace" }}>
                      {stat.label}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right Column - Feature Cards (grayscale) */}
          <div className="space-y-6">
            {[
              {
                icon: GraduationCap,
                title: 'Education Excellence',
                description: 'Currently pursuing B.Tech in Information Technology with a 9.65 CGPA, building a strong foundation in computer science fundamentals and modern development practices.',
                gradient: 'from-gray-500 to-gray-600',
                borderGlow: '#9ca3af'
              },
              {
                icon: Target,
                title: 'Career Goals',
                description: 'Actively seeking opportunities to deliver value through technology-driven, scalable solutions. Aspiring to work on challenging problems that make a real-world impact.',
                gradient: 'from-gray-600 to-gray-700',
                borderGlow: '#cbd5e1'
              },
              {
                icon: Heart,
                title: 'Interests',
                description: 'Passionate about open-source development, participating in hackathons, and building applications that solve real-world problems. Enthusiastic about emerging technologies.',
                gradient: 'from-gray-500 to-gray-800',
                borderGlow: '#e5e7eb'
              }
            ].map((item, index) => {
              const ItemIcon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.6 }}
                  whileHover={{ y: -5, scale: 1.01 }}
                  className="group relative rounded-3xl backdrop-blur-xl border border-white p-6 transition-all duration-500"
                  style={{ background: 'rgba(0,0,0,0.6)' }}
                >
                  {/* Hover glow - subtle whitegray */}
                  <div
                    className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"
                    style={{ boxShadow: `0 0 40px ${item.borderGlow}`, background: `radial-gradient(circle at 30% 20%, ${item.borderGlow}20, transparent 70%)` }}
                  />
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                        <ItemIcon className="w-7 h-7 text-white" />
                      </div>
                      <h4 className="text-xl font-bold text-white">{item.title}</h4>
                    </div>
                    <p className="text-white leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Professional Summary Card - grayscale */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative group"
        >
          <div
            className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-gray-500 via-gray-600 to-gray-700 blur-xl opacity-30 group-hover:opacity-60 transition duration-500"
          />
          <div className="relative rounded-3xl backdrop-blur-xl border border-white p-8 md:p-12" style={{ background: 'rgba(0,0,0,0.8)' }}>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-500 to-gray-700 flex items-center justify-center shadow-xl">
                <Rocket className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-gray-300 to-white bg-clip-text text-transparent text-white">
                Professional Summary
              </h3>
            </div>
            <p className="text-white leading-relaxed text-lg">
              B.Tech Information Technology 3rd-year student at Vidyalankar Institute of Technology with a{' '}
              <span className="text-gray-300 font-semibold">9.65 CGPA</span>,
              experienced in developing <span className="text-white font-semibold">full-stack web and mobile applications</span>. Proven ability to build impactful projects,
              collaborate in hackathons, and contribute to open-source initiatives through internships and programs.
              Actively seeking opportunities to deliver value through technology-driven, scalable solutions.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}