import { defineStore, type StoreDefinition } from 'pinia';
import type { Cart } from '@commercetools/platform-sdk';
import { userCartIds } from '@/helpers/setUp/setUpUserCartsToStore';
import {
  CartsStoreId,
  type ICartsActions,
  type ICartsGetters,
  type ICartsState,
  type TCartsStoreId
} from '@/stores/types/cartTypes';

export const useCartsStore: StoreDefinition<
  TCartsStoreId,
  ICartsState,
  ICartsGetters,
  ICartsActions
> = defineStore(CartsStoreId, {
  state: (): ICartsState => ({
    userCurrentCart: undefined,
    userCartIds: userCartIds,
    cartProductCount: 0
  }),
  getters: {
    currentCart: (state: ICartsState) => state.userCurrentCart,
    productCount: (state: ICartsState) => state.cartProductCount,
    cartVersion: (state: ICartsState) => state.userCurrentCart?.version || 0,
    cartId: (state: ICartsState) => state.userCurrentCart?.id || '',
    totalPrice: (state: ICartsState) =>
      state.userCurrentCart?.totalPrice ? state.userCurrentCart.totalPrice.centAmount : 0
  },
  actions: {
    setCurrentCart(cart: Cart | undefined) {
      this.userCurrentCart = cart;
      this.updateProductCount();
    },
    deleteCurrentCart() {
      this.setCurrentCart(undefined);
    },
    updateProductCount() {
      this.cartProductCount = this.currentCart ? this.currentCart.lineItems.length : 0;
    }
  }
});
