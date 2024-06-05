<template>
  <div class="form__block block shipping-address">
    <p class="block__title">{{ formTitle }}</p>
    <MyCheckbox
      :name="checkBoxNameAttr"
      :id="checkBoxId"
      v-model="isAddressDefault"
      :text="checkBoxLabel"
    />
    <div class="form__row">
      <InputCity class="transparent-input" v-model="address.city" :block-name="blockName" />
      <InputStreet class="transparent-input" v-model="address.street" :block-name="blockName" />
    </div>
    <div class="form__row">
      <InputBuilding class="transparent-input" v-model="address.building" :block-name="blockName" />
      <InputApartment
        class="transparent-input"
        v-model="address.apartment"
        :block-name="blockName"
      />
    </div>
    <div class="form__row">
      <InputPotscode class="transparent-input" v-model="address.postCode" :block-name="blockName" />
      <InputCountry class="transparent-input" v-model="address.country" :block-name="blockName" />
    </div>

    <button type="submit" class="form__btn button-purple" @click="submitChanges">
      Добавить адрес
    </button>
  </div>
</template>

<script lang="ts">
import InputBuilding from '@/components/form-elements/text-inputs/InputBuilding.vue'
import MyCheckbox from '@/components/form-elements/checkboxes/MyCheckbox.vue'
import InputPotscode from '@/components/form-elements/text-inputs/InputPotscode.vue'
import InputStreet from '@/components/form-elements/text-inputs/InputStreet.vue'
import InputCity from '@/components/form-elements/text-inputs/InputCity.vue'
import InputApartment from '@/components/form-elements/text-inputs/InputApartment.vue'
import InputCountry from '@/components/form-elements/text-inputs/InputCountry.vue'
import useValidate from '@vuelidate/core'
import { EVENT_TYPE_NAMES } from '@/constants/constants'

export default {
  name: 'AddressForm',

  components: {
    InputCountry,
    InputApartment,
    InputCity,
    InputStreet,
    InputPotscode,
    MyCheckbox,
    InputBuilding
  },

  props: {
    blockName: String,
    formTitle: String,
    checkBoxNameAttr: String,
    checkBoxId: String,
    checkBoxLabel: String,
    closeEventName: {
      type: String,
      required: true
    }
  },

  setup() {
    return {
      v$: useValidate()
    }
  },

  data() {
    return {
      isAddressDefault: false,
      address: {
        city: '',
        street: '',
        building: '',
        apartment: '',
        postCode: '',
        country: 'Россия'
      }
    }
  },

  methods: {
    async submitChanges() {
      const validationResult = await this.v$.$validate()
      if (validationResult) {
        this.$emit(
          this.closeEventName,
          this.address.city,
          this.address.street,
          this.address.building,
          this.address.apartment,
          this.address.postCode
        )
      } else {
        this.$emit(this.closeEventName, EVENT_TYPE_NAMES.COMMON_EVENTS.INVALID_INPUT)
      }
    }
  }
}
</script>

<style scoped lang="scss"></style>
