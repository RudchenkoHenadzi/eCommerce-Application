import type { Cart } from '@commercetools/platform-sdk'
import { useAppSettingsStore } from '@/stores/AppSettingsStore'

export function getUserCurrentCart(carts: Cart[]): Cart | undefined {
  const appSettings = useAppSettingsStore()
  return carts.find((cart) => {
    if (
      cart.country &&
      cart.country === appSettings.country &&
      cart.totalPrice.currencyCode === appSettings.currency
    ) {
      return cart
    }
    return
  })
}
