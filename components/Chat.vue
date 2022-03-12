<template>
  <v-card class="justify-center" tile>
    <SocialHead :title="`Sala de ${chatInfo.sala}`" />
    <v-card-text>
      <v-row>
        <v-col cols="12">
          <v-btn block color="error" dark @click.stop="handleSair()">
            Sair de {{ chatInfo.sala }}
          </v-btn>
        </v-col>
        <v-col cols="12" class="py-0 text-center">
          <span
            >Entrou como: <b>{{ chatInfo.usuario }}</b></span
          >
        </v-col>
        <v-col cols="12" v-if="mensagens.length > 0">
          <v-card tile color="grey" max-height="500px">
            <v-card-text class="white--text d-flex flex-column" id="chatList">
              <Message
                :message="mensagem"
                v-for="(mensagem, mensagemIndex) in mensagens"
                :key="mensagemIndex"
                :class="{
                  'mt-0': mensagemIndex === 0,
                  'mt-4': mensagemIndex !== 0,
                  'text-center': mensagem.tipo === 'chatLog',
                }"
              />
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="novaMensagem"
            label="Mensagem"
            outlined
            hide-details
            @keypress.enter="enviarMensagem()"
          />
        </v-col>
        <v-col cols="12">
          <v-btn block color="green" dark @click.stop="enviarMensagem()">
            Enviar
          </v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "Chat",

  data() {
    return {
      novaMensagem: "",

      mensagens: [],

      socket: null,
    };
  },

  computed: {
    chatInfo() {
      return {
        usuario: this.$store.state.usuario,
        sala: this.$store.state.sala,
      };
    },
  },

  mounted() {
    this.socket = this.$nuxtSocket({
      name: "chat",
    });

    this.socket.emit("joinRoom", { ...this.chatInfo });

    this.socket.on("novaMensagem", (payload) => {
      this.handleNovaMensagem(payload);
    });

    this.socket.on("roomMessages", (payload) => {
      this.carregarMensagensDaSala(payload);
    });

    this.socket.on("chatLog", (payload) => {
      this.mensagens.push({
        usuario: payload.usuario,
        sala: this.chatInfo.sala,
        mensagem: payload.mensagem,
        tipo: "chatLog",
      });

      this.goToBottom();
    });
  },

  beforeDestroy() {
    this.socket.disconnect();
  },

  methods: {
    carregarMensagensDaSala(payload) {
      this.mensagens = [...this.mensagens, ...payload];

      this.goToBottom();
    },
    goToBottom() {
      setTimeout(() => {
        const objDiv = document.getElementById("chatList");
        if (objDiv) {
          objDiv.scrollTop = objDiv.scrollHeight;
        }
      }, 50);
    },
    handleNovaMensagem(payload) {
      this.mensagens = [...this.mensagens, payload];

      this.goToBottom();
    },
    enviarMensagem() {
      if (this.novaMensagem) {
        if (!this.socket.connected) {
          alert("Sessão expirada");

          this.handleSair();
        }

        this.socket.emit("novaMensagem", {
          usuario: this.chatInfo.usuario,
          sala: this.chatInfo.sala,
          mensagem: this.novaMensagem,
          tipo: "mensagem",
        });

        this.limparMensagem();
      }
    },
    limparMensagem() {
      this.novaMensagem = null;
    },
    handleSair() {
      this.$store.dispatch("sair");
    },
  },
};
</script>

<style scoped>
.v-card {
  display: flex !important;
  flex-direction: column;
}

.v-card__text {
  flex-grow: 1;
  overflow: auto;
}
</style>
