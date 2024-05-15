<template>
  <form class="registration-form" @submit.prevent="submitRegistrationForm($event)">
    <div class="registration-form__title">Регистрация</div>
    <div class="registration-form__wrapper">
      <div class="registration-form__item">
        <input
          type="email"
          id="login-email"
          v-model="registrationForm.email"
          placeholder="Введите email"
          :class="{
            invalid:
              (v$.registrationForm.email.$dirty && !v$.registrationForm.email.required.$response) ||
              (v$.registrationForm.email.$dirty && !v$.registrationForm.email.email.$response)
          }"
          class="registration-form__input input"
          name="email"
        />

        <div
          v-for="error of v$.registrationForm.email.$errors"
          :key="error.$uid"
          class="invalid-message"
        >
          {{ error.$message }}
        </div>
      </div>
      <div class="registration-form__item">
        <input
          type="password"
          id="registration-password"
          v-model="registrationForm.password"
          name="password"
          placeholder="Введите пароль"
          class="registration-form__input input"
          :class="{
            invalid:
              (v$.registrationForm.password.$dirty &&
                !v$.registrationForm.password.required.$response) ||
              (v$.registrationForm.password.$dirty &&
                !v$.registrationForm.password.minLength.$response)
          }"
        />
        <div
          v-for="error of v$.registrationForm.password.$errors"
          :key="error.$uid"
          class="invalid-message"
        >
          {{ error.$message }}
        </div>
      </div>
      <div class="registration-form__item">
        <input
          type="password"
          id="confirm-password"
          v-model="registrationForm.confirm"
          name="password"
          placeholder="Повторите пароль"
          class="registration-form__input input"
          :class="{
            invalid:
              (v$.registrationForm.confirm.$dirty &&
                !v$.registrationForm.confirm.required.$response) ||
              (v$.registrationForm.confirm.$dirty &&
                !v$.registrationForm.confirm.minLength.$response)
          }"
        />
        <div
          v-for="error of v$.registrationForm.confirm.$errors"
          :key="error.$uid"
          class="invalid-message"
        >
          {{ error.$message }}
        </div>
      </div>
    </div>
    <button type="submit" class="registration-form__btn button-white">Регистрация</button>
    <button class="registration-form__switch" type="button" @click="$emit('switch-form')">
      Войти
    </button>
  </form>
</template>

<script lang="ts">
import axios from 'axios'
import useValidate from '@vuelidate/core'
import { required, email, helpers, minLength } from '@vuelidate/validators'

export default {
  name: 'RegistrationForm',

  setup() {
    return {
      v$: useValidate()
    }
  },

  data() {
    return {
      registrationForm: {
        email: '',
        password: '',
        confirm: ''
      }
    }
  },

  methods: {
    async submitRegistrationForm(event) {
      const result = await this.v$.registrationForm.$validate()
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
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';
@import '@/assets/styles/mixins.scss';
@import '@/assets/styles/extends.scss';

.registration-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  gap: 20px;
  padding: 30px 20px;
  background-color: $color-purple;
  color: $color-white;
  border-radius: 10px;

  @media (width <=380px) {
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

  &__switch {
    height: auto;
    color: $color-white;
  }
}
</style>
