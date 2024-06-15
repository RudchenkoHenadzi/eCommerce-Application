import { useApiRootStore } from '@/stores/ApiRootStore';

export default async function deleteProductFromCart(
  cartId: string,
  lineItemId: string,
  cartVersion: number
) {
  const apiRoot = useApiRootStore().apiRoot;
  return apiRoot
    .me()
    .carts()
    .withId({ ID: cartId })
    .post({
      body: {
        version: cartVersion,
        actions: [
          {
            action: 'removeLineItem',
            lineItemId: lineItemId,
            quantity: 1
          }
        ]
      }
    })
    .execute();
}
