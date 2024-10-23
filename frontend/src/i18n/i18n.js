import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import fr from './fr.json';
import es from './es.json';

const resources = {
  en: {
    translation: en,
  },
  fr: {
    translation: fr,
  },
  es: {
    translation: es,
  },
};

const initializeI18n = () => {
  i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: 'en', // Default language
      fallbackLng: 'en', // Fallback language if translation is not available
      interpolation: {
        escapeValue: false, // React already safes from XSS
      },
    });
};

const changeLanguage = (lng) => {
  i18n.changeLanguage(lng);
};

export { initializeI18n, changeLanguage };
 
