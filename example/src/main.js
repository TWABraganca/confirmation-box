import Vue from 'vue'
import App from './App.vue'

import ConfirmationBox from '@/index.js'
// import ConfirmationBox from '../../lib/index.umd.min.js'

Vue.use(ConfirmationBox, { clickOutside: { texto: 'click outside' } })

Vue.config.productionTip = false

new Vue({
  render: (h) => h(App),
}).$mount('#app')
