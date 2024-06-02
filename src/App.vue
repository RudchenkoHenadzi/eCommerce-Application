<script lang="ts">
import { RouterView } from 'vue-router'
import TheHeader from '@/components/layouts/TheHeader.vue'
import { useApiRootStore } from '@/stores/ApiRootStore'
import AlertMessage from '@/components/alerts/AlertMessage.vue'

export default {
  components: { AlertMessage, TheHeader, RouterView },
  name: 'App',
  data() {
    return {
      isAlertShow: false,
      alertText: ''
    }
  },
  methods: {
    showAlert(text: string, delay: number) {
      this.alertText = text
      this.isAlertShow = true
      setTimeout(() => {
        this.isAlertShow = false
      }, delay)
    },
    closeAlert() {
      this.isAlertShow = false
    }
  },
  mounted() {
    const apiRoot = useApiRootStore()
    apiRoot.start()
  }
}
</script>

<template>
  <TheHeader />
  <main>
    <RouterView @showAlert="showAlert" />
  </main>
  <Transition>
    <AlertMessage v-if="isAlertShow" :key="Date.now()" :text="alertText" @closeAlert="closeAlert" />
  </Transition>
</template>

<style lang="scss" scoped></style>
