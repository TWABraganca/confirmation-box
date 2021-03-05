<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-spacer></v-spacer>
      <v-btn @click="openConfirmationBox" text>
        <span>Confirmar</span>
        <v-icon right>mdi-check</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <h1>Teste</h1>
      <confirmation-box :click-outside="true"></confirmation-box>
    </v-main>
  </v-app>
</template>

<script>
import ConfirmationBox from '../src/ConfirmationBox.vue'
export default {
  components: { ConfirmationBox },
  name: 'App',
  methods: {
    async openConfirmationBox() {
      let res = await this.$confirmationBox('xxx')
    },
  },
}
</script>
