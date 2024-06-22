import type { Product } from '@commercetools/platform-sdk';
import { useAppSettingsStore } from '@/stores/AppSettingsStore';

export default function filterProducts(products: Product[]): Product[] {
  const appSettings = useAppSettingsStore();
  const currencyCode = appSettings.currency;
  return [...products].filter((product) => {
    if (product.masterData.current.masterVariant.prices) {
      const currencies = [];
      product.masterData.current.masterVariant.prices.forEach((price) => {
        if (price.value.currencyCode === currencyCode) {
          currencies.push(price);
        }
      });

      if (currencies.length > 0) {
        return product;
      }
    }
  });
}
