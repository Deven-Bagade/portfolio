import { Briefcase, Calendar, MapPin, TrendingUp, Code, Users } from 'lucide-react';

export function Experience({ onViewDetail }: { onViewDetail?: (id: number) => void }) {
  const experiences = [
    {
      title: 'Software Development Intern',
      company: 'Shiksha Sathi',
      duration: '3 Months',
      location: 'Remote',
      description: [
        'Worked on a MERN stack web application following modular and scalable software engineering practices.',
        'Implemented key features including Google Calendar synchronization, real-time chat, and 100ms-based video conferencing, contributing to reliable and maintainable functionality.'
      ],
      skills: ['MERN Stack', 'Google APIs', '100ms', 'Real-time Chat'],
      icon: Code,
      color: 'gray'
    },
    {
      title: 'Web Development Intern',
      company: 'Vidyalankar Institute of Technology',
      duration: 'Dec 2024 – Feb 2025',
      location: 'Mumbai',
      description: [
        'Led development of frontend and backend components for the Ethnicize project using the MERN stack.',
        'Collaborated with a team of 4 in an Agile environment, improving responsiveness and user experience.',
        'Conducted testing and deployed application updates on a weekly basis.'
      ],
      skills: ['MERN Stack', 'Agile', 'Team Leadership', 'Testing'],
      icon: Users,
      color: 'gray'
    }
  ];

  const getGradientClasses = (color: string) => {
    const gradients: Record<string, string> = {
      gray: 'from-gray-500 to-gray-700',
    };
    return gradients[color] || gradients.gray;
  };

  return (
    <section id="experience" className="relative overflow-hidden py-24 px-4" style={{ background: '#0a0a0a', fontFamily: "'Syne', sans-serif" }}>
      {/* Fonts (optional but ensures consistency) */}
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

      {/* Radial gradients - grayscale (kept as background accents) */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gray-800 rounded-full filter blur-3xl opacity-20 -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gray-700 rounded-full filter blur-3xl opacity-20 -z-10"></div>

      <div className="relative z-10 max-w-6xl mx-auto mb-16">
        <div className="text-center mb-16">
          <h2
            className="text-5xl md:text-6xl mb-4 font-black tracking-tight"
            style={{
              background: 'linear-gradient(135deg, #d1d5db, #ffffff, #9ca3af)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Work Experience
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto" style={{ fontFamily: "'Space Mono', monospace" }}>
            Hands-on experience building real-world applications and collaborating in professional environments
          </p>
        </div>

        <div className="relative">
          {/* Timeline Line - bright gray/white */}
          <div
            className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full rounded-full"
            style={{
              background: 'linear-gradient(to bottom, #e5e7eb, #9ca3af, #e5e7eb)',
              boxShadow: '0 0 8px rgba(255,255,255,0.4)',
            }}
          ></div>

          <div className="space-y-12 mb-16">
            {experiences.map((exp, index) => {
              const Icon = exp.icon;
              const isEven = index % 2 === 0;

              return (
                <div
                  key={index}
                  className={`relative flex flex-col md:flex-row gap-8 items-center ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Content Card */}
                  <div className={`w-full md:w-5/12 ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                    <div
                      onClick={() => onViewDetail?.(index)}
                      className="group bg-black/60 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/10 hover:border-white/30 hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 cursor-pointer"
                    >
                      {/* Header */}
                      <div className={`flex items-start gap-4 mb-6 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                        <div
                          className={`w-16 h-16 bg-gradient-to-br ${getGradientClasses(
                            exp.color
                          )} rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}
                        >
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <div className={`flex-1 ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                          <h3 className="text-2xl text-white mb-1">{exp.title}</h3>
                          <p className="text-lg text-gray-300">{exp.company}</p>
                        </div>
                      </div>

                      {/* Info Tags */}
                      <div className={`flex flex-wrap gap-3 mb-6 ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                        <div className="flex items-center gap-2 px-4 py-2 bg-white/5 text-white rounded-xl text-sm border border-white/10">
                          <Calendar className="w-4 h-4" />
                          <span>{exp.duration}</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-white/5 text-white rounded-xl text-sm border border-white/10">
                          <MapPin className="w-4 h-4" />
                          <span>{exp.location}</span>
                        </div>
                      </div>

                      {/* Description */}
                      <ul className={`space-y-3 mb-6 ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                        {exp.description.map((item, idx) => (
                          <li key={idx} className={`flex items-start gap-3 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                            <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                            <p className="text-white/80 flex-1">{item}</p>
                          </li>
                        ))}
                      </ul>

                      {/* Skills */}
                      <div className={`flex flex-wrap gap-2 ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                        {exp.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-3 py-1 bg-white/5 text-white/80 rounded-lg text-sm border border-white/10 hover:bg-white/10 transition-all duration-300"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Center Timeline Node */}
                  <div className="hidden md:flex w-2/12 justify-center items-center z-10">
                    <div className="relative">
                      <div
                        className={`w-6 h-6 bg-gradient-to-br ${getGradientClasses(
                          exp.color
                        )} rounded-full border-4 border-white shadow-lg animate-pulse`}
                      ></div>
                      <div
                        className={`absolute inset-0 w-6 h-6 bg-gradient-to-br ${getGradientClasses(
                          exp.color
                        )} rounded-full animate-ping opacity-75`}
                      ></div>
                    </div>
                  </div>

                  {/* Spacer */}
                  <div className="hidden md:block w-5/12"></div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: 'Months Experience', value: '5+', icon: TrendingUp },
            { label: 'Projects Built', value: '5+', icon: Code },
            { label: 'Technologies', value: '15+', icon: Briefcase },
            { label: 'Team Projects', value: '3+', icon: Users },
          ].map((stat, index) => {
            const StatIcon = stat.icon;
            return (
              <div
                key={index}
                className="bg-black/60 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/10 hover:border-white/30 hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-gray-500 to-gray-700 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <StatIcon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl text-white/90 mb-1">{stat.value}</div>
                <div className="text-sm text-white/60">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}