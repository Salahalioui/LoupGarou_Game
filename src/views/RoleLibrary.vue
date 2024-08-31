<template>
  <div class="role-library">
    <h2>Role Library</h2>
    <div class="role-container">
      <div class="role-list-container">
        <RoleListComponent @role-selected="selectRole" />
        <button @click="showAddForm = true">Add New Role</button>
      </div>
      <div class="role-detail-container">
        <RoleFormComponent
          v-if="showAddForm || editingRole"
          :editing-role="editingRole"
          @role-submitted="handleRoleSubmit"
        />
        <RoleDetailComponent
          v-if="selectedRole && !showAddForm && !editingRole"
          :role="selectedRole"
          @edit-role="editRole"
          @delete-role="deleteRole"
        />
      </div>
    </div>
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
    },
    editRole(role) {
      this.editingRole = role;
    },
    async deleteRole(roleId) {
      await this.deleteRole(roleId);
      this.selectedRole = null;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";

.role-container {
  display: flex;
  flex-direction: column;

  @media (min-width: $breakpoint-tablet) {
    flex-direction: row;
  }
}

.role-list-container,
.role-detail-container {
  flex: 1;
  margin-bottom: 1rem;

  @media (min-width: $breakpoint-tablet) {
    margin-right: 1rem;
  }
}
</style>
