import { motion } from 'motion/react';
import { Gift, Wine, Heart } from 'lucide-react';

export default function Wishes() {
  return (
    <section className="relative py-8 px-4 bg-warm-cream overflow-hidden flex flex-col items-center">
      {/* Background delicate elements */}
      <div className="absolute top-1/2 left-[-100px] w-56 h-56 rounded-full bg-light-pink/10 blur-3xl -z-10" />
      <div className="absolute bottom-0 right-[-100px] w-56 h-56 rounded-full bg-secondary-bg/30 blur-3xl -z-10" />

      <div className="w-full max-w-4xl space-y-6 relative z-10">
        
        {/* Header Block */}
        <div className="text-center space-y-4">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-script text-primary-accent font-normal leading-none">
            Пожелания
          </h2>
        </div>

        {/* Elegant Minimalist Double-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          
          {/* Card 1: Gift Wishes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white/40 backdrop-blur-sm border border-primary-accent/15 rounded-2xl p-8 sm:p-10 flex flex-col items-center text-center space-y-6 hover:border-primary-accent/25 transition-all duration-300 group shadow-sm"
          >
            {/* Elegant minimalist icon header */}
            <div className="w-12 h-12 rounded-full border border-primary-accent/20 flex items-center justify-center bg-warm-cream/50 text-primary-accent/80 group-hover:bg-primary-accent group-hover:text-warm-cream transition-all duration-500">
              <Gift size={20} strokeWidth={1.5} />
            </div>

            <div className="space-y-4">
              <h3 className="font-sans text-lg tracking-wide text-text-headings font-semibold">
                О подарках
              </h3>
              <div className="space-y-4 text-text-body text-[15px] sm:text-[16px] leading-[1.7] font-light">
                <p>
                  Ваше присутствие, искренние улыбки и теплые пожелания в этот важный день — самый лучший и ценный подарок для нас.
                </p>
                <p className="font-medium text-text-headings text-sm sm:text-base">
                  Если вы захотите поздравить нас дополнительно, мы будем невероятно благодарны за вклад в бюджет нашей будущей молодой семьи.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Flower wishes / Wine */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="bg-white/40 backdrop-blur-sm border border-primary-accent/15 rounded-2xl p-8 sm:p-10 flex flex-col items-center text-center space-y-6 hover:border-primary-accent/25 transition-all duration-300 group shadow-sm"
          >
            {/* Elegant minimalist icon header */}
            <div className="w-12 h-12 rounded-full border border-primary-accent/20 flex items-center justify-center bg-warm-cream/50 text-primary-accent/80 group-hover:bg-primary-accent group-hover:text-warm-cream transition-all duration-500">
              <Wine size={20} strokeWidth={1.5} />
            </div>

            <div className="space-y-4">
              <h3 className="font-sans text-lg tracking-wide text-text-headings font-semibold">
                Вместо цветов
              </h3>
              <div className="space-y-4 text-text-body text-[15px] sm:text-[16px] leading-[1.7] font-light">
                <p>
                  Пожалуйста, не дарите нам традиционные букеты — к нашему большому сожалению, они очень быстро завянут.
                </p>
                <p className="font-medium text-text-headings text-sm sm:text-base">
                  Вместо цветов мы будем рады бутылке вашего любимого вина или игристого, чтобы пополнить нашу семейную коллекцию!
                </p>
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
