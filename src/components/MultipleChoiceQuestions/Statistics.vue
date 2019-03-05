<template>
  <div></div>
</template>

<script>
import {eventHub} from '@/EventHub'
export default {
  name: 'Statistics',
  props: ['answer'],
  watch: {
    answer: {
      handler: function (Answer) {
        eventHub.$emit('Update Answer', Answer)
        eventHub.$emit('Update Answer Count', Answer['Id'])
        eventHub.$emit('Update Answer time', Answer)
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
