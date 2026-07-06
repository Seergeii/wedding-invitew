import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MailCheck, CheckCircle2, AlertCircle, FileSpreadsheet, Users, Trash2, Key } from 'lucide-react';
import { RSVPSubmission } from '../types';

const DRINK_OPTIONS = [
  'Красное вино',
  'Белое вино',
  'Игристое вино / Шампанское',
  'Водка',
  'Коньяк',
  'Виски',
  'Самогон',
  'Безалкогольные напитки'
];

export default function RSVP() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [attending, setAttending] = useState<boolean | null>(null);
  const [guestsCount, setGuestsCount] = useState(1);
  const [selectedDrinks, setSelectedDrinks] = useState<string[]>([]);
  const [comment, setComment] = useState('');

  // Form states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Admin Panel states
  const [showAdmin, setShowAdmin] = useState(false);
  const [adminPass, setAdminPass] = useState('');
  const [isAdminUnlocked, setIsAdminUnlocked] = useState(false);
  const [submissions, setSubmissions] = useState<RSVPSubmission[]>([]);
  const [adminError, setAdminError] = useState('');

  // Load submissions for Admin
  useEffect(() => {
    const saved = localStorage.getItem('wedding_rsvp_submissions');
    if (saved) {
      setSubmissions(JSON.parse(saved));
    }
  }, [isSuccess]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Validations
    if (!firstName.trim()) return setErrorMsg('Пожалуйста, введите имя.');
    if (!lastName.trim()) return setErrorMsg('Пожалуйста, введите фамилию.');
    if (!phone.trim()) return setErrorMsg('Пожалуйста, укажите контактный телефон.');
    if (attending === null) return setErrorMsg('Пожалуйста, выберите, приедете ли вы.');

    setIsSubmitting(true);

    try {
      // Simulate real network request/fetch
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const newSubmission: RSVPSubmission = {
        id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 9),
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        phone: phone.trim(),
        attending,
        guestsCount: attending ? guestsCount : 0,
        drinks: attending && selectedDrinks.length > 0 ? selectedDrinks : undefined,
        comment: comment.trim() || undefined,
        submittedAt: new Date().toISOString()
      };

      // Save locally so the user can test the admin view instantly
      const existing = localStorage.getItem('wedding_rsvp_submissions');
      const currentList: RSVPSubmission[] = existing ? JSON.parse(existing) : [];
      currentList.push(newSubmission);
      localStorage.setItem('wedding_rsvp_submissions', JSON.stringify(currentList));
      setSubmissions(currentList);

      setIsSuccess(true);
    } catch (err) {
      setErrorMsg('Произошла непредвиденная ошибка. Пожалуйста, попробуйте снова.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUnlockAdmin = (e: FormEvent) => {
    e.preventDefault();
    if (adminPass === '2026') {
      setIsAdminUnlocked(true);
      setAdminError('');
    } else {
      setAdminError('Неверный пароль. Подсказка: год свадьбы');
    }
  };

  const handleDeleteSubmission = (id: string) => {
    const updated = submissions.filter(s => s.id !== id);
    setSubmissions(updated);
    localStorage.setItem('wedding_rsvp_submissions', JSON.stringify(updated));
  };

  const handleExportCSV = () => {
    if (submissions.length === 0) return;
    
    // CSV Header (with BOM for Cyrillic excel support!)
    let csvContent = "\uFEFF";
    csvContent += "ID;Имя;Фамилия;Телефон;Присутствие;Количество гостей;Напитки;Комментарий;Дата отправки\n";
    
    submissions.forEach(s => {
      const drinksStr = s.drinks ? s.drinks.join(', ') : '';
      csvContent += `${s.id};${s.firstName};${s.lastName};${s.phone};${s.attending ? 'Да' : 'Нет'};${s.guestsCount};${drinksStr};${s.comment || ''};${new Date(s.submittedAt).toLocaleString('ru-RU')}\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'wedding_rsvp_guests.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleResetForm = () => {
    setFirstName('');
    setLastName('');
    setPhone('');
    setAttending(null);
    setGuestsCount(1);
    setSelectedDrinks([]);
    setComment('');
    setIsSuccess(false);
  };

  const handleDrinkToggle = (drink: string) => {
    setSelectedDrinks(prev =>
      prev.includes(drink)
        ? prev.filter(d => d !== drink)
        : [...prev, drink]
    );
  };

  // Stats calculation
  const totalAttending = submissions.filter(s => s.attending).length;
  const totalDeclining = submissions.filter(s => !s.attending).length;
  const totalGuestsSum = submissions.reduce((sum, s) => sum + s.guestsCount, 0);

  return (
    <section id="rsvp-section" className="relative py-8 px-4 bg-secondary-bg overflow-hidden flex flex-col items-center">
      {/* Visual background flourishes */}
      <div className="absolute top-0 left-1/4 w-72 h-72 rounded-full bg-light-pink/15 blur-3xl -z-10" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full bg-light-pink/10 blur-3xl -z-10" />

      <div className="w-full max-w-xl space-y-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-2 mb-6">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-script text-primary-accent font-normal leading-[1.4]">
            Подтверждение присутствия
          </h2>
        </div>

        {/* Dynamic Success State or Form */}
        <AnimatePresence mode="wait">
          {isSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-warm-cream rounded-[24px] p-6 sm:p-8 shadow-xl border border-light-pink text-center space-y-4 paper-texture"
            >
              <div className="w-16 h-16 rounded-full bg-light-sage/40 text-text-headings flex items-center justify-center mx-auto border border-light-sage/60">
                <CheckCircle2 size={36} className="text-primary-accent" />
              </div>
              
              <div className="space-y-3">
                <h3 className="font-script text-4xl text-primary-accent font-normal leading-[1.3]">Спасибо за ответ!</h3>
                <p className="text-[16px] sm:text-[18px] text-text-body font-light max-w-sm mx-auto leading-[1.7]">
                  Ваши данные успешно записаны. Мы бесконечно рады, что сможем разделить эти счастливые моменты вместе!
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleResetForm}
                  className="px-6 py-2.5 rounded-full border border-light-pink text-text-body text-xs tracking-widest uppercase hover:bg-light-pink/25 transition-colors duration-300 cursor-pointer font-sans"
                >
                  Отправить еще один ответ
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="bg-warm-cream rounded-[24px] p-6 sm:p-8 shadow-xl border border-light-pink/40 space-y-4 text-left paper-texture"
            >
              <p className="text-[16px] sm:text-[18px] text-text-body leading-[1.7] text-center font-light mb-4">
                Пожалуйста, подтвердите ваше участие до 1 августа 2026 года, чтобы мы могли позаботиться о каждой детали праздника.
              </p>

              {/* Error Callout */}
              {errorMsg && (
                <div className="flex items-center gap-2 bg-light-pink/45 border border-primary-accent/30 rounded-xl p-3 text-text-headings text-xs">
                  <AlertCircle size={14} className="flex-shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Grid Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-text-body mb-1">
                    Имя *
                  </label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl border border-light-pink bg-warm-cream/50 text-text-headings focus:outline-none focus:ring-1 focus:ring-primary-accent focus:border-primary-accent"
                    placeholder="Например: Иван"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-text-body mb-1">
                    Фамилия *
                  </label>
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl border border-light-pink bg-warm-cream/50 text-text-headings focus:outline-none focus:ring-1 focus:ring-primary-accent focus:border-primary-accent"
                    placeholder="Например: Петров"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-text-body mb-1">
                  Контактный телефон *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-light-pink bg-warm-cream/50 text-text-headings focus:outline-none focus:ring-1 focus:ring-primary-accent focus:border-primary-accent"
                  placeholder="+7 (999) 123-45-67"
                />
              </div>

              {/* Attendance Toggle (Да / Нет) */}
              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-wider font-semibold text-text-body">
                  Будете присутствовать на нашей свадьбе? *
                </label>
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => setAttending(true)}
                    className={`p-3.5 rounded-xl border text-xs font-semibold tracking-wider transition-all uppercase flex items-center justify-center gap-2 cursor-pointer ${
                      attending === true
                        ? 'bg-primary-accent border-primary-accent text-warm-cream shadow-sm'
                        : 'bg-warm-cream border-light-pink/40 text-text-body hover:bg-light-pink/20'
                    }`}
                  >
                    💍 Да, с радостью!
                  </button>
                  <button
                    type="button"
                    onClick={() => setAttending(false)}
                    className={`p-3.5 rounded-xl border text-xs font-semibold tracking-wider transition-all uppercase flex items-center justify-center gap-2 cursor-pointer ${
                      attending === false
                        ? 'bg-text-headings border-text-headings text-warm-cream shadow-sm'
                        : 'bg-warm-cream border-light-pink/40 text-text-body hover:bg-light-pink/20'
                    }`}
                  >
                    🍂 К сожалению, не смогу
                  </button>
                </div>
              </div>

              {/* Dynamic Guest Count Input */}
              <AnimatePresence>
                {attending === true && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden space-y-4"
                  >
                    <div className="space-y-1.5">
                      <label className="block text-xs uppercase tracking-wider font-semibold text-text-body">
                        Количество гостей (включая вас)
                      </label>
                      <select
                        value={guestsCount}
                        onChange={(e) => setGuestsCount(parseInt(e.target.value))}
                        className="w-full text-xs p-3 rounded-xl border border-light-pink bg-warm-cream/50 text-text-headings focus:outline-none focus:ring-1 focus:ring-primary-accent focus:border-primary-accent"
                      >
                        <option value={1}>Только я (1 человек)</option>
                        <option value={2}>Вдвоем (2 человека)</option>
                        <option value={3}>Семьей (3 человека)</option>
                        <option value={4}>Семьей (4 человека)</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs uppercase tracking-wider font-semibold text-text-body">
                        Какие напитки вы предпочитаете? (выберите галочками)
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {DRINK_OPTIONS.map((drink) => {
                          const isChecked = selectedDrinks.includes(drink);
                          return (
                            <label
                              key={drink}
                              className={`flex items-center gap-2.5 p-3 rounded-xl border transition-all duration-200 cursor-pointer text-xs ${
                                isChecked
                                  ? 'bg-primary-accent/10 border-primary-accent text-text-headings font-medium'
                                  : 'bg-warm-cream/50 border-light-pink/30 text-text-body hover:bg-light-pink/10'
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => handleDrinkToggle(drink)}
                                className="w-4 h-4 rounded border-light-pink text-primary-accent focus:ring-primary-accent accent-primary-accent cursor-pointer"
                              />
                              <span>{drink}</span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Comment / Preferences */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-text-body mb-1">
                  Пожелания / Комментарии / Пищевые аллергии
                </label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={3}
                  className="w-full text-xs p-3 rounded-xl border border-light-pink bg-warm-cream/50 text-text-headings focus:outline-none focus:ring-1 focus:ring-primary-accent focus:border-primary-accent resize-none"
                  placeholder="Например: предпочтения по напиткам или еде, поздравления..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 mt-2 rounded-full bg-primary-accent hover:bg-primary-accent/95 text-warm-cream font-medium text-xs tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow active:scale-95 disabled:bg-light-pink"
              >
                {isSubmitting ? (
                  <span className="w-4 h-4 border-2 border-warm-cream border-t-transparent rounded-full animate-spin" />
                ) : (
                  "Подтвердить"
                )}
              </button>
            </motion.form>
          )}
        </AnimatePresence>

        {/* ORGANIZER ADMIN PANEL BUTTON TRIGGER */}
        <div className="flex flex-col items-center pt-4">
          <button
            onClick={() => setShowAdmin(!showAdmin)}
            className="text-[10px] uppercase tracking-[0.2em] text-text-secondary/65 hover:text-primary-accent transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Key size={10} /> Панель организатора
          </button>

          {showAdmin && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 w-full bg-warm-cream rounded-2xl p-6 border border-light-pink/40 shadow-lg text-left text-xs text-text-body"
            >
              {!isAdminUnlocked ? (
                <form onSubmit={handleUnlockAdmin} className="space-y-3">
                  <p className="text-[10px] text-text-secondary font-semibold uppercase tracking-wider">Введите код доступа организатора:</p>
                  <div className="flex gap-2">
                    <input
                      type="password"
                      value={adminPass}
                      onChange={(e) => setAdminPass(e.target.value)}
                      className="flex-grow p-2 text-xs rounded-lg border border-light-pink bg-warm-cream/50 text-text-headings"
                      placeholder="Пароль по умолчанию: 2026"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-lg bg-primary-accent text-warm-cream hover:bg-primary-accent/90 font-semibold cursor-pointer"
                    >
                      Войти
                    </button>
                  </div>
                  {adminError && <p className="text-primary-accent text-[10px]">{adminError}</p>}
                </form>
              ) : (
                <div className="space-y-5">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-light-pink/20 pb-3">
                    <div>
                      <h4 className="font-semibold text-sm text-text-headings">Списки подтверждений (RSVP)</h4>
                      <p className="text-[10px] text-text-secondary">Сохраняется локально в этом браузере</p>
                    </div>
                    {submissions.length > 0 && (
                      <button
                        onClick={handleExportCSV}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-light-sage/80 text-text-headings hover:bg-light-sage border border-light-sage/40 font-medium transition-colors cursor-pointer"
                      >
                        <FileSpreadsheet size={13} /> Скачать Excel/CSV
                      </button>
                    )}
                  </div>

                  {/* Stats Summary */}
                  <div className="grid grid-cols-3 gap-3 text-center text-xs">
                    <div className="bg-light-sage/40 p-2.5 rounded-xl border border-light-sage/50">
                      <p className="text-text-headings font-semibold text-lg">{totalAttending}</p>
                      <p className="text-[9px] text-text-secondary uppercase tracking-wider">Приедут</p>
                    </div>
                    <div className="bg-light-pink/40 p-2.5 rounded-xl border border-light-pink/55">
                      <p className="text-primary-accent font-semibold text-lg">{totalDeclining}</p>
                      <p className="text-[9px] text-text-secondary uppercase tracking-wider">Отклонили</p>
                    </div>
                    <div className="bg-soft-blue/40 p-2.5 rounded-xl border border-soft-blue/55">
                      <p className="text-text-headings font-semibold text-lg">{totalGuestsSum}</p>
                      <p className="text-[9px] text-text-secondary uppercase tracking-wider">Всего гостей</p>
                    </div>
                  </div>

                  {/* Submissions List Table */}
                  {submissions.length === 0 ? (
                    <p className="text-center py-6 text-text-secondary font-light italic">Ни одной заявки еще не отправлено. Заполните форму выше для проверки!</p>
                  ) : (
                    <div className="max-h-60 overflow-y-auto border border-light-pink/20 rounded-xl">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-warm-cream/70 text-[10px] uppercase tracking-wider text-text-secondary border-b border-light-pink/20">
                            <th className="p-2">Гость</th>
                            <th className="p-2">Контакты</th>
                            <th className="p-2">Статус</th>
                            <th className="p-2 text-center">Гостей</th>
                            <th className="p-2 text-right">Управление</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-light-pink/10">
                          {submissions.map((s) => (
                            <tr key={s.id} className="hover:bg-warm-cream/45">
                              <td className="p-2">
                                <div className="font-medium text-text-headings">{s.firstName} {s.lastName}</div>
                                {s.drinks && s.drinks.length > 0 && (
                                  <div className="text-[9px] text-primary-accent italic leading-tight mt-0.5">
                                    🍹 {s.drinks.join(', ')}
                                  </div>
                                )}
                              </td>
                              <td className="p-2 font-mono text-[10px] text-text-body">{s.phone}</td>
                              <td className="p-2">
                                <span className={`px-2 py-0.5 rounded-full text-[9px] font-semibold ${
                                  s.attending ? 'bg-light-sage text-text-headings border border-light-sage/30' : 'bg-light-pink text-primary-accent border border-light-pink/30'
                                }`}>
                                  {s.attending ? 'Да' : 'Нет'}
                                </span>
                              </td>
                              <td className="p-2 text-center text-text-body">{s.guestsCount}</td>
                              <td className="p-2 text-right">
                                <button
                                  onClick={() => handleDeleteSubmission(s.id)}
                                  className="text-primary-accent hover:text-primary-accent/80 p-1 rounded hover:bg-light-pink/30 cursor-pointer"
                                  title="Удалить запись"
                                >
                                  <Trash2 size={12} />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  <div className="flex justify-end gap-2 text-[10px]">
                    <button
                      onClick={() => setIsAdminUnlocked(false)}
                      className="text-text-secondary hover:text-text-headings underline cursor-pointer"
                    >
                      Выйти из панели
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </div>

      </div>
    </section>
  );
}
