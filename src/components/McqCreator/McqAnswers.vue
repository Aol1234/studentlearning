<template>
    <div>
      <div v-for="(answerId, index) in this.answerIndex" :key="index">
        <div class="form-row">
          <label class="form col-form-label" for="answerIndex[index]">Answer: {{answerId}}</label>
          <label>
            <input type="radio" v-model="chosenAnswer" v-bind:value="answerId">
          </label>
          <input class="form-control col-sm-8" type="text" id="answerIndex[index]" v-model.lazy="answers[index]['text']">
        </div>
      </div>
      <button v-if="answerNumber < 10" @click="AddAnswers">+</button>
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
      answerIndex: [],
      answers: [],
      answerNumber: -1,
      chosenAnswer: ''
    }
  },
  props: ['questionId'],
  methods: {
    AddAnswers () {
      if (this.answerNumber < 10) {
        this.answerIndex.push(this.answerNumber += 1)
        this.formattingAnswer(this.answerNumber)
      }
    },
    formattingAnswer (i) {
      let answer = {value: i, text: '', result: 0}
      this.answers.push(answer)
      console.log('Updated Answer', answer)
    }
  },
  watch: {
    answers: function (val) {
      console.log('Updated Answer', val, this.questionId)
      eventHub.$emit('Update the Mcq Question Editor', [this.questionId, val])
    },
    chosenAnswer: function (val) {
      console.log(val)
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
