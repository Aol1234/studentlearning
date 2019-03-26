<template>
  <div>
    <link rel="icon" type="image/png" href="data:image/png;base64,iVBORw0KGgo=">
    <b-btn @click="showModal">Info</b-btn>
    <b-modal ref="settingsModalRef" id="info" title="Info" hide-footer size="lg">
      <b-form-checkbox v-model="GraphInfoModal" name="check-button">
        <b>Don't show this again:</b>
      </b-form-checkbox>
      <div>
        <br>
        <h6><b>Settings</b></h6>
        <b-card>
          <p>The setting menu will display multiple options</p>
          <p><b>B</b>: This is the point of Inflection run</p>
          <p><b>Min</b>: This is the minimum response</p>
          <p><b>Max</b>: This is the maximum response</p>
          <p><b>Deviation</b>: This is the amount of noise allowed as a percentage of total</p>
          <p><b>Slider</b>: This indicates the total amount of data points on the graph</p>
        </b-card>
        <h6><b>Graph</b></h6>
        <b-card>
          <p>The graph options</p>
        </b-card>
        <h6><b>Table</b></h6>
        <b-card>
          <p>The table will display</p>
        </b-card>
      </div>
    </b-modal>
  </div>
</template>

<script>
import {sessionToken, api} from '@/components/LoginView'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
export default {
  name: 'Info',
  data () {
    return {
      GraphInfoModal: false, // Info modal checkbox
      configs: {} // UserConfigs,
    }
  },
  methods: {
    showModal () {
      this.$refs.settingsModalRef.show()
    },
    popUpModal () {
      if (this.configs['GraphInfoModal'] === 0) {
        this.showModal()
      } else {
        this.GraphInfoModal = true
      }
    }
  },
  watch: {
    GraphInfoModal: {
      handler: function (boolean) {
        let request = {}
        if (boolean === true) {
          request = {
            UserId: 0,
            GraphInfoModal: 1 // True
          }
        } else if (boolean === false) {
          request = {
            UserId: 0,
            GraphInfoModal: 0 // False
          }
        }
        axios({
          method: 'post',
          url: api + 'updateUserPreferences',
          data: JSON.stringify(request),
          headers: { 'Authorization': 'Bearer  ' + sessionToken }
        })
          .then((response) => {
            console.log('Here!', response)
            this.configs = request.GraphInfoModal
          })
          .catch(error => {
            console.log(error)
            this.errored = true
          })
      }
    }
  },
  created () {
    console.log('Echo')
    if (this.configs['GraphInfoModal'] === undefined) {
      axios({
        method: 'get',
        url: api + 'getUserPreferences',
        headers: {'Authorization': 'Bearer  ' + sessionToken}
      })
        .then((response) => {
          console.log('Here!', response)
          this.configs = response.data
          this.popUpModal()
        })
        .catch(error => {
          console.log(error)
          this.errored = true
        })
    }
  }
}
</script>

<style scoped>

</style>
