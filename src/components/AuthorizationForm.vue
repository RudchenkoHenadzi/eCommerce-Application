<template>
  <form class="auth-form" @submit.prevent="submitForm($event)">
    <div class="auth-form__title">Вход</div>
    <div class="auth-form__wrapper">
      <div class="auth-form__item">
        <input
          type="email"
          id="login-email"
          v-model="loginForm.email"
          placeholder="Введите email"
          :class="{
            invalid:
              (v$.loginForm.email.$dirty && !v$.loginForm.email.required.$response) ||
              (v$.loginForm.email.$dirty && !v$.loginForm.email.email.$response)
          }"
          class="auth-form__input input"
          name="email"
        />

        <div v-for="error of v$.loginForm.email.$errors" :key="error.$uid" class="invalid-message">
          {{ error.$message }}
        </div>
      </div>
      <div class="auth-form__item">
        <input
          type="password"
          id="login-password"
          v-model="loginForm.password"
          name="password"
          placeholder="Введите пароль"
          class="auth-form__input input"
          :class="{
            invalid:
              (v$.loginForm.password.$dirty && !v$.loginForm.password.required.$response) ||
              (v$.loginForm.password.$dirty && !v$.loginForm.password.minLength.$response)
          }"
        />
        <div
          v-for="error of v$.loginForm.password.$errors"
          :key="error.$uid"
          class="invalid-message"
        >
          {{ error.$message }}
        </div>
      </div>
    </div>

    <button type="submit" class="auth-form__btn button-white">Войти</button>
  </form>
</template>

<script lang="ts">
import axios from 'axios'
import useValidate from '@vuelidate/core'
import { required, email, helpers, minLength } from '@vuelidate/validators'

export default {
  name: 'AuthorizationForm',

  data() {
    return {
      isRegistrationPage: false,
      loginForm: {
        email: '',
        password: ''
      },
      registrationForm: {
        email: '',
        password: '',
        confirm: ''
      }
    }
  },

  setup() {
    return {
      v$: useValidate()
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
        )
      }
    },
    registrationForm: {
      email: {
        required: helpers.withMessage('Введите email', required),
        email: helpers.withMessage('Не корректный email', email)
      },
      password: {
        required: helpers.withMessage('Введите пароль', required),
        minLength: helpers.withMessage(
          `Пароль должен быть больше ${minLength(8).$params.min} символов`,
          minLength(8)
        )
      },
      confirm: {
        required: helpers.withMessage('Повторите пароль', required)
      }
    }
  },

  methods: {
    async submitForm(event) {
      const result = await this.v$.$validate()
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
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';
@import '@/assets/styles/mixins.scss';
@import '@/assets/styles/extends.scss';

.auth-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  gap: 20px;
  width: 100%;
  max-width: 380px;
  padding: 30px 20px;
  background-color: $color-purple;
  color: $color-white;
  border-radius: 10px;

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
}

.switch-block {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 5px;
  margin-top: -15px;

  &__btn {
    text-decoration: underline;
    text-underline-offset: 3px;
  }
}
</style>
