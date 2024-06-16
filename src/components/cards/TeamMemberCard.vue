<template>
  <div class="team-member">
    <img class="team-member__img" :src="src" :alt="memberName" />

    <div class="team-member__content content">
      <div class="content__title">
        <div class="content__name">{{ memberName }}</div>
        <div class="content__role">{{ memberRole }}</div>
      </div>
      <div class="content__bio">{{ memberBio }}</div>
      <a :href="memberGitHubLink" class="content__github button-transparent">Ссылка на GitHub</a>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'TeamMemberCard',

  props: {
    src: String,
    memberName: String,
    memberRole: String,
    memberBio: String,
    memberGitHubLink: String
  }
};
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables';

.team-member {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 15px;
  width: 360px;
  background-color: $color-white;
  box-shadow: 3px 3px 8px rgba(0, 0, 0, 0.3);

  &__img {
    width: 100%;
  }
}

.content {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  min-height: 200px;
  width: 100%;
  box-sizing: border-box;

  &__title {
    position: absolute;
    left: 50%;
    transform: translateY(-120%) translateX(-50%);
    margin: 0 auto;
    padding: 10px 15px;
    width: 50%;
    background-color: $color-white;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      height: 1px;
      width: 30%;
      background-color: #5d6c7b;
    }
  }

  &__name {
    margin-bottom: 5px;
    font-size: 1.2rem;
    font-weight: bold;
  }

  &__bio {
    margin-top: 10px;
  }

  &__github {
    padding: 10px 0;
  }
}
</style>
