<template>
  <div class="form__item">
    <div class="form__label">Страна:</div>
    <input
      type="text"
      id="registration-country"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
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

<script>
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
  }
}
</script>
