<template>
  <v-card class="justify-center" tile>
    <SocialHead title="Escolher sala" />
    <v-card-text>
      <v-row>
        <v-col cols="12">
          <v-select
            v-model="sala"
            :items="salas"
            label="Sala"
            outlined
            hide-details
            color="white"
          />
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="usuario"
            label="Usuário"
            outlined
            hide-details
            @keypress.enter="handleEntrar()"
          />
        </v-col>
        <v-col cols="12">
          <v-btn block color="blue" dark @click.stop="handleEntrar()">
            Entrar
          </v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "EscolherSala",

  data() {
    return {
      salas: ["NodeJS", "Java", "ReactJS", "Elixir"],

      sala: null,
      usuario: null,
    };
  },

  mounted() {
    this.sala = this.$store.state.sala;
    this.usuario = this.$store.state.usuario;
  },

  methods: {
    handleEntrar() {
      if (!this.usuario) {
        return alert("Usuário inválido");
      }
      if (!this.sala) {
        return alert("Sala inválida");
      }

      this.$store.dispatch("entrar", {
        usuario: this.usuario,
        sala: this.sala,
      });
    },
  },
};
</script>
