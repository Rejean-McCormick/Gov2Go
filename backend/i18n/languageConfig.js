// File: /backend/i18n/languageConfig.js

// Initialize supported languages and load translations
const supportedLanguages = ['en', 'fr', 'es'];

function initializeLanguages() {
  // Load translation data from external JSON files or objects
  const translations = {
    en: require('./translations/en.json'),
    fr: require('./translations/fr.json'),
    es: require('./translations/es.json')
  };

  return translations;
}

// Retrieve the translation for a specific key and language
function getTranslation(key, language = 'en') {
  const translations = initializeLanguages();

  // Fallback to English if the translation key or language is not found
  return (translations[language] && translations[language][key])
    ? translations[language][key]
    : translations['en'][key];
}

// Example usage to test loading supported languages
function printSupportedLanguages() {
  const translations = initializeLanguages();
  console.log(`Supported languages: ${Object.keys(translations).join(', ')}`);
}

// Example usage in an application route
app.get('/message', (req, res) => {
  const message = getTranslation('welcome', req.language);
  res.send({ message });
});

module.exports = { initializeLanguages, getTranslation, supportedLanguages };
 
