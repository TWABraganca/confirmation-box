<template>
  <!-- <v-dialog
    @click:outside="clickOutsideFnc()"
    persistent
    content-class="confirmation-box"
    v-model="isShow"
  >
    <v-row class="ma-0 mt-2 justify-center">
      <v-col class="pa-0 text-center">
        <v-icon :color="dialog.color ? dialog.color : 'default'" size="150">{{
          dialog.icon
        }}</v-icon>
        <h3 class="mt-2">{{ dialog.title }}</h3>
        <span v-if="dialog.message" v-html="dialog.message"></span>
      </v-col>
    </v-row>

    <v-row class="ma-0 mt-4 justify-center">
      <v-col
        v-for="(button, index) in dialog.buttons"
        :key="'button-confirmation-' + index"
        class="pa-0 confirmation-button"
      >
        <v-btn
          :color="button.color"
          text
          width="100%"
          @click="handleClick(button.result)"
          >{{ button.text }}</v-btn
        >
      </v-col>
    </v-row>
  </v-dialog> -->
  <div
    class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center"
    id="my-modal"
  >
    <div class="confirmation-box relative w-96 shadow-lg">
      <div class="p-5 text-center flex flex-col">
        <div
          class="confirmation-icon mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100"
        >
          <svg
            class="h-6 w-6 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        </div>
        <h3
          class="confirmation-title text-lg leading-6 font-medium text-gray-900"
        >
          {{ dialog.title }}
        </h3>
        <div v-if="dialog.message" class="confirmation-text mt-2 px-7 py-3">
          <span class="text-sm text-gray-500" v-html="dialog.message" />
        </div>
      </div>
      <div class="items-center confirmation-button rounded-b-[inherit]">
        <button
          class="px-4 py-2 bg-green-500 text-white text-base font-medium w-full shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
          @click="close"
        >
          OK
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
      type: String,
      default: 'mdi-help-circle-outline',
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
  },
  data() {
    return {
      isShow: false,
      dialog: {
        title: this.title,
        color: this.color,
        icon: this.icon,
        message: '',
        close: this.clickOutside,
        buttons: [{ text: 'Ok', result: true, color: 'primary' }],
      },
      callback: () => {},
      errorCallback: () => {},
    }
  },
  mounted() {
    window.onclick = this.clickOutsideNewFnc
  },
  methods: {
    // NEW METHODS
    newOpen() {
      let modal = document.getElementById('my-modal')
      console.log(modal)
      modal.style.display = 'block'
    },
    close() {
      let modal = document.getElementById('my-modal')
      console.log(modal)
      this.callback(true)
    },
    clickOutsideNewFnc() {
      let modal = document.getElementById('my-modal')
      console.log('teste')
      if (event.target == modal) {
        modal.style.display = 'none'
      }
    },
    // OLDS METHODS
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
        message: '',
        close: this.clickOutside,
        buttons: [{ text: 'Ok', result: true, color: 'primary' }],
      }
    },
    clickOutsideFnc() {
      if (this.dialog.close !== null) {
        this.handleClick(this.dialog.close)
      }
    },
    handleClick(res) {
      this.isShow = false
      this.callback(res)
    },
    open(params) {
      this.resetState()
      Object.assign(this.dialog, params)
      this.isShow = true
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
}

.confirmation-box {
  width: 350px;
  background-color: white;
  border-radius: 25px;
}

.confirmation-button button {
  border-top: 1px solid rgba(0, 0, 0, 0.12);
  border-right: 1px solid rgba(0, 0, 0, 0.12);
}

.confirmation-button:first-of-type button {
  border-bottom-left-radius: inherit;
}
.confirmation-button:last-of-type button {
  border-bottom-right-radius: inherit;
  border-right: none;
}
</style>
