import i18n from "i18next";
import { initReactI18next } from "react-i18next";
const enUS = require("../lang/en-US.json");
const koKR = require("../lang/ko-KR.json");

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  "en-US": {
    translation: enUS,
  },
  ko: {
    translation: koKR,
  },
  "ko-kr": {
    translation: koKR,
  },
  "ko-KR": {
    translation: koKR,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    fallbackLng: "en-US",

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
