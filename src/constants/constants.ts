const TIMEOUT_SHORT_MESSAGE = 2000
const TIMEOUT_ERROR_MESSAGE = 2000
const TIMEOUT_REDIRECT = 2100

const EVENT_NAMES = {
  VIEW_CHANGE: 'viewChangeEvents',
  CHANGE_USER_DATA: 'changeUserDataEvents',
  CHANGE_PASSWORD: 'changePasswordEvents',
  MANAGE_ADDRESSES: 'manageAddresses'
}

const EVENT_TYPE_NAMES = {
  COMMON_EVENTS: {
    COMMON_ERROR: 'commonError',
    INVALID_INPUT: 'errorInvalidInput'
  },
  PROFILE_EVENTS: {
    CHANGE_VIEW: {
      USER_INFO: 'userInfo',
      BILLING_ADDRESSES: 'billingAddresses',
      SHIPPING_ADDRESSES: 'shippingAddresses',
      PASSWORD_CHANGE: 'passwordChange'
    },
    CHANGE_USER_DATA: {
      SUCCESS: 'dataChangedSuccessfully',
      ERROR: 'DataChangeFailed',
      DUPLICATE_DATA: 'DuplicateData'
    },
    CHANGE_PASSWORD: {
      WRONG_PASSWORD: 'wrongPassword',
      SUCCESS: 'successChange',
      THE_SAME_PASSWORDS: 'samePasswords'
    },
    MANAGE_ADDRESSES: {
      ADD_ADDRESS: 'addAddress',
      CHANGE_VIEW_TO_EDIT: 'editAddress',
      CHANGE_VIEW_TO_READ: 'submitAddress',
      DELETE_ADDRESS: 'deleteAddress'
    }
  },
  AUTH_EVENTS: {}
} as const
type TUserProfileEventKeys = keyof typeof EVENT_TYPE_NAMES.PROFILE_EVENTS.CHANGE_VIEW
export type TUserProfileEventNames =
  (typeof EVENT_TYPE_NAMES.PROFILE_EVENTS.CHANGE_VIEW)[TUserProfileEventKeys]

export {
  TIMEOUT_SHORT_MESSAGE,
  TIMEOUT_ERROR_MESSAGE,
  TIMEOUT_REDIRECT,
  EVENT_TYPE_NAMES,
  EVENT_NAMES
}
