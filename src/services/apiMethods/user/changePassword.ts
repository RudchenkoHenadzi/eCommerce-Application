import { useApiRootStore } from '@/stores/ApiRootStore'

export function changePassword(version: number, currentPassword: string, newPassword: string) {
  const apiRoot = useApiRootStore().apiRoot
  return apiRoot
    .me()
    .password()
    .post({
      body: {
        version: version,
        currentPassword: currentPassword,
        newPassword: newPassword
      }
    })
    .execute()
}
