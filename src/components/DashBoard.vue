<template>
  <div>
    <Header></Header>
    <section class="container">
      <h1 class="dashHeading">{{msg}}</h1>
      <p style="text-align: center">Options provided below</p>
      <b-card bg-variant="light"  >
        <b-container fluid class="text-light text-center" >
          <b-row class="mb-5">
            <b-col><router-link :to="{ name: 'MCQView' }">Multiple Choice Questions</router-link></b-col>
            <b-col><router-link :to="{ name: 'GraphChartView' }">Hills-Langmuir Graph</router-link></b-col>
          </b-row>
          <b-row class="mb-5">
            <b-col><router-link :to="{ name: 'McqCreatorView' }">Create MCQ</router-link></b-col>
          </b-row>
          <b-row class="mb-5">
            <b-col><router-link :to="{ name: 'CreateGroupView' }">Join/Create Group</router-link></b-col>
            <b-col><router-link :to="{ name: 'GroupView' }">View Groups</router-link></b-col>
          </b-row>
        </b-container>
      </b-card>
      <router-view/>
    </section>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Header from '@/components/Extra/Header'
export default {
  components: {Header},
  name: 'DashBoard',
  data () {
    return {
      msg: 'Welcome to your Dashboard'
    }
  }
}
</script>

<style scoped>
.dashHeading {
  text-align: center;
  color: white;
  padding-top: 1vw;
  padding-bottom: 2vw;
  border-bottom-right-radius: 30vw;
  border-bottom-left-radius: 30vw;
  background-color: #4938f8;
}
</style>
