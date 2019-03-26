<template>
  <div>
    <Header></Header>
    <section class="container">
      <ul>
      </ul>
      <b-container id="test">
        <b-card title="Input in ml of 10E-05 M of Noradrenaline" style="max-width: 95rem;" bg-variant="light">
          <div id="hideInfo" class="userInfo">
            <info ref="settingsModalRef"></info>
          </div>
          <div>
            <GraphSlider ref="slider"></GraphSlider>
          </div>
          <p>ml: {{ milliLiterInput }}</p>
          <b-col lg="5">
            <b-input-group>
              <b-form-input v-model="milliLiterInput"></b-form-input>
              <b-input-group-append>
                <b-btn size="sm" text="Button" variant="primary" v-on:click="submitEquationInput()">Submit</b-btn>
                <b-btn size="sm" text="Button" variant="primary" @click="Calculate">Calculate</b-btn>
                <b-button @click="sample">Sample</b-button>
              </b-input-group-append>
            </b-input-group>
          </b-col>
          <div id="hideChart">
            <div class="columns">
              <div class="column">
                <h3>Data Result</h3>
                <GraphDisplay ref="GraphDisplay"></GraphDisplay>
              </div>
            </div>
          </div>
        </b-card>
      </b-container>
      <GraphTable  ref="GraphTable"></GraphTable>
      <CalculateEquations ref="CalculateEquations"></CalculateEquations>
    </section>
  </div>

</template>

<script>
import {sessionToken, api} from '@/components/LoginView'
import {eventHub} from '@/EventHub'
import GraphDisplay from '@/components/GraphChart/GraphDisplay'
import GraphSlider from '@/components/GraphChart/GraphSlider'
import GraphTable from '@/components/GraphChart/GraphTable'
import CalculateEquations from '@/components/GraphChart/CalculateEquations'
import Info from '@/components/GraphChart/Info'
import Header from '@/components/Extra/Header'
import axios from 'axios'
export default {
  name: 'graphPage',
  components: {
    Info,
    GraphSlider,
    GraphDisplay,
    GraphTable,
    CalculateEquations,
    Header
  },
  data () {
    return {
      chart: null,
      datacollection: GraphDisplay.datacollection,
      milliLiterInput: '',
      dosageArray: [],
      concentrationArray: [],
      equationValue: CalculateEquations.equationValue,
      BInput: '', // '20^2',
      MinResponse: CalculateEquations.MinResponse, // '0',
      MaxResponse: CalculateEquations.MaxResponse, // '150'
      deviation: CalculateEquations.deviation,
      checked: false // Info modal checkbox
    }
  },
  methods: {
    submitEquationInput () {
      if (this.milliLiterInput === '' || isNaN(this.milliLiterInput)) {
        alert('This is not a number')
      } else {
        if ((this.dosageArray.length + 1) <= this.$refs.slider.value) {
          let milliLiter = this.milliLiterInput * 0.001 // Convert to Milli Value
          let concentration = this.$refs.CalculateEquations.calculateHillDosageResponse(milliLiter)
          let response = this.$refs.CalculateEquations.calculateHillDosageResponse(milliLiter)
          this.passToTable([this.milliLiterInput, response, concentration])
          this.dosageArray.push(response)
          this.concentrationArray.push(milliLiter)
          eventHub.$emit('User inputted new value for graph', milliLiter)
          this.milliLiterInput = '' // Clears user input
        }
      }
    },
    fillData () {
      this.$refs.GraphDisplay.fillData()
    },
    Calculate () {
      let chart = document.getElementById('hideChart')
      this.$refs.GraphDisplay.concentrationArray = this.concentrationArray
      this.$refs.GraphDisplay.dosageArray = this.dosageArray
      if (chart.style.display === 'block') {
        this.fillData()
      } else {
        chart.style.display = 'block'
        this.fillData()
      }
    },
    passToTable (val) {
      let array = { amount: val[0], moles_added: val[0], concentration: val[2], response: val[1] }
      this.$refs.GraphTable.items.push(array)
    },
    SendData () {
      let data = this.$refs.GraphDisplay.dosageArray
      axios({
        method: 'post',
        url: api + 'sendChartData',
        data: JSON.stringify(data), // Get mcq associated with mcq_id
        headers: { 'Authorization': 'Bearer  ' + sessionToken }
      })
        .then((response) => {
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
    },
    sample () {
      let dosage = [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 5096, 10192, 20384, 40768, 81536, 163072, 326144, 652288
      ]
      let temp = []
      for (var x in dosage) {
        var result = this.$refs.CalculateEquations.calculateHillDosageResponse((dosage[x] * 0.01))
        temp.push(result)
      }
      this.$refs.GraphDisplay.dosageArray = temp
      this.$refs.GraphDisplay.concentrationArray = dosage
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
}

a {
  color: #42b983;
}
#hideChart {
  display:none
}
#test {
  margin: 0 0;
  padding: 0 0;
}
.userInfo {
  float: right;
}
</style>
