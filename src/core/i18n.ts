import { pt } from "../data/i18n/pt-BR";
import { en } from "../data/i18n/en";
export type Language = "pt-BR" | "en";
let language: Language = "pt-BR";
export function setLanguage(value: Language) {
  language = value;
  document.documentElement.lang = value;
}
export const getLanguage = () => language;
export const t = () => (language === "en" ? en : pt);
export interface Localized {
  "pt-BR": string;
  en: string;
}
export const local = (value: Localized) => value[language];
