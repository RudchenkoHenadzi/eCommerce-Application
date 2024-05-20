import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({ isLoggedIn: localStorage.getItem('isLoggedIn') === 'true' }),
  getters: {
    isUserLoggedIn: (state) => state.isLoggedIn
  },
  actions: {
    login() {
      this.isLoggedIn = true
      localStorage.setItem('isLoggedIn', 'true')
    },
    logout() {
      this.isLoggedIn = false
      localStorage.removeItem('isLoggedIn')
    }
  }
})
