<template>
  <form id="registration-form" class="form" @submit.prevent="submitRegistrationForm()">
    <div class="form__title">Регистрация</div>
    <div class="form__wrapper">
      <div class="form__block block base-info">
        <div class="form__row">
          <InputName v-model="registrationForm.firstName" />
          <InputLastName v-model="registrationForm.lastName" />
        </div>
        <InputDate v-model="registrationForm.dateOfBirth" />
        <div class="form__row">
          <InputEmail v-model="registrationForm.email" />
          <InputPassword v-model="registrationForm.password" />
        </div>
      </div>
      <div class="form__block block shipping-address">
        <p class="block__title">Адрес доставки</p>
        <MyCheckbox
          name="shipping"
          id="shipping-checkbox"
          text="Установить адресом доставки по-умолчанию"
        />
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
      <div class="form__block block billing-address">
        <p class="block__title">Платежный адрес</p>
        <MyCheckbox
          name="billing"
          id="billing-checkbox"
          text="Установить платежным адресом по-умолчанию"
        />
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
    </div>
    <button type="submit" class="form__btn button-white">Регистрация</button>
    <RouterLink class="form__switch" to="/authorization">Войти</RouterLink>
  </form>
</template>

<script lang="ts">
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
import apiRootStore from '@/stores/ApiRootStore'
import { createCustomerDraft } from '@/helpers/createDataSamples'
import MyRadio from '@/components/form-elements/radio/MyCheckbox.vue'
import MyCheckbox from '@/components/form-elements/radio/MyCheckbox.vue'

export default {
  name: 'RegistrationForm',

  components: {
    MyCheckbox,
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
      const result = await this.v$.$validate()
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
        /* TODO if anonymousCart exist -> add
        *   anonymousCart: {
            id: {{ID}},
          },*/
        const customerDraft = createCustomerDraft(
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
        apiRootStore.registerUser(customerDraft)
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
  margin-top: 30px;
}
</style>
