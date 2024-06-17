<template>
  <div class="header__burger burger">
    <span class="burger__line line_1"></span>
    <span class="burger__line line_2"></span>
    <span class="burger__line line_3"></span>
  </div>
</template>

<script lang="ts">
export default {
  name: 'BurgerIcon'
};
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables';

.burger {
  position: relative;
  z-index: 10;
  display: none;
  height: 20px;
  width: 20px;
  cursor: pointer;

  &:hover .burger__line {
    background-color: transparent;
    border: 1px solid $color-purple;
  }

  &__line {
    display: block;
    height: 3px;
    width: 100%;
    background-color: $color-purple;
    position: absolute;
    transition: all 0.3s ease-in-out;
  }

  &.menu-open {
    .line_1 {
      transform: rotate(-45deg) translate(-6px, 6px);
      background-color: transparent;
      border: 1px solid $color-white;
    }

    .line_2 {
      opacity: 0;
    }

    .line_3 {
      transform: rotate(45deg) translate(-6px, -6px);
      background-color: transparent;
      border: 1px solid $color-white;
    }

    span:hover {
      box-shadow: 0 0 5px $color-white;
    }
  }
}

.line {
  &_1 {
    top: 0;
  }

  &_2 {
    top: 50%;
    transform: translateY(-50%);
  }
  &_3 {
    bottom: 0;
  }
}

@media (max-width: 765px) {
  .burger {
    display: block;
  }
}
</style>
