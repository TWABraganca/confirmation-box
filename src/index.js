import ConfirmationBox from './ConfirmationBox.vue'
import { events } from './events.js'

export default {
  install(Vue) {
    if (this.installed) {
      return
    }
    this.installed = true

    Vue.component('confirmationBox', ConfirmationBox)

    const box = (params) => {
      if (typeof params === 'string') {
        params = { message: params }
      }

      if (typeof params === 'object' && !Array.isArray(params)) {
        return new Promise((resolve, reject) => {
          events.$emit(
            'open',
            params,
            (response) => {
              resolve(response)
            },
            (error) => {
              reject(error)
            }
          )
        })
      }
    }

    box.close = () => {
      events.$emit('close')
    }

    Vue.prototype.$confirmationBox = box
    Vue.confirmationBox = box
  },
}
