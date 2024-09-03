<template>
  <div class="role-library">
    <h2 class="section-title">{{ $t("roleLibrary.title") }}</h2>
    <div class="role-container">
      <div class="role-list-container">
        <RoleListComponent @select-role="selectRole" />
      </div>
      <div class="role-detail-container">
        <RoleDetailComponent
          v-if="selectedRole && !showAddForm"
          :role="selectedRole"
          @edit-role="editRole"
          @delete-role="handleDeleteRole"
        />
        <RoleFormComponent
          v-if="showAddForm || editingRole"
          :editingRole="editingRole"
          @role-submitted="handleRoleSubmit"
          @cancel="cancelForm"
        />
      </div>
    </div>
    <button
      @click="showAddForm = true"
      class="add-role-btn"
      v-if="!showAddForm && !editingRole"
    >
      {{ $t("roleLibrary.addRole") }}
    </button>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import RoleListComponent from "@/components/RoleListComponent.vue";
import RoleFormComponent from "@/components/RoleFormComponent.vue";
import RoleDetailComponent from "@/components/RoleDetailComponent.vue";

export default {
  name: "RoleLibrary",
  components: {
    RoleListComponent,
    RoleFormComponent,
    RoleDetailComponent,
  },
  data() {
    return {
      selectedRole: null,
      showAddForm: false,
      editingRole: null,
    };
  },
  methods: {
    ...mapActions(["deleteRole"]),
    selectRole(role) {
      this.selectedRole = role;
      this.showAddForm = false;
      this.editingRole = null;
    },
    handleRoleSubmit(role) {
      this.showAddForm = false;
      this.editingRole = null;
      this.selectedRole = role;
      this.$nextTick(() => {
        this.$forceUpdate();
      });
    },
    editRole(role) {
      this.editingRole = role;
    },
    async handleDeleteRole(roleId) {
      try {
        await this.deleteRole(roleId);
        this.selectedRole = null;
      } catch (error) {
        console.error("Error deleting role:", error);
      }
    },
    cancelForm() {
      this.showAddForm = false;
      this.editingRole = null;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";

.role-library {
  max-width: $max-width;
  margin: 0 auto;
  padding: $spacing-large;
  color: $text-color;
}

.section-title {
  font-family: $font-family-heading;
  font-size: $font-size-xlarge;
  color: $moon-color;
  margin-bottom: $spacing-large;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.role-container {
  display: flex;
  flex-direction: column;
  gap: $spacing-large;
  background-color: rgba($night-color, 0.8);
  border-radius: $border-radius;
  padding: $spacing-large;
  box-shadow: $box-shadow;
}

.role-list-container,
.role-detail-container {
  width: 100%;
}

.add-role-btn {
  width: 100%;
  margin-top: $spacing-medium;
  padding: $spacing-medium;
  font-size: $font-size-normal;
  background-color: $secondary-color;
  color: $moon-color;
  border: none;
  border-radius: $border-radius;
  cursor: pointer;
  transition: background-color $transition-speed ease,
    transform $transition-speed ease;

  &:hover {
    background-color: darken($secondary-color, 10%);
    transform: translateY(-2px);
  }
}

@media (min-width: $breakpoint-tablet) {
  .role-container {
    flex-direction: row;
  }

  .role-list-container {
    flex: 1;
    margin-right: $spacing-large;
  }

  .role-detail-container {
    flex: 2;
  }
}
</style>
