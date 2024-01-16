import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationEN from "./translation/en/translation.json";
import translationHE from "./translation/hi/translation.json";


//Creating object with the variables of imported translation files
const resources = {
  en: {
    translation: translationEN,
  },
  hi: {
    translation: translationHE,
  },
};

//i18N Initialization

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng:"en",
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;