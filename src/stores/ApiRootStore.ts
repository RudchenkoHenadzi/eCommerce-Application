import { defineStore } from 'pinia'
import { type ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk'
import { useUserStore } from '@/stores/User'
import { apiRoot } from '@/stores/createFirstAnonymousFlow'
import apiRootManagement from '@/services/apiRootManagement/ApiRootManagement'

export const useApiRootStore = defineStore('apiRoot', {
  state: (): {
    apiRoot: ByProjectKeyRequestBuilder
  } => ({
    apiRoot: apiRoot
  }),
  getters: {},
  actions: {
    async start() {
      const user = useUserStore()
      const refreshToken = user.refreshToken
      if (user.isLoggedIn) {
        if (refreshToken) {
          this.setNewApiRoot(apiRootManagement.createAuthSessionFlowWithRefresh(refreshToken))
        } else {
          user.logout()
        }
      }
    },
    setNewApiRoot(apiRoot: ByProjectKeyRequestBuilder) {
      this.apiRoot = apiRoot
    }
  }
})
