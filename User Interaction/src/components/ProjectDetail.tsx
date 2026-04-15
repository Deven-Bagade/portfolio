import {
  ArrowLeft, Github, ExternalLink, Users, Code2, Zap, Check,
  Star, TrendingUp, ChevronLeft, ChevronRight, Monitor, Layers,
  Clock, Target, ArrowUpRight
} from 'lucide-react';
import { motion, useScroll, useTransform, useInView, useAnimationControls } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

interface ProjectDetailProps {
  projectId: number;
  onBack: () => void;
}

// ── Reusable scroll-reveal wrapper ──────────────────────────────────────────
function Reveal({
  children,
  delay = 0,
  direction = 'up',
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'left' | 'right';
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.15 });
  const dirMap = { up: [0, 32], left: [-40, 0], right: [40, 0] };
  const [dx, dy] = dirMap[direction];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: dx, y: dy }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: dx, y: dy }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

// ── Screenshot placeholder (gradient + noise) ───────────────────────────────
function ScreenshotPlaceholder({ gradient, index, label }: { gradient: string; index: number; label: string }) {
  const patterns = [
    // Dashboard-like grid
    <svg key="a" width="100%" height="100%" viewBox="0 0 400 280" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', inset: 0 }}>
      <rect x="20" y="20" width="170" height="100" rx="10" fill="rgba(255,255,255,0.08)" />
      <rect x="210" y="20" width="80" height="45" rx="8" fill="rgba(255,255,255,0.06)" />
      <rect x="210" y="75" width="80" height="45" rx="8" fill="rgba(255,255,255,0.06)" />
      <rect x="300" y="20" width="80" height="100" rx="8" fill="rgba(255,255,255,0.05)" />
      <rect x="20" y="140" width="115" height="60" rx="8" fill="rgba(255,255,255,0.07)" />
      <rect x="145" y="140" width="115" height="60" rx="8" fill="rgba(255,255,255,0.05)" />
      <rect x="270" y="140" width="110" height="60" rx="8" fill="rgba(255,255,255,0.06)" />
      <rect x="20" y="220" width="360" height="40" rx="8" fill="rgba(255,255,255,0.04)" />
    </svg>,
    // Chat/list UI
    <svg key="b" width="100%" height="100%" viewBox="0 0 400 280" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', inset: 0 }}>
      <rect x="20" y="20" width="100" height="240" rx="10" fill="rgba(255,255,255,0.06)" />
      <rect x="135" y="20" width="245" height="50" rx="8" fill="rgba(255,255,255,0.08)" />
      {[0,1,2,3].map(i => (
        <rect key={i} x="135" y={90 + i * 48} width={160 + (i % 2) * 60} height="36" rx="18" fill="rgba(255,255,255,0.07)" />
      ))}
      <rect x="135" y="240" width="245" height="20" rx="6" fill="rgba(255,255,255,0.05)" />
    </svg>,
    // Analytics chart
    <svg key="c" width="100%" height="100%" viewBox="0 0 400 280" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', inset: 0 }}>
      <rect x="20" y="20" width="360" height="40" rx="8" fill="rgba(255,255,255,0.06)" />
      <polyline points="20,220 80,170 140,190 200,120 260,140 320,80 380,100" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="2.5" />
      <polyline points="20,220 80,170 140,190 200,120 260,140 320,80 380,100 380,240 20,240" fill="rgba(255,255,255,0.05)" />
      {[80,140,200,260,320].map((x, i) => (
        <circle key={i} cx={x} cy={[170,190,120,140,80][i]} r="5" fill="rgba(255,255,255,0.4)" />
      ))}
      <rect x="20" y="250" width="80" height="10" rx="4" fill="rgba(255,255,255,0.07)" />
      <rect x="115" y="250" width="80" height="10" rx="4" fill="rgba(255,255,255,0.05)" />
      <rect x="210" y="250" width="80" height="10" rx="4" fill="rgba(255,255,255,0.06)" />
    </svg>,
  ];

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', borderRadius: 'inherit' }}>
      <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${gradient})`, opacity: 0.7 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.35)' }} />
      {patterns[index % 3]}
      <div style={{
        position: 'absolute', bottom: 16, left: 16,
        background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)',
        border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: 8, padding: '4px 12px',
        fontFamily: "'DM Mono', monospace",
        fontSize: 11, color: 'rgba(255,255,255,0.7)',
        letterSpacing: '0.08em', textTransform: 'uppercase',
      }}>{label}</div>
    </div>
  );
}

export function ProjectDetail({ projectId, onBack }: ProjectDetailProps) {
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [similarIndex, setSimilarIndex] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const GRAD_STOPS: Record<string, string> = {
    'from-blue-500 to-cyan-600':      '#3b82f6, #0891b2',
    'from-purple-500 to-pink-600':    '#a855f7, #db2777',
    'from-green-500 to-emerald-600':  '#22c55e, #059669',
    'from-orange-500 to-red-600':     '#f97316, #dc2626',
    'from-indigo-500 to-blue-600':    '#6366f1, #2563eb',
    'from-teal-500 to-cyan-600':      '#14b8a6, #0891b2',
  };

  const projects = [
    {
      name: 'Wisdom',
      tagline: 'Academic Course Marketplace & CI/CD Platform',
      description: 'A comprehensive React-based platform for selling academic courses, integrated with a robust Jenkins CI/CD pipeline and Selenium automated testing for seamless deployment.',
      longDescription: 'Wisdom was built to bridge the gap between academic content creators and students. The platform not only serves as a marketplace for high-quality educational courses but also stands as a testament to modern DevOps practices. By integrating a full Jenkins CI/CD pipeline and automated Selenium tests, the application ensures high reliability and zero-downtime deployments.',
      features: [
        { title: 'Course Marketplace', desc: 'Browse, purchase, and access academic courses with a seamless user interface.' },
        { title: 'Automated CI/CD', desc: 'Fully integrated Jenkins pipeline for automated building, testing, and deployment.' },
        { title: 'Selenium Integration', desc: 'End-to-end automated UI testing to guarantee core functionality before every release.' },
        { title: 'User Dashboards', desc: 'Dedicated portals for instructors to upload content and students to track progress.' },
        { title: 'Secure Transactions', desc: 'Integrated payment processing for course purchases.' },
        { title: 'Responsive Design', desc: 'Optimized viewing experience across all devices.' },
      ],
      tech: ['React.js', 'Node.js', 'Jenkins', 'Selenium', 'Tailwind CSS', 'Git/GitHub'],
      metrics: [{ label: 'Test Coverage', value: '95%', icon: Check }, { label: 'Uptime', value: '99.9%', icon: Zap }, { label: 'Build Time', value: '<3m', icon: Clock }],
      timeline: [
        { phase: 'UI/UX Design & Frontend', duration: '3 weeks', status: 'completed' },
        { phase: 'Backend API Development', duration: '4 weeks', status: 'completed' },
        { phase: 'CI/CD Pipeline Setup', duration: '2 weeks', status: 'completed' },
        { phase: 'E2E Testing & Launch', duration: '2 weeks', status: 'completed' },
      ],
      challenges: [
        { problem: 'Pipeline Integration', solution: 'Configured Jenkins webhooks with GitHub to trigger automated builds on every push to the main branch.' },
        { problem: 'UI Test Flakiness', solution: 'Implemented explicit waits and dynamic element locators in Selenium to stabilize automated tests.' },
        { problem: 'State Management', solution: 'Utilized React Context to manage complex user session and cart data seamlessly.' },
      ],
      gradient: 'from-blue-500 to-cyan-600',
      gradStops: '#3b82f6, #0891b2',
      screenshots: ['Storefront', 'Course Player', 'Jenkins Pipeline'],
    },
    {
      name: 'MindCare',
      tagline: 'Mental Health Support & Wellness Platform',
      description: 'A privacy-first mental health support application designed to help users manage their emotional well-being through AI-powered chat support, mood tracking, and personalized wellness recommendations.',
      longDescription: 'MindCare addresses the critical need for accessible mental health support. The app provides a safe, judgment-free space where users can express their feelings, track their moods, and receive personalized support. With AI-powered chat functionality, users get immediate responses and coping strategies tailored to their emotional state. The privacy-first approach ensures all user data is encrypted and never shared.',
      features: [
        { title: 'AI Chat Support', desc: 'Intelligent conversational AI providing empathetic responses and coping strategies' },
        { title: 'Mood Tracking', desc: 'Visual mood journals with patterns and insights over time' },
        { title: 'Stress Management Tools', desc: 'Guided meditation, breathing exercises, and relaxation techniques' },
        { title: 'Privacy-First Design', desc: 'End-to-end encryption with local data storage options' },
        { title: 'Personalized Recommendations', desc: 'AI-driven wellness suggestions based on mood patterns' },
        { title: 'Crisis Resources', desc: 'Quick access to emergency helplines and professional support' },
      ],
      tech: ['React.js', 'Node.js', 'AI/ML APIs', 'Natural Language Processing', 'Encryption'],
      metrics: [{ label: 'User Satisfaction', value: '95%', icon: Star }, { label: 'Daily Active Users', value: '500+', icon: Users }, { label: 'Response Time', value: '<1s', icon: Zap }],
      timeline: [
        { phase: 'Research & UX Design', duration: '3 weeks', status: 'completed' },
        { phase: 'AI Integration', duration: '5 weeks', status: 'completed' },
        { phase: 'Privacy Implementation', duration: '2 weeks', status: 'completed' },
        { phase: 'Beta Testing', duration: '3 weeks', status: 'completed' },
      ],
      challenges: [
        { problem: 'AI Accuracy', solution: 'Fine-tuned NLP models with mental health-specific training data for empathetic responses' },
        { problem: 'Data Privacy', solution: 'Implemented end-to-end encryption with secure local storage and optional cloud sync' },
        { problem: 'User Trust', solution: 'Transparent privacy policy and clear communication about data handling practices' },
      ],
      gradient: 'from-purple-500 to-pink-600',
      gradStops: '#a855f7, #db2777',
      screenshots: ['Home', 'Chat', 'Mood Log'],
    },
    {
      name: 'Class Vision',
      tagline: 'Face-Recognition Attendance System',
      description: 'An automated attendance management system leveraging Python, OpenCV, and Tkinter to track student presence through real-time facial recognition.',
      longDescription: 'Class Vision eliminates the friction of manual roll calls in educational institutions. By utilizing OpenCV for precise facial detection and recognition, the system automatically logs student attendance as they enter the classroom. A custom Tkinter GUI provides administrators with an easy-to-use interface to manage student databases, train the recognition model, and export attendance reports seamlessly.',
      features: [
        { title: 'Facial Recognition', desc: 'Accurate real-time student identification using OpenCV.' },
        { title: 'Automated Logging', desc: 'Instantly records attendance with timestamps into a secure database.' },
        { title: 'Admin GUI', desc: 'Intuitive Tkinter interface for managing student data and system settings.' },
        { title: 'Report Generation', desc: 'Easily export attendance data to CSV or Excel formats for administration.' },
        { title: 'Model Training', desc: 'Built-in tools to capture and train the system on new student faces.' },
        { title: 'Liveness Detection', desc: 'Basic anti-spoofing measures to ensure accurate presence tracking.' },
      ],
      tech: ['Python', 'OpenCV', 'Tkinter', 'NumPy', 'SQLite'],
      metrics: [{ label: 'Accuracy', value: '98%', icon: Target }, { label: 'Processing Speed', value: '<2s', icon: Zap }, { label: 'Time Saved', value: '15m/class', icon: Clock }],
      timeline: [
        { phase: 'Algorithm Selection', duration: '2 weeks', status: 'completed' },
        { phase: 'Core Vision Logic', duration: '4 weeks', status: 'completed' },
        { phase: 'GUI Development', duration: '3 weeks', status: 'completed' },
        { phase: 'Optimization & Testing', duration: '2 weeks', status: 'completed' },
      ],
      challenges: [
        { problem: 'Lighting Variations', solution: 'Applied histogram equalization and image preprocessing to normalize lighting before face detection.' },
        { problem: 'Processing Lag', solution: 'Optimized frame skipping and reduced resolution during the detection phase to ensure real-time performance.' },
        { problem: 'UI Responsiveness', solution: 'Separated the heavy OpenCV video loop from the main Tkinter thread using Python threading.' },
      ],
      gradient: 'from-green-500 to-emerald-600',
      gradStops: '#22c55e, #059669',
      screenshots: ['Dashboard', 'Live Detection', 'Report Export'],
    },
    {
      name: 'Attendigo',
      tagline: 'Smart Attendance Management',
      description: 'A mobile-first application designed for students and educators to track lecture attendance efficiently with offline support and intuitive timetable integration.',
      longDescription: 'Attendigo revolutionizes how students manage their academic attendance. With offline-first architecture, students can mark their attendance even without internet connectivity, ensuring no data loss. The app automatically syncs when connected, providing a seamless experience. The minimalist, modern UI prioritizes simple geometric shapes and clean lines, making it incredibly easy to track patterns and maintain attendance records throughout the semester.',
      features: [
        { title: 'Smart Attendance Marking', desc: 'Mark attendance as Present, Absent, or Late with optional notes for each lecture' },
        { title: 'Offline-First Architecture', desc: 'Full functionality even without internet connection, with automatic sync when online' },
        { title: 'Timetable Integration', desc: 'Organize lectures by timetable for easy tracking and visualization' },
        { title: 'Minimalist UI/UX', desc: 'Clean, modern interface focused on usability and core data visualization' },
        { title: 'Attendance Analytics', desc: 'View attendance percentage, trends, and patterns over time' },
        { title: 'Reminder System', desc: 'Smart notifications for upcoming lectures and low attendance warnings' },
      ],
      tech: ['Flutter', 'Dart', 'Firebase', 'SQLite', 'Provider'],
      metrics: [{ label: 'Performance', value: '99.9%', icon: Zap }, { label: 'Uptime', value: '100%', icon: TrendingUp }, { label: 'User Rating', value: '4.8/5', icon: Star }],
      timeline: [
        { phase: 'Planning & Design', duration: '2 weeks', status: 'completed' },
        { phase: 'Core Development', duration: '4 weeks', status: 'completed' },
        { phase: 'Testing & Refinement', duration: '2 weeks', status: 'completed' },
        { phase: 'Deployment', duration: '1 week', status: 'completed' },
      ],
      challenges: [
        { problem: 'Offline Data Sync', solution: 'Implemented local SQLite database with conflict resolution algorithms for seamless synchronization' },
        { problem: 'State Management', solution: 'Used Provider pattern for efficient state handling across complex UI components' },
        { problem: 'UI Consistency', solution: 'Created a custom geometric design system to ensure the minimalist aesthetic remained consistent.' },
      ],
      gradient: 'from-orange-500 to-red-600',
      gradStops: '#f97316, #dc2626',
      screenshots: ['Overview', 'Analytics', 'Timetable'],
    },
    {
      name: 'Ethnicize',
      tagline: 'Global E-Commerce Marketplace',
      description: 'A scalable e-commerce platform connecting Indian artisans and sellers to global buyers through a comprehensive multi-portal architecture with secure transactions and rich product catalogs.',
      longDescription: 'Ethnicize empowers Indian sellers to reach global markets by providing a complete e-commerce ecosystem. The platform features distinct portals for sellers, buyers, and administrators, each optimized for their specific workflows.',
      features: [
        { title: 'Multi-Portal System', desc: 'Dedicated seller, buyer, and admin dashboards with tailored functionalities' },
        { title: 'Product Management', desc: 'Rich product listings with images, variants, and inventory tracking' },
        { title: 'Secure Payments', desc: 'Integrated payment gateway with multiple payment options' },
        { title: 'Order Processing', desc: 'Complete order lifecycle management from cart to delivery' },
        { title: 'Analytics Dashboard', desc: 'Sales analytics, customer insights, and performance metrics' },
        { title: 'JWT Authentication', desc: 'Secure token-based authentication with refresh tokens' },
      ],
      tech: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'Tailwind CSS', 'Redux', 'Stripe'],
      metrics: [{ label: 'Products Listed', value: '500+', icon: TrendingUp }, { label: 'Active Sellers', value: '50+', icon: Users }, { label: 'Transaction Rate', value: '99.9%', icon: Check }],
      timeline: [
        { phase: 'MVP Development', duration: '4 weeks', status: 'completed' },
        { phase: 'Portal Integration', duration: '6 weeks', status: 'completed' },
        { phase: 'Payment Integration', duration: '2 weeks', status: 'completed' },
        { phase: 'Production Deployment', duration: '2 weeks', status: 'completed' },
      ],
      challenges: [
        { problem: 'State Management', solution: 'Implemented Redux with normalized state for efficient data flow across portals' },
        { problem: 'Image Optimization', solution: 'Created image processing pipeline with CDN integration for fast loading' },
        { problem: 'Search Performance', solution: 'Optimized backend aggregation pipelines for robust product search and filtering' },
      ],
      gradient: 'from-indigo-500 to-blue-600',
      gradStops: '#6366f1, #2563eb',
      screenshots: ['Storefront', 'Seller Portal', 'Checkout'],
    },
    {
      name: 'AgriML',
      tagline: 'Crop Disease Detection Framework',
      description: 'A specialized machine learning framework designed to detect diseases in Cotton and Pigeon Pea (Tur) crops using computer vision and TFLite models.',
      longDescription: 'Developed to assist farmers in early disease identification, AgriML leverages convolutional neural networks to analyze leaf imagery. Focusing specifically on Cotton and Pigeon Pea, the system provides accurate diagnostic results through a lightweight TFLite model, making it suitable for deployment on low-power mobile devices in rural areas.',
      features: [
        { title: 'Disease Classification', desc: 'Accurate categorization of common diseases affecting Cotton and Tur crops.' },
        { title: 'Mobile-Optimized Models', desc: 'Converted heavy TensorFlow models to TFLite for edge deployment.' },
        { title: 'Annotated Datasets', desc: 'Custom-built, heavily augmented datasets to improve model robustness.' },
        { title: 'Architectural Pipelines', desc: 'Clear data processing and training pipelines for reproducible research.' },
        { title: 'Offline Inference', desc: 'On-device processing ensuring functionality without internet access.' },
        { title: 'High Accuracy', desc: 'Maintained high precision while reducing model size significantly.' },
      ],
      tech: ['Python', 'TensorFlow', 'Keras', 'TFLite', 'Computer Vision'],
      metrics: [{ label: 'Model Accuracy', value: '92%', icon: Target }, { label: 'Inference Time', value: '<100ms', icon: Zap }, { label: 'Model Size', value: '<5MB', icon: Check }],
      timeline: [
        { phase: 'Data Collection & Annotation', duration: '3 weeks', status: 'completed' },
        { phase: 'Model Architecture Design', duration: '2 weeks', status: 'completed' },
        { phase: 'Training & Evaluation', duration: '4 weeks', status: 'completed' },
        { phase: 'TFLite Conversion', duration: '1 week', status: 'completed' },
      ],
      challenges: [
        { problem: 'Data Scarcity', solution: 'Utilized extensive data augmentation techniques (rotation, flipping, brightness adjustments) to artificially expand the training set.' },
        { problem: 'Model Size Constraints', solution: 'Applied quantization techniques during TFLite conversion to reduce the footprint without sacrificing accuracy.' },
        { problem: 'False Positives', solution: 'Implemented a confidence threshold logic to only display results when the model was highly certain.' },
      ],
      gradient: 'from-teal-500 to-cyan-600',
      gradStops: '#14b8a6, #0891b2',
      screenshots: ['Data Pipeline', 'Model Results', 'Architecture'],
    },
  ];

  const project = projects[projectId];
  const gradStops = GRAD_STOPS[project.gradient] ?? project.gradStops ?? '#64748b, #334155';
  const similarProjects = projects.filter((_, i) => i !== projectId);
  const visibleSimilar = 2;

  const prevGallery = () => setGalleryIndex(i => (i - 1 + 3) % 3);
  const nextGallery = () => setGalleryIndex(i => (i + 1) % 3);
  const prevSimilar = () => setSimilarIndex(i => Math.max(0, i - 1));
  const nextSimilar = () => setSimilarIndex(i => Math.min(similarProjects.length - visibleSimilar, i + 1));

  return (
    <div style={{ minHeight: '100vh', background: '#060606', fontFamily: "'Outfit', sans-serif", color: '#e2e8f0', overflowX: 'hidden' }}>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=Outfit:wght@100..900&display=swap" />

      {/* ── Global grid texture ───────────────────────────────────── */}
      <div style={{
        pointerEvents: 'none', position: 'fixed', inset: 0, zIndex: 0,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      {/* ══════════════════════════════════════════════════════
          HERO — parallax
      ══════════════════════════════════════════════════════ */}
      <div ref={heroRef} style={{ position: 'relative', height: '90vh', minHeight: 560, overflow: 'hidden' }}>
        {/* Parallax bg */}
        <motion.div
          style={{ position: 'absolute', inset: '-20%', y: heroY }}
        >
          <div style={{
            position: 'absolute', inset: 0,
            background: `radial-gradient(ellipse 80% 70% at 60% 40%, ${gradStops.split(',')[0]}33, transparent 65%),
                         radial-gradient(ellipse 50% 50% at 20% 80%, ${gradStops.split(',').at(-1) ?? gradStops.split(',')[0]}22, transparent 60%),
                         #060606`,
          }} />
          {/* Diagonal accent lines */}
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.07 }} preserveAspectRatio="none">
            {[...Array(8)].map((_, i) => (
              <line key={i} x1={`${i * 15}%`} y1="0%" x2={`${i * 15 + 30}%`} y2="100%"
                stroke="white" strokeWidth="1" />
            ))}
          </svg>
          {/* Floating orbs */}
          {[...Array(5)].map((_, i) => (
            <motion.div key={i}
              style={{
                position: 'absolute',
                width: 200 + i * 80, height: 200 + i * 80, borderRadius: '50%',
                background: `radial-gradient(circle, ${gradStops.split(',')[0]}18, transparent 70%)`,
                left: `${10 + i * 18}%`, top: `${10 + (i % 3) * 25}%`,
                filter: 'blur(30px)',
              }}
              animate={{ y: [0, -20, 0], x: [0, i % 2 ? 12 : -12, 0] }}
              transition={{ duration: 6 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.8 }}
            />
          ))}
        </motion.div>

        {/* Hero content */}
        <motion.div
          style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 'clamp(24px, 5vw, 64px)', opacity: heroOpacity }}
        >
          {/* Back button */}
          <motion.button
            onClick={onBack}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ x: -4 }}
            style={{
              position: 'absolute', top: 'clamp(20px, 4vw, 40px)', left: 'clamp(20px, 4vw, 48px)',
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '10px 20px', borderRadius: 12,
              background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.12)',
              color: '#cbd5e1', fontFamily: "'DM Mono', monospace",
              fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase',
              cursor: 'pointer',
            }}
          >
            <ArrowLeft size={14} /> Back
          </motion.button>

          <div style={{ maxWidth: 900 }}>
            {/* Tag */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '5px 14px', borderRadius: 9999,
                background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
                fontFamily: "'DM Mono', monospace", fontSize: 10,
                letterSpacing: '0.15em', color: '#94a3b8', textTransform: 'uppercase',
                marginBottom: 20,
              }}
            >
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: gradStops.split(',')[0] }} />
              {project.tagline}
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(3rem, 8vw, 7rem)', fontWeight: 700,
                letterSpacing: '-0.04em', lineHeight: 0.95, margin: '0 0 24px',
                background: `linear-gradient(120deg, #ffffff 30%, ${gradStops.split(',')[0]}cc)`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}
            >{project.name}</motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.35 }}
              style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(14px, 1.8vw, 18px)', color: 'rgba(255,255,255,0.55)', lineHeight: 1.75, maxWidth: 620, margin: '0 0 32px' }}
            >{project.description}</motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}
              style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}
            >
              {[
                { icon: Github, label: 'View Code', primary: false },
                { icon: ExternalLink, label: 'Live Demo', primary: true },
              ].map(({ icon: Icon, label, primary }) => (
                <motion.button
                  key={label}
                  whileHover={{ scale: 1.04, y: -3 }} whileTap={{ scale: 0.97 }}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '13px 24px', borderRadius: 14, cursor: 'pointer',
                    fontWeight: 700, fontSize: 14, fontFamily: "'Outfit', sans-serif",
                    ...(primary
                      ? { background: `linear-gradient(135deg, ${gradStops})`, color: '#fff', border: 'none', boxShadow: `0 12px 32px ${gradStops.split(',')[0]}44` }
                      : { background: 'rgba(255,255,255,0.07)', color: '#cbd5e1', border: '1px solid rgba(255,255,255,0.14)', backdropFilter: 'blur(12px)' }
                    ),
                  }}
                >
                  <Icon size={16} /> {label}
                </motion.button>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom fade */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 120, background: 'linear-gradient(transparent, #060606)', zIndex: 5 }} />
      </div>

      {/* ══════════════════════════════════════════════════════
          MAIN CONTENT
      ══════════════════════════════════════════════════════ */}
      <div style={{ position: 'relative', zIndex: 10, maxWidth: 1100, margin: '0 auto', padding: '0 clamp(16px, 4vw, 48px) 80px' }}>

        {/* ── Metrics ── */}
        <Reveal delay={0}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 80, marginTop: -40 }}>
            {project.metrics.map((metric, i) => {
              const Icon = metric.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -6 }}
                  style={{
                    background: 'rgba(14,14,14,0.95)', backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 20, padding: '28px 24px', textAlign: 'center',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                    position: 'relative', overflow: 'hidden',
                  }}
                >
                  <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 50% 0%, ${gradStops.split(',')[0]}12, transparent 60%)` }} />
                  <div style={{
                    width: 52, height: 52, borderRadius: 16, margin: '0 auto 16px',
                    background: `linear-gradient(135deg, ${gradStops})`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: `0 8px 24px ${gradStops.split(',')[0]}44`,
                  }}>
                    <Icon size={22} color="#fff" />
                  </div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 36, fontWeight: 700, letterSpacing: '-0.03em', color: '#f1f5f9', marginBottom: 6 }}>{metric.value}</div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: '0.12em', color: '#64748b', textTransform: 'uppercase' }}>{metric.label}</div>
                </motion.div>
              );
            })}
          </div>
        </Reveal>

        {/* ── Screenshot Gallery ── */}
        <Reveal delay={0.05}>
          <section style={{ marginBottom: 80 }}>
            <SectionLabel icon={Monitor} text="Screenshots" />
            <div style={{ position: 'relative', borderRadius: 24, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 40px 80px rgba(0,0,0,0.7)' }}>
              {/* Main slide */}
              <div style={{ position: 'relative', height: 'clamp(240px, 40vw, 420px)', background: '#0c0c0c' }}>
                <motion.div
                  key={galleryIndex}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  style={{ position: 'absolute', inset: 0 }}
                >
                  <ScreenshotPlaceholder
                    gradient={gradStops}
                    index={galleryIndex}
                    label={project.screenshots?.[galleryIndex] ?? `Screen ${galleryIndex + 1}`}
                  />
                </motion.div>

                {/* Nav arrows */}
                {[{ dir: 'left', fn: prevGallery, Icon: ChevronLeft }, { dir: 'right', fn: nextGallery, Icon: ChevronRight }].map(({ dir, fn, Icon }) => (
                  <motion.button
                    key={dir}
                    onClick={fn}
                    whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.92 }}
                    style={{
                      position: 'absolute', top: '50%', transform: 'translateY(-50%)',
                      [dir]: 16, zIndex: 10,
                      width: 44, height: 44, borderRadius: 12,
                      background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(12px)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      cursor: 'pointer', color: '#fff',
                    }}
                  >
                    <Icon size={20} />
                  </motion.button>
                ))}
              </div>

              {/* Dot indicators + thumbnails */}
              <div style={{
                background: 'rgba(10,10,10,0.95)', borderTop: '1px solid rgba(255,255,255,0.06)',
                padding: '16px 24px', display: 'flex', alignItems: 'center', gap: 12,
              }}>
                {[0, 1, 2].map(i => (
                  <button
                    key={i}
                    onClick={() => setGalleryIndex(i)}
                    style={{
                      flex: i === galleryIndex ? 2 : 1, height: 4, borderRadius: 9999, border: 'none', cursor: 'pointer',
                      background: i === galleryIndex ? `linear-gradient(90deg, ${gradStops})` : 'rgba(255,255,255,0.12)',
                      transition: 'all 0.3s ease',
                    }}
                  />
                ))}
                <span style={{ marginLeft: 'auto', fontFamily: "'DM Mono', monospace", fontSize: 10, color: '#475569', letterSpacing: '0.08em' }}>
                  {galleryIndex + 1} / 3
                </span>
              </div>
            </div>
          </section>
        </Reveal>

        {/* ── Overview ── */}
        <Reveal delay={0.05}>
          <section style={{ marginBottom: 80 }}>
            <SectionLabel icon={Target} text="Overview" />
            <div style={{
              background: 'rgba(12,12,12,0.9)', backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 24, padding: 'clamp(28px, 4vw, 48px)',
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: `linear-gradient(180deg, ${gradStops})`, borderRadius: '3px 0 0 3px' }} />
              <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 60% 50% at 0% 50%, ${gradStops.split(',')[0]}0a, transparent 60%)` }} />
              <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(15px, 1.5vw, 17px)', color: 'rgba(255,255,255,0.6)', lineHeight: 1.9, margin: 0, position: 'relative', zIndex: 1 }}>
                {project.longDescription}
              </p>
            </div>
          </section>
        </Reveal>

        {/* ── Features ── */}
        <section style={{ marginBottom: 80 }}>
          <Reveal delay={0.05}>
            <SectionLabel icon={Layers} text="Key Features" />
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            {project.features.map((feature, i) => (
              <Reveal key={i} delay={i * 0.06} direction={i % 2 === 0 ? 'left' : 'right'}>
                <motion.div
                  whileHover={{ y: -5, borderColor: 'rgba(255,255,255,0.18)' }}
                  style={{
                    background: 'rgba(12,12,12,0.9)', backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: 20, padding: '24px',
                    display: 'flex', alignItems: 'flex-start', gap: 16,
                    cursor: 'default', transition: 'border-color 0.3s',
                    height: '100%',
                  }}
                >
                  <div style={{
                    width: 44, height: 44, borderRadius: 13, flexShrink: 0,
                    background: `linear-gradient(135deg, ${gradStops})`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: `0 6px 20px ${gradStops.split(',')[0]}33`,
                  }}>
                    <Check size={18} color="#fff" />
                  </div>
                  <div>
                    <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 700, color: '#f1f5f9', margin: '0 0 6px', letterSpacing: '-0.01em' }}>{feature.title}</h3>
                    <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, margin: 0 }}>{feature.desc}</p>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── Tech Stack ── */}
        <Reveal delay={0.05}>
          <section style={{ marginBottom: 80 }}>
            <SectionLabel icon={Code2} text="Technology Stack" />
            <div style={{
              background: 'rgba(12,12,12,0.9)', backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 24, padding: 'clamp(24px, 3vw, 40px)',
            }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {project.tech.map((tech, i) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: false, amount: 0.5 }}
                    transition={{ delay: i * 0.04, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ scale: 1.06, y: -2 }}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 8,
                      padding: '9px 18px', borderRadius: 12,
                      background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                      fontFamily: "'DM Mono', monospace", fontSize: 12, color: '#94a3b8',
                      cursor: 'default',
                    }}
                  >
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: `linear-gradient(135deg, ${gradStops})` }} />
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </section>
        </Reveal>

        {/* ── Timeline ── */}
        <Reveal delay={0.05}>
          <section style={{ marginBottom: 80 }}>
            <SectionLabel icon={Clock} text="Development Timeline" />
            <div style={{
              background: 'rgba(12,12,12,0.9)', backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 24, padding: 'clamp(24px, 3vw, 40px)',
            }}>
              {project.timeline.map((phase, i) => (
                <Reveal key={i} delay={i * 0.08} direction="left">
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 20,
                    padding: '16px 0',
                    borderBottom: i < project.timeline.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                  }}>
                    {/* Step circle */}
                    <div style={{ position: 'relative', flexShrink: 0 }}>
                      <div style={{
                        width: 44, height: 44, borderRadius: '50%',
                        background: `linear-gradient(135deg, ${gradStops})`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: `0 6px 20px ${gradStops.split(',')[0]}44`,
                        fontFamily: "'DM Mono', monospace", fontSize: 13, fontWeight: 700, color: '#fff',
                      }}>{String(i + 1).padStart(2, '0')}</div>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 15, fontWeight: 700, color: '#e2e8f0', marginBottom: 2 }}>{phase.phase}</div>
                    </div>
                    <span style={{
                      fontFamily: "'DM Mono', monospace", fontSize: 11,
                      color: gradStops.split(',')[0], letterSpacing: '0.06em',
                      background: `${gradStops.split(',')[0]}15`,
                      border: `1px solid ${gradStops.split(',')[0]}30`,
                      padding: '4px 12px', borderRadius: 8,
                    }}>{phase.duration}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>
        </Reveal>

        {/* ── Challenges & Solutions ── */}
        <section style={{ marginBottom: 80 }}>
          <Reveal delay={0.05}>
            <SectionLabel icon={Zap} text="Challenges & Solutions" />
          </Reveal>
          {project.challenges.map((c, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div style={{
                background: 'rgba(12,12,12,0.9)', backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 20, padding: '28px 32px',
                marginBottom: 14, position: 'relative', overflow: 'hidden',
              }}>
                <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 100% 0%, ${gradStops.split(',')[0]}06, transparent 50%)` }} />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                      <div style={{ width: 28, height: 28, borderRadius: 8, background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <span style={{ color: '#f87171', fontSize: 14, fontWeight: 700 }}>!</span>
                      </div>
                      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: '0.14em', color: '#ef4444', textTransform: 'uppercase' }}>Challenge</span>
                    </div>
                    <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 700, color: '#f1f5f9', margin: 0 }}>{c.problem}</h3>
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                      <div style={{ width: 28, height: 28, borderRadius: 8, background: `${gradStops.split(',')[0]}20`, border: `1px solid ${gradStops.split(',')[0]}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Check size={13} color={gradStops.split(',')[0]} />
                      </div>
                      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: '0.14em', color: gradStops.split(',')[0], textTransform: 'uppercase' }}>Solution</span>
                    </div>
                    <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, margin: 0 }}>{c.solution}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </section>

        {/* ── Similar Projects Carousel ── */}
        <section style={{ marginBottom: 80 }}>
          <Reveal delay={0.05}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
              <SectionLabel icon={TrendingUp} text="Similar Projects" inline />
              <div style={{ display: 'flex', gap: 8 }}>
                {[{ fn: prevSimilar, Icon: ChevronLeft, disabled: similarIndex === 0 }, { fn: nextSimilar, Icon: ChevronRight, disabled: similarIndex >= similarProjects.length - visibleSimilar }].map(({ fn, Icon, disabled }, idx) => (
                  <motion.button
                    key={idx}
                    onClick={fn}
                    whileHover={!disabled ? { scale: 1.08 } : {}}
                    whileTap={!disabled ? { scale: 0.95 } : {}}
                    style={{
                      width: 40, height: 40, borderRadius: 10, cursor: disabled ? 'not-allowed' : 'pointer',
                      background: disabled ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.07)',
                      border: '1px solid rgba(255,255,255,0.09)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: disabled ? '#334155' : '#94a3b8',
                      transition: 'all 0.2s',
                    }}
                  ><Icon size={18} /></motion.button>
                ))}
              </div>
            </div>
          </Reveal>

          <div style={{ overflow: 'hidden' }}>
            <motion.div
              animate={{ x: `-${similarIndex * (100 / visibleSimilar)}%` }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: 'flex', gap: 16 }}
            >
              {similarProjects.map((sp, i) => {
                const spStops = GRAD_STOPS[sp.gradient] ?? '#64748b, #334155';
                return (
                  <motion.div
                    key={i}
                    whileHover={{ y: -6, borderColor: 'rgba(255,255,255,0.16)' }}
                    style={{
                      minWidth: `calc(${100 / visibleSimilar}% - ${16 * (visibleSimilar - 1) / visibleSimilar}px)`,
                      background: 'rgba(12,12,12,0.9)', backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: 20, overflow: 'hidden', cursor: 'pointer',
                      transition: 'border-color 0.3s',
                      flexShrink: 0,
                    }}
                  >
                    {/* Thumbnail */}
                    <div style={{ height: 140, position: 'relative' }}>
                      <ScreenshotPlaceholder gradient={spStops} index={i % 3} label={sp.tagline} />
                    </div>
                    {/* Info */}
                    <div style={{ padding: '20px 20px 22px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 700, color: '#f1f5f9', margin: 0, letterSpacing: '-0.02em' }}>{sp.name}</h3>
                        <motion.div whileHover={{ scale: 1.15 }}>
                          <ArrowUpRight size={16} color="#475569" />
                        </motion.div>
                      </div>
                      <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 12, color: 'rgba(255,255,255,0.4)', lineHeight: 1.6, margin: '0 0 14px' }}>{sp.tagline}</p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                        {sp.tech.slice(0, 3).map(t => (
                          <span key={t} style={{
                            fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: '0.08em',
                            color: '#475569', background: 'rgba(255,255,255,0.04)',
                            border: '1px solid rgba(255,255,255,0.07)', padding: '2px 8px', borderRadius: 6,
                            textTransform: 'uppercase',
                          }}>{t}</span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* ── CTA ── */}
        <Reveal delay={0.05}>
          <div style={{ position: 'relative', borderRadius: 28, overflow: 'hidden' }}>
            {/* Glow ring */}
            <div style={{ position: 'absolute', inset: -2, background: `linear-gradient(135deg, ${gradStops})`, borderRadius: 30, opacity: 0.4, filter: 'blur(12px)' }} />
            <div style={{ position: 'relative', background: 'rgba(8,8,8,0.98)', borderRadius: 28, border: '1px solid rgba(255,255,255,0.1)', padding: 'clamp(36px, 5vw, 64px)', textAlign: 'center', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 60% 50% at 50% 0%, ${gradStops.split(',')[0]}10, transparent 60%)` }} />
              {/* Top shimmer line */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${gradStops.split(',')[0]}80, transparent)` }} />

              <motion.div
                animate={{ scale: [1, 1.05, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '5px 14px', borderRadius: 9999, marginBottom: 20,
                  background: `${gradStops.split(',')[0]}18`,
                  border: `1px solid ${gradStops.split(',')[0]}40`,
                  fontFamily: "'DM Mono', monospace", fontSize: 10,
                  letterSpacing: '0.14em', color: gradStops.split(',')[0], textTransform: 'uppercase',
                }}
              >
                <Star size={11} /> Interested in this project?
              </motion.div>

              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 700, letterSpacing: '-0.035em', margin: '0 0 16px', color: '#f1f5f9' }}>
                Let's Build Something<br />
                <span style={{ background: `linear-gradient(120deg, ${gradStops})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Extraordinary
                </span>
              </h3>

              <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 15, color: 'rgba(255,255,255,0.45)', lineHeight: 1.75, maxWidth: 480, margin: '0 auto 32px' }}>
                Let's discuss how similar solutions can transform your organization.
              </p>

              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                <motion.button
                  onClick={onBack}
                  whileHover={{ scale: 1.04, y: -3 }} whileTap={{ scale: 0.97 }}
                  style={{
                    padding: '14px 28px', borderRadius: 14, cursor: 'pointer',
                    background: `linear-gradient(135deg, ${gradStops})`,
                    border: 'none', color: '#fff', fontWeight: 800, fontSize: 14,
                    fontFamily: "'Outfit', sans-serif",
                    boxShadow: `0 16px 40px ${gradStops.split(',')[0]}40`,
                  }}
                >
                  View More Projects
                </motion.button>
                <motion.a
                  href="mailto:devenbofficial@gmail.com"
                  whileHover={{ scale: 1.04, y: -3 }} whileTap={{ scale: 0.97 }}
                  style={{
                    padding: '14px 28px', borderRadius: 14, cursor: 'pointer',
                    background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    color: '#cbd5e1', fontWeight: 700, fontSize: 14,
                    fontFamily: "'Outfit', sans-serif", textDecoration: 'none',
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                  }}
                >
                  <ExternalLink size={15} /> Get In Touch
                </motion.a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

// ── Section label helper ────────────────────────────────────────────────────
function SectionLabel({ icon: Icon, text, inline = false }: { icon: React.ElementType; text: string; inline?: boolean }) {
  return (
    <div style={{ display: inline ? 'inline-flex' : 'flex', alignItems: 'center', gap: 10, marginBottom: inline ? 0 : 24 }}>
      <div style={{
        width: 32, height: 32, borderRadius: 9,
        background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon size={15} color="#64748b" />
      </div>
      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: '0.14em', color: '#475569', textTransform: 'uppercase' }}>
        {text}
      </span>
    </div>
  );
}