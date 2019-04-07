<template>
  <profile-reactive :chart-data="dataCollection"></profile-reactive>
</template>
<script>
import ProfileReactive from '@/components/Profile/ProfileReactive'
export default {
  name: 'ProfileGraph',
  components: { ProfileReactive },
  props: ['index'],
  data () {
    return {
      dataCollection: null
    }
  },
  methods: {
    fillData (xAxis, yAxis) {
      this.dataCollection = {
        // Data for the x-axis of the chart
        labels: xAxis,
        datasets: [
          {
            label: 'Results over last year',
            backgroundColor: '#e9d4f8',
            borderWidth: 1,
            fill: false,
            borderColor: '#5775F8',
            // Data for the y-axis of the chart
            data: yAxis
          }
        ]
      }
    }
  }
}
</script>

<style scoped>

</style>
