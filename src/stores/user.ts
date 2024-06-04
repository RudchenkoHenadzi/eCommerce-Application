import { defineStore } from 'pinia'

export const useUser = defineStore('user', {
  state: () => ({
    accessToken: '',
    refreshToken: ''
  }),

  actions: {
    setUserToken(accessToken: string, refreshToken: string) {
      ;(this.accessToken = accessToken), (this.refreshToken = refreshToken)
    },
    removeToken() {
      this.accessToken = ''
    }
  }
})
