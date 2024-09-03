<template>
  <div class="role-detail">
    <img
      :src="role.image"
      :alt="$t(`roles.${role.id}.name`)"
      class="role-image"
    />
    <h3 class="role-name">{{ $t(`roles.${role.id}.name`) }}</h3>
    <p class="role-description">{{ $t(`roles.${role.id}.description`) }}</p>
    <div class="role-actions">
      <button @click="$emit('edit-role', role)" class="edit-btn">
        {{ $t("roleDetail.edit") }}
      </button>
      <button @click="confirmDelete" class="delete-btn">
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
    confirmDelete() {
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
  background-color: rgba($wolf-color, 0.8);
  border-radius: $border-radius;
  padding: $spacing-large;
  text-align: center;
  box-shadow: $box-shadow;
}

.role-image {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: $spacing-medium;
  border: 3px solid $accent-color;
}

.role-name {
  font-family: $font-family-heading;
  font-size: $font-size-xlarge;
  color: $moon-color;
  margin-bottom: $spacing-small;
}

.role-description {
  font-size: $font-size-normal;
  color: $text-color;
  margin-bottom: $spacing-large;
  line-height: 1.6;
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
  transition: background-color $transition-speed ease,
    transform $transition-speed ease;
}

.edit-btn {
  background-color: $primary-color;
  color: $moon-color;

  &:hover {
    background-color: darken($primary-color, 10%);
    transform: translateY(-2px);
  }
}

.delete-btn {
  background-color: $blood-color;
  color: $moon-color;

  &:hover {
    background-color: darken($blood-color, 10%);
    transform: translateY(-2px);
  }
}
</style>
