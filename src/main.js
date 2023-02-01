import Vue from 'vue'
import App from './App.vue'
import store from './store'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.scss'

Vue.config.productionTip = false

function noop() {}

Object.keys(console)
  .filter(k => typeof console[k] === 'function')
  .forEach(k => {
    console[k] = noop
  })

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
