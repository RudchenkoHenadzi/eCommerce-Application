<template>
  <div class="user">
    <figure class="user__avatar">
      <img class="user__img" src="@/assets/images/avatar.jpg" alt="avatar" />
      <figcaption>
        Avatar image from
        <a
          href="https://www.freepik.com/free-vector/collection-people-carrying-shopping-bags_4946623.htm#fromView=search&page=1&position=1&uuid=2b06f85c-4786-457a-9e68-48ea85acb683"
          >freepik</a
        >
      </figcaption>
    </figure>
    <div class="user__about about">
      <div class="about__name"><span>Name: </span> {{ firstName }}</div>
      <div class="about__lastName"><span>Last Name: </span> {{ lastName }}</div>
      <div class="about__birthDate"><span>Date of birth: </span> {{ birthDate }}</div>
      <div class="about__email"><span>Email: </span> {{ email }}</div>
      <DoneIcon class="about__done-btn" v-if="isEditModeOn" @click="isEditModeOn = false" />
      <PencilIcon class="about__edit-btn" v-else @click="isEditModeOn = true" />
    </div>
  </div>
</template>

<script lang="ts">
import PencilIcon from '@/Icons/PencilIcon.vue'
import DoneIcon from '@/Icons/DoneIcon.vue'

export default {
  name: 'UserDataBlock',
  components: { DoneIcon, PencilIcon },
  props: {
    firstName: String,
    lastName: String,
    email: String,
    birthDate: String
  },
  data() {
    return {
      isEditModeOn: false
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables';
.user {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr;
  grid-template-areas: 'pic about about';
  padding: 50px;
  background-color: #eaebed;
  border-radius: 15px;
  box-shadow: 5px 5px 10px darkgray;

  &__avatar {
    grid-area: pic;
    margin: 0;
    width: 90%;
  }

  &__img {
    margin-bottom: 15px;
    width: 100%;
  }
}

.about {
  position: relative;
  grid-area: about;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
  padding: 15px;
  background-color: $color-white;
  border-radius: 10px;

  &__name span,
  &__lastName span,
  &__birthDate span,
  &__email span {
    font-weight: bold;
  }

  &__edit-btn,
  &__done-btn {
    position: absolute;
    top: 10px;
    right: 10px;
  }
}
</style>
