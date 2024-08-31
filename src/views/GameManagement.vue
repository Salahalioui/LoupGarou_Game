<template>
  <div class="game-management">
    <h2>Game Management</h2>
    <GameSetupComponent v-if="gameState === 'setup'" @game-start="startGame" />
    <PlayerRoleRevealComponent
      v-if="gameState === 'reveal'"
      :gameSetup="gameSetup"
      @roles-revealed="startGameFlow"
    />
    <GameFlowComponent
      v-if="gameState === 'inProgress'"
      :gameSetup="gameSetup"
      @game-end="endGame"
    />
  </div>
</template>

<script>
import GameSetupComponent from "@/components/GameSetupComponent.vue";
import PlayerRoleRevealComponent from "@/components/PlayerRoleRevealComponent.vue";
import GameFlowComponent from "@/components/GameFlowComponent.vue";

export default {
  name: "GameManagement",
  components: {
    GameSetupComponent,
    PlayerRoleRevealComponent,
    GameFlowComponent,
  },
  data() {
    return {
      gameState: "setup", // 'setup', 'reveal', 'inProgress'
      gameSetup: null,
    };
  },
  methods: {
    startGame(gameSetup) {
      console.log("Starting game with setup:", gameSetup);
      this.gameSetup = gameSetup;
      this.gameState = "reveal";
    },
    startGameFlow() {
      this.gameState = "inProgress";
    },
    endGame() {
      console.log("Ending game");
      this.gameState = "setup";
      this.gameSetup = null;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";

.game-management {
  max-width: 800px;
  margin: 0 auto;
}
</style>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";

.game-management {
  max-width: 600px;
  margin: 0 auto;
}
</style>
