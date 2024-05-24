<template>
  <div class="form__item">
    <div class="form__label">Дом:</div>
    <input
      type="number"
      id="registration-building"
      :value="modelValue"
      @input="updateModelValue"
      name="building"
      placeholder="Номер дома"
      autocomplete="shipping street-line2"
      class="form__input input"
      :class="{
        invalid:
          (v$.modelValue.$dirty && !v$.modelValue.required.$response) ||
          (v$.modelValue.$dirty && !v$.modelValue.minLength.$response)
      }"
    />
    <div v-for="error of v$.modelValue.$errors" :key="error.$uid" class="invalid-message">
      {{ error.$message }}
    </div>
  </div>
</template>

<script lang="ts">
import useValidate from '@vuelidate/core'
import { required, helpers, minLength } from '@vuelidate/validators'

export default {
  name: 'InputBuilding',

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
      required: helpers.withMessage('Укажите номер дома', required),
      minLength: helpers.withMessage(`Укажите ${minLength(1).$params.min} цифр`, minLength(1))
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
