import { useUserStore } from '@/stores/User'
import { useAppSettingsStore } from '@/stores/AppSettingsStore'

export function getCartID() {
  const user = useUserStore()
  const appSetting = useAppSettingsStore()
  return user.userCartIds[appSetting.currency].id
}

export function isCartExist(cartId: string) {
  console.log('isCartExist')
  return cartId !== ''
}
