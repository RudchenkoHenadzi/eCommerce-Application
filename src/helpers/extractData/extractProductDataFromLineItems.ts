import type { LineItem, Price, Product } from '@commercetools/platform-sdk';
import { extractDiscountedProductPrice } from '@/helpers/extractData/extractProductDataFromProduct';

export function extractProductQuantityFromLineItems(product: Product, items: LineItem[]) {
  const lineItem = items.find((item) => item.productId === product.id);

  if (lineItem) {
    return lineItem.quantity;
  }
  return 0;
}

export function extractLineItemIdFromLineItems(productId: string, lineItems: LineItem[]) {
  const currentLineItem = lineItems.find((lineItem) => {
    return lineItem.productId === productId;
  });
  return currentLineItem ? currentLineItem.id : '';
}

export function extractTotalPriceFromLineItem(lineItem: LineItem) {
  return lineItem.price.value.centAmount;
}

export function extractDiscountedPriceFromLineItem(lineItem: LineItem) {
  return extractDiscountedProductPrice(lineItem.price);
}
