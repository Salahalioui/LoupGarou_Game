<template>
  <div class="player-list">
    <div class="player-grid">
      <div
        v-for="player in players"
        :key="player.id"
        class="player-card"
        @click="selectPlayer(player)"
      >
        <div class="player-avatar">{{ player.name[0] }}</div>
        <h3 class="player-name">{{ player.name }}</h3>
      </div>
    </div>
    <button @click="$emit('add-player')" class="btn btn-primary add-player-btn">
      <i class="fas fa-plus"></i> Add New Player
    </button>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "PlayerListComponent",
  computed: {
    ...mapState(["players"]),
  },
  methods: {
    selectPlayer(player) {
      this.$emit("player-selected", player);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";

.player-list {
  margin-bottom: 2rem;
}

.section-title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.player-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
}

.player-card {
  background-color: white;
  padding: 1rem;
  border-radius: $border-radius;
  box-shadow: $box-shadow;
  text-align: center;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
}

.player-avatar {
  width: 60px;
  height: 60px;
  background-color: $primary-color;
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 0.5rem;
}

.player-name {
  font-size: 1rem;
  margin: 0;
}

.add-player-btn {
  width: 100%;
}

// Dark mode styles
:global(.dark-mode) {
  .player-card {
    background-color: lighten($text-color, 5%);
    color: white;
  }

  .player-avatar {
    background-color: $secondary-color;
  }
}
</style>
