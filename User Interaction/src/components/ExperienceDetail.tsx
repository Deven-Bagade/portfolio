import { ArrowLeft, Calendar, MapPin, Users, Code, Briefcase, TrendingUp, Award, Check, Zap } from 'lucide-react';
import { motion } from 'motion/react';

interface ExperienceDetailProps {
  experienceId: number;
  onBack: () => void;
}

export function ExperienceDetail({ experienceId, onBack }: ExperienceDetailProps) {
  const experiences = [
    {
      title: 'Software Development Intern',
      company: 'Shiksha Sathi',
      duration: '3 Months',
      location: 'Remote',
      period: 'Summer 2024',
      shortDesc: 'MERN Stack Development & Real-time Features',
      description: 'Contributed to the development of an innovative educational platform connecting students with tutors through video conferencing, real-time chat, and intelligent scheduling systems.',
      responsibilities: [
        { title: 'MERN Stack Development', desc: 'Built scalable web application following industry best practices with modular architecture' },
        { title: 'Google Calendar Integration', desc: 'Implemented seamless calendar synchronization for scheduling tutoring sessions' },
        { title: 'Real-time Chat System', desc: 'Developed chat functionality with message persistence and notification system' },
        { title: 'Video Conferencing', desc: 'Integrated 100ms SDK for high-quality video calls with screen sharing' },
        { title: 'Code Quality', desc: 'Maintained clean code standards with comprehensive testing and documentation' }
      ],
      achievements: [
        { title: 'Performance Optimization', desc: 'Reduced page load time by 40% through code optimization and lazy loading' },
        { title: 'Feature Delivery', desc: 'Successfully delivered 5 major features within tight deadlines' },
        { title: 'User Satisfaction', desc: 'Contributed to 95% user satisfaction rating through quality implementation' }
      ],
      skills: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'Google APIs', '100ms SDK', 'WebSocket', 'REST APIs'],
      learnings: [
        'Gained deep understanding of real-time communication protocols and WebRTC',
        'Learned to integrate complex third-party APIs with error handling',
        'Developed skills in agile development and team collaboration',
        'Mastered debugging techniques for production applications'
      ],
      impact: [
        { metric: 'Features Built', value: '5+', icon: Code },
        { metric: 'Code Quality', value: 'A+', icon: Award },
        { metric: 'Performance', value: '+40%', icon: TrendingUp }
      ],
      gradient: 'from-blue-500 to-cyan-600',
      bgGradient: 'from-blue-50 to-cyan-50'
    },
    {
      title: 'Web Development Intern',
      company: 'Vidyalankar Institute of Technology',
      duration: 'Dec 2024 – Feb 2025',
      location: 'Mumbai',
      period: 'Winter 2024-25',
      shortDesc: 'Team Leadership & Full-Stack Development',
      description: 'Led the development of Ethnicize, a comprehensive e-commerce platform, while managing a team of 4 developers in an Agile environment. Focused on delivering high-quality, scalable solutions with weekly iterations.',
      responsibilities: [
        { title: 'Team Leadership', desc: 'Led a team of 4 developers, coordinating tasks and ensuring code quality standards' },
        { title: 'Frontend Development', desc: 'Built responsive React components with modern UI/UX principles' },
        { title: 'Backend Architecture', desc: 'Designed and implemented RESTful APIs with proper authentication' },
        { title: 'Agile Methodology', desc: 'Participated in daily standups, sprint planning, and retrospectives' },
        { title: 'Testing & Deployment', desc: 'Conducted thorough testing and managed weekly deployments' }
      ],
      achievements: [
        { title: 'Team Coordination', desc: 'Successfully managed team workflow resulting in on-time project delivery' },
        { title: 'Code Reviews', desc: 'Implemented code review process improving overall code quality by 50%' },
        { title: 'User Experience', desc: 'Enhanced application responsiveness leading to 30% better user engagement' }
      ],
      skills: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'Tailwind CSS', 'JWT', 'Git', 'Agile/Scrum'],
      learnings: [
        'Enhanced leadership skills through team management and mentoring',
        'Learned to balance multiple priorities in fast-paced environment',
        'Developed expertise in full software development lifecycle',
        'Improved communication skills through daily team interactions'
      ],
      impact: [
        { metric: 'Team Members', value: '4', icon: Users },
        { metric: 'Deployments', value: '12+', icon: Zap },
        { metric: 'Code Quality', value: '+50%', icon: TrendingUp }
      ],
      gradient: 'from-purple-500 to-pink-600',
      bgGradient: 'from-purple-50 to-pink-50'
    }
  ];

  const experience = experiences[experienceId];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className={`relative bg-gradient-to-br ${experience.gradient} text-white py-20 px-4 overflow-hidden`}>
        {/* Animated Background */}
        <motion.div 
          className="absolute inset-0 opacity-10"
          animate={{ 
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            repeatType: 'reverse' 
          }}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '40px 40px'
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
            <div className="flex items-center gap-3 mb-4">
              <Briefcase className="w-6 h-6" />
              <span className="text-white/80">{experience.shortDesc}</span>
            </div>
            <h1 className="text-5xl md:text-7xl mb-4">{experience.title}</h1>
            <p className="text-3xl text-white/90 mb-6">{experience.company}</p>
            
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30">
                <Calendar className="w-5 h-5" />
                <span>{experience.duration}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30">
                <MapPin className="w-5 h-5" />
                <span>{experience.location}</span>
              </div>
            </div>

            <p className="text-xl text-white/90 max-w-3xl">
              {experience.description}
            </p>
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
          {experience.impact.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-xl border border-gray-200/50 text-center"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${experience.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div className={`text-4xl bg-gradient-to-r ${experience.gradient} bg-clip-text text-transparent mb-2`}>
                  {item.value}
                </div>
                <div className="text-gray-600">{item.metric}</div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Responsibilities */}
        <motion.section 
          className="mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-4xl mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Key Responsibilities
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {experience.responsibilities.map((resp, index) => (
              <motion.div
                key={index}
                className={`bg-gradient-to-br ${experience.bgGradient} rounded-2xl p-6 border border-gray-200/50 hover:shadow-xl transition-all duration-300`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${experience.gradient} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <Check className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl text-gray-900 mb-2">{resp.title}</h3>
                    <p className="text-gray-700">{resp.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Achievements */}
        <motion.section 
          className="mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-4xl mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Key Achievements
          </h2>
          <div className="space-y-6">
            {experience.achievements.map((achievement, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200/50"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-14 h-14 bg-gradient-to-br ${experience.gradient} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg`}>
                    <Award className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl text-gray-900 mb-2">{achievement.title}</h3>
                    <p className="text-gray-700 text-lg">{achievement.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Skills Gained */}
        <motion.section 
          className="mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-4xl mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Technical Skills
          </h2>
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200/50">
            <div className="flex flex-wrap gap-4">
              {experience.skills.map((skill, index) => (
                <motion.span
                  key={skill}
                  className={`px-6 py-3 bg-gradient-to-r ${experience.bgGradient} rounded-xl border border-gray-300 shadow-sm hover:shadow-lg transition-all`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                  whileHover={{ scale: 1.1, rotate: 2 }}
                >
                  <Code className="w-4 h-4 inline mr-2" />
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
          <h2 className="text-4xl mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Key Learnings
          </h2>
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200/50">
            <ul className="space-y-4">
              {experience.learnings.map((learning, index) => (
                <motion.li
                  key={index}
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <div className={`w-8 h-8 bg-gradient-to-br ${experience.gradient} rounded-lg flex items-center justify-center flex-shrink-0 mt-1`}>
                    <Check className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-gray-700 text-lg flex-1">{learning}</p>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.div 
          className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-[2px] shadow-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <div className="bg-white rounded-3xl p-10 text-center">
            <h3 className="text-3xl mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Want to know more about my experience?
            </h3>
            <p className="text-gray-600 mb-6">
              Let's connect and discuss how I can contribute to your team
            </p>
            <motion.button
              onClick={onBack}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-2xl transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Back to Portfolio
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
