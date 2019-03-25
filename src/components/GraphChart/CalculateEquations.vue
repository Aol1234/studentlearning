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
      deviation: 0.1,
      concentrationOne: 0,
      volumeOne: 0,
      molarity: 0.00000001 // Molarity 1ml of 10^-5 of Noradrenaline
    }
  },
  methods: {
    calculateHillLangmuirConcentration (volumeTwo) {
      // return (inputValue / (inputValue + this.equilibriumDissociationConstant))
      if (this.concentrationOne === 0) {
        this.concentrationOne = volumeTwo / this.molarity
        this.volumeOne = volumeTwo
        return this.concentrationOne
      }
      let concentrationTwo = (this.volumeOne * this.concentrationOne) / (volumeTwo / this.molarity)
      this.volumeOne = volumeTwo
      this.concentrationOne = concentrationTwo
      return concentrationTwo
    },
    calculateHillDosageResponse (value) {
      let min = this.MinResponse * 1
      // let result = min + ((this.MaxResponse - min) / (1 + (value / Math.pow(((this.MaxResponse - min) / 2), -this.slope))))
      let result = (min + (((this.MaxResponse - min) * Math.pow(value, this.slope)) / (Math.pow(this.BInput, this.slope) + Math.pow(value, this.slope))))
      // let result = this.MaxResponse * value / (((min + (this.MaxResponse - min)) / 2) + value)
      console.log('Response', result)
      let noise = this.noise()
      return (result * noise)
    },
    noise () {
      if (this.deviation > 0) {
        let random = Math.random()
        let deviation = this.deviation
        let min = 1 - (random * deviation)
        let max = 1 + (random * deviation)
        return this.getRandomArbitrary(min, max)
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
