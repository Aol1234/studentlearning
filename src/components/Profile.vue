<template>
  <div>
    <h1>Profile</h1>
    <div>{{ body['object_one'] }}</div>
    <div>{{ body }}</div>
  </div>
</template>

<script>
import axios from 'axios'
const api = 'http://localhost:8002/'
export default {
  name: 'profile',
  data () {
    return {
      body: [{}]
    }
  },
  methods: {
  },
  created () {
    let body = {ObjectOne: 'valueOne', ObjectTwo: 'valueTwo', ArrayOne: {A: 'one', B: 'two'}}
    axios.post(api + 'post', JSON.stringify(body))
      .then((response) => {
        // console.log(JSON.parse(response.data))
        this.body = response.data
        console.log(this.body)
      })
      .catch(error => {
        console.log(error)
        this.errored = true
      })
    // let body = {ObjectOne: 'valueOne', ObjectTwo: 'valueTwo', ArrayOne: {A: 'one', B: 'two'}}
    /* axios.post(api + 'post', JSON.stringify(body))
      .then((response) => {
        console.log(response.data)
        this.body = response.data
        let ObjectOne = response.data
        let O = JSON.parse(ObjectOne)
        console.log(typeof O)
      })
      .catch(error => {
        console.log(error)
        this.errored = true
      })
      */
  }
}
</script>

<style scoped>

</style>
