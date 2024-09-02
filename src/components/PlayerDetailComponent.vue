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
  background-color: $wolf-color;
  border-radius: $border-radius;
  padding: $spacing-large;
  margin-bottom: $spacing-medium;
  text-align: center;
  box-shadow: $box-shadow;
}

.player-info {
  margin-bottom: $spacing-medium;
}

.player-avatar {
  width: 80px;
  height: 80px;
  background-color: $primary-color;
  color: $moon-color;
  font-size: $font-size-xlarge;
  font-weight: bold;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto $spacing-small;
}

.player-name {
  font-size: $font-size-large;
  margin: 0;
  color: $text-color;
}

.player-actions {
  display: flex;
  gap: $spacing-small;
}

.btn {
  flex: 1;
  padding: $spacing-medium;
  font-size: $font-size-normal;
  border: none;
  border-radius: $border-radius;
  cursor: pointer;
  transition: background-color $transition-speed ease;

  &-primary {
    background-color: $primary-color;
    color: $text-color;

    &:hover {
      background-color: darken($primary-color, 10%);
    }
  }

  &-danger {
    background-color: $blood-color;
    color: $text-color;

    &:hover {
      background-color: darken($blood-color, 10%);
    }
  }
}

// Dark mode styles
:global(.dark-mode) {
  .player-detail {
    background-color: lighten($night-color, 10%);
  }

  .player-avatar {
    background-color: $secondary-color;
  }
}
</style>
