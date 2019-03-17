<template>
    <div>
      <Header></Header>
      <b-row>
        <b-col>
          <h3>Create Group</h3>
          <b-input-group class="formGroup">
            <b-input-group-text slot="prepend">Group Name</b-input-group-text>
            <b-form-input v-model="Name">
            </b-form-input>
          </b-input-group>
          <b-input-group class="formGroup">
            <b-input-group-text slot="prepend">Description</b-input-group-text>
            <b-form-input v-model="Desc">
            </b-form-input>
          </b-input-group>
          <button id="createButton" @click="creatUserGroup">Create</button>
        </b-col>
        <b-col>
        <h3>Join Group</h3>
          <b-input-group prepend="Group Code" class="formGroup">
            <b-form-input>
            </b-form-input>
          </b-input-group>
          <button id="joinButton">Join</button>
        </b-col>
      </b-row>
      {{Code}}
    </div>
</template>

<script>
import {sessionToken, api} from '@/components/LoginView'
import Header from '@/components/Extra/Header'
import axios from 'axios'
export default {
  name: 'CreateGroupView',
  components: {Header},
  data () {
    return {
      Name: '',
      Desc: '',
      Code: ''
    }
  },
  methods: {
    creatUserGroup () {
      let body = {
        'Name': this.Name,
        'Desc': this.Desc
      }
      axios({
        method: 'post',
        url: api + 'createUserGroup',
        data: JSON.stringify(body), // Get mcq associated with mcq_id
        headers: { 'Authorization': 'Bearer  ' + sessionToken }
      })
        .then((response) => {
          console.log(response)
          this.Code = response.data
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
.formGroup{
  //width: 60vw;
  //margin-left: 10vw;
}
#joinButton{
  background-color: red;
}
#createButton{
  background-color: #007bff;
}
</style>
