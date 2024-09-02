<template>
  <div class="role-list">
    <h3 class="list-title">{{ $t("roleList.availableRoles") }}</h3>
    <div class="role-cards">
      <div
        v-for="role in allRoles"
        :key="role.id"
        class="role-card"
        @click="showRolePopup(role)"
      >
        <img
          :src="role.image"
          :alt="$t(`roles.${role.id}.name`)"
          class="role-image"
        />
        <h4 class="role-name">{{ $t(`roles.${role.id}.name`) }}</h4>
      </div>
    </div>
    <RolePopup
      v-if="isPopupVisible"
      :role="selectedRole"
      @close="isPopupVisible = false"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getPredefinedRoles } from "@/data/predefinedRoles";
import RolePopup from "@/components/RolePopup.vue";

export default {
  name: "RoleListComponent",
  components: {
    RolePopup,
  },
  data() {
    return {
      isPopupVisible: false,
      selectedRole: null,
    };
  },
  computed: {
    ...mapState(["roles"]),
    allRoles() {
      // Combine predefined roles with custom roles
      return [...getPredefinedRoles(), ...this.roles];
    },
  },
  methods: {
    showRolePopup(role) {
      this.selectedRole = role;
      this.isPopupVisible = true;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";

.role-list {
  margin-bottom: $spacing-large;
}

.list-title {
  font-size: $font-size-large;
  margin-bottom: $spacing-medium;
  text-align: center;
  color: $moon-color;
}

.role-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: $spacing-medium;
}

.role-card {
  background-color: $wolf-color;
  border-radius: $border-radius;
  padding: $spacing-small;
  cursor: pointer;
  transition: transform $transition-speed ease,
    box-shadow $transition-speed ease;
  text-align: center;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }
}

.role-image {
  width: 100%;
  height: 100px;
  object-fit: cover;
  border-radius: $border-radius;
  margin-bottom: $spacing-small;
}

.role-name {
  font-size: $font-size-small;
  margin: 0;
  color: $text-color;
}

// Dark mode styles
:global(.dark-mode) {
  .role-card {
    background-color: lighten($night-color, 10%);
  }
}
</style>
