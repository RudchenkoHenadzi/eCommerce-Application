<template>
  <div class="about">
    <h1 class="about__title">О нас</h1>

    <h2 class="about__subtitle">
      Мы - команда JS Wizards! Название оказалось говорящим - к концу финального таска наша команда
      практически исчезла 🪄
    </h2>

    <div class="about__members">
      <TeamMemberCard
        v-for="member in MEMEBERS_INFO"
        :key="member.id"
        :src="getFullSrc(member.fileName)"
        :memberBio="member.bio"
        :memberName="member.name"
        :memberRole="member.role"
        :memberGitHubLink="member.githubLink"
      />
    </div>

    <div class="about__school school">
      <p class="school__text">
        {{ RSSCHOOL_TEXT_FIRST_LINE }}
      </p>
      <AboutSchool class="school__icon" :url="COURSE_URL" />
      <p class="school__text">{{ RSSCHOOL_TEXT_SECOND_LINE }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import TeamMemberCard from '@/components/cards/TeamMemberCard.vue';
import { getFullSrc } from '@/helpers/transformation/getFullSrc';
import AboutSchool from '@/components/blocks/AboutSchool.vue';
import {
  COURSE_URL,
  MEMEBERS_INFO,
  RSSCHOOL_TEXT_FIRST_LINE,
  RSSCHOOL_TEXT_SECOND_LINE
} from '@/constants/textContent';

export default {
  name: 'AboutView',

  components: { AboutSchool, TeamMemberCard },

  methods: {
    getFullSrc
  },

  computed: {
    MEMEBERS_INFO() {
      return MEMEBERS_INFO;
    },
    COURSE_URL() {
      return COURSE_URL;
    },
    RSSCHOOL_TEXT_FIRST_LINE() {
      return RSSCHOOL_TEXT_FIRST_LINE;
    },
    RSSCHOOL_TEXT_SECOND_LINE() {
      return RSSCHOOL_TEXT_SECOND_LINE;
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables';

.about {
  padding: 20px;
  text-align: center;

  &__subtitle {
    margin-bottom: 60px;
    line-height: 1.5;
  }

  &__members {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    gap: 15px;
  }
}

.school {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 300px;
  background-image: url('@/assets/images/background.jpg');
  background-repeat: no-repeat;
  background-position: center center;
  background-attachment: scroll;
  background-size: cover;

  &__text {
    padding: 5px;
    background-color: $color-white;
  }
}
@media (max-width: 915px) {
  .about {
    &__members {
      flex-wrap: wrap;
      gap: 25px;
    }
  }
}
</style>
