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
      <i class="fas fa-plus"></i> {{ $t("playerList.addNewPlayer") }}
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
  margin-bottom: $spacing-large;
}

.list-title {
  font-size: $font-size-large;
  margin-bottom: $spacing-medium;
  text-align: center;
  color: $moon-color;
}

.player-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: $spacing-medium;
}

.player-card {
  background-color: $wolf-color;
  border-radius: $border-radius;
  padding: $spacing-small;
  box-shadow: $box-shadow;
  text-align: center;
  cursor: pointer;
  transition: transform $transition-speed ease,
    box-shadow $transition-speed ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
}

.player-avatar {
  width: 50px;
  height: 50px;
  background-color: $primary-color;
  color: $moon-color;
  font-size: $font-size-large;
  font-weight: bold;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto $spacing-small;
}

.player-name {
  font-size: $font-size-small;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: $text-color;
}

.add-player-btn {
  width: 100%;
  margin-top: $spacing-small;
  padding: $spacing-small;
  background-color: $secondary-color;
  color: $text-color;
  border: none;
  border-radius: $border-radius;
  cursor: pointer;
  transition: background-color $transition-speed ease;

  &:hover {
    background-color: darken($secondary-color, 10%);
  }
}

// Dark mode styles
:global(.dark-mode) {
  .player-card {
    background-color: lighten($night-color, 5%);
  }

  .player-avatar {
    background-color: $secondary-color;
  }
}

// Responsive styles
@media (min-width: $breakpoint-tablet) {
  .player-grid {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  }

  .player-avatar {
    width: 60px;
    height: 60px;
  }
}
</style>
