<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import TheHeader from '@/components/TheHeader.vue'
</script>

<template>
  <TheHeader />
  <main>
    <RouterView />
  </main>
</template>

<style lang="scss" scoped>
@import './assets/styles/main.scss';
nav {
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 10px;
  a {
    color: black;
    text-decoration: none;
    &.router-link-active {
      color: orange;
    }
  }
}
</style>
