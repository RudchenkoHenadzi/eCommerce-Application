import { defineStore } from 'pinia'
import type { TCurrencyType, TLang } from '@/types/appSettingsTypes'
import { DEFAULT_CURRENCY, DEFAULT_LANG } from '@/constants/projectConfigs'

export const useAppSettingsStore = defineStore('appSettings', {
  state: (): {
    appLang: TLang
    appCurrency: TCurrencyType
  } => ({
    appLang: DEFAULT_LANG,
    appCurrency: DEFAULT_CURRENCY
  }),
  getters: {
    lang: (state) => state.appLang,
    currency: (state) => state.appCurrency
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
