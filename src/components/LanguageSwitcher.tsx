import { useTranslation } from 'react-i18next';
import { Globe } from './AdventureIcons';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'id' ? 'en' : 'id';
    i18n.changeLanguage(newLang);
    localStorage.setItem('odyssey-lang', newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="voyage-lang-switch flex items-center gap-1 px-2 py-1.5 rounded border border-[var(--color-ink-faded)]/40 text-[var(--color-ink-muted)] hover:border-[var(--color-ocean)] hover:text-[var(--color-ocean)] transition-colors"
      title={i18n.language === 'id' ? 'Switch to English' : 'Ganti ke Bahasa Indonesia'}
    >
      <Globe size={12} />
      <span className="font-handwritten text-[11px] uppercase tracking-wider">
        {i18n.language === 'id' ? 'ID' : 'EN'}
      </span>
    </button>
  );
}
