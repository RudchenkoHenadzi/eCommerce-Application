import type { TCurrencyType } from '@/types/appSettingsTypes'
import type { Cart } from '@commercetools/platform-sdk'
import type { IUserCartIdItem } from '@/types/customerTypes'

export interface ICartsState {
  userCurrentCart: Cart | undefined
  userCartIds: Record<TCurrencyType, IUserCartIdItem>
}

export interface ICartsGetters {
  currentCart: Cart | undefined
}

export interface ICartsActions {
  setCurrentCart: (cart: Cart | undefined) => void
}
