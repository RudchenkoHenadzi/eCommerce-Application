import type { Product } from '@commercetools/platform-sdk';
import type { Store } from 'pinia';
import type { IAppSettingsGetters, IAppSettingsState } from '@/stores/types/appSettingsTypes';
import type { ICartsActions, ICartsGetters, ICartsState } from '@/stores/types/cartTypes';
import type {
  IAppStatusActions,
  IAppStatusGetters,
  IAppStatusState
} from '@/stores/types/appStatusTypes';

export interface ICatalogViewData {
  products: Product[];
  appSettings: Store<'appSettings', IAppSettingsState, IAppSettingsGetters, {}>;
  cartsStore: Store<'carts', ICartsState, ICartsGetters, ICartsActions>;
  appStatus: Store<'appStatus', IAppStatusState, IAppStatusGetters, IAppStatusActions>;
  pageNumber: number;
  totalItems: number;
  isProductsLoading: boolean;
}
