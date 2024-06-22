import type { LineItem, Product } from '@commercetools/platform-sdk';

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
