import type { Price, Product } from '@commercetools/platform-sdk';
import type { TCurrencyType, TLangType } from '@/types/appSettingsTypes';
import { firstLetterUppercase } from '@/helpers/transformation/stringTransform';

export function extractProductPricesData(
  product: Product,
  currentCurrencyCode: TCurrencyType
): Price | {} {
  const prices = product.masterData.current.masterVariant.prices;
  let selectedPrice = {};
  if (prices) {
    prices.forEach((priceData) => {
      if (priceData.value.currencyCode === currentCurrencyCode) {
        selectedPrice = priceData;
      }
    });
  }
  return selectedPrice;
}

export function extractProductFullPrice(priceData: Price) {
  return priceData.value.centAmount;
}

export function extractDiscountedProductPrice(priceData: Price) {
  if (priceData.discounted) {
    return priceData.discounted.value.centAmount;
  } else {
    return 0;
  }
}

export function extractSrc(product: Product) {
  return product.masterData.current.masterVariant.images
    ? product.masterData.current.masterVariant.images[0]?.url
    : '';
}

export function extractProductDescription(product: Product, lang: TLangType) {
  return product.masterData.current.description ? product.masterData.current.description[lang] : '';
}

export function extractProductAttributes(product: Product, lang: TLangType) {
  const rawAttributes = product.masterData.current.masterVariant.attributes;
  if (rawAttributes) {
    return rawAttributes.reduce((acc: Record<string, string>[], attribute) => {
      if (attribute.name === 'productspec') {
        let label = [];
        if (attribute.value.label) {
          label = attribute.value.label[lang]
            .split('-')
            .filter((val: string) => val.trim() !== '')
            .map((val: string) => val.trim());
        } else if (attribute.value) {
          label = attribute.value[lang]
            .split('-')
            .filter((val: string) => val.trim() !== '')
            .map((val: string) => firstLetterUppercase(val.trim()));
        }
        label.forEach((labelItem: string) => {
          const formattedAttr = {
            name: attribute.name,
            key: `${attribute.value.key}-${labelItem}` || '',
            label: labelItem || ''
          };
          acc.push(formattedAttr);
        });
      } else if (attribute.name === 'color-filter') {
        let label = '';
        if (attribute.value.label) {
          label = attribute.value.label[lang];
        } else {
          label = attribute.value[lang];
        }
        if (label.charAt(0) !== '#') {
          const formattedAttr = {
            name: attribute.name,
            key: `${attribute.value.key}` || '',
            label: label || ''
          };
          acc.push(formattedAttr);
        }
      } else if (attribute.name === 'finish') {
        let label = '';
        if (attribute.value.label) {
          label = attribute.value.label[lang];
        } else {
          label = attribute.value[lang];
        }
        if (label.charAt(0) !== '#') {
          const formattedAttr = {
            name: attribute.name,
            key: `${attribute.value.key}` || '',
            label: label || ''
          };
          acc.push(formattedAttr);
        }
      } else if (attribute.name === 'finishlabel') {
        let label = '';
        if (attribute.value.label) {
          label = attribute.value.label[lang];
        } else {
          label = attribute.value[lang];
        }
        if (label.charAt(0) !== '#') {
          const formattedAttr = {
            name: attribute.name,
            key: `${attribute.value.key}` || '',
            label: label || ''
          };
          acc.push(formattedAttr);
        }
      } else if (attribute.name === 'color') {
        let label = '';
        if (attribute.value.label) {
          label = attribute.value.label[lang];
        } else {
          label = attribute.value[lang];
        }
        if (label.charAt(0) !== '#') {
          const formattedAttr = {
            name: attribute.name,
            key: `${attribute.value.key}` || '',
            label: label || ''
          };
          acc.push(formattedAttr);
        }
      } else {
        acc.push({});
      }
      return acc.filter((value) => Object.keys(value).length > 0);
    }, []);
  } else {
    return [];
  }
}

export function extractProductName(product: Product, lang: TLangType) {
  return (
    product.masterData.current.name[lang] || product.masterData.current.name[lang.split('-')[0]]
  );
}

export function extractProductId(product: Product) {
  return product.id || '';
}
