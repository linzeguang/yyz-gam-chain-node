import i18n, { InitOptions } from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en_US from "./locales/en-US.json";
// import zh_CN from "./locales/zh-CN.json";
import { Locale } from "./types";

export const localeConfig: Locale[] = [
  {
    code: "en-US",
    name: "English",
    label: "EN",
  },
];

const resources: InitOptions["resources"] = {
  "en-US": {
    translation: en_US,
  },
  // "zh-CN": {
  //   translation: zh_CN,
  // },
};

i18n.use(LanguageDetector).use(initReactI18next).init({
  resources,
  // debug: true,
  fallbackLng: "en-US",
});

export default i18n;
