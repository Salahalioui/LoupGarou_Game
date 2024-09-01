<template>
  <div v-if="player" class="player-detail">
    <div class="player-avatar">
      <img v-if="player.avatar" :src="player.avatar" :alt="player.name" />
      <span v-else>{{ player.name[0] }}</span>
    </div>
    <h3 class="player-name">{{ player.name }}</h3>
    <div class="player-actions">
      <button @click="editPlayer" class="edit-btn">
        {{ $t("playerDetail.edit") }}
      </button>
      <button @click="deletePlayer" class="delete-btn">
        {{ $t("playerDetail.delete") }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "PlayerDetailComponent",
  props: {
    player: {
      type: Object,
      required: true,
    },
  },
  methods: {
    editPlayer() {
      this.$emit("edit-player", this.player);
    },
    deletePlayer() {
      if (
        confirm(
          this.$t("playerDetail.confirmDelete", { name: this.player.name })
        )
      ) {
        this.$emit("delete-player", this.player.id);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";

.player-detail {
  background-color: white;
  border-radius: $border-radius;
  padding: 1rem;
  margin-bottom: 1rem;
  text-align: center;
}

.player-info {
  margin-bottom: 1rem;
}

.player-avatar {
  width: 80px;
  height: 80px;
  background-color: $primary-color;
  color: white;
  font-size: 2rem;
  font-weight: bold;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 0.5rem;
}

.player-name {
  font-size: 1.2rem;
  margin: 0;
}

.player-actions {
  display: flex;
  gap: 0.5rem;
}

.btn {
  flex: 1;
  padding: 0.75rem;
  font-size: 1rem;
  border: none;
  border-radius: $border-radius;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &-primary {
    background-color: $primary-color;
    color: white;

    &:hover {
      background-color: darken($primary-color, 10%);
    }
  }

  &-danger {
    background-color: #e74c3c;
    color: white;

    &:hover {
      background-color: darken(#e74c3c, 10%);
    }
  }
}

// Dark mode styles
:global(.dark-mode) {
  .player-detail {
    background-color: lighten($text-color, 10%);
    color: white;
  }

  .player-avatar {
    background-color: $secondary-color;
  }
}

// Responsive styles
@media (min-width: $breakpoint-tablet) {
  .player-avatar {
    width: 100px;
    height: 100px;
    font-size: 2.5rem;
  }

  .player-name {
    font-size: 1.5rem;
  }
}
</style>
