import type { LineItem } from '@commercetools/platform-sdk';

export function getProductQuantity(lineItems: LineItem[], productId: string) {
  const currentLineItem = lineItems.find((lineItem) => lineItem.productId === productId);
  return currentLineItem ? currentLineItem.quantity : 0;
}
