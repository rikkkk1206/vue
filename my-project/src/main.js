import Vue from 'vue'
import App from './App.vue'
import router from './router' //追加
import BootstrapVue from 'bootstrap-vue' // add
import 'bootstrap/dist/css/bootstrap.css' // add
import 'bootstrap-vue/dist/bootstrap-vue.css' // add
import './assets/scss/custom.scss' //変更
Vue.use(BootstrapVue) // add

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
