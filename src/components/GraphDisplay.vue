<template>
  <reactive :chart-data="datacollection"></reactive>
</template>
<script>
import Reactive from '@/components/Reactive'
export default {
  name: 'GraphDisplay',
  components: {
    Reactive
  },
  data () {
    return {
      datacollection: null,
      concentrationArray: [],
      dosageArray: []
    }
  },
  created () {
    // anytime the vue instance is created, call the fillData() function.
    // this.fillData()
  },
  methods: {
    fillData () {
      this.datacollection = {
        // Data for the x-axis of the chart
        labels: this.concentrationArray,
        datasets: [
          {
            label: 'Data Result',
            backgroundColor: '#f87979',
            // Data for the y-axis of the chart
            data: this.dosageArray
          }
        ]
      }
    },
    getRandomInt () {
      // JS function to generate numbers to be used for the chart
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5
    }
  }
}
</script>

<style scoped>

</style>
