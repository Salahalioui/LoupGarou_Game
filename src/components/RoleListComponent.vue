<template>
  <div class="role-list">
    <h3 class="list-title">{{ $t("roleList.availableRoles") }}</h3>
    <div class="role-cards">
      <div
        v-for="role in allRoles"
        :key="role.id"
        class="role-card"
        @click="selectRole(role)"
      >
        <img
          :src="role.image"
          :alt="$t(`roles.${role.id}.name`)"
          class="role-image"
        />
        <h4 class="role-name">{{ $t(`roles.${role.id}.name`) }}</h4>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getPredefinedRoles } from "@/data/predefinedRoles";

export default {
  name: "RoleListComponent",
  computed: {
    ...mapState(["roles"]),
    allRoles() {
      // Combine predefined roles with custom roles
      return [...getPredefinedRoles(), ...this.roles];
    },
  },
  methods: {
    selectRole(role) {
      this.$emit("role-selected", role);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";

.role-list {
  margin-bottom: 1rem;
}

.list-title {
  font-size: 1.2rem;
  margin-bottom: 1rem;
  text-align: center;
}

.role-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 1rem;
}

.role-card {
  background-color: white;
  border-radius: $border-radius;
  padding: 0.5rem;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-align: center;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
}

.role-image {
  width: 100%;
  height: 100px;
  object-fit: cover;
  border-radius: $border-radius;
  margin-bottom: 0.5rem;
}

.role-name {
  font-size: 0.9rem;
  margin: 0;
}

// Dark mode styles
:global(.dark-mode) {
  .role-card {
    background-color: lighten($text-color, 10%);
    color: white;
  }
}
</style>
