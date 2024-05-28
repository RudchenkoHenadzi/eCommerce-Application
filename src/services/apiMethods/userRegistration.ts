import type { ICustomerDraft } from '@/types/customer-types'
import { useApiRootStore } from '@/stores/ApiRootStore'
import apiRootManagement from '@/services/apiRootManagement/ApiRootManagement'

export default async function userRegistration(customerDraft: ICustomerDraft) {
  const apiRootStore = useApiRootStore()
  const apiRoot = apiRootStore.apiRoot
  try {
    const res = await apiRoot
      .customers()
      .post({
        body: customerDraft
      })
      .execute()

    if (res.statusCode === 201) {
      const { email, password } = customerDraft
      apiRootStore.setNewApiRoot(apiRootManagement.createAuthSessionFlow(email, password))
    }
    return res
  } catch (e) {
    throw new Error('commonError')
  }
}
