<template>
  <div class="role-form">
    <h3>
      {{ isEditing ? $t("roleForm.editRole") : $t("roleForm.addNewRole") }}
    </h3>
    <form @submit.prevent="submitRole">
      <div class="form-group">
        <label for="roleName">{{ $t("roleForm.roleName") }}</label>
        <input type="text" id="roleName" v-model="role.name" required />
      </div>
      <div class="form-group">
        <label for="roleDescription">{{ $t("roleForm.description") }}</label>
        <textarea
          id="roleDescription"
          v-model="role.description"
          required
        ></textarea>
      </div>
      <div class="form-group">
        <label for="roleImage">{{ $t("roleForm.image") }}</label>
        <input
          type="file"
          id="roleImage"
          @change="handleImageUpload"
          accept="image/*"
        />
      </div>
      <button type="submit">
        {{ isEditing ? $t("roleForm.update") : $t("roleForm.add") }}
      </button>
      <button type="button" @click="$emit('cancel')">
        {{ $t("roleForm.cancel") }}
      </button>
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
        ? { ...this.editingRole }
        : { name: "", description: "", image: null },
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
        const formData = new FormData();
        formData.append("name", this.role.name);
        formData.append("description", this.role.description);
        if (this.role.image) {
          formData.append("image", this.role.image);
        }

        if (this.isEditing) {
          formData.append("id", this.role.id);
          await this.updateRole(formData);
        } else {
          await this.addRole(formData);
        }
        this.$emit("role-submitted", this.role);
        if (!this.isEditing) {
          this.role = { name: "", description: "", image: null };
        }
      } catch (error) {
        console.error("Error submitting role:", error);
        // Show an error message to the user here
        alert("Error adding role. Please try again.");
      }
    },
    handleImageUpload(event) {
      this.role.image = event.target.files[0];
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
