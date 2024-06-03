<template>
  <div class="profile">
    <h1>Страница профиля пользователя</h1>
    <ProfileNavigation @switchView="switchViewHandler" />
    <UserDataBlock
      v-if="viewName === USER_PROFILE_EVENTS.USER_INFO"
      :first-name="firstName"
      :last-name="lastName"
      :birth-date="birthDate"
      :email="email"
    />
    <ShippingAddressBlock
      v-else-if="viewName === USER_PROFILE_EVENTS.SHIPPING_ADDRESSES"
      :addresses="shippingAddresses"
    />
    <BillingAddressBlock v-else :addresses="billingAddresses" />
  </div>
</template>

<script lang="ts">
import ProfileNavigation from '@/components/menu/ProfileNavigation.vue'
import UserDataBlock from '@/components/blocks/UserDataBlock.vue'
import { getUserData } from '@/services/apiMethods/user/getUserData'
import type { Address } from '@commercetools/platform-sdk'
import { extractAddress } from '@/helpers/extractData/extractAddress'
import ShippingAddressBlock from '@/components/blocks/ShippingAddressBlock.vue'
import BillingAddressBlock from '@/components/blocks/BillingAddressBlock.vue'
import { MESSAGE_TEXTS } from '@/constants/texts'
import {
  TIMEOUT_ERROR_MESSAGE,
  type TUserProfileEventNames,
  USER_PROFILE_EVENTS
} from '@/constants/constants'

export default {
  name: 'UserProfileView',
  computed: {
    USER_PROFILE_EVENTS() {
      return USER_PROFILE_EVENTS
    }
  },
  components: { BillingAddressBlock, ShippingAddressBlock, UserDataBlock, ProfileNavigation },
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      birthDate: '',
      addresses: new Array<Address>(),
      shippingAddressIds: new Array<string>(),
      billingAddressIds: new Array<string>(),
      shippingAddresses: new Array<Address>(),
      billingAddresses: new Array<Address>(),
      isUserDataViewSelected: true,
      isShippingAddressesViewSelected: false,
      isBillingAddressesViewSelected: false,
      viewName: USER_PROFILE_EVENTS.USER_INFO as TUserProfileEventNames
    }
  },
  methods: {
    getUserData() {
      try {
        getUserData().then((response) => {
          if (response.statusCode === 200 || response.statusCode === 201) {
            console.log('response.body')
            console.log(response.body)
            this.email = response.body.email
            this.firstName = response.body.firstName || ''
            this.lastName = response.body.lastName || ''
            this.birthDate = response.body.dateOfBirth || ''
            this.addresses = response.body.addresses || []
            this.shippingAddressIds = response.body.shippingAddressIds || []
            this.billingAddressIds = response.body.billingAddressIds || []
            this.shippingAddresses = extractAddress(this.addresses, this.shippingAddressIds)
            this.billingAddresses = extractAddress(this.addresses, this.billingAddressIds)
          }
        })
      } catch (e) {
        this.$emit('showAlert', MESSAGE_TEXTS.commonError, TIMEOUT_ERROR_MESSAGE)
      }
    },
    switchViewHandler(viewName: TUserProfileEventNames) {
      this.viewName = viewName
    }
  },
  mounted() {
    this.getUserData()
  }
}
</script>

<style lang="scss" scoped>
.profile {
  padding: 20px;
  text-align: center;
}
</style>
