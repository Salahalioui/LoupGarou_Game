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
      timeRemaining: 120,
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
      this.timeRemaining = this.currentPhase === "Night" ? 120 : 180;

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
  background-color: white;
  border-radius: $border-radius;
  padding: 1rem;
  margin-bottom: 1rem;
}

.game-phase,
.phase-instructions,
.player-status,
.game-actions,
.sound-controls {
  margin-bottom: 1rem;
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
    margin-bottom: 0.5rem;
    padding: 0.5rem;
    background-color: lighten($primary-color, 40%);
    border-radius: $border-radius;

    &.eliminated {
      color: #888;
      background-color: lighten($text-color, 60%);
    }
  }
}

.player-info {
  flex-grow: 1;
}

.player-role {
  font-style: italic;
  margin-left: 0.5rem;
}

.toggle-elimination {
  padding: 0.25rem 0.5rem;
  font-size: 0.8em;
  background-color: $secondary-color;
  color: white;
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
  padding: 0.75rem;
  margin-top: 0.5rem;
  font-size: 1.1em;
}

.end-game-btn {
  background-color: #e74c3c;
}

.mute-btn {
  background-color: $text-color;
}
</style>
