import apiRootManagement from '@/services/apiRootManagement/ApiRootManagement'
import { useApiRootStore } from '@/stores/ApiRootStore'

export default async function userLogin(email: string, password: string) {
  const apiRootStore = useApiRootStore()
  const apiRoot = apiRootStore.apiRoot
  apiRootStore.setNewApiRoot(apiRootManagement.createAuthSessionFlow(email, password))
  try {
    const result = await apiRoot
      .me()
      .login()
      .post({
        body: { email, password }
      })
      .execute()

    if (result.statusCode !== 200) {
      apiRootStore.setNewApiRoot(apiRootManagement.createAnonymousSessionFlow())
    }
    return result
  } catch (e: unknown) {
    apiRootStore.setNewApiRoot(apiRootManagement.createAnonymousSessionFlow())
    if (e instanceof Error && e.message.includes('not found')) {
      throw new Error('userNotExist')
    } else {
      throw new Error('commonError')
    }
  }
}
