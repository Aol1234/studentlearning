<template>
    <div>
      <div v-for="(answerId, index) in this.answerIndex" :key="index">
        <div class="form-row">
          <label class="form col-form-label" for="answerIndex[index]">Answer: {{answerId + 1}}</label>
          <label>
            <input type="radio" v-model="chosenAnswer" v-bind:value="answerId">
          </label>
          <input class="form-control col-sm-8" type="text" id="answerIndex[index]" v-model.lazy="answers[index]['text']">
        </div>
      </div>
      <b-button v-if="answerNumber < 10" @click="AddAnswers">+</b-button>
      </div>
</template>

<script>
import {eventHub} from '@/EventHub'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
export default {
  name: 'McqAnswers',
  data () {
    return {
      answerIndex: [], // Array of answer ids
      answers: [], // Array of Question answers
      answerNumber: -1,
      chosenAnswer: '' // Correct answer
    }
  },
  props: ['questionId'],
  methods: {
    AddAnswers () { // Add answer
      if (this.answerNumber < 10) { // Limit answers to ten
        this.answerIndex.push(this.answerNumber += 1) // Add id
        this.formattingAnswer(this.answerNumber) // Create template
      }
    },
    formattingAnswer (i) { // Create template
      let answer = {value: i, text: '', result: 0}
      this.answers.push(answer) // Add answer to array
    }
  },
  watch: {
    answers: function (val) { // Update answer result
      eventHub.$emit('Update the Mcq Question Editor', [this.questionId, val])
    },
    chosenAnswer: function (val) { // Update correct answer
      eventHub.$emit('Update the Mcq Question Answer', [this.questionId, val])
    }
  }
}
</script>

<style scoped>
.form {
  margin-right: auto;
}
</style>
