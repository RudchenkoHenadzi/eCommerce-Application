<template>
  <div class="form__block block shipping-address">
    <p class="block__title">{{ formTitle }}</p>
    <MyCheckbox
      :name="blockName"
      :id="blockName"
      v-model="setAddressDefault"
      text="Установить по-умолчанию"
    />
    <div class="form__row">
      <InputCity class="transparent-input" v-model="city" :block-name="blockName" />
      <InputStreet class="transparent-input" v-model="street" :block-name="blockName" />
    </div>
    <div class="form__row">
      <InputBuilding class="transparent-input" v-model="building" :block-name="blockName" />
      <InputApartment
        class="transparent-input"
        v-model="address.apartment"
        :block-name="blockName"
      />
    </div>
    <div class="form__row">
      <InputPotscode class="transparent-input" v-model="address.postCode" :block-name="blockName" />
      <InputCountry class="transparent-input" v-model="country" :block-name="blockName" />
    </div>

    <button type="submit" class="form__btn button-purple" @click="submitChanges">
      Добавить адрес
    </button>
    <button @click="cancelChanges">Отмена</button>
  </div>
</template>

<script lang="ts">
import InputBuilding from '@/components/form-elements/text-inputs/InputBuilding.vue';
import MyCheckbox from '@/components/form-elements/checkboxes/MyCheckbox.vue';
import InputPotscode from '@/components/form-elements/text-inputs/InputPotscode.vue';
import InputStreet from '@/components/form-elements/text-inputs/InputStreet.vue';
import InputCity from '@/components/form-elements/text-inputs/InputCity.vue';
import InputApartment from '@/components/form-elements/text-inputs/InputApartment.vue';
import InputCountry from '@/components/form-elements/text-inputs/InputCountry.vue';
import useValidate from '@vuelidate/core';
import { EVENT_TYPE_NAMES } from '@/constants/constants';
import { useAddressesStore } from '@/stores/AddressesStore';

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
    closeEventName: {
      type: String,
      required: true
    },
    blockName: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    isAddressDefault: Boolean,
    formTitle: String
  },

  data() {
    return {
      addressesStore: useAddressesStore()
    };
  },

  setup() {
    return {
      v$: useValidate()
    };
  },

  methods: {
    async submitChanges() {
      const validationResult = await this.v$.$validate();
      if (validationResult) {
        this.$emit(
          this.closeEventName,
          this.address.city,
          this.address.street,
          this.address.building,
          this.address.apartment,
          this.address.postCode
        );
      } else {
        this.$emit(this.closeEventName, EVENT_TYPE_NAMES.COMMON_EVENTS.INVALID_INPUT);
      }
    },
    cancelChanges() {
      this.$emit('cancelChanges');
    },
    updateValue(inputName: string, value: string) {
      this.$emit('updateValue', inputName, value);
    }
  },

  mounted() {
    this.addressesStore.resetSelectedAddress();
  },

  computed: {
    setAddressDefault: {
      get() {
        return this.isAddressDefault;
      },
      set(newValue: Boolean) {
        this.$emit('changeDefaultAddress', this.id, newValue);
      }
    },
    country() {
      return this.countryCode === 'RU' ? 'Россия' : 'Россия';
    }
  }
};
</script>

<style scoped lang="scss"></style>
