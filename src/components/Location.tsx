import { motion } from 'motion/react';

export default function Location() {
  const venueName = "Конгресс-отель «Форум»";
  const venueAddress = "г. Рязань, проезд Яблочкова, д. 5Е";
  
  // Real Yandex Map iframe widget for Congress-hotel Forum Ryazan
  const mapIframeUrl = "https://yandex.ru/map-widget/v1/?ll=39.77123%2C54.61395&z=16&text=Рязань%20Конгресс-отель%20Форум";

  return (
    <section className="relative py-6 px-4 bg-warm-cream overflow-hidden text-center flex flex-col items-center">
      <div className="w-full max-w-3xl space-y-4">
        
        {/* Title */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-script text-text-headings font-normal leading-none">
          Локация
        </h2>

        {/* Text */}
        <div className="space-y-1 max-w-lg mx-auto">
          <h3 className="text-[17px] sm:text-[19px] font-medium text-text-headings">
            {venueName}
          </h3>
          <p className="text-[15px] sm:text-[17px] text-text-body font-light">
            <span>{venueAddress}</span>
          </p>
        </div>

        {/* Embed Map Iframe */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="w-full h-48 sm:h-56 max-w-2xl mx-auto rounded-2xl overflow-hidden shadow-md border border-light-pink/40 relative"
        >
          <iframe
            src={mapIframeUrl}
            width="100%"
            height="100%"
            style={{ border: 0, filter: "grayscale(0.1) sepia(0.05)" }}
            allowFullScreen={false}
            loading="lazy"
            title="Интерактивная карта"
            referrerPolicy="no-referrer"
          />
        </motion.div>

      </div>
    </section>
  );
}
