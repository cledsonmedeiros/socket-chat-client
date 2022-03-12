export const state = () => ({
  entrou: false,
  usuario: null,
  sala: null,
});

export const mutations = {
  entrarHandler(state, payload) {
    state.entrou = true;
    state.usuario = payload.usuario;
    state.sala = payload.sala;
  },
  sairHandler(state, payload) {
    state.entrou = false;
    // state.usuario = null;
    // state.sala = null;
  },
};

export const actions = {
  entrar(ctx, payload) {
    ctx.commit("entrarHandler", payload);
  },
  sair(ctx, payload) {
    ctx.commit("sairHandler");
  },
};
