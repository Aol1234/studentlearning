<template>
  <section class="container">
    <h1>{{msg}}</h1>
    <p>Links should be placed here to connect to the graphical input test and mcq</p>
    <router-link :to="{ name: 'LoginPage' }">Login</router-link>
    <b-card bg-variant="light"  >
    <b-container fluid class="text-light text-center" >
      <b-row class="mb-3">
        <b-col><router-link :to="{ name: 'GraphPage' }">Graph</router-link></b-col>
        <b-col><router-link :to="{ name: 'GraphPage' }">Graph</router-link></b-col>
      </b-row>
    </b-container>
    </b-card>
    <router-view/>
  </section>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
export default {
  name: 'DashBoard',
  data () {
    return {
      msg: 'Welcome to the Dashboard'
    }
  }
}
</script>

<style scoped>
.dashSquareLeft {
  float: Left;
}
.dashSquareRight {
  float: Right;
}

</style>
