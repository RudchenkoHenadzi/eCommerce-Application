import { defineStore } from 'pinia'

export const useAppStatusStore = defineStore('appStatus', {
  state: (): {
    indicatorStatus: boolean
  } => ({
    indicatorStatus: false
  }),
  getters: {
    isDataLoading: (state) => state.indicatorStatus
  },
  actions: {
    startLoading() {
      this.indicatorStatus = true
    },
    stopLoading() {
      this.indicatorStatus = false
    }
  }
})
