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

<style scoped>
.role-popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.popup-content {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  text-align: center;
  max-width: 90%;
  max-height: 90%;
  overflow-y: auto;
  position: relative;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
}

.role-image {
  width: 100%;
  height: auto;
  max-height: 70vh;
  object-fit: contain;
  margin-bottom: 1rem;
}

.role-name {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.role-description {
  font-size: 1.2rem;
}
</style>
