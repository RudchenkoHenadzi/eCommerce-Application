import { useApiRootStore } from '@/stores/ApiRootStore';

export default async function addProductToCart(cartId: string, productId: string, version: number) {
  const apiRoot = useApiRootStore().apiRoot;

  return apiRoot
    .me()
    .carts()
    .withId({ ID: cartId })
    .post({
      body: {
        version,
        actions: [
          {
            action: 'addLineItem',
            productId: productId,
            quantity: 1
          }
        ]
      }
    })
    .execute();
}
