import { useApiRootStore } from '@/stores/ApiRootStore';

export default function getUserCustomerId(email: string) {
  const apiRoot = useApiRootStore().apiRoot;
  return apiRoot
    .customers()
    .get({
      queryArgs: {
        where: `email="${email}"`
      }
    })
    .execute();
}
