<script lang="ts">
export default {
  name: 'AlertMessage',
  props: {
    text: String
  },
  methods: {
    closeAlert() {
      this.$emit('closeAlert')
    }
  }
}
</script>

<template>
  <div class="layout">
    <div class="alert">
      <button class="alert__close" @click="closeAlert">X</button>
      <div class="alert__text">{{ text }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.layout {
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
}

.alert {
  position: relative;
  padding: 30px 50px;
  max-width: 300px;
  background-color: white;
  border-radius: 10px;
  text-align: center;

  &__close {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 15;
    height: auto;
    cursor: pointer;
  }
}
</style>
