<template>
  <div class="game-flow">
    <h3>{{ $t("gameFlow.title") }}</h3>
    <div class="phase-container">
      <h4>{{ $t(`gameFlow.phases.${currentPhase}`) }}</h4>
      <div v-if="currentPhase === 'night'" class="night-actions">
        <div
          v-for="player in activePlayers"
          :key="player.id"
          class="player-action"
        >
          <h5>
            {{ player.name }} ({{
              $t(`roles.${playerRoles[player.id].id}.name`)
            }})
          </h5>
          <p>{{ $t(`roles.${playerRoles[player.id].id}.nightAction`) }}</p>
          <button @click="completeAction(player.id)">
            {{ $t("gameFlow.completeAction") }}
          </button>
        </div>
      </div>
      <div v-else-if="currentPhase === 'day'" class="day-actions">
        <h5>{{ $t("gameFlow.discussion") }}</h5>
        <button @click="startVoting">{{ $t("gameFlow.startVoting") }}</button>
      </div>
      <div v-else-if="currentPhase === 'voting'" class="voting">
        <h5>{{ $t("gameFlow.voting") }}</h5>
        <div
          v-for="player in alivePlayers"
          :key="player.id"
          class="player-vote"
        >
          <span>{{ player.name }}</span>
          <button @click="voteForPlayer(player.id)">
            {{ $t("gameFlow.vote") }}
          </button>
        </div>
        <button @click="completeVoting">
          {{ $t("gameFlow.completeVoting") }}
        </button>
      </div>
    </div>
    <div class="player-status">
      <h4>{{ $t("gameFlow.playerStatus") }}</h4>
      <ul>
        <li v-for="player in players" :key="player.id">
          {{ player.name }} -
          {{
            isPlayerAlive(player.id)
              ? $t("gameFlow.alive")
              : $t("gameFlow.eliminated")
          }}
          ({{ $t(`roles.${playerRoles[player.id].id}.name`) }})
        </li>
      </ul>
    </div>
    <button @click="endGame" class="end-game-btn">
      {{ $t("gameFlow.endGame") }}
    </button>
  </div>
</template>

<script>
import { mapState } from "vuex";

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
      currentPhase: "night",
      playerRoles: {},
      eliminatedPlayers: [],
      votes: {},
    };
  },
  computed: {
    ...mapState(["players"]),
    alivePlayers() {
      return this.players.filter(
        (player) => !this.eliminatedPlayers.includes(player.id)
      );
    },
    activePlayers() {
      // Filter players based on the current phase and their roles
      return this.alivePlayers.filter((player) => {
        const role = this.playerRoles[player.id];
        return role && role.hasNightAction; // Assuming roles have a 'hasNightAction' property
      });
    },
  },
  methods: {
    completeAction(playerId) {
      const player = this.activePlayers.find((p) => p.id === playerId);
      if (player) {
        // Perform action for the player
        console.log(`Completing action for ${player.name}`);
      }
    },
    startVoting() {
      this.currentPhase = "voting";
    },
    voteForPlayer(playerId) {
      // Use playerId to handle voting logic
      this.votes[playerId] = (this.votes[playerId] || 0) + 1;
    },
    completeVoting() {
      // Tally votes and eliminate player
    },
    isPlayerAlive(playerId) {
      return !this.eliminatedPlayers.includes(playerId);
    },
    endGame() {
      this.$emit("game-end");
    },
  },
  created() {
    // Initialize player roles based on gameSetup
  },
};
</script>

<style lang="scss" scoped>
// ... (keep existing styles)
</style>
