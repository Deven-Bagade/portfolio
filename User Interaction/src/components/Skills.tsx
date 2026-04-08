import { Code2, MessageSquare, TrendingUp } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'motion/react';

interface SkillBarProps {
  name: string;
  level: number;
  color: string;
  delay?: number;
}

function SkillBar({ name, level, color, delay = 0 }: SkillBarProps) {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      setTimeout(() => setWidth(level), 100 + delay);
    }
  }, [isInView, level, delay]);

  return (
    <motion.div
      ref={ref}
      className="mb-6"
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: delay / 1000 }}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-white/80">{name}</span>
        <span className="text-sm text-white/50">{level}%</span>
      </div>
      <div className="h-3 bg-white/10 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-1000 ease-out ${color}`}
          style={{ width: `${width}%` }}
        ></div>
      </div>
    </motion.div>
  );
}

export function Skills() {
  const technicalSkills = {
    'Languages': ['Java', 'JavaScript', 'C'],
    'Full-Stack & Mobile': ['MERN Stack', 'Flutter', 'Firebase', 'Android Studio', 'REST APIs', 'JWT', 'OAuth 2.0', 'Google APIs'],
    'Frameworks & Tools': ['Tailwind CSS', 'Java Swing', 'Apache Tomcat', '100ms'],
    'Databases & Version Control': ['MySQL', 'MongoDB', 'Git', 'GitHub']
  };

  const skillLevels = [
    { name: 'MERN Stack', level: 95, color: 'bg-gradient-to-r from-gray-400 to-gray-500' },
    { name: 'Flutter & Firebase', level: 90, color: 'bg-gradient-to-r from-gray-500 to-gray-600' },
    { name: 'Java & Servlets', level: 85, color: 'bg-gradient-to-r from-gray-600 to-gray-700' },
    { name: 'REST APIs & JWT', level: 90, color: 'bg-gradient-to-r from-gray-400 to-gray-600' },
    { name: 'MySQL & MongoDB', level: 88, color: 'bg-gradient-to-r from-gray-500 to-gray-700' },
    { name: 'Git & GitHub', level: 92, color: 'bg-gradient-to-r from-gray-300 to-gray-500' }
  ];

  const softSkills = [
    { name: 'Analytical problem-solving', icon: '🧠' },
    { name: 'Team collaboration & communication', icon: '🤝' },
    { name: 'Adaptability & quick learning', icon: '⚡' },
    { name: 'Attention to detail & ownership', icon: '🎯' }
  ];

  return (
    <section
      id="skills"
      className="relative overflow-hidden py-24 px-4"
      style={{ background: '#0a0a0a', fontFamily: "'Syne', sans-serif" }}
    >
      {/* Fonts */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@400;700;800;900&display=swap"
      />

      {/* Grid texture overlay */}
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
            radial-gradient(ellipse 60% 50% at 10% 30%, rgba(128,128,128,0.06) 0%, transparent 60%),
            radial-gradient(ellipse 50% 45% at 90% 70%, rgba(64,64,64,0.04) 0%, transparent 55%)
          `,
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2
            className="text-5xl md:text-6xl mb-4 font-black tracking-tight"
            style={{
              background: 'linear-gradient(135deg, #d1d5db, #ffffff, #9ca3af)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Skills & Expertise
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto" style={{ fontFamily: "'Space Mono', monospace" }}>
            A comprehensive toolkit built through hands-on projects, internships, and continuous learning
          </p>
        </div>

        {/* Skill Progress Bars (commented out in original, but we'll keep it ready) */}
        
        {/* <div className="mb-12">
          <div className="bg-black/60 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-gray-500 to-gray-700 rounded-xl flex items-center justify-center shadow-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-3xl text-white/90">Proficiency Levels</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-x-8">
              {skillLevels.map((skill, index) => (
                <SkillBar key={skill.name} {...skill} delay={index * 100} />
              ))}
            </div>
          </div>
        </div> */}
       

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Technical Skills */}
          <div className="bg-black/60 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/10 hover:border-white/20 transition-all duration-300">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-gray-500 to-gray-700 rounded-xl flex items-center justify-center shadow-lg">
                <Code2 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-3xl text-white/90">Technical Skills</h3>
            </div>

            <div className="space-y-6">
              {Object.entries(technicalSkills).map(([category, skills]) => (
                <div key={category} className="group">
                  <h4 className="text-sm text-white/80 mb-3 flex items-center gap-2">
                    <div className="w-1 h-4 bg-gradient-to-b from-gray-400 to-gray-600 rounded"></div>
                    {category}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-4 py-2 bg-white/5 text-white/80 rounded-xl text-sm border border-white/10 hover:border-white/30 hover:bg-white/10 transition-all duration-300 cursor-default hover:scale-105"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Soft Skills */}
          <div className="bg-black/60 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/10 hover:border-white/20 transition-all duration-300">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-gray-500 to-gray-700 rounded-xl flex items-center justify-center shadow-lg">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-3xl text-white/90">Soft Skills</h3>
            </div>

            <div className="space-y-4">
              {softSkills.map((skill, index) => (
                <div
                  key={skill.name}
                  className="flex items-start gap-4 p-4 bg-white/5 rounded-2xl border border-white/10 hover:border-white/30 hover:bg-white/10 transition-all duration-300 group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="text-3xl group-hover:scale-110 transition-transform">{skill.icon}</div>
                  <p className="text-white/80 flex-1">{skill.name}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t border-white/10">
              <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                <h4 className="text-lg text-white/90 mb-3">🎯 Additional Competencies</h4>
                <p className="text-white/70">
                  Experienced in Agile development, modular software engineering practices, 
                  code review processes, and collaborative development workflows.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}