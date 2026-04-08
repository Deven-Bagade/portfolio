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
import { ScrollProgress } from './components/ScrollProgress';
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
    <div className="min-h-screen bg-white">
      
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
    </div>
  );
}
