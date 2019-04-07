<template>
    <div>
      <b-card>
        <h3>Details</h3>
        <div class="form-row">
          <label class="form col-form-label" for="nameOfQuestionnaire">Name of Questionnaire</label>
          <input class="form-control col-sm-8" type="text" id="nameOfQuestionnaire" v-model="name">
        </div>
        <div class="form-row">
          <label class="form col-form-label" for="numberOfQuestions">Number of Questions</label>
          <input class="form-control col-sm-8" type="number" id="numberOfQuestions" v-model="numberOfQuestions">
        </div>
        <div class="form-row">
          <label class="form col-form-label" for="Topic">Topic</label>
          <select class="form-control col-sm-8" type="text" id="Topic" v-model="topic">
            <option v-for="(topic) in topics" :key="topic"> {{topic}}</option>
          </select>
        </div>
        <div class="form-row">
          <label class="form col-form-label" for="descOfQuestionnaire">Description of Questionnaire</label>
          <textarea class="form-control col-sm-8" id="descOfQuestionnaire" v-model="desc" rows="4" cols="5" placeholder="The Description..."></textarea>
        </div>
      </b-card>
    </div>
</template>

<script>
import {eventHub} from '@/EventHub'
export default {
  name: 'McqDetails',
  data () {
    return {
      topics: [ // Topic options
        'Python',
        'History',
        'Geography'
      ],
      numberOfQuestions: 0, // placeholder for watch method
      topic: '', // placeholder for watch method
      name: '', // Questionnaire name
      desc: '' // Questionnaire description
    }
  },
  watch: { // watch variables
    numberOfQuestions: function (numberOfQuestions) {
    },
    'topic': function (Topic) {
      eventHub.$emit('Collect Topic', Topic)
    },
    name: function (Name) {
      eventHub.$emit('Collect Name', Name)
    },
    desc: function (Desc) {
      eventHub.$emit('Collect Desc', Desc)
    }
  }
}
</script>

<style scoped>
.form {
  margin-right: auto;
}
</style>
