<template>
  <div>
    <Header></Header>
    <div v-if="InitialRender === true">
      <h2 class="Header">A selection of mcq's are provided</h2>
    </div>
    <div class="Main" v-if="rendered === true">
      <div v-if="Questionnaires.length !== 0">
        <div v-for="(mcq, index) in Questionnaires" :key="index" :value="mcq">
          <b-card>
            <div class="Title">{{mcq['Name']}}</div>
            <b-card class="Desc">
              {{mcq['Desc']}}
              <b-button id="MCQPopulate" @click="populate(mcq)">Populate</b-button>
            </b-card>
          </b-card>
        </div>
      </div>
    </div>
    <McqComponent v-if="McqRender === true"></McqComponent>
  </div>
</template>

<script>
import {sessionToken, api} from '@/components/LoginView'
import {eventHub} from '@/EventHub'
import McqComponent from '@/components/MultipleChoiceQuestions/McqComponent'
import Header from '@/components/Extra/Header'
import axios from 'axios'
export default {
  name: 'ExampleMCQ',
  components: {McqComponent, Header},
  data () {
    return {
      Questionnaires: [],
      rendered: true,
      mcq: '',
      response: '',
      api: api,
      InitialRender: true,
      McqRender: false
    }
  },
  methods: {
    getMcqs () {
      axios({
        method: 'get',
        url: api + 'getMcqs',
        headers: { 'Authorization': 'Bearer  ' + sessionToken }
      })
        .then((response) => {
          this.Questionnaires = response.data
        })
        .catch(error => {
          console.log(error)
        })
    },
    populate (mcq) {
      console.log(mcq)
      axios({
        method: 'post',
        url: api + 'getSelectedMcq',
        data: JSON.stringify(mcq), // Get mcq associated with mcq_id
        headers: { 'Authorization': 'Bearer  ' + sessionToken }
      })
        .then((response) => {
          eventHub.$emit('Populate Exam', response)
        })
        .catch(error => {
          console.log(error)
        })
      this.rendered = false
      this.McqRender = true
    }
  },
  created () {
    this.getMcqs()
    this.rendered = true // Renders only after Mcqs are retrieved from the server
  }
}
</script>

<style scoped>
.Main{
  margin-left: 10vw;
  margin-right: 10vw;
  border-right-width: 0.2vw;
  border-left-width: 0.2vw;
  border-radius: 0.35vw;
  border-color: #4938f8;
  border-style: solid;
}
.Header{
  text-align: center;
  padding-top: 2vw;
  padding-bottom: 2vw;
  margin-bottom: -0.2vw;
  margin-left: 6vw;
  margin-right: 6vw;
  color: white;
  border-bottom-right-radius: 30vw;
  border-bottom-left-radius: 30vw;
  background-color: #4938f8;
}
.Title{
  text-align: center;
  margin-right: 45vw;
  margin-bottom: -0.18vw;
  color: white;
  border-top-right-radius: 0.35vw;
  border-top-left-radius: 0.35vw;
  border-bottom-right-radius: 0.35vw;
  background-color: #4938f8;
}
.Desc{
  border-bottom-left-radius: 0.4vw;
  border-bottom-right-radius: 0.4vw;
  border-top-right-radius: 0.4vw;
  border-color: #4938f8;
  border-width: 0.2vw;
  border-style: solid;
}
#MCQPopulate{
  float: right;
  padding-top: 1.75vw;
  padding-bottom: 1.75vw;
  margin-right: -2.15%;
  border-top-right-radius: 0.1vw;
  border-bottom-right-radius: 0.1vw;
}
</style>
