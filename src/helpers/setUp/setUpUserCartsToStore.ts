import type { TCurrencyType } from '@/types/appSettingsTypes';
import { APP_CURRENCIES } from '@/constants/projectConfigs';
import type { IUserCartIdItem } from '@/types/customerTypes';

const accumulator: Record<TCurrencyType, IUserCartIdItem> = {} as Record<
  TCurrencyType,
  IUserCartIdItem
>;

export default function setUpUserCartsToStore(
  currencyCodes: TCurrencyType[]
): Record<TCurrencyType, IUserCartIdItem> {
  return currencyCodes.reduce(
    (acc: Record<TCurrencyType, IUserCartIdItem>, currencyCode: TCurrencyType) => {
      acc[currencyCode] = {
        id: ''
      };
      return acc;
    },
    accumulator
  );
}

export const userCartIds = setUpUserCartsToStore(APP_CURRENCIES);
