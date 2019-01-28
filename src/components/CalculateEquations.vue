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
      MaxResponse: 150
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
      console.log('Equation Params', dosage, this.slope, this.BInput, this.MinResponse, this.MaxResponse)
      let min = this.MinResponse * 1 // FIXME: this.MinResponse does not calculate correctly for some reason
      return (min + (((this.MaxResponse - this.MinResponse) * Math.pow(dosage, this.slope)) / (Math.pow(this.BInput, this.slope) + Math.pow(dosage, this.slope))))
      // result = 1 + (((max-min) * Math.pow(dosage, slope)) / (Math.pow(BInput, slope) + Math.pow(dosage, slope))
    },
    test () {
      console.log('Wrong!!!!')
    },
    calling (value) {
      console.log('Example of eventHub and listening Event', value, 'From GraphPage To CalculateEquations')
    }
  },
  created: function () {
    this.eventHub.$on('echo', this.calling)
    this.eventHub.$on('BInput', BInput => { this.BInput = BInput })
    this.eventHub.$on('MinResponse', MinResponse => { this.MinResponse = MinResponse })
    this.eventHub.$on('MaxResponse', MaxResponse => { this.MaxResponse = MaxResponse })
  }
}
</script>
