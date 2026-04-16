import { useEffect, useState, useRef } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { 
  Github, Linkedin, Mail, MapPin, Phone, ArrowDown, Sparkles, 
  Code, User, Clock, Zap, Link as LinkIcon, 
  ArrowRight, X, Brain, Server, Cloud, Layers 
} from 'lucide-react';

// --- 1. Premium Mini UI Components ---
const Badge = ({ children, className = "" }) => (
  <div className={`inline-flex items-center rounded-full px-3 py-1.5 text-sm font-black uppercase tracking-wider ${className}`} style={{ fontFamily: "'DM Mono', monospace" }}>
    {children}
  </div>
);

const Button = ({ children, className = "", onClick, onMouseEnter, onMouseLeave }) => (
  <button onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className={`inline-flex items-center justify-center rounded-lg transition-all duration-300 ${className}`} style={{ fontFamily: "'Outfit', sans-serif" }}>
    {children}
  </button>
);

const Card = ({ children, className = "", style = {} }) => (
  <div className={`relative rounded-2xl overflow-hidden ${className}`} style={{
    border: '1px solid #ffffff',
    background: 'rgba(10,10,10,0.92)',
    color: '#ffffff',
    boxShadow: '0 25px 50px rgba(0,0,0,0.8)',
    backdropFilter: 'blur(20px)',
    ...style
  }}>
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)' }}></div>
    <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)' }}></div>
    {children}
  </div>
);

const CardHeader = ({ children, className = "" }) => <div className={`flex flex-col space-y-1.5 p-6 pb-3 ${className}`}>{children}</div>;
const CardTitle = ({ children, className = "", style = {} }) => <h3 className={`text-xl font-bold leading-tight tracking-tight ${className}`} style={{ color: '#ffffff', fontFamily: "'Cormorant Garamond', serif", ...style }}>{children}</h3>;
const CardContent = ({ children, className = "" }) => <div className={`p-6 pt-2 ${className}`}>{children}</div>;

// --- 2. Timeline Data ---
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

// Easing function
function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// Shortest angular delta
function shortestAngleDelta(from, to) {
  let delta = ((to - from) % 360 + 360) % 360;
  if (delta > 180) delta -= 360;
  return delta;
}

// --- 3. The Core Orbital Component ---
function RadialOrbitalTimeline() {
  const [expandedItems, setExpandedItems] = useState({});
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isHoveringOrbit, setIsHoveringOrbit] = useState(false);
  const [hoveredNodeId, setHoveredNodeId] = useState(null);
  const [pulseEffect, setPulseEffect] = useState({});
  const [activeNodeId, setActiveNodeId] = useState(null);
  const [frozenAngles, setFrozenAngles] = useState({});
  
  const [orbitRadius, setOrbitRadius] = useState(150); 
  const [isMobileView, setIsMobileView] = useState(false);

  const rotationRef = useRef(0);
  const tweenRef = useRef(null);
  const autoSpinRef = useRef(null);
  const isTweeningRef = useRef(false);
  const containerRef = useRef(null);

  const TWEEN_DURATION = 700;

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
      
      if (window.innerWidth < 640) {
        setOrbitRadius(115); 
      } else if (window.innerWidth < 1024) {
        setOrbitRadius(140);
      } else {
        setOrbitRadius(160); 
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const syncAngle = (angle) => {
    rotationRef.current = ((angle % 360) + 360) % 360;
    setRotationAngle(rotationRef.current);
  };

  const getNodeAngle = (index) => {
    return ((index / timelineData.length) * 360 + rotationRef.current) % 360;
  };

  const tweenToAngle = (targetAngle) => {
    if (tweenRef.current) cancelAnimationFrame(tweenRef.current);
    if (autoSpinRef.current) cancelAnimationFrame(autoSpinRef.current);
    isTweeningRef.current = true;

    const startAngle = rotationRef.current;
    const delta = shortestAngleDelta(startAngle, targetAngle);
    const startTime = performance.now();

    const step = (now) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / TWEEN_DURATION, 1);
      const eased = easeInOutCubic(t);
      syncAngle(startAngle + delta * eased);

      if (t < 1) {
        tweenRef.current = requestAnimationFrame(step);
      } else {
        isTweeningRef.current = false;
        tweenRef.current = null;
      }
    };
    tweenRef.current = requestAnimationFrame(step);
  };

  const toggleItem = (id, e) => {
    e?.stopPropagation();
    setExpandedItems((prev) => {
      const isOpening = !prev[id];
      const newState = { [id]: isOpening };
      if (isOpening) {
        setActiveNodeId(id);
        setFrozenAngles({});
        const related = timelineData.find(item => item.id === id)?.relatedIds || [];
        const newPulse = {};
        related.forEach(relId => (newPulse[relId] = true));
        setPulseEffect(newPulse);
        const nodeIndex = timelineData.findIndex((item) => item.id === id);
        
        // Rotate the selected node to the bottom (270 degrees) so it looks great on desktop
        const targetAngle = 270 - (nodeIndex / timelineData.length) * 360;
        tweenToAngle(targetAngle);
      } else {
        setActiveNodeId(null);
        setPulseEffect({});
        isTweeningRef.current = false;
        if (tweenRef.current) { cancelAnimationFrame(tweenRef.current); tweenRef.current = null; }
      }
      return newState;
    });
  };

  const handleBackgroundClick = () => {
    setExpandedItems({});
    setActiveNodeId(null);
    setPulseEffect({});
    isTweeningRef.current = false;
    if (tweenRef.current) { cancelAnimationFrame(tweenRef.current); tweenRef.current = null; }
  };

  const shouldPause = isHoveringOrbit || hoveredNodeId !== null || activeNodeId !== null;

  useEffect(() => {
    if (shouldPause || isTweeningRef.current) return;
    let lastTime = null;
    const spin = (now) => {
      if (lastTime !== null) {
        const dt = now - lastTime;
        syncAngle(rotationRef.current + (dt * 0.004));
      }
      lastTime = now;
      autoSpinRef.current = requestAnimationFrame(spin);
    };
    autoSpinRef.current = requestAnimationFrame(spin);
    return () => {
      if (autoSpinRef.current) cancelAnimationFrame(autoSpinRef.current);
    };
  }, [shouldPause]);

  const handleNodeMouseEnter = (id) => {
    const index = timelineData.findIndex(i => i.id === id);
    const angle = getNodeAngle(index);
    setFrozenAngles(prev => ({ ...prev, [id]: angle }));
    setHoveredNodeId(id);
  };

  const handleNodeMouseLeave = (id) => {
    if (frozenAngles[id] !== undefined) {
      const index = timelineData.findIndex(i => i.id === id);
      const baseAngle = (index / timelineData.length) * 360;
      const correctedRotation = ((frozenAngles[id] - baseAngle) % 360 + 360) % 360;
      rotationRef.current = correctedRotation;
      setRotationAngle(correctedRotation);
    }
    setHoveredNodeId(null);
    setFrozenAngles(prev => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  let activeX = 0, activeY = 0;
  if (activeNodeId) {
    const activeIndex = timelineData.findIndex(i => i.id === activeNodeId);
    const angle = getNodeAngle(activeIndex);
    activeX = orbitRadius * Math.cos((angle * Math.PI) / 180);
    activeY = orbitRadius * Math.sin((angle * Math.PI) / 180);
  }

  // Active Item Helper for the Mobile Modal
  const activeItem = timelineData.find(item => item.id === activeNodeId);

  return (
    <div
      ref={containerRef}
      className="w-full relative overflow-visible flex items-center justify-center"
      style={{ height: orbitRadius * 3 + 40, minHeight: '500px' }}
      onClick={handleBackgroundClick}
      onMouseEnter={() => setIsHoveringOrbit(true)}
      onMouseLeave={() => {
        setIsHoveringOrbit(false);
        setHoveredNodeId(null);
      }}
    >
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 0, height: 0 }}>

        {/* Connection line SVG */}
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

        {/* Orbital Rings */}
        <div className="transition-all duration-300" style={{
          position: 'absolute', width: orbitRadius * 1.3, height: orbitRadius * 1.3, top: -(orbitRadius * 0.65), left: -(orbitRadius * 0.65),
          borderRadius: '50%', border: '1px dashed rgba(156,163,175,0.3)', pointerEvents: 'none',
        }}></div>
        <div className="transition-all duration-300" style={{
          position: 'absolute', width: orbitRadius * 2, height: orbitRadius * 2, top: -orbitRadius, left: -orbitRadius,
          borderRadius: '50%', border: '1px solid rgba(156,163,175,0.2)', pointerEvents: 'none',
        }}></div>
        <div className="transition-all duration-300" style={{
          position: 'absolute', width: orbitRadius * 2.8, height: orbitRadius * 2.8, top: -(orbitRadius * 1.4), left: -(orbitRadius * 1.4),
          borderRadius: '50%', border: '1px solid rgba(156,163,175,0.12)', pointerEvents: 'none',
        }}></div>

        {/* Central Core */}
        <div style={{
          position: 'absolute', width: 48, height: 48, top: 0, left: 0,
          transform: 'translate(-50%, -50%)', borderRadius: '50%',
          background: 'linear-gradient(135deg, #6b7280, #374151)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 0 30px rgba(128,128,128,0.5)', cursor: 'pointer',
        }}>
          <div style={{ width: 16, height: 16, borderRadius: '50%', background: '#ffffff', boxShadow: '0 0 15px rgba(255,255,255,0.8)' }}></div>
        </div>

        {/* Orbiting Nodes */}
        {timelineData.map((item, index) => {
          const angle = (hoveredNodeId === item.id && frozenAngles[item.id] !== undefined)
            ? frozenAngles[item.id] : getNodeAngle(index);

          const radian = (angle * Math.PI) / 180;
          const x = orbitRadius * Math.cos(radian);
          const y = orbitRadius * Math.sin(radian);

          const isExpanded = expandedItems[item.id];
          const isRelated = activeNodeId && timelineData.find(i => i.id === activeNodeId)?.relatedIds.includes(item.id);
          const isPulsing = pulseEffect[item.id];
          const isHovered = hoveredNodeId === item.id;
          const Icon = item.icon;

          let nodeBg, nodeBorder, nodeColor, nodeBoxShadow;
          if (isExpanded) {
            nodeBg = '#ffffff'; nodeBorder = '#ffffff'; nodeColor = '#000000'; nodeBoxShadow = '0 0 25px rgba(255,255,255,0.5)';
          } else if (isHovered) {
            nodeBg = 'rgba(107,114,128,0.4)'; nodeBorder = '#d1d5db'; nodeColor = '#ffffff'; nodeBoxShadow = '0 0 20px rgba(128,128,128,0.4)';
          } else if (isRelated) {
            nodeBg = 'rgba(107,114,128,0.4)'; nodeBorder = '#d1d5db'; nodeColor = '#ffffff'; nodeBoxShadow = 'none';
          } else {
            nodeBg = 'rgba(10,10,10,0.8)'; nodeBorder = 'rgba(255,255,255,0.3)'; nodeColor = '#ffffff'; nodeBoxShadow = 'none';
          }

          return (
            <div
              key={item.id}
              className="absolute flex flex-col items-center justify-center"
              style={{
                left: x, top: y, transform: 'translate(-50%, -50%)',
                zIndex: isExpanded ? 100 : (isHovered ? 60 : 30),
              }}
            >
              <AnimatePresence>
                {(isPulsing || isHovered) && (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0.6 }}
                    animate={{ scale: 1.4, opacity: 0 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: 1, repeat: Infinity }}
                    style={{
                      position: 'absolute', borderRadius: '50%', pointerEvents: 'none',
                      background: 'radial-gradient(circle, rgba(128,128,128,0.4) 0%, transparent 70%)',
                      width: item.energy + 40, height: item.energy + 40, top: '50%', left: '50%',
                      transform: 'translate(-50%, -50%)',
                    }}
                  />
                )}
              </AnimatePresence>

              <motion.button
                style={{
                  position: 'relative', width: 48, height: 48, borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: `2px solid ${nodeBorder}`, background: nodeBg, color: nodeColor,
                  boxShadow: nodeBoxShadow, cursor: 'pointer', outline: 'none',
                  transition: 'background 0.3s, border-color 0.3s, box-shadow 0.3s',
                }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => toggleItem(item.id, e)}
                onMouseEnter={() => handleNodeMouseEnter(item.id)}
                onMouseLeave={() => handleNodeMouseLeave(item.id)}
              >
                <Icon size={22} strokeWidth={isExpanded ? 2.5 : 2} />
              </motion.button>

              <motion.div
                style={{
                  position: 'absolute', top: 50, padding: '6px 12px', borderRadius: 9999,
                  border: '1px solid rgba(255,255,255,0.3)', backdropFilter: 'blur(8px)',
                  whiteSpace: 'nowrap', fontFamily: "'DM Mono', monospace", fontWeight: 700,
                  letterSpacing: '0.1em', fontSize: '0.875rem', pointerEvents: 'none',
                  background: isExpanded || isHovered ? 'rgba(255,255,255,0.15)' : 'rgba(10,10,10,0.8)',
                  color: '#ffffff',
                }}
                animate={{ opacity: 1 }}
              >
                {item.title}
              </motion.div>

              {/* DESKTOP ONLY: Dropdown style popup */}
              <AnimatePresence>
                {!isMobileView && isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, x: '-50%', scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, x: '-50%', scale: 1 }}
                    exit={{ opacity: 0, y: 10, x: '-50%', scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      position: 'absolute', top: '100%', left: '50%',
                      marginTop: '20px', width: '360px', zIndex: 200,
                    }}
                  >
                    <div style={{
                      position: 'absolute', top: -8, left: '50%', transform: 'translateX(-50%)',
                      width: 2, height: 8, background: 'linear-gradient(to top, rgba(255,255,255,0.5), transparent)',
                    }}></div>

                    <Card style={{ borderColor: 'rgba(255,255,255,0.4)' , marginTop: '20px'}}>
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleItem(item.id, e); }}
                        style={{
                          position: 'absolute', top: 16, right: 16, color: 'rgba(255,255,255,0.7)',
                          background: 'transparent', border: 'none', cursor: 'pointer', zIndex: 10,
                          padding: 4, borderRadius: '50%', transition: 'color 0.2s, background 0.2s',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.color = '#ffffff'; e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
                        onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; e.currentTarget.style.background = 'transparent'; }}
                      >
                        <X size={18} />
                      </button>

                      <CardHeader>
                        <CardTitle style={{ paddingTop: 4 }}>{item.title}</CardTitle>
                      </CardHeader>
                      <hr style={{ borderColor: '#ffffff', margin: '0 24px' }} />

                      <CardContent>
                        <p style={{ fontSize: '1rem', color: '#ffffff', lineHeight: 1.6, fontWeight: 500, fontFamily: "'Outfit', sans-serif" }}>
                          {item.content}
                        </p>

                        {item.relatedIds.length > 0 && (
                          <div style={{ marginTop: 20, paddingTop: 12, borderTop: '1px solid #ffffff' }}>
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
                              <LinkIcon size={14} style={{ color: '#ffffff', marginRight: 8 }} />
                              <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, color: 'rgba(255,255,255,0.8)', fontFamily: "'DM Mono', monospace" }}>
                                Connected Skills
                              </h4>
                            </div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                              {item.relatedIds.map((relId) => {
                                const relItem = timelineData.find((i) => i.id === relId);
                                return (
                                  <button
                                    key={relId}
                                    onClick={(e) => { e.stopPropagation(); toggleItem(relId, e); }}
                                    style={{
                                      height: 32, padding: '0 12px', border: '1px solid rgba(255,255,255,0.3)',
                                      background: 'rgba(255,255,255,0.1)', color: '#ffffff', fontSize: '0.875rem',
                                      fontFamily: "'DM Mono', monospace", borderRadius: 8, cursor: 'pointer',
                                      display: 'inline-flex', alignItems: 'center', transition: 'background 0.2s, border-color 0.2s',
                                    }}
                                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(107,114,128,0.3)'; e.currentTarget.style.borderColor = 'rgba(156,163,175,0.6)'; }}
                                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; }}
                                  >
                                    {relItem?.title}
                                    <ArrowRight size={12} style={{ marginLeft: 6, opacity: 0.5 }} />
                                  </button>
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

      {/* MOBILE ONLY: Screen-Centered Modal placed completely outside the transformed nodes */}
      <AnimatePresence>
        {isMobileView && activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
          >
            {/* Backdrop that closes the modal on click */}
            <div 
              className="absolute inset-0 bg-black/80"
              onClick={(e) => toggleItem(activeItem.id, e)}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative z-10 w-full max-w-[340px]"
            >
              <Card style={{ borderColor: 'rgba(255,255,255,0.4)', boxShadow: '0 30px 60px rgba(0,0,0,0.9)' }}>
                <button
                  onClick={(e) => { e.stopPropagation(); toggleItem(activeItem.id, e); }}
                  style={{
                    position: 'absolute', top: 16, right: 16, color: 'rgba(255,255,255,0.7)',
                    background: 'transparent', border: 'none', cursor: 'pointer', zIndex: 10,
                    padding: 4, borderRadius: '50%', transition: 'color 0.2s, background 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#ffffff'; e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; e.currentTarget.style.background = 'transparent'; }}
                >
                  <X size={18} />
                </button>

                <CardHeader>
                  <CardTitle style={{ paddingTop: 4 }}>{activeItem.title}</CardTitle>
                </CardHeader>
                <hr style={{ borderColor: '#ffffff', margin: '0 24px' }} />

                <CardContent>
                  <p style={{ fontSize: '0.95rem', color: '#ffffff', lineHeight: 1.6, fontWeight: 500, fontFamily: "'Outfit', sans-serif" }}>
                    {activeItem.content}
                  </p>

                  {activeItem.relatedIds.length > 0 && (
                    <div style={{ marginTop: 20, paddingTop: 12, borderTop: '1px solid #ffffff' }}>
                      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
                        <LinkIcon size={14} style={{ color: '#ffffff', marginRight: 8 }} />
                        <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, color: 'rgba(255,255,255,0.8)', fontFamily: "'DM Mono', monospace" }}>
                          Connected Skills
                        </h4>
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                        {activeItem.relatedIds.map((relId) => {
                          const relItem = timelineData.find((i) => i.id === relId);
                          return (
                            <button
                              key={relId}
                              onClick={(e) => { e.stopPropagation(); toggleItem(relId, e); }}
                              style={{
                                height: 32, padding: '0 12px', border: '1px solid rgba(255,255,255,0.3)',
                                background: 'rgba(255,255,255,0.1)', color: '#ffffff', fontSize: '0.875rem',
                                fontFamily: "'DM Mono', monospace", borderRadius: 8, cursor: 'pointer',
                                display: 'inline-flex', alignItems: 'center', transition: 'background 0.2s, border-color 0.2s',
                              }}
                              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(107,114,128,0.3)'; e.currentTarget.style.borderColor = 'rgba(156,163,175,0.6)'; }}
                              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; }}
                            >
                              {relItem?.title}
                              <ArrowRight size={12} style={{ marginLeft: 6, opacity: 0.5 }} />
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

// --- 4. Main Hero Wrapper ---
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
      className="relative min-h-screen overflow-x-hidden py-24 px-6 md:px-12 flex flex-col justify-center"
      style={{ background: '#0a0a0a', fontFamily: "'Outfit', sans-serif" }}
    >
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=Outfit:wght@100..900&display=swap" />

      {/* Background Effects */}
      <div className="pointer-events-none absolute inset-0 z-0" style={{
        backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(128,128,128,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(64,64,64,0.06) 0%, transparent 50%)'
      }} />
      <div className="pointer-events-none absolute inset-0 z-0" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }} />

      {/* Animated Gradient Orbs */}
      {!reduceMotion && (
        <>
          <motion.div
            className="pointer-events-none absolute rounded-full blur-3xl hidden md:block"
            animate={{ x: mousePosition.x * 0.02, y: mousePosition.y * 0.02 }}
            style={{ left: '10%', top: '20%', width: '40%', height: '40%', background: 'radial-gradient(circle, rgba(128,128,128,0.1) 0%, transparent 70%)' }}
          />
          <motion.div
            className="pointer-events-none absolute rounded-full blur-3xl hidden md:block"
            animate={{ x: mousePosition.x * -0.01, y: mousePosition.y * -0.01 }}
            style={{ right: '10%', bottom: '10%', width: '35%', height: '35%', background: 'radial-gradient(circle, rgba(64,64,64,0.08) 0%, transparent 70%)' }}
          />
        </>
      )}

      <div className="relative z-10 mx-auto max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center my-auto">

        {/* LEFT COLUMN: Text and Buttons */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="flex flex-col items-center lg:items-start text-center lg:text-left z-20 w-full"
        >
          {/* Available badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px', marginBottom: 32,
            borderRadius: 9999, border: '1px solid rgba(156,163,175,0.3)', background: 'rgba(156,163,175,0.1)', backdropFilter: 'blur(8px)',
          }}>
            <span style={{ position: 'relative', display: 'flex', width: 10, height: 10 }}>
              <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#9ca3af', animation: 'ping 1s cubic-bezier(0,0,0.2,1) infinite', opacity: 0.75 }} />
              <span style={{ position: 'relative', display: 'inline-flex', width: 10, height: 10, borderRadius: '50%', background: '#9ca3af' }} />
            </span>
            <span style={{ fontSize: '0.875rem', fontFamily: "'DM Mono', monospace", color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              <Sparkles style={{ display: 'inline', width: 16, height: 16, marginRight: 6, color: '#67e8f9', verticalAlign: 'middle' }} />
              Available for opportunities
            </span>
          </div>

          {/* Name Heading */}
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(3.5rem, 8vw, 7rem)', fontWeight: 900, letterSpacing: '-0.04em', marginBottom: 16, lineHeight: 1.1 }}>
            <span style={{ background: 'linear-gradient(90deg, #d1d5db, #ffffff, #6b7280)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Deven Bagade
            </span>
          </h1>

          {/* Animated Title Heading */}
          <div style={{ height: 60, marginBottom: 16 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTitle}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 600, color: '#ffffff' }}
              >
                {titles[currentTitle]}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bio paragraph */}
          <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(1rem, 1.5vw, 1.125rem)', color: 'rgba(255,255,255,0.8)', maxWidth: 560, marginBottom: 32, lineHeight: 1.6 }}>
            B.Tech IT student with <span style={{ color: '#d1d5db', fontWeight: 600 }}>9.65 CGPA</span>, passionate about building scalable web and mobile applications that solve real-world problems through innovative technology solutions.
          </p>

          {/* Contact Info Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', lg: 'justify-start', gap: 12, marginBottom: 32 }}>
            {[
              { href: 'tel:+918369183414', icon: Phone, label: '+91 8369183414' },
              { href: 'mailto:devenbofficial@gmail.com', icon: Mail, label: 'Email Me' },
            ].map(({ href, icon: Icon, label }) => (
              <a
                key={label} href={href}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8, padding: '10px 20px', borderRadius: 12,
                  border: '1px solid #ffffff', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)',
                  color: '#ffffff', textDecoration: 'none', fontFamily: "'DM Mono', monospace", fontSize: '0.85rem',
                  transition: 'border-color 0.3s, background 0.3s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(156,163,175,0.6)'; e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#ffffff'; e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
              >
                <Icon style={{ width: 18, height: 18, color: '#d1d5db' }} /> {label}
              </a>
            ))}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8, padding: '10px 20px', borderRadius: 12,
              border: '1px solid #ffffff', background: 'rgba(255,255,255,0.1)', color: '#ffffff',
              fontFamily: "'DM Mono', monospace", fontSize: '0.85rem',
            }}>
              <MapPin style={{ width: 18, height: 18, color: '#d1d5db' }} /> Kalyan, MH
            </div>
          </div>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', lg: 'justify-start', gap: 16 }}>
            <motion.a
              href="https://github.com/Deven-Bagade" target="_blank" rel="noopener noreferrer"
              whileHover={{ y: -3, scale: 1.02 }} whileTap={{ scale: 0.98 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', background: '#ffffff',
                color: '#000000', borderRadius: 12, fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: '0.95rem',
                textDecoration: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
              }}
            >
              <Github style={{ width: 20, height: 20 }} /> GitHub
            </motion.a>

            <motion.a
              href="https://www.linkedin.com/in/deven-bagade-5b092b2b3" target="_blank" rel="noopener noreferrer"
              whileHover={{ y: -3, scale: 1.02 }} whileTap={{ scale: 0.98 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', background: 'linear-gradient(135deg, #4b5563, #1f2937)',
                color: '#ffffff', borderRadius: 12, fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: '0.95rem',
                textDecoration: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
              }}
            >
              <Linkedin style={{ width: 20, height: 20 }} /> LinkedIn
            </motion.a>

            <motion.a
              href="#contact" whileHover={{ y: -3, scale: 1.02 }} whileTap={{ scale: 0.98 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', border: '1px solid rgba(255,255,255,0.4)',
                background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)', color: '#ffffff', borderRadius: 12,
                fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: '0.95rem', textDecoration: 'none', transition: 'background 0.3s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.2)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
            >
              Hire Me <ArrowDown style={{ width: 20, height: 20 }} />
            </motion.a>
          </div>
        </motion.div>

        {/* RIGHT COLUMN: Orbital Timeline */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          className="flex items-center justify-center min-h-[460px] lg:min-h-[560px] z-10 mt-12 lg:mt-0 relative w-full"
        >
          <RadialOrbitalTimeline />
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        style={{
          position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 10,
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, cursor: 'pointer',
        }}
        animate={reduceMotion ? {} : { y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <span style={{ fontSize: '0.75rem', fontFamily: "'Outfit', sans-serif", textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.7)' }}>Scroll</span>
        <ArrowDown style={{ width: 20, height: 20, color: 'rgba(255,255,255,0.7)' }} />
      </motion.div>
    </section>
  );
}