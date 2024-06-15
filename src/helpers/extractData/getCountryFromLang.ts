import { ECountryByLang, type TCountryType, type TLangType } from '@/types/appSettingsTypes';

export default function getCountryFromLang(lang: TLangType): TCountryType {
  return ECountryByLang[lang];
}
