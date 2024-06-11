<template>
  <nav class="side-nav">
    <ul class="side-nav__list">
      <li class="side-nav__item button-purple" @click="goToUserInfo">Общая информация</li>
      <li class="side-nav__item button-purple" @click="goToUserShippingAddresses">
        Адреса доставки
      </li>
      <li class="side-nav__item button-purple" @click="goToUserBillingAddresses">
        Платежные адреса
      </li>
      <li class="side-nav__item button-purple" @click="goToPasswordChange">Изменить пароль</li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { EVENT_TYPE_NAMES } from '@/constants/constants'

export default {
  name: 'ProfileNavigation',

  methods: {
    goToUserInfo() {
      this.$emit('switchView', EVENT_TYPE_NAMES.PROFILE_EVENTS.CHANGE_VIEW.USER_INFO)
    },
    goToUserBillingAddresses() {
      this.$emit('switchView', EVENT_TYPE_NAMES.PROFILE_EVENTS.CHANGE_VIEW.BILLING_ADDRESSES)
    },
    goToUserShippingAddresses() {
      this.$emit('switchView', EVENT_TYPE_NAMES.PROFILE_EVENTS.CHANGE_VIEW.SHIPPING_ADDRESSES)
    },
    goToPasswordChange() {
      this.$emit('switchView', EVENT_TYPE_NAMES.PROFILE_EVENTS.CHANGE_VIEW.PASSWORD_CHANGE)
    }
  }
}
</script>

<style scoped lang="scss">
.side-nav {
  width: 100%;

  &__list {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 7px;
    margin: 0;
    padding: 50px 0 0;
    width: 100%;
  }

  &__item {
    padding: 10px 0;
    width: 100%;
    border-radius: 5px;
    text-align: center;
    list-style: none;
    cursor: pointer;
  }
}
</style>
