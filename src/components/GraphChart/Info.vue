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
        <p>The setting menu will display multiple options</p>
        <h6><b>Graph</b></h6>
        <p>The graph options</p>
        <h6><b>Table</b></h6>
        <p>The table will display</p>
      </div>
    </b-modal>
  </div>
</template>

<script>
import {sessionToken} from '../LoginPage'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
const api = 'http://localhost:8000/'
export default {
  name: 'Info',
  data () {
    return {
      GraphInfoModal: false, // Info modal checkbox
      configs: {}, // UserConfigs,
      headers: {
        'Authorization': 'Bearer 700e9323-0140-4d49-b574-e8652fa433a'
      }
    }
  },
  methods: {
    showModal () {
      this.$refs.settingsModalRef.show()
    },
    popUpModal () {
      if (this.configs === 0) {
        this.showModal()
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
            console.log(response.config.data, this.headers)
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
    console.log('Headers:', sessionToken)
    axios({
      method: 'get',
      url: api + 'getUserPreferences',
      headers: { 'Authorization': 'Bearer  ' + sessionToken }
    })
      .then((response) => {
        console.log('Get Preference', response.config.data)
        this.configs = response.config.data
      })
      .catch(error => {
        console.log(error)
        this.errored = true
      })
  }
}
</script>

<style scoped>

</style>
