<template>
  <div v-if="role" class="role-detail">
    <h3>{{ role.name }}</h3>
    <p>{{ role.description }}</p>
    <button @click="editRole">Edit</button>
    <button @click="deleteRole" class="delete-button">Delete</button>
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
}

.delete-button {
  background-color: #e74c3c;
  margin-left: 0.5rem;

  &:hover {
    background-color: darken(#e74c3c, 10%);
  }
}
</style>
