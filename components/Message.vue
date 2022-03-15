<template>
  <v-card
    :color="cardColor"
    v-if="message.tipo === 'mensagem'"
    :class="roundedSide"
  >
    <v-card-text class="white--text">
      <v-row>
        <v-col cols="12" class="pt-1 pb-0">
          <span>
            <b class="orange--text">{{ username }}</b
            >: {{ message.mensagem }}
          </span>
        </v-col>
        <v-col cols="12" class="pt-0 pb-1 text-right">
          <span class="overline">
            {{ timestamp }}
          </span>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>

  <v-card color="teal" class="rounded-xl" v-else>
    <v-card-text class="white--text">
      <v-row>
        <v-col cols="12" class="py-0 text-center">
          <b class="caption"> {{ message.mensagem }} às {{ timestamp }} </b>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
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
      return this.isFromMe ? "indigo" : null;
    },
    roundedSide() {
      return this.isFromMe
        ? "rounded-l-xl rounded-tr-xl"
        : "rounded-r-xl rounded-tl-xl";
    },
    username() {
      return this.isFromMe ? "Eu" : this.message.usuario;
    },
    timestamp() {
      return new Date(this.message.dataEpoch).toLocaleString();
    },
  },

  data() {
    return {};
  },

  methods: {},
};
</script>
