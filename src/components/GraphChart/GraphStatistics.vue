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
    collectValues (val) {
      this.collection.push(val)
    }
  },
  created() {
    eventHub.$on('User inputted new value for graph', value => { this.collectValues(value) })
  }
}
</script>

<style scoped>

</style>
