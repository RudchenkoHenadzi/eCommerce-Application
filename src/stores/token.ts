import { defineStore } from 'pinia'

export const useToken = defineStore('token', {
  state: () => ({
    token: ''
  }),

  actions: {
    setToken(value: string) {
      this.token = value
    }
  }
})
