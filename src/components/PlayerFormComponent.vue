<template>
  <div class="player-form">
    <h3>{{ isEditing ? "Edit Player" : "Add New Player" }}</h3>
    <form @submit.prevent="submitPlayer">
      <div class="form-group">
        <label for="playerName">Player Name:</label>
        <input type="text" id="playerName" v-model="player.name" required />
      </div>
      <div class="form-group">
        <label for="playerAvatar">Avatar:</label>
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
      <button type="submit">{{ isEditing ? "Update" : "Add" }} Player</button>
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
        // Instead of storing the File object or a blob URL, let's store the file name
        this.player.avatar = file.name;

        // If you want to display a preview, you can still create a local URL
        this.avatarPreview = URL.createObjectURL(file);

        // Here you would typically upload the file to a server and get a URL back
        // For now, we'll just simulate this with a placeholder URL
        // this.player.avatarUrl = `https://example.com/avatars/${file.name}`
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";

.player-form {
  background-color: white;
  border-radius: $border-radius;
  padding: 1rem;
  margin-bottom: 1rem;
}

.form-group {
  margin-bottom: 1rem;

  label {
    display: block;
    margin-bottom: 0.5rem;
  }

  input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid $text-color;
    border-radius: $border-radius;
  }
}

.avatar-preview {
  max-width: 100px;
  max-height: 100px;
  margin-top: 0.5rem;
  border-radius: $border-radius;
}

button {
  width: 100%;
  padding: 0.75rem;
  background-color: $primary-color;
  color: white;
  border: none;
  border-radius: $border-radius;
  cursor: pointer;

  &:hover {
    background-color: darken($primary-color, 10%);
  }
}
</style>
