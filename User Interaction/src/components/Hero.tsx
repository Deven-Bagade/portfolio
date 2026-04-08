import { useEffect, useState, useRef } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { 
  Github, Linkedin, Mail, MapPin, Phone, ArrowDown, Sparkles, 
  Calendar, Code, FileText, User, Clock, Zap, Link as LinkIcon, 
  ArrowRight, X, Brain, Server, Cloud, Layers 
} from 'lucide-react'

// --- 1. Premium Mini UI Components ---
const Badge = ({ children, className = "" }) => (
  <div className={`inline-flex items-center rounded-full px-3 py-1.5 text-sm font-black uppercase tracking-wider ${className}`}>
    {children}
  </div>
);

const Button = ({ children, className = "", onClick, onMouseEnter, onMouseLeave }) => (
  <button onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className={`inline-flex items-center justify-center rounded-lg transition-all duration-300 ${className}`}>
    {children}
  </button>
);

const Card = ({ children, className = "" }) => (
  <div className={`relative rounded-2xl border border-white/20 bg-black/90 text-white shadow-2xl backdrop-blur-xl overflow-hidden ${className}`}>
    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
    {children}
  </div>
);

const CardHeader = ({ children, className = "" }) => <div className={`flex flex-col space-y-1.5 p-6 pb-3 ${className}`}>{children}</div>;
const CardTitle = ({ children, className = "" }) => <h3 className={`text-xl font-bold leading-tight tracking-tight text-white ${className}`}>{children}</h3>;
const CardContent = ({ children, className = "" }) => <div className={`p-6 pt-2 ${className}`}>{children}</div>;

// --- 2. Timeline Data (unchanged content) ---
const timelineData = [
  {
    id: 1,
    title: "SDE",
    content: "Software Development Engineer – strong foundation in data structures, algorithms, and system design. Built scalable backend services with Node.js, Python, and Java. Optimized databases and implemented RESTful APIs.",
    icon: Code,
    relatedIds: [2, 5],
    energy: 90,
  },
  {
    id: 2,
    title: "AIML",
    content: "Artificial Intelligence & Machine Learning – experience building predictive models, NLP pipelines, and computer vision solutions using TensorFlow, PyTorch, and scikit-learn. Enjoy turning data into insights.",
    icon: Brain,
    relatedIds: [1, 3, 5],
    energy: 70,
  },
  {
    id: 3,
    title: "DevOps",
    content: "DevOps practices – CI/CD pipelines (GitHub Actions, Jenkins), containerization (Docker), orchestration (Kubernetes), infrastructure as code (Terraform), and monitoring (Prometheus, Grafana).",
    icon: Server,
    relatedIds: [2, 4],
    energy: 80,
  },
  {
    id: 4,
    title: "Cloud",
    content: "Cloud computing – hands-on with AWS (EC2, S3, Lambda, RDS) and Azure. Familiar with serverless architectures, cloud security, and cost optimisation.",
    icon: Cloud,
    relatedIds: [3, 5],
    energy: 80,
  },
  {
    id: 5,
    title: "Full-Stack",
    content: "Full-stack development – React, Next.js, Tailwind CSS, Node.js, Express, MongoDB, PostgreSQL. Built end‑to‑end web apps with responsive design and real‑time features.",
    icon: Layers,
    relatedIds: [1, 2, 4],
    energy: 95,
  },
];

// --- 3. The Core Orbital Component (grayscale theme) ---
function RadialOrbitalTimeline() {
  const [expandedItems, setExpandedItems] = useState({});
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isHoveringOrbit, setIsHoveringOrbit] = useState(false);
  const [hoveredNodeId, setHoveredNodeId] = useState(null);
  const [pulseEffect, setPulseEffect] = useState({});
  const [activeNodeId, setActiveNodeId] = useState(null);
  const containerRef = useRef(null);

  const ORBIT_RADIUS = 150;
  const CENTER_Y_OFFSET = 220;

  const toggleItem = (id, e) => {
    e?.stopPropagation();
    setExpandedItems((prev) => {
      const isOpening = !prev[id];
      const newState = { [id]: isOpening };
      if (isOpening) {
        setActiveNodeId(id);
        const related = timelineData.find(item => item.id === id)?.relatedIds || [];
        const newPulse = {};
        related.forEach(relId => (newPulse[relId] = true));
        setPulseEffect(newPulse);
        const nodeIndex = timelineData.findIndex((item) => item.id === id);
        const targetAngle = 270 - (nodeIndex / timelineData.length) * 360;
        setRotationAngle(targetAngle);
      } else {
        setActiveNodeId(null);
        setPulseEffect({});
      }
      return newState;
    });
  };

  const handleBackgroundClick = () => {
    setExpandedItems({});
    setActiveNodeId(null);
    setPulseEffect({});
  };

  useEffect(() => {
    let timer;
    if (!isHoveringOrbit && !activeNodeId) {
      timer = setInterval(() => {
        setRotationAngle((prev) => (prev + 0.15) % 360);
      }, 40);
    }
    return () => clearInterval(timer);
  }, [isHoveringOrbit, activeNodeId]);

  let activeX = 0, activeY = 0;
  if (activeNodeId) {
    const activeIndex = timelineData.findIndex(i => i.id === activeNodeId);
    const angle = ((activeIndex / timelineData.length) * 360 + rotationAngle) % 360;
    activeX = ORBIT_RADIUS * Math.cos((angle * Math.PI) / 180);
    activeY = ORBIT_RADIUS * Math.sin((angle * Math.PI) / 180);
  }

  return (
    <div
      ref={containerRef}
      className="w-full h-full min-h-[560px] relative overflow-visible"
      onClick={handleBackgroundClick}
      onMouseEnter={() => setIsHoveringOrbit(true)}
      onMouseLeave={() => setIsHoveringOrbit(false)}
    >
      <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 0, height: 0 }}>

        {/* Connection line SVG - grayscale */}
        <svg style={{ position: 'absolute', top: 0, left: 0, overflow: 'visible', pointerEvents: 'none', zIndex: 0 }}>
          <defs>
            <linearGradient id="laser" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#9ca3af" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#4b5563" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          {activeNodeId && (
            <line x1="0" y1="0" x2={activeX} y2={activeY} stroke="url(#laser)" strokeWidth="2" strokeDasharray="6 4" className="animate-pulse" />
          )}
        </svg>

        {/* Orbital Rings - grayscale */}
        <div className="rounded-full border border-dashed border-gray-400/30 pointer-events-none" style={{ position: 'absolute', width: ORBIT_RADIUS * 1.3, height: ORBIT_RADIUS * 1.3, top: -(ORBIT_RADIUS * 0.65), left: -(ORBIT_RADIUS * 0.65) }}></div>
        <div className="rounded-full border border-gray-400/20 pointer-events-none" style={{ position: 'absolute', width: ORBIT_RADIUS * 2, height: ORBIT_RADIUS * 2, top: -ORBIT_RADIUS, left: -ORBIT_RADIUS }}></div>
        <div className="rounded-full border border-gray-400/12 pointer-events-none" style={{ position: 'absolute', width: ORBIT_RADIUS * 2.8, height: ORBIT_RADIUS * 2.8, top: -(ORBIT_RADIUS * 1.4), left: -(ORBIT_RADIUS * 1.4) }}></div>

        {/* Central Core - grayscale */}
        <div className="rounded-full bg-gradient-to-br from-gray-500 to-gray-700 flex items-center justify-center shadow-[0_0_30px_rgba(128,128,128,0.5)] group cursor-pointer" style={{ position: 'absolute', width: 48, height: 48, top: -24, left: -24 }}>
          <div className="w-4 h-4 rounded-full bg-white/90 shadow-[0_0_15px_rgba(255,255,255,0.8)]"></div>
        </div>

        {/* Orbiting Nodes */}
        {timelineData.map((item, index) => {
          const angle = ((index / timelineData.length) * 360 + rotationAngle) % 360;
          const radian = (angle * Math.PI) / 180;
          const x = ORBIT_RADIUS * Math.cos(radian);
          const y = ORBIT_RADIUS * Math.sin(radian);

          const isExpanded = expandedItems[item.id];
          const isRelated = activeNodeId && timelineData.find(i => i.id === activeNodeId)?.relatedIds.includes(item.id);
          const isPulsing = pulseEffect[item.id];
          const isHovered = hoveredNodeId === item.id;
          const Icon = item.icon;

          return (
            <div
              key={item.id}
              className="absolute flex flex-col items-center justify-center transition-all duration-500"
              style={{
                left: x,
                top: y,
                transform: 'translate(-50%, -50%)',
                zIndex: isExpanded ? 100 : (isHovered ? 60 : 30),
              }}
            >
              {/* Energy Pulse Ring - grayscale */}
              <AnimatePresence>
                {(isPulsing || isHovered) && (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0.6 }}
                    animate={{ scale: 1.4, opacity: 0 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="absolute rounded-full pointer-events-none"
                    style={{
                      background: `radial-gradient(circle, rgba(128,128,128,0.4) 0%, transparent 70%)`,
                      width: item.energy + 40,
                      height: item.energy + 40,
                      top: '50%', left: '50%', transform: 'translate(-50%, -50%)'
                    }}
                  />
                )}
              </AnimatePresence>

              {/* Node Icon - grayscale */}
              <motion.button
                className={`relative w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 outline-none cursor-pointer
                  ${isExpanded ? "bg-white text-black border-white shadow-[0_0_25px_rgba(255,255,255,0.5)]"
                    : isHovered ? "bg-gray-500/40 text-white border-gray-300 shadow-[0_0_20px_rgba(128,128,128,0.4)]"
                    : isRelated ? "bg-gray-500/40 text-white border-gray-300"
                    : "bg-black/80 text-white/90 border-white/30 hover:border-gray-400/70 hover:bg-gray-500/20"}
                `}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => toggleItem(item.id, e)}
                onMouseEnter={() => setHoveredNodeId(item.id)}
                onMouseLeave={() => setHoveredNodeId(null)}
              >
                <Icon size={22} strokeWidth={isExpanded ? 2.5 : 2} />
              </motion.button>

              {/* Node Label */}
              <motion.div
                className={`absolute px-3 py-1.5 rounded-full border backdrop-blur-sm whitespace-nowrap font-mono font-bold tracking-wider pointer-events-none text-sm
                  ${isExpanded || isHovered
                    ? "bg-white/20 text-white border-white/30"
                    : "bg-black/80 text-white border-white/30"}
                `}
                style={{ top: 50 }}
                animate={{ opacity: 1 }}
              >
                {item.title}
              </motion.div>

              {/* Card Popup */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      marginTop: '20px',
                      width: '360px',
                      zIndex: 200
                    }}
                  >
                    <div className="absolute -top-[8px] left-1/2 -translate-x-1/2 w-[2px] h-2 bg-gradient-to-t from-white/50 to-transparent"></div>

                    <Card className="border-white/30 shadow-2xl">
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleItem(item.id, e); }}
                        className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-10 p-1 rounded-full hover:bg-white/10"
                      >
                        <X size={18} />
                      </button>

                      <CardHeader>
                        <CardTitle className="text-xl pt-1 text-white">{item.title}</CardTitle>
                      </CardHeader>
                      <hr className="border-t border-white/20 mx-6" />  

                      <CardContent>
                        <p className="text-base text-white/90 leading-relaxed font-medium">{item.content}</p>

                        {/* Proficiency bar (commented out but kept grayscale ready) */}
                        {/* 
                        <div className="mt-5 pt-3 border-t border-white/20">
                          <div className="flex justify-between items-center mb-2">
                            <span className="flex items-center text-sm font-mono tracking-wider text-white/80">
                              <Zap size={14} className="mr-1.5 text-gray-300" /> PROFICIENCY
                            </span>
                            <span className="text-base text-white font-mono font-bold">{item.energy}%</span>
                          </div>
                          <div className="w-full h-2 bg-black/60 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-gradient-to-r from-gray-400 to-gray-600 rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${item.energy}%` }}
                              transition={{ duration: 0.5, delay: 0.1 }}
                            />
                          </div>
                        </div>
                        */}

                        {item.relatedIds.length > 0 && (
                          <div className="mt-5 pt-3 border-t border-white/20">
                            <div className="flex items-center mb-3">
                              <LinkIcon size={14} className="text-white/60 mr-2" />
                              <h4 className="text-sm uppercase tracking-widest font-bold text-white/80">Connected Skills</h4>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {item.relatedIds.map((relId) => {
                                const relItem = timelineData.find((i) => i.id === relId);
                                return (
                                  <Button
                                    key={relId}
                                    onClick={(e) => { e.stopPropagation(); toggleItem(relId, e); }}
                                    className="h-8 px-3 border border-white/30 bg-white/10 hover:bg-gray-500/30 hover:border-gray-400/60 text-sm text-white/90 font-mono group transition-all"
                                  >
                                    {relItem?.title}
                                    <ArrowRight size={12} className="ml-1.5 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                                  </Button>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// --- 4. Main Hero Wrapper (grayscale theme) ---
export function Hero() {
  const reduceMotion = useReducedMotion();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const titles = ['Full-Stack Developer', 'Mobile App Developer', 'Open-Source Contributor', 'UI Motion Designer'];
  const [currentTitle, setCurrentTitle] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setCurrentTitle((prev) => (prev + 1) % titles.length), 2800);
    return () => clearInterval(interval);
  }, [titles.length]);

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden"
      style={{ background: '#0a0a0a', fontFamily: "'Syne', sans-serif", padding: '100px 48px' }}
    >
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;500;700&family=Syne:wght@400;500;600;700;800&display=swap" />

      {/* Background Effects - grayscale */}
      <div className="pointer-events-none absolute inset-0 z-0" style={{ backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(128,128,128,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(64,64,64,0.06) 0%, transparent 50%)' }} />
      <div className="pointer-events-none absolute inset-0 z-0" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />

      {/* Animated Gradient Orbs - grayscale */}
      {!reduceMotion && (
        <>
          <motion.div
            className="pointer-events-none absolute rounded-full blur-3xl"
            animate={{ x: mousePosition.x * 0.02, y: mousePosition.y * 0.02 }}
            style={{ left: '10%', top: '20%', width: '40%', height: '40%', background: 'radial-gradient(circle, rgba(128,128,128,0.1) 0%, transparent 70%)' }}
          />
          <motion.div
            className="pointer-events-none absolute rounded-full blur-3xl"
            animate={{ x: mousePosition.x * -0.01, y: mousePosition.y * -0.01 }}
            style={{ right: '10%', bottom: '10%', width: '35%', height: '35%', background: 'radial-gradient(circle, rgba(64,64,64,0.08) 0%, transparent 70%)' }}
          />
        </>
      )}

      <div className="relative z-10 mx-auto max-w-7xl min-h-[85vh] flex items-center">
        <div className="grid lg:grid-cols-2 gap-16 items-center w-full">

          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="text-center lg:text-left px-4 lg:px-0"
          >
            {/* Available badge - grayscale */}
            <div className="inline-flex items-center gap-2 px-6 py-3 mb-10 rounded-full border border-gray-400/30 bg-gray-400/10 backdrop-blur-sm">
              <span className="relative flex h-3 w-3">
                <span className="absolute inset-0 rounded-full bg-gray-400 animate-ping opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-gray-400" />
              </span>
             <span className="text-base font-mono text-white uppercase tracking-wider">
  <Sparkles className="inline w-5 h-5 mr-1.5 text-cyan-300" /> Available for opportunities
</span>
            </div>

            {/* Name - grayscale gradient */}
            <h1 className="text-7xl md:text-8xl lg:text-8xl xl:text-9xl font-black tracking-tighter mb-6 leading-[1.1]">
              <span className="bg-gradient-to-r from-gray-300 via-white to-gray-500 bg-clip-text text-transparent">
                Deven Bagade
              </span>
            </h1>

            {/* Animated title */}
            <div className="h-20 mb-5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTitle}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="text-3xl md:text-4xl font-semibold text-white/90"
                >
                  {titles[currentTitle]}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bio paragraph */}
            <p className="text-xl md:text-2xl text-white/80 max-w-xl mx-auto lg:mx-0 leading-relaxed mb-10">
              B.Tech IT student with <span className="text-gray-300 font-semibold">9.65 CGPA</span>, passionate about building scalable web and mobile applications that solve real-world problems through innovative technology solutions.
            </p>

            {/* Contact Info - grayscale */}
            <div className="flex flex-nowrap justify-center lg:justify-start gap-4 mb-10 overflow-x-auto pb-2">
              <a href="tel:+918369183414" className="flex items-center gap-2.5 px-6 py-3 rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm text-white/90 hover:text-white hover:border-gray-400/60 transition-all duration-300 group whitespace-nowrap">
                <Phone className="w-5 h-5 text-gray-300 group-hover:scale-110 transition-transform" />
                <span className="text-m font-mono">+91 8369183414</span>
              </a>
              <a href="mailto:devenbofficial@gmail.com" className="flex items-center gap-2.5 px-6 py-3 rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm text-white/90 hover:text-white hover:border-gray-400/60 transition-all duration-300 group whitespace-nowrap">
                <Mail className="w-5 h-5 text-gray-300 group-hover:scale-110 transition-transform" />
                <span className="text-m font-mono">devenbofficial@gmail.com</span>
              </a>
              <div className="flex items-center gap-2.5 px-6 py-3 rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm text-white/90 whitespace-nowrap">
                <MapPin className="w-5 h-5 text-gray-300" />
                <span className="text-m font-mono">Kalyan, MH</span>
              </div>
            </div>

            {/* CTA Buttons - grayscale */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 mt-4">
              <motion.a
                href="https://github.com/Deven-Bagade"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative flex items-center gap-3 px-8 py-4 bg-white text-black rounded-xl font-bold overflow-hidden shadow-lg text-base md:text-lg"
              >
                <span className="relative z-10 flex items-center gap-2.5">
                  <Github className="w-5 h-5 md:w-6 md:h-6" /> GitHub
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-gray-500 to-gray-700 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="absolute inset-0 bg-white translate-y-0 group-hover:translate-y-full transition-transform duration-300" />
              </motion.a>

              <motion.a
                href="https://www.linkedin.com/in/deven-bagade-5b092b2b3"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-gray-600 to-gray-800 text-white rounded-xl font-bold shadow-lg hover:shadow-gray-500/30 transition-all duration-300 text-base md:text-lg"
              >
                <Linkedin className="w-5 h-5 md:w-6 md:h-6" /> LinkedIn
              </motion.a>

              <motion.a
                href="#contact"
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-3 px-8 py-4 border border-white/40 bg-white/10 backdrop-blur-sm text-white rounded-xl font-bold hover:bg-white/20 transition-all duration-300 text-base md:text-lg"
              >
                Hire Me <ArrowDown className="w-5 h-5 md:w-6 md:h-6 ml-1" />
              </motion.a>
            </div>
          </motion.div>

          {/* Orbital Timeline */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            className="relative w-full flex items-center justify-center"
            style={{ minHeight: '600px' }}
          >
            <RadialOrbitalTimeline />
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 cursor-pointer"
        animate={reduceMotion ? {} : { y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <span className="text-base font-mono uppercase tracking-wider text-white/70">Scroll</span>
        <ArrowDown className="w-6 h-6 text-white/70" />
      </motion.div>
    </section>
  );
}