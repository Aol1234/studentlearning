<template>
  <div>
    <vue-slider ref="slider" v-model="value" v-bind="options"></vue-slider>
  </div>
</template>

<script>
import vueSlider from 'vue-slider-component'
export default {
  components: {
    vueSlider
  },
  data () {
    return {
      value: 8,
      options: {
        width: 8,
        height: '32.15rem',
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
          'display': 'inline-block',
          'marginLeft': '4.5rem'
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
