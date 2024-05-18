<template>
  <form class="login-form" @submit.prevent="submitLoginForm()">
    <div class="login-form__title">Вход</div>
    <div class="login-form__wrapper">
      <div class="login-form__item">
        <div class="login-form__label">Email:</div>
        <input
          type="email"
          id="login-email"
          v-model.trim="loginForm.email"
          placeholder="Введите email"
          :class="{
            invalid:
              (v$.loginForm.email.$dirty && !v$.loginForm.email.required.$response) ||
              (v$.loginForm.email.$dirty && !v$.loginForm.email.email.$response)
          }"
          class="login-form__input input"
          name="email"
        />

        <div v-for="error of v$.loginForm.email.$errors" :key="error.$uid" class="invalid-message">
          {{ error.$message }}
        </div>
      </div>
      <div class="login-form__item">
        <div class="login-form__label">Пароль:</div>
        <div class="login-form__input-wrapper">
          <input
            :type="inputType"
            id="login-password"
            v-model.trim="loginForm.password"
            name="password"
            placeholder="Введите пароль"
            class="login-form__input input"
            :class="{
              invalid:
                (v$.loginForm.password.$dirty && !v$.loginForm.password.required.$response) ||
                (v$.loginForm.password.$dirty && !v$.loginForm.password.minLength.$response) ||
                (v$.loginForm.password.$dirty && v$.loginForm.password.regexPassword.$response)
            }"
          />
          <EyeIconSVG
            class="login-form__password-icon"
            @click="inputType = 'text'"
            v-if="inputType === 'password'"
          />
          <EyeCrossedIconSVG
            class="login-form__password-icon"
            @click="inputType = 'password'"
            v-else
          />
        </div>

        <div
          v-for="error of v$.loginForm.password.$errors"
          :key="error.$uid"
          class="invalid-message"
        >
          {{ error.$message }}
        </div>
      </div>
    </div>
    <button type="submit" class="login-form__btn button-white">Войти</button>
    <RouterLink class="login-form__switch" to="/registration">Зарегистрироваться</RouterLink>
  </form>
</template>

<script lang="ts">
import axios from 'axios'
import useValidate from '@vuelidate/core'
import { required, email, helpers, minLength } from '@vuelidate/validators'
import EyeIconSVG from '@/Icons/EyeIconSVG.vue'
import EyeCrossedIconSVG from '@/Icons/EyeCrossedIconSVG.vue'

const regexPassword = helpers.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)

export default {
  name: 'LoginForm',

  components: {
    EyeIconSVG,
    EyeCrossedIconSVG
  },

  setup() {
    return {
      v$: useValidate()
    }
  },

  data() {
    return {
      loginForm: {
        email: '',
        password: ''
      },
      inputType: 'password'
    }
  },

  mounted() {},

  methods: {
    async submitLoginForm() {
      const result = await this.v$.loginForm.$validate()

      if (result) {
        axios
          .post('https://jsonplaceholder.typicode.com/posts')
          .then((response) => {
            console.log(response)
          })
          .catch((error) => {
            console.log(error)
          })
        console.log('В форме ошибок нет, можем отправлять')
      } else {
        console.log('В форме есть ошибки')
      }
    }
  },

  validations: {
    loginForm: {
      email: {
        required: helpers.withMessage('Введите email', required),
        email: helpers.withMessage('Не корректный email', email)
      },
      password: {
        required: helpers.withMessage('Введите пароль', required),
        minLength: helpers.withMessage(
          `Пароль должен быть больше ${minLength(8).$params.min} символов`,
          minLength(8)
        ),
        regexPassword: helpers.withMessage('Слабый пароль', regexPassword)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';
@import '@/assets/styles/mixins.scss';
@import '@/assets/styles/extends.scss';

.login-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  gap: 20px;
  width: 100%;
  max-width: 480px;
  padding: 30px 20px;
  background-color: $color-purple;
  color: $color-white;
  border-radius: 10px;

  @media (width <=480px) {
    border-radius: 0;
  }

  &__wrapper {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 20px;
    margin: 0;
    padding: 0;
    border: none;
  }

  &__title {
    font-size: 20px;
    text-align: center;
    text-transform: uppercase;
  }

  &__item {
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 100%;
  }

  &__input-wrapper {
    position: relative;
  }

  &__password-icon {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    width: 30px;
    fill: $color-white;
    cursor: pointer;
  }

  &__switch {
    height: auto;
    text-align: center;
    text-decoration: none;
    color: $color-white;
  }
}
</style>
