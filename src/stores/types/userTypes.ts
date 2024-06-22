import type { TCurrencyType } from '@/types/appSettingsTypes';
import type { Cart } from '@commercetools/platform-sdk';
import type { IUserCartIdItem } from '@/types/customerTypes';

export interface IUserState {
  userCurrentCart: Cart | null;
  userCartIds: Record<TCurrencyType, IUserCartIdItem>;
}

export interface IUserGetters {
  currentCart: Cart | null;
}
