<template>
    <div>
      <b-card>
        <h3>Questions</h3>
        <div v-for="(questionId, index) in this.questionIndex" :key="index">Question: {{questionId + 1}}
          <b-card>
            <div class="form-row">
                <label class="form col-form-label" for="questionIndex[index]">Title of Question</label>
                <input class="form-control col-sm-8" type="text" id="questionIndex[index]" v-model.lazy="question[index]">
                <WatchMcqQuestion :questions="questionList" :ChosenQuestion="[questionId, question[index]]"></WatchMcqQuestion>
            </div>
            <McqAnswers :questionId="questionId"></McqAnswers>
          </b-card>
        </div>
        <b-button @click="AddQuestion()">+</b-button>
      </b-card>
    </div>
</template>

<script>
import {eventHub} from '@/EventHub'
import McqAnswers from '@/components/McqCreator/McqAnswers'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import WatchMcqQuestion from '@/components/McqCreator/WatchMcqQuestion'

export default {
  name: 'McqQuestions',
  components: {WatchMcqQuestion, McqAnswers},
  data () {
    return {
      questionIndex: [], // Question Id Array
      question: [], // Question
      questionNumber: -1, // Question Id
      questionList: [], // Question Array
      previousUpdate: []
    }
  },
  methods: {
    AddQuestion () { // Add question
      this.questionIndex.push(this.questionNumber += 1)
      this.question.push()
      this.questionList.push({Id: (this.question.length - 1), Question: '', Answers: {}})
    },
    updateQuestion (QuestionIdAndQuestion) { // Update question values
      let QId = QuestionIdAndQuestion[0]
      this.questionList[QId]['Id'] = QId
      this.questionList[QId]['Question'] = QuestionIdAndQuestion[1]
    },
    updateAnswer (QuestionIdAndAnswer) { // Update answer value
      let questionId = QuestionIdAndAnswer[0]
      this.questionList[questionId]['Answers'] = QuestionIdAndAnswer[1]
      this.questionList[questionId]['Id'] = questionId
      this.questionList[questionId]['Question'] = this.question[questionId]
      for (let index = 0; index < this.questionList[questionId]['Answers'].length; index++) { // Reset answer value
        if (this.questionList[questionId]['Answers'][index]['result'] > 0) {
          this.questionList[questionId]['Answers'][index]['result'] = this.questionList[questionId]['Answers'].length
        }
      }
    },
    publish () { // Emit questions array
      eventHub.$emit('Collect Questions', this.questionList)
    },
    setCorrectAnswer (QuestionIdAndCorrectAnswerValue) { // Update answer values
      let questionId = QuestionIdAndCorrectAnswerValue[0]
      let numberOfAnswers = this.questionList[questionId]['Answers'].length
      this.questionList[questionId]['Answers'][QuestionIdAndCorrectAnswerValue[1]]['result'] = numberOfAnswers
    }
  },
  created () { // Listeners
    eventHub.$on('Update the Mcq Question Editor', QuestionIdAndAnswer => { this.updateAnswer(QuestionIdAndAnswer) }) // Listens to answer result update
    eventHub.$on('Update the Mcq Question Answer', QuestionIdAndCorrectAnswerValue => { this.setCorrectAnswer(QuestionIdAndCorrectAnswerValue) }) // Listens to correct answer update
    eventHub.$on('Update the Mcq Question Title', QuestionIdAndQuestion => { this.updateQuestion(QuestionIdAndQuestion) }) // Listens to question title update
    eventHub.$on('Publishing Mcq', placeholder => { this.publish() }) // Listens to request to publish results
  }
}
</script>

<style scoped>
.form {
    margin-right: auto;
}
</style>
