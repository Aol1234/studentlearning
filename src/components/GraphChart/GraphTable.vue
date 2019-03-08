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
      <span slot="moles_added" slot-scope="data" v-html='formatter(data.value)'></span>
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
      footClone: true
    }
  },
  methods: {
    // FIXME: Function called twice for each element
    formatter (data) {
      if (typeof data === 'string') {
        var html = katex.renderToString('\\val*10^{-8}', {
          throwOnError: false,
          macros: {
            '\\val': data
            // '\\power': powerOf
          }
        })
        return html
      }
    }
  }
}

</script>
