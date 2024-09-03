<template>
  <div class="game-management">
    <div class="game-container">
      <GameSetupComponent
        v-if="gameState === 'setup'"
        @game-start="startGame"
      />
      <PlayerRoleRevealComponent
        ref="playerRoleRevealComponent"
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
      this.gameSetup.roles =
        this.$refs.playerRoleRevealComponent.playersWithRoles.map(
          (p) => p.role
        );
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
  max-width: 100%;
  margin: 0 auto;
  padding: $spacing-medium;
  color: $text-color;
}

.game-container {
  background-color: $night-color;
  border-radius: $border-radius;
  padding: $spacing-medium;
  box-shadow: $box-shadow;
  display: flex;
  flex-direction: column;
  gap: $spacing-medium;
}

@media (min-width: $breakpoint-tablet) {
  .game-management {
    max-width: 800px;
    padding: $spacing-large;
  }

  .game-container {
    padding: $spacing-large;
    gap: $spacing-large;
  }
}
</style>
