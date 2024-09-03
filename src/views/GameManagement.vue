<template>
  <div class="game-management">
    <div class="game-container">
      <GameSetupComponent
        v-if="gameState === 'setup'"
        @game-start="startGame"
      />
      <button @click="openSettings" class="settings-btn">
        {{ $t("settings.title") }}
      </button>
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
      <SettingsComponent
        v-if="gameState === 'settings'"
        @settings-saved="closeSettings"
      />
    </div>
  </div>
</template>

<script>
import GameSetupComponent from "@/components/GameSetupComponent.vue";
import PlayerRoleRevealComponent from "@/components/PlayerRoleRevealComponent.vue";
import GameFlowComponent from "@/components/GameFlowComponent.vue";
import SettingsComponent from "@/components/SettingsComponent.vue";

export default {
  name: "GameManagement",
  components: {
    GameSetupComponent,
    PlayerRoleRevealComponent,
    GameFlowComponent,
    SettingsComponent,
  },
  data() {
    return {
      gameState: "setup", // 'setup', 'reveal', 'inProgress', 'settings'
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
    openSettings() {
      this.gameState = "settings";
    },
    closeSettings() {
      this.gameState = "setup";
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

.settings-btn {
  padding: $spacing-small $spacing-medium;
  font-size: $font-size-normal;
  background-color: $secondary-color;
  color: $text-color;
  border: none;
  border-radius: $border-radius;
  cursor: pointer;
  align-self: flex-end;
  margin-bottom: $spacing-medium;

  &:hover {
    background-color: darken($secondary-color, 10%);
  }
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
