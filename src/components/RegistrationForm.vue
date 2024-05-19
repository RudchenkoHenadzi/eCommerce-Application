<template>
  <form id="registration-form" class="form" @submit.prevent="submitRegistrationForm()">
    <div class="form__title">Регистрация</div>
    <div class="form__wrapper">
      <div class="form__row">
        <InputName v-model="registrationForm.name" />
        <InputLastName v-model="registrationForm.lastname" />
      </div>
      <InputDate v-model="registrationForm.date" />
      <div class="form__row">
        <InputEmail v-model="registrationForm.email" />
        <InputPassword v-model="registrationForm.password" />
      </div>
      <div class="form__row">
        <InputCity v-model="registrationForm.city" />
        <InputStreet v-model="registrationForm.street" />
      </div>
      <div class="form__row">
        <InputPotscode v-model="registrationForm.postcode" />
        <InputCountry v-model="registrationForm.country" />
      </div>
    </div>
    <button type="submit" class="form__btn button-white">Регистрация</button>
    <RouterLink class="form__switch" to="/authorization">Войти</RouterLink>
  </form>
</template>

<script lang="ts">
import axios from 'axios'
import useValidate from '@vuelidate/core'
import InputName from '@/components/form-elements/InputName.vue'
import InputLastName from '@/components/form-elements/InputLastName.vue'
import InputDate from '@/components/form-elements/InputDate.vue'
import InputEmail from '@/components/form-elements/InputEmail.vue'
import InputPassword from '@/components/form-elements/InputPassword.vue'
import InputStreet from '@/components/form-elements/InputStreet.vue'
import InputCity from '@/components/form-elements/InputCity.vue'
import InputPotscode from '@/components/form-elements/InputPotscode.vue'
import InputCountry from '@/components/form-elements/InputCountry.vue'

export default {
  name: 'RegistrationForm',

  components: {
    InputName,
    InputLastName,
    InputDate,
    InputEmail,
    InputPassword,
    InputStreet,
    InputCity,
    InputPotscode,
    InputCountry
  },

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
        name: '',
        lastname: '',
        date: '',
        street: '',
        city: '',
        postcode: '',
        country: 'Россия'
      }
    }
  },

  methods: {
    async submitRegistrationForm() {
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
#registration-form {
  margin-top: 50px;
}
</style>
