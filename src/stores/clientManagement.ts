import { defineStore } from 'pinia'
import { anonymousClient, newClient } from '@/configs/BuildClient'
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk'
const host = import.meta.env.VITE_CTP_AUTH_URL || ''
const projectKey = import.meta.env.VITE_CTP_PROJECT_KEY || ''
const clientId = import.meta.env.VITE_CTP_CLIENT_ID || ''
const clientSecret = import.meta.env.VITE_CTP_CLIENT_SECRET || ''
const scope = import.meta.env.VITE_CTP_SCOPES || ''

export const useApiRoot = defineStore('apiRoot', {
  state: () => ({
    apiRoot: createApiBuilderFromCtpClient(anonymousClient).withProjectKey({ projectKey })
  }),
  actions: {
    createAnonymousApiRoot() {
      this.apiRoot = createApiBuilderFromCtpClient(anonymousClient).withProjectKey({ projectKey })
      return this.apiRoot
    },
    createNewApiRoot() {
      this.apiRoot = createApiBuilderFromCtpClient(newClient).withProjectKey({ projectKey })
      return this.apiRoot
    },
    use() {
      return this.apiRoot
    }
  }
})
