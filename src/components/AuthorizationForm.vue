<template>
  <form class="auth-form" @submit.prevent="submitForm">
    <fieldset class="auth-form__wrapper">
      <legend class="auth-form__title">{{ isRegistrationPage ? 'Регистрация' : 'Вход' }}</legend>
      <input
        type="text"
        id="email"
        v-model="email"
        placeholder="Введите email"
        :class="{
          invalid:
            (submitted && v$.email.required.$invalid) || (submitted && v$.email.email.$invalid)
        }"
        class="auth-form__input"
        @blur="v$.email.$touch"
      />

      <div v-if="submitted && v$.email.required.$invalid">Поле не должно быть пустым</div>
      <div v-else-if="submitted && v$.email.email.$invalid">Введите корректный email</div>

      <input
        type="text"
        id="password"
        v-model="password.password"
        placeholder="Введите пароль"
        class="auth-form__input"
      />

      <div v-if="submitted && v$.password.password.required.$invalid">
        Поле не должно быть пустым
      </div>
      <div v-else-if="submitted && v$.password.password.minLength.$invalid">
        Пароль должен быть не менее 8 символов
      </div>
      <!-- TODO латиница, цифры, !-->

      <input
        v-if="isRegistrationPage"
        type="text"
        id="confirm-password"
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
        for (let i = 0; i < this.v$.$errors.length; i++) {
          console.log(this.v$.$errors[i])
          /*console.log('this.v$.email')
          console.log(this.v$.$errors[i].$uid)
          console.log(this.v$.$errors[i].$validator)
          console.log(this.v$.$errors[i].$property)
          console.log(this.v$.$errors[i].$message)*/
        }

        this.v$.$touch()
        return false
      }

      /*this.v$.$validate();
      if (this.v$.$error) {
        console.log('The input values are not valid!');
        console.log(this.v$.$error);
      } else {
        console.log('Submitted!');
      }*/
    }
  }
})
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';
@import '@/assets/styles/mixins.scss';
@import '@/assets/styles/extends.scss';

.auth-form {
  margin: 0 auto;
  padding: 50px;
  height: fit-content;
  max-width: 50vw;
  background-color: $color-purple;
  color: $color-white;

  &__wrapper {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 32px;
    width: 100%;
  }

  &__title {
    margin-bottom: 30px;
    text-align: center;
    text-transform: uppercase;
  }

  &__input {
    width: 100%;
    border-radius: 5px;
    padding: 15px 25px;
    height: 53px;
    background: rgba(255, 255, 255, 0.2);
    color: $color-white;
    font-size: 18px;

    &::placeholder {
      font-weight: 400;
      font-size: 16px;
      text-align: left;
      color: $transparent-white;
    }
  }

  &__btn {
    @include button;
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
