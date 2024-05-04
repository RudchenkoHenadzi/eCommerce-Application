<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RegistrationForm',
  data() {
    return {
      email: '',
      password: ''
    }
  }
})
</script>

<template>
  <form class="auth-form">
    <fieldset class="auth-form__wrapper">
      <legend class="auth-form__title">Регистрация</legend>
      <input
        type="text"
        id="email"
        v-model="email"
        placeholder="Введите email"
        class="auth-form__input"
      />

      <input
        type="text"
        id="password"
        v-model="password"
        placeholder="Введите пароль"
        class="auth-form__input"
      />

      <button type="submit" class="auth-form__btn btn">Зарегистрироваться</button>

      <div class="auth-form__switch-block switch-block">
        <span class="switch-block__text">Уже есть аккаунт?</span>
        <button class="switch-block__btn">Войти</button>
      </div>
    </fieldset>
  </form>
</template>

<style scoped lang="scss">
.auth-form {
  margin: 0 auto;
  padding: 50px;
  height: fit-content;
  max-width: 50vw;
  background-color: $purple;
  color: $white;

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
    color: $white;
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
