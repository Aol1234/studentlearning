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
export const api = 'https://studentlearningserver.herokuapp.com/' // 'http://localhost:8000/'
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
        sessionToken = idToken
        headers = {
          Authorization: `Bearer  ${sessionToken}`
        }
        axios.post(api + 'studentAuth/SignUp', JSON.stringify({idtoken: idToken}))
          .catch(error => {
            console.log(error)
          })
      }).catch(function (error) {
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>
.loginPage{
  margin-top: 3vw;
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
  margin-bottom: 2vw;
}
#Header{
  font-size: 6vw;
  text-align: center;
  color: white;
  //margin-right: 20vw;
  //margin-left: 20vw;
  padding-bottom: 2vw;
  border-bottom-right-radius: 30vw;
  border-bottom-left-radius: 30vw;
  background-color: #4938f8;
}
</style>
