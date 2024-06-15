import { defineStore, type StoreDefinition } from 'pinia';
import type { Cart } from '@commercetools/platform-sdk';
import { userCartIds } from '@/helpers/setUp/setUpUserCartsToStore';
import type { ICartsActions, ICartsGetters, ICartsState } from '@/stores/types/cartTypes';

export const useCartsStore: StoreDefinition<'carts', ICartsState, ICartsGetters, ICartsActions> =
  defineStore('carts', {
    state: (): ICartsState => ({
      userCurrentCart: undefined,
      userCartIds: userCartIds,
      cartProductCount: 0,
    }),
    getters: {
      currentCart: (state: ICartsState) => state.userCurrentCart,
      productCount: (state: ICartsState) => state.cartProductCount,
    },
    actions: {
      setCurrentCart(cart: Cart | undefined) {
        this.userCurrentCart = cart;
        this.updateProductCount()
      },
      deleteCurrentCart() {
        this.setCurrentCart(undefined)
      },
      updateProductCount() {
        this.cartProductCount = this.currentCart ? this.currentCart.lineItems.length : 0
      },
    }
  });
