import ConfirmationBox from './ConfirmationBox.vue'
export default {
  install(Vue, vuetify, options = {}) {
    if (this.installed) {
      return
    }
    this.installed = true

    this.options = options || {}

    const Ctor = Vue.extend(Object.assign({}, { vuetify }, ConfirmationBox))

    const box = (params) => {
      const component = new Ctor(
        Object.assign({}, ConfirmationBox, {
          propsData: Object.assign({}, this.options),
        })
      )

      if (typeof params === 'string') {
        params = { message: params }
      }

      if (typeof params === 'object' && !Array.isArray(params)) {
        const container =
          document.querySelector('[data-app=true]') || document.body

        return new Promise((resolve, reject) => {
          component.setCallback((response) => {
            container.removeChild(component.$el)
            resolve(response)
          })
          component.setErrorCallback((error) => {
            container.removeChild(component.$el)
            reject(error)
          })
          container.appendChild(component.$mount().$el)
          component.open(params)
        })
      }
    }

    Vue.prototype.$confirmationBox = box
  },
}

// module.exports = install

// if (typeof window !== 'undefined' && window.Vue) {
//   Vue.use({ install })
// }
