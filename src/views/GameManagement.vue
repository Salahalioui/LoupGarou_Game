<template>
  <div class="game-management">
    <h2 class="section-title">Game Management</h2>
    <div class="game-container">
      <GameSetupComponent
        v-if="gameState === 'setup'"
        @game-start="startGame"
      />
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
  max-width: 100%;
  margin: 0 auto;
  padding: 1rem;
}

.section-title {
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  text-align: center;
}

.game-container {
  background-color: white;
  border-radius: $border-radius;
  padding: 1rem;
  box-shadow: $box-shadow;
}

// Dark mode styles
:global(.dark-mode) {
  .game-management {
    background-color: lighten($text-color, 5%);
    color: white;
  }

  .game-container {
    background-color: lighten($text-color, 10%);
  }
}

// Responsive styles
@media (min-width: $breakpoint-tablet) {
  .game-management {
    max-width: 800px;
  }
}
</style>
