import { motion } from 'motion/react';
import { Heart } from 'lucide-react';

interface InvitationProps {
  onRsvpClick: () => void;
}

export default function Invitation({ onRsvpClick }: InvitationProps) {
  return (
    <section className="relative py-12 px-4 flex flex-col items-center justify-center bg-secondary-bg overflow-hidden text-center border-b border-light-pink/20">
      <div className="max-w-2xl mx-auto space-y-4 relative z-10 flex flex-col items-center">
        
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.1 }}
          className="space-y-2"
        >
          <h2 className="text-3xl sm:text-4xl font-script text-primary-accent font-normal leading-[1.4] mb-2">
            Дорогие друзья!
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="text-text-body text-base sm:text-lg leading-relaxed font-light max-w-lg mx-auto space-y-3"
        >
          <p>
            Мы счастливы пригласить вас разделить с нами этот особенный, теплый и важный день нашей жизни — день нашей свадьбы.
          </p>

          <p className="font-script text-2xl sm:text-3xl text-primary-accent font-normal pt-1">
            Будем рады видеть вас!
          </p>
        </motion.div>

        {/* COMPACT CALENDAR INSERTION (last 2 weeks of August) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="w-full max-w-[280px] mx-auto bg-warm-cream rounded-2xl p-3.5 shadow-sm border border-light-pink/30 relative paper-texture mt-2"
        >
          {/* Calendar month title */}
          <div className="text-center mb-2">
            <p className="font-handwritten text-xl text-primary-accent font-normal tracking-wide">Август 2026</p>
          </div>

          {/* Weekday headers */}
          <div className="grid grid-cols-7 gap-y-1 mb-1 text-center">
            {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"].map((wd, index) => (
              <span 
                key={wd} 
                className={`text-[9px] uppercase tracking-wider font-semibold ${
                  index >= 5 ? 'text-primary-accent' : 'text-text-secondary'
                }`}
              >
                {wd}
              </span>
            ))}
          </div>

          {/* Compact Grid with 1 week */}
          <div className="grid grid-cols-7 gap-y-1.5 gap-x-1 text-center font-sans text-xs relative">
            {/* Week of the wedding: Aug 24 to 30 */}
            {[24, 25, 26, 27, 28, 29, 30].map((day, idx) => {
              const isTargetDay = day === 29;
              const isWeekend = idx >= 5;
              return (
                <div key={day} className="aspect-square flex items-center justify-center relative select-none">
                  {isTargetDay ? (
                    <div className="relative w-6 h-6 flex items-center justify-center rounded-full text-primary-accent font-bold z-10">
                      <span className="text-[11px]">{day}</span>
                      {/* Custom irregular hand-sketched circle SVG */}
                      <svg 
                        className="absolute inset-0 w-8 h-8 -left-1 -top-1 pointer-events-none stroke-primary-accent" 
                        viewBox="0 0 44 44" 
                        fill="none"
                      >
                        <motion.path
                          initial={{ pathLength: 0, rotate: -10 }}
                          whileInView={{ pathLength: 1, rotate: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.4, duration: 1, ease: "easeInOut" }}
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          d="M 22, 2
                             C 34, 2 42, 10 42, 22
                             C 42, 34 34, 42 22, 42
                             C 10, 42 2, 34 2, 22
                             C 2, 10 10, 2 21, 2"
                        />
                      </svg>
                      
                      {/* Tiny floating decorative heart */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0, y: 2 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.9, duration: 0.3, type: 'spring' }}
                        className="absolute -top-0.5 -right-0.5 z-20 text-primary-accent fill-primary-accent"
                      >
                        <Heart size={7} className="transform rotate-12" />
                      </motion.div>
                    </div>
                  ) : (
                    <span className={`text-[11px] ${
                      isWeekend ? 'text-primary-accent font-medium' : 'text-text-body'
                    }`}>
                      {day}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Small cursive label saying "сохраняйте дату" */}
          <div className="flex justify-end mt-1 pr-1 select-none">
            <motion.p
              initial={{ opacity: 0, rotate: -8, x: 5 }}
              whileInView={{ opacity: 0.8, rotate: -8, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="font-script text-[13px] text-primary-accent"
            >
              сохраняйте дату 💍
            </motion.p>
          </div>
        </motion.div>

        {/* Action RSVP button directly below calendar */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="pt-6 pb-2"
        >
          <button
            onClick={onRsvpClick}
            className="px-8 py-3.5 rounded-full bg-primary-accent hover:bg-primary-accent/90 text-warm-cream font-medium text-xs tracking-[0.2em] uppercase shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 cursor-pointer active:scale-95"
          >
            Подтвердить присутствие
          </button>
        </motion.div>
        
      </div>
    </section>
  );
}
