<template>
  <div class="player-role-reveal">
    <h3>Player Role Reveal</h3>
    <div v-if="currentPlayer" class="player-card">
      <h4>{{ currentPlayer.name }}</h4>
      <div class="role-info" :class="{ 'role-hidden': !isRevealed }">
        <img
          v-if="currentPlayer.role.image"
          :src="currentPlayer.role.image"
          :alt="currentPlayer.role.name"
          class="role-image"
        />
        <div v-else class="role-image placeholder-image">
          {{ currentPlayer.role.name[0] }}
        </div>
        <p class="role-name">{{ currentPlayer.role.name }}</p>
      </div>
      <button @click="toggleReveal" class="reveal-button">
        {{ isRevealed ? "Hide" : "Reveal" }} Role
      </button>
    </div>
    <div class="navigation-buttons">
      <button @click="previousPlayer" :disabled="currentPlayerIndex === 0">
        &larr; Previous
      </button>
      <div class="player-counter">
        {{ currentPlayerIndex + 1 }} / {{ playersWithRoles.length }}
      </div>
      <button
        @click="nextPlayer"
        :disabled="currentPlayerIndex === playersWithRoles.length - 1"
      >
        Next &rarr;
      </button>
    </div>
    <button @click="finishReveal" class="finish-button">Finish Reveal</button>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { predefinedRoles } from "@/data/predefinedRoles";

export default {
  name: "PlayerRoleRevealComponent",
  props: {
    gameSetup: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      playersWithRoles: [],
      currentPlayerIndex: 0,
      isRevealed: false,
    };
  },
  computed: {
    ...mapState(["players", "roles"]),
    allRoles() {
      return [...predefinedRoles, ...this.roles];
    },
    currentPlayer() {
      return this.playersWithRoles[this.currentPlayerIndex];
    },
  },
  methods: {
    toggleReveal() {
      this.isRevealed = !this.isRevealed;
    },
    assignRolesToPlayers() {
      const selectedPlayers = this.players.filter((player) =>
        this.gameSetup.players.includes(player.id)
      );
      const rolesToAssign = this.createRoleArray();

      this.playersWithRoles = selectedPlayers.map((player, index) => ({
        ...player,
        role: rolesToAssign[index],
      }));
    },
    createRoleArray() {
      const rolesToAssign = [];
      for (const [roleId, count] of Object.entries(this.gameSetup.roles)) {
        const role = this.allRoles.find((r) => r.id === roleId);
        for (let i = 0; i < count; i++) {
          rolesToAssign.push(role);
        }
      }
      return this.shuffleArray(rolesToAssign);
    },
    shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    },
    previousPlayer() {
      if (this.currentPlayerIndex > 0) {
        this.currentPlayerIndex--;
        this.isRevealed = false;
      }
    },
    nextPlayer() {
      if (this.currentPlayerIndex < this.playersWithRoles.length - 1) {
        this.currentPlayerIndex++;
        this.isRevealed = false;
      }
    },
    finishReveal() {
      this.$emit("roles-revealed");
    },
  },
  mounted() {
    this.assignRolesToPlayers();
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";

.player-role-reveal {
  max-width: 100%;
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
}

.player-card {
  background-color: white;
  border: 1px solid $primary-color;
  border-radius: $border-radius;
  padding: 1rem;
  margin-bottom: 1rem;
  text-align: center;
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
}

.role-info {
  transition: opacity 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.role-hidden {
  opacity: 0;
  pointer-events: none;
}

.role-image {
  width: 80%;
  height: auto;
  max-height: 60vh;
  object-fit: contain;
  border-radius: $border-radius;
  margin: 1rem 0;
}

.placeholder-image {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $secondary-color;
  color: white;
  font-size: 4rem;
  font-weight: bold;
  width: 80%;
  height: 60vh;
}

.role-name {
  font-size: 1.5rem;
  margin-top: 1rem;
}

.reveal-button,
.navigation-buttons button,
.finish-button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background-color: $primary-color;
  color: white;
  border: none;
  border-radius: $border-radius;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: darken($primary-color, 10%);
  }

  &:disabled {
    background-color: lighten($primary-color, 30%);
    cursor: not-allowed;
  }
}

.finish-button {
  margin-top: 2rem;
  background-color: $secondary-color;

  &:hover {
    background-color: darken($secondary-color, 10%);
  }
}

.navigation-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 500px;
}

.player-counter {
  font-size: 1rem;
  font-weight: bold;
}

@media (max-width: $breakpoint-tablet) {
  .player-card {
    height: 80vh;
  }

  .role-image,
  .placeholder-image {
    width: 90%;
    height: 70vh;
  }
}
</style>
