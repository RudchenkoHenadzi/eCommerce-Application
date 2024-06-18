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

export function extractFullPriceFromLineItem(lineItem: LineItem) {
  return lineItem.price.value.centAmount;
}

export function extractActualProductPriceFromLineItem(lineItem: LineItem) {
  return lineItem.price.discounted
    ? lineItem.price.discounted.value.centAmount
    : lineItem.price.value.centAmount;
}

export function extractDiscountedPriceFromLineItem(lineItem: LineItem) {
  return extractDiscountedProductPrice(lineItem.price);
}

export function extractAllProductsFullPrice(lineItems: LineItem[]) {
  return lineItems.reduce((total, lineItem) => {
    total +=
      extractDiscountedPriceFromLineItem(lineItem) * lineItem.quantity ||
      extractFullPriceFromLineItem(lineItem) * lineItem.quantity;
    return total;
  }, 0);
}

export function extractActualProductPrice(lineItem?: LineItem) {
  if (lineItem) {
    return lineItem.price.discounted
      ? lineItem.price.discounted.value.centAmount
      : lineItem.price.value.centAmount;
  }
  return 0;
}

export function extractProductPriceWithPromo(lineItem?: LineItem) {
  if (lineItem) {
    return lineItem.discountedPricePerQuantity[0].discountedPrice.value.centAmount;
  }
  return 0;
}

export function extractFullProductPrice(lineItem: LineItem) {
  return lineItem.discountedPricePerQuantity[0].discountedPrice.value.centAmount;
}
