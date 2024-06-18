import { defineStore, type StoreDefinition } from 'pinia';
import type { CartDiscount, CartDiscountPagedQueryResponse } from '@commercetools/platform-sdk';
import {
  DiscountCodesStoreId,
  type IDiscountCodesActions,
  type IDiscountCodesGetters,
  type IDiscountCodesState,
  type TDiscountCodesStoreId
} from '@/stores/types/discountCodesStoreTypes';

export const useDiscountCodesStore: StoreDefinition<
  TDiscountCodesStoreId,
  IDiscountCodesState,
  IDiscountCodesGetters,
  IDiscountCodesActions
> = defineStore(DiscountCodesStoreId, {
  state: (): IDiscountCodesState => ({
    cartDiscountsCodes: new Array<string>(),
    cartDiscountsDetails: {} as Record<string, CartDiscount>
  }),
  getters: {
    discountCodes: (state: IDiscountCodesState) => state.cartDiscountsCodes,
    discountsDetails: (state: IDiscountCodesState) => state.cartDiscountsDetails
  },
  actions: {
    getDiscountInfoByKey(key: string) {
      let result;
      Object.keys(this.cartDiscountsDetails).forEach((discountCode) => {
        if (discountCode === key) {
          result = this.cartDiscountsDetails[discountCode];
        }
      });
      return result;
    },
    setAllDiscountCodes() {
      this.cartDiscountsCodes = Object.keys(this.cartDiscountsDetails);
    },
    setAllDiscountDetails(rawData: CartDiscountPagedQueryResponse) {
      this.cartDiscountsDetails = {} as Record<string, CartDiscount>;
      rawData.results.forEach((res) => {
        if (res.isActive) {
          this.cartDiscountsDetails[res.key || ''] = res;
        }
      });
    }
  }
});
