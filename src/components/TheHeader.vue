<script lang="ts">
import { RouterLink } from 'vue-router'

export default {
  name: 'TheHeader'
}
</script>
<template>
  <header class="header">
    <nav class="navigation">
      <ul class="navigation__list">
        <li class="navigation__item">
          <RouterLink class="navigation__link" to="/">Home</RouterLink>
        </li>
        <li class="navigation__item">
          <RouterLink class="navigation__link" to="/about">About</RouterLink>
        </li>
        <li class="navigation__item">
          <RouterLink class="navigation__link" to="/authorization">Authorization</RouterLink>
        </li>
        <li class="navigation__item">
          <RouterLink class="navigation__link" to="/catalog">Catalog</RouterLink>
        </li>
        <li class="navigation__item">
          <RouterLink class="navigation__link" to="/product">Product</RouterLink>
        </li>
        <li class="navigation__item">
          <RouterLink class="navigation__link" to="/cart-shopping">Cart shopping</RouterLink>
        </li>
        <li class="navigation__item">
          <RouterLink class="navigation__link" to="/user">User</RouterLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';
@import '@/assets/styles/extends.scss';
@import '@/assets/styles/fonts.scss';

.navigation {
  background: $color-bachground;
  &__list {
    display: flex;
    gap: 10px;
    padding: 10px 0;
    @extend %clear-ul;
    @extend %container-1100;
  }

  &__item {
  }

  &__link {
    font-size: 14px;
    color: $color-black;
    @extend %clear-a;
    &:hover {
      color: $color-purple;
    }
  }
}
</style>
