import { defineStore } from 'pinia'
import {
  type TCountryType,
  type TCurrencyType,
  type TLangType
} from '@/types/appSettingsTypes'
import {
  APP_CURRENCIES,
  APP_LANGUAGES, DEFAULT_COUNTRY,
  DEFAULT_CURRENCY,
  DEFAULT_LANG
} from '@/constants/projectConfigs'
import getCountryFromLang from '@/helpers/extractData/getCountryFromLang'
import { COUNTRY_SWITCH_SCHEMA } from '@/constants/constants'

export const useAppSettingsStore = defineStore('appSettings', {
  state: (): {
    appLang: TLangType
    appLanguages: TLangType[]
    appCurrency: TCurrencyType
    appCurrencies: TCurrencyType[],
    appCountry: TCountryType
  } => ({
    appLang: DEFAULT_LANG,
    appLanguages: APP_LANGUAGES,
    appCurrency: DEFAULT_CURRENCY,
    appCurrencies: APP_CURRENCIES,
    appCountry: DEFAULT_COUNTRY
  }),
  getters: {
    lang: (state) => state.appLang,
    languages: (state) => state.appLanguages,
    currency: (state) => state.appCurrency,
    currencies: (state) => state.appCurrencies,
    country: (state) => state.appCountry,
  },
  actions: {
    setNewLang(newLang: TLangType) {
      this.appLang = newLang
    },
    setNewCurrency(newCurrency: TCurrencyType) {
      this.appCurrency = newCurrency
    },
    setNewCountry(newCountry: TCountryType) {
      this.appCountry = newCountry
    },
    selectCountry(newCountry: TCountryType) {
      this.setNewCountry(newCountry)
      const {currency, lang} = COUNTRY_SWITCH_SCHEMA[newCountry]
      this.setNewLang(lang)
      this.setNewCurrency(currency)
    }
  }
})
