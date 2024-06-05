<template>
  <div class="user__about about">
    <div class="about__name"><span>Имя: </span> {{ firstName }}</div>
    <div class="about__lastName"><span>Фамилия: </span> {{ lastName }}</div>
    <div class="about__birthDate"><span>Дата рождения: </span> {{ birthDate }}</div>
    <div class="about__email"><span>Email: </span> {{ email }}</div>
    <PencilIcon class="about__edit-btn" @click="switchEditMode" />
  </div>
</template>

<script lang="ts">
import { useUserStore } from '@/stores/User'
import PencilIcon from '@/Icons/PencilIcon.vue'

export default {
  name: 'ReadUserDataBlock',

  components: { PencilIcon },

  data() {
    return {
      userStore: useUserStore()
    }
  },

  methods: {
    switchEditMode() {
      this.$emit('editModeOn')
    }
  },

  computed: {
    firstName() {
      return this.userStore.firstName
    },
    lastName() {
      return this.userStore.lastName
    },
    birthDate() {
      return this.userStore.birthDate
    },
    email() {
      return this.userStore.email
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables';

.about {
  grid-area: about;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
  padding: 15px;
  background-color: $color-white;
  border-radius: 10px;

  &__name,
  &__lastName,
  &__birthDate,
  &__email {
    display: grid;
    grid-template-columns: 1fr 3fr;
    margin-bottom: 7px;
    justify-items: start;
    align-items: center;
    gap: 10px;
    height: 48px;
    width: 100%;
    text-align: left;
  }

  &__name span,
  &__lastName span,
  &__birthDate span,
  &__email span {
    font-weight: bold;
  }

  &__edit-btn {
    margin: 0 auto;
    padding: 10px;
  }
}
</style>
