<template>
    <div></div>
</template>

<script>
import {eventHub} from '@/EventHub'
export default {
  name: 'GraphStatistics',
  props: ['NumberTimesInputChanges'],
  data () {
    return {
      collection: []
    }
  },
  methods: {
    collectValues (val) { // Collect stats
      this.collection.push(val)
    }
  },
  created() { // Listen for new input
    eventHub.$on('User inputted new value for graph', value => { this.collectValues(value) })
  }
}
</script>

<style scoped>

</style>
