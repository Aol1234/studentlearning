<template xmlns:display="http://www.w3.org/1999/xhtml">

  <section class="container">
    <ul>
    </ul>
    <b-card id="currentSlider" bg-variant="light">
      <p>Number of DataPoints:</p>
      <GraphSlider ref="currentSlider"></GraphSlider>
    </b-card>
    <b-container id="test">
      <b-card title="Input in ml of 10E-05 M of Noradrelaine" style="max-width: 95rem;" bg-variant="light">
        <p>ml: {{ milliLiterInput }}</p>
        <b-col lg="5">
          <b-input-group>
            <b-form-input v-model="milliLiterInput"></b-form-input>
            <b-input-group-append>
              <b-btn size="sm" text="Button" variant="primary" v-on:click="submitEquationInput()">Submit</b-btn>
              <b-btn size="sm" text="Button" variant="primary" v-on:click="hide()">Calculate</b-btn>
              <b-btn size="sm" text="Button" variant="primary" v-on:click="sample()"> Test!!! </b-btn>
            </b-input-group-append>
          </b-input-group>
        </b-col>
        <div id="hideChart">
          <div class="columns">
            <div class="column">
              <h3>Chart - dataset is plotted</h3>
              <GraphDisplay ref="graphDisplay"></GraphDisplay>
            </div>
          </div>
        </div>
      </b-card>
    </b-container>
    <GraphTable></GraphTable>
    <CalculateEquations ref="calculate"></CalculateEquations>
  </section>
</template>

<script>
// <CalculateEquations :test="preciousThing"></CalculateEquations>
import GraphDisplay from '@/components/GraphDisplay'
import GraphSlider from '@/components/GraphSlider'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import GraphTable from '@/components/GraphTable'
import CalculateEquations from '@/components/CalculateEquations'
import {eventHub} from '@/EventHub'

export default {
  name: 'graphPage',
  components: {
    GraphSlider,
    GraphDisplay,
    GraphTable,
    CalculateEquations
  },
  data () {
    return {
      chart: null,
      // instantiating datacollection with null
      datacollection: GraphDisplay.datacollection,
      milliLiterInput: '',
      equationInputArray: [],
      equationOutputArray: [],
      equationValue: CalculateEquations.equationValue,
      preciousThing: 'ring'
    }
  },
  methods: {
    submitEquationInput () {
      if (this.milliLiterInput === '' || isNaN(this.milliLiterInput)) {
        alert('This is not a number')
      } else {
        if ((this.equationInputArray.length + 1) <= this.$refs.currentSlider.value) {
          this.equationInputArray.push(this.milliLiterInput)
          // TODO: DOM
          let milliLiter = this.milliLiterInput * 0.001 // Convert to Milli Value
          let result = this.$refs.calculate.calculateHillLangmuirConcentration(milliLiter)
          console.log('Calculated Hill Langmuir Concentration from user input', result)
          this.$refs.graphDisplay.equationOutputArray.push(result)
          this.$refs.graphDisplay.equationResponseArray.push(this.equationInputArray.length)
          this.milliLiterInput = '' // Clears user input
        }
      }
    },
    fillData () {
      // FIXME: DOM isn't considered best practise, change to props or $emit
      this.$refs.graphDisplay.fillData()
    },
    hide () {
      let testvalue = '2'
      eventHub.$emit('echo', testvalue)
      let chart = document.getElementById('hideChart')
      if (chart.style.display === 'block') {
        this.fillData()
      } else {
        chart.style.display = 'block'
        this.fillData()
      }
    },
    sample () {
      // FIXME This section used to highlight a curve of values
      let sample = [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 5096, 10192, 20384, 40768, 81536, 163072, 326144, 652288
      ]
      let sampleLength = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
      let temp = []
      for (var x in sample) {
        var result = this.$refs.calculate.calculateHillLangmuirConcentration((sample[x] * 0.01))
        temp.push(result)
      }
      console.log(temp)
      this.$refs.graphDisplay.equationOutputArray = temp
      this.$refs.graphDisplay.equationResponseArray = sampleLength
      let chart = document.getElementById('hideChart')
      if (chart.style.display === 'block') {
        this.fillData()
      } else {
        chart.style.display = 'block'
        this.fillData()
      }
    }
  }
}
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
#hideChart {
  display:none
}
#currentSlider {
  float: right;
}
#test {
  margin: 0 0;
  padding: 0 0;
}
</style>
