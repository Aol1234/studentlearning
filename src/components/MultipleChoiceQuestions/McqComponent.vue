<template>
  <div class="Main MCQ">
    <div v-if="rendering === true" v-for="(n, index) in this.numberOfQuestions" :key="index">
     <b-card bg-variant="light">
       {{question[index]}}
       <b-form-group>
         <b-form-radio-group v-model="chosenAnswers[index]['value']"
                             :options="multipleChoice[index]"
                             :name="names[index]">
         </b-form-radio-group>
       </b-form-group>
       <Statistics :chosenAnswer="chosenAnswers[index]"></Statistics>
     </b-card>
    </div>
    <b-button id="Publish" v-on:click="result">Result</b-button>
    {{Answers}}
  </div>
</template>
<script>
import {sessionToken, api} from '@/components/LoginView'
import {eventHub} from '@/EventHub'
import Statistics from '@/components/MultipleChoiceQuestions/Statistics'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
export default {
  // <Statistics v-for="(chosenAnswer, index) in chosenAnswers" :key="index.id" :chosenAnswer="chosenAnswer"></Statistics>
  name: 'McqComponent',
  components: {Statistics},
  data () {
    return {
      numberOfQuestions: 0, // json.numberOfQuestions // populated with number of questions
      rendering: false, // Prevent Rending until data evaluated,
      timer: null, // Counts time
      elapsed: null,
      names: [], // identifiers of question names
      multipleChoice: [], // Holds arrays of Answers
      question: [], // Holds array of Questions
      results: [], // selected is reformatted here before sending to server selected{id:0, val:1, time:12.01'secs'} -> results{result:1, time:12.01}
      chosenAnswers: [], // Populated with selected radio buttons
      Answers: [],
      AnswerLength: [], // Ad-hoc hack to get answer length
      McqId: 0,
      UserId: 0, // Placeholder, swapped server side,
      startTime: 0,
      endTime: 0
    }
  },
  methods: {
    formattingSelected () {
      for (let question in this.question) {
        let first = this.multipleChoice[question][0]
        this.chosenAnswers.push({Id: question, result: first['Result'], total: this.AnswerLength[question], time: 0, changes: 0, value: 0})
        this.Answers.push({Id: question, result: first['Result'], total: this.AnswerLength[question], time: 0, changes: 0, value: 0})
      }
    },
    populate () {
      this.numberOfQuestions = this.question.length
      this.formattingSelected()
      this.startTime = new Date()
      this.rendering = true // Allows questions to render after preceding methods
    },
    result () {
      let result = {
        'McqId': this.McqId,
        'UserId': this.UserId, // Placeholder value, not shared with client
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
        })
        .catch(error => {
          console.log(error)
          this.errored = true
        })
    },
    getTime (Answer) {
      this.endTime = new Date()
      let timeDiff = this.endTime - this.startTime // in ms
      // get ms
      let ms = Math.round(timeDiff)
      this.startTime = new Date()
      return this.Answers[Answer['Id']]['time'] + ms
    },
    getMCQ (mcq) {
      let questions = mcq.data['McqQuestions']
      this.McqId = mcq.data['McqId']
      // For each question
      for (let question in questions) {
        // Add question to this.question
        this.question.push(questions[question]['Question'])
        // Get the associated number of answers
        this.AnswerLength.push(questions[question]['Answers'].length)
        // Add all answers for question
        this.multipleChoice.push(questions[question]['Answers'])
      }
    },
    match (Answer) {
      // Answer['Id']
      let questionId = this.multipleChoice[Answer['Id']][Answer['value']]
      this.Answers[Answer['Id']]['result'] = questionId['Result']
    }
  },
  created () {
    eventHub.$on('Populate Exam', mcq => { this.getMCQ(mcq); this.populate() })
    eventHub.$on('Update Answer Count', Id => { this.Answers[Id]['changes'] += 1 })
    eventHub.$on('Update Answer Value', Answer => { this.Answers[Answer['Id']]['value'] = Answer['value'] })
    eventHub.$on('Update Answer time', Answer => { this.Answers[Answer['Id']]['time'] = this.getTime(Answer); this.match(Answer) })
  }
}
</script>

<style scoped>
#Publish{
  margin: 3vw 38vw;
  padding: 2vw;
  border-radius: 10vw;
  text-align: center;
}
.MCQ {
  margin-top: 2vw;
}
</style>
