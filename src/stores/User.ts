import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    isUserLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
    userMail: localStorage.getItem('userMail') || '',
    userToken: localStorage.getItem('userToken') || '',
    userRefreshToken: localStorage.getItem('userRefreshToken') || '',
    userTokenExpirationTime: Number(localStorage.getItem('tokenExpirationTime')) || 0,
    userCartId: localStorage.getItem('userCartId') || ''
  }),
  getters: {
    isLoggedIn: (state) => state.isUserLoggedIn,
    email: (state) => state.userMail,
    refreshToken: (state) => state.userRefreshToken,
    accessToken: (state) => state.userToken,
    tokenExpirationTime: (state) => state.userTokenExpirationTime,
    cartId: (state) => state.userCartId
  },
  actions: {
    login() {
      this.isUserLoggedIn = true
      localStorage.setItem('isLoggedIn', 'true')
    },
    logout() {
      this.isUserLoggedIn = false
      localStorage.removeItem('isLoggedIn')
      localStorage.removeItem('userMail')
      localStorage.removeItem('tokenExpirationTime')
      localStorage.removeItem('userToken')
      localStorage.removeItem('userRefreshToken')
    },
    setUserMail(email: string) {
      this.userMail = email
      localStorage.setItem('userMail', email)
    },
    removeUserMail() {
      this.userMail = ''
      localStorage.removeItem('userMail')
    },
    setUserToken(token: string) {
      this.userToken = token
      localStorage.setItem('userToken', token)
    },
    setUserRefreshToken(token: string) {
      this.userRefreshToken = token
      localStorage.setItem('userRefreshToken', token)
    },
    setExpirationTime(newTime: number) {
      this.userTokenExpirationTime = newTime
      localStorage.setItem('tokenExpirationTime', String(newTime))
    },
    clearTokenData() {
      this.userToken = ''
      this.userRefreshToken = ''
      this.userTokenExpirationTime = 0
      localStorage.removeItem('tokenExpirationTime')
      localStorage.removeItem('userToken')
      localStorage.removeItem('userRefreshToken')
    },
    setCardId(id: string) {
      this.userCartId = id
      localStorage.setItem('userCartId', id)
    },
    removeCartId() {
      this.userCartId = ''
      localStorage.removeItem('userCartId')
    }
  }
})
