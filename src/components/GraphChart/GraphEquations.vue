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
      BInput: 3, // Sharpness of graph
      offSet: 5, // Offset of graph
      MinResponse: 1,
      MaxResponse: 150, // Max response of graph
      noise: 0.01 // Level of noise
      // concentrationOne: 0,
      // volumeOne: 0,
      // molarity: 0.00000001 // Molarity 1ml of 10^-5 of Noradrenaline
    }
  },
  methods: {
    /*
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
    */

    calculateHillDosageResponse (value) { // Calculate hills-langmuir response
      let result = 1 * (1 + ((this.MaxResponse - 1) * Math.pow(value, this.BInput) / (Math.pow(this.offSet, this.BInput) + Math.pow(value, this.BInput))))
      let noise = this.noiseCalc()
      return (result * noise)
    },
    noiseCalc () { // Add noise to response
      if (this.noise > 0) {
        let random = Math.random()
        let noise = this.noise
        let min = 1 - (random * noise)
        let max = 1 + (random * noise)
        return this.getRandomArbitrary(min, max)
      }
      return 1
    },
    getRandomArbitrary (min, max) { // Level of noise
      return Math.random() * (max - min) + min
    }
  },
  created: function () { // Takes values from Graph slide modal
    eventHub.$on('BInput', BInput => { this.BInput = BInput })
    eventHub.$on('MinResponse', MinResponse => { this.offSet = MinResponse }) // Offset
    eventHub.$on('MaxResponse', MaxResponse => { this.MaxResponse = MaxResponse })
    eventHub.$on('noise', deviation => { this.noise = deviation }) // Add noise
    eventHub.$emit('receiveCalculationValues', { BInput: this.BInput, Max: this.MaxResponse, Min: this.offSet, Noise: this.noise })
  }
}
</script>
