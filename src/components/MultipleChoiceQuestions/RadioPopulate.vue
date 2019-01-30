<template>
  <div>
    {{selected}}
    <div v-if="rendering === true" v-for="(n, i) in this.questions" :key="i">
      <b-form-group label="Example MCQ">
        <b-form-radio-group v-model= selected[i]
                            :options=questionnaire[i]
                            :name=names[i]>
        </b-form-radio-group>
      </b-form-group>
    </div>
    <button v-on:click="populate">Populate</button>
  </div>
</template>
<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
export default {
  name: 'RadioPopulate',
  data () {
    return {
      questions: 0, // json.numberOfQuestions // populated with number of questions
      rendering: false,
      answers: [], // populated with answers
      selected: [], // populated with selected radio buttons
      names: [], // populated with identifiers of questions
      questionnaire: [ [{ text: 'First radio', value: '0' }, { text: 'Second radio', value: '1' }, { text: 'Third radio', value: '2' }],
        [{ text: 'aaa radio', value: '1', misc: 'testing that other attributes can be added' }, { text: 'bbb radio', value: '0' }, { text: 'ccc radio', value: '2' }],
        [{ text: '111 radio', value: '2' }, { text: '222 radio', value: '1' }, { text: '333 radio', value: '0' }]
      ]
      // questionnaire: json.questionnaire
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
      this.rendering = true
    }
  }
}
</script>

<style scoped>

</style>
