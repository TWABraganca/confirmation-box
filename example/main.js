import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'

// import ConfirmationBox from '../src/index.js'
import ConfirmationBox from '../lib/confirmation-box.cjs.js'
Vue.use(ConfirmationBox, vuetify, { clickOutside: { texto: 'a tua prima' } })

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: (h) => h(App),
}).$mount('#app')
