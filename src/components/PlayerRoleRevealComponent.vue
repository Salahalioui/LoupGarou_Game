<template>
  <div class="player-role-reveal">
    <h3>{{ $t("playerRoleReveal.title") }}</h3>
    <div v-if="currentPlayer" class="player-card">
      <h4>{{ currentPlayer.name }}</h4>
      <button @click="toggleReveal" class="reveal-button">
        {{
          isRevealed
            ? $t("playerRoleReveal.hideRole")
            : $t("playerRoleReveal.revealRole")
        }}
      </button>
    </div>
    <RolePopup
      v-if="isRevealed && currentPlayer"
      :role="currentPlayer.role"
      @close="toggleReveal"
    />
    <div class="navigation-buttons">
      <button @click="previousPlayer" :disabled="currentPlayerIndex === 0">
        &larr; {{ $t("playerRoleReveal.previous") }}
      </button>
      <div class="player-counter">
        {{ currentPlayerIndex + 1 }} / {{ playersWithRoles.length }}
      </div>
      <button
        @click="nextPlayer"
        :disabled="currentPlayerIndex === playersWithRoles.length - 1"
      >
        {{ $t("playerRoleReveal.next") }} &rarr;
      </button>
    </div>
    <button @click="finishReveal" class="finish-button">
      {{ $t("playerRoleReveal.finish") }}
    </button>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getPredefinedRoles } from "@/data/predefinedRoles";
import RolePopup from "@/components/RolePopup.vue";

export default {
  name: "PlayerRoleRevealComponent",
  components: {
    RolePopup,
  },
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
      return [...getPredefinedRoles(), ...this.roles];
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
  text-align: center;
  padding: $spacing-large;
  background-color: $wolf-color;
  border-radius: $border-radius;
  box-shadow: $box-shadow;
}

.player-card {
  background-color: lighten($night-color, 5%);
  border-radius: $border-radius;
  padding: $spacing-large;
  margin-bottom: $spacing-medium;
}

.reveal-button {
  padding: $spacing-small $spacing-medium;
  font-size: $font-size-normal;
  border: none;
  border-radius: $border-radius;
  cursor: pointer;
  background-color: $primary-color;
  color: $text-color;
  transition: background-color $transition-speed ease;

  &:hover {
    background-color: darken($primary-color, 10%);
  }
}

.navigation-buttons {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 500px;
  margin: $spacing-medium auto;
}

.player-counter {
  font-size: $font-size-normal;
  color: $text-color;
}

.finish-button {
  padding: $spacing-small $spacing-medium;
  font-size: $font-size-normal;
  border: none;
  border-radius: $border-radius;
  cursor: pointer;
  background-color: $secondary-color;
  color: $text-color;
  transition: background-color $transition-speed ease;

  &:hover {
    background-color: darken($secondary-color, 10%);
  }
}

// Dark mode styles
:global(.dark-mode) {
  .player-role-reveal {
    background-color: lighten($night-color, 10%);
  }

  .player-card {
    background-color: $night-color;
  }
}
</style>
