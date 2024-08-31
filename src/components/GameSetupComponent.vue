<template>
  <div class="game-setup">
    <h3>Game Setup</h3>
    <div class="player-selection">
      <h4>Select Players</h4>
      <div v-for="player in players" :key="player.id" class="player-checkbox">
        <input
          type="checkbox"
          :id="'player-' + player.id"
          v-model="selectedPlayers"
          :value="player.id"
        />
        <label :for="'player-' + player.id">{{ player.name }}</label>
      </div>
    </div>
    <div class="role-selection">
      <h4>Select Roles</h4>
      <div v-for="role in allRoles" :key="role.id" class="role-counter">
        <img :src="role.image" :alt="role.name" class="role-image" />
        <label>{{ role.name }}</label>
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
  background-color: white;
  border-radius: $border-radius;
  padding: 1rem;
  margin-bottom: 1rem;
}

.player-selection,
.role-selection {
  margin-bottom: 1rem;
}

.player-checkbox,
.role-counter {
  margin-bottom: 0.5rem;
}

.role-counter {
  display: flex;
  align-items: center;

  label {
    flex: 1;
  }

  button {
    width: 30px;
    height: 30px;
    margin: 0 0.5rem;
  }
}

.start-game-btn {
  width: 100%;
  padding: 0.75rem;
  font-size: 1.1em;
  background-color: $secondary-color;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
}
.role-counter {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;

  .role-image {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: $border-radius;
    margin-right: 1rem;
  }

  label {
    flex: 1;
  }

  button {
    width: 30px;
    height: 30px;
    margin: 0 0.5rem;
  }
}
</style>
