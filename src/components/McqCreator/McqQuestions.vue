<template>
    <div>
      <b-card>
        <h3>Questions</h3>
        <div v-for="(questionId, index) in this.questionIndex" :key="index">Question: {{questionId}}
          <b-card>
            <div class="form-row">
                <label class="form col-form-label" for="questionIndex[index]">Title of Question</label>
                <input class="form-control col-sm-8" type="text" id="questionIndex[index]" v-model.lazy="question[index]">
                <WatchMcqQuestion :questions="questionList" :ChosenQuestion="[questionId, question[index]]"></WatchMcqQuestion>
            </div>
            <McqAnswers :questionId="questionId"></McqAnswers>
          </b-card>
        </div>
        <button @click="AddQuestion()">+</button>
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
      questionIndex: [],
      question: [],
      questionNumber: -1,
      questionList: [],
      previousUpdate: []
    }
  },
  methods: {
    AddQuestion () {
      this.questionIndex.push(this.questionNumber += 1)
      this.question.push()
      this.questionList.push({Id: (this.question.length - 1), Question: '', Answers: {}})
    },
    updateQuestion (QuestionIdAndQuestion) {
      let QId = QuestionIdAndQuestion[0]
      this.questionList[QId]['Id'] = QId
      this.questionList[QId]['Question'] = QuestionIdAndQuestion[1]
      console.log('Updated Question', this.questionList[QId])
    },
    updateAnswer (QuestionIdAndAnswer) {
      let questionId = QuestionIdAndAnswer[0]
      this.questionList[questionId]['Answers'] = QuestionIdAndAnswer[1]
      this.questionList[questionId]['Id'] = questionId
      this.questionList[questionId]['Question'] = this.question[questionId]
      console.log('Updated Question', this.questionList[questionId])
    },
    publish () {
      eventHub.$emit('Collect Questions', this.questionList)
    },
    // FIXME: CorrectAnswer result value does not update if new answer created after the correct answer created
    // Create a for loop in publish that updates number of answers to update result value
    setCorrectAnswer (QuestionIdAndCorrectAnswerValue) {
      let questionId = QuestionIdAndCorrectAnswerValue[0]
      let numberOfAnswers = this.questionList[questionId]['Answers'].length
      this.questionList[questionId]['Answers'][QuestionIdAndCorrectAnswerValue[1]]['result'] = numberOfAnswers
    }
  },
  created () {
    eventHub.$on('Update the Mcq Question Editor', QuestionIdAndAnswer => { this.updateAnswer(QuestionIdAndAnswer) })
    eventHub.$on('Update the Mcq Question Answer', QuestionIdAndCorrectAnswerValue => { this.setCorrectAnswer(QuestionIdAndCorrectAnswerValue) })
    eventHub.$on('Update the Mcq Question Title', QuestionIdAndQuestion => { this.updateQuestion(QuestionIdAndQuestion) })
    eventHub.$on('Publishing Mcq', placeholder => { this.publish() })
  }
}
</script>

<style scoped>
.form {
    margin-right: auto;
}
</style>
