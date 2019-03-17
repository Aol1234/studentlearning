<template>
    <div>
      <Header></Header>
      <h1>Create a Multiple Choice Questionnaire</h1>
      <McqDetails></McqDetails>
      <McqQuestions></McqQuestions>
      <button @click="Publish">Publish</button>
    </div>
</template>

<script>
import {sessionToken, api} from '@/components/LoginView'
import {eventHub} from '@/EventHub'
import McqDetails from '@/components/McqCreator/McqDetails'
import McqQuestions from '@/components/McqCreator/McqQuestions'
import Header from '@/components/Extra/Header'
import axios from 'axios'
export default {
  name: 'McqCreatorView',
  components: {
    McqDetails,
    McqQuestions,
    Header
  },
  data () {
    return {
      NumberOfQuestions: 0,
      Questions: [],
      Topic: '',
      Desc: '',
      Name: ''
    }
  },
  methods: {
    Publish () {
      eventHub.$emit('Publishing Mcq', 'placeholder')
      eventHub.$on('Collect Questions', Question => { this.Questions = Question })
      let mcq = {
        Name: this.Name,
        Desc: this.Desc,
        Topic: this.Topic,
        McqQuestions: this.Questions
      }
      console.log(mcq)
      axios({
        method: 'post',
        url: api + 'publishMcq',
        data: JSON.stringify(mcq), // Get mcq associated with mcq_id
        headers: { 'Authorization': 'Bearer  ' + sessionToken }
      })
        .then((response) => {
          console.log(response)
        })
        .catch(error => {
          console.log(error)
          this.errored = true
        })
    }
  },
  created () {
    eventHub.$on('Collect Answer', Answer => { this.Publish(Answer) })
    eventHub.$on('Collect Questions', Question => { this.Questions = Question })
    eventHub.$on('Collect Topic', Topic => { this.Topic = Topic })
    eventHub.$on('Collect Name', Name => { this.Name = Name })
    eventHub.$on('Collect Desc', Desc => { this.Desc = Desc })
    eventHub.$on('Collect NumberOfQuestions', NumberOfQuestions => { this.NumberOfQuestions = NumberOfQuestions })
  }
}
</script>

<style scoped>

</style>
