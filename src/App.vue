<template>
  <TheHeader />
  <main>
    <RouterView />
  </main>
</template>

<script lang="ts">
import { RouterView } from 'vue-router'
import TheHeader from '@/components/TheHeader.vue'
import axios from 'axios'
import { useToken } from './stores/token'

export default {
  components: {
    TheHeader
  },

  setup() {
    const piniaToken = useToken()
    return {
      piniaToken
    }
  },

  mounted() {
    const data = new URLSearchParams()
    data.append('grant_type', 'client_credentials')
    const clientId = 'HhEhXOfsW-_PKzrn5KwrP90m'
    const clientSecret = 'TokyAdrYJd1jArF-QoVp5pNlAuXzO2if'
    const basicAuth = btoa(`${clientId}:${clientSecret}`)
    axios
      .post('https://auth.europe-west1.gcp.commercetools.com/oauth/token', data, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${basicAuth}`
        }
      })
      .then((response) => {
        this.piniaToken.setToken(response.data.access_token)
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
</script>

<style lang="scss" scoped></style>
