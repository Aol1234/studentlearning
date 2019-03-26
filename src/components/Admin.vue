<template>
  <div>
    <b-button @click="week">W</b-button>
    <b-button @click="month">M</b-button>
    <b-button @click="year">Y</b-button>
  </div>
</template>

<script>
import {sessionToken, api} from '@/components/LoginView'
import axios from 'axios'
export default {
  name: 'Admin',
  methods: {
    week () {
      axios({
        method: 'get',
        url: api + 'admin/collectUserData',
        headers: { 'Authorization': 'Bearer  ' + sessionToken }
      })
        .then((response) => {
        })
        .catch(error => {
          console.log(error)
        })
    },
    month () {
      axios({
        method: 'get',
        url: api + 'admin/collectUserDataMonth',
        headers: { 'Authorization': 'Bearer  ' + sessionToken }
      })
        .then((response) => {
        })
        .catch(error => {
          console.log(error)
        })
    },
    year () {
      axios({
        method: 'get',
        url: api + 'admin/collectUserDataYear',
        headers: { 'Authorization': 'Bearer  ' + sessionToken }
      })
        .then((response) => {
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>

</style>
