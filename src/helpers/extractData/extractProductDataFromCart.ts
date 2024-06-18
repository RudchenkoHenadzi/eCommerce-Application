import type { Cart, Product } from '@commercetools/platform-sdk';
import {
  extractActualProductPriceFromLineItem,
  extractFullPriceFromLineItem,
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

export function extractAllProductsTotalPriceWithPromo(cart?: Cart) {
  return cart ? cart.totalPrice.centAmount : 0;
}

export function extractAllProductsTotalPriceNoPromo(cart?: Cart) {
  if (cart) {
    return cart.lineItems.reduce((total, lineItem) => {
      const price = extractActualProductPriceFromLineItem(lineItem) * lineItem.quantity;
      total += price;
      return total;
    }, 0);
  }
  return 0;
}

export function extractAllProductsFullPriceNoPromo(cart?: Cart) {
  if (cart) {
    return cart.lineItems.reduce((total, lineItem) => {
      const price = extractFullPriceFromLineItem(lineItem) * lineItem.quantity;
      total += price;
      return total;
    }, 0);
  }
  return 0;
}
