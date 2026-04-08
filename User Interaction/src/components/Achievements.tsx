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
      gradient: 'from-blue-500 to-cyan-600',
      bgGradient: 'from-blue-50 to-cyan-50'
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
      gradient: 'from-yellow-500 to-orange-600',
      bgGradient: 'from-yellow-50 to-orange-50'
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
      gradient: 'from-green-500 to-emerald-600',
      bgGradient: 'from-green-50 to-emerald-50'
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
      gradient: 'from-purple-500 to-pink-600',
      bgGradient: 'from-purple-50 to-pink-50'
    }
  ];

  return (
    <section id="achievements" className="py-20 px-4 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-100 rounded-full filter blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-100 rounded-full filter blur-3xl opacity-20"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl mb-4 bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
            Achievements & Leadership
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
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
                <div className="relative h-full bg-white rounded-3xl p-8 border border-gray-200/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]">
                  {/* Gradient Background on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${achievement.bgGradient} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon & Title */}
                    <div className="flex items-start gap-4 mb-6">
                      <div className={`w-16 h-16 bg-gradient-to-br ${achievement.gradient} rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                          {achievement.title}
                        </h3>
                        <p className={`text-sm bg-gradient-to-r ${achievement.gradient} bg-clip-text text-transparent`}>
                          {achievement.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-700 mb-6 leading-relaxed">
                      {achievement.description}
                    </p>

                    {/* Details */}
                    {achievement.details.length > 0 && (
                      <ul className="space-y-3">
                        {achievement.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <div className={`w-2 h-2 bg-gradient-to-r ${achievement.gradient} rounded-full mt-2 flex-shrink-0`}></div>
                            <p className="text-gray-600">{detail}</p>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Glow Effect */}
                  <div className={`absolute -inset-1 bg-gradient-to-r ${achievement.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 -z-10`}></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Education Section */}
        <div className="relative">
          <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-[2px] shadow-2xl">
            <div className="bg-white rounded-3xl p-8 md:p-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Education
                </h3>
              </div>

              <div className="space-y-6">
                {/* B.Tech */}
                <div className="relative bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-200/50 hover:border-blue-400 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Star className="w-5 h-5 text-blue-600" />
                        <h4 className="text-xl text-gray-900">Bachelor of Technology (B.Tech)</h4>
                      </div>
                      <p className="text-gray-700 mb-2">Information Technology</p>
                      <p className="text-gray-600">Vidyalankar Institute of Technology, Mumbai</p>
                    </div>
                    <span className="px-4 py-2 bg-white rounded-xl text-blue-600 shrink-0 ml-4 shadow-sm border border-blue-200">
                      2023 – 2027
                    </span>
                  </div>
                  <div className="flex items-center gap-2 pt-3 border-t border-blue-200/50">
                    <div className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow-lg">
                      <span className="text-2xl">9.65</span>
                      <span className="text-sm ml-1">/ 10 CGPA</span>
                    </div>
                    <div className="text-sm text-gray-600">(up to 3rd year)</div>
                  </div>
                </div>

                {/* HSC & SSC */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200/50 hover:border-green-400 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center gap-2 mb-3">
                      <Trophy className="w-5 h-5 text-green-600" />
                      <h4 className="text-lg text-gray-900">Higher Secondary (HSC)</h4>
                    </div>
                    <p className="text-gray-700 mb-3">Model College of Arts, Commerce & Science</p>
                    <div className="px-4 py-2 bg-white rounded-xl text-green-600 inline-block shadow-sm border border-green-200">
                      <span className="text-xl">84%</span>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-200/50 hover:border-orange-400 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center gap-2 mb-3">
                      <Award className="w-5 h-5 text-orange-600" />
                      <h4 className="text-lg text-gray-900">Secondary School (SSC)</h4>
                    </div>
                    <p className="text-gray-700 mb-3">St. Jude's High School</p>
                    <div className="px-4 py-2 bg-white rounded-xl text-orange-600 inline-block shadow-sm border border-orange-200">
                      <span className="text-xl">80%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Glow Effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl blur-2xl opacity-20 -z-10"></div>
        </div>
      </div>
    </section>
  );
}