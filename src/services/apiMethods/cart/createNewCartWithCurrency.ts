import { useApiRootStore } from '@/stores/ApiRootStore'
import { useAppSettingsStore } from '@/stores/AppSettingsStore'

export default function createNewCartWithCurrency() {
  const apiRoot = useApiRootStore().apiRoot
  const appSettings = useAppSettingsStore()
  return apiRoot.me().carts().post({
    body: {
      currency: appSettings.currency,
      country: appSettings.country
    }
  }).execute()
}
