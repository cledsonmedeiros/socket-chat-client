<template>
  <v-card :color="cardColor" v-if="message.tipo === 'mensagem'">
    <v-card-text>
      <v-row>
        <v-col cols="12" class="pb-0 pt-1 d-flex justify-space-between">
          <b class="orange--text">{{ isFromMe ? "eu" : message.usuario }}</b>
          <span>{{ new Date(message.dataEpoch).toLocaleString() }}</span>
        </v-col>
        <v-col cols="12" class="py-0">
          <b>
            {{ message.mensagem }}
          </b>
        </v-col>
        <v-col cols="12" class="pt-2 pb-1"> </v-col>
      </v-row>
    </v-card-text>
  </v-card>
  <b v-else>
    {{ message.mensagem }}
  </b>
</template>

<script>
export default {
  name: "Message",

  props: {
    message: {
      type: Object,
    },
  },

  computed: {
    isFromMe() {
      return this.message.usuario === this.$store.state.usuario;
    },
    cardColor() {
      if (this.isFromMe) {
        return "indigo";
      }

      return null;
    },
  },

  data() {
    return {};
  },

  methods: {},
};
</script>
