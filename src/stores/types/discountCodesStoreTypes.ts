import type { CartDiscount, CartDiscountPagedQueryResponse } from '@commercetools/platform-sdk';

export const DiscountCodesStoreId = 'discountCodes';

export type TDiscountCodesStoreId = typeof DiscountCodesStoreId;

export interface IDiscountCodesState {
  cartDiscountsCodes: string[];
  cartDiscountsDetails: Record<string, CartDiscount>;
}

export interface IDiscountCodesGetters {
  discountCodes: string[];
  discountsDetails: Record<string, CartDiscount>;
}

export interface IDiscountCodesActions {
  getDiscountInfoByKey: (key: string) => CartDiscount | undefined;
  setAllDiscountCodes: (rawData: CartDiscountPagedQueryResponse) => void;
  setAllDiscountDetails: (rawData: CartDiscountPagedQueryResponse) => void;
}
