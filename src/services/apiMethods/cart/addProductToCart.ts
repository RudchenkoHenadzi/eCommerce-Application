import { useApiRootStore } from '@/stores/ApiRootStore'
import { useUserStore } from '@/stores/User'
import { useAppSettingsStore } from '@/stores/AppSettingsStore'

export default async function addProductToCart(productId: string, version: number) {
  const apiRoot = useApiRootStore().apiRoot
  const user = useUserStore()
  const appSettings = useAppSettingsStore()
  const id = user.userCartIds[appSettings.currency].id
  return apiRoot.me().carts().withId({ ID: id}).post({
    body: {
      version,
      "actions" : [ {
        "action" : "addLineItem",
        "productId" : productId,
        "quantity" : 1
      } ]
    }
  }).execute()
}
