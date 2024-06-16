import type { TCurrencyType } from '@/types/appSettingsTypes';
import type { Cart } from '@commercetools/platform-sdk';
import type { IUserCartIdItem } from '@/types/customerTypes';

export const CartsStoreId = 'carts';

export type TCartsStoreId = typeof CartsStoreId;

export interface ICartsState {
  userCurrentCart: Cart | undefined;
  userCartIds: Record<TCurrencyType, IUserCartIdItem>;
  cartProductCount: number;
}

export interface ICartsGetters {
  currentCart: Cart | undefined;
  productCount: number;
  cartVersion: number;
  cartId: string;
  totalPrice: number;
}

export interface ICartsActions {
  setCurrentCart: (cart: Cart | undefined) => void;
  deleteCurrentCart: () => void;
  updateProductCount: () => void;
}
