import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          settings: "Settings",
          appearance: "Appearance",
          themeDesc: "Switch between light and dark themes",
          language: "Language",
          langDesc: "Select your preferred language",
          saveSettings: "Save Preferences",
          saving: "Saving...",
          preferencesSaved: "Preferences saved successfully!",
          saveError: "Failed to save preferences."
        }
      },
      bn: {
        translation: {
          settings: "সেটিংস",
          appearance: "ওয়েবসাইট থিম",
          themeDesc: "ডার্ক এবং লাইট মোডের মধ্যে পরিবর্তন করুন",
          language: "ভাষা",
          langDesc: "আপনার পছন্দসই ভাষা নির্বাচন করুন",
          saveSettings: "সেটিংস সেভ করুন",
          saving: "সেভ হচ্ছে...",
          preferencesSaved: "পছন্দসমূহ সফলভাবে সেভ হয়েছে!",
          saveError: "সেভ করতে ব্যর্থ হয়েছে।"
        }
      }
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;