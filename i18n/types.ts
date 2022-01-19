import en_US from "./locales/en-US.json";

export type LocaleKeys = keyof typeof en_US;

export interface Locale {
  code: string;
  name: string;
  label: string;
}
