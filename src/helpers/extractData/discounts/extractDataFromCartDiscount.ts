import type { CartDiscount } from '@commercetools/platform-sdk';
import type { TLangType } from '@/types/appSettingsTypes';

export function extractDiscountName(cartDiscount: CartDiscount, lang: TLangType) {
  return cartDiscount.name[lang] || '';
}
