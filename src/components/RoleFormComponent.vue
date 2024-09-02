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

  input[type="text"],
  textarea {
    width: 100%;
    padding: $spacing-small;
    border: 1px solid $accent-color;
    border-radius: $border-radius;
    background-color: lighten($night-color, 10%);
    color: $text-color;
    font-size: $font-size-normal;
  }

  textarea {
    height: 100px;
    resize: vertical;
  }
}

button {
  padding: $spacing-small $spacing-medium;
  font-size: $font-size-normal;
  border: none;
  border-radius: $border-radius;
  cursor: pointer;
  transition: background-color $transition-speed ease;
  margin-right: $spacing-small;

  &[type="submit"] {
    background-color: $secondary-color;
    color: $text-color;

    &:hover {
      background-color: darken($secondary-color, 10%);
    }
  }

  &[type="button"] {
    background-color: $primary-color;
    color: $text-color;

    &:hover {
      background-color: darken($primary-color, 10%);
    }
  }
}

// Dark mode styles
:global(.dark-mode) {
  .role-form {
    background-color: lighten($night-color, 5%);
  }

  .form-group {
    input[type="text"],
    textarea {
      background-color: $night-color;
      border-color: $accent-color;
    }
  }
}
</style>
