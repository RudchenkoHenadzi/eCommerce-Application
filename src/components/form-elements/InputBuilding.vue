<template>
  <div class="form__item">
    <div class="form__label">Дом:</div>
    <input
      type="number"
      id="registration-building"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      name="building"
      placeholder="Номер дома"
      class="form__input input"
      :class="{
        invalid:
          (v$.modelValue.$dirty && !v$.modelValue.required.$response) ||
          (v$.modelValue.$dirty && !v$.modelValue.minLength.$response) ||
          (v$.modelValue.$dirty && !v$.modelValue.maxLength.$response)
      }"
    />
    <div v-for="error of v$.modelValue.$errors" :key="error.$uid" class="invalid-message">
      {{ error.$message }}
    </div>
  </div>
</template>

<script>
import useValidate from '@vuelidate/core'
import { required, helpers, minLength, maxLength } from '@vuelidate/validators'

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
      minLength: helpers.withMessage(`Укажите ${minLength(1).$params.min} цифр`, minLength(6)),
      maxLength: helpers.withMessage(`Укажите ${maxLength(6).$params.max} цифр`, maxLength(6))
    }
  }
}
</script>
