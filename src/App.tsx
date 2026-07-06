import Hero from './components/Hero';
import Invitation from './components/Invitation';
import Location from './components/Location';
import Timeline from './components/Timeline';
import DressCode from './components/DressCode';
import Wishes from './components/Wishes';
import RSVP from './components/RSVP';
import Countdown from './components/Countdown';
import MusicPlayer from './components/MusicPlayer';
import { Heart } from 'lucide-react';
import { motion } from 'motion/react';

// Elegant, asymmetric wavy line divider mirroring the hand-drawn organic style of the hero wave but with completely different, slow, sweeping curves, keeping the layout perfectly clean without a heart
const SectionDivider = () => (
  <div className="w-full flex flex-col items-center py-6 sm:py-8 relative overflow-hidden select-none z-10">
    <svg className="w-full h-8 text-primary-accent/35" fill="none" viewBox="0 0 1440 32" preserveAspectRatio="none">
      <path d="M0,15 C300,35 600,-5 900,25 C1150,40 1300,10 1440,20" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  </div>
);

export default function App() {
  const scrollToRsvp = () => {
    const section = document.getElementById('rsvp-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="relative min-h-screen bg-warm-cream text-text-body selection:bg-light-pink selection:text-text-headings antialiased overflow-x-hidden">
      {/* Floating Ambient Music Controller */}
      <MusicPlayer />

      {/* 1. Hero Screen */}
      <Hero onRsvpClick={scrollToRsvp} />

      {/* 2. Invitation Message */}
      <Invitation onRsvpClick={scrollToRsvp} />
      <SectionDivider />

      {/* 3. Countdown Clock */}
      <Countdown />
      <SectionDivider />

      {/* 4. Wedding Schedule / Day TIMING */}
      <Timeline />
      <SectionDivider />

      {/* 5. Venue / LOCATION details & maps */}
      <Location />

      {/* 6. Dress Code requirements & clothing references (No divider in the lower sections) */}
      <DressCode />

      {/* 7. Gift Wishes / Interactive Envelope */}
      <Wishes />

      {/* 8. RSVP Attendance Form & Organizer Panel */}
      <RSVP />

      {/* Premium Footer */}
      <footer className="py-12 bg-warm-cream text-center border-t border-light-pink/20">
        <p className="font-script text-2xl text-primary-accent font-semibold mb-2">Сергей & Екатерина</p>
        <p className="text-[10px] tracking-[0.25em] text-text-secondary uppercase font-mono">💍 29 августа 2026 года • г. Рязань 💍</p>
        <p className="text-[9px] text-text-secondary/60 mt-6 tracking-wide">
          Создано с любовью. Все права защищены © 2026
        </p>
      </footer>
    </div>
  );
}
