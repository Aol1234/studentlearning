<template>
  <div>
    {{selected}}
    <div v-if="rendering === true" v-for="(n, i) in this.questions" :key="i">
     {{question[i]}}
      <b-form-group>
        <b-form-radio-group v-model= selected[i]
                            :options=questionnaire[i]
                            :name=names[i]>
        </b-form-radio-group>
      </b-form-group>
    </div>
    <button v-on:click="populate">Populate</button>
    <button v-on:click="result">Result</button>
  </div>
</template>
<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import axios from 'axios'
const api = 'http://localhost:8002/'
export default {
  name: 'RadioPopulate',
  data () {
    return {
      questions: 0, // json.numberOfQuestions // populated with number of questions
      rendering: false,
      answers: [], // populated with answers
      selected: [], // populated with selected radio buttons
      names: [], // populated with identifiers of questions
      questionnaire: [],
      questionnaireInfo: [],
      question: [],
      response: []
    }
  },
  methods: {
    getNumberOfQuestions () {
      let names = []
      let questions = this.questionnaire.length
      this.questions = questions
      for (let question in questions) {
        names.push(question)
        this.selected[questions].push('')
      }
      this.names = names
    },
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
    populate () {
      this.getNumberOfQuestions()
      this.getAnswers()
      this.rendering = true // Allows questions to render after preceding methods
    },
    result () {
      let body = {results: ['test']}
      console.log(this.selected)
      axios.post(api + ':ID/:mcqID/result', JSON.stringify(body))
        .then((response) => {
          this.response = response.data
          console.log('Response of results', this.response)
        })
        .catch(error => {
          console.log(error)
          this.errored = true
        })
    }
  },
  created () {
    // let body = {object_one: 'valueOne', object_two: 'valueTwo', array_one: {a: 'one', b: 'two'}}
    axios.post(api + 'post')
      .then((response) => {
        this.response = response.data
        let questions = response.data['Questions']
        this.questionnaireInfo = this.response['Identifier']
        for (let question in questions) {
          this.question.push(questions[question]['Question'])
          this.questionnaire.push(questions[question]['Answers'])
        }
      })
      .catch(error => {
        console.log(error)
        this.errored = true
      })
  }
}
</script>

<style scoped>

</style>
