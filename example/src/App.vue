<template>
  <button @click="openConfirmationBox">Open Modal</button>
</template>
<script>
export default {
  methods: {
    async openConfirmationBox() {
      let res = await this.$confirmationBox('XXX')
      console.log(res)
    },
  },
}
</script>
