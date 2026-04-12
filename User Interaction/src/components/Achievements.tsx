import { Award, Trophy, Users, Lightbulb, GraduationCap, Star } from 'lucide-react';

export function Achievements({ onViewDetail }: { onViewDetail?: (id: number) => void }) {
  const achievements = [
    {
      title: 'Winter of Code',
      subtitle: 'Open-Source Contributor',
      icon: Award,
      description: 'Contributed to open-source projects, working on real-world problem statements in a collaborative development environment.',
      details: [
        'Gained experience in codebase understanding and issue resolution',
        'Feature enhancement and version control workflows',
        'Collaborative development practices'
      ],
    },
    {
      title: 'Aavishkar Research Convention 2024',
      subtitle: 'UG Zonal Participant',
      icon: Trophy,
      description: 'Selected zonal participant for StockSync in the Commerce, Management & Law category.',
      details: [
        'Presented innovative inventory management solution',
        'Recognized at state-level research convention'
      ],
    },
    {
      title: 'Smart India Hackathon 2024',
      subtitle: 'Top 35 / 110 Teams',
      icon: Lightbulb,
      description: 'Ranked Top 35 out of 110 teams in SIH Internal Hackathon, developed innovative solution for e-waste management.',
      details: [
        'Developed comprehensive e-waste management solution',
        'Collaborated in 24-hour hackathon environment'
      ],
    },
    {
      title: 'Core Tech Member – GDG VIT',
      subtitle: 'Google Developer Groups',
      icon: Users,
      description: 'Contributed to execution of GDG VIT flagship technical event and developed the event website.',
      details: [
        'Built event website using React and Tailwind CSS',
        'Organized technical workshops and sessions',
        'Coordinated with team for successful event execution'
      ],
    }
  ];

  // Unified grayscale gradient for all icons and accents
  const iconGradient = 'from-gray-500 to-gray-700';
  const badgeGradient = 'from-gray-600 to-gray-800';

  return (
    <section
      id="achievements"
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

      {/* Radial gradients - subtle grayscale */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gray-800 rounded-full filter blur-3xl opacity-20 -z-10"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gray-700 rounded-full filter blur-3xl opacity-20 -z-10"></div>

      <div className="relative z-10 max-w-6xl mx-auto mb-16 mt-16">
        <div className="text-center">
          <h2
            className="text-5xl md:text-6xl mb-4 font-black tracking-tight"
            style={{
              background: 'linear-gradient(135deg, #d1d5db, #ffffff, #9ca3af)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Achievements & Leadership
          </h2>
          <p className="white max-w-2xl mx-auto" style={{ fontFamily: "'Space Mono', monospace" }}>
            Recognition, contributions, and leadership roles that shape my journey as a developer
          </p>
        </div>

        {/* Achievements Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;

            return (
              <div
                key={index}
                onClick={() => onViewDetail?.(index)}
                className="group relative cursor-pointer"
              >
                <div className="relative h-full bg-black/60 backdrop-blur-sm rounded-3xl p-8 border border-white/10 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:border-white/20">
                  {/* Subtle hover background (no color, just darker) */}
                  <div className="absolute inset-0 bg-white/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon & Title */}
                    <div className="flex items-start gap-4 mb-6">
                      <div className={`w-16 h-16 bg-gradient-to-br ${iconGradient} rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0 group-hover:scale-110 transition-all duration-500`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl text-white mb-1 group-hover:text-white transition-colors">
                          {achievement.title}
                        </h3>
                        <p className="text-sm text-gray-400">{achievement.subtitle}</p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-white mb-6 leading-relaxed">
                      {achievement.description}
                    </p>

                    {/* Details */}
                    {achievement.details.length > 0 && (
                      <ul className="space-y-3">
                        {achievement.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                            <p className="text-white">{detail}</p>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Glow Effect - subtle white/gray */}
                  <div className={`absolute -inset-1 bg-gradient-to-r ${iconGradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10`}></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Education Section */}
        <div className="relative">
          <div className="rounded-3xl p-[2px] shadow-2xl" style={{ background: 'linear-gradient(135deg, #525f7093, #1f29378c)' }}>
            <div className="bg-black/80 backdrop-blur-sm rounded-3xl p-8 md:p-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-500 to-gray-700 rounded-2xl flex items-center justify-center shadow-lg">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl text-white">Education</h3>
              </div>

              <div className="space-y-6">
                {/* B.Tech */}
                <div className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Star className="w-5 h-5 text-gray-300" />
                        <h4 className="text-xl text-white">Bachelor of Technology (B.Tech)</h4>
                      </div>
                      <p className="white mb-2">Information Technology</p>
                      <p className="white">Vidyalankar Institute of Technology, Mumbai</p>
                    </div>
                    <span className="px-4 py-2 bg-white/10 rounded-xl white shrink-0 text-sm border border-white/10">
                      2023 – 2027
                    </span>
                  </div>
                  <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                    <div className="px-4 py-2 bg-gradient-to-r from-gray-600 to-gray-800 text-white rounded-xl shadow-lg">
                      <span className="text-2xl">9.65</span>
                      <span className="text-sm ml-1">/ 10 CGPA</span>
                    </div>
                    <div className="text-sm white">(up to 3rd year)</div>
                  </div>
                </div>

                {/* HSC & SSC */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300">
                    <div className="flex items-center gap-2 mb-3">
                      <Trophy className="w-5 h-5 text-gray-300" />
                      <h4 className="text-lg text-white">Higher Secondary (HSC)</h4>
                    </div>
                    <p className="white mb-3">Model College of Arts, Commerce & Science</p>
                    <div className="px-4 py-2 bg-white/10 rounded-xl white inline-block border border-white/10">
                      <span className="text-xl">84%</span>
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300">
                    <div className="flex items-center gap-2 mb-3">
                      <Award className="w-5 h-5 text-gray-300" />
                      <h4 className="text-lg text-white">Secondary School (SSC)</h4>
                    </div>
                    <p className="white mb-3">St. Jude's High School</p>
                    <div className="px-4 py-2 bg-white/10 rounded-xl white inline-block border border-white/10">
                      <span className="text-xl">80%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Glow Effect - subtle */}
          <div className="absolute -inset-1 rounded-3xl blur-2xl opacity-20 -z-10" style={{ background: 'linear-gradient(135deg, #4b5563, #1f2937)' }}></div>
        </div>
      </div>
    </section>
  );
}