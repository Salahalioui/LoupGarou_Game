<template>
  <div class="settings-component">
    <h2 class="settings-title">{{ $t("settings.title") }}</h2>
    <div class="settings-form">
      <div v-for="phase in phases" :key="phase" class="setting-item">
        <label :for="phase">{{ $t(`gameFlow.phases.${phase}`) }}</label>
        <input
          :id="phase"
          type="number"
          v-model.number="phaseDurations[phase]"
          min="30"
          max="600"
          step="10"
        />
        <span class="duration-display"
          >{{ phaseDurations[phase] }} {{ $t("settings.seconds") }}</span
        >
      </div>
    </div>
    <div class="settings-actions">
      <button @click="saveSettings" class="save-btn">
        {{ $t("settings.save") }}
      </button>
      <button @click="resetDefaults" class="reset-btn">
        {{ $t("settings.resetDefaults") }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "SettingsComponent",
  data() {
    return {
      phases: ["Night", "Day Discussion", "Day Voting", "Execution"],
      phaseDurations: {
        Night: 120,
        "Day Discussion": 180,
        "Day Voting": 60,
        Execution: 30,
      },
    };
  },
  methods: {
    saveSettings() {
      // Save settings to Vuex store or localStorage
      this.$store.commit("game/SET_PHASE_DURATIONS", this.phaseDurations);
      // Optionally, you can also save to localStorage for persistence
      localStorage.setItem(
        "phaseDurations",
        JSON.stringify(this.phaseDurations)
      );
      // Show a success message or emit an event
      this.$emit("settings-saved");
    },
    resetDefaults() {
      this.phaseDurations = {
        Night: 120,
        "Day Discussion": 180,
        "Day Voting": 60,
        Execution: 30,
      };
    },
  },
  mounted() {
    // Load saved settings from Vuex store or localStorage
    const savedDurations = this.$store.state.game.phaseDurations;
    if (savedDurations) {
      this.phaseDurations = { ...savedDurations };
    }
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";

.settings-component {
  background-color: $wolf-color;
  border-radius: $border-radius;
  padding: $spacing-large;
  color: $text-color;
}

.settings-title {
  font-family: $font-family-heading;
  font-size: $font-size-xlarge;
  color: $moon-color;
  margin-bottom: $spacing-large;
  text-align: center;
}

.settings-form {
  display: grid;
  gap: $spacing-medium;
}

.setting-item {
  display: grid;
  grid-template-columns: 1fr 100px 80px;
  align-items: center;
  gap: $spacing-small;

  label {
    font-size: $font-size-normal;
  }

  input {
    width: 100%;
    padding: $spacing-small;
    background-color: lighten($night-color, 10%);
    border: 1px solid $accent-color;
    border-radius: $border-radius;
    color: $text-color;
    font-size: $font-size-normal;
  }

  .duration-display {
    font-size: $font-size-small;
    color: $accent-color;
  }
}

.settings-actions {
  display: flex;
  justify-content: center;
  gap: $spacing-medium;
  margin-top: $spacing-large;
}

.save-btn,
.reset-btn {
  padding: $spacing-small $spacing-medium;
  font-size: $font-size-normal;
  border: none;
  border-radius: $border-radius;
  cursor: pointer;
  transition: background-color $transition-speed ease;
}

.save-btn {
  background-color: $primary-color;
  color: $text-color;

  &:hover {
    background-color: darken($primary-color, 10%);
  }
}

.reset-btn {
  background-color: $secondary-color;
  color: $text-color;

  &:hover {
    background-color: darken($secondary-color, 10%);
  }
}

// Dark mode styles
:global(.dark-mode) {
  .settings-component {
    background-color: lighten($night-color, 5%);
  }

  .setting-item input {
    background-color: $night-color;
  }
}
</style>
