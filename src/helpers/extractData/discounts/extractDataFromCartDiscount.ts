import type { CartDiscount } from '@commercetools/platform-sdk';
import type { TLangType } from '@/types/appSettingsTypes';

export function extractTargetType(cartDiscount: CartDiscount) {
  return cartDiscount.target ? cartDiscount.target.type : '';
}

export function extractTargetPredicate(cartDiscount: CartDiscount) {
  return cartDiscount.target && 'predicate' in cartDiscount.target
    ? cartDiscount.target.predicate
    : '';
}

export function extractDiscountName(cartDiscount: CartDiscount, lang: TLangType) {
  return cartDiscount.name[lang] || '';
}

export function extractDiscountType(cartDiscount: CartDiscount) {
  return cartDiscount.value.type;
}

export function extractDiscountPercentNumber(cartDiscount: CartDiscount) {
  return 'permyriad' in cartDiscount.value ? cartDiscount.value.permyriad : 0;
}

export function extractDiscountInfoToApply(cartDiscounts: CartDiscount[]) {
  const codes = cartDiscounts.map((discount) => {
    return {
      key: discount.key || '',
      sortOrder: discount.sortOrder
    };
  });

  return codes[0].sortOrder >= codes[1].sortOrder ? codes[0] : codes[1];
}
