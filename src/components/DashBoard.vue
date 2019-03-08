<template>
  <section class="container">
    <link rel="icon" type="image/png" href="data:image/png;base64,iVBORw0KGgo=">
    <h1 class="dashHeading">{{msg}}</h1>
    <p class="dashHeading">Links should be placed here to connect to the graphical input test and mcq</p>
    <b-card bg-variant="light"  >
      <b-container fluid class="text-light text-center" >
      <b-row class="mb-5">
        <b-col><router-link :to="{ name: 'ExampleMCQ' }">Multiple Choice Questions</router-link></b-col>
        <b-col><router-link :to="{ name: 'GraphChartView' }">Hills-Langmuir Graph</router-link></b-col>
      </b-row>
      <b-row >
        <b-col><router-link :to="{ name: 'McqCreatorView' }">Create MCQ</router-link></b-col>
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
.dashHeading {
  text-align: center;
}
.dashSquareRight {
  float: Right;
}

</style>
