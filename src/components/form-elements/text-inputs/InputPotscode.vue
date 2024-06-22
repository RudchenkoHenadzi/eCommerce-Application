<template>
  <div class="form__item">
    <div class="form__label">Почтовый индекс:</div>
    <input
      type="number"
      :id="idName"
      :value="modelValue"
      @input="updateModelValue"
      name="postcode"
      autocomplete="postal-code"
      placeholder="Почтовый индекс"
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

<script lang="ts">
import useValidate from '@vuelidate/core';
import { required, helpers, minLength, maxLength } from '@vuelidate/validators';

export default {
  name: 'InputPostcode',

  props: {
    modelValue: {
      type: String
    },
    blockName: String
  },

  setup() {
    return {
      v$: useValidate()
    };
  },

  validations: {
    modelValue: {
      required: helpers.withMessage('Укажите почтовый индекс', required),
      minLength: helpers.withMessage(`Укажите ${minLength(6).$params.min} цифр`, minLength(6)),
      maxLength: helpers.withMessage(`Укажите ${maxLength(6).$params.max} цифр`, maxLength(6))
    }
  },

  methods: {
    updateModelValue(event: Event) {
      if (event.target && event.target instanceof HTMLInputElement) {
        const value = event.target.value;
        this.$emit('update:modelValue', value);
      }
    }
  },

  computed: {
    idName() {
      return `${this.blockName}-post-code`;
    }
  }
};
</script>
