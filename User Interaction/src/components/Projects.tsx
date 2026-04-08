import { Folder, ExternalLink, Github, Smartphone, Globe, MessageSquare, Video, ShoppingCart } from 'lucide-react';
import { useState } from 'react';

export function Projects({ onViewDetail }: { onViewDetail?: (id: number) => void }) {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const projects = [
    {
      name: 'Attendance Tracker',
      description: 'Personal attendance management application with timetable-based lecture tracking and offline-first architecture.',
      features: [
        'Attendance status marking (Present/Absent/Late) with notes',
        'Offline-first logic with reliable data synchronization',
        'Modular services and clean UI architecture'
      ],
      tech: ['Flutter', 'Firebase', 'REST APIs'],
      icon: Smartphone,
      gradient: 'from-blue-500 to-cyan-600',
      bgGradient: 'from-blue-50 to-cyan-50'
    },
    {
      name: 'Mannsparysha',
      subtitle: 'Mental Health Support',
      description: 'Mental health support app focused on emotional well-being and self-care with privacy-first approach.',
      features: [
        'AI-based chat support with mood tracking',
        'Stress management tools and personalized recommendations',
        'Privacy-first and user-centric design'
      ],
      tech: ['Flutter', 'Firebase', 'AI concepts'],
      icon: MessageSquare,
      gradient: 'from-purple-500 to-pink-600',
      bgGradient: 'from-purple-50 to-pink-50'
    },
    {
      name: 'LearnVista',
      description: 'Secure video-sharing platform for authenticated teacher-student interaction with advanced features.',
      features: [
        'Search, like, and save features with user-based access control',
        'Streamlined servlet handling and database interactions',
        'Secure authentication and authorization system'
      ],
      tech: ['Java', 'Servlets', 'JSP', 'JavaScript', 'MySQL'],
      icon: Video,
      gradient: 'from-green-500 to-emerald-600',
      bgGradient: 'from-green-50 to-emerald-50'
    },
    {
      name: 'Chat Application',
      description: 'Real-time messaging system with media and file sharing for 1:1 and group conversations.',
      features: [
        'Real-time messaging with media support',
        'Optimized servlet calls and MySQL queries',
        'Group chat functionality with file sharing'
      ],
      tech: ['Java (Servlets)', 'JSP', 'MySQL', 'Apache Tomcat', 'JavaScript'],
      icon: MessageSquare,
      gradient: 'from-orange-500 to-red-600',
      bgGradient: 'from-orange-50 to-red-50'
    },
    {
      name: 'Ethnicize',
      subtitle: 'E-Commerce Platform',
      description: 'Scalable marketplace connecting Indian sellers to global buyers with multi-portal architecture.',
      features: [
        'Seller, Buyer, and Admin portals',
        'JWT authentication and RESTful APIs',
        'Scalable MERN stack architecture'
      ],
      tech: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'Tailwind CSS', 'JWT'],
      icon: ShoppingCart,
      gradient: 'from-indigo-500 to-blue-600',
      bgGradient: 'from-indigo-50 to-blue-50'
    },
    {
      name: 'StockSync',
      subtitle: 'Research Project',
      description: 'Innovative inventory management solution presented at Aavishkar Research Convention 2024.',
      features: [
        'Zonal participant in Commerce, Management & Law category',
        'Real-time inventory tracking and analytics',
        'Multi-location synchronization'
      ],
      tech: ['Research', 'Innovation', 'Management'],
      icon: Globe,
      gradient: 'from-teal-500 to-cyan-600',
      bgGradient: 'from-teal-50 to-cyan-50'
    }
  ];

  return (
    <section id="projects" className="py-20 px-4 bg-gradient-to-br from-gray-50 via-white to-purple-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A collection of impactful projects showcasing full-stack development, mobile apps, and innovative solutions
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => {
            const Icon = project.icon;
            const isHovered = hoveredProject === index;
            
            return (
              <div
                key={index}
                onMouseEnter={() => setHoveredProject(index)}
                onMouseLeave={() => setHoveredProject(null)}
                onClick={() => onViewDetail?.(index)}
                className="group relative cursor-pointer"
              >
                {/* Card */}
                <div className={`relative h-full bg-white rounded-3xl p-8 border border-gray-200/50 transition-all duration-500 ${
                  isHovered ? 'shadow-2xl scale-105 -translate-y-2' : 'shadow-xl'
                }`}>
                  {/* Gradient Background on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.bgGradient} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon */}
                    <div className={`w-16 h-16 bg-gradient-to-br ${project.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    {/* Title */}
                    <div className="mb-4">
                      <h3 className="text-2xl text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                        {project.name}
                      </h3>
                      {project.subtitle && (
                        <p className={`text-sm bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent`}>
                          {project.subtitle}
                        </p>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-gray-700 mb-6 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Features */}
                    <ul className="space-y-2 mb-6">
                      {project.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                          <div className={`w-1.5 h-1.5 bg-gradient-to-r ${project.gradient} rounded-full mt-1.5 flex-shrink-0`}></div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Tech Stack */}
                    <div className="pt-6 border-t border-gray-200/50">
                      <p className="text-xs text-gray-500 mb-3">Tech Stack:</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech) => (
                          <span
                            key={tech}
                            className={`px-3 py-1 bg-gradient-to-r ${project.bgGradient} rounded-lg text-xs border border-gray-200/50 group-hover:border-gray-300 transition-colors`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Hover Overlay with Actions */}
                  <div className={`absolute top-4 right-4 flex gap-2 transition-all duration-300 ${
                    isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                  }`}>
                    <button className={`w-10 h-10 bg-gradient-to-br ${project.gradient} rounded-xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform`}>
                      <ExternalLink className="w-5 h-5 text-white" />
                    </button>
                    <button className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                      <Github className="w-5 h-5 text-white" />
                    </button>
                  </div>
                </div>

                {/* Glow Effect */}
                <div className={`absolute -inset-1 bg-gradient-to-r ${project.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 -z-10`}></div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-200/50">
            <p className="text-gray-700 mb-4">
              Want to see more projects or collaborate?
            </p>
            <a
              href="https://github.com/Deven-Bagade"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              <Github className="w-5 h-5" />
              <span>View All on GitHub</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}