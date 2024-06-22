<template>
  <nav class="navigation">
    <ul class="navigation__list" v-if="!isLoggedIn">
      <li class="navigation__item">
        <RouterLink class="navigation__link" to="/authorization" @click="closeMobileMenu">
          Вход
        </RouterLink>
      </li>
      <li class="navigation__item" v-if="!isLoggedIn">
        <RouterLink class="navigation__link" to="/registration" @click="closeMobileMenu">
          Регистрация
        </RouterLink>
      </li>
    </ul>
    <ul class="navigation__list">
      <li class="navigation__item">
        <RouterLink class="navigation__link" to="/" @click="closeMobileMenu"> Главная </RouterLink>
      </li>
      <li class="navigation__item">
        <RouterLink class="navigation__link" to="/about" @click="closeMobileMenu">
          О нас
        </RouterLink>
      </li>
      <li class="navigation__item">
        <RouterLink class="navigation__link" to="/catalog" @click="closeMobileMenu">
          Каталог
        </RouterLink>
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

  methods: {
    closeMobileMenu() {
      this.$emit('closeMobileMenu');
    }
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 500;

  &__list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
    @extend %clear-ul;
    @extend %container-1100;

    &:first-child {
      margin: 0;
    }
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

@media (max-width: 765px) {
  .navigation {
    &__list {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
    }

    &__item,
    &__link {
      color: $color-white;
    }
  }
}
</style>
