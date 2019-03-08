<template>
  <div></div>
</template>
<script>
import {eventHub} from '@/EventHub'
export default {
  name: 'CalculateEquations',
  data () {
    return {
      eventHub: eventHub,
      equilibriumDissociationConstant: 1,
      slope: 2,
      BInput: 20,
      MinResponse: 1,
      MaxResponse: 150,
      deviation: 0.1
    }
  },
  methods: {
    calculateHillLangmuirConcentration (inputValue) {
      return (inputValue / (inputValue + this.equilibriumDissociationConstant))
      /*
       **************
       *
       */
    },
    calculateHillDosageResponse (dosage) {
      // console.log('Equation Params', dosage, this.slope, this.BInput, this.MinResponse, this.MaxResponse)
      let min = this.MinResponse * 1 // FIXME: this.MinResponse does not calculate correctly for some reason
      let result = (min + (((this.MaxResponse - this.MinResponse) * Math.pow(dosage, this.slope)) / (Math.pow(this.BInput, this.slope) + Math.pow(dosage, this.slope))))
      let noise = this.noise()
      return (result * noise)
      // result = 1 + (((max-min) * Math.pow(dosage, slope)) / (Math.pow(BInput, slope) + Math.pow(dosage, slope))
    },
    noise () {
      if (this.deviation > 0) {
        let random = Math.random()
        let deviation = this.deviation
        let min = 1 - (random * deviation)
        let max = 1 + (random * deviation)
        let result = this.getRandomArbitrary(min, max)
        console.log(result, min, max)
        return result
      }
      return 1
    },
    getRandomArbitrary (min, max) {
      return Math.random() * (max - min) + min
    }
  },
  created: function () {
    this.eventHub.$on('BInput', BInput => { this.BInput = BInput })
    this.eventHub.$on('MinResponse', MinResponse => { this.MinResponse = MinResponse })
    this.eventHub.$on('MaxResponse', MaxResponse => { this.MaxResponse = MaxResponse })
    this.eventHub.$on('deviation', deviation => { this.deviation = deviation })
  }
}
</script>
