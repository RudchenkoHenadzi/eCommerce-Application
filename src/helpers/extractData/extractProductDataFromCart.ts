import type { Cart, Product } from '@commercetools/platform-sdk';
import {
  extractLineItemIdFromLineItems,
  extractProductQuantityFromLineItems
} from '@/helpers/extractData/extractProductDataFromLineItems';

export function extractProductQuantityFromCart(product: Product, cart: Cart) {
  const items = cart.lineItems;

  if (items) {
    return extractProductQuantityFromLineItems(product, items);
  }
  return 0;
}

export function extractLineItemIdFromCart(productId: string, cart: Cart) {
  if (cart.lineItems.length !== 0) {
    return extractLineItemIdFromLineItems(productId, cart.lineItems);
  } else {
    return '';
  }
}
