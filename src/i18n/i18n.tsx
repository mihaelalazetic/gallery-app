import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import mkTranslation from "./mk.json";
import enTranslation from "./en.json";

i18next.use(initReactI18next).init({
  resources: {
    mk: {
      translation: mkTranslation,
    },
    en: {
      translation: enTranslation,
    },
  },
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});
