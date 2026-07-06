import { useState } from 'react';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';
import defaultChildhood from './childhood_combined.png';

interface HeroProps {
  onRsvpClick: () => void;
}

export default function Hero({ onRsvpClick }: HeroProps) {
  // Use the local imported childhood image as default, fallback to localStorage if available
  const [childhoodImg] = useState(() => {
    return localStorage.getItem('wedding_childhood_combined') || defaultChildhood;
  });

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-between pt-10 sm:pt-16 pb-0 px-0 overflow-hidden bg-warm-cream paper-texture">
      {/* 1. Thin decorative top line with fixed heart - Smooth asymmetric wave */}
      <div className="absolute top-10 sm:top-12 left-0 right-0 flex flex-col items-center pointer-events-none z-10">
        <svg className="w-full h-10 text-primary-accent/40" fill="none" viewBox="0 0 1440 40" preserveAspectRatio="none">
          <path d="M0,12 C120,4 240,28 380,24 C520,20 620,2 780,14 C940,26 1100,6 1240,22 C1340,34 1400,16 1440,26" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
        <div className="absolute top-3 cursor-pointer pointer-events-auto" title="С любовью">
          <div className="flex flex-col items-center">
            <div className="w-7 h-7 rounded-full bg-light-pink flex items-center justify-center border border-primary-accent shadow-sm">
              <Heart size={14} className="text-primary-accent fill-primary-accent" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="w-full max-w-4xl flex-grow flex flex-col items-center justify-between gap-4 sm:gap-6 mt-12 sm:mt-16 z-10 pb-0 px-4">
        
        {/* Header Text Block */}
        <div 
          className="text-center space-y-1 sm:space-y-2 pt-2 sm:pt-4 cursor-default select-none group"
        >
          <motion.p
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="font-script text-2xl sm:text-4xl text-text-headings tracking-widest lowercase mb-0"
          >
            наконец-то
          </motion.p>
          
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            className="font-handwritten text-3xl xs:text-4xl sm:text-6xl md:text-7xl text-primary-accent uppercase leading-none font-light tracking-wide italic inline-block transform -skew-x-12 whitespace-nowrap"
          >
            мы женимся
          </motion.h1>
        </div>

        {/* 2. Dialog bubbles & single Childhood photo */}
        <div className="relative w-full max-w-2xl mx-auto pt-1 pb-0 flex flex-col items-center flex-grow justify-end">
          
          {/* Quotes Over Photos: Styled like organic handwritten text directly on the page */}
          <div className="flex justify-between items-end text-[13px] xs:text-[15px] sm:text-lg md:text-xl lg:text-2xl font-script text-text-headings leading-snug mb-2 sm:mb-4 w-full px-4 select-none">
            <motion.div
              initial={{ opacity: 0, rotate: -2, x: -10 }}
              animate={{ opacity: 1, rotate: -2, x: 0 }}
              transition={{ duration: 1.2, delay: 1 }}
              className="text-left max-w-[62%] font-semibold text-primary-accent"
            >
              <span className="block whitespace-nowrap">Катя: интересно, кто будет</span>
              <span className="block whitespace-nowrap">моим мужем, когда вырасту?</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, rotate: 2, x: 10 }}
              animate={{ opacity: 1, rotate: 2, x: 0 }}
              transition={{ duration: 1.2, delay: 1.2 }}
              className="text-right max-w-[38%] text-text-headings font-semibold whitespace-nowrap pb-[2px] sm:pb-[3px]"
            >
              Сережа: им буду я!
            </motion.div>
          </div>

          {/* Single Childhood Photo Wrapper - Large, centered vertical photo directly resting above the footer boundary */}
          <div className="w-full flex items-end justify-center relative z-0 mb-0 pb-0 max-w-lg sm:max-w-xl px-4 min-h-[350px] sm:min-h-[400px]">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, ease: "easeOut", delay: 0.5 }}
              className="relative w-full flex items-end justify-center pb-0 mb-0 overflow-visible bg-transparent h-[60vh] xs:h-[63vh] sm:h-[68vh] md:h-[72vh] lg:h-[76vh] xl:h-[80vh]"
            >
              <img
                src={childhoodImg}
                alt="Катя и Сережа в детстве"
                className="max-w-full max-h-full object-contain filter sepia-[0.08] saturate-[0.98] transition-all duration-300 z-0 drop-shadow-lg"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = defaultChildhood;
                }}
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Wide Marquee Ribbon placed at the ABSOLUTE BOTTOM of Slide 1 (boundary of Slides 1 & 2) */}
      <motion.div
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: 1, scaleY: 1 }}
        transition={{ duration: 1.2, delay: 0.8 }}
        className="w-full overflow-hidden z-10 select-none pb-0 mb-0 mt-auto"
      >
        <div className="bg-primary-accent shadow-md py-1.5 sm:py-2 px-4 flex items-center justify-center min-w-[120vw] -ml-[10vw]">
          <p className="font-script text-warm-cream text-[11px] xs:text-[13px] sm:text-sm tracking-[0.15em] whitespace-nowrap animate-marquee">
            мы вас очень ждем • 29 августа 2026 • до встречи на свадьбе • мы вас очень ждем • 29 августа 2026 • до встречи на свадьбе • мы вас очень ждем • 29 августа 2026 • до встречи на свадьбе • мы вас очень ждем
          </p>
        </div>
      </motion.div>
    </section>
  );
}
