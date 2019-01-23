// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'

Vue.config.productionTip = false

// Initialize Firebase
/*
  For the simplicity of the tutorial, we put the Firebase configuration in main.js file,
  but on real production system, avoid to do that and put it in a specific configuration
  file. Also, you may see appear in the console some Firebase warnings about only importing
  the part of the SDK we actually use. In production, you should definitely do that! But
  again, to keep the simplicity of this tutorial, I skip this part.
*/
let config = {
  apiKey: 'AIzaSyCrhvfQOU1Hc1H3XQ53s2SRHQn7kYe5q-o',
  authDomain: 'braided-hangout-219715.firebaseapp.com',
  databaseURL: 'https://braided-hangout-219715.firebaseio.com/', // TODO: Currently in test mode, insecure
  projectId: 'braided-hangout-219715',
  storageBucket: 'braided-hangout-219715.appspot.com/',
  messagingSenderId: '107294371874'
}
firebase.initializeApp(config)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

export const bus = new Vue()
