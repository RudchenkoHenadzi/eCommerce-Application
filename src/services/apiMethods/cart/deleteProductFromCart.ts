import { useApiRootStore } from '@/stores/ApiRootStore';

export default async function deleteProductFromCart(
  cartId: string,
  lineItemId: string,
  cartVersion: number,
  quantity: number = 1
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
            quantity: quantity
          }
        ]
      }
    })
    .execute();
}
