<template>
  <div v-if="player" class="player-detail">
    <img :src="player.avatar" :alt="player.name" class="player-avatar" />
    <h3>{{ player.name }}</h3>
    <button @click="editPlayer">Edit</button>
    <button @click="deletePlayer" class="delete-button">Delete</button>
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
      if (confirm(`Are you sure you want to delete ${this.player.name}?`)) {
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

.player-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1rem;
}

.delete-button {
  background-color: #e74c3c;
  margin-left: 0.5rem;

  &:hover {
    background-color: darken(#e74c3c, 10%);
  }
}
</style>
