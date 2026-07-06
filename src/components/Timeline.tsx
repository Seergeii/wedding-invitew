import { ReactNode } from 'react';
import { motion } from 'motion/react';
import { Users, Sparkles, Heart, Utensils, Music } from 'lucide-react';

interface TimelineItem {
  time: string;
  title: string;
  icon: ReactNode;
}

export default function Timeline() {
  const events: TimelineItem[] = [
    {
      time: "16:00",
      title: "Сбор гостей & Welcome",
      icon: <Sparkles size={16} />
    },
    {
      time: "16:30",
      title: "Свадебная церемония",
      icon: <Heart size={16} className="text-primary-accent fill-light-pink" />
    },
    {
      time: "17:00",
      title: "Праздничный ужин",
      icon: <Utensils size={16} />
    },
    {
      time: "23:00",
      title: "Финал вечера",
      icon: <Music size={16} />
    }
  ];

  return (
    <section className="relative py-8 px-4 bg-secondary-bg overflow-hidden flex flex-col items-center">
      {/* Background soft pastel radial glows */}
      <div className="absolute top-1/4 right-0 w-80 h-80 rounded-full bg-warm-cream/20 blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 rounded-full bg-light-pink/15 blur-3xl" />

      <div className="w-full max-w-3xl relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-2 mb-6">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-script text-text-headings font-normal leading-[1.4]">
            Тайминг праздника
          </h2>
        </div>

        {/* Vertical Timeline Track */}
        <div className="relative mt-6 pl-4 sm:pl-0">
          
          {/* Stem Line - drawn as user scrolls */}
          <div className="absolute left-5 sm:left-1/2 top-2 bottom-2 w-[1.5px] bg-light-pink/50 -translate-x-1/2" />

          {/* Staggered Timeline Cards */}
          <div className="space-y-6 relative">
            {events.map((evt, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div 
                  key={idx} 
                  className={`flex flex-col sm:flex-row items-start sm:items-center relative ${
                    isEven ? 'sm:flex-row' : 'sm:flex-row-reverse'
                  }`}
                >
                  
                  {/* Event Content Block */}
                  <motion.div
                    initial={{ opacity: 0, y: 30, scale: 0.98 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
                    className={`w-full sm:w-[45%] pl-10 sm:pl-0 ${
                      isEven ? 'sm:text-right sm:pr-6' : 'sm:text-left sm:pl-6'
                    }`}
                  >
                    <div className="bg-warm-cream/80 backdrop-blur-sm p-4 sm:p-5 rounded-2xl border border-light-pink/25 shadow-sm hover:shadow-md hover:border-light-pink/50 transition-all duration-300">
                      <span className="inline-block text-xs uppercase tracking-[0.2em] text-primary-accent font-semibold mb-0.5">
                        {evt.time}
                      </span>
                      <h3 className="text-base sm:text-lg font-medium text-text-headings">
                        {evt.title}
                      </h3>
                    </div>
                  </motion.div>

                  {/* Bullet Hub / Icon Spot */}
                  <div className="absolute left-5 sm:left-1/2 -translate-x-1/2 flex items-center justify-center z-10">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", stiffness: 150, delay: 0.3 }}
                      className="w-8 h-8 rounded-full bg-warm-cream border-2 border-light-pink flex items-center justify-center text-text-body shadow-sm hover:border-primary-accent transition-colors duration-300"
                    >
                      {evt.icon}
                    </motion.div>
                  </div>

                  {/* Empty Spacer Side */}
                  <div className="hidden sm:block w-[45%]" />

                </div>
              );
            })}
          </div>

        </div>

        {/* Small lovely closing flourish */}
        <div className="text-center mt-12 select-none">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.9 }}
            viewport={{ once: true }}
            className="font-script text-2xl text-primary-accent"
          >
            Ждем вас с нетерпением!
          </motion.p>
        </div>

      </div>
    </section>
  );
}
