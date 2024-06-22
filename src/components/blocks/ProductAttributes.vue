<template>
  <ul class="attributes">
    <li v-if="onlyFirstAttributeVisible" class="attributes__item">{{ attributes[0].label }}</li>
    <li v-else class="attributes__item" v-for="attribute in attributes" :key="attribute.name">
      {{ attribute.label }}
    </li>
  </ul>
</template>

<script lang="ts">
export default {
  name: 'ProductAttributes',

  props: ['attributes', 'onlyFirstAttributeVisible']
};
</script>

<style scoped lang="scss">
.attributes {
  align-self: center;
  justify-self: flex-start;
  margin: 0;
  padding-left: 20px;
}
</style>
