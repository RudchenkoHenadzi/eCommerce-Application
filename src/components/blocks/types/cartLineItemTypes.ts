import type { Store } from 'pinia';
import type {
  IAppStatusActions,
  IAppStatusGetters,
  IAppStatusState,
  TAppStatusStoreId
} from '@/stores/types/appStatusTypes';
import type {
  IAppSettingsActions,
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
import type { Product } from '@commercetools/platform-sdk';

export interface ICartLineItemData {
  appStatus: Store<TAppStatusStoreId, IAppStatusState, IAppStatusGetters, IAppStatusActions>;
  appSettings: Store<
    TAppSettingsStoreId,
    IAppSettingsState,
    IAppSettingsGetters,
    IAppSettingsActions
  >;
  cartsStore: Store<TCartsStoreId, ICartsState, ICartsGetters, ICartsActions>;
  product: undefined | Product;
  quantity: number;
}
