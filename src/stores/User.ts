import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
    email: localStorage.getItem('userMail') || ''
  }),
  getters: {
    isUserLoggedIn: (state) => state.isLoggedIn,
    getUserMail: (state) => state.email
  },
  actions: {
    login() {
      this.isLoggedIn = true
      localStorage.setItem('isLoggedIn', 'true')
    },
    logout() {
      this.isLoggedIn = false
      localStorage.removeItem('isLoggedIn')
    },
    setUserMail(email: string) {
      this.email = email
      localStorage.setItem('userMail', email)
    },
    removeUserMail() {
      this.email = ''
      localStorage.removeItem('userMail')
    }
  }
})
