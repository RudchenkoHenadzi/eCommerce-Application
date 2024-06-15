<template>
  <div class="add-card">
    <PlusIcon class="add-card__icon" @click="addAddress" />
    <p class="add-card__text">{{ text }}</p>
  </div>
</template>

<script lang="ts">
import PlusIcon from '@/Icons/PlusIcon.vue';
import { EVENT_NAMES, EVENT_TYPE_NAMES } from '@/constants/constants';

export default {
  name: 'AddElementCard',

  components: { PlusIcon },

  props: {
    text: String
  },

  methods: {
    addAddress() {
      this.$emit(
        EVENT_NAMES.MANAGE_ADDRESSES,
        EVENT_TYPE_NAMES.PROFILE_EVENTS.MANAGE_ADDRESSES.CHANGE_VIEW_TO_EDIT
      );
    }
  }
};
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables';

.add-card {
  display: flex;
  justify-content: center;
  align-content: center;
  gap: 25px;
  margin-top: 15px;
  padding: 25px;
  border: 1px dashed $color-gray-200;
  border-radius: 10px;
  cursor: pointer;
  transform: none;
  transition:
    transform 0.3s ease-in-out,
    border 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
    border: 1px dashed $color-gray-600;
  }
}
</style>
