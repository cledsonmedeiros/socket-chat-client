<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <Chat v-if="$store.state.entrou" />
      <EscolherSala v-else />
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "IndexPage",

  data() {
    return {};
  },

  computed: {},
};
</script>
