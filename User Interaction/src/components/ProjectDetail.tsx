import { ArrowLeft, Github, ExternalLink, Users, Code2, Zap, Check, Star, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';
import { useState, useEffect } from 'react';

interface ProjectDetailProps {
  projectId: number;
  onBack: () => void;
}

export function ProjectDetail({ projectId, onBack }: ProjectDetailProps) {
  const [imageIndex, setImageIndex] = useState(0);

  const projects = [
    {
      name: 'Attendance Tracker',
      tagline: 'Smart Attendance Management for Students',
      description: 'A comprehensive personal attendance management application designed specifically for students to track their lecture attendance efficiently. Built with a mobile-first approach using Flutter, it provides an intuitive interface for managing daily attendance with timetable integration.',
      longDescription: 'Attendance Tracker revolutionizes how students manage their academic attendance. With offline-first architecture, students can mark their attendance even without internet connectivity, ensuring no data loss. The app automatically syncs when connected, providing a seamless experience. The timetable-based tracking system intelligently organizes lectures by day and time, making it incredibly easy to track patterns and maintain attendance records throughout the semester.',
      features: [
        { title: 'Smart Attendance Marking', desc: 'Mark attendance as Present, Absent, or Late with optional notes for each lecture' },
        { title: 'Offline-First Architecture', desc: 'Full functionality even without internet connection, with automatic sync when online' },
        { title: 'Timetable Integration', desc: 'Organize lectures by timetable for easy tracking and visualization' },
        { title: 'Attendance Analytics', desc: 'View attendance percentage, trends, and patterns over time' },
        { title: 'Clean Architecture', desc: 'Modular services ensuring maintainability and scalability' },
        { title: 'Reminder System', desc: 'Smart notifications for upcoming lectures and low attendance warnings' }
      ],
      tech: ['Flutter', 'Firebase', 'REST APIs', 'SQLite', 'Provider State Management'],
      metrics: [
        { label: 'Performance', value: '99.9%', icon: Zap },
        { label: 'Uptime', value: '100%', icon: TrendingUp },
        { label: 'User Rating', value: '4.8/5', icon: Star }
      ],
      timeline: [
        { phase: 'Planning & Design', duration: '2 weeks', status: 'completed' },
        { phase: 'Core Development', duration: '4 weeks', status: 'completed' },
        { phase: 'Testing & Refinement', duration: '2 weeks', status: 'completed' },
        { phase: 'Deployment', duration: '1 week', status: 'completed' }
      ],
      challenges: [
        { problem: 'Offline Data Sync', solution: 'Implemented local SQLite database with conflict resolution algorithms for seamless synchronization' },
        { problem: 'State Management', solution: 'Used Provider pattern for efficient state handling across complex UI components' },
        { problem: 'Data Persistence', solution: 'Created robust caching mechanism ensuring data integrity across app sessions' }
      ],
      gradient: 'from-blue-500 to-cyan-600',
      bgGradient: 'from-blue-50 to-cyan-50'
    },
    {
      name: 'Mannsparysha',
      tagline: 'Mental Health Support & Wellness Platform',
      description: 'A privacy-first mental health support application designed to help users manage their emotional well-being through AI-powered chat support, mood tracking, and personalized wellness recommendations.',
      longDescription: 'Mannsparysha addresses the critical need for accessible mental health support. The app provides a safe, judgment-free space where users can express their feelings, track their moods, and receive personalized support. With AI-powered chat functionality, users get immediate responses and coping strategies tailored to their emotional state. The privacy-first approach ensures all user data is encrypted and never shared, making it a trusted companion for mental wellness.',
      features: [
        { title: 'AI Chat Support', desc: 'Intelligent conversational AI providing empathetic responses and coping strategies' },
        { title: 'Mood Tracking', desc: 'Visual mood journals with patterns and insights over time' },
        { title: 'Stress Management Tools', desc: 'Guided meditation, breathing exercises, and relaxation techniques' },
        { title: 'Privacy-First Design', desc: 'End-to-end encryption with local data storage options' },
        { title: 'Personalized Recommendations', desc: 'AI-driven wellness suggestions based on mood patterns' },
        { title: 'Crisis Resources', desc: 'Quick access to emergency helplines and professional support' }
      ],
      tech: ['Flutter', 'Firebase', 'AI/ML APIs', 'Natural Language Processing', 'Encryption'],
      metrics: [
        { label: 'User Satisfaction', value: '95%', icon: Star },
        { label: 'Daily Active Users', value: '500+', icon: Users },
        { label: 'Response Time', value: '<1s', icon: Zap }
      ],
      timeline: [
        { phase: 'Research & UX Design', duration: '3 weeks', status: 'completed' },
        { phase: 'AI Integration', duration: '5 weeks', status: 'completed' },
        { phase: 'Privacy Implementation', duration: '2 weeks', status: 'completed' },
        { phase: 'Beta Testing', duration: '3 weeks', status: 'completed' }
      ],
      challenges: [
        { problem: 'AI Accuracy', solution: 'Fine-tuned NLP models with mental health-specific training data for empathetic responses' },
        { problem: 'Data Privacy', solution: 'Implemented end-to-end encryption with secure local storage and optional cloud sync' },
        { problem: 'User Trust', solution: 'Transparent privacy policy and clear communication about data handling practices' }
      ],
      gradient: 'from-purple-500 to-pink-600',
      bgGradient: 'from-purple-50 to-pink-50'
    },
    {
      name: 'LearnVista',
      tagline: 'Secure Educational Video Platform',
      description: 'A secure video-sharing platform designed specifically for educational institutions, enabling teachers to share content with students through role-based access control and comprehensive interaction features.',
      longDescription: 'LearnVista transforms the educational video sharing experience by providing a secure, feature-rich platform tailored for academic environments. Teachers can upload, organize, and share educational content while maintaining complete control over access. Students benefit from advanced search capabilities, personalized collections, and interactive engagement features. The platform ensures data security and user privacy through robust authentication mechanisms.',
      features: [
        { title: 'Role-Based Access', desc: 'Separate teacher and student portals with granular permission controls' },
        { title: 'Advanced Search', desc: 'Smart search with filters for subject, topic, and difficulty level' },
        { title: 'Video Collections', desc: 'Create playlists, save favorites, and organize content efficiently' },
        { title: 'Engagement Tracking', desc: 'Analytics on video views, likes, and student engagement patterns' },
        { title: 'Secure Authentication', desc: 'Multi-factor authentication with session management' },
        { title: 'Comment System', desc: 'Interactive discussions with moderation capabilities' }
      ],
      tech: ['Java', 'Servlets', 'JSP', 'JavaScript', 'MySQL', 'Apache Tomcat', 'jQuery'],
      metrics: [
        { label: 'Video Uploads', value: '1000+', icon: TrendingUp },
        { label: 'Active Students', value: '300+', icon: Users },
        { label: 'Avg Load Time', value: '0.8s', icon: Zap }
      ],
      timeline: [
        { phase: 'Database Design', duration: '1 week', status: 'completed' },
        { phase: 'Backend Development', duration: '6 weeks', status: 'completed' },
        { phase: 'Frontend Integration', duration: '4 weeks', status: 'completed' },
        { phase: 'Security Audit', duration: '2 weeks', status: 'completed' }
      ],
      challenges: [
        { problem: 'Video Streaming', solution: 'Implemented adaptive bitrate streaming with CDN integration for smooth playback' },
        { problem: 'Access Control', solution: 'Designed comprehensive RBAC system with hierarchical permissions' },
        { problem: 'Database Performance', solution: 'Optimized queries with indexing and implemented caching strategies' }
      ],
      gradient: 'from-green-500 to-emerald-600',
      bgGradient: 'from-green-50 to-emerald-50'
    },
    {
      name: 'Chat Application',
      tagline: 'Real-Time Messaging Platform',
      description: 'A full-featured real-time messaging system supporting both one-on-one and group conversations with media sharing, file transfers, and comprehensive chat management capabilities.',
      longDescription: 'This chat application delivers enterprise-grade messaging capabilities with a focus on real-time communication and rich media support. Built using Java Servlets and WebSocket technology, it provides instant message delivery with read receipts, typing indicators, and online status updates. The platform supports both personal and group conversations, making it versatile for various communication needs.',
      features: [
        { title: 'Real-Time Messaging', desc: 'Instant message delivery with WebSocket support and delivery confirmations' },
        { title: 'Media Sharing', desc: 'Share images, videos, documents, and audio files seamlessly' },
        { title: 'Group Chats', desc: 'Create groups, manage members, and organize team communications' },
        { title: 'Message History', desc: 'Searchable chat history with cloud sync across devices' },
        { title: 'Notifications', desc: 'Smart push notifications with customizable settings' },
        { title: 'User Presence', desc: 'Online/offline status, last seen, and typing indicators' }
      ],
      tech: ['Java Servlets', 'JSP', 'MySQL', 'Apache Tomcat', 'WebSocket', 'JavaScript', 'AJAX'],
      metrics: [
        { label: 'Messages/Day', value: '5000+', icon: TrendingUp },
        { label: 'Active Chats', value: '200+', icon: Users },
        { label: 'Latency', value: '<50ms', icon: Zap }
      ],
      timeline: [
        { phase: 'Architecture Design', duration: '2 weeks', status: 'completed' },
        { phase: 'Real-time Features', duration: '5 weeks', status: 'completed' },
        { phase: 'Media Handling', duration: '3 weeks', status: 'completed' },
        { phase: 'Testing & Launch', duration: '2 weeks', status: 'completed' }
      ],
      challenges: [
        { problem: 'Message Delivery', solution: 'Implemented message queuing system with retry mechanisms for reliability' },
        { problem: 'File Storage', solution: 'Created efficient file storage with chunked uploads and compression' },
        { problem: 'Concurrent Users', solution: 'Optimized servlet thread pools and database connections for scalability' }
      ],
      gradient: 'from-orange-500 to-red-600',
      bgGradient: 'from-orange-50 to-red-50'
    },
    {
      name: 'Ethnicize',
      tagline: 'Global E-Commerce Marketplace',
      description: 'A scalable e-commerce platform connecting Indian artisans and sellers to global buyers through a comprehensive multi-portal architecture with secure transactions and rich product catalogs.',
      longDescription: 'Ethnicize empowers Indian sellers to reach global markets by providing a complete e-commerce ecosystem. The platform features distinct portals for sellers, buyers, and administrators, each optimized for their specific workflows. Sellers can easily list products, manage inventory, and track orders. Buyers enjoy a smooth shopping experience with advanced search, secure payments, and order tracking. Administrators have powerful tools for platform management and analytics.',
      features: [
        { title: 'Multi-Portal System', desc: 'Dedicated seller, buyer, and admin dashboards with tailored functionalities' },
        { title: 'Product Management', desc: 'Rich product listings with images, variants, and inventory tracking' },
        { title: 'Secure Payments', desc: 'Integrated payment gateway with multiple payment options' },
        { title: 'Order Processing', desc: 'Complete order lifecycle management from cart to delivery' },
        { title: 'Analytics Dashboard', desc: 'Sales analytics, customer insights, and performance metrics' },
        { title: 'JWT Authentication', desc: 'Secure token-based authentication with refresh tokens' }
      ],
      tech: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'Tailwind CSS', 'JWT', 'Redux', 'Stripe'],
      metrics: [
        { label: 'Products Listed', value: '500+', icon: TrendingUp },
        { label: 'Active Sellers', value: '50+', icon: Users },
        { label: 'Transaction Rate', value: '99.9%', icon: Check }
      ],
      timeline: [
        { phase: 'MVP Development', duration: '4 weeks', status: 'completed' },
        { phase: 'Portal Integration', duration: '6 weeks', status: 'completed' },
        { phase: 'Payment Integration', duration: '2 weeks', status: 'completed' },
        { phase: 'Production Deployment', duration: '2 weeks', status: 'completed' }
      ],
      challenges: [
        { problem: 'State Management', solution: 'Implemented Redux with normalized state for efficient data flow across portals' },
        { problem: 'Image Optimization', solution: 'Created image processing pipeline with CDN integration for fast loading' },
        { problem: 'Search Performance', solution: 'Integrated Elasticsearch for lightning-fast product search and filtering' }
      ],
      gradient: 'from-indigo-500 to-blue-600',
      bgGradient: 'from-indigo-50 to-blue-50'
    },
    {
      name: 'StockSync',
      tagline: 'Innovative Inventory Management',
      description: 'A cutting-edge inventory management solution presented at Aavishkar Research Convention 2024, featuring real-time tracking, multi-location synchronization, and predictive analytics for optimized stock management.',
      longDescription: 'StockSync represents innovative thinking in inventory management, combining real-time data synchronization with predictive analytics to help businesses optimize their stock levels across multiple locations. Developed as a research project, it showcases advanced concepts in distributed systems, data analytics, and automated decision-making for inventory control.',
      features: [
        { title: 'Real-Time Tracking', desc: 'Live inventory updates across all locations with instant synchronization' },
        { title: 'Multi-Location Sync', desc: 'Seamless coordination between warehouses, stores, and distribution centers' },
        { title: 'Predictive Analytics', desc: 'AI-driven demand forecasting and automated reorder suggestions' },
        { title: 'Smart Alerts', desc: 'Notifications for low stock, expiring items, and unusual patterns' },
        { title: 'Reporting System', desc: 'Comprehensive reports on stock levels, movements, and trends' },
        { title: 'Barcode Integration', desc: 'QR and barcode scanning for quick inventory updates' }
      ],
      tech: ['React', 'Node.js', 'PostgreSQL', 'Socket.io', 'ML Models', 'Chart.js'],
      metrics: [
        { label: 'Research Recognition', value: 'Zonal', icon: Star },
        { label: 'Efficiency Gain', value: '40%', icon: TrendingUp },
        { label: 'Accuracy', value: '98%', icon: Check }
      ],
      timeline: [
        { phase: 'Research & Ideation', duration: '3 weeks', status: 'completed' },
        { phase: 'Prototype Development', duration: '5 weeks', status: 'completed' },
        { phase: 'Testing & Refinement', duration: '3 weeks', status: 'completed' },
        { phase: 'Convention Presentation', duration: '1 week', status: 'completed' }
      ],
      challenges: [
        { problem: 'Data Synchronization', solution: 'Implemented CRDT-based conflict resolution for multi-location updates' },
        { problem: 'Prediction Accuracy', solution: 'Trained ML models on historical data with seasonal pattern recognition' },
        { problem: 'Scalability', solution: 'Designed microservices architecture for horizontal scaling' }
      ],
      gradient: 'from-teal-500 to-cyan-600',
      bgGradient: 'from-teal-50 to-cyan-50'
    }
  ];

  const project = projects[projectId];

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen relative" style={{ background: '#0a0a0a', fontFamily: "'Syne', sans-serif" }}>
      {/* Grid texture overlay for the whole page */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Hero Section */}
      <div className={`relative bg-gradient-to-br ${project.gradient} text-white py-20 px-4 overflow-hidden`}>
        {/* Hero grid overlay (subtle white dots) */}
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.08) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.08) 1px,transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />

        {/* Animated Background Pattern */}
        <motion.div 
          className="absolute inset-0 opacity-10"
          animate={{ 
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity, 
            repeatType: 'reverse',
            ease: 'linear'
          }}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.5'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
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
            <p className="text-white/80 mb-4 tracking-wide">{project.tagline}</p>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">{project.name}</h1>
            <p className="text-xl text-white/90 max-w-3xl mb-8 leading-relaxed">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-4">
              <motion.button 
                className="flex items-center gap-2 px-6 py-3 bg-white text-gray-900 rounded-xl hover:shadow-2xl transition-all duration-300 font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github className="w-5 h-5" />
                <span>View Code</span>
              </motion.button>
              <motion.button 
                className="flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-xl border border-white/30 hover:bg-white/30 transition-all duration-300 font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ExternalLink className="w-5 h-5" />
                <span>Live Demo</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content - Project Integrated Theme */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-16">
        
        {/* Key Metrics */}
        <motion.div 
          className="grid md:grid-cols-3 gap-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {project.metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={index}
                className="bg-[#111111]/80 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/5 hover:border-white/20 transition-colors duration-300 text-center relative overflow-hidden group"
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                <div className={`w-16 h-16 bg-gradient-to-br ${project.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-white mb-2">{metric.value}</div>
                <div className="text-white font-medium tracking-wide">{metric.label}</div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Overview */}
        <motion.section 
          className="mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-3xl font-bold mb-6 text-white flex items-center gap-3">
            Project Overview
          </h2>
          <div className="bg-[#111111]/80 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/5 relative overflow-hidden group hover:border-white/10 transition-colors duration-300">
             <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${project.gradient}`} />
            <p className="text-white/70 leading-relaxed text-lg">
              {project.longDescription}
            </p>
          </div>
        </motion.section>

        {/* Features Grid */}
        <motion.section 
          className="mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold mb-8 text-white">
            Key Features
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {project.features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-[#111111]/80 backdrop-blur-md rounded-2xl p-6 border border-white/5 hover:border-white/20 transition-all duration-300 group"
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${project.gradient} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Check className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white/90 mb-2">{feature.title}</h3>
                    <p className="text-white leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Tech Stack */}
        <motion.section 
          className="mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-8 text-white">
            Technology Stack
          </h2>
          <div className="bg-[#111111]/80 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/5">
            <div className="flex flex-wrap gap-4">
              {project.tech.map((tech, index) => (
                <motion.span
                  key={tech}
                  className="px-6 py-3 bg-white/5 rounded-xl border border-white/10 text-white/80 shadow-sm hover:bg-white/10 hover:border-white/20 transition-all duration-300 font-medium flex items-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Code2 className="w-4 h-4 mr-2 opacity-70" />
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Development Timeline */}
        <motion.section 
          className="mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-8 text-white">
            Development Timeline
          </h2>
          <div className="bg-[#111111]/80 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/5">
            <div className="space-y-6">
              {project.timeline.map((phase, index) => (
                <motion.div
                  key={index}
                  className="relative flex items-center gap-6 group"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${project.gradient} rounded-full flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Check className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 bg-white/5 rounded-xl p-4 border border-white/5 group-hover:border-white/20 transition-colors duration-300">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-white/90">{phase.phase}</h3>
                      <span className={`px-4 py-1 bg-gradient-to-r ${project.gradient} text-white rounded-full text-sm font-medium shadow-sm`}>
                        {phase.duration}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Challenges & Solutions */}
        <motion.section 
          className="mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <h2 className="text-3xl font-bold mb-8 text-white">
            Challenges & Solutions
          </h2>
          <div className="space-y-6">
            {project.challenges.map((challenge, index) => (
              <motion.div
                key={index}
                className="bg-[#111111]/80 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/5 hover:border-white/10 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
              >
                <div className="flex items-start gap-4 mb-5">
                  <div className="w-10 h-10 bg-red-500/10 text-red-400 rounded-xl flex items-center justify-center flex-shrink-0 border border-red-500/20">
                    <span className="font-bold text-xl">!</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white/90 mb-2 mt-1">Challenge: {challenge.problem}</h3>
                  </div>
                </div>
                <div className="flex items-start gap-4 ml-14">
                  <div className={`w-10 h-10 bg-gradient-to-br ${project.gradient} rounded-xl flex items-center justify-center flex-shrink-0 shadow-md`}>
                    <Check className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white/90 font-medium mb-1 mt-2">Solution:</h4>
                    <p className="text-white leading-relaxed">{challenge.solution}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.div 
          className={`bg-gradient-to-r ${project.gradient} rounded-3xl p-[2px] shadow-2xl`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="bg-[#0a0a0a] rounded-[22px] p-12 text-center relative overflow-hidden">
             <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-5`} />
            <h3 className="text-3xl font-bold mb-4 text-white relative z-10">
              Interested in this project?
            </h3>
            <p className="text-white mb-8 text-lg relative z-10">
              Let's discuss how similar solutions can benefit your organization
            </p>
            <motion.button
              onClick={onBack}
              className={`px-8 py-4 bg-gradient-to-r ${project.gradient} text-white font-medium rounded-xl shadow-lg hover:shadow-2xl transition-all relative z-10`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View More Projects
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}