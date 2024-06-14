import { useApiRootStore } from '@/stores/ApiRootStore'
import { useUserStore } from '@/stores/User'
import { useAppSettingsStore } from '@/stores/AppSettingsStore'

export default async function deleteProductFromCart(lineItemId: string, cartVersion: number) {
  const apiRoot = useApiRootStore().apiRoot
  const user = useUserStore()
  const appSettings = useAppSettingsStore()
  const id = user.userCartIds[appSettings.currency].id
  return apiRoot.me().carts().withId({ ID: id}).post({
    body: {
      version: cartVersion,
      "actions" : [ {
        "action" : "removeLineItem",
        "lineItemId" : lineItemId,
        "quantity" : 1
      } ]
    }
  }).execute()
}
