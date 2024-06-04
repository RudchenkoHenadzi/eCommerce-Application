import { useApiRootStore } from '@/stores/ApiRootStore'
import apiRootManagement from '@/services/apiRootManagement/ApiRootManagement'

export default function userLogout() {
  const apiRootStore = useApiRootStore()
  apiRootStore.setNewApiRoot(apiRootManagement.createAnonymousSessionFlow())
}
