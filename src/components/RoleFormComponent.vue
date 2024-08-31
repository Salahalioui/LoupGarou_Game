<template>
  <div class="role-form">
    <h3>{{ isEditing ? "Edit Role" : "Add New Role" }}</h3>
    <form @submit.prevent="submitRole">
      <div class="form-group">
        <label for="roleName">Role Name:</label>
        <input type="text" id="roleName" v-model="role.name" required />
      </div>
      <div class="form-group">
        <label for="roleDescription">Description:</label>
        <textarea
          id="roleDescription"
          v-model="role.description"
          required
        ></textarea>
      </div>
      <button type="submit">{{ isEditing ? "Update" : "Add" }} Role</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "RoleFormComponent",
  props: {
    editingRole: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      role: this.editingRole
        ? {
            id: this.editingRole.id,
            name: this.editingRole.name,
            description: this.editingRole.description,
          }
        : { name: "", description: "" },
    };
  },
  computed: {
    isEditing() {
      return !!this.editingRole;
    },
  },
  methods: {
    ...mapActions(["addRole", "updateRole"]),
    async submitRole() {
      try {
        // Create a sanitized copy of the role object
        const roleSanitized = {
          name: this.role.name,
          description: this.role.description,
        };

        if (this.isEditing && this.role.id) {
          roleSanitized.id = this.role.id;
        }

        if (this.isEditing) {
          await this.updateRole(roleSanitized);
        } else {
          await this.addRole(roleSanitized);
        }
        this.$emit("role-submitted", roleSanitized);
        if (!this.isEditing) {
          this.role = { name: "", description: "" };
        }
      } catch (error) {
        console.error("Error submitting role:", error);
        // You might want to show an error message to the user here
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";

.role-form {
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

  input,
  textarea {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid $text-color;
    border-radius: $border-radius;
  }

  textarea {
    height: 100px;
  }
}

button {
  width: 100%;
}
</style>
