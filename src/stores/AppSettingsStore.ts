import { defineStore } from 'pinia'
import type { TCurrencyType, TLang } from '@/types/appSettingsTypes'
import { APP_CURRENCIES, APP_LANGUAGES, DEFAULT_CURRENCY, DEFAULT_LANG } from '@/constants/projectConfigs'

export const useAppSettingsStore = defineStore('appSettings', {
  state: (): {
    appLang: TLang
    appLanguages: TLang[]
    appCurrency: TCurrencyType
    appCurrencies: TCurrencyType[]
  } => ({
    appLang: DEFAULT_LANG,
    appLanguages: APP_LANGUAGES,
    appCurrency: DEFAULT_CURRENCY,
    appCurrencies: APP_CURRENCIES
  }),
  getters: {
    lang: (state) => state.appLang,
    languages: (state) => state.appLanguages,
    currency: (state) => state.appCurrency,
    currencies: (state) => state.appCurrencies,
  },
  actions: {
    setNewLang(newLang: TLang) {
      this.appLang = newLang
    },
    setNewCurrency(newCurrency: TCurrencyType) {
      this.appCurrency = newCurrency
    }
  }
})
