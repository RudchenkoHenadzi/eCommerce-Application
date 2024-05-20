<template>
  <form id="registration-form" class="form" @submit.prevent="submitRegistrationForm()">
    <div class="form__title">Регистрация</div>
    <div class="form__wrapper">
      <div class="form__row">
        <InputName v-model="registrationForm.firstName" />
        <InputLastName v-model="registrationForm.lastName" />
      </div>
      <InputDate v-model="registrationForm.dateOfBirth" />
      <div class="form__row">
        <InputEmail v-model="registrationForm.email" />
        <InputPassword v-model="registrationForm.password" />
      </div>
      <div class="form__row">
        <InputCity v-model="registrationForm.shippingAddress.city" />
        <InputStreet v-model="registrationForm.shippingAddress.streetName" />
      </div>
      <div class="form__row">
        <InputBuilding v-model="registrationForm.shippingAddress.building" />
        <InputApartment v-model="registrationForm.shippingAddress.apartment" />
      </div>
      <div class="form__row">
        <InputPotscode v-model="registrationForm.shippingAddress.postalCode" />
        <InputCountry v-model="registrationForm.shippingAddress.country" />
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
import InputBuilding from '@/components/form-elements/InputBuilding.vue'
import InputApartment from '@/components/form-elements/InputApartment.vue'

export default {
  name: 'RegistrationForm',

  components: {
    InputApartment,
    InputBuilding,
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
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        shippingAddress: {
          streetName: '',
          building: '',
          apartment: '',
          city: '',
          postalCode: '',
          country: 'Россия'
          // mobile: ''
        }
      }
    }
  },

  methods: {
    async submitRegistrationForm() {
      const result = await this.v$.registrationForm.$validate()
      if (result) {
        console.log('result')
        const { email, password, firstName, lastName, dateOfBirth, shippingAddress } =
          this.registrationForm
        const { country, postalCode, city, streetName, building, apartment } = shippingAddress
        console.log(
          email,
          password,
          firstName,
          lastName,
          dateOfBirth,
          country,
          postalCode,
          city,
          streetName,
          building,
          apartment
        )
        const shippingAddressDraft = {
          country,
          firstName,
          lastName,
          streetName,
          postalCode,
          city,
          building,
          apartment,
          email
        }
        const customerDraft = {
          email,
          firstname: firstName,
          lastname: lastName,
          password,
          dateOfBirth,
          addresses: [shippingAddressDraft],
          defaultShippingAddress: 0, // index of the default shipping address in the addresses array
          shippingAddresses: [0], // Indices of the shipping addresses in the addresses array
          defaultBillingAddress: 0, // Index of the address in the addresses array to use as the default billing address
          billingAddresses: [0] // Indices of the billing addresses in the addresses array
        }

        /* TODO if anonymousCart exist -> add
        *   anonymousCart: {
            id: {{ID}},
          },*/
        console.log('В форме ошибок нет, можем отправлять')
      } else {
        console.log('В форме есть ошибки')
      }
    }
    /*async submitRegistrationForm() {
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
    }*/
  }
}
</script>

<style scoped lang="scss">
#registration-form {
  margin-top: 50px;
}
</style>
