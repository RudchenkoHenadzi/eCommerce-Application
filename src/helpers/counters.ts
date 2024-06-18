import type { LineItem } from '@commercetools/platform-sdk';
import { extractFullPriceFromLineItem } from '@/helpers/extractData/extractProductDataFromLineItems';

export function countFullTotalPrice(lineItems: LineItem[]) {
  return lineItems.reduce((total, lineItem) => {
    total += extractFullPriceFromLineItem(lineItem) * lineItem.quantity;
    return total;
  }, 0);
}
