<template>
  <div>
    <Header></Header>
    <div v-if="InitialRender === true">
      <h2>Select an Mcq to test against</h2>
    </div>
    <div v-if="rendered === true">
      <div v-if="Questionnaires.length !== 0">
        <p>Testing {{Questionnaires}}</p>
        <div v-for="(mcq, index) in Questionnaires" :key="index" :value="mcq">
          <b-card>
            {{mcq['Name']}}
            <b-card>
              {{mcq['Desc']}}
            </b-card>
            <button @click="populate(mcq)">Populate</button>
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
      html: (api + 'post'),
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
        // data: JSON.stringify(result), // Get mcq associated with mcq_id
        headers: { 'Authorization': 'Bearer  ' + sessionToken }
      })
        .then((response) => {
          this.Questionnaires = response.data
          console.log('Mcqs ', this.Questionnaires)
        })
        .catch(error => {
          console.log(error)
          this.errored = true
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
          console.log('Response', response)
          eventHub.$emit('Populate Exam', response)
        })
        .catch(error => {
          console.log(error)
          this.errored = true
        })
      this.rendered = false
      this.McqRender = true
    }
  },
  created () {
    this.getMcqs()
    this.rendered = true
    // this.InitialRender = true
    // this.McqRender = false
  }
}
</script>

<style scoped>

</style>
