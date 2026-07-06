import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { motion } from 'motion/react';
import { Heart, Edit2, Check, RefreshCw } from 'lucide-react';

interface HeroProps {
  onRsvpClick: () => void;
}

export default function Hero({ onRsvpClick }: HeroProps) {
  // Safe default childhood images
  const defaultBride = 'https://images.unsplash.com/photo-1519791883288-dc8bd696e667?auto=format&fit=crop&q=80&w=500';
  const defaultGroom = 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&q=80&w=500';

  const [brideImg, setBrideImg] = useState(defaultBride);
  const [groomImg, setGroomImg] = useState(defaultGroom);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempBride, setTempBride] = useState(defaultBride);
  const [tempGroom, setTempGroom] = useState(defaultGroom);

  // Sizing / crop options states
  const [brideFit, setBrideFit] = useState<'cover' | 'contain'>('cover');
  const [groomFit, setGroomFit] = useState<'cover' | 'contain'>('cover');
  const [bridePosition, setBridePosition] = useState<string>('center');
  const [groomPosition, setGroomPosition] = useState<string>('center');

  const [tempBrideFit, setTempBrideFit] = useState<'cover' | 'contain'>('cover');
  const [tempGroomFit, setTempGroomFit] = useState<'cover' | 'contain'>('cover');
  const [tempBridePosition, setTempBridePosition] = useState<string>('center');
  const [tempGroomPosition, setTempGroomPosition] = useState<string>('center');

  // Load from localstorage if user edited
  useEffect(() => {
    const savedBride = localStorage.getItem('wedding_bride_img');
    const savedGroom = localStorage.getItem('wedding_groom_img');
    if (savedBride) {
      setBrideImg(savedBride);
      setTempBride(savedBride);
    }
    if (savedGroom) {
      setGroomImg(savedGroom);
      setTempGroom(savedGroom);
    }

    const savedBrideFit = localStorage.getItem('wedding_bride_fit') as 'cover' | 'contain';
    const savedGroomFit = localStorage.getItem('wedding_groom_fit') as 'cover' | 'contain';
    const savedBridePos = localStorage.getItem('wedding_bride_pos');
    const savedGroomPos = localStorage.getItem('wedding_groom_pos');

    if (savedBrideFit) {
      setBrideFit(savedBrideFit);
      setTempBrideFit(savedBrideFit);
    }
    if (savedGroomFit) {
      setGroomFit(savedGroomFit);
      setTempGroomFit(savedGroomFit);
    }
    if (savedBridePos) {
      setBridePosition(savedBridePos);
      setTempBridePosition(savedBridePos);
    }
    if (savedGroomPos) {
      setGroomPosition(savedGroomPos);
      setTempGroomPosition(savedGroomPos);
    }
  }, []);

  const handleSaveImages = (e: FormEvent) => {
    e.preventDefault();
    setBrideImg(tempBride);
    setGroomImg(tempGroom);
    setBrideFit(tempBrideFit);
    setGroomFit(tempGroomFit);
    setBridePosition(tempBridePosition);
    setGroomPosition(tempGroomPosition);

    localStorage.setItem('wedding_bride_img', tempBride);
    localStorage.setItem('wedding_groom_img', tempGroom);
    localStorage.setItem('wedding_bride_fit', tempBrideFit);
    localStorage.setItem('wedding_groom_fit', tempGroomFit);
    localStorage.setItem('wedding_bride_pos', tempBridePosition);
    localStorage.setItem('wedding_groom_pos', tempGroomPosition);
    setIsModalOpen(false);
  };

  const handleReset = () => {
    setTempBride(defaultBride);
    setTempGroom(defaultGroom);
    setTempBrideFit('cover');
    setTempGroomFit('cover');
    setTempBridePosition('center');
    setTempGroomPosition('center');
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>, isBride: boolean) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.name.toLowerCase().endsWith('.heic')) {
        alert('Формат HEIC (с iPhone) не поддерживается напрямую в браузерах. Пожалуйста, сохраните фото как JPG или PNG, либо сделайте скриншот и загрузите его!');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        if (isBride) {
          setTempBride(base64String);
        } else {
          setTempGroom(base64String);
        }
      };
      reader.readAsDataURL(file);
    }
  };

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
        <div className="text-center space-y-1 sm:space-y-2 pt-2 sm:pt-4">
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

        {/* 2. Dialog bubbles & side-by-side Childhood photos */}
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

          {/* Photos Wrapper - Large, straight vertical photos, directly resting above the footer boundary */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6 px-2 sm:px-4 w-full relative z-0 mb-0 pb-0 max-w-2xl sm:max-w-3xl">
            {/* Bride Childhood */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, ease: "easeOut", delay: 0.5 }}
              className="relative group cursor-pointer flex flex-col items-center w-full"
              title="Нажмите, чтобы настроить фото"
              onClick={() => setIsModalOpen(true)}
            >
              <div className="h-[60vh] xs:h-[63vh] sm:h-[68vh] md:h-[72vh] lg:h-[76vh] xl:h-[80vh] min-h-[350px] w-full flex items-end justify-center relative pb-0 mb-0 overflow-visible bg-transparent">
                <img
                  src={brideImg}
                  alt="Екатерина в детстве"
                  className={`filter sepia-[0.1] saturate-[0.95] ${
                    brideFit === 'cover' ? 'w-full h-full object-cover' : 'max-w-full max-h-full object-contain'
                  } ${
                    bridePosition === 'top' ? 'object-top' : bridePosition === 'bottom' ? 'object-bottom' : 'object-center'
                  } transition-all duration-300 z-0`}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1519791883288-dc8bd696e667?auto=format&fit=crop&q=80&w=400';
                  }}
                />
                <div className="absolute top-1.5 right-1.5 opacity-0 group-hover:opacity-100 transition-opacity bg-white/95 p-1.5 rounded-full shadow border border-powder-pink text-accent-dark z-20">
                  <Edit2 size={12} />
                </div>
              </div>
            </motion.div>

            {/* Groom Childhood */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, ease: "easeOut", delay: 0.7 }}
              className="relative group cursor-pointer flex flex-col items-center w-full"
              title="Нажмите, чтобы настроить фото"
              onClick={() => setIsModalOpen(true)}
            >
              <div className="h-[60vh] xs:h-[63vh] sm:h-[68vh] md:h-[72vh] lg:h-[76vh] xl:h-[80vh] min-h-[350px] w-full flex items-end justify-center relative pb-0 mb-0 overflow-visible bg-transparent">
                <img
                  src={groomImg}
                  alt="Сергей в детстве"
                  className={`filter sepia-[0.1] saturate-[0.95] ${
                    groomFit === 'cover' ? 'w-full h-full object-cover' : 'max-w-full max-h-full object-contain'
                  } ${
                    groomPosition === 'top' ? 'object-top' : groomPosition === 'bottom' ? 'object-bottom' : 'object-center'
                  } transition-all duration-300 z-0`}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&q=80&w=400';
                  }}
                />
                <div className="absolute top-1.5 right-1.5 opacity-0 group-hover:opacity-100 transition-opacity bg-white/95 p-1.5 rounded-full shadow border border-powder-pink text-accent-dark z-20">
                  <Edit2 size={12} />
                </div>
              </div>
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

      {/* 4. PHOTO CUSTOMIZER MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl border border-powder-pink max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-sans font-medium text-lg text-accent-dark">Настройка детских фотографий</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-accent-dark/50 hover:text-accent-dark text-xl"
              >
                &times;
              </button>
            </div>
            
            <div className="text-xs text-accent-dark/70 mb-4 space-y-1 bg-rose-50/50 p-3 rounded-2xl border border-rose-100">
              <p className="leading-relaxed">
                Вы можете загрузить фотографии жениха и невесты в детстве прямо со своего смартфона или компьютера!
              </p>
              <p className="text-rose-500 font-medium">
                ⚠️ Пожалуйста, используйте обычные фото (PNG, JPG, WEBP). Формат HEIC (с iPhone) не поддерживается веб-браузерами напрямую.
              </p>
            </div>

            <form onSubmit={handleSaveImages} className="space-y-4">
              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-wider font-semibold text-accent-dark/80">
                  Фото Кати
                </label>
                <div className="flex flex-col gap-1.5">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, true)}
                    className="block w-full text-xs text-accent-dark/70
                      file:mr-3 file:py-1.5 file:px-3
                      file:rounded-xl file:border-0
                      file:text-xs file:font-semibold
                      file:bg-rose-50 file:text-primary-accent
                      hover:file:bg-rose-100 cursor-pointer"
                  />
                  <div className="text-[10px] text-accent-dark/40 text-center">или укажите ссылку:</div>
                  <input
                    type="text"
                    value={tempBride}
                    onChange={(e) => setTempBride(e.target.value)}
                    className="w-full text-xs p-2 rounded-xl border border-rose-petal bg-warm-cream/30 focus:outline-none focus:ring-1 focus:ring-rose-400"
                    placeholder="https://example.com/bride.jpg"
                  />
                  
                  {/* Sizing & alignment options */}
                  <div className="grid grid-cols-2 gap-2 mt-1 bg-warm-cream/20 p-2 rounded-xl border border-rose-100/50">
                    <div>
                      <label className="block text-[10px] uppercase font-semibold text-accent-dark/60 mb-0.5">Размер</label>
                      <select
                        value={tempBrideFit}
                        onChange={(e) => setTempBrideFit(e.target.value as 'cover' | 'contain')}
                        className="w-full text-[11px] p-1.5 rounded-lg border border-rose-petal bg-white focus:outline-none focus:ring-1 focus:ring-rose-400 text-accent-dark"
                      >
                        <option value="cover">Заполнение</option>
                        <option value="contain">Вписать</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-semibold text-accent-dark/60 mb-0.5">Выравнивание</label>
                      <select
                        value={tempBridePosition}
                        onChange={(e) => setTempBridePosition(e.target.value)}
                        className="w-full text-[11px] p-1.5 rounded-lg border border-rose-petal bg-white focus:outline-none focus:ring-1 focus:ring-rose-400 text-accent-dark"
                      >
                        <option value="top">Сверху</option>
                        <option value="center">По центру</option>
                        <option value="bottom">Снизу</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2 border-t border-rose-100/50 pt-3">
                <label className="block text-xs uppercase tracking-wider font-semibold text-accent-dark/80">
                  Фото Сережи
                </label>
                <div className="flex flex-col gap-1.5">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, false)}
                    className="block w-full text-xs text-accent-dark/70
                      file:mr-3 file:py-1.5 file:px-3
                      file:rounded-xl file:border-0
                      file:text-xs file:font-semibold
                      file:bg-rose-50 file:text-primary-accent
                      hover:file:bg-rose-100 cursor-pointer"
                  />
                  <div className="text-[10px] text-accent-dark/40 text-center">или укажите ссылку:</div>
                  <input
                    type="text"
                    value={tempGroom}
                    onChange={(e) => setTempGroom(e.target.value)}
                    className="w-full text-xs p-2 rounded-xl border border-rose-petal bg-warm-cream/30 focus:outline-none focus:ring-1 focus:ring-rose-400"
                    placeholder="https://example.com/groom.jpg"
                  />

                  {/* Sizing & alignment options */}
                  <div className="grid grid-cols-2 gap-2 mt-1 bg-warm-cream/20 p-2 rounded-xl border border-rose-100/50">
                    <div>
                      <label className="block text-[10px] uppercase font-semibold text-accent-dark/60 mb-0.5">Размер</label>
                      <select
                        value={tempGroomFit}
                        onChange={(e) => setTempGroomFit(e.target.value as 'cover' | 'contain')}
                        className="w-full text-[11px] p-1.5 rounded-lg border border-rose-petal bg-white focus:outline-none focus:ring-1 focus:ring-rose-400 text-accent-dark"
                      >
                        <option value="cover">Заполнение</option>
                        <option value="contain">Вписать</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-semibold text-accent-dark/60 mb-0.5">Выравнивание</label>
                      <select
                        value={tempGroomPosition}
                        onChange={(e) => setTempGroomPosition(e.target.value)}
                        className="w-full text-[11px] p-1.5 rounded-lg border border-rose-petal bg-white focus:outline-none focus:ring-1 focus:ring-rose-400 text-accent-dark"
                      >
                        <option value="top">Сверху</option>
                        <option value="center">По центру</option>
                        <option value="bottom">Снизу</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-2 text-xs">
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex-1 py-2.5 rounded-xl border border-rose-petal text-accent-dark/60 hover:text-accent-dark hover:bg-warm-cream/40 transition-colors flex items-center justify-center gap-1"
                >
                  <RefreshCw size={12} /> Сбросить
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-rose-400 text-white hover:bg-rose-500 transition-colors flex items-center justify-center gap-1 font-medium"
                >
                  <Check size={12} /> Применить
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </section>
  );
}
