import Vue from 'vue'
import Echo from 'laravel-echo'
import App from './App.vue'

Vue.config.productionTip = false

window.Pusher = require('pusher-js')

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: process.env.VUE_APP_WEBSOCKETS_KEY,
    cluster: process.env.VUE_APP_WEBSOCKETS_CLUSTER,
    forceTLS: false,
    wsHost: process.env.VUE_APP_WEBSOCKETS_SERVER,
    wsPort: 6001,
    disableStats: false,
})

new Vue({
  render: h => h(App),
}).$mount('#app')
