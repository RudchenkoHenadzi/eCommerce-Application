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
        <RouterLink class="navigation__link" to="/authorization">Авторизация</RouterLink>
      </li>
      <li class="navigation__item">
        <RouterLink class="navigation__link" to="/catalog">Каталог</RouterLink>
      </li>
      <li class="navigation__item">
        <RouterLink class="navigation__link" to="/product">Продукт</RouterLink>
      </li>
      <li class="navigation__item">
        <RouterLink class="navigation__link" to="/cart-shopping">Корзина</RouterLink>
      </li>
      <li class="navigation__item">
        <RouterLink class="navigation__link" to="/user">Пользователь</RouterLink>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';
@import '@/assets/styles/extends.scss';
@import '@/assets/styles/fonts.scss';

.navigation {
  font-weight: 500;

  &__list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
    @extend %clear-ul;
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

.router-link-active {
  color: $color-purple;
}
</style>
