import en from '../i18n/en.json';
import es from '../i18n/es.json';
import fr from '../i18n/fr.json';

// Localization Service
const localizationService = {
    languageResources: {
        en,
        es,
        fr,
    },
    currentLanguage: 'en',  // Default language

    loadLanguageResources(language) {
        if (this.languageResources[language]) {
            this.currentLanguage = language;  // Set the current language
        } else {
            console.warn(`Language ${language} not supported.`);
        }
    },

    getLocalizedString(key) {
        return this.languageResources[this.currentLanguage][key] || key;
    }
};

export default localizationService;
 
