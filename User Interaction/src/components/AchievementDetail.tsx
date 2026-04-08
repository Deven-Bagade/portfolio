import { ArrowLeft, Award, Trophy, Users, Lightbulb, Calendar, Target, Check, Star, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';

interface AchievementDetailProps {
  achievementId: number;
  onBack: () => void;
}

export function AchievementDetail({ achievementId, onBack }: AchievementDetailProps) {
  const achievements = [
    {
      title: 'Winter of Code',
      subtitle: 'Open-Source Contributor',
      icon: Award,
      period: 'Winter 2024',
      organization: 'DevScript Winter of Code',
      description: 'Participated in a month-long open-source program contributing to meaningful projects and collaborating with developers worldwide.',
      longDescription: 'Winter of Code provided an incredible opportunity to dive deep into open-source development. Working on real-world codebases, I learned to navigate complex project structures, understand existing code, and make meaningful contributions. The experience taught me the importance of clear communication, thorough testing, and collaborative problem-solving in distributed teams.',
      contributions: [
        { title: 'Feature Development', desc: 'Implemented 3 major features improving user experience and functionality' },
        { title: 'Bug Fixes', desc: 'Resolved 12+ critical and medium-priority bugs across different modules' },
        { title: 'Code Reviews', desc: 'Participated in peer reviews, providing constructive feedback on 20+ PRs' },
        { title: 'Documentation', desc: 'Enhanced project documentation and created setup guides for new contributors' }
      ],
      skills: ['Git & GitHub', 'Code Review', 'Issue Tracking', 'Documentation', 'Testing', 'Collaboration'],
      impact: [
        { metric: 'Pull Requests', value: '15+', icon: TrendingUp },
        { metric: 'Lines of Code', value: '2000+', icon: Award },
        { metric: 'Projects', value: '3', icon: Star }
      ],
      learnings: [
        'Mastered Git workflows including branching, merging, and conflict resolution',
        'Learned to write clean, maintainable code following project conventions',
        'Developed skills in asynchronous communication with global teams',
        'Gained experience in contributing to diverse technology stacks'
      ],
      gradient: 'from-blue-500 to-cyan-600',
      bgGradient: 'from-blue-50 to-cyan-50'
    },
    {
      title: 'Aavishkar Research Convention 2024',
      subtitle: 'UG Zonal Participant',
      icon: Trophy,
      period: '2024',
      organization: 'University of Mumbai',
      description: 'Selected as zonal participant for presenting StockSync, an innovative inventory management solution at the prestigious Aavishkar Research Convention.',
      longDescription: 'Being selected for Aavishkar Research Convention 2024 was a significant milestone. The competition involved presenting research and innovations to expert panels. StockSync, our inventory management solution, stood out among numerous entries in the Commerce, Management & Law category. The experience of defending our research, answering challenging questions, and receiving feedback from industry experts was invaluable.',
      contributions: [
        { title: 'Research Methodology', desc: 'Conducted comprehensive research on inventory management challenges' },
        { title: 'Solution Design', desc: 'Designed innovative approach combining real-time sync with predictive analytics' },
        { title: 'Prototype Development', desc: 'Built working prototype demonstrating key features and capabilities' },
        { title: 'Presentation', desc: 'Presented research findings and solution to expert panel and audience' }
      ],
      skills: ['Research Methodology', 'Innovation', 'Presentation', 'Problem Solving', 'System Design'],
      impact: [
        { metric: 'Selection Level', value: 'Zonal', icon: Trophy },
        { metric: 'Category Rank', value: 'Top 10', icon: Star },
        { metric: 'Jury Score', value: '8.5/10', icon: Award }
      ],
      learnings: [
        'Developed strong research and analytical skills',
        'Learned to communicate complex technical concepts clearly',
        'Gained experience in competitive academic presentations',
        'Enhanced ability to defend ideas under scrutiny'
      ],
      gradient: 'from-yellow-500 to-orange-600',
      bgGradient: 'from-yellow-50 to-orange-50'
    },
    {
      title: 'Smart India Hackathon 2024',
      subtitle: 'Top 35 / 110 Teams',
      icon: Lightbulb,
      period: 'September 2024',
      organization: 'Ministry of Education, Govt. of India',
      description: 'Secured Top 35 position among 110 participating teams in the internal hackathon by developing an innovative e-waste management solution.',
      longDescription: 'Smart India Hackathon 2024 was an intense 24-hour challenge that pushed our limits. Our team tackled the pressing problem of e-waste management with a comprehensive digital solution. Working under time pressure, we developed a platform connecting e-waste generators with certified recyclers, featuring real-time tracking, awareness campaigns, and incentive mechanisms. The hackathon taught us rapid prototyping, team coordination under pressure, and effective time management.',
      contributions: [
        { title: 'Solution Architecture', desc: 'Designed scalable architecture for e-waste tracking and management system' },
        { title: 'Full-Stack Development', desc: 'Developed both frontend and backend components within 24 hours' },
        { title: 'Team Coordination', desc: 'Coordinated with team of 6 members for efficient task distribution' },
        { title: 'Pitch Presentation', desc: 'Delivered compelling pitch highlighting solution impact and feasibility' }
      ],
      skills: ['Rapid Prototyping', 'Full-Stack Development', 'Team Leadership', 'Pitch Presentation', 'Problem Solving'],
      impact: [
        { metric: 'Final Rank', value: 'Top 35', icon: Trophy },
        { metric: 'Teams Competed', value: '110', icon: Users },
        { metric: 'Development Time', value: '24hrs', icon: TrendingUp }
      ],
      learnings: [
        'Mastered rapid prototyping and MVP development techniques',
        'Learned to prioritize features under extreme time constraints',
        'Developed resilience and ability to perform under pressure',
        'Enhanced team collaboration and communication skills'
      ],
      gradient: 'from-green-500 to-emerald-600',
      bgGradient: 'from-green-50 to-emerald-50'
    },
    {
      title: 'Core Tech Member – GDG VIT',
      subtitle: 'Google Developer Groups',
      icon: Users,
      period: '2024 - Present',
      organization: 'Google Developer Groups - VIT Chapter',
      description: 'Serving as core technical team member, contributing to event organization, website development, and fostering tech community at VIT.',
      longDescription: 'As a Core Tech Member of GDG VIT, I play a pivotal role in organizing technical events, workshops, and hackathons that benefit the entire student community. Beyond event management, I led the development of the GDG VIT event website using modern web technologies. This role has enhanced my leadership, organizational, and technical skills while allowing me to give back to the community.',
      contributions: [
        { title: 'Event Website Development', desc: 'Built responsive event website with registration system using React and Tailwind CSS' },
        { title: 'Workshop Organization', desc: 'Organized 5+ technical workshops on web development, cloud computing, and AI' },
        { title: 'Community Management', desc: 'Managed GDG community, facilitated discussions, and supported members' },
        { title: 'Speaker Coordination', desc: 'Coordinated with industry speakers and organized tech talks for students' }
      ],
      skills: ['Event Management', 'Web Development', 'Community Building', 'Public Speaking', 'Leadership'],
      impact: [
        { metric: 'Events Organized', value: '10+', icon: Calendar },
        { metric: 'Attendees', value: '500+', icon: Users },
        { metric: 'Workshops', value: '5+', icon: Award }
      ],
      learnings: [
        'Developed strong leadership and organizational capabilities',
        'Learned event management and logistics coordination',
        'Enhanced public speaking and presentation skills',
        'Built valuable network within tech community'
      ],
      gradient: 'from-purple-500 to-pink-600',
      bgGradient: 'from-purple-50 to-pink-50'
    }
  ];

  const achievement = achievements[achievementId];
  const Icon = achievement.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-yellow-50">
      {/* Hero Section */}
      <div className={`relative bg-gradient-to-br ${achievement.gradient} text-white py-20 px-4 overflow-hidden`}>
        {/* Animated Background */}
        <motion.div 
          className="absolute inset-0 opacity-10"
          animate={{ 
            rotate: [0, 360],
          }}
          transition={{ 
            duration: 50, 
            repeat: Infinity, 
            ease: 'linear'
          }}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}
        />

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.button
            onClick={onBack}
            className="flex items-center gap-2 mb-8 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-all duration-300 border border-white/30"
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Portfolio</span>
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center border border-white/30">
                <Icon className="w-10 h-10" />
              </div>
              <div>
                <p className="text-white/80 mb-1">{achievement.subtitle}</p>
                <p className="text-sm text-white/70">{achievement.organization}</p>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl mb-6">{achievement.title}</h1>
            <p className="text-xl text-white/90 max-w-3xl mb-6">
              {achievement.description}
            </p>

            <div className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30 inline-flex">
              <Calendar className="w-5 h-5" />
              <span>{achievement.period}</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Impact Metrics */}
        <motion.div 
          className="grid md:grid-cols-3 gap-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {achievement.impact.map((item, index) => {
            const MetricIcon = item.icon;
            return (
              <motion.div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-xl border border-gray-200/50 text-center"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${achievement.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                  <MetricIcon className="w-8 h-8 text-white" />
                </div>
                <div className={`text-4xl bg-gradient-to-r ${achievement.gradient} bg-clip-text text-transparent mb-2`}>
                  {item.value}
                </div>
                <div className="text-gray-600">{item.metric}</div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Story */}
        <motion.section 
          className="mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-4xl mb-6 bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
            The Story
          </h2>
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200/50">
            <p className="text-gray-700 leading-relaxed text-lg">
              {achievement.longDescription}
            </p>
          </div>
        </motion.section>

        {/* Contributions */}
        <motion.section 
          className="mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-4xl mb-8 bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
            Key Contributions
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {achievement.contributions.map((contrib, index) => (
              <motion.div
                key={index}
                className={`bg-gradient-to-br ${achievement.bgGradient} rounded-2xl p-6 border border-gray-200/50 hover:shadow-xl transition-all duration-300`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${achievement.gradient} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <Check className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl text-gray-900 mb-2">{contrib.title}</h3>
                    <p className="text-gray-700">{contrib.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Skills Developed */}
        <motion.section 
          className="mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-4xl mb-8 bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
            Skills Developed
          </h2>
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200/50">
            <div className="flex flex-wrap gap-4">
              {achievement.skills.map((skill, index) => (
                <motion.span
                  key={skill}
                  className={`px-6 py-3 bg-gradient-to-r ${achievement.bgGradient} rounded-xl border border-gray-300 shadow-sm hover:shadow-lg transition-all`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                  whileHover={{ scale: 1.1, rotate: 2 }}
                >
                  <Target className="w-4 h-4 inline mr-2" />
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Key Learnings */}
        <motion.section 
          className="mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-4xl mb-8 bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
            Key Takeaways
          </h2>
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200/50">
            <ul className="space-y-4">
              {achievement.learnings.map((learning, index) => (
                <motion.li
                  key={index}
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <div className={`w-8 h-8 bg-gradient-to-br ${achievement.gradient} rounded-lg flex items-center justify-center flex-shrink-0 mt-1`}>
                    <Star className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-gray-700 text-lg flex-1">{learning}</p>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.div 
          className="bg-gradient-to-r from-yellow-500 via-orange-600 to-red-600 rounded-3xl p-[2px] shadow-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <div className="bg-white rounded-3xl p-10 text-center">
            <h3 className="text-3xl mb-4 bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
              Inspired by this achievement?
            </h3>
            <p className="text-gray-600 mb-6">
              Discover more accomplishments and milestones from my journey
            </p>
            <motion.button
              onClick={onBack}
              className="px-8 py-4 bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 text-white rounded-xl shadow-lg hover:shadow-2xl transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View More Achievements
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
