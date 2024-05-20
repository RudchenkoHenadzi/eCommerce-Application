import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({ isLoggedIn: false }),
  getters: {
    isUserLoggedIn: (state) => state.isLoggedIn
  },
  actions: {
    login() {
      this.isLoggedIn = true
    },
    logout() {
      this.isLoggedIn = false
    }
  }
})
