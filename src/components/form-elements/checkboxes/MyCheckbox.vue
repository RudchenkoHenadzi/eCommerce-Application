<template>
  <div class="form__checkbox-container">
    <label :for="id">{{ text }}</label>
    <input
      type="checkbox"
      :id="id"
      :value="modelValue"
      @input="updateModelValue"
      :name="name"
      class="checkbox-container__input"
    />
    <div class="checkbox-container__switch"></div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'MyCheckbox',

  props: {
    modelValue: Boolean,
    id: String,
    name: String,
    text: String
  },

  methods: {
    updateModelValue(event: Event) {
      if (event.target && event.target instanceof HTMLInputElement) {
        const value = event.target.checked
        this.$emit('update:modelValue', value)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.form__checkbox-container {
  display: grid;
  grid-template-columns: 2fr 1fr;
  justify-content: space-between;
  align-items: center;
}

.checkbox-container {
  &__input:focus {
    box-shadow: none;
  }
}
</style>
