<template>
  <div class="loginPage">
    <h1>Login Page</h1>
    <p>Login Page</p>
    <!-- @submit handles any form of submission. -->
    <!-- .prevent keeps the event from bubbling around and doing anything else. -->
    <form>
      <label>
        Email:
        <input type="email" v-model="user.email"/>
      </label>
      <label>
        Password:
        <input type="password" v-model="user.password"/>
      </label>
      <button @click="SignUp">Sign-up</button>
      <button @click="Login">Login</button>
    </form>

    <p>If you click the "Submit" button, the form-data will be sent to a page called "/action_page.php".</p>
  </div>
</template  >

<script>
import firebase from 'firebase'
import axios from 'axios'
const api = 'http://localhost:8002/'
export default {
  name: 'LoginPage',
  data () {
    return {
      user: {
        email: '',
        // name: '',
        password: ''
      },
      idToken: ''
    }
  },
  methods: {
    SignUp () {
      firebase.auth().createUserWithEmailAndPassword(this.user.email, this.user.password).then((user) => {
        this.$router.replace('dashboard')
      }).catch((err) => {
        alert('Error: ' + err.message)
      })
    },
    Login () {
      firebase.auth().signInWithEmailAndPassword(this.user.email, this.user.password).then((user) => {
        this.auth()
        this.$router.replace('dashboard')
      }).catch((err) => {
        alert('Error: ' + err.message)
      })
    },
    auth () {
      firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function (idToken) {
        // Send token to your backend via HTTPS
        // let b = JSON.stringify('this is a  very long and pointless statement')
        console.log(idToken)
        // this.idToken = idToken
        axios.post(api + 'studentAuth', JSON.stringify({idtoken: idToken}))
          .then((response) => {
            // console.log(JSON.parse(response.data))
            console.log('Reply: ', response)
          })
          .catch(error => {
            console.log(error)
          })
      }).catch(function (error) {
        console.log(error)
      })
      // this.authServer(this.idToken)
    },
    authServer (idToken) {
      axios.post(api + 'studentAuth', JSON.stringify({idtoken: idToken}))
        .then((response) => {
          // console.log(JSON.parse(response.data))
          console.log('Reply: ', response)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>

</style>
