import type { Address } from '@commercetools/platform-sdk';

export function extractAddress(addresses: Address[], addressIds: string[]): Address[] {
  return addresses.reduce((acc: Address[], addressDraft: Address) => {
    if (addressDraft.id && addressIds.includes(addressDraft.id)) {
      acc.push(addressDraft);
    }
    return acc;
  }, []);
}
