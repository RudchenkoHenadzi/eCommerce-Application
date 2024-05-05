<template>
  <form class="auth-form" @submit.prevent="submitForm">
    <fieldset class="auth-form__wrapper">
      <legend class="auth-form__title">{{ isRegistrationPage ? 'Регистрация' : 'Вход' }}</legend>
      <input
        type="text"
        id="login-email"
        v-model="email"
        placeholder="Введите email"
        :class="{
          invalid:
            (submitted && v$.email.required.$invalid) || (submitted && v$.email.email.$invalid)
        }"
        class="auth-form__input"
        @blur="v$.email.$touch"
      />

      <div class="auth-form__tooltip" v-if="submitted && v$.email.required.$invalid">
        Поле не должно быть пустым
      </div>
      <div class="auth-form__tooltip" v-else-if="submitted && v$.email.email.$invalid">
        Введите корректный email
      </div>

      <input
        type="text"
        id="login-password"
        v-model="password.password"
        placeholder="Введите пароль"
        class="auth-form__input"
      />

      <div class="auth-form__tooltip" v-if="submitted && v$.password.password.required.$invalid">
        Поле не должно быть пустым
      </div>
      <div
        class="auth-form__tooltip"
        v-else-if="submitted && v$.password.password.minLength.$invalid"
      >
        Пароль должен быть не менее 8 символов
      </div>

      <input
        v-if="isRegistrationPage"
        type="text"
        id="registration-confirm-password"
        v-model="password.confirm"
        placeholder="Повторите пароль"
        class="auth-form__input"
      />

      <button type="submit" class="auth-form__btn btn">
        {{ isRegistrationPage ? 'Зарегистрироваться' : 'Войти' }}
      </button>

      <div class="auth-form__switch-block switch-block">
        <span class="switch-block__text">{{
          isRegistrationPage ? 'Уже есть аккаунт?' : 'Нет аккаута?'
        }}</span>
        <button class="switch-block__btn">
          {{ isRegistrationPage ? 'Войти' : 'Зарегистрироваться' }}
        </button>
      </div>
    </fieldset>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import useValidate from '@vuelidate/core'
import { required, email, minLength, sameAs } from '@vuelidate/validators'

export default defineComponent({
  name: 'AuthorizationForm',
  data() {
    return {
      isRegistrationPage: false,
      v$: useValidate(),
      email: '',
      password: {
        password: '',
        confirm: ''
      },
      submitted: false
    }
  },
  validations() {
    if (this.isRegistrationPage) {
      return {
        email: { required, email },
        password: {
          password: { required, minLength: minLength(8) },
          confirm: { required, sameAs: sameAs(this.password.password) }
        }
      }
    } else {
      return {
        email: { required, email },
        password: {
          password: { required, minLength: minLength(8) }
        }
      }
    }
  },
  methods: {
    submitForm() {
      console.log(this.v$.email.email.$invalid)
      console.log(this.v$.email.required.$invalid)
      this.submitted = true
      if (this.v$.$invalid) {
        console.log('The input values are not valid!')
        this.v$.$touch()
        return false
      }
      console.log('Submitted!')
    }
  }
})
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
    gap: 32px;
    border: none;
  }

  &__title {
    margin-bottom: 30px;
    text-align: center;
    text-transform: uppercase;
  }

  &__input {
    @extend %transparent-input;
    width: 100%;

    &.invalid {
      border: 1px solid $color-orange-main;
    }

    &::placeholder {
      font-weight: 400;
      font-size: 16px;
      text-align: left;
      color: $transparent-white;
    }
  }

  &__btn {
    @extend %white-button;
    width: 100%;
  }

  &__tooltip {
    margin: -27px 0 -20px;
    font-size: 14px;
  }
}

.switch-block {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 5px;
  margin-top: -15px;

  &__btn {
    @extend %button-link;
    text-decoration: underline;
    text-underline-offset: 3px;
  }
}

@media (max-width: 630px) {
  .auth-form {
    &__title {
      margin-bottom: 15px;
    }

    &__input {
      height: 40px;
    }

    &__btn {
      height: 40px;
    }
  }
}

@media (max-width: 500px) {
  .auth-form {
    &__tooltip {
      font-size: 12px;
    }
  }

  .switch-block {
    flex-direction: column;
  }
}
</style>
