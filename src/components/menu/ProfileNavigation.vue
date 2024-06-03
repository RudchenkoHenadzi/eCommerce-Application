<template>
  <nav class="profile-nav">
    <ul class="profile-nav__list">
      <li class="profile-nav__item" @click="goToUserInfo">Общая информация</li>
      <li class="profile-nav__item" @click="goToUserCarts">Мои корзины</li>
      <li class="profile-nav__item" @click="goToUserBillingAddresses">Платежные адреса</li>
      <li class="profile-nav__item" @click="goToUserShippingAddresses">Адреса доставки</li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { USER_PROFILE_EVENTS } from '@/constants/constants'

export default {
  name: 'ProfileNavigation',
  methods: {
    goToUserInfo() {
      this.$emit('switchView', USER_PROFILE_EVENTS.USER_INFO)
    },
    goToUserCarts() {
      this.$emit('switchView', USER_PROFILE_EVENTS.USER_CARTS)
    },
    goToUserBillingAddresses() {
      this.$emit('switchView', USER_PROFILE_EVENTS.BILLING_ADDRESSES)
    },
    goToUserShippingAddresses() {
      this.$emit('switchView', USER_PROFILE_EVENTS.SHIPPING_ADDRESSES)
    }
  }
}
</script>

<style scoped lang="scss"></style>
