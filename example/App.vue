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
    </v-main>
  </v-app>
</template>
<script>
export default {
  name: 'App',
  methods: {
    async openConfirmationBox() {
      let res = await this.$confirmationBox('xxx')
      console.log(res)
    },
  },
}
</script>
