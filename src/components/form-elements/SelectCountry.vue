<template>
  <div class="form__item">
    <div class="form__label">Страна:</div>
    <select
      :value="modelValue"
      @input="updateModelValue"
      name="country"
      class="form__input input"
      :class="{
        invalid: v$.modelValue.$dirty && !v$.modelValue.required.$response
      }"
    >
      <option value="RU" selected>Россия</option>
    </select>
    <div v-for="error of v$.modelValue.$errors" :key="error.$uid" class="invalid-message">
      {{ error.$message }}
    </div>
  </div>
</template>

<script lang="ts">
import useValidate from '@vuelidate/core'
import { helpers, required } from '@vuelidate/validators'

export default {
  name: 'SelectCountry',
  props: {
    modelValue: {
      type: String
    },
    blockName: String
  },

  setup() {
    return {
      v$: useValidate()
    }
  },

  validations: {
    modelValue: {
      required: helpers.withMessage('Укажите страну', required)
    }
  },
  methods: {
    updateModelValue(event: Event) {
      if (event.target && event.target instanceof HTMLInputElement) {
        const value = event.target.value
        this.$emit('update:modelValue', value)
      }
    }
  },
  computed: {
    idName() {
      return `${this.blockName}-country`
    }
  }
}
</script>

<style scoped lang="scss"></style>
