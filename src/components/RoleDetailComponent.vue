<template>
  <div v-if="role" class="role-detail">
    <img :src="role.image" :alt="role.name" class="role-image" />
    <h3 class="role-name">{{ role.name }}</h3>
    <p class="role-description">{{ role.description }}</p>
    <div class="role-actions">
      <button @click="editRole" class="edit-btn">Edit</button>
      <button @click="deleteRole" class="delete-btn">Delete</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "RoleDetailComponent",
  props: {
    role: {
      type: Object,
      required: true,
    },
  },
  methods: {
    editRole() {
      this.$emit("edit-role", this.role);
    },
    deleteRole() {
      if (confirm(`Are you sure you want to delete ${this.role.name}?`)) {
        this.$emit("delete-role", this.role.id);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";

.role-detail {
  background-color: white;
  border-radius: $border-radius;
  padding: 1rem;
  margin-bottom: 1rem;
  text-align: center;
}

.role-image {
  width: 100%;
  max-width: 200px;
  height: auto;
  border-radius: $border-radius;
  margin-bottom: 1rem;
}

.role-name {
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
}

.role-description {
  margin-bottom: 1rem;
}

.role-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.edit-btn,
.delete-btn {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border: none;
  border-radius: $border-radius;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.edit-btn {
  background-color: $primary-color;
  color: white;

  &:hover {
    background-color: darken($primary-color, 10%);
  }
}

.delete-btn {
  background-color: #e74c3c;
  color: white;

  &:hover {
    background-color: darken(#e74c3c, 10%);
  }
}

// Dark mode styles
:global(.dark-mode) {
  .role-detail {
    background-color: lighten($text-color, 10%);
    color: white;
  }
}
</style>
