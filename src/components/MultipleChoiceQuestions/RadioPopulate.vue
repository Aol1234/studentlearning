<template>
  <div>
    {{Answers}}
    <div v-if="rendering === true" v-for="(n, i) in this.numberOfQuestions" :key="i">
     {{question[i]}}
      <b-form-group>
        <b-form-radio-group v-model="selectedAnswers[i]['result']"
                            :options="questionnaire[i]"
                            :name="names[i]">
        </b-form-radio-group>
      </b-form-group>
    </div>
    <button v-on:click="populate">Populate</button>
    <button v-on:click="result">Result</button>
      <p>List of people:</p>
      <Statistics v-for="(answer, index) in selectedAnswers" :key="index.id" :answer="answer" :Answers="Answers"></Statistics>
  </div>
</template>
<script>
import {sessionToken, api} from '../LoginView'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import axios from 'axios'
import {eventHub} from '@/EventHub'
import Statistics from '@/components/MultipleChoiceQuestions/Statistics'
// import * as Duration from 'duration-js'
export default {
  name: 'RadioPopulate',
  components: {Statistics},
  data () {
    return {
      numberOfQuestions: 0, // json.numberOfQuestions // populated with number of questions
      rendering: false, // Prevent Rending until data evaluated,
      timer: null, // Counts time
      elapsed: null,
      names: [], // populated with identifiers of questions
      questionnaire: [], // Holds arrays of Answers
      questionnaireInfo: [],
      question: [], // Holds array of Questions
      response: [], // REST response
      results: [], // selected is reformatted here before sending to server selected{id:0, val:1, time:12.01'secs'} -> results{result:1, time:12.01}
      selectedAnswers: [], // Populated with selected radio buttons
      Answers: [],
      AnswerLength: [], // Ad-hoc hack to get answer length
      McqId: 0,
      UserId: 0 // Placeholder, swapped server side
    }
  },
  methods: {
    getAnswers () {
      let questions = this.questionnaire
      for (let question in questions) {
        for (let answer in questions[question]) {
          if (questions[question][answer]['value'] === '0') {
            this.answers.push(questions[question][answer]['value'])
          }
        }
      }
    },
    // Formatting
    formatSelected () {
      for (let question in this.question) {
        this.selectedAnswers.push({Id: question, result: -1, total: this.AnswerLength[question], time: -1, changes: 0})
        this.Answers.push({Id: question, result: -1, total: this.AnswerLength[question], time: -1, changes: 0})
      }
    },
    populate () {
      this.numberOfQuestions = this.question.length
      this.formatSelected()
      this.getAnswers()
      this.timer = performance.now()
      this.rendering = true // Allows questions to render after preceding methods
    },
    result () {
      let result = {
        'McqId': this.McqId,
        'UserId': this.UserId, // Placeholder value
        'McqQuestionResult': this.Answers
      }
      console.log(result)
      axios({
        method: 'post',
        url: api + ':ID/:mcqID/result',
        data: JSON.stringify(result),
        headers: { 'Authorization': 'Bearer  ' + sessionToken }
      })
        .then((response) => {
          this.response = response.data
          console.log('Response of results', this.response)
        })
        .catch(error => {
          console.log(error)
          this.errored = true
        })
    },
    getTime (Answer) {
      if (this.elapsed == null) { // First Answer
        this.elapsed = this.timer // Time from start
        return Math.floor(this.elapsed) * 1000000
      } else if (this.Answers[Answer['Id']]['time'] === -1) { // First time this question answered
        this.timer = performance.now() - this.elapsed
        this.elapsed = performance.now()
        return Math.floor(this.timer) * 1000000
      } else { // Updated Answer
        this.timer = performance.now() - this.elapsed
        this.elapsed = performance.now()
        return Math.floor(this.Answers[Answer['Id']]['time'] + (this.timer * 1000000))
      }
    },
    getMCQ () {
      axios({
        method: 'post',
        url: api + 'post',
        // data: JSON.stringify(result),
        headers: { 'Authorization': 'Bearer  ' + sessionToken }
      })
        .then((response) => {
          this.response = response.data['Value']
          let questions = response.data['Value']['McqQuestions']
          // this.questionnaireInfo = this.response['Value']['MCQ_ID']
          for (let question in questions) {
            this.question.push(questions[question]['Question']) // Single Array
            this.AnswerLength.push(questions[question]['Answers'].length)
            this.questionnaire.push(questions[question]['Answers']) // Multiple Arrays
          }
        })
        .catch(error => {
          console.log(error)
          this.errored = true
        })
    }
  },
  created () {
    this.getMCQ()
    eventHub.$on('Update Answer Count', Id => { this.Answers[Id]['changes'] += 1 })
    eventHub.$on('Update Answer', Answer => { this.Answers[Answer['Id']]['result'] = Answer['result'] })
    eventHub.$on('Update Answer time', Answer => { this.Answers[Answer['Id']]['time'] = this.getTime(Answer) })
  }
}
</script>

<style scoped>

</style>
