import { defineStore } from 'pinia'
import type { TCurrencyType } from '@/types/appSettingsTypes'
import getUserCarts from '@/services/apiMethods/cart/getUserCarts'
import type { Cart } from '@commercetools/platform-sdk'
import { userCartIds } from '@/helpers/setUp/setUpUserCartsToStore'
import { deleteCart } from '@/services/apiMethods/cart/deleteCart'

export const useUserStore = defineStore('user', {
  state: () => ({
    isUserLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
    userMail: localStorage.getItem('userMail') || '',
    userFirstName: '',
    userLastName: '',
    userBirthDate: '',
    userVersion: 0,
    userToken: localStorage.getItem('userToken') || '',
    userRefreshToken: localStorage.getItem('userRefreshToken') || '',
    userTokenExpirationTime: Number(localStorage.getItem('tokenExpirationTime')) || 0,
    userCartIds: userCartIds,
  }),
  getters: {
    isLoggedIn: (state) => state.isUserLoggedIn,
    email: (state) => state.userMail,
    firstName: (state) => state.userFirstName,
    lastName: (state) => state.userLastName,
    birthDate: (state) => state.userBirthDate,
    version: (state) => state.userVersion,
    refreshToken: (state) => state.userRefreshToken,
    accessToken: (state) => state.userToken,
    tokenExpirationTime: (state) => state.userTokenExpirationTime,
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
    setUserFirstName(firstName: string) {
      this.userFirstName = firstName
    },
    setUserLastName(lastName: string) {
      this.userLastName = lastName
    },
    setUserBirthDate(birthDate: string) {
      this.userBirthDate = birthDate
    },
    setUserVersion(newUserVersion: number) {
      this.userVersion = newUserVersion
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
    saveCartId(currency: TCurrencyType, id: string) {
      this.userCartIds[currency].id = id
    },
    saveCartVersion(currency: TCurrencyType, version: number) {
      this.userCartIds[currency].version = version
    },
    getUserCarts() {
      getUserCarts().then((res) => {
        console.log(' getUserCarts then')
        if (res.statusCode === 200) {
          const carts = res.body.results.reverse()
          carts.forEach((cart: Cart) => {
            const currency = cart.totalPrice.currencyCode as TCurrencyType
            if (this.userCartIds[currency]) {
              if (this.userCartIds[currency].id === '') {
                this.userCartIds[currency] = {
                  id: cart.id,
                  version: cart.version
                }
              } else {
                deleteCart(cart.id, cart.version).then(console.log).catch(console.error)
              }
            } else {
              deleteCart(cart.id, cart.version).then(console.log).catch(console.error)
            }
          })
        } else {
          console.log(res)
        }
      }).catch((e) => console.log(e))
    }
  }
})
