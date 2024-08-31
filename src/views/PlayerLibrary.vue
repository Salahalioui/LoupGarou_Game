<template>
  <div class="player-library">
    <h2 class="section-title">Player Library</h2>
    <div class="player-container">
      <div class="player-list-container">
        <PlayerListComponent
          @player-selected="selectPlayer"
          @add-player="showAddForm = true"
        />
      </div>
      <div class="player-detail-container">
        <PlayerFormComponent
          v-if="showAddForm || editingPlayer"
          :editing-player="editingPlayer"
          @player-submitted="handlePlayerSubmit"
          @cancel="cancelForm"
        />
        <PlayerDetailComponent
          v-if="selectedPlayer && !showAddForm && !editingPlayer"
          :player="selectedPlayer"
          @edit-player="editPlayer"
          @delete-player="deletePlayer"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import PlayerListComponent from "@/components/PlayerListComponent.vue";
import PlayerFormComponent from "@/components/PlayerFormComponent.vue";
import PlayerDetailComponent from "@/components/PlayerDetailComponent.vue";

export default {
  name: "PlayerLibrary",
  components: {
    PlayerListComponent,
    PlayerFormComponent,
    PlayerDetailComponent,
  },
  data() {
    return {
      selectedPlayer: null,
      showAddForm: false,
      editingPlayer: null,
    };
  },
  methods: {
    ...mapActions(["deletePlayer"]),
    selectPlayer(player) {
      this.selectedPlayer = player;
      this.showAddForm = false;
      this.editingPlayer = null;
    },
    handlePlayerSubmit(player) {
      this.showAddForm = false;
      this.editingPlayer = null;
      this.selectedPlayer = player;
    },
    editPlayer(player) {
      this.editingPlayer = player;
    },
    async deletePlayer(playerId) {
      await this.deletePlayer(playerId);
      this.selectedPlayer = null;
    },
    cancelForm() {
      this.showAddForm = false;
      this.editingPlayer = null;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";

.player-library {
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  text-align: center;
}

.player-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (min-width: $breakpoint-tablet) {
    flex-direction: row;
  }
}

.player-list-container,
.player-detail-container {
  flex: 1;
}

.player-detail-container {
  background-color: white;
  border-radius: $border-radius;
  box-shadow: $box-shadow;
  padding: 1.5rem;
}

// Dark mode styles
:global(.dark-mode) {
  .player-detail-container {
    background-color: lighten($text-color, 5%);
    color: white;
  }
}
</style>
