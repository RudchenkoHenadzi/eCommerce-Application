const TIMEOUT_SHORT_MESSAGE = 2000
const TIMEOUT_ERROR_MESSAGE = 2000
const TIMEOUT_REDIRECT = 2100

const USER_PROFILE_EVENTS = {
  VIEW_CHANGE: {
    USER_INFO: 'userInfo',
    BILLING_ADDRESSES: 'billingAddresses',
    SHIPPING_ADDRESSES: 'shippingAddresses',
    PASSWORD_CHANGE: 'passwordChange'
  },
  DATA_CHANGE: {
    SUCCESS: 'dataChangedSuccessfully',
    ERROR: 'DataChangeFailed',
    DUPLICATE_DATA: 'DuplicateData'
  }
} as const
type TUserProfileEventKeys = keyof typeof USER_PROFILE_EVENTS.VIEW_CHANGE
export type TUserProfileEventNames = (typeof USER_PROFILE_EVENTS.VIEW_CHANGE)[TUserProfileEventKeys]

export { TIMEOUT_SHORT_MESSAGE, TIMEOUT_ERROR_MESSAGE, TIMEOUT_REDIRECT, USER_PROFILE_EVENTS }
