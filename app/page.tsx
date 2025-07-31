'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/home/HeroSection';
import POISEOverview from '@/components/home/POISEOverview';
import AnnouncementsSection from '@/components/home/AnnouncementsSection';
import TemplatesSection from '@/components/home/TemplatesSection';
import CalendarSection from '@/components/home/CalendarSection';
import UpdatesSection from '@/components/home/UpdatesSection';
import StatsSection from '@/components/home/StatsSection';
import ProjectsSection from '@/components/home/ProjectsSection';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main>
        <HeroSection />
        <POISEOverview />
        <AnnouncementsSection />
        <TemplatesSection />
        <CalendarSection />
        <UpdatesSection />
        <StatsSection />
        <ProjectsSection />
      </main>
      <Footer />
    </div>
  );
}