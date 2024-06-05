<template>
  <div class="profile">
    <h1 class="profile__title">Страница профиля пользователя</h1>
    <ProfileNavigation class="profile__nav" @switchView="switchViewHandler" />
    <UserDataBlock
      class="profile__content"
      v-if="viewName === USER_PROFILE_EVENTS.USER_INFO"
      @dataChangedSuccessfully="successDataChangeHandler"
      @DataChangeFailed="errorDataChangeHandler"
      @DuplicateData="duplicateDataHandler"
      :first-name="firstName"
      :last-name="lastName"
      :birth-date="birthDate"
      :email="email"
    />
    <AddressBlock
      class="profile__content"
      v-else-if="viewName === USER_PROFILE_EVENTS.SHIPPING_ADDRESSES"
      title="Адреса доставки"
      :addresses="shippingAddresses"
      :defaultAddressId="defaultShippingAddressId"
    />
    <AddressBlock
      class="profile__content"
      v-else-if="viewName === USER_PROFILE_EVENTS.BILLING_ADDRESSES"
      title="Платежные адреса"
      :addresses="billingAddresses"
      :defaultAddressId="defaultBillingAddressId"
    />
    <ChangePasswordBlock v-else />
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
  USER_PROFILE_EVENTS
} from '@/constants/constants'
import { useUserStore } from '@/stores/User'
import AddressBlock from '@/components/blocks/AddressBlock.vue'
import ChangePasswordBlock from '@/components/blocks/ChangePasswordBlock.vue'

export default {
  name: 'UserProfileView',

  computed: {
    USER_PROFILE_EVENTS() {
      return USER_PROFILE_EVENTS.VIEW_CHANGE
    }
  },

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
      viewName: USER_PROFILE_EVENTS.VIEW_CHANGE.USER_INFO as TUserProfileEventNames,
      userStore: useUserStore()
    }
  },

  methods: {
    getUserData() {
      try {
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
            this.shippingAddressIds = response.body.shippingAddressIds || []
            this.billingAddressIds = response.body.billingAddressIds || []
            this.shippingAddresses = extractAddress(this.addresses, this.shippingAddressIds)
            this.billingAddresses = extractAddress(this.addresses, this.billingAddressIds)
            this.defaultShippingAddressId = response.body.defaultShippingAddressId || ''
            this.defaultBillingAddressId = response.body.defaultBillingAddressId || ''
          }
        })
      } catch (e) {
        this.$emit('showAlert', MESSAGE_TEXTS.commonError, TIMEOUT_ERROR_MESSAGE)
      }
    },
    switchViewHandler(viewName: TUserProfileEventNames) {
      this.viewName = viewName
    },
    successDataChangeHandler() {
      this.$emit('showAlert', MESSAGE_TEXTS.PROFILE.successUpdateData, TIMEOUT_SHORT_MESSAGE)
    },
    errorDataChangeHandler() {
      this.$emit('showAlert', MESSAGE_TEXTS.commonError, TIMEOUT_ERROR_MESSAGE)
    },
    duplicateDataHandler() {
      this.$emit('showAlert', MESSAGE_TEXTS.PROFILE.duplicatedData, TIMEOUT_ERROR_MESSAGE)
    }
  },

  mounted() {
    this.getUserData()
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
  }
}
</style>
