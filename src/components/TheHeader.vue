<template>
  <header class="header">
    <div class="header-wrapper">
      <TheNavigation />
      <div>Имя пользователя</div>
    </div>
  </header>
</template>

<script lang="ts">
import TheNavigation from '@/components/TheNavigation.vue'

export default {
  name: 'TheHeader',
  components: {
    TheNavigation
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';
@import '@/assets/styles/extends.scss';

.header {
  background: $color-bachground;
}

.header-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  @extend %container-1100;
}
</style>
