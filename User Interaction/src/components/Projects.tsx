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
    }
  ];

  return (
    <section
      id="projects"
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

      {/* Radial gradients */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: `
            radial-gradient(ellipse 60% 50% at 10% 30%, rgba(255,255,255,0.03) 0%, transparent 60%),
            radial-gradient(ellipse 50% 45% at 90% 70%, rgba(255,255,255,0.02) 0%, transparent 55%)
          `,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2
            className="text-5xl md:text-6xl mb-4 font-black tracking-tight"
            style={{
              background: 'linear-gradient(135deg, #ffffff, #a3a3a3)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Featured Projects
          </h2>
          <p className="text-white max-w-2xl mx-auto" style={{ fontFamily: "'Space Mono', monospace" }}>
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
                <div
                  className={`relative h-full bg-[#111111]/80 backdrop-blur-md rounded-3xl p-8 border transition-all duration-500 ${
                    isHovered
                      ? 'border-white/20 shadow-2xl scale-[1.02] -translate-y-2'
                      : 'border-white/5 shadow-xl'
                  }`}
                >
                  {/* Subtle colorful gradient background on hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${project.gradient} rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                  ></div>

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon - Uses specific project gradient */}
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${project.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-all duration-500`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    {/* Title */}
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold text-white/90 mb-1 group-hover:text-white transition-colors">
                        {project.name}
                      </h3>
                      {project.subtitle && (
                        <p className="text-sm text-white/50 font-medium">{project.subtitle}</p>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-white/70 mb-6 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Features */}
                    <ul className="space-y-2 mb-6">
                      {project.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-white">
                          <div className={`w-1.5 h-1.5 bg-gradient-to-r ${project.gradient} rounded-full mt-1.5 flex-shrink-0`}></div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Tech Stack */}
                    <div className="pt-6 border-t border-white/10 group-hover:border-white/20 transition-colors">
                      <p className="text-xs text-white/50 mb-3 font-medium uppercase tracking-wider">Tech Stack</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-white/5 text-white/70 rounded-lg text-xs border border-white/10 group-hover:border-white/20 group-hover:bg-white/10 transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Hover Overlay with Actions */}
                  <div
                    className={`absolute top-4 right-4 flex gap-2 transition-all duration-300 ${
                      isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                    }`}
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering the card click
                        // Add live link logic here if needed
                      }}
                      className={`w-10 h-10 bg-gradient-to-br ${project.gradient} rounded-xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform`}
                    >
                      <ExternalLink className="w-5 h-5 text-white" />
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering the card click
                        // Add GitHub link logic here if needed
                      }}
                      className="w-10 h-10 bg-[#222] rounded-xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform hover:bg-[#333] border border-white/10"
                    >
                      <Github className="w-5 h-5 text-white" />
                    </button>
                  </div>
                </div>

                {/* Glow Effect - Matches project specific gradient */}
                <div
                  className={`absolute -inset-1 bg-gradient-to-r ${project.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10`}
                ></div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <div className="inline-block bg-[#111111]/80 backdrop-blur-md rounded-3xl p-10 shadow-2xl border border-white/10 relative overflow-hidden group">
            {/* Subtle generic background glow for CTA */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative z-10">
              <p className="text-white/80 mb-6 text-lg">Want to see more projects or collaborate?</p>
              <a
                href="https://github.com/Deven-Bagade"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-semibold rounded-xl hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:scale-105 transition-all duration-300"
              >
                <Github className="w-5 h-5" />
                <span>View All on GitHub</span>
                <ExternalLink className="w-4 h-4 opacity-70" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 