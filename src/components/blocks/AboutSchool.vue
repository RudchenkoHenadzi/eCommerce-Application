<template>
  <a :href="url" class="about-school">
    <div class="about-school__icon-wrapper">
      <RsSchoolLogo />
    </div>
    <p class="about-school__text">school</p>
  </a>
</template>

<script lang="ts">
import RsSchoolLogo from '@/Icons/RsSchoolLogo.vue';

export default {
  name: 'AboutSchool',

  components: { RsSchoolLogo },

  props: {
    url: String
  }
};
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables';

.about-school {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 7px;
  margin: 0 auto;
  width: 250px;
  text-decoration: none;
  color: inherit;

  &__icon-wrapper {
    display: block;
    height: 50px;
    width: 50px;
    background-color: yellow;
    border-radius: 100%;
  }

  &__text {
    padding: 5px;
    background-color: $color-white;
  }
}
</style>
