<template>
  <div class="form__item">
    <div class="form__label">{{ labelName }}</div>
    <div class="form__input-wrapper">
      <input
        :type="inputType"
        :id="id"
        :value="modelValue"
        @input="updateModelValue"
        name="password"
        autocomplete="password"
        placeholder="Введите пароль"
        class="form__input input"
        :class="{
          invalid:
            (v$.modelValue.$dirty && !v$.modelValue.sameAs.$response) ||
            (v$.modelValue.$dirty && !v$.modelValue.required.$response)
        }"
      />
      <EyeIconSVG
        class="form__password-icon"
        @click="inputType = 'text'"
        v-if="inputType === 'password'"
      />
      <EyeCrossedIconSVG class="form__password-icon" @click="inputType = 'password'" v-else />
    </div>

    <div v-for="error of v$.modelValue.$errors" :key="error.$uid" class="invalid-message">
      {{ error.$message }}
    </div>
  </div>
</template>

<script lang="ts">
import useValidate from '@vuelidate/core';
import { helpers, required, sameAs } from '@vuelidate/validators';
import EyeIconSVG from '@/Icons/EyeIconSVG.vue';
import EyeCrossedIconSVG from '@/Icons/EyeCrossedIconSVG.vue';

export default {
  name: 'InputConfirmPassword',

  components: {
    EyeIconSVG,
    EyeCrossedIconSVG
  },

  props: {
    modelValue: {
      type: String
    },
    labelName: String,
    passwordToCompare: String,
    id: String
  },

  setup() {
    return {
      v$: useValidate()
    };
  },

  data() {
    return {
      inputType: 'password'
    };
  },

  validations() {
    return {
      modelValue: {
        sameAs: helpers.withMessage('Пароли должны совпадать', sameAs(this.passwordToCompare)),
        required: helpers.withMessage('Повторите новый пароль', required)
      }
    };
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
