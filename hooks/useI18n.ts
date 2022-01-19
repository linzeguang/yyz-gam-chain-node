import { find } from "lodash";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { localeConfig } from "../i18n";
import { LocaleKeys } from "../i18n/types";

export default function useI18n() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const locale = find(localeConfig, (item) => item.name === lang);

  const $t = useCallback(
    (key: LocaleKeys, options?: { [key: string]: any }) => t(key, options),
    [t]
  );

  const updateLang = useCallback(
    (lng: string) => {
      i18n.changeLanguage(lng, () => window.location.reload());
    },
    [i18n]
  );

  return {
    lang,
    locale,
    localeConfig,
    $t,
    updateLang,
  };
}
