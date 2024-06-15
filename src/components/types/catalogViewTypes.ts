import type { Cart, Product } from '@commercetools/platform-sdk';
import type { Store } from 'pinia';
import type { IAppSettingsGetters, IAppSettingsState } from '@/stores/types/appSettingsTypes';
import type { ICartsGetters, ICartsState } from '@/stores/types/cartTypes';
import type {
  IAppStatusActions,
  IAppStatusGetters,
  IAppStatusState
} from '@/stores/types/appStatusTypes';

export interface ICatalogViewData {
  products: Product[];
  appSettings: Store<'appSettings', IAppSettingsState, IAppSettingsGetters, {}>;
  cartStore: Store<'carts', ICartsState, ICartsGetters, {}>;
  appStatus: Store<'appStatus', IAppStatusState, IAppStatusGetters, IAppStatusActions>;
  pageNumber: number;
  totalItems: number;
  isProductsLoading: boolean;
  userCurrentCart: Cart | undefined;
}
