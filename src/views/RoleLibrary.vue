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
      // Force a re-render of the RoleListComponent
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
        // Handle the error (e.g., show an error message to the user)
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";

.role-library {
  max-width: 100%;
  margin: 0 auto;
  padding: $spacing-large;
  color: $text-color;
}

.section-title {
  color: $moon-color;
  font-size: $font-size-xlarge;
  margin-bottom: $spacing-large;
  text-align: center;
}

.role-container {
  display: flex;
  flex-direction: column;
  gap: $spacing-large;
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
  color: $text-color;
  border: none;
  border-radius: $border-radius;
  cursor: pointer;
  transition: background-color $transition-speed ease;

  &:hover {
    background-color: darken($secondary-color, 10%);
  }
}

// Responsive styles
@media (min-width: $breakpoint-tablet) {
  .role-library {
    max-width: 800px;
  }

  .role-container {
    flex-direction: row;
  }

  .role-list-container {
    flex: 1;
    margin-right: $spacing-large;
  }

  .role-detail-container {
    flex: 1;
  }
}
</style>
