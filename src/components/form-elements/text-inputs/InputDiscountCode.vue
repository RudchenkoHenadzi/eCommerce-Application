<template>
  <div class="form__item">
    <input
      type="text"
      :id="idName"
      :value="modelValue"
      @input="updateModelValue"
      name="discountCode"
      placeholder="Введите промокод"
      class="form__input input"
    />
    <DeleteIcon class="delete-icon" @click="deleteCode" />
  </div>
</template>

<script lang="ts">
import DeleteIcon from '@/Icons/DeleteIcon.vue';

export default {
  name: 'InputDiscountCode',
  components: { DeleteIcon },

  props: {
    modelValue: {
      type: String
    },
    blockName: String
  },

  methods: {
    updateModelValue(event: Event) {
      if (event.target && event.target instanceof HTMLInputElement) {
        const value = event.target.value;
        this.$emit('update:modelValue', value);
      }
    },
    deleteCode() {
      this.$emit('deleteCode');
    }
  },

  computed: {
    idName() {
      return `${this.blockName}-promocode`;
    }
  }
};
</script>

<style lang="scss">
.form__item {
  position: relative;
}
.delete-icon {
  position: absolute;
  top: 50%;
  right: 9px;
  transform: translateY(-50%);
  height: 30px;
  width: 30px;
  cursor: pointer;
}
</style>
