import type { TCountryType, TCurrencyType, TLangType } from '@/types/appSettingsTypes'

export interface IAppSettingsState {
  appLang: TLangType
  appLanguages: TLangType[]
  appCurrency: TCurrencyType
  appCurrencies: TCurrencyType[]
  appCountry: TCountryType
}

export interface IAppSettingsGetters {
  lang: TLangType
  languages: TLangType[]
  currency: TCurrencyType
  currencies: TCurrencyType[]
  country: TCountryType
}
