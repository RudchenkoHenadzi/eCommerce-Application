<template>
  <div class="form__item">
    <div class="form__label">Пароль:</div>
    <div class="form__input-wrapper">
      <input
        :type="inputType"
        id="login-password"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        name="password"
        placeholder="Введите пароль"
        class="form__input input"
        :class="{
          invalid:
            (v$.modelValue.$dirty && !v$.modelValue.required.$response) ||
            (v$.modelValue.$dirty && !v$.modelValue.minLength.$response) ||
            (v$.modelValue.$dirty && !v$.modelValue.regexPassword.$response)
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

<script>
import useValidate from '@vuelidate/core'
import { required, helpers, minLength } from '@vuelidate/validators'
import EyeIconSVG from '@/Icons/EyeIconSVG.vue'
import EyeCrossedIconSVG from '@/Icons/EyeCrossedIconSVG.vue'

const regexPassword = helpers.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)

export default {
  name: 'InputName',

  components: {
    EyeIconSVG,
    EyeCrossedIconSVG
  },

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

  data() {
    return {
      inputType: 'password'
    }
  },

  validations: {
    modelValue: {
      required: helpers.withMessage('Введите пароль', required),
      minLength: helpers.withMessage(
        `Пароль должен быть больше ${minLength(8).$params.min} символов`,
        minLength(8)
      ),
      regexPassword: helpers.withMessage('Слабый пароль', regexPassword)
    }
  }
}
</script>
