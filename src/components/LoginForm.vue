<template>
  <form class="login-form" @submit.prevent="submitLoginForm($event)">
    <div class="login-form__title">Вход</div>
    <div class="login-form__wrapper">
      <div class="login-form__item">
        <div class="login-form__label">Email:</div>
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
          class="login-form__input input"
          name="email"
        />

        <div v-for="error of v$.loginForm.email.$errors" :key="error.$uid" class="invalid-message">
          {{ error.$message }}
        </div>
      </div>
      <div class="login-form__item">
        <div class="login-form__label">Пароль:</div>
        <input
          type="password"
          id="login-password"
          v-model="loginForm.password"
          name="password"
          placeholder="Введите пароль"
          class="login-form__input input"
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
    <button type="submit" class="login-form__btn button-white">Войти</button>
    <button class="login-form__switch" type="button" @click="$emit('switch-form')">
      Зарегистрироваться
    </button>
  </form>
</template>

<script lang="ts">
import axios from 'axios'
import useValidate from '@vuelidate/core'
import { required, email, helpers, minLength } from '@vuelidate/validators'
export default {
  name: 'LoginForm',

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
      }
    }
  },

  mounted() {
    const project_key = 'new-scooter-shop'
    const client_id = 'nIQtKu5DbKFGJAPVlE43KvqE'
    const secret = 'oK6UiBkjejjeYEZ25cvzF4xxzH8vC02j'
    const scope =
      'manage_cart_discounts:new-scooter-shop manage_types:new-scooter-shop manage_project_settings:new-scooter-shop manage_order_edits:new-scooter-shop manage_customer_groups:new-scooter-shop manage_categories:new-scooter-shop manage_products:new-scooter-shop manage_customers:new-scooter-shop manage_orders:new-scooter-shop manage_payments:new-scooter-shop manage_shipping_methods:new-scooter-shop manage_my_payments:new-scooter-shop manage_tax_categories:new-scooter-shop manage_shopping_lists:new-scooter-shop manage_my_profile:new-scooter-shop manage_extensions:new-scooter-shop manage_discount_codes:new-scooter-shop create_anonymous_token:new-scooter-shop manage_my_orders:new-scooter-shop manage_my_shopping_lists:new-scooter-shop'

    const API_URL = 'https://api.europe-west1.gcp.commercetools.com'
    const Auth_URL = 'https://auth.europe-west1.gcp.commercetools.com'

    axios
      .post(
        'https://auth.europe-west1.gcp.commercetools.com/oauth/token',
        'client_id=nIQtKu5DbKFGJAPVlE43KvqE&client_secret=oK6UiBkjejjeYEZ25cvzF4xxzH8vC02j&grant_type=client_credentials'
      )
      .then(function (response) {
        // handle success
        console.log(response)
      })
      .catch(function (error) {
        // handle error
        console.log(error)
      })
  },

  methods: {
    async submitLoginForm(event) {
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
        )
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

  &__switch {
    height: auto;
    color: $color-white;
  }
}
</style>
