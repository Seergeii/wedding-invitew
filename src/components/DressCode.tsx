import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Shirt, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { ColorPalette } from '../types';

export default function DressCode() {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const palettes: ColorPalette[] = [
    { name: "Peach Fuzz", hex: "#ECC09E", description: "Персиковый" },
    { name: "Powder Pink", hex: "#E8C1C5", description: "Нежно-розовый" },
    { name: "Lavender Fog", hex: "#D6CCD9", description: "Сиреневый" },
    { name: "Ice Melt", hex: "#D5E5ED", description: "Пыльно-голубой" },
    { name: "Margarita", hex: "#D1E2D3", description: "Шалфей" }
  ];

  const galleryImages = [
    "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&q=80&w=600&h=800", // Peach Fuzz dress (gorgeous light peach)
    "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=600&h=800", // Powder Pink dress (elegant light pink gown)
    "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=600&h=800", // Lavender Fog dress (delicate lilac/lavender gown)
    "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&q=80&w=600&h=800", // Ice Melt suit (stylish pastel blue suit)
    "https://images.unsplash.com/photo-1596783074918-c84cb06531ca?auto=format&fit=crop&q=80&w=600&h=800", // Margarita sage green dress (chic sage green)
    "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=600&h=800"  // Sand/beige summer suit (perfect neutral coordinator)
  ];

  const copyToClipboard = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1500);
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const cardWidth = window.innerWidth < 640 ? 200 : 260;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -cardWidth : cardWidth,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="relative py-8 px-4 bg-secondary-bg overflow-hidden flex flex-col items-center">
      <div className="w-full max-w-4xl space-y-6 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-2 mb-6">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-script text-primary-accent font-normal leading-[1.4]">
            Дресс-код
          </h2>
        </div>

        {/* Main description card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="bg-warm-cream rounded-[24px] p-6 md:p-8 shadow-md border border-light-pink/30 max-w-2xl mx-auto text-center space-y-4 paper-texture"
        >
          {/* Top text exactly from image */}
          <div className="text-text-headings text-[16px] sm:text-[18px] leading-[1.7] font-light max-w-xl mx-auto">
            <p className="font-sans">
              Нам важно, чтобы каждый кадр и момент праздника дышал уютом и единством. Будем благодарны, если вы поддержите цветовую гамму нашей свадьбы в своих нарядах
            </p>
          </div>

          {/* Overlapping Color circles like the reference image */}
          <div className="relative py-4 flex justify-center">
            <div className="flex -space-x-3 sm:-space-x-4 justify-center items-center">
              {palettes.map((p, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.1, zIndex: 20, y: -2 }}
                  className="relative group cursor-pointer z-10"
                  onClick={() => copyToClipboard(p.hex)}
                  style={{ zIndex: idx }}
                >
                  <div 
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full shadow-md border-2 border-secondary-bg relative flex items-center justify-center transition-all duration-300"
                    style={{ backgroundColor: p.hex }}
                    title={`Нажмите, чтобы скопировать HEX-код: ${p.hex}`}
                  >
                    <span className="absolute inset-0 rounded-full group-hover:bg-black/5 transition-colors" />
                    {copiedHex === p.hex ? (
                      <div className="bg-secondary-bg/90 p-1.5 rounded-full shadow-sm">
                        <Check size={14} className="text-primary-accent stroke-[3px]" />
                      </div>
                    ) : (
                      <span className="opacity-0 group-hover:opacity-100 text-[9px] uppercase font-mono tracking-wider font-semibold text-text-headings bg-secondary-bg/95 px-1.5 py-0.5 rounded-md shadow-sm transition-opacity duration-200">
                        {p.hex}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Men's section exactly from image */}
          <div className="max-w-md mx-auto pt-2">
            <p className="text-[16px] sm:text-[18px] text-text-headings font-light leading-[1.7]">
              Мужчины, просим вас отдать предпочтение костюму со светлой рубашкой
            </p>
          </div>
        </motion.div>

        {/* Horizontal Outfit Gallery */}
        <div className="space-y-6 pt-4 w-full relative">
          <p className="text-center font-sans text-lg sm:text-xl text-primary-accent font-light tracking-wide italic px-4 mb-4">
            Мы приготовили референсы для вашего удобства
          </p>
          
          <div className="relative group/gallery px-4">
            {/* Left navigation arrow button */}
            <button
              onClick={() => scroll('left')}
              className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-warm-cream/90 hover:bg-warm-cream text-primary-accent border border-light-pink/40 shadow-md flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none"
              aria-label="Предыдущий слайд"
            >
              <ChevronLeft size={20} strokeWidth={2.5} />
            </button>

            {/* Right navigation arrow button */}
            <button
              onClick={() => scroll('right')}
              className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-warm-cream/90 hover:bg-warm-cream text-primary-accent border border-light-pink/40 shadow-md flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none"
              aria-label="Следующий слайд"
            >
              <ChevronRight size={20} strokeWidth={2.5} />
            </button>

            {/* Scrollable track */}
            <div 
              ref={scrollContainerRef}
              className="flex overflow-x-auto gap-4 pb-4 px-12 snap-x snap-mandatory scroll-smooth scrollbar-thin scrollbar-thumb-light-pink/30 scrollbar-track-transparent"
            >
              {galleryImages.map((url, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: idx * 0.1 }}
                  className="flex-shrink-0 w-44 sm:w-52 md:w-60 aspect-[3/4] overflow-hidden rounded-2xl bg-warm-cream border border-light-pink/30 shadow-sm snap-center"
                >
                  <img
                    src={url}
                    alt={`Outfit Reference ${idx + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 select-none"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
