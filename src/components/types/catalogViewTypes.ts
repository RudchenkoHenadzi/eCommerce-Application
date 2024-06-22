import type { Product } from '@commercetools/platform-sdk';
import type { Store } from 'pinia';
import type {
  IAppSettingsGetters,
  IAppSettingsState,
  TAppSettingsStoreId
} from '@/stores/types/appSettingsTypes';
import type {
  ICartsActions,
  ICartsGetters,
  ICartsState,
  TCartsStoreId
} from '@/stores/types/cartTypes';
import type {
  IAppStatusActions,
  IAppStatusGetters,
  IAppStatusState,
  TAppStatusStoreId
} from '@/stores/types/appStatusTypes';

export interface ICatalogViewData {
  products: Product[];
  appSettings: Store<TAppSettingsStoreId, IAppSettingsState, IAppSettingsGetters, {}>;
  cartsStore: Store<TCartsStoreId, ICartsState, ICartsGetters, ICartsActions>;
  appStatus: Store<TAppStatusStoreId, IAppStatusState, IAppStatusGetters, IAppStatusActions>;
  pageNumber: number;
  totalItems: number;
  isProductsLoading: boolean;
}
