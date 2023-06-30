<template>
  <button @click="openConfirmationBox">Open Modal</button>
</template>
<script>
export default {
  methods: {
    async openConfirmationBox() {
      let res = await this.$confirmationBox({
        message: 'Deseja sair sem guardar?',
        buttons: [
          { text: 'Confirmar', result: true, color: '#00aa00' },
          { text: 'Cancelar', result: false, color: '#cc0000' },
        ],
      })
      console.log(res)
    },
  },
}
</script>
