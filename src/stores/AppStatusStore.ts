import { defineStore } from 'pinia';
import { AppStatusStoreId } from '@/stores/types/appStatusTypes';

export const useAppStatusStore = defineStore(AppStatusStoreId, {
  state: (): {
    indicatorStatus: boolean;
  } => ({
    indicatorStatus: false
  }),
  getters: {
    isDataLoading: (state) => state.indicatorStatus
  },
  actions: {
    startLoading() {
      this.indicatorStatus = true;
    },
    stopLoading() {
      this.indicatorStatus = false;
    }
  }
});
