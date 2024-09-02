<template>
  <div class="role-popup">
    <div class="popup-content">
      <button class="close-button" @click="$emit('close')">&times;</button>
      <img :src="role.image" :alt="role.name" class="role-image" />
      <h3 class="role-name">{{ $t(`roles.${role.id}.name`) }}</h3>
      <p class="role-description">{{ $t(`roles.${role.id}.description`) }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "RolePopup",
  props: {
    role: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";

.role-popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba($night-color, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.popup-content {
  background: $wolf-color;
  padding: $spacing-large;
  border-radius: $border-radius;
  text-align: center;
  max-width: 90%;
  max-height: 90%;
  overflow-y: auto;
  position: relative;
  box-shadow: $box-shadow;
}

.close-button {
  position: absolute;
  top: $spacing-small;
  right: $spacing-small;
  background: none;
  border: none;
  font-size: $font-size-xlarge;
  color: $text-color;
  cursor: pointer;
  transition: color $transition-speed ease;

  &:hover {
    color: $blood-color;
  }
}

.role-image {
  width: 100%;
  height: auto;
  max-height: 70vh;
  object-fit: contain;
  margin-bottom: $spacing-medium;
  border-radius: $border-radius;
}

.role-name {
  font-size: $font-size-xlarge;
  margin-bottom: $spacing-medium;
  color: $moon-color;
}

.role-description {
  font-size: $font-size-normal;
  color: $text-color;
  line-height: 1.6;
}

// Dark mode styles
:global(.dark-mode) {
  .popup-content {
    background: lighten($night-color, 5%);
  }

  .close-button {
    color: $moon-color;

    &:hover {
      color: $blood-color;
    }
  }
}
</style>
