<template>
  <div
    class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center"
    id="my-modal"
  >
    <div class="confirmation-box relative w-96 shadow-lg">
      <div class="p-5 text-center flex flex-col">
        <div
          v-if="dialog.icon"
          class="confirmation-icon mx-auto flex items-center justify-center rounded-full"
          :style="setIconStyle(dialog.color)"
        >
          <i :class="dialog.icon" />
        </div>
        <h3
          class="confirmation-title text-lg leading-6 font-medium text-gray-900 mt-4"
        >
          {{ dialog.title }}
        </h3>
        <div v-if="dialog.message" class="confirmation-text mt-1 p-1">
          <span class="text-sm text-gray-500" v-html="dialog.message" />
        </div>
      </div>
      <div class="rounded-[inherit] flex">
        <button
          v-for="(button, index) in dialog.buttons"
          :key="'button-confirmation-' + index"
          class="confirmation-button px-4 py-2 text-base font-medium w-full shadow-sm"
          :style="setColors(button.color)"
          @click="handleClick(button.result)"
          @mouseover="swapHoverEffect($event, button.color)"
          @mouseleave="swapHoverEffect($event)"
        >
          {{ button.text }}
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ConfirmationBox',
  props: {
    icon: {
      type: [Boolean, String],
      default: false,
    },
    iconSize: {
      type: Number,
      default: 12,
    },
    color: {
      type: String,
      default: 'primary',
    },
    title: {
      type: String,
      default: 'Are you sure?',
    },
    clickOutside: {
      type: [Boolean, String, Number, Object],
      default: false,
    },
    theme: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      dialog: {
        title: this.title,
        color: this.color,
        icon: this.icon,
        iconSize: this.iconSize,
        message: '',
        close: this.clickOutside,
        buttons: [{ text: 'Ok', result: true, color: 'primary' }],
      },
      callback: () => {},
      errorCallback: () => {},
    }
  },
  mounted() {
    window.addEventListener('click', this.clickOutsideFnc)
  },
  destroyed() {
    window.removeEventListener('click', this.clickOutsideFnc)
  },
  methods: {
    swapHoverEffect(e, color = 'transparent') {
      const element = e.target
      if (color !== 'transparent') {
        const colorRGB = this.getRGBColor(this.theme[color] || color)
        element.style.backgroundColor = `rgba(${colorRGB[0]}, ${colorRGB[1]}, ${colorRGB[2]}, 0.1)`
      } else {
        element.style.backgroundColor = color
      }
    },
    setIconStyle(color) {
      const colorRGB = this.getRGBColor(color)
      const factor =
        colorRGB[0] * 0.299 + colorRGB[1] * 0.587 + colorRGB[2] * 0.114

      return {
        backgroundColor: this.theme[color] || color,
        color: factor > 186 ? 'black' : 'white',
        width: this.dialog.iconSize * 1.8 + 'px',
        height: this.dialog.iconSize * 1.8 + 'px',
        fontSize: this.dialog.iconSize + 'px',
      }
    },
    setColors(color) {
      return {
        color: this.theme[color] || color,
      }
    },
    getRGBColor(color) {
      const canvas = document.createElement('canvas')
      canvas.width = 1
      canvas.height = 1

      const context = canvas.getContext('2d')
      context.fillStyle = this.theme[color] || color
      context.fillRect(0, 0, 1, 1)

      return context.getImageData(0, 0, 1, 1).data
    },
    open(params) {
      this.resetState()
      Object.assign(this.dialog, params)
    },
    handleClick(res) {
      this.callback(res)
    },
    clickOutsideFnc() {
      let modal = document.getElementById('my-modal')
      if (event.target == modal && this.dialog.close !== null) {
        this.handleClick(this.dialog.close)
      }
    },
    setCallback(fn) {
      this.callback = fn
    },
    setErrorCallback(fn) {
      this.errorCallback = fn
    },
    resetState() {
      this.dialog = {
        title: this.title,
        color: this.color,
        icon: this.icon,
        iconSize: this.iconSize,
        message: '',
        close: this.clickOutside,
        buttons: [{ text: 'Ok', result: true, color: 'primary' }],
      }
    },
  },
}
</script>
<style lang="css" scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;

.confirmation-box {
  font-family: inherit;
  -webkit-user-select: none; /* Safari */
  user-select: none;
}
.confirmation-box {
  width: 350px;
  background-color: white;
  border-radius: 25px;
}
.confirmation-button {
  border-top: 1px solid rgba(0, 0, 0, 0.12);
  border-right: 1px solid rgba(0, 0, 0, 0.12);
}
.confirmation-button:first-of-type {
  border-bottom-left-radius: inherit;
}
.confirmation-button:last-of-type {
  border-bottom-right-radius: inherit;
  border-right: none;
}
</style>
