import Vue from 'vue'
import Echo from 'laravel-echo'
import axios from 'axios'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

// Pusher
window.Pusher = require('pusher-js')

// Echo
window.Echo = new Echo({
  broadcaster: 'pusher',
  key: process.env.VUE_APP_WEBSOCKETS_KEY,
  cluster: process.env.VUE_APP_WEBSOCKETS_CLUSTER,
  wsHost: process.env.VUE_APP_WEBSOCKETS_SERVER,
  wsPort: 6001,
  forceTLS: false,
  disableStats: true
})

// Axios
window.axios = axios.create({
  baseURL: process.env.VUE_APP_API_URL
})
window.axios.interceptors.request.use(function (config) {
    config.headers.post['Content-Type'] = 'application/json'
    config.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
    return config
  }, function (error) {
    return Promise.reject(error)
  })
window.axios.interceptors.response.use(function (response) {
    return response
  }, function (error) {
    return Promise.reject(error)
  })

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
