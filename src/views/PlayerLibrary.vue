<template>
  <div class="player-library">
    <h2 class="section-title">{{ $t("playerLibrary.title") }}</h2>
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
          v-else-if="selectedPlayer"
          :player="selectedPlayer"
          @edit-player="editPlayer"
          @delete-player="handleDeletePlayer"
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
    async handleDeletePlayer(playerId) {
      try {
        await this.deletePlayer(playerId);
        this.selectedPlayer = null;
      } catch (error) {
        console.error("Error deleting player:", error);
        // Handle the error (e.g., show an error message to the user)
      }
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
  max-width: 100%;
  margin: 0 auto;
  padding: $spacing-large;
  color: $text-color;
}

.section-title {
  color: $moon-color;
  font-size: $font-size-xlarge;
  margin-bottom: $spacing-large;
  text-align: center;
}

.player-container {
  display: flex;
  flex-direction: column;
  gap: $spacing-large;
}

.player-list-container,
.player-detail-container {
  flex: 1;
}

.player-detail-container {
  background-color: $wolf-color;
  border-radius: $border-radius;
  box-shadow: $box-shadow;
  padding: $spacing-large;
}

// Responsive styles
@media (min-width: $breakpoint-tablet) {
  .player-library {
    max-width: 800px;
  }

  .player-container {
    flex-direction: row;
  }

  .player-detail-container {
    flex: 1;
  }
}
</style>
