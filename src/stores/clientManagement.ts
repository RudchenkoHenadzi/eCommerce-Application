/*
import { defineStore } from 'pinia'
import { authApiRoot, anonymousApiRoot } from '@/configs/BuildClient'
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk'
import config from '../configs/project-configs';
const { projectKey } = config;

export const useApiRoot = defineStore('apiRoot', {
  state: () => ({
    apiRoot: createApiBuilderFromCtpClient(anonymousApiRoot).withProjectKey({ projectKey })
  }),
  actions: {
    createAnonymousApiRoot() {
      this.apiRoot = createApiBuilderFromCtpClient(anonymousApiRoot).withProjectKey({ projectKey })
      return this.apiRoot
    },
    createNewApiRoot() {
      this.apiRoot = createApiBuilderFromCtpClient(authApiRoot).withProjectKey({ projectKey })
      return this.apiRoot
    },
    use() {
      return this.apiRoot
    }
  }
})
*/
