<template>
  <div>
  <b-btn v-b-modal.modal1>Settings</b-btn>
  <!-- Modal Component -->
  <b-modal id="modal1" title="Bootstrap-Vue">
    <p class="my-4">Settings</p>
    <div v-show="value">
      <b-card style="max-width: 15rem; float: right;" bg-variant="light">
        <p>Number of DataPoints:</p>
        <vue-slider ref="slider" v-model="value" v-bind="options"></vue-slider>
      </b-card>
    </div>
    <b-col lg="5">
      <b-input-group>
        <b-form-input v-model="BInput"  v-on.lazy:input='emitBInput(BInput)'></b-form-input>
        <b-form-input v-model="MinResponse" v-on.lazy:input='emitMinResponse(MinResponse)'></b-form-input>
        <b-form-input v-model="MaxResponse" v-on.lazy:input='emitMaxResponse(MaxResponse)'></b-form-input>
      </b-input-group>
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
  // FIXME: Needs to refresh when modal is open, does'nt refresh until interaction with slider
  watch: {
    deep: true,
    value (val) {
      console.log('Caught!!!')
      if (val) {
        this.$nextTick(() => this.$refs.slider.refresh())
      }
    }
  },
  data () {
    return {
      BInput: 20,
      MinResponse: 1,
      MaxResponse: 150,
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
    }
  }
}
</script>

<style scoped>

</style>
