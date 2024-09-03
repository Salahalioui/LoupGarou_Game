<template>
  <div class="game-flow">
    <h3>{{ $t("gameFlow.title") }}</h3>
    <div class="game-phase">
      <h4>
        {{ $t("gameFlow.currentPhase") }}:
        {{ $t(`gameFlow.phases.${currentPhase}`) }}
      </h4>
      <p>{{ $t("gameFlow.timeRemaining", { time: timeRemaining }) }}</p>
    </div>
    <div class="phase-instructions">
      <p>{{ $t(`gameFlow.instructions.${currentPhase}`) }}</p>
    </div>
    <div class="player-status">
      <h4>{{ $t("gameFlow.players") }}</h4>
      <ul>
        <li
          v-for="player in players"
          :key="player.id"
          :class="{ eliminated: player.eliminated }"
        >
          <span class="player-info">
            {{ player.name }}
            <span v-if="showRoles || player.eliminated" class="player-role">
              - {{ $t(`roles.${player.role.id}.name`) }}
            </span>
            <span v-if="player.eliminated"
              >({{ $t("gameFlow.eliminated") }})</span
            >
          </span>
          <button @click="toggleElimination(player)" class="toggle-elimination">
            {{
              player.eliminated
                ? $t("gameFlow.revive")
                : $t("gameFlow.eliminate")
            }}
          </button>
        </li>
      </ul>
    </div>
    <div class="game-actions">
      <button @click="nextPhase" class="next-phase-btn">
        {{ $t("gameFlow.nextPhase") }}
      </button>
      <button @click="endGame" class="end-game-btn">
        {{ $t("gameFlow.endGame") }}
      </button>
    </div>
    <div class="sound-controls">
      <button @click="toggleMute" class="mute-btn">
        {{ isMuted ? $t("gameFlow.unmute") : $t("gameFlow.mute") }}
      </button>
    </div>
  </div>
</template>

<script>
import { getPredefinedRoles } from "@/data/predefinedRoles";

export default {
  name: "GameFlowComponent",
  props: {
    gameSetup: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      currentPhase: "Night",
      timeRemaining: 0,
      players: [],
      timer: null,
      phases: ["Night", "Day Discussion", "Day Voting", "Execution"],
      nightSound: new Audio("/sounds/night_phase.mp3"),
      wakeUpSound: new Audio("/sounds/wake_up.mp3"),
      isMuted: false,
    };
  },
  computed: {
    phaseInstructions() {
      switch (this.currentPhase) {
        case "Night":
          return this.$t("gameFlow.instructions.Night");
        case "Day Discussion":
          return this.$t("gameFlow.instructions.Day Discussion");
        case "Day Voting":
          return this.$t("gameFlow.instructions.Day Voting");
        case "Execution":
          return this.$t("gameFlow.instructions.Execution");
        default:
          return "";
      }
    },
    showRoles() {
      return (
        this.currentPhase === "Night" || this.currentPhase === "Day Discussion"
      );
    },
  },
  methods: {
    startTimer() {
      this.timer = setInterval(() => {
        if (this.timeRemaining > 0) {
          this.timeRemaining--;
        } else {
          this.nextPhase();
        }
      }, 1000);
    },
    nextPhase() {
      clearInterval(this.timer);
      const currentIndex = this.phases.indexOf(this.currentPhase);
      this.currentPhase = this.phases[(currentIndex + 1) % this.phases.length];
      this.timeRemaining =
        this.$store.state.game.phaseDurations[this.currentPhase];

      if (this.currentPhase === "Night") {
        this.playNightSound();
      } else {
        this.pauseNightSound();
        if (this.currentPhase === "Day Discussion") {
          this.playWakeUpSound();
        }
      }

      this.startTimer();
    },
    endGame() {
      clearInterval(this.timer);
      this.$emit("game-end");
    },
    toggleElimination(player) {
      player.eliminated = !player.eliminated;
    },
    initializePlayers() {
      this.players = this.gameSetup.players.map((playerId, index) => {
        const player = this.$store.state.players.find((p) => p.id === playerId);
        return {
          id: playerId,
          name: player.name,
          role: this.gameSetup.roles[index],
          eliminated: false,
        };
      });
    },
    createRoleArray() {
      const roles = [];
      const predefinedRoles = getPredefinedRoles();
      for (const [roleId, count] of Object.entries(this.gameSetup.roles)) {
        const role = predefinedRoles.find((r) => r.id === roleId);
        if (role) {
          for (let i = 0; i < count; i++) {
            roles.push(role);
          }
        }
      }
      return this.shuffleArray(roles);
    },
    shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    },
    playNightSound() {
      if (!this.isMuted) {
        this.nightSound.loop = true;
        this.nightSound.play();
      }
    },
    pauseNightSound() {
      this.nightSound.pause();
    },
    playWakeUpSound() {
      if (!this.isMuted) {
        this.wakeUpSound.play();
      }
    },
    toggleMute() {
      this.isMuted = !this.isMuted;
      this.nightSound.muted = this.isMuted;
      this.wakeUpSound.muted = this.isMuted;
      if (this.isMuted) {
        this.nightSound.pause();
      } else if (this.currentPhase === "Night") {
        this.nightSound.play();
      }
    },
  },
  mounted() {
    this.initializePlayers();
    this.startTimer();
    if (this.currentPhase === "Night") {
      this.playNightSound();
    }
  },
  beforeUnmount() {
    clearInterval(this.timer);
    this.nightSound.pause();
    this.wakeUpSound.pause();
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";

.game-flow {
  background-color: $wolf-color;
  border-radius: $border-radius;
  padding: $spacing-large;
  margin-bottom: $spacing-medium;
  box-shadow: $box-shadow;
}

.game-phase,
.phase-instructions,
.player-status,
.game-actions,
.sound-controls {
  margin-bottom: $spacing-large;
}

.game-phase {
  h4 {
    font-size: $font-size-large;
    color: $moon-color;
    margin-bottom: $spacing-small;
  }

  p {
    color: $accent-color;
  }
}

.phase-instructions {
  font-style: italic;
  color: $text-color;
}

.player-status {
  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: $spacing-small;
    padding: $spacing-small;
    background-color: lighten($night-color, 5%);
    border-radius: $border-radius;

    &.eliminated {
      color: $blood-color;
      background-color: lighten($night-color, 10%);
    }
  }
}

.player-info {
  flex-grow: 1;
}

.player-role {
  font-style: italic;
  margin-left: $spacing-small;
  color: $accent-color;
}

.toggle-elimination {
  padding: $spacing-small;
  font-size: $font-size-small;
  background-color: $secondary-color;
  color: $text-color;
  border: none;
  border-radius: $border-radius;
  cursor: pointer;

  &:hover {
    background-color: darken($secondary-color, 10%);
  }
}

.next-phase-btn,
.end-game-btn,
.mute-btn {
  width: 100%;
  padding: $spacing-medium;
  margin-top: $spacing-small;
  font-size: $font-size-normal;
  border: none;
  border-radius: $border-radius;
  cursor: pointer;
  transition: background-color $transition-speed ease;
}

.next-phase-btn {
  background-color: $primary-color;
  color: $text-color;

  &:hover {
    background-color: darken($primary-color, 10%);
  }
}

.end-game-btn {
  background-color: $blood-color;
  color: $text-color;

  &:hover {
    background-color: darken($blood-color, 10%);
  }
}

.mute-btn {
  background-color: $accent-color;
  color: $night-color;

  &:hover {
    background-color: darken($accent-color, 10%);
  }
}

// Dark mode styles
:global(.dark-mode) {
  .game-flow {
    background-color: lighten($night-color, 5%);
  }

  .player-status li {
    background-color: $night-color;

    &.eliminated {
      background-color: darken($night-color, 5%);
    }
  }
}
</style>
