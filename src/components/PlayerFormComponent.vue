<template>
  <div class="player-form">
    <h3>
      {{
        isEditing ? $t("playerForm.editPlayer") : $t("playerForm.addNewPlayer")
      }}
    </h3>
    <form @submit.prevent="submitPlayer">
      <div class="form-group">
        <label for="playerName">{{ $t("playerForm.playerName") }}</label>
        <input type="text" id="playerName" v-model="player.name" required />
      </div>
      <div class="form-group">
        <label for="playerAvatar">{{ $t("playerForm.avatar") }}</label>
        <input
          type="file"
          id="playerAvatar"
          @change="handleAvatarUpload"
          accept="image/*"
        />
        <img
          v-if="avatarPreview"
          :src="avatarPreview"
          alt="Avatar preview"
          class="avatar-preview"
        />
      </div>
      <div class="form-actions">
        <button type="submit" class="btn btn-primary">
          {{ isEditing ? $t("playerForm.update") : $t("playerForm.add") }}
        </button>
        <button
          type="button"
          class="btn btn-secondary"
          @click="$emit('cancel')"
        >
          {{ $t("playerForm.cancel") }}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "PlayerFormComponent",
  props: {
    editingPlayer: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      player: this.editingPlayer
        ? { ...this.editingPlayer }
        : { name: "", avatar: "" },
      avatarPreview: null,
    };
  },
  computed: {
    isEditing() {
      return !!this.editingPlayer;
    },
  },
  methods: {
    ...mapActions(["addPlayer", "updatePlayer"]),
    async submitPlayer() {
      try {
        // Create a copy of the player object without the avatarPreview
        const playerToSubmit = { ...this.player };

        if (this.isEditing) {
          await this.updatePlayer(playerToSubmit);
        } else {
          await this.addPlayer(playerToSubmit);
        }
        this.$emit("player-submitted", playerToSubmit);
        if (!this.isEditing) {
          this.player = { name: "", avatar: "" };
          this.avatarPreview = null;
        }
      } catch (error) {
        console.error("Error submitting player:", error);
        // You might want to show an error message to the user here
      }
    },
    handleAvatarUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.player.avatar = file.name;
        this.avatarPreview = URL.createObjectURL(file);
        // In a real app, you'd upload the file to a server here
        this.player.avatarUrl = this.avatarPreview;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";

.player-form {
  background-color: $wolf-color;
  border-radius: $border-radius;
  padding: $spacing-large;
  margin-bottom: $spacing-medium;
  box-shadow: $box-shadow;
}

h3 {
  font-size: $font-size-large;
  margin-bottom: $spacing-medium;
  color: $moon-color;
}

.form-group {
  margin-bottom: $spacing-medium;

  label {
    display: block;
    margin-bottom: $spacing-small;
    color: $text-color;
  }

  input {
    width: 100%;
    padding: $spacing-small;
    border: 1px solid $accent-color;
    border-radius: $border-radius;
    background-color: lighten($night-color, 10%);
    color: $text-color;
    font-size: $font-size-normal;
  }
}

.form-actions {
  display: flex;
  gap: $spacing-small;
  margin-top: $spacing-medium;
}

.btn {
  flex: 1;
  padding: $spacing-small $spacing-medium;
  font-size: $font-size-normal;
  border: none;
  border-radius: $border-radius;
  cursor: pointer;
  transition: background-color $transition-speed ease;

  &-primary {
    background-color: $secondary-color;
    color: $text-color;

    &:hover {
      background-color: darken($secondary-color, 10%);
    }
  }

  &-secondary {
    background-color: $primary-color;
    color: $text-color;

    &:hover {
      background-color: darken($primary-color, 10%);
    }
  }
}

// Dark mode styles
:global(.dark-mode) {
  .player-form {
    background-color: lighten($night-color, 5%);
  }

  .form-group {
    input {
      background-color: $night-color;
      border-color: $accent-color;
    }
  }
}
</style>
