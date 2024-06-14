export interface IAppStatusState {
  indicatorStatus: boolean
}

export interface IAppStatusGetters {
  isDataLoading: boolean
}

export interface IAppStatusActions {
  startLoading: () => void
  stopLoading: () => void
}
