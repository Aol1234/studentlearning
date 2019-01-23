<template>
  <div></div>
</template>
<script>
import {eventHub} from '@/EventHub'
export default {
  name: 'calculateEquations',
  data () {
    return {
      eventHub: eventHub,
      equilibriumDissociationConstant: 1,
      slop: 1
    }
  },
  methods: {
    calculateHillLangmuirConcentration (inputValue) {
      return (inputValue / (inputValue + this.equilibriumDissociationConstant))
      /*
       **************
       */
    },
    calculateHillDosageResponse (inputArray) {
      let EC50 = 50
      inputArray = EC50
      return inputArray
      /*
      **************
      */
    },
    test () {
      console.log('Wrong!!!!')
    },
    calling (value) {
      console.log('Example of eventHub and listening Event', value)
    }
  },
  created: function () {
    this.eventHub.$on('echo', this.calling)
  }
}
</script>
