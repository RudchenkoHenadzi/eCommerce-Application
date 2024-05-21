<template>
  <div class="form__item">
    <div class="form__label">Страна:</div>
    <input
      type="text"
      id="registration-country"
      :value="modelValue"
      @input="updateModelValue"
      name="country"
      placeholder="Страна"
      class="form__input input"
      :class="{
        invalid: v$.modelValue.$dirty && !v$.modelValue.required.$response
      }"
      disabled
    />
    <div v-for="error of v$.modelValue.$errors" :key="error.$uid" class="invalid-message">
      {{ error.$message }}
    </div>
  </div>
</template>

<script lang="ts">
import useValidate from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'

export default {
  name: 'InputCountry',

  props: {
    modelValue: {
      type: String
    }
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
  }
}
</script>
