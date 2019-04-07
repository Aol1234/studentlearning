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
    </b-table>
  </div>
</template>
<script>

import 'katex/dist/katex.min.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
const items = []
export default {
  data () {
    return {
      values: [],
      fields: [
        {key: 'amount', label: 'Amount(ml)'},
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
  }
}

</script>
