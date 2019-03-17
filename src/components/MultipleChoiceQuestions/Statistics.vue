<template>
  <div></div>
</template>

<script>
import {eventHub} from '@/EventHub'
export default {
  name: 'Statistics',
  props: ['chosenAnswer'],
  watch: {
    chosenAnswer: {
      handler: function (Answer) {
        // console.log('Answer', Answer)
        eventHub.$emit('Update Answer Value', Answer)
        eventHub.$emit('Update Answer Count', Answer['Id'])
        eventHub.$emit('Update Answer time', Answer)
        eventHub.$emit('Update Answer Result', Answer)
      },
      deep: true
    }
  },
  data () {
    return {
      timeSinceLastQuestionAnswered: 0 // time since last question answered
    }
  }
}
</script>

<style scoped>

</style>
