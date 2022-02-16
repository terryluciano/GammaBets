import axios from "axios";

const coinflip = {
  state: {
    activeCoinflips: [{gameID: "002", change: 0}, {gameID: "001", change: 0}],
    coinflipHistory: [],
    chosenSide: "",
    pastWinningSides: [],
    viewMenu: {isVisible: false, chosenGame: {}},
    cfGameTimers: [],
  },
  getters: {
    getCFGame(state, gameID) {
      let cfGame = state.activeCoinflips.find((game) => game.gameID == gameID);
      return cfGame;
    },
    getChosenSide(state) {
      return state.chosenSide;
    },
  },
  mutations: {
    setActiveCoinflips(state, games) {
      state.activeCoinflips = games;
    },
    setCoinflipHistory(state, history) {
      state.coinflipHistory = history;
    },
    setCoinSide(state, side) {
      state.chosenSide = side;
    },
    toggleViewMenu(state) {
      state.viewMenu.isVisible = !state.viewMenu.isVisible;
    },
    setChosenView(state, gameID) {
      const game = state.activeCoinflips.find((game) => game.gameID == gameID);

      state.viewMenu.chosenGame = game;
    },
    resetChosenView(state) {

      state.viewMenu.chosenGame = {};
    },
    changeCFGameTimers(state, cfTimers) {
      state.cfGameTimers = cfTimers;
    },
    modifyCFGame(state, gameObj) {

      const game = state.activeCoinflips.find(game => game.gameID == gameObj.gameID);

      state.activeCoinflips[game] = gameObj;

      console.log(state.activeCoinflips);

    }
  },
  actions: {
    getAPIActiveCoinflip({ commit }) {
      axios
        .get("/api/coinflip/active")
        .then((res) => {
          commit("setActiveCoinflips", res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getAPICoinflipHistory({ commit }) {
      axios
        .get("/api/coinflip/history")
        .then((res) => {
          commit("setCoinflipHistory", res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    setCoinSide({ commit }, side) {
      commit("setCoinSide", side);
    },
    toggleViewMenu({commit}) {
      commit("toggleViewMenu");
    },
    setChosenView({commit}, gameID) {
      commit("setChosenView", gameID);
    },
    resetChosenView({commit}) {
      commit("resetChosenView");
    },
    changeCFGameTimers({commit}, timers) {
      commit("changeCFGameTimer", timers)
    },
    modifyCFGame({commit}, data) {
      commit("modifyCFGame", data);
    }
  },
};

export default coinflip;