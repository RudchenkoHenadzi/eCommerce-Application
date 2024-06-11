<template>
  <div class="form__item">
    <div class="form__label">Улица:</div>
    <input
      type="text"
      :id="idName"
      :value="modelValue"
      @input="updateModelValue"
      name="street"
      autocomplete="address-line1"
      placeholder="Ваша улица"
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
<script lang="ts">
import useValidate from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'

export default {
  name: 'InputStreet',

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
      required: helpers.withMessage('Укажите улицу', required)
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
      return `${this.blockName}-street`
    }
  }
}
</script>
