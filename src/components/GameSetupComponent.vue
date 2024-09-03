<template>
  <div class="game-setup">
    <h3 class="setup-title">{{ $t("gameSetup.title") }}</h3>

    <div class="setup-section">
      <h4 class="section-subtitle">{{ $t("gameSetup.selectPlayers") }}</h4>
      <div class="select-all">
        <input
          type="checkbox"
          id="select-all-players"
          v-model="selectAllPlayers"
          @change="toggleAllPlayers"
        />
        <label for="select-all-players">{{ $t("gameSetup.selectAll") }}</label>
      </div>
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
      <button @click="toggleRoleList" class="toggle-roles-btn">
        {{
          showAllRoles ? $t("gameSetup.hideRoles") : $t("gameSetup.showRoles")
        }}
      </button>
      <div class="role-grid" :class="{ 'show-all': showAllRoles }">
        <div v-for="role in visibleRoles" :key="role.id" class="role-item">
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
      showAllRoles: false,
      selectAllPlayers: false,
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
    visibleRoles() {
      if (this.showAllRoles) {
        return this.allRoles;
      }
      return this.allRoles.filter((role) => this.roleCount[role.id] > 0);
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
    toggleRoleList() {
      this.showAllRoles = !this.showAllRoles;
    },
    toggleAllPlayers() {
      if (this.selectAllPlayers) {
        this.selectedPlayers = this.players.map((player) => player.id);
      } else {
        this.selectedPlayers = [];
      }
    },
  },
  watch: {
    selectedPlayers() {
      this.selectAllPlayers =
        this.selectedPlayers.length === this.players.length;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";

.game-setup {
  display: flex;
  flex-direction: column;
  gap: $spacing-small;
}

.setup-title {
  font-family: $font-family-heading;
  font-size: $font-size-large;
  text-align: center;
  color: $moon-color;
  margin-bottom: $spacing-small;
}

.setup-section {
  background-color: rgba($wolf-color, 0.8);
  border-radius: $border-radius;
  padding: $spacing-small;
  box-shadow: $box-shadow;
}

.section-subtitle {
  font-family: $font-family-heading;
  font-size: $font-size-normal;
  margin-bottom: $spacing-small;
  color: $accent-color;
}

.select-all {
  margin-bottom: $spacing-small;
}

.player-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: $spacing-small;
}

.player-item {
  display: flex;
  align-items: center;
  background-color: rgba($night-color, 0.6);
  padding: $spacing-small;
  border-radius: $border-radius;
}

.role-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: $spacing-small;
  max-height: 300px;
  overflow-y: auto;

  &.show-all {
    max-height: none;
  }
}

.role-item {
  background-color: rgba($wolf-color, 0.8);
  border-radius: $border-radius;
  padding: $spacing-small;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.role-image {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
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
    width: 24px;
    height: 24px;
    font-size: $font-size-small;
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

.toggle-roles-btn {
  margin-bottom: $spacing-small;
  padding: $spacing-small;
  background-color: $secondary-color;
  color: $text-color;
  border: none;
  border-radius: $border-radius;
  cursor: pointer;
}

.start-game-btn {
  padding: $spacing-small;
  font-size: $font-size-normal;
  background-color: $primary-color;
  color: $text-color;
  border: none;
  border-radius: $border-radius;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

@media (min-width: $breakpoint-tablet) {
  .game-setup {
    gap: $spacing-medium;
  }

  .setup-section {
    padding: $spacing-medium;
  }

  .player-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }

  .role-grid {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  }

  .role-image {
    width: 60px;
    height: 60px;
  }

  .start-game-btn {
    padding: $spacing-medium;
    font-size: $font-size-large;
  }
}
</style>
