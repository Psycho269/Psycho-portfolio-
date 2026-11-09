import IntroOverlay from '@/components/IntroOverlay';
import SmoothScroll from '@/components/SmoothScroll';
import RevealOnScroll from '@/components/RevealOnScroll';
import SceneScroll from '@/components/SceneScroll';
import Navbar from '@/components/Navbar';
import ReelSection from '@/components/ReelSection';
import TimelineSection from '@/components/TimelineSection';
import ProjectsSection from '@/components/ProjectsSection';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import { briefMailto } from '@/lib/site';

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <RevealOnScroll />
      <SceneScroll />
      <IntroOverlay />
      <div id="top" />
      <Navbar ctaHref={briefMailto()} />
      <main>
        <ReelSection />
        <TimelineSection />
        <ProjectsSection />
        <AboutSection />
        <ContactSection />
      </main>
    </>
  );
}
