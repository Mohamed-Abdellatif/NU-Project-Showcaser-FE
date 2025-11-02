import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslation from './locales/en/translation.json';
import arTranslation from './locales/ar/translation.json';

const resources = {
  en: { translation: enTranslation },
  ar: { translation: arTranslation },
};

const savedLang = localStorage.getItem('appLanguage') || 'en';
const dir = savedLang === 'ar' ? 'rtl' : 'ltr';

document.documentElement.setAttribute('dir', dir);
document.body.dir = dir;



i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLang,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

i18n.on('languageChanged', (lng: string) => {
  const dir = lng === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.setAttribute('dir', dir);
  document.body.dir = dir;
  localStorage.setItem('appLanguage', lng);
});



export default i18n;
