import { useApiRootStore } from '@/stores/ApiRootStore';

export function getUserData() {
  const apiRoot = useApiRootStore().apiRoot;
  return apiRoot.me().get().execute();
}
