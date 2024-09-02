import { createI18n } from "vue-i18n";
import en from "./locales/en.json";
import arDZ from "./locales/ar-DZ.json";
import dzDZ from "./locales/dz-DZ.json"; // Import the new locale

const messages = {
  en,
  "ar-DZ": arDZ,
  "dz-DZ": dzDZ, // Add the new locale
};

const i18n = createI18n({
  legacy: false,
  locale: "en",
  fallbackLocale: "en",
  messages, // set locale messages
});

export default i18n;
