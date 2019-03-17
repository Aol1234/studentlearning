<template>
  <div>
  <b-btn v-b-modal.modal1>Settings</b-btn>
  <b-modal id="modal1" title="Settings">
    <p class="my-4">Settings</p>
    <b-col>
      <div v-show="value">
        <b-card style="max-width: 15rem; float: right;" bg-variant="light">
          <p>Number of DataPoints:</p>
          <vue-slider ref="slider" v-model="value" v-bind="options"></vue-slider>
        </b-card>
      </div>
    </b-col>
    <b-col style="max-width: 15rem; float: left;">
      <label class="mr-sm-4" for="B">B</label>
      <b-form-input id="B" v-model="BInput" v-on.lazy:input='emitBInput(BInput)'></b-form-input>
      <label class="mr-sm-4" for="Min">Min Response</label>
      <b-form-input id="Min" v-model="MinResponse" v-on.lazy:input='emitMinResponse(MinResponse)'></b-form-input>
      <label class="mr-sm-4" for="Max">Max Response</label>
      <b-form-input id="Max" v-model="MaxResponse" v-on.lazy:input='emitMaxResponse(MaxResponse)'></b-form-input>
      <label class="mr-sm-4" for="Dev">Deviation</label>
      <b-form-input id="Dev" v-model="deviation" v-on.lazy:input='emitdeviation(deviation)'></b-form-input>
    </b-col>
  </b-modal>
  </div>
</template>

<script>
import vueSlider from 'vue-slider-component'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import {eventHub} from '@/EventHub'
export default {
  components: {
    vueSlider
  },
  watch: {
    deep: true,
    value (val) {
      if (val) {
        console.log('GraphSlider WatchEvent Caught')
        this.$nextTick(() => this.$refs.slider.refresh())
      }
    }
  },
  data () {
    return {
      BInput: 20,
      MinResponse: 1,
      MaxResponse: 150,
      deviation: 0.1,
      value: 8,
      options: {
        width: 8,
        height: 200,
        dotSize: 20,
        min: 2,
        max: 20,
        interval: 2,
        disabled: false,
        show: true,
        speed: 0.3,
        direction: 'vertical',
        reverse: false,
        lazy: true,
        tooltip: 'always',
        piecewise: true,
        style: {
          // 'display': 'inline-block'
          // 'marginLeft': '4.5rem'
        }
      }
    }
  },
  methods: {
    emitBInput (val) {
      eventHub.$emit('BInput', val)
    },
    emitMinResponse (val) {
      eventHub.$emit('MinResponse', val)
    },
    emitMaxResponse (val) {
      eventHub.$emit('MaxResponse', val)
    },
    emitdeviation (val) {
      eventHub.$emit('deviation', val)
    }
  }
}
</script>

<style scoped>

</style>
