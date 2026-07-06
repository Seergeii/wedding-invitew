import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Hourglass } from 'lucide-react';

export default function Countdown() {
  const targetDate = new Date('2026-08-29T16:00:00+03:00').getTime(); // 16:00 Moscow Time on Aug 29, 2026

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isOver: false
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isOver: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isOver: false });
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const timeBlocks = [
    { label: 'дней', value: timeLeft.days, key: 'days' },
    { label: 'часов', value: timeLeft.hours, key: 'hours' },
    { label: 'минут', value: timeLeft.minutes, key: 'minutes' },
    { label: 'секунд', value: timeLeft.seconds, key: 'seconds' }
  ];

  return (
    <section className="relative py-8 px-4 bg-warm-cream overflow-hidden flex flex-col items-center">
      <div className="w-full max-w-2xl text-center space-y-4 relative z-10">
        
        {/* Title */}
        <div className="space-y-2 mb-4">
          <p className="font-script text-3xl sm:text-4xl text-primary-accent font-normal leading-[1.4]">
            До торжества осталось
          </p>
        </div>

        {timeLeft.isOver ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="font-script text-3xl md:text-4xl text-primary-accent font-semibold"
          >
            Этот счастливый день настал! 🎉
          </motion.div>
        ) : (
          /* Grid of beautiful countdown blocks */
          <div className="grid grid-cols-4 gap-3 sm:gap-6 max-w-lg mx-auto">
            {timeBlocks.map((block) => (
              <motion.div
                key={block.key}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, type: 'spring' }}
                className="bg-secondary-bg rounded-2xl p-3 sm:p-5 shadow-md border border-light-pink/30 flex flex-col items-center justify-center relative paper-texture overflow-hidden"
              >
                {/* Subtle top decoration line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-light-pink via-primary-accent to-light-pink" />
                
                {/* Roll number value effect with Key changes */}
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={block.value}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="text-2xl sm:text-4xl font-light text-text-headings tracking-tight font-sans"
                  >
                    {block.value.toString().padStart(2, '0')}
                  </motion.span>
                </AnimatePresence>

                <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-text-secondary font-semibold mt-1">
                  {block.label}
                </span>
              </motion.div>
            ))}
          </div>
        )}


      </div>
    </section>
  );
}
