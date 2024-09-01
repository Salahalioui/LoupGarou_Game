import { createI18n } from "vue-i18n";
import en from "./locales/en.json";
import arDZ from "./locales/ar-DZ.json";

const i18n = createI18n({
  legacy: false,
  locale: "en",
  fallbackLocale: "en",
  messages: {
    en,
    "ar-DZ": arDZ,
  },
});

export default i18n;
