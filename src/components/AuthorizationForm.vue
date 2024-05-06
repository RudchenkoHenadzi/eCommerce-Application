<template>
  <form class="auth-form" @submit.prevent="submitForm($event)">
    <fieldset class="auth-form__wrapper">
      <legend class="auth-form__title">{{ isRegistrationPage ? 'Регистрация' : 'Вход' }}</legend>
      <div class="auth-form__input-wrapper input-wrapper">
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
          class="input-wrapper__input input-transparent"
          name="email"
        />

        <div
          v-for="error of v$.loginForm.email.$errors"
          :key="error.$uid"
          class="input-wrapper__error"
        >
          {{ error.$message }}
        </div>
      </div>

      <div class="auth-form__input-wrapper input-wrapper">
        <input
          type="password"
          id="login-password"
          v-model="loginForm.password"
          name="password"
          placeholder="Введите пароль"
          class="input-wrapper__input input-transparent"
          :class="{
            invalid:
              (v$.loginForm.password.$dirty && !v$.loginForm.password.required.$response) ||
              (v$.loginForm.password.$dirty && !v$.loginForm.password.minLength.$response)
          }"
        />
        <div
          v-for="error of v$.loginForm.password.$errors"
          :key="error.$uid"
          class="input-wrapper__error"
        >
          {{ error.$message }}
        </div>
      </div>

      <input
        v-if="isRegistrationPage"
        type="password"
        id="registration-confirm-password"
        v-model="password.confirm"
        placeholder="Повторите пароль"
        name="password"
        class="input-wrapper__input input-transparent"
      />

      <button type="submit" class="auth-form__btn button-white">
        {{ isRegistrationPage ? 'Зарегистрироваться' : 'Войти' }}
      </button>

      <div class="auth-form__switch-block switch-block">
        <span class="switch-block__text">{{
          isRegistrationPage ? 'Уже есть аккаунт?' : 'Нет аккаута?'
        }}</span>
        <button class="switch-block__btn button-link">
          {{ isRegistrationPage ? 'Войти' : 'Зарегистрироваться' }}
        </button>
      </div>
    </fieldset>
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
      },
      email: '',
      password: {
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
  justify-content: center;
  align-items: center;
  padding: 30px 20px;
  background-color: $color-purple;
  color: $color-white;
  border-radius: 10px;
  & * {
    box-sizing: border-box;
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
    margin-bottom: 30px;
    font-size: 20px;
    text-align: center;
    text-transform: uppercase;
  }

  &__btn {
    height: 53px;
    width: 100%;
  }
}

.input-wrapper {
  width: 320px;

  &__input {
    margin-bottom: 5px;
    height: 53px;
    width: 100%;

    &::placeholder {
      font-weight: 400;
      font-size: 16px;
      text-align: left;
      color: $transparent-white;
    }
  }

  &__error {
    color: #d00000;
    text-shadow: 0 0 5px #eaebed;
    font-size: 16px;
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

@media (max-width: 630px) {
  .auth-form {
    &__wrapper {
      gap: 16px;
    }

    &__title {
      margin-bottom: 18px;
      font-size: 14px;
    }

    &__btn {
      height: 40px;
      padding: 10px 0;
    }
  }

  .input-wrapper {
    &__input {
      padding: 10px 0 10px 15px;
      height: 40px;
      font-size: 14px;
    }
  }
}

@media (max-width: 500px) {
  .input-wrapper {
    width: 250px;
    &__error {
      font-size: 12px;
    }
  }
}
</style>
