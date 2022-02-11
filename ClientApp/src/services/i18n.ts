import i18next from "i18next";
import { initReactI18next } from 'react-i18next'
import hebrew from "@src/Locales/he.json"
import russian from "@src/Locales/ru.json"

i18next
  .use(initReactI18next)
  .init({
    resources: {
      he: {
        translation: hebrew
      },
      ru: {
        translation: russian
      }
    },
    fallbackLng: "he",
    interpolation: {
      escapeValue: false,
    },
  });
export default i18next;