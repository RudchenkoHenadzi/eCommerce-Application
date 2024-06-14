<template>
  <div class="profile">
    <h1 class="profile__title">Страница профиля пользователя</h1>
    <ProfileNavigation class="profile__nav" @switchView="switchViewHandler" />
    <UserDataBlock
      v-if="viewName === USER_PROFILE_EVENTS.USER_INFO"
      @changeUserDataEvents="changeUserDataEventHandler"
      :first-name="firstName"
      :last-name="lastName"
      :birth-date="birthDate"
      :email="email"
    />
    <AddressBlock
      v-else-if="viewName === USER_PROFILE_EVENTS.SHIPPING_ADDRESSES"
      title="Адреса доставки"
      :addresses="shippingAddresses"
      block-name="shipping"
      :defaultAddressId="defaultShippingAddressId"
      text-to-add-button="Добавить еще адрес"
      @commonError="commonErrorHandler"
    />
    <AddressBlock
      v-else-if="viewName === USER_PROFILE_EVENTS.BILLING_ADDRESSES"
      title="Платежные адреса"
      :addresses="billingAddresses"
      block-name="billing"
      :defaultAddressId="defaultBillingAddressId"
      text-to-add-button="Добавить еще адрес"
      @commonError="commonErrorHandler"
    />
    <ChangePasswordBlock v-else @changePasswordEvents="changePasswordEventsHandler" />
  </div>
</template>

<script lang="ts">
import ProfileNavigation from '@/components/menu/ProfileNavigation.vue'
import UserDataBlock from '@/components/blocks/UserDataBlock.vue'
import { getUserData } from '@/services/apiMethods/user/getUserData'
import type { Address } from '@commercetools/platform-sdk'
import { extractAddress } from '@/helpers/extractData/extractAddress'
import { MESSAGE_TEXTS } from '@/constants/texts'
import {
  TIMEOUT_ERROR_MESSAGE,
  TIMEOUT_SHORT_MESSAGE,
  type TUserProfileEventNames,
  EVENT_TYPE_NAMES,
  TIMEOUT_REDIRECT
} from '@/constants/constants'
import { useUserStore } from '@/stores/User'
import AddressBlock from '@/components/blocks/AddressBlock.vue'
import ChangePasswordBlock from '@/components/blocks/ChangePasswordBlock.vue'
import { useAddressesStore } from '@/stores/AddressesStore'
import { useAppStatusStore } from '@/stores/AppStatusStore'

export default {
  name: 'UserProfileView',

  components: { ChangePasswordBlock, AddressBlock, UserDataBlock, ProfileNavigation },

  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      birthDate: '',
      version: 0,
      addresses: new Array<Address>(),
      shippingAddressIds: new Array<string>(),
      billingAddressIds: new Array<string>(),
      shippingAddresses: new Array<Address>(),
      billingAddresses: new Array<Address>(),
      defaultBillingAddressId: '',
      defaultShippingAddressId: '',
      isUserDataViewSelected: true,
      isShippingAddressesViewSelected: false,
      isBillingAddressesViewSelected: false,
      viewName: EVENT_TYPE_NAMES.PROFILE_EVENTS.CHANGE_VIEW.USER_INFO as TUserProfileEventNames,
      userStore: useUserStore(),
      addressesStore: useAddressesStore(),
      appStatus: useAppStatusStore()
    }
  },

  methods: {
    getUserData() {
      try {
        this.appStatus.startLoading()
        getUserData().then((response) => {
          if (response.statusCode === 200 || response.statusCode === 201) {
            this.email = response.body.email
            this.userStore.setUserMail(this.email)
            this.firstName = response.body.firstName || ''
            this.userStore.setUserFirstName(this.firstName)
            this.lastName = response.body.lastName || ''
            this.userStore.setUserLastName(this.lastName)
            this.birthDate = response.body.dateOfBirth || ''
            this.userStore.setUserBirthDate(this.birthDate)
            this.version = response.body.version
            this.userStore.setUserVersion(this.version)
            this.addresses = response.body.addresses || []
            this.addressesStore.addAddress(this.addresses)
            this.shippingAddressIds = response.body.shippingAddressIds || []
            this.addressesStore.addId('shipping', this.shippingAddressIds)
            this.billingAddressIds = response.body.billingAddressIds || []
            this.addressesStore.addId('billing', this.billingAddressIds)
            this.shippingAddresses = extractAddress(this.addresses, this.shippingAddressIds)
            this.billingAddresses = extractAddress(this.addresses, this.billingAddressIds)
            this.defaultShippingAddressId = response.body.defaultShippingAddressId || ''
            this.defaultBillingAddressId = response.body.defaultBillingAddressId || ''
          }
        })
      } catch (e) {
        this.$emit('showAlert', MESSAGE_TEXTS.COMMON.commonError, TIMEOUT_ERROR_MESSAGE)
      } finally {
        this.appStatus.stopLoading()
      }
    },
    switchViewHandler(viewName: TUserProfileEventNames) {
      this.viewName = viewName
    },
    changeUserDataEventHandler(eventType: string) {
      switch (eventType) {
        case EVENT_TYPE_NAMES.PROFILE_EVENTS.CHANGE_USER_DATA.SUCCESS: {
          this.$emit(
            'showAlert',
            MESSAGE_TEXTS.PROFILE.CHANGE_USER_DATA.successUpdateData,
            TIMEOUT_SHORT_MESSAGE
          )
          break
        }
        case EVENT_TYPE_NAMES.PROFILE_EVENTS.CHANGE_USER_DATA.DUPLICATE_DATA: {
          this.$emit(
            'showAlert',
            MESSAGE_TEXTS.PROFILE.CHANGE_USER_DATA.successUpdateData,
            TIMEOUT_ERROR_MESSAGE
          )
          break
        }
        default: {
          this.$emit('showAlert', MESSAGE_TEXTS.COMMON.commonError, TIMEOUT_ERROR_MESSAGE)
        }
      }
      this.$emit(
        'showAlert',
        MESSAGE_TEXTS.PROFILE.CHANGE_USER_DATA.successUpdateData,
        TIMEOUT_SHORT_MESSAGE
      )
    },
    changePasswordEventsHandler(eventType: string) {
      switch (eventType) {
        case EVENT_TYPE_NAMES.PROFILE_EVENTS.CHANGE_PASSWORD.SUCCESS: {
          this.$emit(
            'showAlert',
            MESSAGE_TEXTS.PROFILE.CHANGE_PASSWORD.successChange,
            TIMEOUT_SHORT_MESSAGE
          )
          setTimeout(() => {
            this.viewName = EVENT_TYPE_NAMES.PROFILE_EVENTS.CHANGE_VIEW.USER_INFO
          }, TIMEOUT_REDIRECT)
          break
        }
        case EVENT_TYPE_NAMES.COMMON_EVENTS.INVALID_INPUT: {
          this.$emit('showAlert', MESSAGE_TEXTS.COMMON.errorInvalidInput, TIMEOUT_ERROR_MESSAGE)
          break
        }
        case EVENT_TYPE_NAMES.PROFILE_EVENTS.CHANGE_PASSWORD.THE_SAME_PASSWORDS: {
          this.$emit(
            'showAlert',
            MESSAGE_TEXTS.PROFILE.CHANGE_PASSWORD.theSamePasswords,
            TIMEOUT_ERROR_MESSAGE
          )
          break
        }
        case EVENT_TYPE_NAMES.PROFILE_EVENTS.CHANGE_PASSWORD.WRONG_PASSWORD: {
          this.$emit(
            'showAlert',
            MESSAGE_TEXTS.PROFILE.CHANGE_PASSWORD.wrongPassword,
            TIMEOUT_SHORT_MESSAGE
          )
          break
        }
        default: {
          this.$emit('showAlert', MESSAGE_TEXTS.COMMON.commonError, TIMEOUT_ERROR_MESSAGE)
        }
      }
    },
    changeDefaultAddressHandler(addressType: string, id: string, isDefault: boolean) {
      let addressesBunch: string[] = []
      if (addressType === 'shipping') {
        addressesBunch = this.shippingAddressIds
      } else {
        addressesBunch = this.billingAddressIds
      }
      if (isDefault) {
        addressesBunch.push(id)
        return addressesBunch
      } else {
        return [...addressesBunch.filter((addressId: string) => addressId !== id)]
      }
    },
    commonErrorHandler() {
      this.$emit('showAlert', MESSAGE_TEXTS.COMMON.commonError, TIMEOUT_ERROR_MESSAGE)
    }
  },

  mounted() {
    this.getUserData()
  },

  computed: {
    USER_PROFILE_EVENTS() {
      return EVENT_TYPE_NAMES.PROFILE_EVENTS.CHANGE_VIEW
    }
  }
}
</script>

<style lang="scss" scoped>
.profile {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: 60px 1fr;
  grid-template-areas:
    'title title title title title'
    'nav content content content content';
  gap: 20px;
  padding: 20px;
  height: 90vh;
  width: 100%;
  text-align: center;

  &__title {
    grid-area: title;
  }

  &__nav {
    grid-area: nav;
  }

  &__content {
    grid-area: content;
    padding: 50px;
    background-color: #eaebed;
    border-radius: 15px;
    box-shadow: 5px 5px 10px darkgray;
  }
}
</style>
