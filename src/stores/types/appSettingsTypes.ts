import type { TCountryType, TCurrencyType, TLangType } from '@/types/appSettingsTypes';

export const AppSettingsStoreId = 'appSettings';

export type TAppSettingsStoreId = typeof AppSettingsStoreId;

export interface IAppSettingsState {
  appLang: TLangType;
  appLanguages: TLangType[];
  appCurrency: TCurrencyType;
  appCurrencies: TCurrencyType[];
  appCountry: TCountryType;
}

export interface IAppSettingsGetters {
  lang: TLangType;
  languages: TLangType[];
  currency: TCurrencyType;
  currencies: TCurrencyType[];
  country: TCountryType;
}

export interface IAppSettingsActions {
  setNewLang: (newLang: TLangType) => void;
  setNewCurrency: (newCurrency: TCurrencyType) => void;
  setNewCountry: (newCountry: TCountryType) => void;
  selectCountry: (newCountry: TCountryType) => void;
}
