<template>
  <div class="form__item">
    <div class="form__label">Дата рождения:</div>
    <input
      type="date"
      id="registration-date"
      :value="modelValue"
      @input="updateModelValue"
      name="date"
      autocomplete="bday"
      class="form__input input"
      :class="{
        invalid:
          (v$.modelValue.$dirty && !v$.modelValue.required.$response) ||
          (v$.modelValue.$dirty && !v$.modelValue.greaterThanCurrentAge.$response)
      }"
    />
    <div v-for="error of v$.modelValue.$errors" :key="error.$uid" class="invalid-message">
      {{ error.$message }}
    </div>
  </div>
</template>

<script lang="ts">
import useValidate from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import greaterThanCurrentAge from '@/helpers/bdayValidation'
import { ageForValigation } from '@/configs/project-configs'

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
      required: helpers.withMessage('Укажите вашу дату рождения', required),
      greaterThanCurrentAge: helpers.withMessage(
        `Пользователь должен быть старше ${ageForValigation} лет`,
        greaterThanCurrentAge
      )
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
