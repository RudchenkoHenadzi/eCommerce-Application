import { useApiRootStore } from '@/stores/ApiRootStore';

export default function getUserCarts() {
  const apiRoot = useApiRootStore().apiRoot;
  return apiRoot
    .me()
    .carts()
    .get({
      queryArgs: {
        limit: 500
      }
    })
    .execute();
}
