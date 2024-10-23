import React, { createContext, useContext, useState } from 'react';

// Create the LanguageContext
const LanguageContext = createContext();

// Translation data for different languages
const translations = {
  en: {
    welcome: 'Welcome',
    logout: 'Logout',
    settings: 'Settings',
    language: 'Language',
    save: 'Save Changes'
  },
  fr: {
    welcome: 'Bienvenue',
    logout: 'Se déconnecter',
    settings: 'Paramètres',
    language: 'Langue',
    save: 'Sauvegarder les modifications'
  },
  es: {
    welcome: 'Bienvenido',
    logout: 'Cerrar sesión',
    settings: 'Configuración',
    language: 'Idioma',
    save: 'Guardar cambios'
  },
  // More languages can be added here
};

// LanguageProvider component
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const translate = (key) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translate }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use LanguageContext
export const useLanguage = () => {
  return useContext(LanguageContext);
};

 
