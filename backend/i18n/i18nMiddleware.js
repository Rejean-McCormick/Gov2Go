// File: /backend/i18n/i18nMiddleware.js

// Function to detect and set the language preference
function setLanguage(req, res, next) {
  const language = req.headers['accept-language'] || 'en'; // Default to English if no preference
  req.language = language.split(',')[0]; // Set the language preference from the first language in the header
  next(); // Proceed to the next middleware
}

// Function to translate keys based on the set language
function translate(key, language = 'en') {
  const translations = {
    en: {
      greeting: "Hello",
      farewell: "Goodbye",
    },
    fr: {
      greeting: "Bonjour",
      farewell: "Au revoir",
    },
    es: {
      greeting: "Hola",
      farewell: "Adiós",
    }
  };

  // Fallback to English if translation for the key or language is missing
  return (translations[language] && translations[language][key]) 
         ? translations[language][key] 
         : translations['en'][key];
}

// Middleware to set language for each request
function i18nMiddleware(req, res, next) {
  setLanguage(req, res, next);
}

// Example usage of the translation function in a route
app.get('/greet', (req, res) => {
  const greeting = translate('greeting', req.language);
  res.send({ message: greeting });
});

app.get('/farewell', (req, res) => {
  const farewell = translate('farewell', req.language);
  res.send({ message: farewell });
});

module.exports = { i18nMiddleware, translate };
 
