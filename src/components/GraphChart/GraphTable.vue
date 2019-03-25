<template>
  <div>
    <b-table :striped="striped"
             :bordered="bordered"
             :outlined="outlined"
             :small="small"
             :hover="hover"
             :dark="dark"
             :fixed="fixed"
             :foot-clone="footClone"
             :items="items"
             :fields="fields">
      <span slot="moles_added" slot-scope="data" v-html='formatMoles(data.value)'></span>
      <span slot="concentration" slot-scope="data" v-html='formatConcentration(data.value)'></span>
    </b-table>
  </div>
</template>
<script>
import 'katex/dist/katex.min.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import katex from 'katex'
const items = []
export default {
  data () {
    return {
      values: [],
      // m: {amount},
      fields: [
        {key: 'amount', label: 'Amount(ml)'},
        'moles_added',
        {key: 'concentration', label: 'Concentration of Organ Bath(M)'},
        'response'
      ],
      items: items,
      striped: false,
      bordered: false,
      outlined: true,
      small: false,
      hover: true,
      dark: false,
      fixed: false,
      footClone: true,
      exponential: 11
    }
  },
  methods: {
    formatMoles (data) {
      if (typeof data === 'string') {
        let html = katex.renderToString('\\val*10^{-' + this.exponential + '}', {
          throwOnError: false,
          macros: {
            '\\val': data
          }
        })
        return html
      }
    },
    formatConcentration (data) {
      let decimalCount = this.precision(data)
      // console.log(decimalCount, data)
      let html = katex.renderToString('\\val*10^{-' + this.exponential + '}', {
        throwOnError: false,
        macros: {
          '\\val': decimalCount.toString()
        }
      })
      return html
    },
    precision (a) { //  Source: https://stackoverflow.com/a/27865285
      if (!isFinite(a)) return 0
      let e = 1
      let p = 0
      while (Math.round(a * e) / e !== a) {
        e *= 10
        p++
      }
      return p
    }
  }
}

</script>
