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
          v-model="registrationForm.isShippingAddressDefault"
          text="Установить адресом доставки по-умолчанию"
        />
        <div class="form__row">
          <InputCity
            v-model="registrationForm.shippingAddress.shippingCity"
            block-name="shipping"
          />
          <InputStreet
            v-model="registrationForm.shippingAddress.shippingStreetName"
            block-name="shipping"
          />
        </div>
        <div class="form__row">
          <InputBuilding
            v-model="registrationForm.shippingAddress.shippingBuilding"
            block-name="shipping"
          />
          <InputApartment
            v-model="registrationForm.shippingAddress.shippingApartment"
            block-name="shipping"
          />
        </div>
        <div class="form__row">
          <InputPotscode
            v-model="registrationForm.shippingAddress.shippingPostalCode"
            block-name="shipping"
          />
          <InputCountry
            v-model="registrationForm.shippingAddress.shippingCountry"
            block-name="shipping"
          />
        </div>
      </div>
      <MyCheckbox
        name="sameAddresses"
        id="same-addresses-checkbox"
        text="Адрес доставки совпадает с платежным адресом"
        v-model="registrationForm.areBothAddressesSame"
      />
      <div class="form__block block billing-address">
        <p class="block__title">Платежный адрес</p>
        <MyCheckbox
          name="billing"
          id="billing-checkbox"
          v-model="registrationForm.isBillingAddressDefault"
          text="Установить платежным адресом по-умолчанию"
        />
        <div class="form__row">
          <InputCity v-model="billingAddressCity" block-name="billing" />
          <InputStreet v-model="billingAddressStreetName" block-name="billing" />
        </div>
        <div class="form__row">
          <InputBuilding v-model="billingAddressBuilding" block-name="billing" />
          <InputApartment v-model="billingAddressApartment" block-name="billing" />
        </div>
        <div class="form__row">
          <InputPotscode v-model="billingAddressPostalCode" block-name="billing" />
          <InputCountry v-model="billingAddressCountry" block-name="billing" />
        </div>
      </div>
    </div>
    <button type="submit" class="form__btn button-white">Регистрация</button>
    <RouterLink class="form__switch" to="/authorization">Войти</RouterLink>
  </form>
</template>

<script lang="ts">
import useValidate from '@vuelidate/core'
import InputName from '@/components/form-elements/text-inputs/InputName.vue'
import InputLastName from '@/components/form-elements/text-inputs/InputLastName.vue'
import InputDate from '@/components/form-elements/text-inputs/InputDate.vue'
import InputEmail from '@/components/form-elements/text-inputs/InputEmail.vue'
import InputPassword from '@/components/form-elements/text-inputs/InputPassword.vue'
import InputStreet from '@/components/form-elements/text-inputs/InputStreet.vue'
import InputCity from '@/components/form-elements/text-inputs/InputCity.vue'
import InputPotscode from '@/components/form-elements/text-inputs/InputPotscode.vue'
import InputCountry from '@/components/form-elements/text-inputs/InputCountry.vue'
import InputBuilding from '@/components/form-elements/text-inputs/InputBuilding.vue'
import InputApartment from '@/components/form-elements/text-inputs/InputApartment.vue'
import MyCheckbox from '@/components/form-elements/checkboxes/MyCheckbox.vue'
import { createCustomerDraft, createAddressDraft } from '@/helpers/createDataSamples'
import type { IAddressConfiguration, IAddressDraft } from '@/types/customer-types'
import { useApiRootStore } from '@/stores/ApiRoot'

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
          shippingStreetName: '',
          shippingBuilding: '',
          shippingApartment: '',
          shippingCity: '',
          shippingPostalCode: '',
          shippingCountry: 'Россия'
        },
        billingAddress: {
          billingStreetName: '',
          billingBuilding: '',
          billingApartment: '',
          billingCity: '',
          billingPostalCode: '',
          billingCountry: 'Россия'
        },
        isBillingAddressDefault: false,
        isShippingAddressDefault: false,
        areBothAddressesSame: false
      }
    }
  },
  methods: {
    async submitRegistrationForm() {
      const result = await this.v$.$validate()

      if (result) {
        const {
          email,
          password,
          firstName,
          lastName,
          dateOfBirth,
          shippingAddress,
          billingAddress
        } = this.registrationForm
        const {
          shippingPostalCode,
          shippingCity,
          shippingStreetName,
          shippingBuilding,
          shippingApartment
        } = shippingAddress
        /* TODO if anonymousCart exist -> add
        *   anonymousCart: {
            id: {{ID}},
          },*/
        const shippingAddressDraft = createAddressDraft(
          firstName,
          lastName,
          email,
          shippingPostalCode,
          shippingCity,
          shippingStreetName,
          shippingBuilding,
          shippingApartment
        )
        const addresses: IAddressDraft[] = [shippingAddressDraft]

        if (!this.registrationForm.areBothAddressesSame) {
          const {
            billingPostalCode,
            billingCity,
            billingStreetName,
            billingBuilding,
            billingApartment
          } = billingAddress
          const billingAddressDraft = createAddressDraft(
            firstName,
            lastName,
            email,
            billingPostalCode,
            billingCity,
            billingStreetName,
            billingBuilding,
            billingApartment
          )
          addresses.push(billingAddressDraft)
        }
        const { billingAddressIndex, defaultBillingAddressIndex } = this.checkBillingIndexes()
        const addressesConfiguration = this.createAddressesConfiguration(
          this.registrationForm.isShippingAddressDefault,
          billingAddressIndex,
          defaultBillingAddressIndex
        )

        const customerDraft = createCustomerDraft(
          email,
          password,
          firstName,
          lastName,
          dateOfBirth,
          addresses,
          addressesConfiguration
        )
        const apiRoot = useApiRootStore()
        try {
          const response = await apiRoot.registerUser(customerDraft)

          if (response && 'statusCode' in response) {
            if (response.statusCode === 201) {
              this.$emit('successRegistrationEvent', { email: email })
            } else if (response.statusCode === 400) {
              this.$emit('errorUserExists')
            } else {
              this.$emit('errorFailedRequest')
            }
          } else {
            this.$emit('errorFailedRequest')
          }
        } catch (error) {
          this.$emit('errorFailedRequest', error)
        }
      } else {
        this.$emit('errorInvalidInput')
      }
    },
    checkBillingIndexes() {
      let billingAddressIndex = -1
      let defaultBillingAddressIndex = -1
      if (this.registrationForm.areBothAddressesSame) {
        billingAddressIndex = 0
        if (this.registrationForm.isBillingAddressDefault) {
          defaultBillingAddressIndex = 0
        }
      } else {
        billingAddressIndex = 1
        if (this.registrationForm.isBillingAddressDefault) {
          defaultBillingAddressIndex = 1
        }
      }
      return { billingAddressIndex, defaultBillingAddressIndex }
    },
    createAddressesConfiguration(
      isShippingAddressDefault: boolean,
      billingBaseIndex: number,
      billingDefaultIndex: number
    ) {
      const addressesConfiguration: IAddressConfiguration = {
        shippingAddresses: [0]
      }
      if (isShippingAddressDefault) {
        addressesConfiguration.defaultShippingAddress = 0
      }
      if (billingBaseIndex >= 0) {
        addressesConfiguration.billingAddresses = [billingBaseIndex]
      }
      if (billingDefaultIndex >= 0) {
        addressesConfiguration.defaultBillingAddress = billingDefaultIndex
      }
      return addressesConfiguration
    }
  },
  computed: {
    billingAddressStreetName: {
      get(): string {
        return this.registrationForm.areBothAddressesSame
          ? this.registrationForm.shippingAddress.shippingStreetName
          : this.registrationForm.billingAddress.billingStreetName
      },
      set(newValue: string) {
        if (this.registrationForm.areBothAddressesSame) {
          this.registrationForm.billingAddress.billingStreetName =
            this.registrationForm.shippingAddress.shippingStreetName
        } else {
          this.registrationForm.billingAddress.billingStreetName = newValue
        }
      }
    },
    billingAddressBuilding: {
      get(): string {
        return this.registrationForm.areBothAddressesSame
          ? this.registrationForm.shippingAddress.shippingBuilding
          : this.registrationForm.billingAddress.billingBuilding
      },
      set(newValue: string) {
        if (this.registrationForm.areBothAddressesSame) {
          this.registrationForm.billingAddress.billingBuilding =
            this.registrationForm.shippingAddress.shippingBuilding
        } else {
          this.registrationForm.billingAddress.billingBuilding = newValue
        }
      }
    },
    billingAddressApartment: {
      get(): string {
        return this.registrationForm.areBothAddressesSame
          ? this.registrationForm.shippingAddress.shippingApartment
          : this.registrationForm.billingAddress.billingApartment
      },
      set(newValue: string) {
        if (this.registrationForm.areBothAddressesSame) {
          this.registrationForm.billingAddress.billingApartment =
            this.registrationForm.shippingAddress.shippingApartment
        } else {
          this.registrationForm.billingAddress.billingApartment = newValue
        }
      }
    },
    billingAddressCity: {
      get(): string {
        return this.registrationForm.areBothAddressesSame
          ? this.registrationForm.shippingAddress.shippingCity
          : this.registrationForm.billingAddress.billingCity
      },
      set(newValue: string) {
        if (this.registrationForm.areBothAddressesSame) {
          this.registrationForm.billingAddress.billingCity =
            this.registrationForm.shippingAddress.shippingCity
        } else {
          this.registrationForm.billingAddress.billingCity = newValue
        }
      }
    },
    billingAddressPostalCode: {
      get(): string {
        return this.registrationForm.areBothAddressesSame
          ? this.registrationForm.shippingAddress.shippingPostalCode
          : this.registrationForm.billingAddress.billingPostalCode
      },
      set(newValue: string) {
        if (this.registrationForm.areBothAddressesSame) {
          this.registrationForm.billingAddress.billingPostalCode =
            this.registrationForm.shippingAddress.shippingPostalCode
        } else {
          this.registrationForm.billingAddress.billingPostalCode = newValue
        }
      }
    },
    billingAddressCountry: {
      get(): string {
        return this.registrationForm.areBothAddressesSame
          ? this.registrationForm.shippingAddress.shippingCountry
          : this.registrationForm.billingAddress.billingCountry
      },
      set(newValue: string) {
        if (this.registrationForm.areBothAddressesSame) {
          this.registrationForm.billingAddress.billingCountry =
            this.registrationForm.shippingAddress.shippingCountry
        } else {
          this.registrationForm.billingAddress.billingCountry = newValue
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
#registration-form {
  margin-top: 30px;
}
</style>
