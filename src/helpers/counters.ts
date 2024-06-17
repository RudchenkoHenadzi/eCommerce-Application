import type { LineItem } from '@commercetools/platform-sdk';
import { extractTotalPriceFromLineItem } from '@/helpers/extractData/extractProductDataFromLineItems';

export function countFullTotalPrice(lineItems: LineItem[]) {
  return lineItems.reduce((total, lineItem) => {
    total += extractTotalPriceFromLineItem(lineItem) * lineItem.quantity;
    return total;
  }, 0);
}
