<template>
  <div class="game-setup">
    <h3 class="setup-title">Game Setup</h3>
    <div class="setup-section">
      <h4 class="section-subtitle">Select Players</h4>
      <div class="player-grid">
        <div v-for="player in players" :key="player.id" class="player-item">
          <input
            type="checkbox"
            :id="'player-' + player.id"
            v-model="selectedPlayers"
            :value="player.id"
          />
          <label :for="'player-' + player.id">{{ player.name }}</label>
        </div>
      </div>
    </div>
    <div class="setup-section">
      <h4 class="section-subtitle">Select Roles</h4>
      <div class="role-grid">
        <div v-for="role in allRoles" :key="role.id" class="role-item">
          <img :src="role.image" :alt="role.name" class="role-image" />
          <span class="role-name">{{ role.name }}</span>
          <div class="role-counter">
            <button
              @click="decrementRole(role.id)"
              :disabled="roleCount[role.id] === 0"
            >
              -
            </button>
            <span>{{ roleCount[role.id] || 0 }}</span>
            <button @click="incrementRole(role.id)">+</button>
          </div>
        </div>
      </div>
    </div>
    <button @click="startGame" :disabled="!isGameReady" class="start-game-btn">
      Start Game
    </button>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { predefinedRoles } from "@/data/predefinedRoles";

export default {
  name: "GameSetupComponent",
  data() {
    return {
      selectedPlayers: [],
      roleCount: {},
    };
  },
  computed: {
    ...mapState(["players", "roles"]),
    allRoles() {
      return [...predefinedRoles, ...this.roles];
    },
    isGameReady() {
      const totalRoles = Object.values(this.roleCount).reduce(
        (a, b) => a + b,
        0
      );
      return (
        this.selectedPlayers.length > 0 &&
        this.selectedPlayers.length === totalRoles
      );
    },
  },
  methods: {
    ...mapActions(["addGame"]),
    incrementRole(roleId) {
      this.roleCount[roleId] = (this.roleCount[roleId] || 0) + 1;
    },
    decrementRole(roleId) {
      if (this.roleCount[roleId] > 0) {
        this.roleCount[roleId]--;
      }
    },
    async startGame() {
      if (this.isGameReady) {
        const gameSetup = {
          players: this.selectedPlayers,
          roles: this.roleCount,
          date: new Date().toISOString(),
        };
        await this.addGame(gameSetup);
        this.$emit("game-start", gameSetup);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";

.game-setup {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.setup-title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  text-align: center;
}

.setup-section {
  background-color: lighten($background-color, 5%);
  border-radius: $border-radius;
  padding: 1rem;
}

.section-subtitle {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

.player-grid,
.role-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 0.5rem;
}

.player-item,
.role-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.role-image {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: $border-radius;
}

.role-name {
  flex: 1;
}

.role-counter {
  display: flex;
  align-items: center;
  gap: 0.5rem;

  button {
    width: 30px;
    height: 30px;
    font-size: 1.2rem;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.start-game-btn {
  width: 100%;
  padding: 1rem;
  font-size: 1.2rem;
  background-color: $secondary-color;
  color: white;
  border: none;
  border-radius: $border-radius;
  cursor: pointer;

  &:disabled {
    background-color: lighten($secondary-color, 20%);
    cursor: not-allowed;
  }
}

// Dark mode styles
:global(.dark-mode) {
  .setup-section {
    background-color: lighten($text-color, 15%);
  }

  .start-game-btn {
    background-color: $primary-color;

    &:disabled {
      background-color: darken($primary-color, 20%);
    }
  }
}
</style>
