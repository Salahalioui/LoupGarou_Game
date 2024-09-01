<template>
  <div class="game-setup">
    <h3 class="setup-title">{{ $t("gameSetup.title") }}</h3>
    <div class="setup-section">
      <h4 class="section-subtitle">{{ $t("gameSetup.selectPlayers") }}</h4>
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
      <h4 class="section-subtitle">{{ $t("gameSetup.selectRoles") }}</h4>
      <div class="role-grid">
        <div v-for="role in allRoles" :key="role.id" class="role-item">
          <img
            :src="role.image"
            :alt="$t(`roles.${role.id}.name`)"
            class="role-image"
          />
          <span class="role-name">{{ $t(`roles.${role.id}.name`) }}</span>
          <div class="role-counter">
            <button
              @click="decrementRole(role.id)"
              :disabled="roleCount[role.id] === 0"
            >
              -
            </button>
            <span>{{ roleCount[role.id] || 0 }}</span>
            <button
              @click="incrementRole(role.id)"
              :disabled="totalRoles >= selectedPlayers.length"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
    <button @click="startGame" :disabled="!isValidSetup" class="start-game-btn">
      {{ $t("gameSetup.startGame") }}
    </button>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getPredefinedRoles } from "@/data/predefinedRoles";

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
      return [...getPredefinedRoles(), ...this.roles];
    },
    totalRoles() {
      return Object.values(this.roleCount).reduce(
        (sum, count) => sum + count,
        0
      );
    },
    isValidSetup() {
      return (
        this.selectedPlayers.length > 0 &&
        this.totalRoles === this.selectedPlayers.length
      );
    },
  },
  methods: {
    incrementRole(roleId) {
      this.roleCount[roleId] = (this.roleCount[roleId] || 0) + 1;
    },
    decrementRole(roleId) {
      if (this.roleCount[roleId] > 0) {
        this.roleCount[roleId]--;
      }
    },
    startGame() {
      if (this.isValidSetup) {
        const gameSetup = {
          players: this.selectedPlayers,
          roles: this.roleCount,
        };
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
