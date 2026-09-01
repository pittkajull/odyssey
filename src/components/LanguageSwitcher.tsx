import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language === 'en' ? 'en' : 'id';

  const toggleLanguage = () => {
    const newLang = currentLang === 'id' ? 'en' : 'id';
    i18n.changeLanguage(newLang);
    localStorage.setItem('odyssey-lang', newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="voyage-lang-switch inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm border border-[rgba(244,232,193,.3)] text-[10px] font-handwritten tracking-wider uppercase transition-all duration-200 hover:border-[var(--color-gold-light)] hover:text-[var(--color-parchment-light)]"
    >
      {/* Globe icon */}
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
      <motion.span
        key={currentLang}
        initial={{ y: -8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="font-bold"
      >
        {currentLang === 'id' ? 'ID' : 'EN'}
      </motion.span>
    </button>
  );
}
