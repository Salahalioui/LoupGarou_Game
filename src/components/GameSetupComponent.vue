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
  gap: $spacing-medium;
  padding: $spacing-medium;
}

.setup-title {
  font-family: $font-family-heading;
  font-size: $font-size-large;
  text-align: center;
  color: $moon-color;
  margin-bottom: $spacing-medium;
}

.setup-section {
  background-color: rgba($wolf-color, 0.8);
  border-radius: $border-radius;
  padding: $spacing-medium;
  box-shadow: $box-shadow;
}

.section-subtitle {
  font-family: $font-family-heading;
  font-size: $font-size-normal;
  margin-bottom: $spacing-medium;
  color: $accent-color;
}

.player-grid,
.role-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: $spacing-small;
}

.player-item,
.role-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba($night-color, 0.6);
  padding: $spacing-small;
  border-radius: $border-radius;
  text-align: center;
}

.role-image {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: $spacing-small;
}

.role-name {
  font-size: $font-size-small;
  color: $text-color;
  margin-bottom: $spacing-small;
}

.role-counter {
  display: flex;
  align-items: center;
  gap: $spacing-small;

  button {
    width: 30px;
    height: 30px;
    font-size: $font-size-normal;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $primary-color;
    color: $text-color;
    border: none;
    border-radius: $border-radius;
    cursor: pointer;

    &:disabled {
      background-color: rgba($night-color, 0.4);
      cursor: not-allowed;
    }
  }
}

.start-game-btn {
  width: 100%;
  padding: $spacing-medium;
  font-size: $font-size-normal;
  background-color: $secondary-color;
  color: $text-color;
  border: none;
  border-radius: $border-radius;
  cursor: pointer;
  transition: background-color $transition-speed ease;

  &:hover:not(:disabled) {
    background-color: darken($secondary-color, 10%);
  }

  &:disabled {
    background-color: rgba($night-color, 0.4);
    cursor: not-allowed;
  }
}

// Tablet and larger screens
@media (min-width: $breakpoint-tablet) {
  .game-setup {
    padding: $spacing-large;
    gap: $spacing-large;
  }

  .setup-title {
    font-size: $font-size-xlarge;
  }

  .section-subtitle {
    font-size: $font-size-large;
  }

  .player-grid,
  .role-grid {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: $spacing-medium;
  }

  .role-image {
    width: 80px;
    height: 80px;
  }

  .role-name {
    font-size: $font-size-normal;
  }
}

// Desktop screens
@media (min-width: $breakpoint-desktop) {
  .game-setup {
    max-width: 1200px;
    margin: 0 auto;
  }

  .player-grid,
  .role-grid {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  }
}
</style>
