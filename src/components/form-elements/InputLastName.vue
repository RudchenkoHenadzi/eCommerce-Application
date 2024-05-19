<template>
  <div class="form__item">
    <div class="form__label">Фамилия:</div>
    <input
      type="text"
      id="registration-lastname"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      name="lastname"
      placeholder="Введите фамилию"
      class="form__input input"
      :class="{
        invalid:
          (v$.modelValue.$dirty && !v$.modelValue.required.$response) ||
          (v$.modelValue.$dirty && !v$.modelValue.regexSpecialSymbol.$response)
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

const regexSpecialSymbol = helpers.regex(/^[a-zA-Zа-яА-ЯёЁ]+$/)

export default {
  name: 'InputLastName',

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
      required: helpers.withMessage('Введите фамилию', required),
      regexSpecialSymbol: helpers.withMessage('Недопустимые символы', regexSpecialSymbol)
    }
  }
}
</script>
