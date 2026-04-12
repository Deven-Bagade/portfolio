import { useState, useEffect } from 'react';
import { Menu, X, Home } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function Navigation({ currentView, onBackToHome }: { currentView?: string; onBackToHome?: () => void }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);

  const isDetailView = currentView && currentView !== 'home';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const winScroll = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress((winScroll / height) * 100);

      const sections = ['home', 'about', 'skills', 'experience', 'projects', 'achievements', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Contact', href: '#contact' }
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@400;600;700;800&display=swap');
      `}</style>

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 font-['Syne',_sans-serif] ${
          isScrolled
            ? 'bg-black shadow-2xl border-b border-white/10'
            : 'bg-black'
        }`}
        style={{
          backgroundColor: isScrolled ? '#000000' : '#000000',
          backdropFilter: isScrolled ? 'blur(12px)' : 'none',
        }}
      >
        {/* Background overlay for better opacity when scrolled */}
        {!isScrolled && (
          <div 
            className="absolute inset-0 bg-black"
            style={{ opacity: 0.85 }}
          />
        )}
        
        {isScrolled && (
          <div 
            className="absolute inset-0 bg-black/95 backdrop-blur-xl"
          />
        )}

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <div className="flex items-center justify-between h-20 lg:h-24">
            {/* Logo */}
            <a
              href="#home"
              onClick={(e) => {
                if (isDetailView) {
                  e.preventDefault();
                  onBackToHome?.();
                } else {
                  handleNavClick(e, '#home');
                }
              }}
              className="relative group"
            >
              <div className="text-2xl lg:text-3xl font-black tracking-tight relative">
                <span className="relative z-10 text-white">
                  Deven Bagade
                </span>
                <span 
                  className="absolute -inset-1 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: 'linear-gradient(90deg, #ffffff, #666666)' }}
                />
              </div>
              <div 
                className="absolute -bottom-1 left-0 w-0 h-[2px] group-hover:w-full transition-all duration-500 ease-out"
                style={{ background: 'linear-gradient(90deg, #ffffff, #666666)' }}
              />
            </a>

            {/* Desktop Navigation */}
            {!isDetailView ? (
              <div className="hidden lg:flex items-center gap-3 xl:gap-4">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.href.substring(1);
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="relative group"
                    >
                      <div
                        className={`relative px-6 xl:px-7 py-3 rounded-full text-sm font-bold tracking-wider transition-all duration-300 ${
                          isActive
                            ? 'text-black'
                            : 'text-white/70 hover:text-white'
                        }`}
                        style={{
                          fontFamily: "'Space Mono', monospace",
                          letterSpacing: '0.1em'
                        }}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="activeNav"
                            className="absolute inset-0 rounded-full"
                            style={{ 
                              background: 'linear-gradient(135deg, #ffffff, #cccccc)',
                              boxShadow: '0 0 20px rgba(255,255,255,0.3)'
                            }}
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                          />
                        )}
                        <span className="relative z-10">{link.name}</span>
                        
                        <div 
                          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                          style={{ 
                            background: 'radial-gradient(circle at center, rgba(255,255,255,0.15) 0%, transparent 70%)',
                          }}
                        />
                      </div>
                    </a>
                  );
                })}
              </div>
            ) : (
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={onBackToHome}
                className="hidden lg:flex items-center gap-3 px-7 py-3 rounded-full text-sm font-bold tracking-wider transition-all duration-300"
                style={{
                  fontFamily: "'Space Mono', monospace",
                  background: '#ffffff1a',
                  border: '1px solid #ffffff33',
                  color: '#ffffff',
                  backdropFilter: 'blur(10px)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#ffffff33';
                  e.currentTarget.style.borderColor = '#ffffff66';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#ffffff1a';
                  e.currentTarget.style.borderColor = '#ffffff33';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <Home className="w-4 h-4" />
                <span>Back to Home</span>
              </motion.button>
            )}

            <div className="flex items-center gap-4">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-3 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: isScrolled ? '#ffffff1a' : '#ffffff0d',
                  border: isScrolled ? '1px solid #ffffff33' : '1px solid #ffffff1a',
                  color: '#ffffff'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#ffffff33';
                  e.currentTarget.style.borderColor = '#ffffff66';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = isScrolled ? '#ffffff1a' : '#ffffff0d';
                  e.currentTarget.style.borderColor = isScrolled ? '#ffffff33' : '#ffffff1a';
                }}
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Premium Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/5">
          <motion.div
            className="h-full relative"
            style={{ width: `${scrollProgress}%` }}
          >
            <div 
              className="absolute inset-0"
              style={{ background: 'linear-gradient(90deg, #ffffff, #999999, #ffffff)' }}
            />
       
            <motion.div
              className="absolute inset-0"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ background: 'linear-gradient(90deg, transparent, #ffffff, transparent)' }}
            />
          </motion.div>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop - Increased opacity */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 lg:hidden"
              style={{ 
                backgroundColor: '#000000',
                opacity: 0.95
              }}
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Panel - Solid background */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-24 right-6 left-6 z-40 lg:hidden overflow-hidden"
              style={{
                background: '#000000',
                border: '1px solid #ffffff26',
                borderRadius: '32px',
                boxShadow: '0 40px 80px -15px rgba(0,0,0,0.9), inset 0 1px 0 0 #ffffff1a',
              }}
            >
              {/* Top glow line */}
              <div 
                className="absolute top-0 left-0 w-full h-[1px]"
                style={{ background: 'linear-gradient(90deg, transparent, #ffffff4d, transparent)' }}
              />

              <div className="p-8 space-y-3">
                {navLinks.map((link, index) => {
                  const isActive = activeSection === link.href.substring(1);
                  return (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="block relative group"
                    >
                      <div
                        className={`relative px-6 py-5 rounded-xl transition-all duration-300 overflow-hidden ${
                          isActive
                            ? 'text-black'
                            : 'text-white/80 hover:text-white'
                        }`}
                        style={{
                          fontFamily: "'Space Mono', monospace",
                          fontWeight: 'bold',
                          letterSpacing: '0.1em',
                          fontSize: '1rem'
                        }}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="mobileActiveNav"
                            className="absolute inset-0 rounded-xl"
                            style={{ 
                              background: 'linear-gradient(135deg, #ffffff, #e0e0e0)',
                              boxShadow: '0 0 30px rgba(255,255,255,0.3)'
                            }}
                          />
                        )}
                        
                        <div 
                          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          style={{ background: '#ffffff1a' }}
                        />
                        
                        <span className="relative z-10 flex items-center gap-4">
                          <span 
                            className="text-white/40 text-sm min-w-[32px]"
                            style={{ fontFamily: "'Space Mono', monospace" }}
                          >
                            {(index + 1).toString().padStart(2, '0')}
                          </span>
                          {link.name}
                        </span>
                      </div>
                    </motion.a>
                  );
                })}
              </div>

              {/* Footer decoration */}
              <div className="px-8 pb-6">
                <div 
                  className="h-px w-full"
                  style={{ background: 'linear-gradient(90deg, transparent, #ffffff1a, transparent)' }}
                />
                <div className="flex justify-center mt-6">
                  <span 
                    className="text-white/30 text-xs tracking-widest"
                    style={{ fontFamily: "'Space Mono', monospace" }}
                  >
                    NAVIGATION
                  </span>
                </div>
              </div>

              {/* Decorative corner elements */}
              <div className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full opacity-30 blur-3xl" style={{ background: '#ffffff1a' }} />
              <div className="absolute -top-20 -left-20 w-40 h-40 rounded-full opacity-30 blur-3xl" style={{ background: '#ffffff1a' }} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}