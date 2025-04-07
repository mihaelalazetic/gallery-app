import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./en.json";
import mk from "./mk.json";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      mk: { translation: mk },
    },
    lng: "en", // default language
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
