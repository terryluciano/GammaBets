<template>
  <Transition>
    <div
      class="listing-buttons-div"
      v-if="game.playerOne.steamID != userSteamID && phase == 0"
    >
      <button
        class="listing-button"
        :class="buttonClass(game.playerOneSide)"
        @click="openDepositMenu"
      >
        Join
      </button>
      <button
        class="listing-button"
        :class="buttonClass(game.playerOneSide)"
        @click="openViewMenu"
      >
        View
      </button>
    </div>
    <div class="listing-buttons-div" v-else>
      <button
        class="listing-button"
        :class="buttonClass(game.playerOneSide)"
        @click="openViewMenu"
      >
        View
      </button>
    </div>
  </Transition>
</template>

<script>
export default {
  props: { game: Object, phase: Number },
  computed: {
    userSteamID() {
      return this.$store.state.user.profile.SteamID;
    },
  },
  methods: {
    playerValue(skins) {
      let totalVal = 0;
      skins.forEach((skin) => (totalVal += skin.value));
      return totalVal.toFixed(2);
    },
    buttonClass(playerSide) {
      if (playerSide == "red") {
        return "red-listing-button";
      } else {
        return "black-listing-button";
      }
    },
    openDepositMenu() {
      const store = this.$store;

      let min = this.playerValue(this.game.playerOne.skins) * 0.95;
      let max = this.playerValue(this.game.playerOne.skins) * 1.05;

      store.dispatch("setDepositMin", min);
      store.dispatch("setDepositMax", max);
      store.dispatch("setSelectedGameID", this.game.gameID);
      store.dispatch("isVisibleToggle");
      store.dispatch("setDepositType", "Coinflip");
    },
    openViewMenu() {
      this.$store.dispatch("toggleViewMenu");
      this.$store.dispatch("setChosenView", this.game.gameID);
    },
  },
  name: "CFListingButtons",
};
</script>

<style></style>
