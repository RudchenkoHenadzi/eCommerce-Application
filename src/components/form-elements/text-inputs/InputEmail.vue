<template>
  <div class="form__item">
    <div class="form__label">Email:</div>
    <input
      type="email"
      id="login-email"
      :value="modelValue"
      @input="updateModelValue"
      name="email"
      autocomplete="email"
      placeholder="Введите email"
      :class="{
        invalid:
          (v$.modelValue.$dirty && !v$.modelValue.required.$response) ||
          (v$.modelValue.$dirty && !v$.modelValue.email.$response)
      }"
      class="form__input input"
    />

    <div v-for="error of v$.modelValue.$errors" :key="error.$uid" class="invalid-message">
      {{ error.$message }}
    </div>
  </div>
</template>

<script lang="ts">
import useValidate from '@vuelidate/core';
import { required, helpers, email } from '@vuelidate/validators';

export default {
  name: 'InputEmail',

  props: {
    modelValue: {
      type: String
    }
  },

  setup() {
    return {
      v$: useValidate()
    };
  },

  validations: {
    modelValue: {
      required: helpers.withMessage('Введите email', required),
      email: helpers.withMessage('Не корректный email', email)
    }
  },

  methods: {
    updateModelValue(event: Event) {
      if (event.target && event.target instanceof HTMLInputElement) {
        const value = event.target.value;
        this.$emit('update:modelValue', value);
      }
    }
  }
};
</script>
