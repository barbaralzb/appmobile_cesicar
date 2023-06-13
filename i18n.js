import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import en from './src/languages/en.json';
import es from './src/languages/es.json';
import fr from './src/languages/fr.json';

const resources = {
  en: { translation: en },
  es: { translation: es },
  fr: { translation: fr },
};

i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    resources,
    lng: Localization.locale,
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
