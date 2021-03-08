<template>
  <v-dialog
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
        <span v-if="dialog.message">{{ dialog.message }}</span>
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
  </v-dialog>
</template>
<script>
import { VDialog, VRow, VCol, VIcon, VBtn } from 'vuetify/lib'

export default {
  name: 'ConfirmationBox',
  components: {
    VDialog,
    VRow,
    VCol,
    VIcon,
    VBtn,
  },
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
  methods: {
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
<style>
.confirmation-box {
  width: 350px !important;
  background-color: white;
  border-radius: 25px !important;
}
.confirmation-box .v-icon::after {
  height: unset !important;
}
.confirmation-button .v-btn {
  border-radius: 0px;
  border-top: 1px solid rgba(0, 0, 0, 0.12);
  border-right: 1px solid rgba(0, 0, 0, 0.12);
}

.confirmation-button:last-of-type .v-btn {
  border-right: none;
}
</style>
