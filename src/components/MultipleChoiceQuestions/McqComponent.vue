<template>
  <div>
    <div class="Main MCQ">
      <div v-if="reRendering === false">
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
      <b-button class="Publish" v-on:click="result">Result</b-button>
    </div>
    </div>
    <div v-if="reRendering === true" class="Main">
      <b-card bg-variant="light">
        <p>Total time in milliseconds: {{totalTime}}</p>
        <p>Total score: {{totalScore}}%</p>
        <b-button class="Publish" @click="reRouteToDash">Return to Dashboard</b-button>
      </b-card>
    </div>
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
  name: 'McqComponent',
  components: {Statistics},
  data () {
    return {
      numberOfQuestions: 0, // json.numberOfQuestions // populated with number of questions
      rendering: false, // Prevent Rending until data evaluated,
      reRendering: false, // Re-renders view to display result
      totalScore: 0,
      totalTime: 0,
      names: [], // identifiers of question names
      multipleChoice: [], // Holds arrays of Answers
      question: [], // Holds array of Questions
      results: [], // selected is reformatted here before sending to server selected{id:0, val:1, time:12.01'secs'} -> results{result:1, time:12.01}
      chosenAnswers: [], // Populated with selected radio buttons
      Answers: [], // Array of questionnaires
      AnswerLength: [], // Ad-hoc hack to get answer length
      McqId: 0, // Id of questionnaire
      UserId: 0, // Placeholder, swapped server side,
      startTime: 0, // Time questionnaire starts
      endTime: 0 // Time questionnaire ends
    }
  },
  methods: {
    formattingSelected () { // Create template answer for each question
      for (let question in this.question) {
        let first = this.multipleChoice[question][0] // Default to same as bootstrap
        this.chosenAnswers.push({Id: question, result: first['Result'], total: this.AnswerLength[question], time: 0, changes: 0, value: 0})
        this.Answers.push({Id: question, result: first['Result'], total: this.AnswerLength[question], time: 0, changes: 0, value: 0})
      }
    },
    populate () { // Set-up questionnaire
      this.numberOfQuestions = this.question.length
      this.formattingSelected() // Create answer arrays
      this.startTime = new Date() // Start timer
      this.rendering = true // Allows questions to render after preceding methods
    },
    result () { // Format and send answers to server
      let result = {
        'McqId': this.McqId,
        'UserId': this.UserId, // Placeholder value, not shared with client
        'McqQuestionResult': this.Answers
      }
      axios({
        method: 'post',
        url: api + ':storeResult',
        data: JSON.stringify(result),
        headers: { 'Authorization': 'Bearer  ' + sessionToken }
      })
        .then((response) => {
          this.simpleStats() // Provide some stats to user
          this.reRendering = true
        })
        .catch(error => {
          console.log(error)
        })
    },
    getTime (Answer) { // Calculate time to answer
      this.endTime = new Date() // Get time
      let timeDiff = this.endTime - this.startTime // Get difference
      let ms = Math.round(timeDiff) // Round
      this.startTime = new Date() // Reset timer
      return this.Answers[Answer['Id']]['time'] + ms // Time plus new time
    },
    getMCQ (mcq) { // Get selected mcq
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
    match (Answer) { // Sets answer array to users selected result
      let questionId = this.multipleChoice[Answer['Id']][Answer['value']]
      this.Answers[Answer['Id']]['result'] = questionId['Result']
    },
    simpleStats () { // Provide some primitive stats to user
      let time = 0 // Total time
      let total = 0 // Percentage correct
      for (let index = 0; index < this.Answers.length; index++) {
        total += (this.Answers[index]['result'] / this.Answers[index]['total'])
        time += this.Answers[index]['time']
      }
      this.totalScore = (total / this.Answers.length) * 100
      this.totalTime = time
    },
    reRouteToDash () { // Reroute to dashboard
      this.$router.replace('dashboard')
    }
  },
  created () {
    eventHub.$on('Populate Exam', mcq => { this.getMCQ(mcq); this.populate() }) // Listen to request to get mcq
    eventHub.$on('Update Answer Count', Id => { this.Answers[Id]['changes'] += 1 }) // Listen to request to update answer
    eventHub.$on('Update Answer Value', Answer => { this.Answers[Answer['Id']]['value'] = Answer['value'] }) // Listen to request to update answer
    eventHub.$on('Update Answer time', Answer => { this.Answers[Answer['Id']]['time'] = this.getTime(Answer); this.match(Answer) }) // Listen to request to update answer
  }
}
</script>

<style scoped>
.Publish{
  margin: 3vw 32vw;
  padding: 2vw;
  border-radius: 10vw;
  text-align: center;
}
.MCQ {
  margin-top: 2vw;
}
.Main{
  margin-left: 10vw;
  margin-right: 10vw;
  border-right-width: 0.2vw;
  border-left-width: 0.2vw;
  border-radius: 0.35vw;
  border-color: #4938f8;
  border-style: solid;
}
</style>
