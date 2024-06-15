import { useApiRootStore } from '@/stores/ApiRootStore';

export default function getProjectData() {
  const apiRoot = useApiRootStore().apiRoot;
  return apiRoot.get().execute();
}
