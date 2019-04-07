<template>
  <reactive :chart-data="datacollection"></reactive>
</template>
<script>
import Reactive from '@/components/GraphChart/Reactive'
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
  methods: {
    fillData () { // Fill graph with data
      this.datacollection = {
        // Data for the x-axis of the chart
        labels: this.concentrationArray,
        datasets: [
          {
            label: 'Data Result',
            borderWidth: 5,
            fill: true,
            borderColor: '#5775F8',
            // Data for the y-axis of the chart
            data: this.dosageArray
          }
        ]
      }
    }
  }
}
</script>

<style scoped>

</style>
