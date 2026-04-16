import { useState } from 'react';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Achievements } from './components/Achievements';
import { Contact } from './components/Contact';
import { Navigation } from './components/Navigation';
import { ProjectDetail } from './components/ProjectDetail';
import { ExperienceDetail } from './components/ExperienceDetail';
import { AchievementDetail } from './components/AchievementDetail';
// import { ScrollProgress } from './components/ScrollProgress';
import { PageTransition } from './components/PageTransition';

export default function App() {
  const [currentView, setCurrentView] = useState<{
    type: 'home' | 'project' | 'experience' | 'achievement';
    id?: number;
  }>({ type: 'home' });

  const handleNavigateToDetail = (type: 'project' | 'experience' | 'achievement', id: number) => {
    setCurrentView({ type, id });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    setCurrentView({ type: 'home' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* THE SILVER BULLET FIX 
        This globally forces the HTML and Body to never exceed the physical screen width,
        permanently killing the mobile horizontal white-space bug.
      */}
      <style dangerouslySetInnerHTML={{__html: `
        html, body, #root {
          width: 100%;
          max-width: 100%;
          overflow-x: hidden !important;
          margin: 0;
          padding: 0;
          position: relative;
        }
      `}} />

      {/* Updated main wrapper to ensure strict 100% width constraint */}
      <main className="relative w-full max-w-full overflow-x-hidden bg-[#080808] text-white min-h-screen">      
        <Navigation currentView={currentView.type} onBackToHome={handleBackToHome} />
        {/* <ScrollProgress /> */}
        
        <PageTransition show={currentView.type === 'home'}>
          <Hero />
          <About />
          <Skills />
          <Experience onViewDetail={(id) => handleNavigateToDetail('experience', id)} />
          <Projects onViewDetail={(id) => handleNavigateToDetail('project', id)} />
          <Achievements onViewDetail={(id) => handleNavigateToDetail('achievement', id)} />
          <Contact />
        </PageTransition>

        <PageTransition show={currentView.type === 'project' && currentView.id !== undefined}>
          <ProjectDetail projectId={currentView.id || 0} onBack={handleBackToHome} />
        </PageTransition>

        <PageTransition show={currentView.type === 'experience' && currentView.id !== undefined}>
          <ExperienceDetail experienceId={currentView.id || 0} onBack={handleBackToHome} />
        </PageTransition>

        <PageTransition show={currentView.type === 'achievement' && currentView.id !== undefined}>
          <AchievementDetail achievementId={currentView.id || 0} onBack={handleBackToHome} />
        </PageTransition>
      </main>
    </>
  );
}