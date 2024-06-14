import { useApiRootStore } from '@/stores/ApiRootStore'

export function deleteCart(cartId: string, cartVersion: number) {
  const apiRoot = useApiRootStore().apiRoot
  return apiRoot
    .me()
    .carts()
    .withId({ ID: cartId })
    .delete({
      queryArgs: {
        version: cartVersion
      }
    })
    .execute()
}
