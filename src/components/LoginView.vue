<template>
  <div>
    <div>
      <h1 id="Header">Login Page</h1>
    </div>
    <div class="loginPage">
      <b-form-group id="loginForm">
        <div class="EmailField">
          <label for="email" class="loginInputLabel">Email:</label>
          <b-form-input id="email" type="email" v-model="user.email"/>
        </div>
        <div class="PassField">
          <label for="password" class="loginInputLabel">Password:</label>
          <b-form-input id="password" type="password" v-model="user.password"/>
        </div>
        <div class="Buttons">
          <b-button @click="SignUp">Sign-up</b-button>
          <b-button @click="Login">Login</b-button>
        </div>
      </b-form-group>
    </div>
  </div>
</template  >

<script>
import firebase from 'firebase'
import axios from 'axios'
export const api = 'http://localhost:8000/'
export var sessionToken = ''
export var headers = ''
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
        this.authSignUp()
        this.$router.replace('dashboard')
      }).catch((err) => {
        alert('Error: ' + err.message)
      })
    },
    Login () {
      firebase.auth().signInWithEmailAndPassword(this.user.email, this.user.password).then((user) => {
        this.authLogin()
        this.$router.replace('dashboard')
      }).catch((err) => {
        alert('Error: ' + err.message)
      })
    },
    authLogin () {
      firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function (idToken) {
        sessionToken = idToken
        headers = {
          Authorization: `Bearer  ${sessionToken}`
        }
        axios.post(api + 'studentAuth/Login', JSON.stringify({idtoken: idToken}))
          .catch(error => {
            console.log(error)
          })
      }).catch(function (error) {
        console.log(error)
      })
    },
    authSignUp () {
      firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function (idToken) {
        console.log(idToken)
        axios.post(api + 'studentAuth/SignUp', JSON.stringify({idtoken: idToken}))
          .catch(error => {
            console.log(error)
          })
      }).catch(function (error) {
        console.log(error)
      })
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
.loginPage{
  margin-left: 20vw;
  margin-right: 20vw;
}
#loginForm{
  border-style: solid;
  border-width: 0.1vw;
  border-color: #5a6268;
  border-radius: 0.5vw;
}
.loginInputLabel{
}
.EmailField{
  padding-top: 2vw;
  width: 50%;
  text-align: center;
  margin: auto;
}
.PassField{
  padding-top: 2vw;
  margin: auto;
  text-align: center;
  width: 50%;
}
.inputField{
  width: 40%;
}
.Buttons{
  margin-top: 3vw;
  margin-left: 40%;
}
#Header{
  font-size: 6vw;
  text-align: center;
  margin-bottom: 5vh;
}
</style>
