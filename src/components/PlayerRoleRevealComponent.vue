<template>
  <div class="player-role-reveal">
    <h3>{{ $t("playerRoleReveal.title") }}</h3>
    <div v-if="currentPlayer" class="reveal-container">
      <h4>{{ currentPlayer.name }}</h4>
      <button v-if="!isRevealed" @click="revealRole" class="reveal-button">
        {{ $t("playerRoleReveal.revealRole") }}
      </button>
      <div v-else class="role-info">
        <img
          :src="currentRole.image"
          :alt="$t(`roles.${currentRole.id}.name`)"
          class="role-image"
        />
        <h5 class="role-name">{{ $t(`roles.${currentRole.id}.name`) }}</h5>
        <p class="role-description">
          {{ $t(`roles.${currentRole.id}.description`) }}
        </p>
      </div>
    </div>
    <div class="navigation-buttons">
      <button @click="previousPlayer" :disabled="currentIndex === 0">
        {{ $t("playerRoleReveal.previous") }}
      </button>
      <button
        @click="nextPlayer"
        :disabled="currentIndex === players.length - 1"
      >
        {{ $t("playerRoleReveal.next") }}
      </button>
    </div>
    <button
      @click="finishReveal"
      class="finish-button"
      :disabled="!allRevealed"
    >
      {{ $t("playerRoleReveal.finish") }}
    </button>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getPredefinedRoles } from "@/data/predefinedRoles";

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
      currentIndex: 0,
      revealedRoles: {},
      allRoles: [...getPredefinedRoles(), ...this.roles],
    };
  },
  computed: {
    ...mapState(["players", "roles"]),
    currentPlayer() {
      return this.players.find(
        (player) => player.id === this.gameSetup.players[this.currentIndex]
      );
    },
    currentRole() {
      return this.revealedRoles[this.currentPlayer.id];
    },
    isRevealed() {
      return !!this.currentRole;
    },
    allRevealed() {
      return (
        Object.keys(this.revealedRoles).length === this.gameSetup.players.length
      );
    },
  },
  methods: {
    revealRole() {
      const availableRoles = this.getAvailableRoles();
      const randomRole =
        availableRoles[Math.floor(Math.random() * availableRoles.length)];
      this.$set(this.revealedRoles, this.currentPlayer.id, randomRole);
    },
    previousPlayer() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
      }
    },
    nextPlayer() {
      if (this.currentIndex < this.gameSetup.players.length - 1) {
        this.currentIndex++;
      }
    },
    finishReveal() {
      if (this.allRevealed) {
        this.$emit("roles-revealed", this.revealedRoles);
      }
    },
    getAvailableRoles() {
      // ... (implementation remains the same)
    },
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
