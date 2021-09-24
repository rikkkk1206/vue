import Vue from 'vue'
import App from './App.vue'
import router from './router' //追加
import * as firebase from "firebase/app";
import BootstrapVue from 'bootstrap-vue' // add
import 'bootstrap/dist/css/bootstrap.css' // add
import 'bootstrap-vue/dist/bootstrap-vue.css' // add
//import './assets/scss/custom.scss' //変更
Vue.use(BootstrapVue) // add

Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: "AIzaSyBLG-bC5ddNFLsd5Hm4pWokQ9o1KKsZgmo",
  authDomain: "fir-2-85e6e.firebaseapp.com",
  projectId: "fir-2-85e6e",
  storageBucket: "fir-2-85e6e.appspot.com",
  messagingSenderId: "196735240700",
  appId: "1:196735240700:web:87759a1b87cdc1513c4a79",
  measurementId: "G-6K8EBM8GNW"
}
firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
