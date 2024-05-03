<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <RouterLink to="/authorization">Authorization</RouterLink>
      <RouterLink to="/catalog">Catalog</RouterLink>
      <RouterLink to="/product">Product</RouterLink>
      <RouterLink to="/cart-shopping">Cart shopping</RouterLink>
      <RouterLink to="/user">User</RouterLink>
    </nav>
  </header>

  <main>
    <RouterView />
  </main>
</template>

<style lang="scss" scoped>
nav {
  display: flex;
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
