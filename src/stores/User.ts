import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
    email: localStorage.getItem('userMail') || '',
    userToken: localStorage.getItem('userToken') || '',
    userRefreshToken: localStorage.getItem('userRefreshToken') || ''
  }),
  getters: {
    isUserLoggedIn: (state) => state.isLoggedIn,
    getUserMail: (state) => state.email,
    getUserRefreshToken: (state) => state.userRefreshToken,
    getUserToken: (state) => state.userToken
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
    },
    setUserToken(token: string) {
      this.userToken = token
      localStorage.setItem('userToken', token)
    },
    setUserRefreshToken(token: string) {
      this.userRefreshToken = token
      localStorage.setItem('userRefreshToken', token)
    }
  }
})
