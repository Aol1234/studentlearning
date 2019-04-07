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
      handler: function (Answer) { // Activates when chosenAnswer is changed
        eventHub.$emit('Update Answer Value', Answer) // Emits to update answer
        eventHub.$emit('Update Answer Count', Answer['Id']) // Emits to update answer
        eventHub.$emit('Update Answer time', Answer) // Emits to update answer
        eventHub.$emit('Update Answer Result', Answer) // Emits to update answer
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
