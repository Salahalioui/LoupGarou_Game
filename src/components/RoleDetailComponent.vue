<template>
  <div v-if="role" class="role-detail">
    <img
      :src="role.image"
      :alt="$t(`roles.${role.id}.name`)"
      class="role-image"
    />
    <h3 class="role-name">{{ $t(`roles.${role.id}.name`) }}</h3>
    <p class="role-description">{{ $t(`roles.${role.id}.description`) }}</p>
    <div class="role-actions">
      <button @click="editRole" class="edit-btn">
        {{ $t("roleDetail.edit") }}
      </button>
      <button @click="deleteRole" class="delete-btn">
        {{ $t("roleDetail.delete") }}
      </button>
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
      if (
        confirm(
          this.$t("roleDetail.confirmDelete", {
            name: this.$t(`roles.${this.role.id}.name`),
          })
        )
      ) {
        this.$emit("delete-role", this.role.id);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";

.role-detail {
  background-color: $wolf-color;
  border-radius: $border-radius;
  padding: $spacing-large;
  margin-bottom: $spacing-medium;
  text-align: center;
  box-shadow: $box-shadow;
}

.role-image {
  width: 100%;
  max-width: 200px;
  height: auto;
  border-radius: $border-radius;
  margin-bottom: $spacing-medium;
}

.role-name {
  font-size: $font-size-xlarge;
  margin-bottom: $spacing-small;
  color: $moon-color;
}

.role-description {
  margin-bottom: $spacing-medium;
  color: $text-color;
}

.role-actions {
  display: flex;
  justify-content: center;
  gap: $spacing-medium;
}

.edit-btn,
.delete-btn {
  padding: $spacing-small $spacing-medium;
  font-size: $font-size-normal;
  border: none;
  border-radius: $border-radius;
  cursor: pointer;
  transition: background-color $transition-speed ease;
}

.edit-btn {
  background-color: $primary-color;
  color: $text-color;

  &:hover {
    background-color: darken($primary-color, 10%);
  }
}

.delete-btn {
  background-color: $blood-color;
  color: $text-color;

  &:hover {
    background-color: darken($blood-color, 10%);
  }
}

// Dark mode styles
:global(.dark-mode) {
  .role-detail {
    background-color: lighten($night-color, 10%);
  }
}
</style>
