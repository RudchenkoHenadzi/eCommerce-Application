<template>
  <nav class="navigation">
    <ul class="navigation__list">
      <li class="navigation__item">
        <RouterLink class="navigation__link" to="/">Главная</RouterLink>
      </li>
      <li class="navigation__item">
        <RouterLink class="navigation__link" to="/about">О нас</RouterLink>
      </li>
      <li class="navigation__item">
        <RouterLink class="navigation__link" to="/catalog">Каталог</RouterLink>
      </li>
      <li class="navigation__item">
        <RouterLink class="navigation__link" to="/cart-shopping"
          >Корзина
          <span v-if="cartsStore.productCount" :key="cartsStore.currentCart?.id">{{
            cartsStore.productCount
          }}</span></RouterLink
        >
      </li>
      <li class="navigation__item" v-if="isLoggedIn">
        <RouterLink class="navigation__link" to="/user">Пользователь</RouterLink>
      </li>
      <li class="navigation__item" v-if="!isLoggedIn">
        <RouterLink class="navigation__link" to="/authorization">Вход</RouterLink>
      </li>
      <li class="navigation__item" v-if="!isLoggedIn">
        <RouterLink class="navigation__link" to="/registration">Регистрация</RouterLink>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { useUserStore } from '../../stores/User';
import { useCartsStore } from '@/stores/Carts';

export default {
  name: 'TheNavigation',

  data() {
    return {
      userStore: useUserStore(),
      cartsStore: useCartsStore()
    };
  },

  computed: {
    isLoggedIn() {
      return this.userStore.isLoggedIn;
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables';
@import '@/assets/styles/extends';
@import '@/assets/styles/fonts';

.navigation {
  font-weight: 500;
  background: $color-bachground;

  &__list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
    @extend %clear-ul;
    @extend %container-1100;
  }

  &__link {
    font-size: 14px;
    color: $color-black;
    @extend %clear-a;
    &:hover {
      color: $color-purple;
    }

    & span {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      padding: 3px;
      height: 20px;
      width: 20px;
      border-radius: 100%;
      background-color: $color-purple;
      color: $color-white;
    }
  }
}

.router-link-active {
  color: $color-purple;
}
</style>
