import apiRootManagement from '@/services/apiRootManagement/ApiRootManagement'
import { useApiRootStore } from '@/stores/ApiRootStore'
import { isLoginRequestSuccess, isUserNotFound } from '@/helpers/dataCheck/loginCheck'

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

    if (!isLoginRequestSuccess) {
      apiRootStore.setNewApiRoot(apiRootManagement.createAnonymousSessionFlow())
    }
    return result
  } catch (e: unknown) {
    apiRootStore.setNewApiRoot(apiRootManagement.createAnonymousSessionFlow())
    if (isUserNotFound(e)) {
      throw new Error('userNotExist')
    } else {
      throw new Error('commonError')
    }
  }
}
