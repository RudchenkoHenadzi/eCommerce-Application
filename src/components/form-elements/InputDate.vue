<template>
  <div class="form__item">
    <div class="form__label">Дата рождения:</div>
    <input
      type="date"
      id="registration-date"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      name="date"
      class="form__input input"
      :class="{
        invalid: v$.modelValue.$dirty && !v$.modelValue.required.$response
      }"
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
  name: 'InputDate',

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
      required: helpers.withMessage('Укажите вашу дату рождения', required)
    }
  }
}
</script>
