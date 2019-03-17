<template>
    <div>
    </div>
</template>

<script>
import {eventHub} from '@/EventHub'
export default {
  name: 'WatchMcqQuestion',
  props: ['ChosenQuestion', 'questions'],
  watch: {
    ChosenQuestion (QuestionIdAndQuestion) {
      if (QuestionIdAndQuestion[1] === this.questions[QuestionIdAndQuestion[0]]['Question']) {
      } else {
        eventHub.$emit('Update the Mcq Question Title', QuestionIdAndQuestion)
      }
    }
  }
}
</script>

<style scoped>

</style>
